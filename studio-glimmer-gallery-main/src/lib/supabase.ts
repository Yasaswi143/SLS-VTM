import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const MEDIA_BUCKET = "studio-media";
const REMEMBER_KEY = "studio-admin-remember";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

function hasValidConfiguration(url: string | undefined, key: string | undefined) {
  if (!url || !key || /^YOUR_/i.test(url) || /^YOUR_/i.test(key)) return false;
  try {
    const parsedUrl = new URL(url);
    return (parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:") && !!parsedUrl.host;
  } catch {
    return false;
  }
}

export const isSupabaseConfigured = hasValidConfiguration(supabaseUrl, supabaseAnonKey);

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

export function getSupabasePublicConfig() {
  if (!isSupabaseConfigured || !supabaseUrl || !supabaseAnonKey) return null;
  return { url: supabaseUrl, anonKey: supabaseAnonKey };
}

export function setRememberSession(remember: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(REMEMBER_KEY, String(remember));
  window.sessionStorage.setItem(REMEMBER_KEY, String(remember));
}
