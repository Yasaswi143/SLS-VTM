import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-settings-CiEWJXK6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MEDIA_BUCKET = "studio-media";
var REMEMBER_KEY = "studio-admin-remember";
var supabaseUrl = "https://hfovxguhzaijubudbamz.supabase.co";
var supabaseAnonKey = "sb_publishable_yDslxXypVV2Xsqg8LGPwXA_ZajbZzPS";
var isSupabaseConfigured = Boolean(supabaseAnonKey);
var authStorage = {
	getItem(key) {
		if (typeof window === "undefined") return null;
		return (window.localStorage.getItem(REMEMBER_KEY) === "true" ? window.localStorage : window.sessionStorage).getItem(key);
	},
	setItem(key, value) {
		if (typeof window === "undefined") return;
		const remember = window.localStorage.getItem(REMEMBER_KEY) === "true";
		const storage = remember ? window.localStorage : window.sessionStorage;
		(remember ? window.sessionStorage : window.localStorage).removeItem(key);
		storage.setItem(key, value);
	},
	removeItem(key) {
		if (typeof window === "undefined") return;
		window.localStorage.removeItem(key);
		window.sessionStorage.removeItem(key);
	}
};
var client = null;
function getSupabase() {
	if (!isSupabaseConfigured || false) return null;
	if (!client) client = createClient(supabaseUrl, supabaseAnonKey, { auth: {
		storage: authStorage,
		persistSession: true,
		autoRefreshToken: true,
		detectSessionInUrl: true
	} });
	return client;
}
function setRememberSession(remember) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(REMEMBER_KEY, String(remember));
	window.sessionStorage.setItem(REMEMBER_KEY, String(remember));
}
var DEFAULT_SITE_SETTINGS = {
	phone: "+919133418773",
	email: "kemasaivenkatayasaswi@gmail.com",
	address: "Chirala Road, Vetapalem, near Venkateswara Temple, Andhra Pradesh",
	hours: "Mon – Sat · 9:00 AM – 9:00 PM"
};
var SiteSettingsContext = (0, import_react.createContext)(DEFAULT_SITE_SETTINGS);
function SiteSettingsProvider({ children }) {
	const [settings, setSettings] = (0, import_react.useState)(DEFAULT_SITE_SETTINGS);
	(0, import_react.useEffect)(() => {
		const client = getSupabase();
		if (!client) return;
		let active = true;
		const load = async () => {
			const { data } = await client.from("site_settings").select("phone, email, address, hours").eq("id", 1).maybeSingle();
			if (active && data) setSettings({
				...DEFAULT_SITE_SETTINGS,
				...data
			});
		};
		load();
		const channel = client.channel("public-site-settings").on("postgres_changes", {
			event: "UPDATE",
			schema: "public",
			table: "site_settings",
			filter: "id=eq.1"
		}, () => {
			load();
		}).subscribe();
		return () => {
			active = false;
			client.removeChannel(channel);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteSettingsContext.Provider, {
		value: settings,
		children
	});
}
function useSiteSettings() {
	return (0, import_react.useContext)(SiteSettingsContext);
}
//#endregion
export { isSupabaseConfigured as a, getSupabase as i, MEDIA_BUCKET as n, setRememberSession as o, SiteSettingsProvider as r, useSiteSettings as s, DEFAULT_SITE_SETTINGS as t };
