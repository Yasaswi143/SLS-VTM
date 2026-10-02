import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "motion/react";
import {
  Camera,
  Heart,
  Cake,
  Baby,
  Users,
  User,
  PartyPopper,
  Film,
  Sparkles,
  Aperture,
  Video,
  Flower2,
  Phone,
  MessageCircle,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  MapPin,
  Clock,
  ArrowUp,
  ChevronDown,
  Palette,
  Award,
  Zap,
  HeartHandshake,
  Wand2,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { getPublicMedia, type MediaRecord } from "@/lib/admin-media";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { useSiteSettings } from "@/lib/site-settings";
import hero from "@/assets/sl-hero.jpg";
import bride from "@/assets/sl-bride.jpg";
import birthday from "@/assets/sl-birthday.jpg";
import couple from "@/assets/sl-couple.jpg";
import haldi from "@/assets/sl-haldi.jpg";
import baby from "@/assets/sl-baby.jpg";
import family from "@/assets/sl-family.jpg";
import reception from "@/assets/sl-reception.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sri Lakshmi Digital Studio and Video — Wedding & Event Photography" },
      {
        name: "description",
        content:
          "Cinematic wedding, birthday, portrait and family photography and videography. We capture moments, you keep the memories.",
      },
      { property: "og:title", content: "Sri Lakshmi Digital Studio and Video" },
      {
        property: "og:description",
        content: "Luxury wedding photography and cinematic films. Book your session today.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const STUDIO = "Sri Lakshmi Digital Studio and Video";
const PHONE = "+919133418773";
const WA_MSG =
  "Hello Sri Lakshmi Digital Studio and Video, I would like to enquire about your photography services.";
const waLink = (msg = WA_MSG, phone = PHONE) =>
  `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
const INSTA = "https://www.instagram.com/chaitanya_krishna_photography/";
const FACEBOOK = "https://www.facebook.com/chaitanya.sayani";
const YOUTUBE = "https://www.youtube.com/@slsvtm54";

const NAV = [
  ["Home", "home"],
  ["About", "about"],
  ["Services", "services"],
  ["Weddings", "weddings"],
  ["Birthdays", "birthdays"],
  ["Photo Shoots", "shoots"],
  ["Gallery", "gallery"],
  ["Videos", "videos"],
  ["Testimonials", "testimonials"],
  ["Contact", "contact"],
] as const;

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/* ---------- shared bits ---------- */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Heading({
  kicker,
  title,
  sub,
  center = true,
}: {
  kicker: string;
  title: ReactNode;
  sub?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={`mb-14 ${center ? "text-center mx-auto" : ""} max-w-3xl`}>
      <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 flex items-center gap-3 justify-center">
        <span className="h-px w-10 bg-gold/60" />
        {kicker}
        <span className="h-px w-10 bg-gold/60" />
      </p>
      <h2 className="text-4xl md:text-6xl font-medium leading-[1.05]">{title}</h2>
      {sub && <p className="mt-5 text-muted-foreground text-lg font-light">{sub}</p>}
    </Reveal>
  );
}

function GoldButton({
  children,
  onClick,
  href,
  outline,
  className = "",
  type,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  outline?: boolean;
  className?: string;
  type?: "submit";
  disabled?: boolean;
}) {
  const cls = `group relative inline-flex items-center justify-center gap-2 px-7 py-4 text-xs tracking-[0.25em] uppercase font-medium transition-all duration-500 min-h-12 ${
    outline
      ? "border border-gold/60 text-gold hover:bg-gold hover:text-primary-foreground"
      : "bg-gold-gradient text-primary-foreground shadow-gold hover:scale-[1.03]"
  } ${className}`;
  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  return (
    <button type={type ?? "button"} onClick={onClick} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}

function Particles({ count = 24 }: { count?: number }) {
  const [ps, setPs] = useState<{ l: number; s: number; d: number; delay: number }[]>([]);
  useEffect(() => {
    setPs(
      Array.from({ length: count }, () => ({
        l: Math.random() * 100,
        s: 1 + Math.random() * 3,
        d: 10 + Math.random() * 14,
        delay: Math.random() * 12,
      })),
    );
  }, [count]);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {ps.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${p.l}%`,
            width: p.s,
            height: p.s,
            animationDuration: `${p.d}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- intro shutter ---------- */
function Intro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-ink flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative w-40 h-40">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 origin-center"
            style={{
              clipPath: "polygon(50% 50%, 100% 0, 100% 60%)",
              rotate: i * 60,
              background: "var(--gold)",
            }}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1, 0], rotate: [i * 60, i * 60, i * 60 + 90] }}
            transition={{ duration: 1.1, times: [0, 0.4, 1], ease: "easeInOut" }}
          />
        ))}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Aperture className="w-14 h-14 text-gold" strokeWidth={1} />
        </motion.div>
      </div>
      <motion.p
        className="absolute bottom-1/4 font-display text-2xl md:text-3xl tracking-[0.3em] uppercase text-gold-gradient text-center px-6"
        initial={{ opacity: 0, letterSpacing: "0.6em" }}
        animate={{ opacity: 1, letterSpacing: "0.3em" }}
        transition={{ delay: 1.3, duration: 1.1 }}
      >
        Sri Lakshmi
      </motion.p>
    </motion.div>
  );
}

/* ---------- nav ---------- */
function Navbar({ show }: { show: boolean }) {
  const settings = useSiteSettings();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.3 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "glass border-b border-border py-3" : "py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between gap-4">
        <button
          onClick={() => go("home")}
          className="flex items-center gap-3 text-left"
          aria-label="Go to top"
        >
          <span className="w-10 h-10 rounded-full border border-gold/60 flex items-center justify-center">
            <Aperture className="w-5 h-5 text-gold" strokeWidth={1.3} />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg tracking-[0.15em] text-gold-gradient font-semibold">
              SRI LAKSHMI
            </span>
            <span className="block text-[9px] tracking-[0.35em] text-muted-foreground">
              DIGITAL STUDIO & VIDEO
            </span>
          </span>
        </button>
        <nav className="hidden xl:flex items-center gap-5">
          {NAV.map(([l, id]) => (
            <button
              key={id}
              onClick={() => go(id)}
              className="relative text-[11px] tracking-[0.2em] uppercase text-foreground/80 hover:text-gold transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              {l}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`}
            aria-label="Call the studio"
            className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center text-gold hover:bg-gold hover:text-primary-foreground transition"
          >
            <Phone className="w-4 h-4" />
          </a>
          <a
            href="/admin/login"
            className="inline-flex h-10 items-center gap-2 border border-gold/40 px-3 text-[10px] uppercase tracking-[0.15em] text-gold transition hover:bg-gold hover:text-primary-foreground"
            aria-label="Admin login"
          >
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Admin</span>
          </a>
          <a
            href={waLink(WA_MSG, settings.phone)}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp the studio"
            className="w-10 h-10 rounded-full bg-whatsapp flex items-center justify-center text-ivory"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <button
            onClick={() => setOpen(true)}
            className="xl:hidden w-10 h-10 flex items-center justify-center text-gold"
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/97 flex flex-col items-center justify-center gap-5 h-dvh"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 text-gold w-12 h-12 flex items-center justify-center"
              aria-label="Close menu"
            >
              <X />
            </button>
            {NAV.map(([l, id], i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => go(id), 150);
                }}
                className="font-display text-3xl text-foreground hover:text-gold"
              >
                {l}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ---------- hero ---------- */
