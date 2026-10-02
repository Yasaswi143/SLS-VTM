import type { SupabaseClient, User } from "@supabase/supabase-js";

export type StudioAdminRecord = {
  id: string;
  email: string;
  name: string;
  role: string;
  enabled: boolean;
};

export type AdminVerification =
  | { authorized: true; user: User; admin: StudioAdminRecord }
  | { authorized: false; reason: "unauthenticated" | "unauthorized" }
  | { authorized: false; reason: "error"; message: string };

function isStudioAdminRecord(value: unknown): value is StudioAdminRecord {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.id === "string" &&
    typeof record.email === "string" &&
    typeof record.name === "string" &&
    typeof record.role === "string" &&
    typeof record.enabled === "boolean"
  );
}

export async function verifyStudioAdmin(client: SupabaseClient): Promise<AdminVerification> {
  try {
    const { data: sessionData, error: sessionError } = await client.auth.getSession();
    if (sessionError) return { authorized: false, reason: "error", message: sessionError.message };
    if (!sessionData.session) return { authorized: false, reason: "unauthenticated" };

    const {
      data: { user },
      error: userError,
    } = await client.auth.getUser();
    if (userError) return { authorized: false, reason: "error", message: userError.message };
    if (!user) return { authorized: false, reason: "unauthenticated" };

    const { data, error } = await client
      .from("studio_admins")
      .select("id,email,name,role,enabled")
      .eq("id", user.id)
      .maybeSingle();
    if (error) return { authorized: false, reason: "error", message: error.message };
    if (!isStudioAdminRecord(data))
      return { authorized: false, reason: "error", message: "Unexpected studio_admins record." };
    if (data.id !== user.id || data.enabled !== true || data.role !== "admin")
      return { authorized: false, reason: "unauthorized" };

    return { authorized: true, user, admin: data };
  } catch (error: unknown) {
    return {
      authorized: false,
      reason: "error",
      message: error instanceof Error ? error.message : "Admin verification failed.",
    };
  }
}