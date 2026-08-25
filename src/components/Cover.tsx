import { getGuestName, WEDDING } from "../lib/wedding";
import { IconEnvelope } from "./Icons";
import { CornerFlourish, Monogram } from "./Decor";

/** Pecah "Bapak H. Ahmad beserta keluarga" → nama utama + keterangan. */
function splitGuest(name: string): { main: string; suffix: string } {
  const m = name.match(/\s+(beserta|serta|sekeluarga|dan|&)\b/i);
  if (!m || m.index === undefined || m.index === 0) return { main: name, suffix: "" };
  return { main: name.slice(0, m.index).trim(), suffix: name.slice(m.index).trim() };
}

/** Ukuran huruf menyesuaikan panjang nama agar tidak terpotong. */
function sizeFor(len: number): string {
  if (len <= 14) return "text-2xl sm:text-3xl";
  if (len <= 24) return "text-xl sm:text-2xl";
  if (len <= 38) return "text-lg sm:text-xl";
  return "text-base sm:text-lg";
}

export default function Cover({
  opening,
  onOpen,
}: {
  opening: boolean;
  onOpen: () => void;
}) {
  const guest = getGuestName();
  const parts = splitGuest(guest);

  return (
    <div
      className={`fixed inset-0 z-[90] overflow-hidden bg-pine-950 transition-transform duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        opening ? "-translate-y-full" : ""
      }`}
      role="dialog"
      aria-label="Sampul undangan pernikahan"
    >
      {/* cahaya ambient */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 0%, rgba(200,169,97,0.14), transparent 70%), radial-gradient(70% 55% at 50% 108%, rgba(32,71,52,0.55), transparent 70%)",
        }}
      />

      {/* bingkai garis emas */}
      <div
        className={`pointer-events-none absolute inset-3 border border-gold-500/30 transition-all duration-1000 sm:inset-5 ${
          opening ? "scale-110 opacity-0" : ""
        }`}
      >
        <CornerFlourish className="absolute left-2 top-2 size-14 text-gold-500/70 sm:size-20" />
        <CornerFlourish className="absolute right-2 top-2 size-14 rotate-90 text-gold-500/70 sm:size-20" />
        <CornerFlourish className="absolute bottom-2 right-2 size-14 rotate-180 text-gold-500/70 sm:size-20" />
        <CornerFlourish className="absolute bottom-2 left-2 size-14 -rotate-90 text-gold-500/70 sm:size-20" />
      </div>

      {/* isi sampul */}
      <div
        className={`relative flex h-full flex-col items-center justify-center px-6 text-center transition-all duration-700 ${
          opening ? "opacity-0 scale-110" : "opacity-100"
        }`}
      >
        <Monogram className="size-16 text-gold-400 sm:size-20" />

        <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.5em] text-sage-300">
          Undangan Pernikahan
        </p>

        <h1 className="mt-4 font-display font-light leading-none text-ivory">
          <span className="block text-6xl italic sm:text-7xl md:text-8xl">
            {WEDDING.groom.short}
          </span>
          <span className="my-1 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold-500/60" aria-hidden="true" />
            <span className="font-display text-3xl italic text-gold-400">&</span>
            <span className="h-px w-10 bg-gold-500/60" aria-hidden="true" />
          </span>
          <span className="block text-6xl italic sm:text-7xl md:text-8xl">
            {WEDDING.bride.short}
          </span>
        </h1>

        <p className="mt-5 text-xs font-medium uppercase tracking-[0.42em] text-gold-300/90">
          {WEDDING.dateLabel}
        </p>

        {/* nama tamu */}
        <div className="mt-8 w-full max-w-xs border border-gold-500/25 bg-pine-900/70 px-5 py-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-sage-300/80">
            Kepada Yth. Bapak/Ibu/Saudara/i
          </p>
          <p
            className={`mt-2 break-words font-display italic leading-snug text-gold-200 ${sizeFor(guest.length)}`}
            title={guest}
          >
            {parts.main}
          </p>
          {parts.suffix && (
            <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-gold-400/85">
              {parts.suffix}
            </p>
          )}
          <p className="mt-1.5 text-[11px] leading-relaxed text-sage-300/70">
            Mohon maaf apabila terdapat kesalahan penulisan nama & gelar.
          </p>
        </div>

        {/* badge melingkar berputar + tombol buka */}
        <div className="relative mt-9 flex items-center justify-center">
          <svg viewBox="0 0 160 160" className="anim-spin-slow absolute size-40 text-gold-500/80 sm:size-44">
            <defs>
              <path id="coverCircle" d="M80,80 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0" fill="none" />
            </defs>
            <text fontSize="10.5" letterSpacing="2.6" fill="currentColor" fontWeight="600">
              <textPath href="#coverCircle">
                {`${WEDDING.groom.short} ♥ ${WEDDING.bride.short} · ${WEDDING.dateLabel.toUpperCase()} · ${WEDDING.city.toUpperCase()} ·`}
              </textPath>
            </text>
          </svg>
          <button
            onClick={onOpen}
            className="anim-float group relative z-10 flex size-24 flex-col items-center justify-center gap-1.5 rounded-full border border-gold-300/50 bg-gold-500 text-pine-950 shadow-[0_0_44px_rgba(200,169,97,0.4)] transition-all duration-300 hover:scale-105 hover:bg-gold-400 active:scale-95"
            aria-label="Buka undangan"
          >
            <IconEnvelope className="size-6 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.22em]">Buka</span>
          </button>
        </div>
        <p className="mt-4 text-[11px] tracking-[0.28em] text-sage-300/70 uppercase">
          Klik untuk membuka undangan
        </p>
      </div>
    </div>
  );
}