function Hero({ show }: { show: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  return (
    <section
      id="home"
      ref={ref}
      className="relative h-dvh min-h-[640px] overflow-hidden flex items-center justify-center"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.img
          src={hero}
          alt="Bride and groom under golden marigold lights"
          width={1920}
          height={1088}
          className="w-full h-full object-cover"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={show ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 2.4, ease: "easeOut" }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-background" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gold/20 blur-[120px]" />
      <Particles />
      <div className="relative z-10 text-center px-5 max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold mb-6"
        >
          Weddings · Events · Portraits · Films
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[0.95] tracking-wide"
        >
          <span className="text-gold-gradient">SRI LAKSHMI</span>
          <br />
          <span className="text-2xl sm:text-4xl md:text-5xl tracking-[0.12em] text-ivory">
            Digital Studio & Video
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ delay: 1.3, duration: 1 }}
          className="mt-8 font-display italic text-xl md:text-3xl text-ivory/90"
        >
          "We Capture Moments. You Keep the Memories."
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <GoldButton onClick={() => go("gallery")}>Explore Our Work</GoldButton>
          <GoldButton outline onClick={() => go("booking")}>
            Book Your Session
          </GoldButton>
        </motion.div>
      </div>
      <button
        onClick={() => go("about")}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown />
        </motion.span>
      </button>
    </section>
  );
}

/* ---------- about ---------- */
function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1800, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

