import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { IMAGES, WEDDING } from "../data";
import { useGuestName } from "../hooks";
import { CornerFlourish, EnvelopeIcon, FlourishDivider, NoteIcon } from "./Ornaments";

/* ================================ COVER ================================ */

export function Cover({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  const guest = useGuestName();
  return (
    <div
      className={`fixed inset-0 z-[60] overflow-hidden transition-all duration-[1100ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
        open ? "pointer-events-none -translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
      aria-hidden={open}
    >
      <img
        src={IMAGES.couple}
        alt=""
        className="absolute inset-0 h-full w-full animate-kenburns object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-pine-950/90 via-pine-950/78 to-pine-950/95" />

      <CornerFlourish className="absolute left-4 top-4 h-24 w-24 text-gold-500/70 sm:h-32 sm:w-32" />
      <CornerFlourish className="absolute right-4 top-4 h-24 w-24 rotate-90 text-gold-500/70 sm:h-32 sm:w-32" />
      <CornerFlourish className="absolute bottom-4 right-4 h-24 w-24 rotate-180 text-gold-500/70 sm:h-32 sm:w-32" />
      <CornerFlourish className="absolute bottom-4 left-4 h-24 w-24 -rotate-90 text-gold-500/70 sm:h-32 sm:w-32" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="animate-rise text-[11px] font-medium uppercase tracking-[0.55em] text-gold-300 [animation-delay:200ms]">
          The Wedding Of
        </p>
        <h1
          className="font-script animate-rise mt-5 text-7xl leading-[0.95] text-paper-50 drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] sm:text-8xl [animation-delay:420ms]"
        >
          Raka <span className="text-gold-300">&</span> Laras
        </h1>
        <FlourishDivider className="animate-rise mx-auto mt-6 h-9 w-64 text-gold-400 [animation-delay:620ms]" />
        <p className="animate-rise mt-4 text-sm font-light uppercase tracking-[0.3em] text-paper-100/90 [animation-delay:760ms]">
          {WEDDING.dateLong}
        </p>

        <div className="animate-rise mt-12 max-w-md [animation-delay:940ms]">
          <p className="text-[13px] font-light text-paper-100/80">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <p className="font-display mt-2 text-3xl font-semibold text-gold-200">{guest}</p>
          <p className="mt-3 text-xs font-light leading-relaxed text-paper-100/60">
            Mohon maaf apabila terdapat kesalahan penulisan nama maupun gelar.
          </p>
        </div>

        <button
          onClick={onOpen}
          className="animate-rise group mt-9 inline-flex items-center gap-3 border border-gold-500 bg-gold-500 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.3em] text-pine-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-[0_12px_40px_-8px_rgba(201,162,75,0.55)] active:scale-95 [animation-delay:1120ms]"
        >
          <EnvelopeIcon className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          Buka Undangan
        </button>
      </div>
    </div>
  );
}

/* ================================ PETALS ================================ */

export function Petals({ count = 14 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r = () => Math.random();
        const colors = ["#c9a24b", "#e8d395", "#3b7d66", "#d9b968"];
        return {
          id: i,
          left: `${Math.round(r() * 100)}%`,
          dur: `${(13 + r() * 11).toFixed(1)}s`,
          delay: `${(-r() * 22).toFixed(1)}s`,
          sway: `${Math.round(20 + r() * 55)}px`,
          po: (0.2 + r() * 0.45).toFixed(2),
          size: Math.round(9 + r() * 9),
          color: colors[Math.floor(r() * colors.length)],
        };
      }),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[15] overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={
            {
              left: p.left,
              "--dur": p.dur,
              "--delay": p.delay,
              "--sway": p.sway,
              "--po": p.po,
              animationDuration: p.dur,
              animationDelay: p.delay,
            } as CSSProperties
          }
        >
          <svg width={p.size} height={p.size} viewBox="0 0 20 20" fill="none">
            <path
              d="M10 1C14 5 16 9 10 19C4 9 6 5 10 1Z"
              fill={p.color}
              opacity="0.85"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}

/* ============================= MUSIC BUTTON ============================= */

export function MusicButton({
  visible,
  playing,
  onToggle,
}: {
  visible: boolean;
  playing: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={playing ? "Matikan musik" : "Putar musik"}
      className={`fixed bottom-5 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 sm:right-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-20 opacity-0"
      } ${
        playing
          ? "border-gold-500 bg-gold-500 text-pine-950 shadow-[0_8px_30px_-6px_rgba(201,162,75,0.6)]"
          : "border-gold-500/50 bg-pine-900/85 text-gold-300 backdrop-blur hover:border-gold-400 hover:text-gold-200"
      }`}
    >
      <NoteIcon className={`h-5 w-5 ${playing ? "animate-spin-slower" : ""}`} />
      {playing && (
        <span className="absolute -top-1 -right-1 flex items-end gap-[2px]">
          <span className="h-2 w-[3px] animate-pulse-dot rounded-full bg-gold-300" />
          <span className="h-3 w-[3px] animate-pulse-dot rounded-full bg-gold-300 [animation-delay:300ms]" />
          <span className="h-1.5 w-[3px] animate-pulse-dot rounded-full bg-gold-300 [animation-delay:600ms]" />
        </span>
      )}
    </button>
  );
}

/* ================================ NAVBAR ================================ */

const NAV_ITEMS = [
  { id: "beranda", label: "Beranda", icon: "M4 11.5 12 4l8 7.5M6 10v10h12V10" },
  { id: "mempelai", label: "Mempelai", icon: "circle" },
  { id: "acara", label: "Acara", icon: "M5 6.5h14v13H5zM5 10h14M9 4v4M15 4v4" },
  { id: "galeri", label: "Galeri", icon: "M4 6h16v13H4zM4 16l4.5-4.5 3.5 3.5 3-3 5 4M9.5 10.8a1.3 1.3 0 1 0 0-2.6" },
  { id: "ucapan", label: "Ucapan", icon: "M4 5h16v12H9l-5 4V5z" },
];

export function NavBar({ visible }: { visible: boolean }) {
  const [active, setActive] = useState("beranda");

  useEffect(() => {
    if (!visible) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = window.innerHeight * 0.4;
        let current = "beranda";
        for (const item of NAV_ITEMS) {
          const el = document.getElementById(item.id);
          if (el && el.getBoundingClientRect().top <= mid) current = item.id;
        }
        setActive(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  return (
    <nav
      className={`fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
      aria-label="Navigasi undangan"
    >
      <div className="flex items-center gap-1 rounded-full border border-gold-500/25 bg-pine-950/88 px-2 py-2 shadow-[0_16px_50px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`group flex flex-col items-center gap-0.5 rounded-full px-2.5 py-1 transition-all duration-300 sm:px-3.5 ${
                isActive ? "bg-gold-500/15 text-gold-300" : "text-paper-100/60 hover:text-gold-200"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                {item.icon === "circle" ? (
                  <>
                    <circle cx="9.5" cy="13.5" r="5" />
                    <circle cx="14.5" cy="13.5" r="5" />
                    <path d="M12 5.5 10.4 3.4h3.2L12 5.5Z" />
                  </>
                ) : (
                  <path d={item.icon} />
                )}
              </svg>
              <span className="text-[9px] font-medium uppercase tracking-wider">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
