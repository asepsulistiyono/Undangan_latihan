import type { ReactNode, SVGProps } from "react";
import { stagger, useInView } from "../hooks";

type P = SVGProps<SVGSVGElement>;
const base = (p: P): P => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  ...p,
});

/* ======================= custom icons ======================= */

export const RingsIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="9" cy="14" r="5.5" />
    <circle cx="15" cy="14" r="5.5" />
    <path d="M12 5.5 10.2 3.2h3.6L12 5.5Z" />
    <path d="M12 5.5v1.2" />
  </svg>
);

export const ToastIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M7.5 3.5h9l-.9 6.4a3.7 3.7 0 0 1-7.2 0L7.5 3.5Z" />
    <path d="M8 6.5h8" />
    <path d="M12 13.8V18" />
    <path d="M8.5 20.5h7" />
    <path d="M12 18c-1.4 0-2.6.9-3.2 2.5h6.4c-.6-1.6-1.8-2.5-3.2-2.5Z" />
  </svg>
);

export const MapPinIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21s6.5-5.4 6.5-10.5A6.5 6.5 0 0 0 5.5 10.5C5.5 15.6 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.3" />
  </svg>
);

export const CalendarIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 9.5h17" />
    <path d="M8 3v4M16 3v4" />
    <path d="M12 13.2c.8-1.4 2.9-1 2.9.5 0 1.2-1.9 2.4-2.9 3-1-.6-2.9-1.8-2.9-3 0-1.5 2.1-1.9 2.9-.5Z" />
  </svg>
);

export const CardIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="M3 10h18" />
    <path d="M6.5 14.5h4" />
  </svg>
);

export const ParcelIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3 4 6.5v7L12 21l8-7.5v-7L12 3Z" />
    <path d="M4 6.5 12 10l8-3.5" />
    <path d="M12 10v11" />
    <path d="M8 4.8l8 3.4" />
  </svg>
);

export const CopyIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="8.5" y="8.5" width="12" height="12" rx="2" />
    <path d="M15.5 5.5v-1a2 2 0 0 0-2-2h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h1" transform="translate(1,1)" />
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const NoteIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M9 18.5V6l11-2.5V16" />
    <circle cx="6.5" cy="18.5" r="2.5" />
    <circle cx="17.5" cy="16" r="2.5" />
  </svg>
);

export const EnvelopeIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const ChevronDownIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);

export const InstagramIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export const ClockIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const DressIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M9 3.5c0 1.5.8 2.4 3 2.4s3-.9 3-2.4" />
    <path d="M9.8 6 8 10.5c2.5 1 5.5 1 8 0L14.2 6" />
    <path d="M8 10.5 5.5 20c4 1.4 9 1.4 13 0L16 10.5" />
  </svg>
);

export const LeafSprig = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21C12 13 12 7 12 3" />
    <path d="M12 7c-2.8 0-4.6-1.6-5-4 2.8 0 4.6 1.4 5 4Z" />
    <path d="M12 7c2.8 0 4.6-1.6 5-4-2.8 0-4.6 1.4-5 4Z" />
    <path d="M12 13c-2.8 0-4.6-1.6-5-4 2.8 0 4.6 1.4 5 4Z" />
    <path d="M12 13c2.8 0 4.6-1.6 5-4-2.8 0-4.6 1.4-5 4Z" />
  </svg>
);

export const SendIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M21 3 10.5 13.5" />
    <path d="M21 3 14 21l-3.5-7.5L3 10 21 3Z" />
  </svg>
);

/* ======================= large ornamental flourishes ======================= */

export function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 140" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 136C4 70 70 4 136 4"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.9"
      />
      <path
        d="M4 104C4 52 52 4 104 4"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.5"
      />
      <path
        d="M36 18c-8 2-13 7-15 14 8-1 13-6 15-14Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M18 36c-2 8-7 13-14 15 1-8 6-13 14-15Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M66 9c-6 2-10 6-11 11 6-1 10-5 11-11Z"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />
      <path
        d="M9 66c-2 6-6 10-11 11 1-6 5-10 11-11Z"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />
      <circle cx="136" cy="4" r="2.4" fill="currentColor" opacity="0.85" />
      <circle cx="4" cy="136" r="2.4" fill="currentColor" opacity="0.85" />
      <path
        d="M58 30c6-6 14-8 20-5-3 7-10 11-20 5Z"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.55"
      />
      <path
        d="M30 58c-6 6-8 14-5 20 7-3 11-10 5-20Z"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.55"
      />
    </svg>
  );
}

export function FlourishDivider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 40" fill="none" className={className} aria-hidden="true">
      <path d="M10 20h110" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
      <path d="M200 20h110" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
      <path
        d="M160 20c-9-11-24-13-34-6 8 9 22 12 34 6Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M160 20c9-11 24-13 34-6-8 9-22 12-34 6Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M160 20c-3-5-3-9 0-14 3 5 3 9 0 14Z" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="160" cy="20" r="1.8" fill="currentColor" />
      <circle cx="122" cy="20" r="1.4" fill="currentColor" opacity="0.7" />
      <circle cx="198" cy="20" r="1.4" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function LeafCorner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 90" fill="none" className={className} aria-hidden="true">
      <path d="M6 84C6 44 44 6 84 6" stroke="currentColor" strokeWidth="1" opacity="0.8" />
      <path d="M26 14c-5 1-8 4-9 9 5-1 8-4 9-9Z" stroke="currentColor" strokeWidth="0.9" />
      <path d="M14 26c-1 5-4 8-9 9 1-5 4-8 9-9Z" stroke="currentColor" strokeWidth="0.9" />
      <circle cx="84" cy="6" r="2" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

/* ======================= reveal wrapper ======================= */

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "left" | "right" | "scale";
}

export function Reveal({ children, className = "", delay = 0, variant = "up" }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const v =
    variant === "left"
      ? "reveal reveal-left"
      : variant === "right"
        ? "reveal reveal-right"
        : variant === "scale"
          ? "reveal reveal-scale"
          : "reveal";
  return (
    <div ref={ref} className={`${v} ${inView ? "is-in" : ""} ${className}`} style={stagger(delay)}>
      {children}
    </div>
  );
}

/* ======================= section heading ======================= */

interface HeadingProps {
  overline: string;
  title: ReactNode;
  script?: string;
  tone?: "dark" | "light";
  align?: "center" | "left";
}

export function SectionHeading({
  overline,
  title,
  script,
  tone = "dark",
  align = "center",
}: HeadingProps) {
  const dark = tone === "dark";
  return (
    <Reveal className={align === "center" ? "text-center" : ""}>
      <p
        className={`flex items-center ${
          align === "center" ? "justify-center" : "justify-start"
        } gap-3 text-[11px] font-medium uppercase tracking-[0.42em] ${
          dark ? "text-gold-400" : "text-gold-600"
        }`}
      >
        <span className={`h-px w-8 ${dark ? "bg-gold-500/60" : "bg-gold-600/60"}`} />
        {overline}
        <span className={`h-px w-8 ${dark ? "bg-gold-500/60" : "bg-gold-600/60"}`} />
      </p>
      {script && (
        <p className={`font-script mt-4 text-4xl leading-none sm:text-5xl ${dark ? "text-gold-300" : "text-gold-600"}`}>
          {script}
        </p>
      )}
      <h2
        className={`font-display mt-3 text-4xl font-semibold leading-tight sm:text-5xl ${
          dark ? "text-paper-50" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
    </Reveal>
  );
}
