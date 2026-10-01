import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as isSupabaseConfigured, i as getSupabase, n as MEDIA_BUCKET, o as setRememberSession, t as DEFAULT_SITE_SETTINGS } from "./site-settings-CiEWJXK6.mjs";
import { a as signedMediaUrl, i as safeFileName, o as uploadResumable, r as optimizeImage, t as MEDIA_CATEGORIES } from "./admin-media-BDUnMoPo.mjs";
import { _ as useNavigate, f as Outlet, l as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { A as Inbox, B as EyeOff, D as Library, E as LoaderCircle, F as FolderOpen, H as Clock3, L as Film, M as Images, O as LayoutDashboard, S as Menu, T as LogOut, Y as CalendarDays, c as UserRound, d as Star, et as ArrowLeft, g as Plus, h as Search, j as Image, l as Upload, m as Settings, p as ShieldCheck, q as Check, r as X, tt as Aperture, u as Trash2, y as Pencil, z as Eye } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-app-B1hpda-H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var inputClass = "w-full min-h-11 rounded border border-white/10 bg-black/25 px-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-amber-300/70 focus:ring-2 focus:ring-amber-300/15";
var buttonClass = "inline-flex min-h-10 items-center justify-center gap-2 rounded border border-amber-200/30 px-4 text-sm text-amber-100 transition hover:border-amber-200/70 hover:bg-amber-200/10 disabled:cursor-not-allowed disabled:opacity-50";
var primaryButton = "inline-flex min-h-11 items-center justify-center gap-2 rounded bg-amber-200 px-5 text-sm font-semibold text-stone-950 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50";
var panelClass = "rounded-md border border-white/10 bg-white/[0.035]";
var sectionLabels = {
	photos: "Upload Photos",
	videos: "Upload Videos",
	albums: "Albums",
	media: "Media Library",
	featured: "Featured Media",
	messages: "Messages & Enquiries",
	settings: "Website Settings",
	profile: "Profile"
};
function Notice({ children, tone = "success" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "status",
		className: `rounded border px-4 py-3 text-sm ${tone === "error" ? "border-rose-400/30 bg-rose-400/10 text-rose-100" : "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"}`,
		children
	});
}
function LoadingPanel({ label = "Loading studio workspace" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[50vh] items-center justify-center gap-3 text-sm text-white/55",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin text-amber-200" }), label]
	});
}
function SetupRequired() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "min-h-screen bg-[#11100d] px-5 py-16 text-stone-100",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: `${panelClass} mx-auto max-w-xl p-7 md:p-10`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Aperture, { className: "mb-6 h-8 w-8 text-amber-200" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.28em] text-amber-200",
					children: "Studio Admin"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl",
					children: "Connect secure media storage"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-6 text-white/60",
					children: "Admin access is disabled until a Supabase project is configured. Follow the setup steps to enable secure login, persistent uploads, and protected media management."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 rounded border border-white/10 bg-black/20 p-3 text-sm text-white/55",
					children: [
						"Setup instructions are in the project’s",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "text-amber-100",
							children: "SUPABASE_SETUP.md"
						}),
						" file."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-white/40",
					children: "No credentials are bundled in the site."
				})
			]
		})
	});
}
function AdminLayout() {
	const pathname = useLocation({ select: (location) => location.pathname });
	const navigate = useNavigate();
	const isPublicAdminRoute = pathname === "/admin/login" || pathname === "/admin/reset";
	const [state, setState] = (0, import_react.useState)("checking");
	(0, import_react.useEffect)(() => {
		if (isPublicAdminRoute) return;
		const client = getSupabase();
		if (!client) {
			setState("setup");
			return;
		}
		let active = true;
		client.auth.getSession().then(async ({ data, error }) => {
			if (!active) return;
			if (error || !data.session) {
				setState("checking");
				navigate({ to: "/admin/login" });
				return;
			}
			const { data: admin, error: adminError } = await client.from("admin_users").select("id").eq("id", data.session.user.id).maybeSingle();
			if (!active) return;
			if (adminError || !admin) {
				await client.auth.signOut();
				navigate({ to: "/admin/login" });
				return;
			}
			setState("ready");
		});
		return () => {
			active = false;
		};
	}, [
		isPublicAdminRoute,
		navigate,
		pathname
	]);
	if (isPublicAdminRoute) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	if (state === "setup") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupRequired, {});
	if (state !== "ready") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingPanel, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
