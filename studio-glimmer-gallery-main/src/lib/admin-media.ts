import * as tus from "tus-js-client";
import { getSupabase, MEDIA_BUCKET } from "./supabase";

export const MEDIA_CATEGORIES = [
  "Weddings",
  "Birthday Functions",
  "Engagements",
  "Pre-Wedding",
  "Baby Shoots",
  "Couple Shoots",
  "Portraits",
  "Events",
  "Traditional Functions",
  "Other",
] as const;

export type MediaKind = "photo" | "video";
export type MediaRecord = {
  id: string;
  title: string;
  description: string;
  original_filename: string;
  file_path: string;
  thumbnail_path: string | null;
  media_type: MediaKind;
  category: string;
  album_id: string | null;
  tags: string[];
  event_date: string | null;
  is_featured: boolean;
  is_published: boolean;
  uploaded_by: string;
  created_at: string;
  albums?: { title: string } | null;
  url?: string;
  thumbnail_url?: string;
};

export type AlbumRecord = {
  id: string;
  title: string;
  description: string;
  category: string;
  event_date: string | null;
  cover_path: string | null;
  is_published: boolean;
  created_at: string;
};

export async function uploadResumable(
  file: File | Blob,
  path: string,
  onProgress: (progress: number) => void,
  signal: AbortSignal,
) {
  const client = getSupabase();
  if (!client) throw new Error("Supabase is not configured.");
  const { data, error } = await client.auth.getSession();
  if (error || !data.session)
    throw new Error("Your admin session has expired. Please log in again.");
  if (signal.aborted) throw new DOMException("Upload cancelled", "AbortError");

  return new Promise<void>((resolve, reject) => {
    const upload = new tus.Upload(file, {
      endpoint: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/upload/resumable`,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      headers: {
        authorization: `Bearer ${data.session.access_token}`,
        apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        "x-upsert": "false",
      },
      metadata: {
        bucketName: MEDIA_BUCKET,
        objectName: path,
        contentType: file.type || "application/octet-stream",
        cacheControl: "3600",
      },
      chunkSize: 6 * 1024 * 1024,
      onError: (uploadError) => {
        signal.removeEventListener("abort", abortUpload);
        reject(uploadError);
      },
      onProgress: (uploaded, total) => onProgress(total ? uploaded / total : 0),
      onSuccess: () => {
        signal.removeEventListener("abort", abortUpload);
        resolve();
      },
    });
    const abortUpload = () => {
      void upload
        .abort(true)
        .then(() => reject(new DOMException("Upload cancelled", "AbortError")));
    };
    signal.addEventListener("abort", abortUpload, { once: true });
    void upload
      .findPreviousUploads()
      .then((previous) => {
        if (signal.aborted) return;
        if (previous.length) upload.resumeFromPreviousUpload(previous[0]);
        upload.start();
      })
      .catch(reject);
  });
}

export async function signedMediaUrl(path: string | null) {
  if (!path) return null;
  const client = getSupabase();
  if (!client) return null;
  const { data, error } = await client.storage.from(MEDIA_BUCKET).createSignedUrl(path, 3600);
  if (error) throw error;
  return data.signedUrl;
}

export async function getPublicMedia(kind?: MediaKind) {
  const client = getSupabase();
  if (!client) return [] as MediaRecord[];
  let query = client
    .from("media")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  if (kind) query = query.eq("media_type", kind);
  const { data, error } = await query;
  if (error) throw error;
  const rows = (data ?? []) as MediaRecord[];
  return Promise.all(
    rows.map(async (row) => ({
      ...row,
      url: (await signedMediaUrl(row.file_path)) ?? undefined,
      thumbnail_url: (await signedMediaUrl(row.thumbnail_path)) ?? undefined,
    })),
  );
}

export async function optimizeImage(file: File) {
  const bitmap = await createImageBitmap(file);
  const makeBlob = async (maxDimension: number, quality: number) => {
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not process this image in your browser.");
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Could not encode this image."))),
        "image/webp",
        quality,
      );
    });
  };
  try {
    return { full: await makeBlob(2200, 0.86), thumbnail: await makeBlob(720, 0.76) };
  } finally {
    bitmap.close();
  }
}

export function safeFileName(name: string) {
  return (
    name
      .normalize("NFKD")
      .replace(/[^a-zA-Z0-9._-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(-100) || "media"
  );
}
