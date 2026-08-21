import { IMAGES, WEDDING } from "../data";
import {
  ChevronDownIcon,
  CornerFlourish,
  FlourishDivider,
  LeafSprig,
  Reveal,
} from "./Ornaments";

export function Hero() {
  return (
    <section id="beranda" className="relative flex min-h-screen flex-col overflow-hidden bg-pine-950">
      {/* layered ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(42,99,80,0.55),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_80%,rgba(201,162,75,0.12),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_12%_75%,rgba(201,162,75,0.1),transparent_70%)]" />
      </div>

      <CornerFlourish className="absolute left-5 top-5 h-24 w-24 text-gold-500/45 sm:h-36 sm:w-36" />
      <CornerFlourish className="absolute right-5 top-5 h-24 w-24 rotate-90 text-gold-500/45 sm:h-36 sm:w-36" />
      <CornerFlourish className="absolute bottom-24 left-5 h-20 w-20 -rotate-90 text-gold-500/30 sm:h-28 sm:w-28" />
      <CornerFlourish className="absolute bottom-24 right-5 h-20 w-20 rotate-180 text-gold-500/30 sm:h-28 sm:w-28" />

      <div className="relative mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 pb-28 pt-24 text-center">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.55em] text-gold-300">
            The Wedding Of
          </p>
        </Reveal>

        <Reveal variant="scale" delay={150} className="relative mt-10">
          {/* slowly rotating ornamental ring */}
          <svg
            viewBox="0 0 400 400"
            className="absolute -inset-7 h-[calc(100%+56px)] w-[calc(100%+56px)] animate-spin-slower text-gold-500/45 sm:-inset-9"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="200" cy="200" r="196" stroke="currentColor" strokeWidth="1" strokeDasharray="3 14" />
            <circle cx="200" cy="200" r="182" stroke="currentColor" strokeWidth="0.6" strokeDasharray="60 26" opacity="0.6" />
            <circle cx="200" cy="4" r="3.5" fill="currentColor" />
            <circle cx="200" cy="396" r="3.5" fill="currentColor" />
          </svg>

          <LeafSprig className="absolute -left-16 top-10 h-12 w-12 -rotate-12 animate-float text-gold-500/70 sm:-left-24 sm:h-16 sm:w-16" />
          <LeafSprig className="absolute -right-14 top-24 h-10 w-10 rotate-[30deg] animate-float-late text-gold-400/60 sm:-right-20 sm:h-14 sm:w-14" />
          <LeafSprig className="absolute -bottom-4 -left-12 h-9 w-9 rotate-[140deg] animate-float-late text-pine-500/70 sm:-left-16" />

          <div className="arch border border-gold-500/70 p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
            <div className="arch overflow-hidden border border-gold-500/30">
              <img
                src={IMAGES.couple}
                alt="Raka dan Laras"
                className="arch h-[400px] w-[280px] object-cover transition-transform duration-[2500ms] ease-out hover:scale-[1.06] sm:h-[460px] sm:w-[330px]"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={320} className="relative z-10 -mt-2">
          <h1 className="font-script text-[64px] leading-[0.95] text-gold-200 drop-shadow-[0_6px_30px_rgba(8,28,22,0.9)] sm:text-[92px]">
            Raka <span className="text-gold-400">&</span> Laras
          </h1>
          <FlourishDivider className="mx-auto mt-4 h-8 w-56 text-gold-500/80" />
        </Reveal>

        <Reveal delay={460}>
          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-light uppercase tracking-[0.28em] text-paper-100/90">
            <span>Sabtu</span>
            <span className="h-1.5 w-1.5 rotate-45 bg-gold-500" aria-hidden="true" />
            <span>12 Desember 2026</span>
            <span className="h-1.5 w-1.5 rotate-45 bg-gold-500" aria-hidden="true" />
            <span>{WEDDING.city}</span>
          </p>
        </Reveal>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-24 left-1/2 z-10 -translate-x-1/2 text-gold-400/80 sm:bottom-20">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.35em]">Gulir</span>
          <ChevronDownIcon className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

export function MarqueeStrip() {
  const items = ["Raka & Laras", WEDDING.dateShort, WEDDING.city, "Akad & Resepsi", WEDDING.hashtag];
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {items.map((it, i) => (
        <span key={i} className="flex items-center">
          <span className="font-display px-6 text-lg font-medium italic tracking-wide text-gold-300/90 sm:text-xl">
            {it}
          </span>
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-gold-500/70" fill="currentColor">
            <path d="M6 0l1.8 4.2L12 6 7.8 7.8 6 12 4.2 7.8 0 6l4.2-1.8L6 0z" />
          </svg>
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden border-y border-gold-500/20 bg-pine-900 py-3.5">
      <div className="flex w-max animate-marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
