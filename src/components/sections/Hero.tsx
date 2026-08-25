import { useEffect, useState } from "react";
import { IMG, WEDDING } from "../../lib/wedding";
import { useReveal } from "../../hooks/useReveal";
import { IconCalendar, IconPin } from "../Icons";
import { DividerOrnament, Marquee, Monogram } from "../Decor";

/* ---------- hitung mundur ---------- */
const TARGET = new Date(WEDDING.dateISO).getTime();

function diff() {
  const d = Math.max(0, TARGET - Date.now());
  return {
    hari: Math.floor(d / 86_400_000),
    jam: Math.floor(d / 3_600_000) % 24,
    menit: Math.floor(d / 60_000) % 60,
    detik: Math.floor(d / 1_000) % 60,
  };
}

function Cell({ v, label }: { v: number; label: string }) {
  return (
    <div className="flex w-[68px] flex-col items-center border border-gold-500/25 bg-pine-900/70 py-3 backdrop-blur-sm sm:w-20">
      <span key={v} className="tick font-display text-3xl text-gold-200 tabular-nums sm:text-4xl">
        {String(v).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[9px] uppercase tracking-[0.28em] text-sage-300/80 sm:text-[10px]">
        {label}
      </span>
    </div>
  );
}

function Countdown() {
  const [t, setT] = useState(diff);
  useEffect(() => {
    const id = window.setInterval(() => setT(diff()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-gold-400">
        Menghitung Hari
      </p>
      <div className="mt-3 flex gap-2 sm:gap-3">
        <Cell v={t.hari} label="Hari" />
        <Cell v={t.jam} label="Jam" />
        <Cell v={t.menit} label="Menit" />
        <Cell v={t.detik} label="Detik" />
      </div>
    </div>
  );
}

/* ---------- pembuka: hero + marquee + ayat ---------- */
export default function Hero({ open }: { open: boolean }) {
  const quoteRef = useReveal();

  return (
    <>
      {/* ===== HERO ===== */}
      <section
        id="beranda"
        className={`relative z-10 flex min-h-[100svh] flex-col overflow-hidden ${open ? "is-open" : ""}`}
      >
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={IMG.hero}
            alt=""
            className="anim-kenburns h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-pine-950/80 via-pine-950/25 to-pine-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-pine-950/60 via-transparent to-pine-950/30" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pt-6 sm:px-8">
          {/* bar atas */}
          <div className="flex items-center justify-between">
            <Monogram className="size-12 text-gold-300 sm:size-14" />
            <span className="font-display text-sm italic tracking-[0.3em] text-gold-300/90 sm:text-base">
              {WEDDING.dateShort}
            </span>
          </div>

          <div className="flex-1" />

          {/* konten bawah */}
          <div className="grid items-end gap-10 pb-28 md:pb-24 lg:grid-cols-[1.35fr_1fr]">
            <div>
              <p className="mask-line ml-d1 text-[11px] font-semibold uppercase tracking-[0.42em] text-gold-300">
                <span>Kami Menikah — Assalamu&rsquo;alaikum Wr. Wb.</span>
              </p>
              <h1 className="mt-4 font-display font-light italic leading-[0.95] text-ivory">
                <span className="mask-line ml-d1 text-[21vw] sm:text-8xl lg:text-[7rem]">
                  <span>{WEDDING.groom.short}</span>
                </span>
                <span className="mask-line ml-d2 text-[21vw] sm:text-8xl lg:text-[7rem]">
                  <span className="flex items-baseline gap-3 sm:gap-5">
                    <span className="text-[0.52em] text-gold-400">&</span>
                    <span>{WEDDING.bride.short}</span>
                  </span>
                </span>
              </h1>
              <div className="mask-line ml-3 mt-6">
                <span className="flex flex-wrap gap-3">
                  <span className="flex items-center gap-2.5 border border-gold-500/30 bg-pine-900/60 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-gold-200 backdrop-blur-sm">
                    <IconCalendar className="size-4 text-gold-400" />
                    {WEDDING.dateLabel.toUpperCase()}
                  </span>
                  <span className="flex items-center gap-2.5 border border-gold-500/30 bg-pine-900/60 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-gold-200 backdrop-blur-sm">
                    <IconPin className="size-4 text-gold-400" />
                    {WEDDING.venueMain.toUpperCase()} · {WEDDING.city.toUpperCase()}
                  </span>
                </span>
              </div>
            </div>
            <div className="mask-line">
              <span>
                <Countdown />
              </span>
            </div>
          </div>
        </div>

        {/* penanda gulir */}
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5">
          <span className="text-[10px] uppercase tracking-[0.4em] text-sage-300/80">Gulir</span>
          <span className="anim-cue block h-9 w-px bg-gold-400/80" />
        </div>
      </section>

      <Marquee />

      {/* ===== AYAT ===== */}
      <section className="relative z-10 overflow-hidden py-24 sm:py-28">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[26rem] italic leading-none text-gold-500/[0.045]"
        >
          &
        </span>
        <div ref={quoteRef} className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <DividerOrnament className="reveal" />
          <p
            dir="rtl"
            className="reveal rd-1 mt-9 text-2xl leading-[2.2] text-gold-200/95 sm:text-[1.7rem]"
            style={{ fontFamily: "'Fraunces', 'Amiri', serif" }}
          >
            {WEDDING.quote.arabic}
          </p>
          <blockquote className="reveal rd-2 mt-8 font-display text-lg font-light italic leading-relaxed text-sage-300/95 sm:text-xl">
            &ldquo;{WEDDING.quote.text}&rdquo;
          </blockquote>
          <p className="reveal rd-3 mt-7 text-[11px] font-bold uppercase tracking-[0.42em] text-gold-400">
            {WEDDING.quote.source}
          </p>
        </div>
      </section>
    </>
  );
}