function AdminFrame({ children }) {
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const pathname = useLocation({ select: (location) => location.pathname });
	const navigate = useNavigate();
	const active = pathname.split("/")[2] || "dashboard";
	const navItems = [
		[
			"dashboard",
			"Dashboard",
			LayoutDashboard
		],
		[
			"photos",
			"Photos",
			Image
		],
		[
			"videos",
			"Videos",
			Film
		],
		[
			"albums",
			"Albums",
			FolderOpen
		],
		[
			"media",
			"Media Library",
			Library
		],
		[
			"featured",
			"Featured",
			Star
		],
		[
			"messages",
			"Messages / Enquiries",
			Inbox
		],
		[
			"settings",
			"Website Settings",
			Settings
		],
		[
			"profile",
			"Profile",
			UserRound
		]
	];
	const logout = async () => {
		await getSupabase()?.auth.signOut();
		navigate({ to: "/admin/login" });
	};
	const nav = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: "/",
			className: "flex items-center gap-3 border-b border-white/10 px-5 py-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex h-10 w-10 items-center justify-center rounded-full border border-amber-200/40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Aperture, { className: "h-5 w-5 text-amber-200" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-display text-lg text-amber-100",
				children: "SRI LAKSHMI"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[9px] uppercase tracking-[0.22em] text-white/40",
				children: "Studio Admin"
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "space-y-1 p-3",
			"aria-label": "Admin navigation",
			children: navItems.map(([id, label, Icon]) => {
				const href = id === "dashboard" ? "/admin" : `/admin/${id}`;
				const selected = active === id || id === "dashboard" && pathname === "/admin/";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href,
					onClick: () => setMenuOpen(false),
					"aria-current": selected ? "page" : void 0,
					className: `flex min-h-11 items-center gap-3 rounded px-3 text-sm transition ${selected ? "bg-amber-200/10 text-amber-100" : "text-white/60 hover:bg-white/5 hover:text-white"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), label]
				}, id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-auto space-y-2 border-t border-white/10 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "/",
				className: "flex min-h-10 items-center gap-3 px-3 text-sm text-white/55 hover:text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "View website"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: logout,
				className: "flex min-h-10 w-full items-center gap-3 px-3 text-sm text-white/55 hover:text-rose-200",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), "Log out"]
			})]
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#11100d] text-stone-100",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-[#151410] lg:flex",
				children: nav
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/10 bg-[#11100d]/95 px-4 backdrop-blur lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: buttonClass,
					"aria-label": "Open admin menu",
					onClick: () => setMenuOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4 w-4" }), "Menu"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					className: "font-display text-lg text-amber-100",
					children: "SRI LAKSHMI"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "fixed inset-0 z-50 bg-black/70 lg:hidden",
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				onClick: () => setMenuOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.aside, {
					className: "flex h-full w-[min(84vw,300px)] flex-col border-r border-white/10 bg-[#151410]",
					initial: { x: -300 },
					animate: { x: 0 },
					exit: { x: -300 },
					onClick: (event) => event.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setMenuOpen(false),
						"aria-label": "Close menu",
						className: "absolute left-[min(calc(84vw-52px),248px)] top-3 flex h-10 w-10 items-center justify-center text-white/70",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
					}), nav]
				})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto min-h-[calc(100vh-3.5rem)] max-w-7xl px-4 py-7 sm:px-7 lg:ml-64 lg:px-10 lg:py-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-[0.3em] text-amber-200/70",
						children: "Sri Lakshmi Digital Studio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl",
						children: sectionLabels[active] ?? "Dashboard"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "hidden h-6 w-6 text-amber-200/70 sm:block" })]
				}), children]
			})
		]
	});
}
function AdminLoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [remember, setRemember] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [notice, setNotice] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setRemember(typeof window !== "undefined" && window.localStorage.getItem("studio-admin-remember") === "true");
	}, []);
	const submit = async (event) => {
		event.preventDefault();
		setError("");
		setNotice("");
		if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter a valid email address.");
		if (password.length < 8) return setError("Enter your password (at least 8 characters).");
		const client = getSupabase();
		if (!client) return setError("Admin authentication is not configured yet.");
		setRememberSession(remember);
		setBusy(true);
		const { data, error: authError } = await client.auth.signInWithPassword({
			email: email.trim(),
			password
		});
		if (authError || !data.user) {
			setError("Login failed. Check your credentials and try again.");
			setBusy(false);
			return;
		}
		const { data: admin, error: adminError } = await client.from("admin_users").select("id").eq("id", data.user.id).maybeSingle();
		if (adminError || !admin) {
			await client.auth.signOut();
			setError("This account does not have studio administrator access.");
			setBusy(false);
			return;
		}
		setBusy(false);
		navigate({ to: "/admin" });
	};
	const forgotPassword = async () => {
		setError("");
		setNotice("");
		if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter your account email first.");
		const client = getSupabase();
		if (!client) return setError("Admin authentication is not configured yet.");
		setBusy(true);
		const { error: resetError } = await client.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/admin/reset` });
		setBusy(false);
		if (resetError) setError("Could not send a reset email. Check your email settings and try again.");
		else setNotice("If this email belongs to an admin account, a password reset link has been sent.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-[#11100d] px-4 py-12 text-stone-100",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_15%_15%,rgba(194,153,73,0.12),transparent_40%),radial-gradient(ellipse_at_90%_85%,rgba(105,115,93,0.12),transparent_35%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: `${panelClass} relative w-full max-w-md p-6 shadow-2xl shadow-black/30 sm:p-9`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "/",
					className: "mb-8 inline-flex items-center gap-3 text-sm text-white/50 hover:text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "Back to website"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-12 w-12 items-center justify-center rounded-full border border-amber-200/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Aperture, { className: "h-6 w-6 text-amber-200" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-[0.3em] text-amber-200",
						children: "Studio Admin"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl",
						children: "Welcome back"
					})] })]
				}),
				!isSupabaseConfigured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupRequired, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "space-y-5",
					noValidate: true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block space-y-2 text-sm text-white/70",
							children: ["Email address", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								type: "email",
								autoComplete: "username",
								value: email,
								onChange: (event) => setEmail(event.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block space-y-2 text-sm text-white/70",
							children: ["Password", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: `${inputClass} pr-12`,
									type: showPassword ? "text" : "password",
									autoComplete: "current-password",
									value: password,
									onChange: (event) => setPassword(event.target.value),
									required: true,
									minLength: 8
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowPassword((shown) => !shown),
									className: "absolute inset-y-0 right-0 flex w-12 items-center justify-center text-white/50",
									"aria-label": showPassword ? "Hide password" : "Show password",
									children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex cursor-pointer items-center gap-2 text-sm text-white/55",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: remember,
								onChange: (event) => setRemember(event.target.checked),
								className: "accent-amber-200"
							}), "Remember this device"]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
							tone: "error",
							children: error
						}),
						notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: notice }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: `${primaryButton} w-full`,
							disabled: busy,
							children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), busy ? "Signing in…" : "Sign in"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: forgotPassword,
							disabled: busy,
							className: "w-full text-center text-sm text-amber-100/70 hover:text-amber-100",
							children: "Forgot password?"
						})
					]
				})
			]
		})]
	});
}
function PasswordResetPage() {
	const navigate = useNavigate();
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [done, setDone] = (0, import_react.useState)(false);
	const submit = async (event) => {
		event.preventDefault();
		if (password.length < 10) return setError("Use at least 10 characters for your new password.");
		const client = getSupabase();
		if (!client) return setError("Admin authentication is not configured.");
		setBusy(true);
		const { error: updateError } = await client.auth.updateUser({ password });
		setBusy(false);
		if (updateError) setError("The reset link is invalid or expired. Request a new one from the login page.");
		else setDone(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-screen items-center justify-center bg-[#11100d] px-4 text-stone-100",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: `${panelClass} w-full max-w-md p-7`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Aperture, { className: "mb-5 h-8 w-8 text-amber-200" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl",
					children: "Reset password"
				}),
				done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: "Password updated. Sign in with your new password." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => void navigate({ to: "/admin/login" }),
						className: primaryButton,
						children: "Go to login"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "mt-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block space-y-2 text-sm text-white/70",
							children: ["New password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputClass,
								type: "password",
								minLength: 10,
								autoComplete: "new-password",
								value: password,
								onChange: (event) => setPassword(event.target.value),
								required: true
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
							tone: "error",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: primaryButton,
							disabled: busy,
							children: busy ? "Saving…" : "Update password"
						})
					]
				})
			]
		})
	});
}
function SectionHeading({ title, description, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-wrap items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-3xl",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-white/50",
			children: description
		})] }), action]
	});
}
function AdminDashboard() {
	const [stats, setStats] = (0, import_react.useState)({
		photos: 0,
		videos: 0,
		weddings: 0,
		events: 0,
		shoots: 0,
		storage: 0,
		recent: []
	});
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const client = getSupabase();
		if (!client) return;
		let active = true;
		Promise.all([client.from("media").select("id, media_type, category, created_at, file_size, title, file_path, thumbnail_path").order("created_at", { ascending: false }), client.from("albums").select("id, category")]).then(async ([mediaResult, albumResult]) => {
			if (mediaResult.error || albumResult.error) throw mediaResult.error ?? albumResult.error;
			const media = mediaResult.data ?? [];
			const albums = albumResult.data ?? [];
			const recent = await Promise.all(media.slice(0, 5).map(async (item) => ({
				...item,
				thumbnail_url: await signedMediaUrl(item.thumbnail_path || item.file_path) ?? void 0
			})));
			if (!active) return;
			setStats({
				photos: media.filter((item) => item.media_type === "photo").length,
				videos: media.filter((item) => item.media_type === "video").length,
				weddings: albums.filter((item) => item.category === "Weddings").length,
				events: albums.filter((item) => item.category !== "Weddings" && item.category !== "Couple Shoots" && item.category !== "Portraits").length,
				shoots: albums.filter((item) => [
					"Couple Shoots",
					"Portraits",
					"Pre-Wedding",
					"Baby Shoots"
				].includes(item.category)).length,
				storage: media.reduce((total, item) => total + (Number(item.file_size) || 0), 0),
				recent
			});
		}).catch((reason) => {
			if (active) setError(reason instanceof Error ? reason.message : "Could not load dashboard statistics.");
		});
		return () => {
			active = false;
		};
	}, []);
	const cards = [
		[
			"Total Photos",
			stats.photos,
			Image
		],
		[
			"Total Videos",
			stats.videos,
			Film
		],
		[
			"Wedding Albums",
			stats.weddings,
			Aperture
		],
		[
			"Birthday / Event Albums",
			stats.events,
			CalendarDays
		],
		[
			"Photo Shoots",
			stats.shoots,
			Images
		],
		[
			"Storage Used",
			formatBytes(stats.storage),
			Library
		]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			title: "Overview",
			description: "Your studio library at a glance.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "/admin/photos",
				className: primaryButton,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Upload media"]
			})
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "error",
			children: error
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
			children: cards.map(([label, value, Icon], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
				className: `${panelClass} p-5`,
				initial: {
					opacity: 0,
					y: 12
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: index * .04 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-sm text-white/55",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-amber-200/75" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 font-display text-4xl text-amber-100",
					children: value
				})]
			}, label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: `${panelClass} mt-6 p-5`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "h-4 w-4 text-amber-200" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl",
					children: "Recently uploaded"
				})]
			}), stats.recent.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
				children: stats.recent.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "/admin/media",
					className: "group overflow-hidden rounded border border-white/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[4/3] bg-black/30",
						children: item.thumbnail_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.thumbnail_url,
							alt: "",
							loading: "lazy",
							className: "h-full w-full object-cover transition group-hover:scale-105"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-white/45",
							children: [
								item.media_type,
								" · ",
								item.category
							]
						})]
					})]
				}, item.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No uploads yet",
				detail: "Your new photos and films will appear here."
			})]
		})
	] });
}
function EmptyState({ title, detail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded border border-dashed border-white/15 px-5 py-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Images, { className: "mx-auto h-7 w-7 text-amber-200/60" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-white/45",
				children: detail
			})
		]
	});
}
function MediaUploader({ kind }) {
	const input = (0, import_react.useRef)(null);
	const controller = (0, import_react.useRef)(null);
	const previewUrls = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const [drafts, setDrafts] = (0, import_react.useState)([]);
	const [albums, setAlbums] = (0, import_react.useState)([]);
	const [title, setTitle] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)(MEDIA_CATEGORIES[0]);
	const [albumId, setAlbumId] = (0, import_react.useState)("");
	const [eventDate, setEventDate] = (0, import_react.useState)("");
	const [tags, setTags] = (0, import_react.useState)("");
	const [thumbnail, setThumbnail] = (0, import_react.useState)(null);
	const [publish, setPublish] = (0, import_react.useState)(true);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [notice, setNotice] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const isPhoto = kind === "photo";
	(0, import_react.useEffect)(() => {
		const client = getSupabase();
		if (!client) return;
		client.from("albums").select("id, title, description, category, event_date, cover_path, is_published, created_at").order("title").then(({ data }) => setAlbums(data ?? []));
	}, []);
	(0, import_react.useEffect)(() => () => previewUrls.current.forEach((url) => URL.revokeObjectURL(url)), []);
	const addFiles = (files) => {
		setNotice("");
		setError("");
		const accepted = Array.from(files).filter((file) => {
			const extension = file.name.split(".").pop()?.toLowerCase();
			const valid = isPhoto ? [
				"image/jpeg",
				"image/png",
				"image/webp"
			].includes(file.type) || [
				"jpg",
				"jpeg",
				"png",
				"webp"
			].includes(extension ?? "") : [
				"video/mp4",
				"video/webm",
				"video/quicktime"
			].includes(file.type) || [
				"mp4",
				"webm",
				"mov"
			].includes(extension ?? "");
			const sizeLimit = isPhoto ? 41943040 : 524288e3;
			if (!valid || file.size > sizeLimit) {
				setError(`${file.name}: choose a supported ${isPhoto ? "JPG, PNG, or WEBP image up to 40 MB" : "MP4, WebM, or MOV video up to 500 MB"}.`);
				return false;
			}
			return true;
		});
		setDrafts((current) => [...current, ...accepted.map((file) => {
			const preview = URL.createObjectURL(file);
			previewUrls.current.add(preview);
			return {
				file,
				preview
			};
		})]);
	};
	const removeDraft = (index) => setDrafts((current) => current.filter((draft, itemIndex) => {
		if (itemIndex === index) {
			URL.revokeObjectURL(draft.preview);
			previewUrls.current.delete(draft.preview);
		}
		return itemIndex !== index;
	}));
	const startUpload = async (event) => {
		event.preventDefault();
		setError("");
		setNotice("");
		if (!drafts.length) return setError(`Choose at least one ${isPhoto ? "photo" : "video"}.`);
		const client = getSupabase();
		if (!client) return setError("Supabase is not configured.");
		const { data: { user } } = await client.auth.getUser();
		if (!user) return setError("Your session expired. Please sign in again.");
		const abortController = new AbortController();
		controller.current = abortController;
		setBusy(true);
		setProgress(0);
		const uploadedPaths = [];
		const insertedIds = [];
		const cleanupPartialUpload = async () => {
			if (insertedIds.length) await client.from("media").delete().in("id", insertedIds);
			if (uploadedPaths.length) await client.storage.from(MEDIA_BUCKET).remove([...new Set(uploadedPaths)]);
		};
		let complete = 0;
		try {
			for (const [index, draft] of drafts.entries()) {
				if (abortController.signal.aborted) break;
				const id = crypto.randomUUID();
				const basePath = `${user.id}/${id}`;
				let mainFile = draft.file;
				let thumbFile = thumbnail;
				if (isPhoto) {
					const optimized = await optimizeImage(draft.file);
					mainFile = optimized.full;
					thumbFile = optimized.thumbnail;
				} else if (thumbnail) thumbFile = (await optimizeImage(thumbnail)).thumbnail;
				const mainPath = `${basePath}/${safeFileName(isPhoto ? `${id}.webp` : draft.file.name)}`;
				await uploadResumable(mainFile, mainPath, (ratio) => setProgress(Math.round((complete + ratio * .85) / drafts.length * 100)), abortController.signal);
				uploadedPaths.push(mainPath);
				let thumbnailPath = null;
				if (thumbFile) {
					thumbnailPath = `${basePath}/thumbnail.webp`;
					await uploadResumable(thumbFile, thumbnailPath, (ratio) => setProgress(Math.round((complete + .85 + ratio * .15) / drafts.length * 100)), abortController.signal);
					uploadedPaths.push(thumbnailPath);
				} else if (isPhoto) thumbnailPath = mainPath;
				const cleanTitle = title.trim() || draft.file.name.replace(/\.[^.]+$/, "");
				const { data: inserted, error: insertError } = await client.from("media").insert({
					title: drafts.length > 1 ? `${cleanTitle} ${index + 1}` : cleanTitle,
					description: description.trim(),
					original_filename: draft.file.name,
					file_path: mainPath,
					thumbnail_path: thumbnailPath,
					media_type: kind,
					category,
					album_id: albumId || null,
					tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean).slice(0, 20),
					event_date: eventDate || null,
					is_published: publish,
					is_featured: false,
					uploaded_by: user.id,
					file_size: mainFile.size
				}).select("id").single();
				if (insertError) throw insertError;
				insertedIds.push(inserted.id);
				complete += 1;
			}
			if (abortController.signal.aborted) {
				await cleanupPartialUpload();
				setNotice("Upload cancelled. No partial files were kept.");
			} else {
				setProgress(100);
				setNotice(`${complete} ${complete === 1 ? "item" : "items"} uploaded${publish ? " and published" : " as unpublished drafts"}.`);
			}
			drafts.forEach((draft) => {
				URL.revokeObjectURL(draft.preview);
				previewUrls.current.delete(draft.preview);
			});
			setDrafts([]);
			setTitle("");
			setDescription("");
			setTags("");
			setThumbnail(null);
			if (input.current) input.current.value = "";
		} catch (reason) {
			if (abortController.signal.aborted) {
				await cleanupPartialUpload();
				setNotice("Upload cancelled. No partial files were kept.");
			} else {
				await cleanupPartialUpload();
				setError(reason instanceof Error ? reason.message : "Upload failed. Please try again.");
			}
		} finally {
			controller.current = null;
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: startUpload,
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				title: isPhoto ? "Upload photos" : "Upload videos",
				description: isPhoto ? "JPG, JPEG, PNG, or WEBP · images are resized and converted to WebP." : "MP4, WebM, or MOV · uploaded in resumable chunks, up to 500 MB."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `${panelClass} p-5`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: busy,
						onClick: () => input.current?.click(),
						onDragOver: (event) => event.preventDefault(),
						onDrop: (event) => {
							event.preventDefault();
							addFiles(event.dataTransfer.files);
						},
						className: "flex min-h-36 w-full flex-col items-center justify-center rounded border border-dashed border-amber-200/30 bg-black/15 px-4 text-center transition hover:border-amber-200/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-6 w-6 text-amber-200" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-3 text-sm",
								children: [
									"Drop ",
									isPhoto ? "photos" : "videos",
									" here or browse"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 text-xs text-white/40",
								children: "Multiple files supported"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: input,
						className: "hidden",
						type: "file",
						multiple: true,
						accept: isPhoto ? "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" : "video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov",
						onChange: (event) => {
							if (event.target.files) addFiles(event.target.files);
						}
					}),
					drafts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4",
						children: drafts.map((draft, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative overflow-hidden rounded border border-white/10 bg-black/20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "aspect-[4/3]",
									children: isPhoto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: draft.preview,
										alt: draft.file.name,
										className: "h-full w-full object-cover"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
										src: draft.preview,
										controls: true,
										preload: "metadata",
										className: "h-full w-full object-cover"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs",
										children: draft.file.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-white/40",
										children: formatBytes(draft.file.size)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: busy,
									onClick: () => removeDraft(index),
									"aria-label": `Remove ${draft.file.name}`,
									className: "absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/75 text-white",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
								})
							]
						}, `${draft.file.name}-${index}`))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `${panelClass} grid gap-4 p-5 sm:grid-cols-2`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-2 text-xs text-white/55 sm:col-span-2",
						children: ["Title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							value: title,
							onChange: (event) => setTitle(event.target.value),
							placeholder: "Defaults to each filename",
							maxLength: 160
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-2 text-xs text-white/55 sm:col-span-2",
						children: ["Description", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: `${inputClass} min-h-24 py-3`,
							value: description,
							onChange: (event) => setDescription(event.target.value),
							maxLength: 2e3
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-2 text-xs text-white/55",
						children: ["Category", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: inputClass,
							value: category,
							onChange: (event) => setCategory(event.target.value),
							children: MEDIA_CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-2 text-xs text-white/55",
						children: ["Album", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: inputClass,
							value: albumId,
							onChange: (event) => setAlbumId(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "No album"
							}), albums.map((album) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: album.id,
								children: album.title
							}, album.id))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-2 text-xs text-white/55",
						children: ["Event date", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							type: "date",
							value: eventDate,
							onChange: (event) => setEventDate(event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-2 text-xs text-white/55",
						children: ["Tags, separated by commas", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							value: tags,
							onChange: (event) => setTags(event.target.value),
							placeholder: "haldi, candid, outdoor",
							maxLength: 500
						})]
					}),
					!isPhoto && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "space-y-2 text-xs text-white/55 sm:col-span-2",
						children: ["Optional thumbnail", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: `${inputClass} py-2`,
							type: "file",
							accept: "image/jpeg,image/png,image/webp",
							onChange: (event) => setThumbnail(event.target.files?.[0] ?? null)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm text-white/65 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: publish,
							onChange: (event) => setPublish(event.target.checked),
							className: "accent-amber-200"
						}), "Publish after upload"]
					})
				]
			}),
			busy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-2 overflow-hidden rounded-full bg-white/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full bg-amber-200 transition-[width]",
						style: { width: `${progress}%` }
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between text-xs text-white/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Uploading securely… ",
						progress,
						"%"
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => controller.current?.abort(),
						className: "text-rose-200",
						children: "Cancel upload"
					})]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "error",
				children: error
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: notice }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: primaryButton,
				disabled: busy || !drafts.length,
				children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }), busy ? "Uploading…" : `Upload ${drafts.length || "selected"} ${isPhoto ? "photo(s)" : "video(s)"}`]
			})
		]
	});
}
function AlbumManager() {
	const [albums, setAlbums] = (0, import_react.useState)([]);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [title, setTitle] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)(MEDIA_CATEGORIES[0]);
	const [eventDate, setEventDate] = (0, import_react.useState)("");
	const [cover, setCover] = (0, import_react.useState)(null);
	const [published, setPublished] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [notice, setNotice] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const load = async () => {
		const client = getSupabase();
		if (!client) return;
		const { data, error: queryError } = await client.from("albums").select("*").order("created_at", { ascending: false });
		if (queryError) setError(queryError.message);
		else setAlbums(data ?? []);
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const resetForm = () => {
		setEditing(null);
		setTitle("");
		setDescription("");
		setEventDate("");
		setCover(null);
		setPublished(false);
	};
	const save = async (event) => {
		event.preventDefault();
		const client = getSupabase();
		if (!client || !title.trim()) return setError("Album title is required.");
		setBusy(true);
		setError("");
		setNotice("");
		try {
			let coverPath = editing ? albums.find((album) => album.id === editing)?.cover_path ?? null : null;
			if (cover) {
				const { data: { user } } = await client.auth.getUser();
				if (!user) throw new Error("Your session expired. Please log in again.");
				const optimized = await optimizeImage(cover);
				coverPath = `${user.id}/${crypto.randomUUID()}/cover.webp`;
				await uploadResumable(optimized.thumbnail, coverPath, () => void 0, new AbortController().signal);
			}
			const values = {
				title: title.trim(),
				description: description.trim(),
				category,
				event_date: eventDate || null,
				cover_path: coverPath,
				is_published: published,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			const result = editing ? await client.from("albums").update(values).eq("id", editing) : await client.from("albums").insert({
				...values,
				created_by: (await client.auth.getUser()).data.user?.id
			});
			if (result.error) throw result.error;
			setNotice(editing ? "Album updated." : "Album created.");
			resetForm();
			await load();
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Could not save album.");
		} finally {
			setBusy(false);
		}
	};
	const remove = async (album) => {
		if (!window.confirm(`Delete album “${album.title}”? Media in the album will be kept without an album.`)) return;
		const client = getSupabase();
		if (!client) return;
		const { error: deleteError } = await client.from("albums").delete().eq("id", album.id);
		if (deleteError) setError(deleteError.message);
		else {
			setNotice("Album deleted.");
			await load();
		}
	};
	const startEdit = (album) => {
		setEditing(album.id);
		setTitle(album.title);
		setDescription(album.description);
		setCategory(album.category);
		setEventDate(album.event_date ?? "");
		setPublished(album.is_published);
		setCover(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			title: "Albums",
			description: "Create and organize event collections."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: save,
			className: `${panelClass} mb-6 grid gap-4 p-5 sm:grid-cols-2`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "space-y-2 text-xs text-white/55",
					children: ["Album name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						required: true,
						value: title,
						onChange: (event) => setTitle(event.target.value),
						maxLength: 140
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "space-y-2 text-xs text-white/55",
					children: ["Category", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: inputClass,
						value: category,
						onChange: (event) => setCategory(event.target.value),
						children: MEDIA_CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "space-y-2 text-xs text-white/55 sm:col-span-2",
					children: ["Description", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: `${inputClass} min-h-20 py-3`,
						value: description,
						onChange: (event) => setDescription(event.target.value),
						maxLength: 2e3
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "space-y-2 text-xs text-white/55",
					children: ["Event date", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						type: "date",
						value: eventDate,
						onChange: (event) => setEventDate(event.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "space-y-2 text-xs text-white/55",
					children: ["Cover image", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: `${inputClass} py-2`,
						type: "file",
						accept: "image/jpeg,image/png,image/webp",
						onChange: (event) => setCover(event.target.files?.[0] ?? null)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 text-sm text-white/65",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: published,
						onChange: (event) => setPublished(event.target.checked),
						className: "accent-amber-200"
					}), "Publish album"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 sm:justify-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: primaryButton,
						disabled: busy,
						children: busy ? "Saving…" : editing ? "Save changes" : "Create album"
					}), editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: buttonClass,
						onClick: resetForm,
						children: "Cancel"
					})]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "error",
						children: error
					})
				}),
				notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: notice })
				})
			]
		}),
		albums.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 md:grid-cols-2 xl:grid-cols-3",
			children: albums.map((album) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlbumCard, {
				album,
				onEdit: () => startEdit(album),
				onDelete: () => void remove(album)
			}, album.id))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No albums yet",
			detail: "Create your first album above."
		})
	] });
}
function AlbumCard({ album, onEdit, onDelete }) {
	const [coverUrl, setCoverUrl] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let active = true;
		if (album.cover_path) signedMediaUrl(album.cover_path).then((url) => {
			if (active && url) setCoverUrl(url);
		});
		return () => {
			active = false;
		};
	}, [album.cover_path]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: `${panelClass} overflow-hidden`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "aspect-[16/8] bg-black/25",
			children: coverUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: coverUrl,
				alt: "",
				loading: "lazy",
				className: "h-full w-full object-cover"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl",
						children: album.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-white/45",
						children: [album.category, album.event_date ? ` · ${album.event_date}` : ""]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `rounded px-2 py-1 text-[10px] uppercase ${album.is_published ? "bg-emerald-300/10 text-emerald-200" : "bg-white/10 text-white/45"}`,
						children: album.is_published ? "Published" : "Draft"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 line-clamp-2 text-sm text-white/50",
					children: album.description || "No description"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: buttonClass,
						onClick: onEdit,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" }), "Edit"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: `${buttonClass} text-rose-200`,
						onClick: onDelete,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), "Delete"]
					})]
				})
			]
		})]
	});
}
function MediaLibrary({ featuredOnly = false }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [albums, setAlbums] = (0, import_react.useState)([]);
	const [search, setSearch] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("all");
	const [publication, setPublication] = (0, import_react.useState)("all");
	const [category, setCategory] = (0, import_react.useState)("all");
	const [albumId, setAlbumId] = (0, import_react.useState)("all");
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [notice, setNotice] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const load = async () => {
		const client = getSupabase();
		if (!client) {
			setLoading(false);
			return;
		}
		setLoading(true);
		const [mediaResult, albumsResult] = await Promise.all([client.from("media").select("*, albums(title)").order("created_at", { ascending: false }), client.from("albums").select("id, title, description, category, event_date, cover_path, is_published, created_at").order("title")]);
		if (mediaResult.error || albumsResult.error) setError((mediaResult.error ?? albumsResult.error)?.message ?? "Could not load media.");
		const rows = mediaResult.data ?? [];
		setItems(await Promise.all(rows.map(async (row) => ({
			...row,
			url: await signedMediaUrl(row.file_path) ?? void 0,
			thumbnail_url: await signedMediaUrl(row.thumbnail_path || row.file_path) ?? void 0
		}))));
		setAlbums(albumsResult.data ?? []);
		setLoading(false);
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const categories = Array.from(new Set(items.map((item) => item.category)));
	const filtered = items.filter((item) => (!featuredOnly || item.is_featured) && (type === "all" || item.media_type === type) && (publication === "all" || String(item.is_published) === publication) && (category === "all" || item.category === category) && (albumId === "all" || item.album_id === albumId) && `${item.title} ${item.description} ${item.original_filename} ${item.tags.join(" ")}`.toLowerCase().includes(search.toLowerCase()));
	const deleteItem = async (item) => {
		if (!window.confirm("Are you sure you want to permanently delete this media?")) return;
		const client = getSupabase();
		if (!client) return;
		setError("");
		const { error: recordError } = await client.from("media").delete().eq("id", item.id);
		if (recordError) return setError(recordError.message);
		const paths = [item.file_path, item.thumbnail_path].filter((path) => Boolean(path) && path !== item.file_path);
		if (paths.length) {
			const { error: storageError } = await client.storage.from(MEDIA_BUCKET).remove([item.file_path, ...paths]);
			if (storageError) setError(`Media record deleted, but storage cleanup failed: ${storageError.message}`);
		} else {
			const { error: storageError } = await client.storage.from(MEDIA_BUCKET).remove([item.file_path]);
			if (storageError) setError(`Media record deleted, but storage cleanup failed: ${storageError.message}`);
		}
		setItems((current) => current.filter((entry) => entry.id !== item.id));
		setNotice("Media deleted.");
	};
	const updateFlags = async (item, values) => {
		const client = getSupabase();
		if (!client) return;
		const { error: updateError } = await client.from("media").update({
			...values,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", item.id);
		if (updateError) setError(updateError.message);
		else {
			setItems((current) => current.map((entry) => entry.id === item.id ? {
				...entry,
				...values
			} : entry));
			setNotice("Media updated.");
		}
	};
	const saveEdit = async (event) => {
		event.preventDefault();
		if (!editing) return;
		const formData = new FormData(event.currentTarget);
		const client = getSupabase();
		if (!client) return;
		const update = {
			title: String(formData.get("title") ?? "").trim(),
			description: String(formData.get("description") ?? "").trim(),
			category: String(formData.get("category") ?? "Other"),
			album_id: String(formData.get("album_id") ?? "") || null,
			tags: String(formData.get("tags") ?? "").split(",").map((tag) => tag.trim()).filter(Boolean).slice(0, 20),
			event_date: String(formData.get("event_date") ?? "") || null,
			is_published: formData.get("is_published") === "on",
			is_featured: formData.get("is_featured") === "on",
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		};
		if (!update.title) return setError("A title is required.");
		const { error: updateError } = await client.from("media").update(update).eq("id", editing.id);
		if (updateError) setError(updateError.message);
		else {
			setNotice("Media details saved.");
			setEditing(null);
			await load();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			title: featuredOnly ? "Featured media" : "Media library",
			description: "Search, filter, publish, feature, edit, or remove your uploads."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `${panelClass} mb-5 grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-5`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "relative md:col-span-2 xl:col-span-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-3 h-4 w-4 text-white/35" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: `${inputClass} pl-9`,
						value: search,
						onChange: (event) => setSearch(event.target.value),
						placeholder: "Search media"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: inputClass,
					value: type,
					onChange: (event) => setType(event.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All types"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "photo",
							children: "Photos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "video",
							children: "Videos"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: inputClass,
					value: publication,
					onChange: (event) => setPublication(event.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All publication states"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "true",
							children: "Published"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "false",
							children: "Unpublished"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: inputClass,
					value: category,
					onChange: (event) => setCategory(event.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "All categories"
					}), categories.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: inputClass,
					value: albumId,
					onChange: (event) => setAlbumId(event.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "All albums"
					}), albums.map((album) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: album.id,
						children: album.title
					}, album.id))]
				})
			]
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "error",
				children: error
			})
		}),
		notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: notice })
		}),
		loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingPanel, { label: "Loading media library" }) : filtered.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
			children: filtered.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: `${panelClass} overflow-hidden`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-[4/3] bg-black/30",
					children: [
						item.media_type === "video" && item.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
							src: item.url,
							poster: item.thumbnail_url,
							controls: true,
							preload: "none",
							className: "h-full w-full object-cover"
						}) : item.thumbnail_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.thumbnail_url,
							alt: item.title,
							loading: "lazy",
							className: "h-full w-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-3 top-3 rounded bg-black/70 px-2 py-1 text-[10px] uppercase",
							children: item.media_type
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `absolute right-3 top-3 rounded px-2 py-1 text-[10px] ${item.is_published ? "bg-emerald-950 text-emerald-100" : "bg-black/75 text-white/60"}`,
							children: item.is_published ? "Published" : "Unpublished"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "truncate font-display text-xl",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 truncate text-xs text-white/45",
							children: item.original_filename
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-white/50",
							children: [
								item.category,
								item.albums?.title ? ` · ${item.albums.title}` : " · No album",
								" ·",
								" ",
								new Date(item.created_at).toLocaleDateString()
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: buttonClass,
									onClick: () => setEditing(item),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" }), "Edit"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: buttonClass,
									onClick: () => void updateFlags(item, { is_published: !item.is_published }),
									children: item.is_published ? "Unpublish" : "Publish"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: `${buttonClass} ${item.is_featured ? "text-amber-200" : ""}`,
									onClick: () => void updateFlags(item, { is_featured: !item.is_featured }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
										className: "h-4 w-4",
										fill: item.is_featured ? "currentColor" : "none"
									}), item.is_featured ? "Featured" : "Feature"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									"aria-label": `Delete ${item.title}`,
									className: `${buttonClass} text-rose-200`,
									onClick: () => void deleteItem(item),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})
							]
						})
					]
				})]
			}, item.id))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: featuredOnly ? "No featured media" : "No media matches",
			detail: featuredOnly ? "Mark an upload as featured in the media library." : "Try another search or upload your first media item."
		}),
		editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/80 p-4",
			role: "presentation",
			onMouseDown: (event) => {
				if (event.target === event.currentTarget) setEditing(null);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: saveEdit,
				className: `${panelClass} my-auto w-full max-w-xl space-y-4 p-5`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: "Edit media"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Close editor",
							onClick: () => setEditing(null),
							className: "text-white/50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block space-y-2 text-xs text-white/55",
						children: ["Title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							name: "title",
							defaultValue: editing.title,
							required: true,
							maxLength: 160
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block space-y-2 text-xs text-white/55",
						children: ["Description", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: `${inputClass} min-h-20 py-3`,
							name: "description",
							defaultValue: editing.description,
							maxLength: 2e3
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "space-y-2 text-xs text-white/55",
							children: ["Category", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: inputClass,
								name: "category",
								defaultValue: editing.category,
								children: MEDIA_CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "space-y-2 text-xs text-white/55",
							children: ["Album", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: inputClass,
								name: "album_id",
								defaultValue: editing.album_id ?? "",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "No album"
								}), albums.map((album) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: album.id,
									children: album.title
								}, album.id))]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block space-y-2 text-xs text-white/55",
						children: ["Tags, separated by commas", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							name: "tags",
							defaultValue: editing.tags.join(", ")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block space-y-2 text-xs text-white/55",
						children: ["Event date", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							name: "event_date",
							type: "date",
							defaultValue: editing.event_date ?? ""
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm text-white/65",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								name: "is_published",
								defaultChecked: editing.is_published,
								className: "accent-amber-200"
							}), "Published"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm text-white/65",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								name: "is_featured",
								defaultChecked: editing.is_featured,
								className: "accent-amber-200"
							}), "Featured"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: primaryButton,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), "Save media"]
					})
				]
			})
		})
	] });
}
function EnquiriesPage() {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
	const load = async () => {
		const client = getSupabase();
		if (!client) return;
		const { data, error: queryError } = await client.from("enquiries").select("*").order("created_at", { ascending: false });
		if (queryError) setError(queryError.message);
		else setRows(data ?? []);
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const setStatus = async (id, status) => {
		const client = getSupabase();
		if (!client) return;
		const { error: updateError } = await client.from("enquiries").update({ status }).eq("id", id);
		if (updateError) setError(updateError.message);
		else await load();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			title: "Messages & enquiries",
			description: "Booking enquiries submitted through the site."
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "error",
			children: error
		}),
		rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: `${panelClass} grid gap-4 p-4 md:grid-cols-[1fr_auto]`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl",
							children: String(row.name)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-white/40",
							children: new Date(String(row.created_at)).toLocaleString()
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-white/65",
						children: [
							String(row.phone),
							" · ",
							String(row.email || "No email")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-white/50",
						children: [
							String(row.event_type || "Event"),
							row.event_date ? ` · ${String(row.event_date)}` : "",
							row.location ? ` · ${String(row.location)}` : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 whitespace-pre-wrap text-sm",
						children: String(row.message || "")
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: buttonClass,
						href: `https://wa.me/${String(row.phone).replace(/\D/g, "")}`,
						target: "_blank",
						rel: "noreferrer",
						children: "WhatsApp"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						"aria-label": "Enquiry status",
						className: `${inputClass} w-32`,
						value: String(row.status),
						onChange: (event) => void setStatus(String(row.id), event.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "new",
								children: "New"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "contacted",
								children: "Contacted"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "closed",
								children: "Closed"
							})
						]
					})]
				})]
			}, String(row.id)))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No enquiries yet",
			detail: "Website booking enquiries will be collected here."
		})
	] });
}
function WebsiteSettingsPage() {
	const [settings, setSettings] = (0, import_react.useState)(DEFAULT_SITE_SETTINGS);
	const [error, setError] = (0, import_react.useState)("");
	const [notice, setNotice] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const client = getSupabase();
		if (!client) return;
		client.from("site_settings").select("phone, email, address, hours").eq("id", 1).maybeSingle().then(({ data, error: queryError }) => {
			if (queryError) setError(queryError.message);
			else if (data) setSettings({
				...DEFAULT_SITE_SETTINGS,
				...data
			});
		});
	}, []);
	const save = async (event) => {
		event.preventDefault();
		setError("");
		setNotice("");
		const client = getSupabase();
		if (!client) return setError("Supabase is not configured.");
		if (!settings.phone.trim() || !settings.email.trim() || !settings.address.trim() || !settings.hours.trim()) return setError("Please complete all contact fields.");
		setBusy(true);
		const { error: saveError } = await client.from("site_settings").update({
			phone: settings.phone.trim(),
			email: settings.email.trim(),
			address: settings.address.trim(),
			hours: settings.hours.trim(),
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", 1);
		setBusy(false);
		if (saveError) setError(saveError.message);
		else setNotice("Website contact settings saved. The public site will update automatically.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			title: "Website settings",
			description: "Update contact information shown across the public studio website."
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "error",
			children: error
		}),
		notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: notice })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: save,
			className: `${panelClass} mt-5 grid gap-4 p-5 sm:grid-cols-2`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "space-y-2 text-xs text-white/55",
					children: ["Phone number", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						type: "tel",
						value: settings.phone,
						onChange: (event) => setSettings((current) => ({
							...current,
							phone: event.target.value
						})),
						required: true,
						maxLength: 40
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "space-y-2 text-xs text-white/55",
					children: ["Email address", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						type: "email",
						value: settings.email,
						onChange: (event) => setSettings((current) => ({
							...current,
							email: event.target.value
						})),
						required: true,
						maxLength: 254
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "space-y-2 text-xs text-white/55 sm:col-span-2",
					children: ["Studio address", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						value: settings.address,
						onChange: (event) => setSettings((current) => ({
							...current,
							address: event.target.value
						})),
						required: true,
						maxLength: 300
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "space-y-2 text-xs text-white/55 sm:col-span-2",
					children: ["Business hours", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						value: settings.hours,
						onChange: (event) => setSettings((current) => ({
							...current,
							hours: event.target.value
						})),
						required: true,
						maxLength: 120
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: primaryButton,
						disabled: busy,
						children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), busy ? "Saving…" : "Save website settings"]
					})
				})
			]
		})
	] });
}
function SettingsPage() {
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [notice, setNotice] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const client = getSupabase();
		if (!client) return;
		client.auth.getUser().then(async ({ data }) => {
			if (!data.user) return;
			setEmail(data.user.email ?? "");
			const { data: profile } = await client.from("admin_users").select("display_name").eq("id", data.user.id).maybeSingle();
			setDisplayName(profile?.display_name ?? "");
		});
	}, []);
	const saveProfile = async (event) => {
		event.preventDefault();
		const client = getSupabase();
		if (!client) return;
		const { data: { user } } = await client.auth.getUser();
		if (!user) return;
		const { error: updateError } = await client.from("admin_users").update({ display_name: displayName.trim() }).eq("id", user.id);
		if (updateError) setError(updateError.message);
		else setNotice("Profile updated.");
	};
	const changePassword = async (event) => {
		event.preventDefault();
		if (newPassword.length < 10) return setError("Use at least 10 characters for your password.");
		const client = getSupabase();
		if (!client) return;
		const { error: updateError } = await client.auth.updateUser({ password: newPassword });
		if (updateError) setError(updateError.message);
		else {
			setNewPassword("");
			setNotice("Password updated.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			title: "Profile",
			description: "Manage the studio owner profile and sign-in security."
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "error",
			children: error
		}),
		notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: notice })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-5 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: saveProfile,
				className: `${panelClass} space-y-4 p-5`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Profile"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block space-y-2 text-xs text-white/55",
						children: ["Account email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							value: email,
							readOnly: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block space-y-2 text-xs text-white/55",
						children: ["Display name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							value: displayName,
							onChange: (event) => setDisplayName(event.target.value),
							maxLength: 100
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: primaryButton,
						children: "Save profile"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: changePassword,
				className: `${panelClass} space-y-4 p-5`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Change password"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-white/50",
						children: "Use at least 10 characters. Your session remains protected by Supabase Auth."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block space-y-2 text-xs text-white/55",
						children: ["New password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							type: "password",
							autoComplete: "new-password",
							value: newPassword,
							onChange: (event) => setNewPassword(event.target.value),
							minLength: 10,
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: buttonClass,
						children: "Update password"
					})
				]
			})]
		})
	] });
}
function AdminDashboardRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDashboard, {});
}
function AdminSectionRoute({ section }) {
	if (section === "photos") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaUploader, { kind: "photo" });
	if (section === "videos") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaUploader, { kind: "video" });
	if (section === "albums") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlbumManager, {});
	if (section === "media") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaLibrary, {});
	if (section === "featured") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaLibrary, { featuredOnly: true });
	if (section === "messages") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnquiriesPage, {});
	if (section === "settings") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteSettingsPage, {});
	if (section === "profile") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPage, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "Admin section not found",
		detail: "Choose a section from the sidebar."
	});
}
function formatBytes(value) {
	if (!value) return "0 B";
	const units = [
		"B",
		"KB",
		"MB",
		"GB",
		"TB"
	];
	const power = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1);
	return `${(value / 1024 ** power).toFixed(power ? 1 : 0)} ${units[power]}`;
}
//#endregion
export { PasswordResetPage as a, AdminSectionRoute as i, AdminLayout as n, AdminLoginPage as r, AdminDashboardRoute as t };
