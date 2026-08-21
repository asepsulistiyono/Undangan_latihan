import { useEffect, useState } from "react";
import { GALLERY, STORY } from "../data";
import {
  ChevronDownIcon,
  LeafCorner,
  Reveal,
  SectionHeading,
} from "./Ornaments";

/* ============================== STORY ============================== */

export function StorySection() {
  return (
    <section id="cerita" className="relative overflow-hidden bg-paper-50 px-6 py-24 text-ink-900 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_10%_10%,rgba(201,162,75,0.13),transparent_70%)]" />
      <div className="relative mx-auto max-w-3xl">
        <SectionHeading
          tone="light"
          overline="Love Story"
          script="Perjalanan Kami"
          title="Tiga Babak Menuju Selamanya"
        />

        <div className="relative mt-20">
          {/* vertical gold line */}
          <span className="absolute bottom-6 left-[21px] top-2 w-px bg-gradient-to-b from-gold-500/10 via-gold-500/70 to-gold-500/10 md:left-[27px]" />

          <div className="space-y-14">
            {STORY.map((s, i) => (
              <Reveal key={s.year} variant="left" delay={i * 120}>
                <div className="relative pl-16 md:pl-24">
                  {/* year node */}
                  <span className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-gold-500 bg-paper-50 shadow-[0_0_0_6px_rgba(250,246,236,1)] md:h-14 md:w-14">
                    <span className="font-display text-[13px] font-bold text-gold-700 md:text-[15px]">
                      &rsquo;{s.year.slice(2)}
                    </span>
                  </span>

                  <div className="group border border-paper-300 bg-white/75 p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/60 hover:shadow-[0_24px_50px_-24px_rgba(133,98,31,0.45)] sm:p-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-gold-500/60 p-1 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105">
                        <img src={s.image} alt={s.title} className="h-full w-full rounded-full object-cover" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gold-600">
                          {s.year}
                        </p>
                        <h3 className="font-display mt-1 text-2xl font-semibold sm:text-[27px]">{s.title}</h3>
                        <p className="mt-2 text-sm font-light leading-relaxed text-ink-700">{s.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== GALLERY ============================== */

const SPANS = [
  "col-span-2 row-span-2",       // couple — besar
  "col-span-2 row-span-1 sm:col-span-1", // candid
  "col-span-2 row-span-1 sm:col-span-1", // hands
  "col-span-1 row-span-2",       // lamaran — tinggi
  "col-span-1 row-span-2",       // table — tinggi
];

export function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((v) => (v === null ? v : (v + 1) % GALLERY.length));
      if (e.key === "ArrowLeft")
        setLightbox((v) => (v === null ? v : (v - 1 + GALLERY.length) % GALLERY.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section id="galeri" className="relative overflow-hidden bg-pine-950 px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(29,74,57,0.5),transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading overline="Galeri" script="Momen Kami" title="Bingkai Menuju Hari Bahagia" />

        <div className="mt-16 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[185px] sm:grid-cols-4 sm:gap-4">
          {GALLERY.map((g, i) => (
            <Reveal key={i} variant="scale" delay={(i % 4) * 110} className={`${SPANS[i]} h-full`}>
              <button
                onClick={() => setLightbox(i)}
                className="group relative block h-full w-full overflow-hidden border border-gold-500/10 text-left transition-colors duration-500 hover:border-gold-500/60"
                aria-label={`Perbesar foto: ${g.caption}`}
              >
                <img
                  src={g.src}
                  alt={g.caption}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-pine-950/85 via-pine-950/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="font-display absolute bottom-4 left-4 right-4 translate-y-3 text-lg italic text-paper-50 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {g.caption}
                </span>
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-gold-300/60 text-gold-200 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </Reveal>
          ))}
          {/* ornamental tile to complete the grid */}
          <Reveal variant="scale" delay={220} className="col-span-2 row-span-1">
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden border border-gold-500/25 bg-pine-900">
              <LeafCorner className="absolute left-0 top-0 h-12 w-12 text-gold-500/60" />
              <LeafCorner className="absolute bottom-0 right-0 h-12 w-12 rotate-180 text-gold-500/60" />
              <p className="font-script text-3xl text-gold-300 sm:text-4xl">R & L</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-paper-100/60">12 . 12 . 2026</p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-pine-950/96 p-5 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <img
            src={GALLERY[lightbox].src}
            alt={GALLERY[lightbox].caption}
            className="max-h-[76vh] max-w-full animate-pop border border-gold-500/40 object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="font-display mt-5 text-xl italic text-paper-100/90">
            {GALLERY[lightbox].caption}
            <span className="ml-3 text-sm not-italic text-gold-400">
              {lightbox + 1} / {GALLERY.length}
            </span>
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox - 1 + GALLERY.length) % GALLERY.length);
            }}
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold-500/50 text-gold-300 transition-colors hover:bg-gold-500 hover:text-pine-950 sm:left-8"
            aria-label="Foto sebelumnya"
          >
            <ChevronDownIcon className="h-5 w-5 rotate-90" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % GALLERY.length);
            }}
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold-500/50 text-gold-300 transition-colors hover:bg-gold-500 hover:text-pine-950 sm:right-8"
            aria-label="Foto berikutnya"
          >
            <ChevronDownIcon className="h-5 w-5 -rotate-90" />
          </button>
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/50 text-gold-300 transition-colors hover:bg-gold-500 hover:text-pine-950"
            aria-label="Tutup"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
