import { useEffect, useState } from "react";
import Cover from "./components/Cover";
import Nav from "./components/Nav";
import { Petals } from "./components/Decor";
import Hero from "./components/sections/Hero";
import Couple from "./components/sections/Couple";
import Events from "./components/sections/Events";
import Story from "./components/sections/Story";
import Gallery from "./components/sections/Gallery";
import Gift from "./components/sections/Gift";
import Wishes from "./components/sections/Wishes";
import Closing from "./components/sections/Closing";
import GuestManager from "./components/GuestManager";
import AdminLogin from "./components/admin/AdminLogin";
import AdminPanel from "./components/admin/AdminPanel";
import SuperAdminPanel from "./components/admin/SuperAdminPanel";
import { onAuthStateChange, getAdminProfile, type AdminProfile } from "./lib/auth";
import { SUPABASE_ENABLED } from "./lib/supabase";
import { WeddingProvider } from "./lib/WeddingContext";
import { parseInvitationSlug, getUserIdFromSlug } from "./lib/slug";

type Stage = "closed" | "opening" | "open";

export default function App() {
  const [stage, setStage] = useState<Stage>("closed");
  const [route, setRoute] = useState(() => window.location.hash);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);

  // Rute berbasis hash
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Subscribe auth state
  useEffect(() => {
    const unsub = onAuthStateChange(async (u) => {
      setUser(u);
      if (u) {
        const p = await getAdminProfile(u.id);
        setProfile(p);
        setUserName(u.name || u.username);
        
        // Ensure slug exists for this user
        // Import will be added below
      } else {
        setProfile(null);
        setUserName(null);
      }
      setAuthLoading(false);
    });
    return () => {
      if (typeof unsub === "function") unsub();
    };
  }, []);

  // Parse slug dari URL untuk undangan personal
  const invitationSlug = parseInvitationSlug(route);
  const slugUserId = invitationSlug ? getUserIdFromSlug(invitationSlug) : null;

  // Tentukan userId untuk undangan publik:
  // 1. Jika ada slug di URL → gunakan userId dari slug mapping
  // 2. Jika tidak ada slug tapi user login → gunakan userId user
  // 3. Jika tidak ada keduanya → null (data default)
  const publicUserId = slugUserId || user?.id || null;

  // Redirect ke admin setelah login jika diperlukan
  useEffect(() => {
    if (user && sessionStorage.getItem("redirect-to-admin") === "true") {
      sessionStorage.removeItem("redirect-to-admin");
      window.location.hash = "#/admin";
    }
  }, [user]);

  const isAdminRoute = route.startsWith("#/admin");
  const isSuperRoute = route.startsWith("#/admin/super");
  const isGuestRoute = route.startsWith("#/tamu");

  useEffect(() => {
    document.body.style.overflow = stage === "open" || isAdminRoute || isGuestRoute ? "" : "hidden";
  }, [stage, isAdminRoute, isGuestRoute]);

  useEffect(() => {
    if (!isAdminRoute && !isGuestRoute) {
      document.title = "Undangan Pernikahan Raka & Sekar";
    }
  }, [isAdminRoute, isGuestRoute]);

  const open = () => {
    if (stage !== "closed") return;
    setStage("opening");
    window.setTimeout(() => setStage("open"), 1250);
  };

  // Route: Tamu manager
  if (isGuestRoute) return <GuestManager />;

  // Route: Admin
  if (isAdminRoute) {
    if (authLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-pine-950">
          <div className="size-12 animate-spin rounded-full border-2 border-gold-400 border-t-transparent" />
        </div>
      );
    }

    if (!user) {
      return <AdminLogin onLogin={() => {}} />;
    }

    if (!profile) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-pine-950 px-5 text-center">
          <p className="font-display text-2xl italic text-ivory">Akses Ditolak</p>
          <p className="mt-3 text-sm text-sage-300/80">
            Anda tidak terdaftar sebagai admin.
          </p>
          <button
            onClick={() => {
              window.location.hash = "#/";
              window.location.reload();
            }}
            className="mt-6 border border-gold-500/40 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-gold-300 transition-all hover:bg-gold-500 hover:text-pine-950"
          >
            Kembali
          </button>
        </div>
      );
    }

    if (isSuperRoute && profile.role !== "super_admin") {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-pine-950 px-5 text-center">
          <p className="font-display text-2xl italic text-ivory">Akses Ditolak</p>
          <p className="mt-3 text-sm text-sage-300/80">
            Hanya super admin yang boleh mengakses halaman ini.
          </p>
          <a
            href="#/admin"
            className="mt-6 border border-gold-500/40 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-gold-300 transition-all hover:bg-gold-500 hover:text-pine-950"
          >
            Panel Admin
          </a>
        </div>
      );
    }

    if (isSuperRoute) {
      return (
        <WeddingProvider userId={user?.id}>
          <SuperAdminPanel profile={profile} userName={userName} />
        </WeddingProvider>
      );
    }

    return (
      <WeddingProvider userId={user?.id}>
        <AdminPanel profile={profile} userName={userName} />
      </WeddingProvider>
    );
  }

  // Route: Undangan publik
  return (
    <WeddingProvider key={publicUserId || "default"} userId={publicUserId}>
      <div className="relative min-h-screen overflow-x-clip bg-pine-950 font-sans text-ivory">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background:
              "radial-gradient(55% 40% at 85% -5%, rgba(200,169,97,0.09), transparent 65%), radial-gradient(60% 45% at -10% 35%, rgba(32,71,52,0.5), transparent 60%), radial-gradient(70% 50% at 110% 80%, rgba(24,56,41,0.55), transparent 65%)",
          }}
        />

        <Petals />

        {stage !== "open" && <Cover opening={stage === "opening"} onOpen={open} />}

        <main
          className={`relative z-10 transition-opacity duration-1000 ${
            stage === "open" ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={stage !== "open"}
        >
          <Hero open={stage === "open"} />
          <Couple />
          <Events />
          <Story />
          <Gallery />
          <Gift />
          <Wishes />
          <Closing />
        </main>

        {stage === "open" && <Nav />}
      </div>
    </WeddingProvider>
  );
}
