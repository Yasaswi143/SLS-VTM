import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getSupabase } from "./supabase";

export type SiteSettings = {
  phone: string;
  email: string;
  address: string;
  hours: string;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  phone: "+919133418773",
  email: "chaitanyasayani002@gmail.com",
  address: "Chirala Road, Vetapalem, near Venkateswara Temple, Andhra Pradesh",
  hours: "Mon – Sat · 9:00 AM – 9:00 PM",
};

const SiteSettingsContext = createContext(DEFAULT_SITE_SETTINGS);

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    const client = getSupabase();
    if (!client) return;
    let active = true;
    const load = async () => {
      const { data } = await client
        .from("site_settings")
        .select("phone, email, address, hours")
        .eq("id", 1)
        .maybeSingle();
      if (active && data) setSettings({ ...DEFAULT_SITE_SETTINGS, ...data });
    };
    void load();
    const channel = client
      .channel("public-site-settings")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "site_settings",
          filter: "id=eq.1",
        },
        () => {
          void load();
        },
      )
      .subscribe();
    return () => {
      active = false;
      void client.removeChannel(channel);
    };
  }, []);

  return <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
