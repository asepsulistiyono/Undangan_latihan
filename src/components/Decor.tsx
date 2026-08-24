import { useMemo, type CSSProperties, type ReactNode } from "react";
import { IconSparkle } from "./Icons";

/* ---------------- Monogram R·S ---------------- */
export function Monogram({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.9" />
      <circle cx="60" cy="60" r="49" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
      <text
        x="60"
        y="74"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontStyle="italic"
        fontSize="40"
        fill="currentColor"
      >
        R·S
      </text>
      <path d="M60 8l3 6-3 6-3-6z" fill="currentColor" opacity="0.8" />
      <path d="M60 100l3 6-3 6-3-6z" fill="currentColor" opacity="0.8" transform="translate(0 -4)" />
    </svg>
  );
}

/* ---------------- Hiasan sudut sulur ---------------- */
export function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <path d="M6 94C6 46 46 6 94 6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 74C12 44 44 12 74 6" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
      <path d="M19 67c-8-1-13-7-14-14 7 1 13 6 14 14z" fill="currentColor" opacity="0.7" />
      <path d="M67 19c-1-8 5-14 13-15-1 8-5 14-13 15z" fill="currentColor" opacity="0.7" transform="translate(-28 28) rotate(90 60 12)" />
      <circle cx="94" cy="6" r="2.2" fill="currentColor" />
      <circle cx="6" cy="94" r="2.2" fill="currentColor" />
      <circle cx="36" cy="36" r="1.6" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

/* ---------------- Pembatas ornamen ---------------- */
export function DividerOrnament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-14 bg-gradient-to-r from-transparent via-gold-500/70 to-gold-500" />
      <IconSparkle className="size-3.5 text-gold-400" />
      <span className="h-px w-14 bg-gradient-to-l from-transparent via-gold-500/70 to-gold-500" />
    </div>
  );
}

/* ---------------- Kepala seksi ---------------- */
export function SectionHead({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "text-center mx-auto" : "text-left"} max-w-2xl`}>
      <p
        className={`reveal flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.38em] text-gold-400 ${
          center ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-8 bg-gold-500/60" aria-hidden="true" />
        {eyebrow}
        {center && <span className="h-px w-8 bg-gold-500/60" aria-hidden="true" />}
      </p>
      <h2 className="reveal rd-1 mt-4 font-display text-4xl font-light leading-[1.08] text-ivory md:text-5xl">
        {title}
      </h2>
      {sub && (
        <p className={`reveal rd-2 mt-5 text-[15px] leading-relaxed text-sage-300/85 ${center ? "mx-auto" : ""}`}>
          {sub}
        </p>
      )}
      <DividerOrnament className={`reveal rd-3 mt-7 ${center ? "" : "justify-start"}`} />
    </div>
  );
}

/* ---------------- Kelopak bunga ambient ---------------- */
type PetalSpec = {
  left: number;
  size: number;
  dur: number;
  delay: number;
  op: number;
  dx: number;
  rot: number;
  color: string;
  leaf: boolean;
};

export function Petals({ count = 16 }: { count?: number }) {
  const petals = useMemo<PetalSpec[]>(() => {
    const colors = ["#d9bd7f", "#c8a961", "#a9c3ad", "#e9d5a4"];
    return Array.from({ length: count }, (_, i) => ({
      left: (i / count) * 100 + (Math.random() * 6 - 3),
      size: 9 + Math.random() * 13,
      dur: 13 + Math.random() * 11,
      delay: -Math.random() * 22,
      op: 0.22 + Math.random() * 0.34,
      dx: Math.random() * 160 - 80,
      rot: 220 + Math.random() * 260,
      color: colors[i % colors.length],
      leaf: i % 3 === 0,
    }));
  }, [count]);

  return (
    <div aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              "--dur": `${p.dur}s`,
              "--delay": `${p.delay}s`,
              "--op": p.op,
              "--dx": `${p.dx}px`,
              "--rot": `${p.rot}deg`,
            } as CSSProperties
          }
        >
          <svg
            viewBox="0 0 24 24"
            width={p.size}
            height={p.size}
            style={{ color: p.color, display: "block" }}
          >
            {p.leaf ? (
              <path
                d="M4 20C4 10 12 5 20 4c-1 8-5 16-16 16z"
                fill="currentColor"
              />
            ) : (
              <path d="M12 2C7 8 7 15 12 22c5-7 5-14 0-20z" fill="currentColor" />
            )}
          </svg>
        </span>
      ))}
    </div>
  );
}

/* ---------------- Marquee nama & tanggal ---------------- */
export function Marquee() {
  const items = ["Raka & Sekar", "12 Juni 2027", "Plataran Cilandak", "Save the Date"];
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-7 font-display text-lg italic tracking-wide text-gold-300/90 md:text-xl">
            {t}
          </span>
          <IconSparkle className="size-4 text-gold-500/60" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative z-10 overflow-hidden border-y border-gold-500/15 bg-pine-900/80 py-3.5">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