function About() {
  const stats = [
    [500, "+", "Events Captured"],
    [1000, "+", "Happy Clients"],
    [10, "+", "Years of Experience"],
    [1000, "s", "Memories Created"],
  ] as const;
  return (
    <section id="about" className="py-28 px-5">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <Reveal className="relative">
          <div className="absolute -inset-4 border border-gold/30 translate-x-6 translate-y-6" />
          <img
            src={bride}
            alt="Bride portrait with gold jewellery"
            loading="lazy"
            width={832}
            height={1152}
            className="relative w-full aspect-[4/5] object-cover"
          />
          <div className="absolute -bottom-6 -left-4 glass border border-gold/40 px-6 py-4">
            <p className="font-display text-3xl text-gold-gradient">Since 2015</p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              Trusted by families
            </p>
          </div>
        </Reveal>
        <div>
          <Heading
            center={false}
            kicker="About the Studio"
            title={
              <>
                Stories That Deserve <em className="text-gold-gradient">To Be Remembered</em>
              </>
            }
          />
          <Reveal delay={0.1}>
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              At {STUDIO}, we capture emotional, authentic and unforgettable moments through
              professional photography and cinematic videography. From the first haldi laugh to the
              last reception dance, every frame is crafted to bring the feeling back — years from
              now.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-6 mt-12">
            {stats.map(([n, s, l], i) => (
              <Reveal key={l} delay={i * 0.1} className="border-l border-gold/40 pl-5">
                <p className="font-display text-5xl text-gold-gradient">
                  <Counter to={n} suffix={s} />
                </p>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">{l}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- services ---------- */
const SERVICES = [
  {
    t: "Wedding Photography",
    d: "Every emotional moment from engagement to reception.",
    i: Heart,
    img: hero,
  },
  {
    t: "Wedding Videography",
    d: "Cinematic wedding films with storytelling-style editing.",
    i: Film,
    img: reception,
  },
  {
    t: "Pre-Wedding Photography",
    d: "Romantic and creative couple photography.",
    i: Flower2,
    img: couple,
  },
  {
    t: "Birthday Photography",
    d: "Beautiful birthday celebrations and unforgettable moments.",
    i: Cake,
    img: birthday,
  },
  {
    t: "Baby Photography",
    d: "Professional baby portraits and milestone photography.",
    i: Baby,
    img: baby,
  },
  {
    t: "Maternity Photography",
    d: "Elegant maternity portraits and family moments.",
    i: Sparkles,
    img: bride,
  },
  {
    t: "Family Photography",
    d: "Beautiful family portraits and special occasions.",
    i: Users,
    img: family,
  },
  {
    t: "Portrait Photography",
    d: "Professional individual and personal portraits.",
    i: User,
    img: bride,
  },
  {
    t: "Event Photography",
    d: "Functions, celebrations and special events.",
    i: PartyPopper,
    img: reception,
  },
  {
    t: "Traditional Photography",
    d: "Complete traditional event photography coverage.",
    i: Camera,
    img: family,
  },
  {
    t: "Candid Photography",
    d: "Natural, emotional moments captured without posing.",
    i: Aperture,
    img: haldi,
  },
  {
    t: "Cinematic Video",
    d: "High-quality cinematic videos with professional editing.",
    i: Video,
    img: couple,
  },
];

function Services() {
  return (
    <section id="services" className="py-28 px-5 bg-card/40">
      <div className="max-w-7xl mx-auto">
        <Heading
          kicker="What We Do"
          title={
            <>
              Our <em className="text-gold-gradient">Services</em>
            </>
          }
          sub="Twelve ways we turn your celebrations into heirlooms."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.t} delay={(i % 3) * 0.1}>
              <article className="group relative h-96 overflow-hidden border border-border hover:border-gold/60 transition-colors duration-500">
                <img
                  src={s.img}
                  alt={s.t}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
                <div className="absolute inset-0 p-7 flex flex-col justify-end">
                  <span className="w-12 h-12 rounded-full glass border border-gold/50 flex items-center justify-center mb-4 group-hover:bg-gold transition-colors">
                    <s.i
                      className="w-5 h-5 text-gold group-hover:text-primary-foreground"
                      strokeWidth={1.5}
                    />
                  </span>
                  <h3 className="text-2xl text-ivory">{s.t}</h3>
                  <p className="text-sm text-ivory/70 mt-2 font-light">{s.d}</p>
                  <button
                    onClick={() => go("booking")}
                    className="mt-4 self-start text-[11px] tracking-[0.25em] uppercase text-gold flex items-center gap-2 opacity-80 group-hover:opacity-100"
                  >
                    View Service{" "}
                    <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- weddings slider ---------- */
const WED = [
  { t: "Bride Portraits", img: bride },
  { t: "Groom & Bride", img: hero },
  { t: "Haldi", img: haldi },
  { t: "Reception", img: reception },
  { t: "Couple Portraits", img: couple },
  { t: "Family Moments", img: family },
  { t: "Mehendi", img: bride },
  { t: "Candid Emotions", img: haldi },
];

function Weddings() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (d: number) =>
    track.current?.scrollBy({ left: d * track.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <section id="weddings" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={reception}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>
      <div className="relative max-w-7xl mx-auto px-5">
        <Heading
          kicker="Wedding Special"
          title={
            <>
              Your Love Story, <em className="text-gold-gradient">Beautifully Captured</em>
            </>
          }
          sub="Engagement, haldi, mehendi, rituals and reception — told like a film."
        />
        <div className="flex justify-end gap-3 mb-6">
          <button
            onClick={() => scroll(-1)}
            aria-label="Previous"
            className="w-12 h-12 border border-gold/50 text-gold flex items-center justify-center hover:bg-gold hover:text-primary-foreground transition"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Next"
            className="w-12 h-12 border border-gold/50 text-gold flex items-center justify-center hover:bg-gold hover:text-primary-foreground transition"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <div
        ref={track}
        className="relative flex gap-5 overflow-x-auto snap-x snap-mandatory px-5 md:px-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))] pb-4 [scrollbar-width:none]"
      >
        {WED.map((w, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.8 }}
            className="group relative shrink-0 snap-start w-[75vw] sm:w-[340px] aspect-[3/4] overflow-hidden"
          >
            <img
              src={w.img}
              alt={w.t}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-ink to-transparent">
              <span className="text-[10px] tracking-[0.3em] text-gold">0{i + 1}</span>
              <p className="font-display text-2xl text-ivory">{w.t}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
      <div className="text-center mt-12">
        <GoldButton onClick={() => go("gallery")}>View Wedding Stories</GoldButton>
      </div>
    </section>
  );
}

/* ---------- birthdays & functions ---------- */
const EVENTS = [
  { t: "Birthday Parties", img: birthday },
  { t: "Anniversaries", img: couple },
  { t: "Engagements", img: hero },
  { t: "Baby Showers", img: baby },
  { t: "Naming Ceremonies", img: baby },
  { t: "Family Functions", img: family },
  { t: "School & College Events", img: reception },
  { t: "Cultural Events", img: haldi },
];

function Birthdays({ openGallery }: { openGallery: (cat: string) => void }) {
  return (
    <section id="birthdays" className="py-28 px-5">
      <div className="max-w-7xl mx-auto">
        <Heading
          kicker="Birthdays & Functions"
          title={
            <>
              Every Celebration, <em className="text-gold-gradient">Every Smile</em>
            </>
          }
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {EVENTS.map((e, i) => (
            <Reveal
              key={e.t}
              delay={(i % 4) * 0.08}
              className={i === 0 || i === 5 ? "row-span-2" : ""}
            >
              <div
                className={`group relative overflow-hidden h-full ${i === 0 || i === 5 ? "min-h-[420px]" : "aspect-square"}`}
              >
                <img
                  src={e.img}
                  alt={e.t}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/60 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <p className="font-display text-2xl text-ivory">{e.t}</p>
                  <button
                    onClick={() => openGallery(i < 5 ? "Birthdays" : "Events")}
                    className="mt-3 text-[10px] tracking-[0.3em] uppercase border border-gold text-gold px-4 py-2 hover:bg-gold hover:text-primary-foreground"
                  >
                    View Gallery
                  </button>
                </div>
                <p className="absolute bottom-3 left-3 text-xs tracking-widest uppercase text-ivory group-hover:opacity-0 transition">
                  {e.t}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- gallery data ---------- */
type Photo = { src: string; alt: string; cats: string[]; tall?: boolean };
const PHOTOS: Photo[] = [
  {
    src: hero,
    alt: "Bride and groom at night",
    cats: ["Weddings", "Couples", "Wedding", "Couple"],
  },
  {
    src: bride,
    alt: "Bridal portrait",
    cats: ["Weddings", "Portraits", "Wedding", "Portrait", "Fashion"],
    tall: true,
  },
  {
    src: couple,
    alt: "Pre-wedding at sunset",
    cats: ["Couples", "Pre-Wedding", "Couple", "Outdoor"],
  },
  { src: haldi, alt: "Haldi laughter", cats: ["Weddings", "Events", "Wedding"], tall: true },
  { src: birthday, alt: "Birthday cake moment", cats: ["Birthdays", "Family", "Events"] },
  { src: baby, alt: "Sleeping newborn", cats: ["Baby", "Studio", "Maternity"] },
  { src: family, alt: "Three-generation family portrait", cats: ["Family", "Portraits", "Studio"] },
  { src: reception, alt: "Grand reception entry", cats: ["Weddings", "Events", "Wedding"] },
  {
    src: bride,
    alt: "Maternity glow portrait",
    cats: ["Maternity", "Portraits", "Portrait", "Fashion"],
  },
  {
    src: couple,
    alt: "Couple in golden field",
    cats: ["Couples", "Outdoor", "Pre-Wedding"],
    tall: true,
  },
];

function Lightbox({
  list,
  index,
  setIndex,
}: {
  list: Photo[];
  index: number | null;
  setIndex: (i: number | null) => void;
}) {
  const [zoom, setZoom] = useState(false);
  useEffect(() => {
    if (index === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((index + 1) % list.length);
      if (e.key === "ArrowLeft") setIndex((index - 1 + list.length) % list.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [index, list.length, setIndex]);
  useEffect(() => setZoom(false), [index]);
  return (
    <AnimatePresence>
      {index !== null && list[index] && (
        <motion.div
          className="fixed inset-0 z-[80] bg-ink/95 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIndex(null)}
        >
          <button
            className="absolute top-5 right-5 w-12 h-12 text-gold flex items-center justify-center"
            aria-label="Close"
          >
            <X />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIndex((index - 1 + list.length) % list.length);
            }}
            className="absolute left-2 md:left-8 w-12 h-12 border border-gold/50 text-gold flex items-center justify-center z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft />
          </button>
          <motion.img
            key={index}
            src={list[index].src}
            alt={list[index].alt}
            onClick={(e) => {
              e.stopPropagation();
              setZoom((z) => !z);
            }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: zoom ? 1.6 : 1 }}
            transition={{ duration: 0.5 }}
            className={`max-h-[85vh] max-w-[90vw] object-contain ${zoom ? "cursor-zoom-out" : "cursor-zoom-in"}`}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIndex((index + 1) % list.length);
            }}
            className="absolute right-2 md:right-8 w-12 h-12 border border-gold/50 text-gold flex items-center justify-center z-10"
            aria-label="Next photo"
          >
            <ChevronRight />
          </button>
          <p className="absolute bottom-6 text-xs tracking-[0.3em] uppercase text-ivory/70">
            {list[index].alt} · {index + 1}/{list.length} · tap to zoom
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FilterBar({
  cats,
  active,
  set,
}: {
  cats: string[];
  active: string;
  set: (c: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10">
      {cats.map((c) => (
        <button
          key={c}
          onClick={() => set(c)}
          className={`px-5 py-2.5 text-[11px] tracking-[0.25em] uppercase border transition-all ${active === c ? "bg-gold text-primary-foreground border-gold" : "border-border text-foreground/70 hover:border-gold hover:text-gold"}`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

function Masonry({ list, onOpen }: { list: Photo[]; onOpen: (i: number) => void }) {
  return (
    <motion.div layout className="columns-2 md:columns-3 gap-4 [&>*]:mb-4">
      <AnimatePresence mode="popLayout">
        {list.map((p, i) => (
          <motion.button
            layout
            key={p.alt + p.src}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.45 }}
            onClick={() => onOpen(i)}
            className="group relative block w-full overflow-hidden break-inside-avoid"
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${p.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
            />
            <span className="absolute inset-0 bg-ink/0 group-hover:bg-ink/50 transition flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition text-gold text-[11px] tracking-[0.3em] uppercase border border-gold px-4 py-2">
                View
              </span>
            </span>
          </motion.button>
        ))}
      </AnimatePresence>
    </motion.div>
  );
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
    "Studio",
  ];
  const [c, setC] = useState("Couple");
  const [idx, setIdx] = useState<number | null>(null);
  const list = PHOTOS.filter((p) => p.cats.includes(c));
  return (
    <section id="shoots" className="py-28 px-5 bg-card/40">
      <div className="max-w-7xl mx-auto">
        <Heading
          kicker="Photo Shoots"
          title={
            <>
              Curated <em className="text-gold-gradient">Portfolio</em>
            </>
          }
        />
        <FilterBar cats={cats} active={c} set={setC} />
        <Masonry list={list} onOpen={setIdx} />
        <Lightbox list={list} index={idx} setIndex={setIdx} />
      </div>
    </section>
  );
}

function Gallery({
  cat,
  setCat,
  uploaded = [],
  mediaStatus,
}: {
  cat: string;
  setCat: (c: string) => void;
  uploaded?: MediaRecord[];
  mediaStatus: "loading" | "ready" | "error" | "unconfigured";
}) {
  const cats = ["All", "Weddings", "Birthdays", "Portraits", "Couples", "Events", "Baby", "Family"];
  const [idx, setIdx] = useState<number | null>(null);
  const uploadedPhotos: Photo[] = uploaded
    .filter((item) => item.url)
    .map((item) => {
      const label = item.category.toLowerCase();
      const cats =
        label.includes("wedding") || label.includes("engagement")
          ? ["Weddings"]
          : label.includes("birthday") || label.includes("event") || label.includes("traditional")
            ? ["Birthdays", "Events"]
            : label.includes("baby")
              ? ["Baby"]
              : label.includes("couple") || label.includes("pre-wedding")
                ? ["Couples"]
                : label.includes("portrait")
                  ? ["Portraits"]
                  : label.includes("family")
                    ? ["Family"]
                    : ["Events"];
      return { src: item.url!, alt: item.title, cats, tall: false };
    });
  const galleryPhotos =
    mediaStatus === "ready" ? uploadedPhotos : mediaStatus === "loading" ? [] : PHOTOS;
  const list =
    cat === "All" ? galleryPhotos : galleryPhotos.filter((photo) => photo.cats.includes(cat));
  return (
    <section id="gallery" className="py-28 px-5">
      <div className="max-w-7xl mx-auto">
        <Heading
          kicker="Premium Gallery"
          title={
            <>
              Frames We <em className="text-gold-gradient">Treasure</em>
            </>
          }
          sub="Tap any photograph to open it full-screen."
        />
        <FilterBar cats={cats} active={cat} set={setCat} />
        {mediaStatus === "loading" && (
          <p role="status" className="py-8 text-center text-sm text-muted-foreground">
            Loading published photos…
          </p>
        )}
        {mediaStatus === "error" && (
          <p role="status" className="pb-6 text-center text-sm text-muted-foreground">
            The latest gallery could not be loaded. Showing the studio portfolio instead.
          </p>
        )}
        {mediaStatus === "ready" && list.length === 0 && (
          <p role="status" className="py-8 text-center text-sm text-muted-foreground">
            No published photos in this category yet.
          </p>
        )}
        <Masonry list={list} onOpen={setIdx} />
        <Lightbox list={list} index={idx} setIndex={setIdx} />
      </div>
    </section>
  );
}

function FeaturedUploads({ items }: { items: MediaRecord[] }) {
  const featured = items
    .filter((item) => item.is_featured && (item.url || item.thumbnail_url))
    .slice(0, 4);
  if (!featured.length) return null;
  return (
    <section className="py-20 px-5 bg-card/40">
      <div className="max-w-7xl mx-auto">
        <Heading
          kicker="Studio Highlights"
          title={
            <>
              Featured <em className="text-gold-gradient">Moments</em>
            </>
          }
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((item) => (
            <article key={item.id} className="overflow-hidden border border-border">
              <div className="aspect-[4/3] bg-ink">
                {item.media_type === "video" && item.url ? (
                  <video
                    src={item.url}
                    poster={item.thumbnail_url}
                    controls
                    preload="none"
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={item.thumbnail_url || item.url}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-display text-xl">{item.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.category}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- videos ---------- */
const VIDEOS = [
  { t: "Wedding Films", d: "4:32", imgs: [hero, bride, reception, haldi] },
  { t: "Pre-Wedding Films", d: "3:10", imgs: [couple, hero, couple] },
  { t: "Birthday Highlights", d: "2:05", imgs: [birthday, family, baby] },
  { t: "Event Highlights", d: "3:48", imgs: [reception, family, haldi] },
  { t: "Cinematic Reels", d: "0:59", imgs: [haldi, bride, couple, reception] },
];

function ReelPlayer({ imgs }: { imgs: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % imgs.length), 2600);
    return () => clearInterval(t);
  }, [imgs.length]);
  return (
    <div className="relative w-full h-full overflow-hidden bg-ink">
      <AnimatePresence mode="sync">
        <motion.img
          key={i}
          src={imgs[i]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.6, ease: "linear" }}
        />
      </AnimatePresence>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-ivory/10">
        <motion.div
          key={i}
          className="h-full bg-gold"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.6, ease: "linear" }}
        />
      </div>
    </div>
  );
}

function Videos({
  uploaded,
  mediaStatus,
}: {
  uploaded: MediaRecord[];
  mediaStatus: "loading" | "ready" | "error" | "unconfigured";
}) {
  const [open, setOpen] = useState<number | null>(null);
  const publishedVideos = uploaded.filter((item) => item.url);
  return (
    <section id="videos" className="py-28 px-5 bg-card/40">
      <div className="max-w-7xl mx-auto">
        <Heading
          kicker="Video Portfolio"
          title={
            <>
              Cinematic <em className="text-gold-gradient">Films</em>
            </>
          }
        />
        <div className="grid md:grid-cols-6 gap-5">
          {mediaStatus === "loading" ? (
            <p
              role="status"
              className="py-8 text-center text-sm text-muted-foreground md:col-span-6"
            >
              Loading published videos…
            </p>
          ) : mediaStatus === "ready" ? (
            publishedVideos.length ? (
              publishedVideos.map((item) => (
                <Reveal key={item.id} className="md:col-span-2">
                  <article className="relative aspect-video overflow-hidden border border-border hover:border-gold/60 transition">
                    <video
                      src={item.url}
                      poster={item.thumbnail_url}
                      controls
                      preload="none"
                      playsInline
                      className="w-full h-full object-cover"
                      aria-label={item.title}
                    />
                    <span className="absolute top-3 left-3 glass text-[10px] px-2 py-1 text-ivory pointer-events-none">
                      {item.category}
                    </span>
                  </article>
                  <p className="mt-2 font-display text-xl">{item.title}</p>
                </Reveal>
              ))
            ) : (
              <p
                role="status"
                className="py-8 text-center text-sm text-muted-foreground md:col-span-6"
              >
                No published videos yet.
              </p>
            )
          ) : (
            <>
              {mediaStatus === "error" && (
                <p
                  role="status"
                  className="md:col-span-6 text-center text-sm text-muted-foreground"
                >
                  The latest videos could not be loaded. Showing the studio portfolio instead.
                </p>
              )}
              {VIDEOS.map((v, i) => (
                <Reveal
                  key={v.t}
                  delay={i * 0.08}
                  className={i < 2 ? "md:col-span-3" : "md:col-span-2"}
                >
                  <button
                    onClick={() => setOpen(i)}
                    className="group relative w-full aspect-video overflow-hidden border border-border hover:border-gold/60 transition"
                  >
                    <img
                      src={v.imgs[0]}
                      alt={v.t}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-ink/40 group-hover:bg-ink/20 transition" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-16 h-16 rounded-full bg-gold-gradient shadow-gold flex items-center justify-center group-hover:scale-110 transition">
                        <Play
                          className="w-6 h-6 text-primary-foreground ml-1"
                          fill="currentColor"
                        />
                      </span>
                    </span>
                    <span className="absolute bottom-4 left-4 text-left">
                      <span className="block font-display text-2xl text-ivory">{v.t}</span>
                    </span>
                    <span className="absolute top-4 right-4 glass text-xs px-3 py-1 text-ivory">
                      {v.d}
                    </span>
                  </button>
                </Reveal>
              ))}
            </>
          )}
        </div>
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[80] bg-ink/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <button
              className="absolute top-5 right-5 w-12 h-12 text-gold flex items-center justify-center"
              aria-label="Close video"
            >
              <X />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="w-full max-w-5xl aspect-video border border-gold/40"
              onClick={(e) => e.stopPropagation()}
            >
              <ReelPlayer imgs={VIDEOS[open]!.imgs} />
            </motion.div>
            <p className="absolute bottom-8 font-display text-2xl text-gold">{VIDEOS[open]!.t}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- before / after ---------- */
function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  const move = (x: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setPos(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100)));
  };
  return (
    <section className="py-28 px-5">
      <div className="max-w-5xl mx-auto">
        <Heading
          kicker="The Edit"
          title={
            <>
              Before <span className="text-gold">→</span>{" "}
              <em className="text-gold-gradient">After</em>
            </>
          }
          sub="Colour grading, retouching and cinematic correction. Drag the handle."
        />
        <div
          ref={ref}
          className="relative aspect-[16/10] overflow-hidden select-none touch-none cursor-ew-resize border border-gold/30"
          onPointerDown={(e) => {
            drag.current = true;
            move(e.clientX);
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          }}
          onPointerMove={(e) => drag.current && move(e.clientX)}
          onPointerUp={() => (drag.current = false)}
        >
          <img
            src={couple}
            alt="Edited photograph"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <img
              src={couple}
              alt="Original photograph"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "grayscale(0.55) contrast(0.8) brightness(0.9) saturate(0.6)" }}
            />
          </div>
          <span className="absolute top-4 left-4 glass text-[10px] tracking-[0.3em] uppercase px-3 py-1.5 text-ivory">
            Before
          </span>
          <span className="absolute top-4 right-4 glass text-[10px] tracking-[0.3em] uppercase px-3 py-1.5 text-gold">
            After
          </span>
          <div className="absolute inset-y-0 w-px bg-gold" style={{ left: `${pos}%` }}>
            <span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold-gradient shadow-gold flex items-center justify-center text-primary-foreground">
              <ChevronLeft className="w-4 h-4" />
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(+e.target.value)}
            aria-label="Before and after slider"
            className="sr-only"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- why ---------- */
function Why() {
  const f = [
    [Camera, "Professional Photography"],
    [Heart, "Creative Storytelling"],
    [Wand2, "High-Quality Editing"],
    [Film, "Cinematic Videography"],
    [Aperture, "Modern Equipment"],
    [Award, "Experienced Team"],
    [Zap, "Fast Delivery"],
    [HeartHandshake, "Personalized Service"],
  ] as const;
  return (
    <section className="py-28 px-5 bg-card/40 relative overflow-hidden">
      <Particles count={14} />
      <div className="max-w-7xl mx-auto relative">
        <Heading
          kicker="Why Choose Us"
          title={
            <>
              Crafted With <em className="text-gold-gradient">Care</em>
            </>
          }
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {f.map(([I, t], i) => (
            <Reveal key={t} delay={(i % 4) * 0.08}>
              <div className="group glass border border-border hover:border-gold/60 p-7 text-center h-full transition hover:-translate-y-1 duration-500">
                <motion.span
                  whileInView={{ rotate: [0, -10, 10, 0] }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.8 }}
                  className="mx-auto w-14 h-14 rounded-full border border-gold/50 flex items-center justify-center mb-5 group-hover:bg-gold transition-colors"
                >
                  <I
                    className="w-6 h-6 text-gold group-hover:text-primary-foreground"
                    strokeWidth={1.3}
                  />
                </motion.span>
                <p className="font-display text-xl">{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- testimonials ---------- */
const TESTI = [
  {
    n: "Priya & Karthik",
    e: "Wedding",
    img: hero,
    q: "Every moment was captured beautifully. The photographs brought back all the emotions of our wedding day.",
  },
  {
    n: "Lakshmi Narayanan",
    e: "Daughter's Birthday",
    img: birthday,
    q: "They made our little one's birthday feel magical. Every smile, every candle — perfectly captured.",
  },
  {
    n: "Anjali & Rohit",
    e: "Pre-Wedding Shoot",
    img: couple,
    q: "The sunset shoot felt effortless and the film they made gave us goosebumps. Truly cinematic.",
  },
  {
    n: "The Reddy Family",
    e: "Family Portrait",
    img: family,
    q: "Three generations in one frame, and everyone looks their best. A treasure we'll keep forever.",
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % TESTI.length), 6000);
    return () => clearInterval(t);
  }, []);
  const t = TESTI[i]!;
  return (
    <section id="testimonials" className="py-28 px-5">
      <div className="max-w-4xl mx-auto text-center">
        <Heading
          kicker="Testimonials"
          title={
            <>
              Kind <em className="text-gold-gradient">Words</em>
            </>
          }
        />
        <div className="relative min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={t.img}
                alt={t.n}
                loading="lazy"
                className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-gold"
              />
              <div className="flex justify-center gap-1 mt-5 text-gold">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="w-4 h-4" fill="currentColor" />
                ))}
              </div>
              <blockquote className="font-display italic text-2xl md:text-4xl leading-snug mt-6">
                "{t.q}"
              </blockquote>
              <p className="mt-6 text-gold tracking-[0.2em] uppercase text-sm">{t.n}</p>
              <p className="text-xs text-muted-foreground tracking-widest uppercase mt-1">{t.e}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setI((i - 1 + TESTI.length) % TESTI.length)}
            aria-label="Previous testimonial"
            className="w-11 h-11 border border-gold/50 text-gold flex items-center justify-center"
          >
            <ChevronLeft />
          </button>
          {TESTI.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Testimonial ${k + 1}`}
              className={`h-1.5 transition-all ${k === i ? "w-8 bg-gold" : "w-3 bg-gold/30"}`}
            />
          ))}
          <button
            onClick={() => setI((i + 1) % TESTI.length)}
            aria-label="Next testimonial"
            className="w-11 h-11 border border-gold/50 text-gold flex items-center justify-center"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- instagram ---------- */
function InstaStrip() {
  const imgs = [bride, haldi, couple, birthday, baby, family, reception, hero];
  return (
    <section className="py-24 overflow-hidden">
      <Heading
        kicker="Follow Our Journey"
        title={
          <a
            href={INSTA}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-gradient hover:opacity-80"
          >
            @SriLakshmiDigitalStudio
          </a>
        }
      />
      <div className="flex w-max marquee gap-4">
        {[...imgs, ...imgs].map((s, i) => (
          <a
            key={i}
            href={INSTA}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-56 h-56 shrink-0 overflow-hidden"
            aria-label="Open Instagram"
          >
            <img
              src={s}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-ink/0 group-hover:bg-ink/50 flex items-center justify-center transition">
              <Instagram className="text-gold opacity-0 group-hover:opacity-100 transition" />
            </span>
          </a>
        ))}
      </div>
      <div className="text-center mt-10">
        <GoldButton outline href={INSTA}>
          <Instagram className="w-4 h-4" /> Follow on Instagram
        </GoldButton>
      </div>
    </section>
  );
}

/* ---------- booking ---------- */
function BookingField({ error, children }: { error?: string; children: ReactNode }) {
  return (
    <div>
      {children}
      {error && <p className="text-destructive text-xs mt-1">{error}</p>}
    </div>
  );
}

function Booking() {
  const settings = useSiteSettings();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    event: "",
    date: "",
    location: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm((current) => ({ ...current, [k]: value }));
      setErrors((current) => {
        if (!current[k]) return current;
        const next = { ...current };
        delete next[k];
        return next;
      });
    };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!form.name.trim()) er["name"] = "Please enter your name";
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (
      !/^\+?[\d\s().-]+$/.test(form.phone.trim()) ||
      phoneDigits.length < 7 ||
      phoneDigits.length > 15
    )
      er["phone"] = "Enter a phone number with 7 to 15 digits";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) er["email"] = "Enter a valid email";
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
            message: form.message.trim(),
          });
          if (error)
            setSubmitError(
              "We couldn't save your enquiry online. Please send it through WhatsApp below.",
            );
        }
      }
      setSent(true);
    } catch {
      setSubmitError(
        "We couldn't save your enquiry online. Please send it through WhatsApp below.",
      );
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  };
  const waBooking = () =>
    waLink(
      `${WA_MSG}\n\nName: ${form.name}\nEvent: ${form.event}\nDate: ${form.date}\nLocation: ${form.location}\nService: ${form.service}\n${form.message}`,
      settings.phone,
    );
  const input =
    "w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground placeholder:text-muted-foreground/60 transition-colors";
  return (
    <section id="booking" className="relative py-28 px-5 overflow-hidden">
      <img
        src={bride}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/70" />
      <div className="relative max-w-4xl mx-auto">
        <Heading
          kicker="Book a Session"
          title={
            <>
              Let's Capture <em className="text-gold-gradient">Your Story</em>
            </>
          }
        />
        <Reveal>
          <div className="glass border border-gold/30 p-6 md:p-12 shadow-gold">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 180, damping: 12 }}
                  >
                    <CheckCircle2 className="w-20 h-20 text-gold mx-auto" strokeWidth={1} />
                  </motion.div>
                  <h3 className="text-4xl mt-6">Thank you, {form.name.split(" ")[0]}!</h3>
                  <p className="text-muted-foreground mt-3">
                    {submitError ||
                      "Your enquiry is ready. Send it on WhatsApp so we can reply right away."}
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <GoldButton href={waBooking()}>
                      <MessageCircle className="w-4 h-4" /> Send on WhatsApp
                    </GoldButton>
                    <GoldButton
                      outline
                      onClick={() => {
                        setSent(false);
                        setForm({
                          name: "",
                          phone: "",
                          email: "",
                          event: "",
                          date: "",
                          location: "",
                          service: "",
                          message: "",
                        });
                      }}
                    >
                      New Enquiry
                    </GoldButton>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="f"
                  onSubmit={submit}
                  noValidate
                  className="grid md:grid-cols-2 gap-x-8 gap-y-6"
                >
                  <BookingField error={errors.name}>
                    <input
                      className={input}
                      placeholder="Full Name *"
                      value={form.name}
                      onChange={set("name")}
                      aria-label="Full name"
                    />
                  </BookingField>
                  <BookingField error={errors.phone}>
                    <input
                      className={input}
                      type="tel"
                      placeholder="Phone Number *"
                      value={form.phone}
                      onChange={set("phone")}
                      aria-label="Phone number"
                    />
                  </BookingField>
                  <BookingField error={errors.email}>
                    <input
                      className={input}
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={set("email")}
                      aria-label="Email"
                    />
                  </BookingField>
                  <BookingField error={errors.event}>
                    <select
                      className={`${input} bg-background/0 [&>option]:bg-card`}
                      value={form.event}
                      onChange={set("event")}
                      aria-label="Event type"
                    >
                      <option value="">Event Type</option>
                      {[
                        "Wedding",
                        "Engagement",
                        "Pre-Wedding",
                        "Birthday",
                        "Baby Shower",
                        "Naming Ceremony",
                        "Family Function",
                        "Corporate / Other",
                      ].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </BookingField>
                  <BookingField error={errors.date}>
                    <input
                      className={input}
                      type="date"
                      value={form.date}
                      onChange={set("date")}
                      aria-label="Event date"
                    />
                  </BookingField>
                  <BookingField error={errors.location}>
                    <input
                      className={input}
                      placeholder="Event Location"
                      value={form.location}
                      onChange={set("location")}
                      aria-label="Event location"
                    />
                  </BookingField>
                  <div className="md:col-span-2">
                    <select
                      className={`${input} [&>option]:bg-card`}
                      value={form.service}
                      onChange={set("service")}
                      aria-label="Preferred service"
                    >
                      <option value="">Preferred Service</option>
                      {SERVICES.map((s) => (
                        <option key={s.t}>{s.t}</option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    className={`${input} md:col-span-2 resize-none`}
                    rows={3}
                    placeholder="Tell us about your celebration"
                    value={form.message}
                    onChange={set("message")}
                    aria-label="Message"
                  />
                  <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 pt-4">
                    <GoldButton type="submit" disabled={submitting}>
                      {submitting ? "Saving…" : "Send Enquiry"}
                    </GoldButton>
                    <GoldButton outline href={waBooking()}>
                      <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                    </GoldButton>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- contact + footer ---------- */
function Contact() {
  const settings = useSiteSettings();
  const digits = settings.phone.replace(/\D/g, "");
  const phoneDisplay =
    digits.length === 12 && digits.startsWith("91")
      ? `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`
      : settings.phone;
  const items = [
    [Phone, "Phone", phoneDisplay, `tel:${settings.phone.replace(/[^+\d]/g, "")}`],
    [MessageCircle, "WhatsApp", "Chat with us", waLink(WA_MSG, settings.phone)],
    [Mail, "Email", settings.email, `mailto:${settings.email}`],
    [
      MapPin,
      "Studio",
      settings.address,
      `https://maps.google.com/?q=${encodeURIComponent(settings.address)}`,
    ],
    [Clock, "Hours", settings.hours, undefined],
  ] as const;
  return (
    <section id="contact" className="py-28 px-5 bg-card/40">
      <div className="max-w-7xl mx-auto">
        <Heading kicker="Contact" title={<span className="text-gold-gradient">{STUDIO}</span>} />
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            {items.map(([I, l, v, h]) => {
              const inner = (
                <>
                  <span className="w-12 h-12 rounded-full border border-gold/50 flex items-center justify-center shrink-0">
                    <I className="w-5 h-5 text-gold" strokeWidth={1.4} />
                  </span>
                  <span>
                    <span className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                      {l}
                    </span>
                    <span className="text-lg">{v}</span>
                  </span>
                </>
              );
              return h ? (
                <a
                  key={l}
                  href={h}
                  target={h.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 p-4 border border-border hover:border-gold/60 transition"
                >
                  {inner}
                </a>
              ) : (
                <div key={l} className="flex items-center gap-5 p-4 border border-border">
                  {inner}
                </div>
              );
            })}
            <div className="flex gap-3 pt-2">
              {[
                [Instagram, INSTA, "Instagram"],
                [Facebook, FACEBOOK, "Facebook"],
                [Youtube, YOUTUBE, "YouTube"],
              ].map(([I, h, l]) => {
                const Icon = I as typeof Instagram;
                return (
                  <a
                    key={l as string}
                    href={h as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={l as string}
                    className="w-12 h-12 border border-gold/50 text-gold flex items-center justify-center hover:bg-gold hover:text-primary-foreground transition"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="relative min-h-[420px] border border-gold/30 overflow-hidden">
            <iframe
              title="Studio location map"
              src="https://www.google.com/maps?q=Chirala%20Road%2C%20Vetapalem%2C%20near%20Venkateswara%20Temple%2C%20Andhra%20Pradesh&output=embed"
              loading="lazy"
              className="absolute inset-0 w-full h-full grayscale-[0.6] invert-[0.9] hue-rotate-180"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink border-t border-gold/20 pt-20 pb-8 px-5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <p className="font-display text-3xl text-gold-gradient tracking-[0.1em]">SRI LAKSHMI</p>
          <p className="text-[10px] tracking-[0.35em] text-muted-foreground">
            DIGITAL STUDIO & VIDEO
          </p>
          <p className="font-display italic text-xl mt-6 text-ivory/80">
            "We Capture Moments. You Keep the Memories."
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-5">Quick Links</p>
          {[
            ["Home", "home"],
            ["About", "about"],
            ["Services", "services"],
            ["Gallery", "gallery"],
            ["Videos", "videos"],
            ["Contact", "contact"],
          ].map(([l, id]) => (
            <button
              key={id}
              onClick={() => go(id)}
              className="block text-sm text-muted-foreground hover:text-gold py-1.5"
            >
              {l}
            </button>
          ))}
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-5">Services</p>
          {[
            "Wedding Photography",
            "Birthday Photography",
            "Pre-Wedding",
            "Portraits",
            "Events",
            "Cinematic Videos",
          ].map((s) => (
            <button
              key={s}
              onClick={() => go("services")}
              className="block text-sm text-muted-foreground hover:text-gold py-1.5 text-left"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>© 2026 Sri Lakshmi Digital Studio and Video. All Rights Reserved.</p>
        <div className="flex gap-4">
          <a
            href={INSTA}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-gold"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href={FACEBOOK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-gold"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href={YOUTUBE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="hover:text-gold"
          >
            <Youtube className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ---------- floating ---------- */
function Floating() {
  const settings = useSiteSettings();
  const [top, setTop] = useState(false);
  useEffect(() => {
    const f = () => setTop(window.scrollY > 800);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <>
      <a
        href={waLink(WA_MSG, settings.phone)}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-whatsapp text-ivory flex items-center justify-center wa-pulse hover:scale-110 transition"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
      <AnimatePresence>
        {top && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => go("home")}
            aria-label="Back to top"
            className="fixed bottom-24 right-6 z-50 w-12 h-12 border border-gold/60 glass text-gold flex items-center justify-center"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX: x }}
      className="fixed top-0 inset-x-0 h-0.5 bg-gold-gradient origin-left z-[70]"
    />
  );
}

function Home() {
  const [intro, setIntro] = useState(true);
  const [galleryCat, setGalleryCat] = useState("All");
  const [uploadedMedia, setUploadedMedia] = useState<MediaRecord[]>([]);
  const [mediaStatus, setMediaStatus] = useState<"loading" | "ready" | "error" | "unconfigured">(
    isSupabaseConfigured ? "loading" : "unconfigured",
  );
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let active = true;
    const client = getSupabase();
    const refresh = () =>
      void getPublicMedia()
        .then((media) => {
          if (active) {
            setUploadedMedia(media);
            setMediaStatus("ready");
          }
        })
        .catch(() => {
          if (active) setMediaStatus("error");
        });
    refresh();
    const channel = client
      ?.channel("public-gallery-media")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "media",
        },
        refresh,
      )
      .subscribe();
    return () => {
      active = false;
      if (client && channel) void client.removeChannel(channel);
    };
  }, []);
  return (
    <div className="grain">
      <AnimatePresence>{intro && <Intro onDone={() => setIntro(false)} />}</AnimatePresence>
      <ScrollProgress />
      <Navbar show={!intro} />
      <main>
        <Hero show={!intro} />
        <About />
        <Services />
        <Weddings />
        <Birthdays
          openGallery={(c) => {
            setGalleryCat(c);
            go("gallery");
          }}
        />
        <PhotoShoots />
        <FeaturedUploads items={uploadedMedia} />
        <Gallery
          cat={galleryCat}
          setCat={setGalleryCat}
          uploaded={uploadedMedia.filter((item) => item.media_type === "photo")}
          mediaStatus={mediaStatus}
        />
        <Videos
          uploaded={uploadedMedia.filter((item) => item.media_type === "video")}
          mediaStatus={mediaStatus}
        />
        <BeforeAfter />
        <Why />
        <Testimonials />
        <InstaStrip />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <Floating />
    </div>
  );
}
