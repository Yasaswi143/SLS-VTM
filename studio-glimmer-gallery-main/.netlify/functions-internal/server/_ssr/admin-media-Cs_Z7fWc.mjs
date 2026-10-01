import { i as getSupabase, n as MEDIA_BUCKET } from "./site-settings-B-vep3b1.mjs";
import { t as Upload } from "../_libs/tus-js-client+url-parse.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-media-Cs_Z7fWc.js
var MEDIA_CATEGORIES = [
	"Weddings",
	"Birthday Functions",
	"Engagements",
	"Pre-Wedding",
	"Baby Shoots",
	"Couple Shoots",
	"Portraits",
	"Events",
	"Traditional Functions",
	"Other"
];
async function uploadResumable(file, path, onProgress, signal) {
	const client = getSupabase();
	if (!client) throw new Error("Supabase is not configured.");
	const { data, error } = await client.auth.getSession();
	if (error || !data.session) throw new Error("Your admin session has expired. Please log in again.");
	if (signal.aborted) throw new DOMException("Upload cancelled", "AbortError");
	return new Promise((resolve, reject) => {
		const upload = new Upload(file, {
			endpoint: `undefined/storage/v1/upload/resumable`,
			retryDelays: [
				0,
				3e3,
				5e3,
				1e4,
				2e4
			],
			headers: {
				authorization: `Bearer ${data.session.access_token}`,
				apikey: void 0,
				"x-upsert": "false"
			},
			metadata: {
				bucketName: MEDIA_BUCKET,
				objectName: path,
				contentType: file.type || "application/octet-stream",
				cacheControl: "3600"
			},
			chunkSize: 6291456,
			onError: (uploadError) => {
				signal.removeEventListener("abort", abortUpload);
				reject(uploadError);
			},
			onProgress: (uploaded, total) => onProgress(total ? uploaded / total : 0),
			onSuccess: () => {
				signal.removeEventListener("abort", abortUpload);
				resolve();
			}
		});
		const abortUpload = () => {
			upload.abort(true).then(() => reject(new DOMException("Upload cancelled", "AbortError")));
		};
		signal.addEventListener("abort", abortUpload, { once: true });
		upload.findPreviousUploads().then((previous) => {
			if (signal.aborted) return;
			if (previous.length) upload.resumeFromPreviousUpload(previous[0]);
			upload.start();
		}).catch(reject);
	});
}
async function signedMediaUrl(path) {
	if (!path) return null;
	const client = getSupabase();
	if (!client) return null;
	const { data, error } = await client.storage.from(MEDIA_BUCKET).createSignedUrl(path, 3600);
	if (error) throw error;
	return data.signedUrl;
}
async function getPublicMedia(kind) {
	const client = getSupabase();
	if (!client) return [];
	let query = client.from("media").select("*").eq("is_published", true).order("created_at", { ascending: false });
	if (kind) query = query.eq("media_type", kind);
	const { data, error } = await query;
	if (error) throw error;
	const rows = data ?? [];
	return Promise.all(rows.map(async (row) => ({
		...row,
		url: await signedMediaUrl(row.file_path) ?? void 0,
		thumbnail_url: await signedMediaUrl(row.thumbnail_path) ?? void 0
	})));
}
async function optimizeImage(file) {
	const bitmap = await createImageBitmap(file);
	const makeBlob = async (maxDimension, quality) => {
		const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
		const canvas = document.createElement("canvas");
		canvas.width = Math.max(1, Math.round(bitmap.width * scale));
		canvas.height = Math.max(1, Math.round(bitmap.height * scale));
		const context = canvas.getContext("2d");
		if (!context) throw new Error("Could not process this image in your browser.");
		context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
		return new Promise((resolve, reject) => {
			canvas.toBlob((blob) => blob ? resolve(blob) : reject(/* @__PURE__ */ new Error("Could not encode this image.")), "image/webp", quality);
		});
	};
	try {
		return {
			full: await makeBlob(2200, .86),
			thumbnail: await makeBlob(720, .76)
		};
	} finally {
		bitmap.close();
	}
}
function safeFileName(name) {
	return name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(-100) || "media";
}
//#endregion
export { signedMediaUrl as a, safeFileName as i, getPublicMedia as n, uploadResumable as o, optimizeImage as r, MEDIA_CATEGORIES as t };
