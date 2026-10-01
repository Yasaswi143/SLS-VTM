import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as isSupabaseConfigured, i as getSupabase, s as useSiteSettings } from "./site-settings-B-vep3b1.mjs";
import { n as getPublicMedia } from "./admin-media-Cs_Z7fWc.mjs";
import { i as useScroll, n as useSpring, o as AnimatePresence, r as useTransform, t as useInView } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { $ as ArrowUp, C as MapPin, G as ChevronLeft, I as Flower2, J as Camera, K as ChevronDown, L as Film, N as Heart, P as HeartHandshake, Q as Award, R as Facebook, S as Menu, U as CircleCheck, V as Clock, W as ChevronRight, X as Cake, Z as Baby, _ as Play, a as Video, b as PartyPopper, d as Star, f as Sparkles, i as WandSparkles, k as Instagram, n as Youtube, o as Users, p as ShieldCheck, r as X, s as User, t as Zap, tt as Aperture, v as Phone, w as Mail, x as MessageCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DZ4rTc5a.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var sl_hero_default = "/assets/sl-hero-DNtXw8tj.jpg";
var sl_bride_default = "/assets/sl-bride-BCLK3H1i.jpg";
var sl_birthday_default = "/assets/sl-birthday-B1CILpcs.jpg";
var sl_couple_default = "/assets/sl-couple-B1rgaIcv.jpg";
var sl_haldi_default = "/assets/sl-haldi-Ckc-wKwF.jpg";
var sl_baby_default = "/assets/sl-baby-BXqUYbMx.jpg";
var sl_family_default = "/assets/sl-family-Cn5DM4CC.jpg";
var sl_reception_default = "/assets/sl-reception-DGk_z9d3.jpg";
var STUDIO = "Sri Lakshmi Digital Studio and Video";
var PHONE = "+919133418773";
var WA_MSG = "Hello Sri Lakshmi Digital Studio and Video, I would like to enquire about your photography services.";
var waLink = (msg = WA_MSG, phone = PHONE) => `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
var INSTA = "https://instagram.com/SriLakshmiDigitalStudio";
var NAV = [
	["Home", "home"],
	["About", "about"],
	["Services", "services"],
	["Weddings", "weddings"],
	["Birthdays", "birthdays"],
	["Photo Shoots", "shoots"],
	["Gallery", "gallery"],
	["Videos", "videos"],
	["Testimonials", "testimonials"],
	["Contact", "contact"]
];
var go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
function Reveal({ children, delay = 0, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className,
		initial: {
			opacity: 0,
			y: 40
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-80px"
		},
		transition: {
			duration: .9,
			delay,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		children
	});
}
function Heading({ kicker, title, sub, center = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
		className: `mb-14 ${center ? "text-center mx-auto" : ""} max-w-3xl`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs tracking-[0.4em] uppercase text-gold mb-4 flex items-center gap-3 justify-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-gold/60" }),
					kicker,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-gold/60" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-4xl md:text-6xl font-medium leading-[1.05]",
				children: title
			}),
			sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-muted-foreground text-lg font-light",
				children: sub
			})
		]
	});
}
function GoldButton({ children, onClick, href, outline, className = "", type, disabled }) {
	const cls = `group relative inline-flex items-center justify-center gap-2 px-7 py-4 text-xs tracking-[0.25em] uppercase font-medium transition-all duration-500 min-h-12 ${outline ? "border border-gold/60 text-gold hover:bg-gold hover:text-primary-foreground" : "bg-gold-gradient text-primary-foreground shadow-gold hover:scale-[1.03]"} ${className}`;
	if (href) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		target: "_blank",
		rel: "noreferrer",
		className: cls,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: type ?? "button",
		onClick,
		className: cls,
		disabled,
		children
	});
}
function Particles({ count = 24 }) {
	const [ps, setPs] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		setPs(Array.from({ length: count }, () => ({
			l: Math.random() * 100,
			s: 1 + Math.random() * 3,
			d: 10 + Math.random() * 14,
			delay: Math.random() * 12
		})));
	}, [count]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 overflow-hidden pointer-events-none",
		children: ps.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "particle",
			style: {
				left: `${p.l}%`,
				width: p.s,
				height: p.s,
				animationDuration: `${p.d}s`,
				animationDelay: `${p.delay}s`
			}
		}, i))
	});
}
function Intro({ onDone }) {
	(0, import_react.useEffect)(() => {
		const t = setTimeout(onDone, 2600);
		return () => clearTimeout(t);
	}, [onDone]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "fixed inset-0 z-[100] bg-ink flex items-center justify-center",
		exit: { opacity: 0 },
		transition: { duration: .8 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-40 h-40",
			children: [Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute inset-0 origin-center",
				style: {
					clipPath: "polygon(50% 50%, 100% 0, 100% 60%)",
					rotate: i * 60,
					background: "var(--gold)"
				},
				initial: { scale: 1 },
				animate: {
					scale: [
						1,
						1,
						0
					],
					rotate: [
						i * 60,
						i * 60,
						i * 60 + 90
					]
				},
				transition: {
					duration: 1.1,
					times: [
						0,
						.4,
						1
					],
					ease: "easeInOut"
				}
			}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute inset-0 flex items-center justify-center",
				initial: {
					opacity: 0,
					scale: .8
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				transition: {
					delay: 1,
					duration: .8
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Aperture, {
					className: "w-14 h-14 text-gold",
					strokeWidth: 1
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
			className: "absolute bottom-1/4 font-display text-2xl md:text-3xl tracking-[0.3em] uppercase text-gold-gradient text-center px-6",
			initial: {
				opacity: 0,
				letterSpacing: "0.6em"
			},
			animate: {
				opacity: 1,
				letterSpacing: "0.3em"
			},
			transition: {
				delay: 1.3,
				duration: 1.1
			},
			children: "Sri Lakshmi"
		})]
	});
}
function Navbar({ show }) {
	const settings = useSiteSettings();
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const f = () => setScrolled(window.scrollY > 40);
		f();
		window.addEventListener("scroll", f);
		return () => window.removeEventListener("scroll", f);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.header, {
		initial: {
			y: -80,
			opacity: 0
		},
		animate: show ? {
			y: 0,
			opacity: 1
		} : {},
		transition: {
			duration: .8,
			delay: .3
		},
		className: `fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "glass border-b border-border py-3" : "py-5"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto px-5 flex items-center justify-between gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => go("home"),
					className: "flex items-center gap-3 text-left",
					"aria-label": "Go to top",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-10 h-10 rounded-full border border-gold/60 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Aperture, {
							className: "w-5 h-5 text-gold",
							strokeWidth: 1.3
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-lg tracking-[0.15em] text-gold-gradient font-semibold",
							children: "SRI LAKSHMI"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[9px] tracking-[0.35em] text-muted-foreground",
							children: "DIGITAL STUDIO & VIDEO"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden xl:flex items-center gap-5",
					children: NAV.map(([l, id]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => go(id),
						className: "relative text-[11px] tracking-[0.2em] uppercase text-foreground/80 hover:text-gold transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left",
						children: l
					}, id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `tel:${settings.phone.replace(/[^+\d]/g, "")}`,
							"aria-label": "Call the studio",
							className: "w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center text-gold hover:bg-gold hover:text-primary-foreground transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-4 h-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "/admin/login",
							className: "inline-flex h-10 items-center gap-2 border border-gold/40 px-3 text-[10px] uppercase tracking-[0.15em] text-gold transition hover:bg-gold hover:text-primary-foreground",
							"aria-label": "Admin login",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Admin"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: waLink(WA_MSG, settings.phone),
							target: "_blank",
							rel: "noreferrer",
							"aria-label": "WhatsApp the studio",
							className: "w-10 h-10 rounded-full bg-whatsapp flex items-center justify-center text-ivory",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-4 h-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setOpen(true),
							className: "xl:hidden w-10 h-10 flex items-center justify-center text-gold",
							"aria-label": "Open menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			className: "fixed inset-0 z-50 bg-ink/97 flex flex-col items-center justify-center gap-5 h-dvh",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setOpen(false),
				className: "absolute top-5 right-5 text-gold w-12 h-12 flex items-center justify-center",
				"aria-label": "Close menu",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
			}), NAV.map(([l, id], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: i * .04 },
				onClick: () => {
					setOpen(false);
					setTimeout(() => go(id), 150);
				},
				className: "font-display text-3xl text-foreground hover:text-gold",
				children: l
			}, id))]
		}) })]
	});
}
function Hero({ show }) {
	const ref = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	});
	const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "home",
		ref,
		className: "relative h-dvh min-h-[640px] overflow-hidden flex items-center justify-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				style: { y },
				className: "absolute inset-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
					src: sl_hero_default,
					alt: "Bride and groom under golden marigold lights",
					width: 1920,
					height: 1088,
					className: "w-full h-full object-cover",
					initial: {
						scale: 1.2,
						opacity: 0
					},
					animate: show ? {
						scale: 1,
						opacity: 1
					} : {},
					transition: {
						duration: 2.4,
						ease: "easeOut"
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-background" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gold/20 blur-[120px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Particles, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 text-center px-5 max-w-5xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: { opacity: 0 },
						animate: show ? { opacity: 1 } : {},
						transition: {
							delay: .5,
							duration: 1
						},
						className: "text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold mb-6",
						children: "Weddings · Events · Portraits · Films"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
						initial: {
							opacity: 0,
							y: 40
						},
						animate: show ? {
							opacity: 1,
							y: 0
						} : {},
						transition: {
							delay: .7,
							duration: 1.2,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: "text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[0.95] tracking-wide",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gold-gradient",
								children: "SRI LAKSHMI"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xl sm:text-4xl md:text-5xl tracking-[0.12em] text-ivory",
								children: "Digital Studio & Video"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: { opacity: 0 },
						animate: show ? { opacity: 1 } : {},
						transition: {
							delay: 1.3,
							duration: 1
						},
						className: "mt-8 font-display italic text-xl md:text-3xl text-ivory/90",
						children: "\"We Capture Moments. You Keep the Memories.\""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: show ? {
							opacity: 1,
							y: 0
						} : {},
						transition: {
							delay: 1.6,
							duration: .8
						},
						className: "mt-10 flex flex-col sm:flex-row gap-4 justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
							onClick: () => go("gallery"),
							children: "Explore Our Work"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
							outline: true,
							onClick: () => go("booking"),
							children: "Book Your Session"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => go("about"),
				"aria-label": "Scroll down",
				className: "absolute bottom-8 left-1/2 -translate-x-1/2 text-gold flex flex-col items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] tracking-[0.4em] uppercase",
					children: "Scroll"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
					animate: { y: [
						0,
						8,
						0
					] },
					transition: {
						repeat: Infinity,
						duration: 1.8
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {})
				})]
			})
		]
	});
}
function Counter({ to, suffix }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, { once: true });
	const [n, setN] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!inView) return;
		let raf = 0;
		const start = performance.now();
		const tick = (t) => {
			const p = Math.min((t - start) / 1800, 1);
			setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [inView, to]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		ref,
		children: [n.toLocaleString(), suffix]
	});
}
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "about",
		className: "py-28 px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-4 border border-gold/30 translate-x-6 translate-y-6" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: sl_bride_default,
						alt: "Bride portrait with gold jewellery",
						loading: "lazy",
						width: 832,
						height: 1152,
						className: "relative w-full aspect-[4/5] object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute -bottom-6 -left-4 glass border border-gold/40 px-6 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl text-gold-gradient",
							children: "Since 2015"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] tracking-[0.3em] uppercase text-muted-foreground",
							children: "Trusted by families"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
					center: false,
					kicker: "About the Studio",
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Stories That Deserve ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
						className: "text-gold-gradient",
						children: "To Be Remembered"
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground text-lg font-light leading-relaxed",
						children: [
							"At ",
							STUDIO,
							", we capture emotional, authentic and unforgettable moments through professional photography and cinematic videography. From the first haldi laugh to the last reception dance, every frame is crafted to bring the feeling back — years from now."
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-6 mt-12",
					children: [
						[
							500,
							"+",
							"Events Captured"
						],
						[
							1e3,
							"+",
							"Happy Clients"
						],
						[
							10,
							"+",
							"Years of Experience"
						],
						[
							1e3,
							"s",
							"Memories Created"
						]
					].map(([n, s, l], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						delay: i * .1,
						className: "border-l border-gold/40 pl-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-5xl text-gold-gradient",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
								to: n,
								suffix: s
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1",
							children: l
						})]
					}, l))
				})
			] })]
		})
	});
}
var SERVICES = [
	{
		t: "Wedding Photography",
		d: "Every emotional moment from engagement to reception.",
		i: Heart,
		img: sl_hero_default
	},
	{
		t: "Wedding Videography",
		d: "Cinematic wedding films with storytelling-style editing.",
		i: Film,
		img: sl_reception_default
	},
	{
		t: "Pre-Wedding Photography",
		d: "Romantic and creative couple photography.",
		i: Flower2,
		img: sl_couple_default
	},
	{
		t: "Birthday Photography",
		d: "Beautiful birthday celebrations and unforgettable moments.",
		i: Cake,
		img: sl_birthday_default
	},
	{
		t: "Baby Photography",
		d: "Professional baby portraits and milestone photography.",
		i: Baby,
		img: sl_baby_default
	},
	{
		t: "Maternity Photography",
		d: "Elegant maternity portraits and family moments.",
		i: Sparkles,
		img: sl_bride_default
	},
	{
		t: "Family Photography",
		d: "Beautiful family portraits and special occasions.",
		i: Users,
		img: sl_family_default
	},
	{
		t: "Portrait Photography",
		d: "Professional individual and personal portraits.",
		i: User,
		img: sl_bride_default
	},
	{
		t: "Event Photography",
		d: "Functions, celebrations and special events.",
		i: PartyPopper,
		img: sl_reception_default
	},
	{
		t: "Traditional Photography",
		d: "Complete traditional event photography coverage.",
		i: Camera,
		img: sl_family_default
	},
	{
		t: "Candid Photography",
		d: "Natural, emotional moments captured without posing.",
		i: Aperture,
		img: sl_haldi_default
	},
	{
		t: "Cinematic Video",
		d: "High-quality cinematic videos with professional editing.",
		i: Video,
		img: sl_couple_default
	}
];
function Services() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "services",
		className: "py-28 px-5 bg-card/40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				kicker: "What We Do",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Our ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
					className: "text-gold-gradient",
					children: "Services"
				})] }),
				sub: "Twelve ways we turn your celebrations into heirlooms."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6",
				children: SERVICES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i % 3 * .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "group relative h-96 overflow-hidden border border-border hover:border-gold/60 transition-colors duration-500",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: s.img,
								alt: s.t,
								loading: "lazy",
								className: "absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 p-7 flex flex-col justify-end",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-12 h-12 rounded-full glass border border-gold/50 flex items-center justify-center mb-4 group-hover:bg-gold transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.i, {
											className: "w-5 h-5 text-gold group-hover:text-primary-foreground",
											strokeWidth: 1.5
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-2xl text-ivory",
										children: s.t
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-ivory/70 mt-2 font-light",
										children: s.d
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => go("booking"),
										className: "mt-4 self-start text-[11px] tracking-[0.25em] uppercase text-gold flex items-center gap-2 opacity-80 group-hover:opacity-100",
										children: [
											"View Service",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-3 h-3 transition-transform group-hover:translate-x-1" })
										]
									})
								]
							})
						]
					})
				}, s.t))
			})]
		})
	});
}
var WED = [
	{
		t: "Bride Portraits",
		img: sl_bride_default
	},
	{
		t: "Groom & Bride",
		img: sl_hero_default
	},
	{
		t: "Haldi",
		img: sl_haldi_default
	},
	{
		t: "Reception",
		img: sl_reception_default
	},
	{
		t: "Couple Portraits",
		img: sl_couple_default
	},
	{
		t: "Family Moments",
		img: sl_family_default
	},
	{
		t: "Mehendi",
		img: sl_bride_default
	},
	{
		t: "Candid Emotions",
		img: sl_haldi_default
	}
];
function Weddings() {
	const track = (0, import_react.useRef)(null);
	const scroll = (d) => track.current?.scrollBy({
		left: d * track.current.clientWidth * .8,
		behavior: "smooth"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "weddings",
		className: "relative py-28 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: sl_reception_default,
					alt: "",
					loading: "lazy",
					className: "w-full h-full object-cover opacity-20"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative max-w-7xl mx-auto px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
					kicker: "Wedding Special",
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Your Love Story, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
						className: "text-gold-gradient",
						children: "Beautifully Captured"
					})] }),
					sub: "Engagement, haldi, mehendi, rituals and reception — told like a film."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-3 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => scroll(-1),
						"aria-label": "Previous",
						className: "w-12 h-12 border border-gold/50 text-gold flex items-center justify-center hover:bg-gold hover:text-primary-foreground transition",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => scroll(1),
						"aria-label": "Next",
						className: "w-12 h-12 border border-gold/50 text-gold flex items-center justify-center hover:bg-gold hover:text-primary-foreground transition",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: track,
				className: "relative flex gap-5 overflow-x-auto snap-x snap-mandatory px-5 md:px-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))] pb-4 [scrollbar-width:none]",
				children: WED.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.figure, {
					initial: {
						opacity: 0,
						x: 60
					},
					whileInView: {
						opacity: 1,
						x: 0
					},
					viewport: { once: true },
					transition: {
						delay: i * .06,
						duration: .8
					},
					className: "group relative shrink-0 snap-start w-[75vw] sm:w-[340px] aspect-[3/4] overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: w.img,
						alt: w.t,
						loading: "lazy",
						className: "w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
						className: "absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-ink to-transparent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] tracking-[0.3em] text-gold",
							children: ["0", i + 1]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl text-ivory",
							children: w.t
						})]
					})]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center mt-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
					onClick: () => go("gallery"),
					children: "View Wedding Stories"
				})
			})
		]
	});
}
var EVENTS = [
	{
		t: "Birthday Parties",
		img: sl_birthday_default
	},
	{
		t: "Anniversaries",
		img: sl_couple_default
	},
	{
		t: "Engagements",
		img: sl_hero_default
	},
	{
		t: "Baby Showers",
		img: sl_baby_default
	},
	{
		t: "Naming Ceremonies",
		img: sl_baby_default
	},
	{
		t: "Family Functions",
		img: sl_family_default
	},
	{
		t: "School & College Events",
		img: sl_reception_default
	},
	{
		t: "Cultural Events",
		img: sl_haldi_default
	}
];
function Birthdays({ openGallery }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "birthdays",
		className: "py-28 px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				kicker: "Birthdays & Functions",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Every Celebration, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
					className: "text-gold-gradient",
					children: "Every Smile"
				})] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
				children: EVENTS.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i % 4 * .08,
					className: i === 0 || i === 5 ? "row-span-2" : "",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `group relative overflow-hidden h-full ${i === 0 || i === 5 ? "min-h-[420px]" : "aspect-square"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: e.img,
								alt: e.t,
								loading: "lazy",
								className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-ink/0 group-hover:bg-ink/60 transition-colors duration-500" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 flex flex-col items-center justify-center text-center p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl text-ivory",
									children: e.t
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => openGallery(i < 5 ? "Birthdays" : "Events"),
									className: "mt-3 text-[10px] tracking-[0.3em] uppercase border border-gold text-gold px-4 py-2 hover:bg-gold hover:text-primary-foreground",
									children: "View Gallery"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "absolute bottom-3 left-3 text-xs tracking-widest uppercase text-ivory group-hover:opacity-0 transition",
								children: e.t
							})
						]
					})
				}, e.t))
			})]
		})
	});
}
var PHOTOS = [
	{
		src: sl_hero_default,
		alt: "Bride and groom at night",
		cats: [
			"Weddings",
			"Couples",
			"Wedding",
			"Couple"
		]
	},
	{
		src: sl_bride_default,
		alt: "Bridal portrait",
		cats: [
			"Weddings",
			"Portraits",
			"Wedding",
			"Portrait",
			"Fashion"
		],
		tall: true
	},
	{
		src: sl_couple_default,
		alt: "Pre-wedding at sunset",
		cats: [
			"Couples",
			"Pre-Wedding",
			"Couple",
			"Outdoor"
		]
	},
	{
		src: sl_haldi_default,
		alt: "Haldi laughter",
		cats: [
			"Weddings",
			"Events",
			"Wedding"
		],
		tall: true
	},
	{
		src: sl_birthday_default,
		alt: "Birthday cake moment",
		cats: [
			"Birthdays",
			"Family",
			"Events"
		]
	},
	{
		src: sl_baby_default,
		alt: "Sleeping newborn",
		cats: [
			"Baby",
			"Studio",
			"Maternity"
		]
	},
	{
		src: sl_family_default,
		alt: "Three-generation family portrait",
		cats: [
			"Family",
			"Portraits",
			"Studio"
		]
	},
	{
		src: sl_reception_default,
		alt: "Grand reception entry",
		cats: [
			"Weddings",
			"Events",
			"Wedding"
		]
	},
	{
		src: sl_bride_default,
		alt: "Maternity glow portrait",
		cats: [
			"Maternity",
			"Portraits",
			"Portrait",
			"Fashion"
		]
	},
	{
		src: sl_couple_default,
		alt: "Couple in golden field",
		cats: [
			"Couples",
			"Outdoor",
			"Pre-Wedding"
		],
		tall: true
	}
];
function Lightbox({ list, index, setIndex }) {
	const [zoom, setZoom] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (index === null) return;
		const k = (e) => {
			if (e.key === "Escape") setIndex(null);
			if (e.key === "ArrowRight") setIndex((index + 1) % list.length);
			if (e.key === "ArrowLeft") setIndex((index - 1 + list.length) % list.length);
		};
		window.addEventListener("keydown", k);
		return () => window.removeEventListener("keydown", k);
	}, [
		index,
		list.length,
		setIndex
	]);
	(0, import_react.useEffect)(() => setZoom(false), [index]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: index !== null && list[index] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "fixed inset-0 z-[80] bg-ink/95 flex items-center justify-center",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: () => setIndex(null),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "absolute top-5 right-5 w-12 h-12 text-gold flex items-center justify-center",
				"aria-label": "Close",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: (e) => {
					e.stopPropagation();
					setIndex((index - 1 + list.length) % list.length);
				},
				className: "absolute left-2 md:left-8 w-12 h-12 border border-gold/50 text-gold flex items-center justify-center z-10",
				"aria-label": "Previous photo",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
				src: list[index].src,
				alt: list[index].alt,
				onClick: (e) => {
					e.stopPropagation();
					setZoom((z) => !z);
				},
				initial: {
					opacity: 0,
					scale: .94
				},
				animate: {
					opacity: 1,
					scale: zoom ? 1.6 : 1
				},
				transition: { duration: .5 },
				className: `max-h-[85vh] max-w-[90vw] object-contain ${zoom ? "cursor-zoom-out" : "cursor-zoom-in"}`
			}, index),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: (e) => {
					e.stopPropagation();
					setIndex((index + 1) % list.length);
				},
				className: "absolute right-2 md:right-8 w-12 h-12 border border-gold/50 text-gold flex items-center justify-center z-10",
				"aria-label": "Next photo",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "absolute bottom-6 text-xs tracking-[0.3em] uppercase text-ivory/70",
				children: [
					list[index].alt,
					" · ",
					index + 1,
					"/",
					list.length,
					" · tap to zoom"
				]
			})
		]
	}) });
}
function FilterBar({ cats, active, set }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap justify-center gap-2 mb-10",
		children: cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => set(c),
			className: `px-5 py-2.5 text-[11px] tracking-[0.25em] uppercase border transition-all ${active === c ? "bg-gold text-primary-foreground border-gold" : "border-border text-foreground/70 hover:border-gold hover:text-gold"}`,
			children: c
		}, c))
	});
}
function Masonry({ list, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		layout: true,
		className: "columns-2 md:columns-3 gap-4 [&>*]:mb-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			mode: "popLayout",
			children: list.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
				layout: true,
				initial: {
					opacity: 0,
					scale: .9
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				exit: {
					opacity: 0,
					scale: .9
				},
				transition: { duration: .45 },
				onClick: () => onOpen(i),
				className: "group relative block w-full overflow-hidden break-inside-avoid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: p.src,
					alt: p.alt,
					loading: "lazy",
					className: `w-full object-cover transition-transform duration-700 group-hover:scale-110 ${p.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute inset-0 bg-ink/0 group-hover:bg-ink/50 transition flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "opacity-0 group-hover:opacity-100 transition text-gold text-[11px] tracking-[0.3em] uppercase border border-gold px-4 py-2",
						children: "View"
					})
				})]
			}, p.alt + p.src))
		})
	});
}
function PhotoShoots() {
	const cats = [
		"Couple",
		"Wedding",
		"Pre-Wedding",
		"Portrait",
		"Fashion",
		"Maternity",
		"Baby",
		"Family",
		"Outdoor",
		"Studio"
	];
	const [c, setC] = (0, import_react.useState)("Couple");
	const [idx, setIdx] = (0, import_react.useState)(null);
	const list = PHOTOS.filter((p) => p.cats.includes(c));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "shoots",
		className: "py-28 px-5 bg-card/40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
					kicker: "Photo Shoots",
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Curated ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
						className: "text-gold-gradient",
						children: "Portfolio"
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterBar, {
					cats,
					active: c,
					set: setC
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Masonry, {
					list,
					onOpen: setIdx
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbox, {
					list,
					index: idx,
					setIndex: setIdx
				})
			]
		})
	});
}
function Gallery({ cat, setCat, uploaded = [] }) {
	const cats = [
		"All",
		"Weddings",
		"Birthdays",
		"Portraits",
		"Couples",
		"Events",
		"Baby",
		"Family"
	];
	const [idx, setIdx] = (0, import_react.useState)(null);
	const uploadedPhotos = uploaded.filter((item) => item.url).map((item) => {
		const label = item.category.toLowerCase();
		const cats = label.includes("wedding") || label.includes("engagement") ? ["Weddings"] : label.includes("birthday") || label.includes("event") || label.includes("traditional") ? ["Birthdays", "Events"] : label.includes("baby") ? ["Baby"] : label.includes("couple") || label.includes("pre-wedding") ? ["Couples"] : label.includes("portrait") ? ["Portraits"] : label.includes("family") ? ["Family"] : ["Events"];
		return {
			src: item.url,
			alt: item.title,
			cats,
			tall: false
		};
	});
	const galleryPhotos = [...PHOTOS, ...uploadedPhotos];
	const list = cat === "All" ? galleryPhotos : galleryPhotos.filter((photo) => photo.cats.includes(cat));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "gallery",
		className: "py-28 px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
					kicker: "Premium Gallery",
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Frames We ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
						className: "text-gold-gradient",
						children: "Treasure"
					})] }),
					sub: "Tap any photograph to open it full-screen."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterBar, {
					cats,
					active: cat,
					set: setCat
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Masonry, {
					list,
					onOpen: setIdx
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbox, {
					list,
					index: idx,
					setIndex: setIdx
				})
			]
		})
	});
}
function FeaturedUploads({ items }) {
	const featured = items.filter((item) => item.is_featured && (item.url || item.thumbnail_url)).slice(0, 4);
	if (!featured.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-20 px-5 bg-card/40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				kicker: "Studio Highlights",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Featured ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
					className: "text-gold-gradient",
					children: "Moments"
				})] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4",
				children: featured.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "overflow-hidden border border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[4/3] bg-ink",
						children: item.media_type === "video" && item.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
							src: item.url,
							poster: item.thumbnail_url,
							controls: true,
							preload: "none",
							playsInline: true,
							className: "w-full h-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.thumbnail_url || item.url,
							alt: item.title,
							loading: "lazy",
							className: "w-full h-full object-cover"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: item.category
						})]
					})]
				}, item.id))
			})]
		})
	});
}
var VIDEOS = [
	{
		t: "Wedding Films",
		d: "4:32",
		imgs: [
			sl_hero_default,
			sl_bride_default,
			sl_reception_default,
			sl_haldi_default
		]
	},
	{
		t: "Pre-Wedding Films",
		d: "3:10",
		imgs: [
			sl_couple_default,
			sl_hero_default,
			sl_couple_default
		]
	},
	{
		t: "Birthday Highlights",
		d: "2:05",
		imgs: [
			sl_birthday_default,
			sl_family_default,
			sl_baby_default
		]
	},
	{
		t: "Event Highlights",
		d: "3:48",
		imgs: [
			sl_reception_default,
			sl_family_default,
			sl_haldi_default
		]
	},
	{
		t: "Cinematic Reels",
		d: "0:59",
		imgs: [
			sl_haldi_default,
			sl_bride_default,
			sl_couple_default,
			sl_reception_default
		]
	}
];
function ReelPlayer({ imgs }) {
	const [i, setI] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => setI((x) => (x + 1) % imgs.length), 2600);
		return () => clearInterval(t);
	}, [imgs.length]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative w-full h-full overflow-hidden bg-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			mode: "sync",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
				src: imgs[i],
				alt: "",
				className: "absolute inset-0 w-full h-full object-cover",
				initial: {
					opacity: 0,
					scale: 1.15
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				exit: { opacity: 0 },
				transition: {
					duration: 2.6,
					ease: "linear"
				}
			}, i)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-x-0 bottom-0 h-1 bg-ivory/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "h-full bg-gold",
				initial: { width: 0 },
				animate: { width: "100%" },
				transition: {
					duration: 2.6,
					ease: "linear"
				}
			}, i)
		})]
	});
}
function Videos({ uploaded }) {
	const [open, setOpen] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "videos",
		className: "py-28 px-5 bg-card/40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				kicker: "Video Portfolio",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Cinematic ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
					className: "text-gold-gradient",
					children: "Films"
				})] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-6 gap-5",
				children: [VIDEOS.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * .08,
					className: i < 2 ? "md:col-span-3" : "md:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setOpen(i),
						className: "group relative w-full aspect-video overflow-hidden border border-border hover:border-gold/60 transition",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: v.imgs[0],
								alt: v.t,
								loading: "lazy",
								className: "w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-ink/40 group-hover:bg-ink/20 transition" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute inset-0 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-16 h-16 rounded-full bg-gold-gradient shadow-gold flex items-center justify-center group-hover:scale-110 transition",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
										className: "w-6 h-6 text-primary-foreground ml-1",
										fill: "currentColor"
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute bottom-4 left-4 text-left",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-display text-2xl text-ivory",
									children: v.t
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute top-4 right-4 glass text-xs px-3 py-1 text-ivory",
								children: v.d
							})
						]
					})
				}, v.t)), uploaded.filter((item) => item.url).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "md:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "relative aspect-video overflow-hidden border border-border hover:border-gold/60 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
							src: item.url,
							poster: item.thumbnail_url,
							controls: true,
							preload: "none",
							playsInline: true,
							className: "w-full h-full object-cover",
							"aria-label": item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute top-3 left-3 glass text-[10px] px-2 py-1 text-ivory pointer-events-none",
							children: item.category
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-xl",
						children: item.title
					})]
				}, item.id))]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "fixed inset-0 z-[80] bg-ink/95 flex items-center justify-center p-4",
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			onClick: () => setOpen(null),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "absolute top-5 right-5 w-12 h-12 text-gold flex items-center justify-center",
					"aria-label": "Close video",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { scale: .9 },
					animate: { scale: 1 },
					className: "w-full max-w-5xl aspect-video border border-gold/40",
					onClick: (e) => e.stopPropagation(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelPlayer, { imgs: VIDEOS[open].imgs })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "absolute bottom-8 font-display text-2xl text-gold",
					children: VIDEOS[open].t
				})
			]
		}) })]
	});
}
function BeforeAfter() {
	const [pos, setPos] = (0, import_react.useState)(50);
	const ref = (0, import_react.useRef)(null);
	const drag = (0, import_react.useRef)(false);
	const move = (x) => {
		const r = ref.current?.getBoundingClientRect();
		if (r) setPos(Math.max(0, Math.min(100, (x - r.left) / r.width * 100)));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-28 px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-5xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				kicker: "The Edit",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Before ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gold",
						children: "→"
					}),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
						className: "text-gold-gradient",
						children: "After"
					})
				] }),
				sub: "Colour grading, retouching and cinematic correction. Drag the handle."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref,
				className: "relative aspect-[16/10] overflow-hidden select-none touch-none cursor-ew-resize border border-gold/30",
				onPointerDown: (e) => {
					drag.current = true;
					move(e.clientX);
					e.target.setPointerCapture?.(e.pointerId);
				},
				onPointerMove: (e) => drag.current && move(e.clientX),
				onPointerUp: () => drag.current = false,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: sl_couple_default,
						alt: "Edited photograph",
						className: "absolute inset-0 w-full h-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0",
						style: { clipPath: `inset(0 ${100 - pos}% 0 0)` },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: sl_couple_default,
							alt: "Original photograph",
							className: "absolute inset-0 w-full h-full object-cover",
							style: { filter: "grayscale(0.55) contrast(0.8) brightness(0.9) saturate(0.6)" }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-4 left-4 glass text-[10px] tracking-[0.3em] uppercase px-3 py-1.5 text-ivory",
						children: "Before"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-4 right-4 glass text-[10px] tracking-[0.3em] uppercase px-3 py-1.5 text-gold",
						children: "After"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-y-0 w-px bg-gold",
						style: { left: `${pos}%` },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold-gradient shadow-gold flex items-center justify-center text-primary-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 0,
						max: 100,
						value: pos,
						onChange: (e) => setPos(+e.target.value),
						"aria-label": "Before and after slider",
						className: "sr-only"
					})
				]
			})]
		})
	});
}
function Why() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "py-28 px-5 bg-card/40 relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Particles, { count: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				kicker: "Why Choose Us",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Crafted With ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
					className: "text-gold-gradient",
					children: "Care"
				})] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 lg:grid-cols-4 gap-5",
				children: [
					[Camera, "Professional Photography"],
					[Heart, "Creative Storytelling"],
					[WandSparkles, "High-Quality Editing"],
					[Film, "Cinematic Videography"],
					[Aperture, "Modern Equipment"],
					[Award, "Experienced Team"],
					[Zap, "Fast Delivery"],
					[HeartHandshake, "Personalized Service"]
				].map(([I, t], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i % 4 * .08,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group glass border border-border hover:border-gold/60 p-7 text-center h-full transition hover:-translate-y-1 duration-500",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							whileInView: { rotate: [
								0,
								-10,
								10,
								0
							] },
							viewport: { once: true },
							transition: {
								delay: .3 + i * .08,
								duration: .8
							},
							className: "mx-auto w-14 h-14 rounded-full border border-gold/50 flex items-center justify-center mb-5 group-hover:bg-gold transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I, {
								className: "w-6 h-6 text-gold group-hover:text-primary-foreground",
								strokeWidth: 1.3
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl",
							children: t
						})]
					})
				}, t))
			})]
		})]
	});
}
var TESTI = [
	{
		n: "Priya & Karthik",
		e: "Wedding",
		img: sl_hero_default,
		q: "Every moment was captured beautifully. The photographs brought back all the emotions of our wedding day."
	},
	{
		n: "Lakshmi Narayanan",
		e: "Daughter's Birthday",
		img: sl_birthday_default,
		q: "They made our little one's birthday feel magical. Every smile, every candle — perfectly captured."
	},
	{
		n: "Anjali & Rohit",
		e: "Pre-Wedding Shoot",
		img: sl_couple_default,
		q: "The sunset shoot felt effortless and the film they made gave us goosebumps. Truly cinematic."
	},
	{
		n: "The Reddy Family",
		e: "Family Portrait",
		img: sl_family_default,
		q: "Three generations in one frame, and everyone looks their best. A treasure we'll keep forever."
	}
];
function Testimonials() {
	const [i, setI] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => setI((x) => (x + 1) % TESTI.length), 6e3);
		return () => clearInterval(t);
	}, []);
	const t = TESTI[i];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "testimonials",
		className: "py-28 px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-4xl mx-auto text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
					kicker: "Testimonials",
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Kind ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
						className: "text-gold-gradient",
						children: "Words"
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative min-h-[320px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 30
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								y: -30
							},
							transition: { duration: .6 },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: t.img,
									alt: t.n,
									loading: "lazy",
									className: "w-20 h-20 rounded-full object-cover mx-auto border-2 border-gold"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-center gap-1 mt-5 text-gold",
									children: Array.from({ length: 5 }).map((_, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
										className: "w-4 h-4",
										fill: "currentColor"
									}, k))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
									className: "font-display italic text-2xl md:text-4xl leading-snug mt-6",
									children: [
										"\"",
										t.q,
										"\""
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 text-gold tracking-[0.2em] uppercase text-sm",
									children: t.n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground tracking-widest uppercase mt-1",
									children: t.e
								})
							]
						}, i)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center gap-4 mt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setI((i - 1 + TESTI.length) % TESTI.length),
							"aria-label": "Previous testimonial",
							className: "w-11 h-11 border border-gold/50 text-gold flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
						}),
						TESTI.map((_, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setI(k),
							"aria-label": `Testimonial ${k + 1}`,
							className: `h-1.5 transition-all ${k === i ? "w-8 bg-gold" : "w-3 bg-gold/30"}`
						}, k)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setI((i + 1) % TESTI.length),
							"aria-label": "Next testimonial",
							className: "w-11 h-11 border border-gold/50 text-gold flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
						})
					]
				})
			]
		})
	});
}
function InstaStrip() {
	const imgs = [
		sl_bride_default,
		sl_haldi_default,
		sl_couple_default,
		sl_birthday_default,
		sl_baby_default,
		sl_family_default,
		sl_reception_default,
		sl_hero_default
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "py-24 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				kicker: "Follow Our Journey",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: INSTA,
					target: "_blank",
					rel: "noreferrer",
					className: "text-gold-gradient hover:opacity-80",
					children: "@SriLakshmiDigitalStudio"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex w-max marquee gap-4",
				children: [...imgs, ...imgs].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: INSTA,
					target: "_blank",
					rel: "noreferrer",
					className: "group relative w-56 h-56 shrink-0 overflow-hidden",
					"aria-label": "Open Instagram",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: s,
						alt: "",
						loading: "lazy",
						className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute inset-0 bg-ink/0 group-hover:bg-ink/50 flex items-center justify-center transition",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "text-gold opacity-0 group-hover:opacity-100 transition" })
					})]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GoldButton, {
					outline: true,
					href: INSTA,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "w-4 h-4" }), " Follow on Instagram"]
				})
			})
		]
	});
}
function Booking() {
	const settings = useSiteSettings();
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		phone: "",
		email: "",
		event: "",
		date: "",
		location: "",
		service: "",
		message: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [sent, setSent] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [submitError, setSubmitError] = (0, import_react.useState)("");
	const set = (k) => (e) => setForm({
		...form,
		[k]: e.target.value
	});
	const submit = async (e) => {
		e.preventDefault();
		const er = {};
		if (form.name.trim().length < 2) er["name"] = "Please enter your name";
		if (!/^[+\d][\d\s-]{8,14}$/.test(form.phone.trim())) er["phone"] = "Enter a valid phone number";
		if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) er["email"] = "Enter a valid email";
		if (!form.event) er["event"] = "Choose an event type";
		if (!form.date) er["date"] = "Pick a date";
		setErrors(er);
		if (Object.keys(er).length > 0 || submitting) return;
		setSubmitError("");
		setSubmitting(true);
		try {
			if (isSupabaseConfigured) {
				const client = getSupabase();
				if (client) {
					const { error } = await client.from("enquiries").insert({
						name: form.name.trim(),
						phone: form.phone.trim(),
						email: form.email.trim(),
						event_type: form.event,
						service: form.service,
						event_date: form.date || null,
						location: form.location.trim(),
						message: form.message.trim()
					});
					if (error) setSubmitError("We couldn't save your enquiry online. Please send it through WhatsApp below.");
				}
			}
			setSent(true);
		} catch {
			setSubmitError("We couldn't save your enquiry online. Please send it through WhatsApp below.");
			setSent(true);
		} finally {
			setSubmitting(false);
		}
	};
	const waBooking = () => waLink(`${WA_MSG}\n\nName: ${form.name}\nEvent: ${form.event}\nDate: ${form.date}\nLocation: ${form.location}\nService: ${form.service}\n${form.message}`, settings.phone);
	const input = "w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground placeholder:text-muted-foreground/60 transition-colors";
	const Field = ({ k, children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [children, errors[k] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-destructive text-xs mt-1",
		children: errors[k]
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "booking",
		className: "relative py-28 px-5 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: sl_bride_default,
				alt: "",
				loading: "lazy",
				className: "absolute inset-0 w-full h-full object-cover opacity-15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative max-w-4xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
					kicker: "Book a Session",
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Let's Capture ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
						className: "text-gold-gradient",
						children: "Your Story"
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "glass border border-gold/30 p-6 md:p-12 shadow-gold",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						children: sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								scale: .9
							},
							animate: {
								opacity: 1,
								scale: 1
							},
							className: "text-center py-12",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: {
										scale: 0,
										rotate: -90
									},
									animate: {
										scale: 1,
										rotate: 0
									},
									transition: {
										type: "spring",
										stiffness: 180,
										damping: 12
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
										className: "w-20 h-20 text-gold mx-auto",
										strokeWidth: 1
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-4xl mt-6",
									children: [
										"Thank you, ",
										form.name.split(" ")[0],
										"!"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground mt-3",
									children: submitError || "Your enquiry is ready. Send it on WhatsApp so we can reply right away."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 flex flex-col sm:flex-row gap-3 justify-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GoldButton, {
										href: waBooking(),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-4 h-4" }), " Send on WhatsApp"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
										outline: true,
										onClick: () => {
											setSent(false);
											setForm({
												name: "",
												phone: "",
												email: "",
												event: "",
												date: "",
												location: "",
												service: "",
												message: ""
											});
										},
										children: "New Enquiry"
									})]
								})
							]
						}, "ok") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
							onSubmit: submit,
							noValidate: true,
							className: "grid md:grid-cols-2 gap-x-8 gap-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									k: "name",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: input,
										placeholder: "Full Name *",
										value: form.name,
										onChange: set("name"),
										"aria-label": "Full name"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									k: "phone",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: input,
										type: "tel",
										placeholder: "Phone Number *",
										value: form.phone,
										onChange: set("phone"),
										"aria-label": "Phone number"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									k: "email",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: input,
										type: "email",
										placeholder: "Email",
										value: form.email,
										onChange: set("email"),
										"aria-label": "Email"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									k: "event",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: `${input} bg-background/0 [&>option]:bg-card`,
										value: form.event,
										onChange: set("event"),
										"aria-label": "Event type",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Event Type *"
										}), [
											"Wedding",
											"Engagement",
											"Pre-Wedding",
											"Birthday",
											"Baby Shower",
											"Naming Ceremony",
											"Family Function",
											"Corporate / Other"
										].map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: o }, o))]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									k: "date",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: input,
										type: "date",
										value: form.date,
										onChange: set("date"),
										"aria-label": "Event date"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									k: "location",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: input,
										placeholder: "Event Location",
										value: form.location,
										onChange: set("location"),
										"aria-label": "Event location"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "md:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: `${input} [&>option]:bg-card`,
										value: form.service,
										onChange: set("service"),
										"aria-label": "Preferred service",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Preferred Service"
										}), SERVICES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s.t }, s.t))]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									className: `${input} md:col-span-2 resize-none`,
									rows: 3,
									placeholder: "Tell us about your celebration",
									value: form.message,
									onChange: set("message"),
									"aria-label": "Message"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "md:col-span-2 flex flex-col sm:flex-row gap-3 pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldButton, {
										type: "submit",
										disabled: submitting,
										children: submitting ? "Saving…" : "Send Enquiry"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GoldButton, {
										outline: true,
										href: waBooking(),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-4 h-4" }), " Chat on WhatsApp"]
									})]
								})
							]
						}, "f")
					})
				}) })]
			})
		]
	});
}
function Contact() {
	const settings = useSiteSettings();
	const digits = settings.phone.replace(/\D/g, "");
	const phoneDisplay = digits.length === 12 && digits.startsWith("91") ? `+91 ${digits.slice(2, 7)} ${digits.slice(7)}` : settings.phone;
	const items = [
		[
			Phone,
			"Phone",
			phoneDisplay,
			`tel:${settings.phone.replace(/[^+\d]/g, "")}`
		],
		[
			MessageCircle,
			"WhatsApp",
			"Chat with us",
			waLink(WA_MSG, settings.phone)
		],
		[
			Mail,
			"Email",
			settings.email,
			`mailto:${settings.email}`
		],
		[
			MapPin,
			"Studio",
			settings.address,
			`https://maps.google.com/?q=${encodeURIComponent(settings.address)}`
		],
		[
			Clock,
			"Hours",
			settings.hours,
			void 0
		]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contact",
		className: "py-28 px-5 bg-card/40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				kicker: "Contact",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gold-gradient",
					children: STUDIO
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-2 gap-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [items.map(([I, l, v, h]) => {
						const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-12 h-12 rounded-full border border-gold/50 flex items-center justify-center shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I, {
								className: "w-5 h-5 text-gold",
								strokeWidth: 1.4
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[10px] tracking-[0.3em] uppercase text-muted-foreground",
							children: l
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg",
							children: v
						})] })] });
						return h ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: h,
							target: h.startsWith("http") ? "_blank" : void 0,
							rel: "noreferrer",
							className: "flex items-center gap-5 p-4 border border-border hover:border-gold/60 transition",
							children: inner
						}, l) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-5 p-4 border border-border",
							children: inner
						}, l);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-3 pt-2",
						children: [
							[
								Instagram,
								INSTA,
								"Instagram"
							],
							[
								Facebook,
								"https://facebook.com/",
								"Facebook"
							],
							[
								Youtube,
								"https://youtube.com/",
								"YouTube"
							]
						].map(([I, h, l]) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: h,
								target: "_blank",
								rel: "noreferrer",
								"aria-label": l,
								className: "w-12 h-12 border border-gold/50 text-gold flex items-center justify-center hover:bg-gold hover:text-primary-foreground transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I, { className: "w-5 h-5" })
							}, l);
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative min-h-[420px] border border-gold/30 overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						title: "Studio location map",
						src: "https://www.google.com/maps?q=Chirala%20Road%2C%20Vetapalem%2C%20near%20Venkateswara%20Temple%2C%20Andhra%20Pradesh&output=embed",
						loading: "lazy",
						className: "absolute inset-0 w-full h-full grayscale-[0.6] invert-[0.9] hue-rotate-180"
					})
				})]
			})]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-ink border-t border-gold/20 pt-20 pb-8 px-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto grid md:grid-cols-4 gap-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl text-gold-gradient tracking-[0.1em]",
							children: "SRI LAKSHMI"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] tracking-[0.35em] text-muted-foreground",
							children: "DIGITAL STUDIO & VIDEO"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display italic text-xl mt-6 text-ivory/80",
							children: "\"We Capture Moments. You Keep the Memories.\""
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.3em] uppercase text-gold mb-5",
					children: "Quick Links"
				}), [
					["Home", "home"],
					["About", "about"],
					["Services", "services"],
					["Gallery", "gallery"],
					["Videos", "videos"],
					["Contact", "contact"]
				].map(([l, id]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => go(id),
					className: "block text-sm text-muted-foreground hover:text-gold py-1.5",
					children: l
				}, id))] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.3em] uppercase text-gold mb-5",
					children: "Services"
				}), [
					"Wedding Photography",
					"Birthday Photography",
					"Pre-Wedding",
					"Portraits",
					"Events",
					"Cinematic Videos"
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => go("services"),
					className: "block text-sm text-muted-foreground hover:text-gold py-1.5 text-left",
					children: s
				}, s))] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto mt-16 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "© 2026 Sri Lakshmi Digital Studio and Video. All Rights Reserved." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: INSTA,
						target: "_blank",
						rel: "noreferrer",
						"aria-label": "Instagram",
						className: "hover:text-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "w-4 h-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://facebook.com/",
						target: "_blank",
						rel: "noreferrer",
						"aria-label": "Facebook",
						className: "hover:text-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "w-4 h-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://youtube.com/",
						target: "_blank",
						rel: "noreferrer",
						"aria-label": "YouTube",
						className: "hover:text-gold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Youtube, { className: "w-4 h-4" })
					})
				]
			})]
		})]
	});
}
function Floating() {
	const settings = useSiteSettings();
	const [top, setTop] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const f = () => setTop(window.scrollY > 800);
		window.addEventListener("scroll", f);
		return () => window.removeEventListener("scroll", f);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: waLink(WA_MSG, settings.phone),
		target: "_blank",
		rel: "noreferrer",
		"aria-label": "Chat on WhatsApp",
		className: "fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-whatsapp text-ivory flex items-center justify-center wa-pulse hover:scale-110 transition",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-6 h-6" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: top && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
		initial: {
			opacity: 0,
			y: 20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			y: 20
		},
		onClick: () => go("home"),
		"aria-label": "Back to top",
		className: "fixed bottom-24 right-6 z-50 w-12 h-12 border border-gold/60 glass text-gold flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "w-4 h-4" })
	}) })] });
}
function ScrollProgress() {
	const { scrollYProgress } = useScroll();
	const x = useSpring(scrollYProgress, {
		stiffness: 120,
		damping: 30
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		style: { scaleX: x },
		className: "fixed top-0 inset-x-0 h-0.5 bg-gold-gradient origin-left z-[70]"
	});
}
function Home() {
	const [intro, setIntro] = (0, import_react.useState)(true);
	const [galleryCat, setGalleryCat] = (0, import_react.useState)("All");
	const [uploadedMedia, setUploadedMedia] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (!isSupabaseConfigured) return;
		let active = true;
		const client = getSupabase();
		const refresh = () => void getPublicMedia().then((media) => {
			if (active) setUploadedMedia(media);
		}).catch(() => void 0);
		refresh();
		const channel = client?.channel("public-gallery-media").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "media"
		}, refresh).subscribe();
		return () => {
			active = false;
			if (client && channel) client.removeChannel(channel);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grain",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: intro && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Intro, { onDone: () => setIntro(false) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollProgress, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, { show: !intro }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { show: !intro }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Services, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Weddings, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Birthdays, { openGallery: (c) => {
					setGalleryCat(c);
					go("gallery");
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoShoots, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedUploads, { items: uploadedMedia }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gallery, {
					cat: galleryCat,
					setCat: setGalleryCat,
					uploaded: uploadedMedia.filter((item) => item.media_type === "photo")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Videos, { uploaded: uploadedMedia.filter((item) => item.media_type === "video") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeforeAfter, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Why, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstaStrip, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Booking, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Floating, {})
		]
	});
}
//#endregion
export { Home as component };
