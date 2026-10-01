import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  Aperture,
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  Eye,
  EyeOff,
  Film,
  FolderOpen,
  Image as ImageIcon,
  Images,
  Inbox,
  LayoutDashboard,
  Library,
  LoaderCircle,
  LogOut,
  Menu,
  Pencil,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Trash2,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import {
  AlbumRecord,
  MEDIA_CATEGORIES,
  MediaKind,
  MediaRecord,
  optimizeImage,
  safeFileName,
  signedMediaUrl,
  uploadResumable,
} from "../../lib/admin-media";
import {
  getSupabase,
  isSupabaseConfigured,
  MEDIA_BUCKET,
  setRememberSession,
} from "../../lib/supabase";
import { DEFAULT_SITE_SETTINGS } from "../../lib/site-settings";

const inputClass =
  "w-full min-h-11 rounded border border-white/10 bg-black/25 px-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-amber-300/70 focus:ring-2 focus:ring-amber-300/15";
const buttonClass =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded border border-amber-200/30 px-4 text-sm text-amber-100 transition hover:border-amber-200/70 hover:bg-amber-200/10 disabled:cursor-not-allowed disabled:opacity-50";
const primaryButton =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded bg-amber-200 px-5 text-sm font-semibold text-stone-950 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50";
const panelClass = "rounded-md border border-white/10 bg-white/[0.035]";
const sectionLabels: Record<string, string> = {
  photos: "Upload Photos",
  videos: "Upload Videos",
  albums: "Albums",
  media: "Media Library",
  featured: "Featured Media",
  messages: "Messages & Enquiries",
  settings: "Website Settings",
  profile: "Profile",
};

function Notice({
  children,
  tone = "success",
}: {
  children: ReactNode;
  tone?: "success" | "error";
}) {
  return (
    <div
      role="status"
      className={`rounded border px-4 py-3 text-sm ${tone === "error" ? "border-rose-400/30 bg-rose-400/10 text-rose-100" : "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"}`}
    >
      {children}
    </div>
  );
}

function LoadingPanel({ label = "Loading studio workspace" }: { label?: string }) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center gap-3 text-sm text-white/55">
      <LoaderCircle className="h-5 w-5 animate-spin text-amber-200" />
      {label}
    </div>
  );
}

function SetupRequired() {
  return (
    <section className="min-h-screen bg-[#11100d] px-5 py-16 text-stone-100">
      <section className={`${panelClass} mx-auto max-w-xl p-7 md:p-10`}>
        <Aperture className="mb-6 h-8 w-8 text-amber-200" />
        <p className="text-xs uppercase tracking-[0.28em] text-amber-200">Studio Admin</p>
        <h1 className="mt-3 font-display text-4xl">Connect secure media storage</h1>
        <p className="mt-4 text-sm leading-6 text-white/60">
          Admin access is disabled until a Supabase project is configured. Follow the setup steps to
          enable secure login, persistent uploads, and protected media management.
        </p>
        <p className="mt-6 rounded border border-white/10 bg-black/20 p-3 text-sm text-white/55">
          Setup instructions are in the project’s{" "}
          <code className="text-amber-100">SUPABASE_SETUP.md</code> file.
        </p>
        <p className="mt-4 text-xs text-white/40">No credentials are bundled in the site.</p>
      </section>
    </section>
  );
}

export function AdminLayout() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const navigate = useNavigate();
  const isPublicAdminRoute = pathname === "/admin/login" || pathname === "/admin/reset";
  const [state, setState] = useState<"checking" | "ready" | "setup">("checking");

  useEffect(() => {
    if (isPublicAdminRoute) return;
    const client = getSupabase();
    if (!client) {
      setState("setup");
      return;
    }
    let active = true;
    void client.auth.getSession().then(async ({ data, error }) => {
      if (!active) return;
      if (error || !data.session) {
        setState("checking");
        void navigate({ to: "/admin/login" });
        return;
      }
      const { data: admin, error: adminError } = await client
        .from("admin_users")
        .select("id")
        .eq("id", data.session.user.id)
        .maybeSingle();
      if (!active) return;
      if (adminError || !admin) {
        await client.auth.signOut();
        void navigate({ to: "/admin/login" });
        return;
      }
      setState("ready");
    });
    return () => {
      active = false;
    };
  }, [isPublicAdminRoute, navigate, pathname]);

  if (isPublicAdminRoute) return <Outlet />;
  if (state === "setup") return <SetupRequired />;
  if (state !== "ready") return <LoadingPanel />;
  return (
    <AdminFrame>
      <Outlet />
    </AdminFrame>
  );
}

