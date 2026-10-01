import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const MEDIA_BUCKET = "studio-media";
const REMEMBER_KEY = "studio-admin-remember";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

const authStorage = {
  getItem(key: string) {
    if (typeof window === "undefined") return null;
    const storage =
      window.localStorage.getItem(REMEMBER_KEY) === "true"
        ? window.localStorage
        : window.sessionStorage;
    return storage.getItem(key);
  },
  setItem(key: string, value: string) {
    if (typeof window === "undefined") return;
    const remember = window.localStorage.getItem(REMEMBER_KEY) === "true";
    const storage = remember ? window.localStorage : window.sessionStorage;
    const otherStorage = remember ? window.sessionStorage : window.localStorage;
    otherStorage.removeItem(key);
    storage.setItem(key, value);
  },
  removeItem(key: string) {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(key);
    window.sessionStorage.removeItem(key);
  },
};

let client: SupabaseClient | null = null;

export function getSupabase() {
  if (!isSupabaseConfigured || !supabaseUrl || !supabaseAnonKey) return null;
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: authStorage,
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return client;
}

export function setRememberSession(remember: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(REMEMBER_KEY, String(remember));
  window.sessionStorage.setItem(REMEMBER_KEY, String(remember));
}