function AdminFrame({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useLocation({ select: (location) => location.pathname });
  const navigate = useNavigate();
  const active = pathname.split("/")[2] || "dashboard";
  const navItems = [
    ["dashboard", "Dashboard", LayoutDashboard],
    ["photos", "Photos", ImageIcon],
    ["videos", "Videos", Film],
    ["albums", "Albums", FolderOpen],
    ["media", "Media Library", Library],
    ["featured", "Featured", Star],
    ["messages", "Messages / Enquiries", Inbox],
    ["settings", "Website Settings", Settings],
    ["profile", "Profile", UserRound],
  ] as const;
  const logout = async () => {
    await getSupabase()?.auth.signOut();
    void navigate({ to: "/admin/login" });
  };
  const nav = (
    <>
      <a href="/" className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-200/40">
          <Aperture className="h-5 w-5 text-amber-200" />
        </span>
        <span>
          <span className="block font-display text-lg text-amber-100">SRI LAKSHMI</span>
          <span className="text-[9px] uppercase tracking-[0.22em] text-white/40">Studio Admin</span>
        </span>
      </a>
      <nav className="space-y-1 p-3" aria-label="Admin navigation">
        {navItems.map(([id, label, Icon]) => {
          const href = id === "dashboard" ? "/admin" : `/admin/${id}`;
          const selected = active === id || (id === "dashboard" && pathname === "/admin/");
          return (
            <a
              key={id}
              href={href}
              onClick={() => setMenuOpen(false)}
              aria-current={selected ? "page" : undefined}
              className={`flex min-h-11 items-center gap-3 rounded px-3 text-sm transition ${selected ? "bg-amber-200/10 text-amber-100" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          );
        })}
      </nav>
      <div className="mt-auto space-y-2 border-t border-white/10 p-4">
        <a
          href="/"
          className="flex min-h-10 items-center gap-3 px-3 text-sm text-white/55 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          View website
        </a>
        <button
          type="button"
          onClick={logout}
          className="flex min-h-10 w-full items-center gap-3 px-3 text-sm text-white/55 hover:text-rose-200"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>
    </>
  );
  return (
    <div className="min-h-screen bg-[#11100d] text-stone-100">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-[#151410] lg:flex">
        {nav}
      </aside>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/10 bg-[#11100d]/95 px-4 backdrop-blur lg:hidden">
        <button
          className={buttonClass}
          aria-label="Open admin menu"
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="h-4 w-4" />
          Menu
        </button>
        <a href="/" className="font-display text-lg text-amber-100">
          SRI LAKSHMI
        </a>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.aside
              className="flex h-full w-[min(84vw,300px)] flex-col border-r border-white/10 bg-[#151410]"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="absolute left-[min(calc(84vw-52px),248px)] top-3 flex h-10 w-10 items-center justify-center text-white/70"
              >
                <X />
              </button>
              {nav}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
      <main className="mx-auto min-h-[calc(100vh-3.5rem)] max-w-7xl px-4 py-7 sm:px-7 lg:ml-64 lg:px-10 lg:py-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-200/70">
              Sri Lakshmi Digital Studio
            </p>
            <h1 className="mt-2 font-display text-4xl">{sectionLabels[active] ?? "Dashboard"}</h1>
          </div>
          <ShieldCheck className="hidden h-6 w-6 text-amber-200/70 sm:block" />
        </div>
        {children}
      </main>
    </div>
  );
}

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setRemember(
      typeof window !== "undefined" &&
        window.localStorage.getItem("studio-admin-remember") === "true",
    );
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setNotice("");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError("Enter a valid email address.");
    if (password.length < 8) return setError("Enter your password (at least 8 characters).");
    const client = getSupabase();
    if (!client) return setError("Admin authentication is not configured yet.");
    setRememberSession(remember);
    setBusy(true);
    const { data, error: authError } = await client.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (authError || !data.user) {
      setError("Login failed. Check your credentials and try again.");
      setBusy(false);
      return;
    }
    const { data: admin, error: adminError } = await client
      .from("admin_users")
      .select("id")
      .eq("id", data.user.id)
      .maybeSingle();
    if (adminError || !admin) {
      await client.auth.signOut();
      setError("This account does not have studio administrator access.");
      setBusy(false);
      return;
    }
    setBusy(false);
    void navigate({ to: "/admin" });
  };

  const forgotPassword = async () => {
    setError("");
    setNotice("");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError("Enter your account email first.");
    const client = getSupabase();
    if (!client) return setError("Admin authentication is not configured yet.");
    setBusy(true);
    const { error: resetError } = await client.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/admin/reset`,
    });
    setBusy(false);
    if (resetError)
      setError("Could not send a reset email. Check your email settings and try again.");
    else
      setNotice("If this email belongs to an admin account, a password reset link has been sent.");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#11100d] px-4 py-12 text-stone-100">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_15%,rgba(194,153,73,0.12),transparent_40%),radial-gradient(ellipse_at_90%_85%,rgba(105,115,93,0.12),transparent_35%)]" />
      <section
        className={`${panelClass} relative w-full max-w-md p-6 shadow-2xl shadow-black/30 sm:p-9`}
      >
        <a
          href="/"
          className="mb-8 inline-flex items-center gap-3 text-sm text-white/50 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to website
        </a>
        <div className="mb-8 flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-200/40">
            <Aperture className="h-6 w-6 text-amber-200" />
          </span>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-200">Studio Admin</p>
            <h1 className="font-display text-3xl">Welcome back</h1>
          </div>
        </div>
        {!isSupabaseConfigured ? (
          <SetupRequired />
        ) : (
          <form onSubmit={submit} className="space-y-5" noValidate>
            <label className="block space-y-2 text-sm text-white/70">
              Email address
              <input
                className={inputClass}
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <label className="block space-y-2 text-sm text-white/70">
              Password
              <span className="relative block">
                <input
                  className={`${inputClass} pr-12`}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((shown) => !shown)}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-white/50"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-white/55">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                className="accent-amber-200"
              />
              Remember this device
            </label>
            {error && <Notice tone="error">{error}</Notice>}
            {notice && <Notice>{notice}</Notice>}
            <button className={`${primaryButton} w-full`} disabled={busy}>
              {busy && <LoaderCircle className="h-4 w-4 animate-spin" />}
              {busy ? "Signing in…" : "Sign in"}
            </button>
            <button
              type="button"
              onClick={forgotPassword}
              disabled={busy}
              className="w-full text-center text-sm text-amber-100/70 hover:text-amber-100"
            >
              Forgot password?
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

function PasswordResetPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (password.length < 10) return setError("Use at least 10 characters for your new password.");
    const client = getSupabase();
    if (!client) return setError("Admin authentication is not configured.");
    setBusy(true);
    const { error: updateError } = await client.auth.updateUser({ password });
    setBusy(false);
    if (updateError)
      setError("The reset link is invalid or expired. Request a new one from the login page.");
    else setDone(true);
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#11100d] px-4 text-stone-100">
      <section className={`${panelClass} w-full max-w-md p-7`}>
        <Aperture className="mb-5 h-8 w-8 text-amber-200" />
        <h1 className="font-display text-3xl">Reset password</h1>
        {done ? (
          <div className="mt-5 space-y-4">
            <Notice>Password updated. Sign in with your new password.</Notice>
            <button onClick={() => void navigate({ to: "/admin/login" })} className={primaryButton}>
              Go to login
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block space-y-2 text-sm text-white/70">
              New password
              <input
                className={inputClass}
                type="password"
                minLength={10}
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            {error && <Notice tone="error">{error}</Notice>}
            <button className={primaryButton} disabled={busy}>
              {busy ? "Saving…" : "Update password"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

function SectionHeading({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-3xl">{title}</h2>
        <p className="mt-1 text-sm text-white/50">{description}</p>
      </div>
      {action}
    </div>
  );
}

function AdminDashboard() {
  const [stats, setStats] = useState({
    photos: 0,
    videos: 0,
    weddings: 0,
    events: 0,
    shoots: 0,
    storage: 0,
    recent: [] as MediaRecord[],
  });
  const [error, setError] = useState("");
  useEffect(() => {
    const client = getSupabase();
    if (!client) return;
    let active = true;
    void Promise.all([
      client
        .from("media")
        .select("id, media_type, category, created_at, file_size, title, file_path, thumbnail_path")
        .order("created_at", { ascending: false }),
      client.from("albums").select("id, category"),
    ])
      .then(async ([mediaResult, albumResult]) => {
        if (mediaResult.error || albumResult.error) throw mediaResult.error ?? albumResult.error;
        const media = (mediaResult.data ?? []) as MediaRecord[];
        const albums = albumResult.data ?? [];
        const recent = await Promise.all(
          media.slice(0, 5).map(async (item) => ({
            ...item,
            thumbnail_url:
              (await signedMediaUrl(item.thumbnail_path || item.file_path)) ?? undefined,
          })),
        );
        if (!active) return;
        setStats({
          photos: media.filter((item) => item.media_type === "photo").length,
          videos: media.filter((item) => item.media_type === "video").length,
          weddings: albums.filter((item) => item.category === "Weddings").length,
          events: albums.filter(
            (item) =>
              item.category !== "Weddings" &&
              item.category !== "Couple Shoots" &&
              item.category !== "Portraits",
          ).length,
          shoots: albums.filter((item) =>
            ["Couple Shoots", "Portraits", "Pre-Wedding", "Baby Shoots"].includes(item.category),
          ).length,
          storage: media.reduce(
            (total, item) =>
              total + (Number((item as MediaRecord & { file_size?: number }).file_size) || 0),
            0,
          ),
          recent,
        });
      })
      .catch((reason: unknown) => {
        if (active)
          setError(
            reason instanceof Error ? reason.message : "Could not load dashboard statistics.",
          );
      });
    return () => {
      active = false;
    };
  }, []);
  const cards = [
    ["Total Photos", stats.photos, ImageIcon],
    ["Total Videos", stats.videos, Film],
    ["Wedding Albums", stats.weddings, Aperture],
    ["Birthday / Event Albums", stats.events, CalendarDays],
    ["Photo Shoots", stats.shoots, Images],
    ["Storage Used", formatBytes(stats.storage), Library],
  ] as const;
  return (
    <>
      <SectionHeading
        title="Overview"
        description="Your studio library at a glance."
        action={
          <a href="/admin/photos" className={primaryButton}>
            <Plus className="h-4 w-4" />
            Upload media
          </a>
        }
      />
      {error && <Notice tone="error">{error}</Notice>}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(([label, value, Icon], index) => (
          <motion.article
            key={label}
            className={`${panelClass} p-5`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
          >
            <div className="flex items-center justify-between text-sm text-white/55">
              <span>{label}</span>
              <Icon className="h-4 w-4 text-amber-200/75" />
            </div>
            <p className="mt-5 font-display text-4xl text-amber-100">{value}</p>
          </motion.article>
        ))}
      </div>
      <section className={`${panelClass} mt-6 p-5`}>
        <div className="mb-4 flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-amber-200" />
          <h3 className="font-display text-2xl">Recently uploaded</h3>
        </div>
        {stats.recent.length ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {stats.recent.map((item) => (
              <a
                href="/admin/media"
                key={item.id}
                className="group overflow-hidden rounded border border-white/10"
              >
                <div className="aspect-[4/3] bg-black/30">
                  {item.thumbnail_url && (
                    <img
                      src={item.thumbnail_url}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-3">
                  <p className="truncate text-sm">{item.title}</p>
                  <p className="mt-1 text-xs text-white/45">
                    {item.media_type} · {item.category}
                  </p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <EmptyState title="No uploads yet" detail="Your new photos and films will appear here." />
        )}
      </section>
    </>
  );
}

function EmptyState({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded border border-dashed border-white/15 px-5 py-10 text-center">
      <Images className="mx-auto h-7 w-7 text-amber-200/60" />
      <p className="mt-3 text-sm">{title}</p>
      <p className="mt-1 text-xs text-white/45">{detail}</p>
    </div>
  );
}

type UploadDraft = { file: File; preview: string };

function MediaUploader({ kind }: { kind: MediaKind }) {
  const input = useRef<HTMLInputElement>(null);
  const controller = useRef<AbortController | null>(null);
  const previewUrls = useRef(new Set<string>());
  const [drafts, setDrafts] = useState<UploadDraft[]>([]);
  const [albums, setAlbums] = useState<AlbumRecord[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(MEDIA_CATEGORIES[0]);
  const [albumId, setAlbumId] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [publish, setPublish] = useState(true);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const isPhoto = kind === "photo";

  useEffect(() => {
    const client = getSupabase();
    if (!client) return;
    void client
      .from("albums")
      .select("id, title, description, category, event_date, cover_path, is_published, created_at")
      .order("title")
      .then(({ data }) => setAlbums((data ?? []) as AlbumRecord[]));
  }, []);

  useEffect(() => () => previewUrls.current.forEach((url) => URL.revokeObjectURL(url)), []);

  const addFiles = (files: FileList | File[]) => {
    setNotice("");
    setError("");
    const accepted = Array.from(files).filter((file) => {
      const extension = file.name.split(".").pop()?.toLowerCase();
      const valid = isPhoto
        ? ["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
          ["jpg", "jpeg", "png", "webp"].includes(extension ?? "")
        : ["video/mp4", "video/webm", "video/quicktime"].includes(file.type) ||
          ["mp4", "webm", "mov"].includes(extension ?? "");
      const sizeLimit = isPhoto ? 40 * 1024 * 1024 : 500 * 1024 * 1024;
      if (!valid || file.size > sizeLimit) {
        setError(
          `${file.name}: choose a supported ${isPhoto ? "JPG, PNG, or WEBP image up to 40 MB" : "MP4, WebM, or MOV video up to 500 MB"}.`,
        );
        return false;
      }
      return true;
    });
    setDrafts((current) => [
      ...current,
      ...accepted.map((file) => {
        const preview = URL.createObjectURL(file);
        previewUrls.current.add(preview);
        return { file, preview };
      }),
    ]);
  };

  const removeDraft = (index: number) =>
    setDrafts((current) =>
      current.filter((draft, itemIndex) => {
        if (itemIndex === index) {
          URL.revokeObjectURL(draft.preview);
          previewUrls.current.delete(draft.preview);
        }
        return itemIndex !== index;
      }),
    );

  const startUpload = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setNotice("");
    if (!drafts.length) return setError(`Choose at least one ${isPhoto ? "photo" : "video"}.`);
    const client = getSupabase();
    if (!client) return setError("Supabase is not configured.");
    const {
      data: { user },
    } = await client.auth.getUser();
    if (!user) return setError("Your session expired. Please sign in again.");
    const abortController = new AbortController();
    controller.current = abortController;
    setBusy(true);
    setProgress(0);
    const uploadedPaths: string[] = [];
    const insertedIds: string[] = [];
    const cleanupPartialUpload = async () => {
      if (insertedIds.length) await client.from("media").delete().in("id", insertedIds);
      if (uploadedPaths.length) {
        await client.storage.from(MEDIA_BUCKET).remove([...new Set(uploadedPaths)]);
      }
    };
    let complete = 0;
    try {
      for (const [index, draft] of drafts.entries()) {
        if (abortController.signal.aborted) break;
        const id = crypto.randomUUID();
        const basePath = `${user.id}/${id}`;
        let mainFile: File | Blob = draft.file;
        let thumbFile: File | Blob | null = thumbnail;
        if (isPhoto) {
          const optimized = await optimizeImage(draft.file);
          mainFile = optimized.full;
          thumbFile = optimized.thumbnail;
        } else if (thumbnail) {
          thumbFile = (await optimizeImage(thumbnail)).thumbnail;
        }
        const mainPath = `${basePath}/${safeFileName(isPhoto ? `${id}.webp` : draft.file.name)}`;
        await uploadResumable(
          mainFile,
          mainPath,
          (ratio) => setProgress(Math.round(((complete + ratio * 0.85) / drafts.length) * 100)),
          abortController.signal,
        );
        uploadedPaths.push(mainPath);
        let thumbnailPath: string | null = null;
        if (thumbFile) {
          thumbnailPath = `${basePath}/thumbnail.webp`;
          await uploadResumable(
            thumbFile,
            thumbnailPath,
            (ratio) =>
              setProgress(Math.round(((complete + 0.85 + ratio * 0.15) / drafts.length) * 100)),
            abortController.signal,
          );
          uploadedPaths.push(thumbnailPath);
        } else if (isPhoto) thumbnailPath = mainPath;
        const cleanTitle = title.trim() || draft.file.name.replace(/\.[^.]+$/, "");
        const { data: inserted, error: insertError } = await client
          .from("media")
          .insert({
            title: drafts.length > 1 ? `${cleanTitle} ${index + 1}` : cleanTitle,
            description: description.trim(),
            original_filename: draft.file.name,
            file_path: mainPath,
            thumbnail_path: thumbnailPath,
            media_type: kind,
            category,
            album_id: albumId || null,
            tags: tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
              .slice(0, 20),
            event_date: eventDate || null,
            is_published: publish,
            is_featured: false,
            uploaded_by: user.id,
            file_size: mainFile.size,
          })
          .select("id")
          .single();
        if (insertError) throw insertError;
        insertedIds.push(inserted.id);
        complete += 1;
      }
      if (abortController.signal.aborted) {
        await cleanupPartialUpload();
        setNotice("Upload cancelled. No partial files were kept.");
      } else {
        setProgress(100);
        setNotice(
          `${complete} ${complete === 1 ? "item" : "items"} uploaded${publish ? " and published" : " as unpublished drafts"}.`,
        );
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

  return (
    <form onSubmit={startUpload} className="space-y-5">
      <SectionHeading
        title={isPhoto ? "Upload photos" : "Upload videos"}
        description={
          isPhoto
            ? "JPG, JPEG, PNG, or WEBP · images are resized and converted to WebP."
            : "MP4, WebM, or MOV · uploaded in resumable chunks, up to 500 MB."
        }
      />
      <div className={`${panelClass} p-5`}>
        <button
          type="button"
          disabled={busy}
          onClick={() => input.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            addFiles(event.dataTransfer.files);
          }}
          className="flex min-h-36 w-full flex-col items-center justify-center rounded border border-dashed border-amber-200/30 bg-black/15 px-4 text-center transition hover:border-amber-200/70"
        >
          <Upload className="h-6 w-6 text-amber-200" />
          <span className="mt-3 text-sm">Drop {isPhoto ? "photos" : "videos"} here or browse</span>
          <span className="mt-1 text-xs text-white/40">Multiple files supported</span>
        </button>
        <input
          ref={input}
          className="hidden"
          type="file"
          multiple
          accept={
            isPhoto
              ? "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
              : "video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
          }
          onChange={(event) => {
            if (event.target.files) addFiles(event.target.files);
          }}
        />
        {drafts.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {drafts.map((draft, index) => (
              <div
                key={`${draft.file.name}-${index}`}
                className="relative overflow-hidden rounded border border-white/10 bg-black/20"
              >
                <div className="aspect-[4/3]">
                  {isPhoto ? (
                    <img
                      src={draft.preview}
                      alt={draft.file.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <video
                      src={draft.preview}
                      controls
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="p-2">
                  <p className="truncate text-xs">{draft.file.name}</p>
                  <p className="text-[10px] text-white/40">{formatBytes(draft.file.size)}</p>
                </div>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => removeDraft(index)}
                  aria-label={`Remove ${draft.file.name}`}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/75 text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={`${panelClass} grid gap-4 p-5 sm:grid-cols-2`}>
        <label className="space-y-2 text-xs text-white/55 sm:col-span-2">
          Title
          <input
            className={inputClass}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Defaults to each filename"
            maxLength={160}
          />
        </label>
        <label className="space-y-2 text-xs text-white/55 sm:col-span-2">
          Description
          <textarea
            className={`${inputClass} min-h-24 py-3`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={2000}
          />
        </label>
        <label className="space-y-2 text-xs text-white/55">
          Category
          <select
            className={inputClass}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {MEDIA_CATEGORIES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-xs text-white/55">
          Album
          <select
            className={inputClass}
            value={albumId}
            onChange={(event) => setAlbumId(event.target.value)}
          >
            <option value="">No album</option>
            {albums.map((album) => (
              <option key={album.id} value={album.id}>
                {album.title}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-xs text-white/55">
          Event date
          <input
            className={inputClass}
            type="date"
            value={eventDate}
            onChange={(event) => setEventDate(event.target.value)}
          />
        </label>
        <label className="space-y-2 text-xs text-white/55">
          Tags, separated by commas
          <input
            className={inputClass}
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder="haldi, candid, outdoor"
            maxLength={500}
          />
        </label>
        {!isPhoto && (
          <label className="space-y-2 text-xs text-white/55 sm:col-span-2">
            Optional thumbnail
            <input
              className={`${inputClass} py-2`}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => setThumbnail(event.target.files?.[0] ?? null)}
            />
          </label>
        )}
        <label className="flex items-center gap-2 text-sm text-white/65 sm:col-span-2">
          <input
            type="checkbox"
            checked={publish}
            onChange={(event) => setPublish(event.target.checked)}
            className="accent-amber-200"
          />
          Publish after upload
        </label>
      </div>
      {busy && (
        <div className="space-y-2">
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-amber-200 transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/50">
            <span>Uploading securely… {progress}%</span>
            <button
              type="button"
              onClick={() => controller.current?.abort()}
              className="text-rose-200"
            >
              Cancel upload
            </button>
          </div>
        </div>
      )}
      {error && <Notice tone="error">{error}</Notice>}
      {notice && <Notice>{notice}</Notice>}
      <button className={primaryButton} disabled={busy || !drafts.length}>
        {busy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {busy
          ? "Uploading…"
          : `Upload ${drafts.length || "selected"} ${isPhoto ? "photo(s)" : "video(s)"}`}
      </button>
    </form>
  );
}

function AlbumManager() {
  const [albums, setAlbums] = useState<AlbumRecord[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(MEDIA_CATEGORIES[0]);
  const [eventDate, setEventDate] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [published, setPublished] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const load = async () => {
    const client = getSupabase();
    if (!client) return;
    const { data, error: queryError } = await client
      .from("albums")
      .select("*")
      .order("created_at", { ascending: false });
    if (queryError) setError(queryError.message);
    else setAlbums((data ?? []) as AlbumRecord[]);
  };
  useEffect(() => {
    void load();
  }, []);
  const resetForm = () => {
    setEditing(null);
    setTitle("");
    setDescription("");
    setEventDate("");
    setCover(null);
    setPublished(false);
  };
  const save = async (event: FormEvent) => {
    event.preventDefault();
    const client = getSupabase();
    if (!client || !title.trim()) return setError("Album title is required.");
    setBusy(true);
    setError("");
    setNotice("");
    try {
      let coverPath: string | null = editing
        ? (albums.find((album) => album.id === editing)?.cover_path ?? null)
        : null;
      if (cover) {
        const {
          data: { user },
        } = await client.auth.getUser();
        if (!user) throw new Error("Your session expired. Please log in again.");
        const optimized = await optimizeImage(cover);
        coverPath = `${user.id}/${crypto.randomUUID()}/cover.webp`;
        await uploadResumable(
          optimized.thumbnail,
          coverPath,
          () => undefined,
          new AbortController().signal,
        );
      }
      const values = {
        title: title.trim(),
        description: description.trim(),
        category,
        event_date: eventDate || null,
        cover_path: coverPath,
        is_published: published,
        updated_at: new Date().toISOString(),
      };
      const result = editing
        ? await client.from("albums").update(values).eq("id", editing)
        : await client
            .from("albums")
            .insert({ ...values, created_by: (await client.auth.getUser()).data.user?.id });
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
  const remove = async (album: AlbumRecord) => {
    if (
      !window.confirm(
        `Delete album “${album.title}”? Media in the album will be kept without an album.`,
      )
    )
      return;
    const client = getSupabase();
    if (!client) return;
    const { error: deleteError } = await client.from("albums").delete().eq("id", album.id);
    if (deleteError) setError(deleteError.message);
    else {
      setNotice("Album deleted.");
      await load();
    }
  };
  const startEdit = (album: AlbumRecord) => {
    setEditing(album.id);
    setTitle(album.title);
    setDescription(album.description);
    setCategory(album.category);
    setEventDate(album.event_date ?? "");
    setPublished(album.is_published);
    setCover(null);
  };
  return (
    <>
      <SectionHeading title="Albums" description="Create and organize event collections." />
      <form onSubmit={save} className={`${panelClass} mb-6 grid gap-4 p-5 sm:grid-cols-2`}>
        <label className="space-y-2 text-xs text-white/55">
          Album name
          <input
            className={inputClass}
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={140}
          />
        </label>
        <label className="space-y-2 text-xs text-white/55">
          Category
          <select
            className={inputClass}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {MEDIA_CATEGORIES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-xs text-white/55 sm:col-span-2">
          Description
          <textarea
            className={`${inputClass} min-h-20 py-3`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={2000}
          />
        </label>
        <label className="space-y-2 text-xs text-white/55">
          Event date
          <input
            className={inputClass}
            type="date"
            value={eventDate}
            onChange={(event) => setEventDate(event.target.value)}
          />
        </label>
        <label className="space-y-2 text-xs text-white/55">
          Cover image
          <input
            className={`${inputClass} py-2`}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => setCover(event.target.files?.[0] ?? null)}
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-white/65">
          <input
            type="checkbox"
            checked={published}
            onChange={(event) => setPublished(event.target.checked)}
            className="accent-amber-200"
          />
          Publish album
        </label>
        <div className="flex gap-2 sm:justify-end">
          <button className={primaryButton} disabled={busy}>
            {busy ? "Saving…" : editing ? "Save changes" : "Create album"}
          </button>
          {editing && (
            <button type="button" className={buttonClass} onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
        {error && (
          <div className="sm:col-span-2">
            <Notice tone="error">{error}</Notice>
          </div>
        )}
        {notice && (
          <div className="sm:col-span-2">
            <Notice>{notice}</Notice>
          </div>
        )}
      </form>
      {albums.length ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {albums.map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              onEdit={() => startEdit(album)}
              onDelete={() => void remove(album)}
            />
          ))}
        </div>
      ) : (
        <EmptyState title="No albums yet" detail="Create your first album above." />
      )}
    </>
  );
}

function AlbumCard({
  album,
  onEdit,
  onDelete,
}: {
  album: AlbumRecord;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [coverUrl, setCoverUrl] = useState("");
  useEffect(() => {
    let active = true;
    if (album.cover_path)
      void signedMediaUrl(album.cover_path).then((url) => {
        if (active && url) setCoverUrl(url);
      });
    return () => {
      active = false;
    };
  }, [album.cover_path]);
  return (
    <article className={`${panelClass} overflow-hidden`}>
      <div className="aspect-[16/8] bg-black/25">
        {coverUrl && (
          <img src={coverUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl">{album.title}</h3>
            <p className="mt-1 text-xs text-white/45">
              {album.category}
              {album.event_date ? ` · ${album.event_date}` : ""}
            </p>
          </div>
          <span
            className={`rounded px-2 py-1 text-[10px] uppercase ${album.is_published ? "bg-emerald-300/10 text-emerald-200" : "bg-white/10 text-white/45"}`}
          >
            {album.is_published ? "Published" : "Draft"}
          </span>
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-white/50">
          {album.description || "No description"}
        </p>
        <div className="mt-4 flex gap-2">
          <button className={buttonClass} onClick={onEdit}>
            <Pencil className="h-4 w-4" />
            Edit
          </button>
          <button className={`${buttonClass} text-rose-200`} onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

function MediaLibrary({ featuredOnly = false }: { featuredOnly?: boolean }) {
  const [items, setItems] = useState<MediaRecord[]>([]);
  const [albums, setAlbums] = useState<AlbumRecord[]>([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [publication, setPublication] = useState("all");
  const [category, setCategory] = useState("all");
  const [albumId, setAlbumId] = useState("all");
  const [editing, setEditing] = useState<MediaRecord | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const load = async () => {
    const client = getSupabase();
    if (!client) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const [mediaResult, albumsResult] = await Promise.all([
      client.from("media").select("*, albums(title)").order("created_at", { ascending: false }),
      client
        .from("albums")
        .select(
          "id, title, description, category, event_date, cover_path, is_published, created_at",
        )
        .order("title"),
    ]);
    if (mediaResult.error || albumsResult.error)
      setError((mediaResult.error ?? albumsResult.error)?.message ?? "Could not load media.");
    const rows = (mediaResult.data ?? []) as MediaRecord[];
    setItems(
      await Promise.all(
        rows.map(async (row) => ({
          ...row,
          url: (await signedMediaUrl(row.file_path)) ?? undefined,
          thumbnail_url: (await signedMediaUrl(row.thumbnail_path || row.file_path)) ?? undefined,
        })),
      ),
    );
    setAlbums((albumsResult.data ?? []) as AlbumRecord[]);
    setLoading(false);
  };
  useEffect(() => {
    void load();
  }, []);
  const categories = Array.from(new Set(items.map((item) => item.category)));
  const filtered = items.filter(
    (item) =>
      (!featuredOnly || item.is_featured) &&
      (type === "all" || item.media_type === type) &&
      (publication === "all" || String(item.is_published) === publication) &&
      (category === "all" || item.category === category) &&
      (albumId === "all" || item.album_id === albumId) &&
      `${item.title} ${item.description} ${item.original_filename} ${item.tags.join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  const deleteItem = async (item: MediaRecord) => {
    if (!window.confirm("Are you sure you want to permanently delete this media?")) return;
    const client = getSupabase();
    if (!client) return;
    setError("");
    const { error: recordError } = await client.from("media").delete().eq("id", item.id);
    if (recordError) return setError(recordError.message);
    const paths = [item.file_path, item.thumbnail_path].filter(
      (path): path is string => Boolean(path) && path !== item.file_path,
    );
    if (paths.length) {
      const { error: storageError } = await client.storage
        .from(MEDIA_BUCKET)
        .remove([item.file_path, ...paths]);
      if (storageError)
        setError(`Media record deleted, but storage cleanup failed: ${storageError.message}`);
    } else {
      const { error: storageError } = await client.storage
        .from(MEDIA_BUCKET)
        .remove([item.file_path]);
      if (storageError)
        setError(`Media record deleted, but storage cleanup failed: ${storageError.message}`);
    }
    setItems((current) => current.filter((entry) => entry.id !== item.id));
    setNotice("Media deleted.");
  };
  const updateFlags = async (
    item: MediaRecord,
    values: Partial<Pick<MediaRecord, "is_published" | "is_featured">>,
  ) => {
    const client = getSupabase();
    if (!client) return;
    const { error: updateError } = await client
      .from("media")
      .update({ ...values, updated_at: new Date().toISOString() })
      .eq("id", item.id);
    if (updateError) setError(updateError.message);
    else {
      setItems((current) =>
        current.map((entry) => (entry.id === item.id ? { ...entry, ...values } : entry)),
      );
      setNotice("Media updated.");
    }
  };
  const saveEdit = async (event: FormEvent<HTMLFormElement>) => {
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
      tags: String(formData.get("tags") ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
        .slice(0, 20),
      event_date: String(formData.get("event_date") ?? "") || null,
      is_published: formData.get("is_published") === "on",
      is_featured: formData.get("is_featured") === "on",
      updated_at: new Date().toISOString(),
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
  return (
    <>
      <SectionHeading
        title={featuredOnly ? "Featured media" : "Media library"}
        description="Search, filter, publish, feature, edit, or remove your uploads."
      />
      <div className={`${panelClass} mb-5 grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-5`}>
        <label className="relative md:col-span-2 xl:col-span-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-white/35" />
          <input
            className={`${inputClass} pl-9`}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search media"
          />
        </label>
        <select
          className={inputClass}
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <option value="all">All types</option>
          <option value="photo">Photos</option>
          <option value="video">Videos</option>
        </select>
        <select
          className={inputClass}
          value={publication}
          onChange={(event) => setPublication(event.target.value)}
        >
          <option value="all">All publication states</option>
          <option value="true">Published</option>
          <option value="false">Unpublished</option>
        </select>
        <select
          className={inputClass}
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="all">All categories</option>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select
          className={inputClass}
          value={albumId}
          onChange={(event) => setAlbumId(event.target.value)}
        >
          <option value="all">All albums</option>
          {albums.map((album) => (
            <option key={album.id} value={album.id}>
              {album.title}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <div className="mb-4">
          <Notice tone="error">{error}</Notice>
        </div>
      )}
      {notice && (
        <div className="mb-4">
          <Notice>{notice}</Notice>
        </div>
      )}
      {loading ? (
        <LoadingPanel label="Loading media library" />
      ) : filtered.length ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <article key={item.id} className={`${panelClass} overflow-hidden`}>
              <div className="relative aspect-[4/3] bg-black/30">
                {item.media_type === "video" && item.url ? (
                  <video
                    src={item.url}
                    poster={item.thumbnail_url}
                    controls
                    preload="none"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  item.thumbnail_url && (
                    <img
                      src={item.thumbnail_url}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  )
                )}
                <span className="absolute left-3 top-3 rounded bg-black/70 px-2 py-1 text-[10px] uppercase">
                  {item.media_type}
                </span>
                <span
                  className={`absolute right-3 top-3 rounded px-2 py-1 text-[10px] ${item.is_published ? "bg-emerald-950 text-emerald-100" : "bg-black/75 text-white/60"}`}
                >
                  {item.is_published ? "Published" : "Unpublished"}
                </span>
              </div>
              <div className="space-y-3 p-4">
                <div>
                  <h3 className="truncate font-display text-xl">{item.title}</h3>
                  <p className="mt-1 truncate text-xs text-white/45">{item.original_filename}</p>
                </div>
                <p className="text-xs text-white/50">
                  {item.category}
                  {item.albums?.title ? ` · ${item.albums.title}` : " · No album"} ·{" "}
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button className={buttonClass} onClick={() => setEditing(item)}>
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    className={buttonClass}
                    onClick={() => void updateFlags(item, { is_published: !item.is_published })}
                  >
                    {item.is_published ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    className={`${buttonClass} ${item.is_featured ? "text-amber-200" : ""}`}
                    onClick={() => void updateFlags(item, { is_featured: !item.is_featured })}
                  >
                    <Star className="h-4 w-4" fill={item.is_featured ? "currentColor" : "none"} />
                    {item.is_featured ? "Featured" : "Feature"}
                  </button>
                  <button
                    aria-label={`Delete ${item.title}`}
                    className={`${buttonClass} text-rose-200`}
                    onClick={() => void deleteItem(item)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          title={featuredOnly ? "No featured media" : "No media matches"}
          detail={
            featuredOnly
              ? "Mark an upload as featured in the media library."
              : "Try another search or upload your first media item."
          }
        />
      )}
      {editing && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/80 p-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setEditing(null);
          }}
        >
          <form
            onSubmit={saveEdit}
            className={`${panelClass} my-auto w-full max-w-xl space-y-4 p-5`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl">Edit media</h2>
              <button
                type="button"
                aria-label="Close editor"
                onClick={() => setEditing(null)}
                className="text-white/50"
              >
                <X />
              </button>
            </div>
            <label className="block space-y-2 text-xs text-white/55">
              Title
              <input
                className={inputClass}
                name="title"
                defaultValue={editing.title}
                required
                maxLength={160}
              />
            </label>
            <label className="block space-y-2 text-xs text-white/55">
              Description
              <textarea
                className={`${inputClass} min-h-20 py-3`}
                name="description"
                defaultValue={editing.description}
                maxLength={2000}
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-2 text-xs text-white/55">
                Category
                <select className={inputClass} name="category" defaultValue={editing.category}>
                  {MEDIA_CATEGORIES.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className="space-y-2 text-xs text-white/55">
                Album
                <select
                  className={inputClass}
                  name="album_id"
                  defaultValue={editing.album_id ?? ""}
                >
                  <option value="">No album</option>
                  {albums.map((album) => (
                    <option key={album.id} value={album.id}>
                      {album.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="block space-y-2 text-xs text-white/55">
              Tags, separated by commas
              <input className={inputClass} name="tags" defaultValue={editing.tags.join(", ")} />
            </label>
            <label className="block space-y-2 text-xs text-white/55">
              Event date
              <input
                className={inputClass}
                name="event_date"
                type="date"
                defaultValue={editing.event_date ?? ""}
              />
            </label>
            <div className="flex flex-wrap gap-5">
              <label className="flex items-center gap-2 text-sm text-white/65">
                <input
                  type="checkbox"
                  name="is_published"
                  defaultChecked={editing.is_published}
                  className="accent-amber-200"
                />
                Published
              </label>
              <label className="flex items-center gap-2 text-sm text-white/65">
                <input
                  type="checkbox"
                  name="is_featured"
                  defaultChecked={editing.is_featured}
                  className="accent-amber-200"
                />
                Featured
              </label>
            </div>
            <button className={primaryButton}>
              <Check className="h-4 w-4" />
              Save media
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function EnquiriesPage() {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState("");
  const load = async () => {
    const client = getSupabase();
    if (!client) return;
    const { data, error: queryError } = await client
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (queryError) setError(queryError.message);
    else setRows((data ?? []) as Record<string, unknown>[]);
  };
  useEffect(() => {
    void load();
  }, []);
  const setStatus = async (id: string, status: string) => {
    const client = getSupabase();
    if (!client) return;
    const { error: updateError } = await client.from("enquiries").update({ status }).eq("id", id);
    if (updateError) setError(updateError.message);
    else await load();
  };
  return (
    <>
      <SectionHeading
        title="Messages & enquiries"
        description="Booking enquiries submitted through the site."
      />
      {error && <Notice tone="error">{error}</Notice>}
      {rows.length ? (
        <div className="space-y-3">
          {rows.map((row) => (
            <article
              key={String(row.id)}
              className={`${panelClass} grid gap-4 p-4 md:grid-cols-[1fr_auto]`}
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-xl">{String(row.name)}</h3>
                  <span className="text-xs text-white/40">
                    {new Date(String(row.created_at)).toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-sm text-white/65">
                  {String(row.phone)} · {String(row.email || "No email")}
                </p>
                <p className="mt-2 text-sm text-white/50">
                  {String(row.event_type || "Event")}
                  {row.event_date ? ` · ${String(row.event_date)}` : ""}
                  {row.location ? ` · ${String(row.location)}` : ""}
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm">{String(row.message || "")}</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  className={buttonClass}
                  href={`https://wa.me/${String(row.phone).replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
                <select
                  aria-label="Enquiry status"
                  className={`${inputClass} w-32`}
                  value={String(row.status)}
                  onChange={(event) => void setStatus(String(row.id), event.target.value)}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No enquiries yet"
          detail="Website booking enquiries will be collected here."
        />
      )}
    </>
  );
}

function WebsiteSettingsPage() {
  const [settings, setSettings] = useState(DEFAULT_SITE_SETTINGS);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const client = getSupabase();
    if (!client) return;
    void client
      .from("site_settings")
      .select("phone, email, address, hours")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data, error: queryError }) => {
        if (queryError) setError(queryError.message);
        else if (data) setSettings({ ...DEFAULT_SITE_SETTINGS, ...data });
      });
  }, []);
  const save = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setNotice("");
    const client = getSupabase();
    if (!client) return setError("Supabase is not configured.");
    if (
      !settings.phone.trim() ||
      !settings.email.trim() ||
      !settings.address.trim() ||
      !settings.hours.trim()
    )
      return setError("Please complete all contact fields.");
    setBusy(true);
    const { error: saveError } = await client
      .from("site_settings")
      .update({
        phone: settings.phone.trim(),
        email: settings.email.trim(),
        address: settings.address.trim(),
        hours: settings.hours.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);
    setBusy(false);
    if (saveError) setError(saveError.message);
    else setNotice("Website contact settings saved. The public site will update automatically.");
  };
  return (
    <>
      <SectionHeading
        title="Website settings"
        description="Update contact information shown across the public studio website."
      />
      {error && <Notice tone="error">{error}</Notice>}
      {notice && (
        <div className="mt-3">
          <Notice>{notice}</Notice>
        </div>
      )}
      <form onSubmit={save} className={`${panelClass} mt-5 grid gap-4 p-5 sm:grid-cols-2`}>
        <label className="space-y-2 text-xs text-white/55">
          Phone number
          <input
            className={inputClass}
            type="tel"
            value={settings.phone}
            onChange={(event) =>
              setSettings((current) => ({ ...current, phone: event.target.value }))
            }
            required
            maxLength={40}
          />
        </label>
        <label className="space-y-2 text-xs text-white/55">
          Email address
          <input
            className={inputClass}
            type="email"
            value={settings.email}
            onChange={(event) =>
              setSettings((current) => ({ ...current, email: event.target.value }))
            }
            required
            maxLength={254}
          />
        </label>
        <label className="space-y-2 text-xs text-white/55 sm:col-span-2">
          Studio address
          <input
            className={inputClass}
            value={settings.address}
            onChange={(event) =>
              setSettings((current) => ({ ...current, address: event.target.value }))
            }
            required
            maxLength={300}
          />
        </label>
        <label className="space-y-2 text-xs text-white/55 sm:col-span-2">
          Business hours
          <input
            className={inputClass}
            value={settings.hours}
            onChange={(event) =>
              setSettings((current) => ({ ...current, hours: event.target.value }))
            }
            required
            maxLength={120}
          />
        </label>
        <div className="sm:col-span-2">
          <button className={primaryButton} disabled={busy}>
            {busy && <LoaderCircle className="h-4 w-4 animate-spin" />}
            {busy ? "Saving…" : "Save website settings"}
          </button>
        </div>
      </form>
    </>
  );
}

function SettingsPage() {
  const [displayName, setDisplayName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    const client = getSupabase();
    if (!client) return;
    void client.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      setEmail(data.user.email ?? "");
      const { data: profile } = await client
        .from("admin_users")
        .select("display_name")
        .eq("id", data.user.id)
        .maybeSingle();
      setDisplayName(profile?.display_name ?? "");
    });
  }, []);
  const saveProfile = async (event: FormEvent) => {
    event.preventDefault();
    const client = getSupabase();
    if (!client) return;
    const {
      data: { user },
    } = await client.auth.getUser();
    if (!user) return;
    const { error: updateError } = await client
      .from("admin_users")
      .update({ display_name: displayName.trim() })
      .eq("id", user.id);
    if (updateError) setError(updateError.message);
    else setNotice("Profile updated.");
  };
  const changePassword = async (event: FormEvent) => {
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
  return (
    <>
      <SectionHeading
        title="Profile"
        description="Manage the studio owner profile and sign-in security."
      />
      {error && <Notice tone="error">{error}</Notice>}
      {notice && (
        <div className="mt-3">
          <Notice>{notice}</Notice>
        </div>
      )}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <form onSubmit={saveProfile} className={`${panelClass} space-y-4 p-5`}>
          <h2 className="font-display text-2xl">Profile</h2>
          <label className="block space-y-2 text-xs text-white/55">
            Account email
            <input className={inputClass} value={email} readOnly />
          </label>
          <label className="block space-y-2 text-xs text-white/55">
            Display name
            <input
              className={inputClass}
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              maxLength={100}
            />
          </label>
          <button className={primaryButton}>Save profile</button>
        </form>
        <form onSubmit={changePassword} className={`${panelClass} space-y-4 p-5`}>
          <h2 className="font-display text-2xl">Change password</h2>
          <p className="text-sm text-white/50">
            Use at least 10 characters. Your session remains protected by Supabase Auth.
          </p>
          <label className="block space-y-2 text-xs text-white/55">
            New password
            <input
              className={inputClass}
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              minLength={10}
              required
            />
          </label>
          <button className={buttonClass}>Update password</button>
        </form>
      </div>
    </>
  );
}

export function AdminDashboardRoute() {
  return <AdminDashboard />;
}

export function AdminSectionRoute({ section }: { section: string }) {
  if (section === "photos") return <MediaUploader kind="photo" />;
  if (section === "videos") return <MediaUploader kind="video" />;
  if (section === "albums") return <AlbumManager />;
  if (section === "media") return <MediaLibrary />;
  if (section === "featured") return <MediaLibrary featuredOnly />;
  if (section === "messages") return <EnquiriesPage />;
  if (section === "settings") return <WebsiteSettingsPage />;
  if (section === "profile") return <SettingsPage />;
  return <EmptyState title="Admin section not found" detail="Choose a section from the sidebar." />;
}

export { AdminLoginPage, PasswordResetPage };

function formatBytes(value: number) {
  if (!value) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const power = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1);
  return `${(value / 1024 ** power).toFixed(power ? 1 : 0)} ${units[power]}`;
}
