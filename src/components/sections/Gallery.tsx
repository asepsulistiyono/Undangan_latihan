import { useCallback, useEffect, useState } from "react";
import { WEDDING } from "../../lib/wedding";
import { useReveal } from "../../hooks/useReveal";
import { IconChevronL, IconChevronR, IconClose, IconSparkle } from "../Icons";
import { SectionHead } from "../Decor";

export default function Gallery() {
  const ref = useReveal();
  const [idx, setIdx] = useState<number | null>(null);
  const items = WEDDING.gallery;

  const close = useCallback(() => setIdx(null), []);
  const step = useCallback(
    (d: number) => setIdx((v) => (v === null ? v : (v + d + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (idx === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [idx, close, step]);

  return (
    <section
      id="galeri"
      className="relative z-10 border-y border-gold-500/10 bg-pine-900/50 py-24 sm:py-32"
    >
      <div ref={ref} className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead
          eyebrow="Lewat Lensa"
          title={
            <>
              Galeri <em className="italic text-gold-300">Momen</em>
            </>
          }
          sub="Potongan-potongan kecil dari perjalanan kami — cahaya, tawa, dan hijau dedaunan yang menjadi saksi."
        />

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 [grid-auto-rows:170px] sm:[grid-auto-rows:200px]">
          {items.map((g, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`reveal rd-${(i % 4) + 1} group relative overflow-hidden rounded-[3px] border border-gold-500/15 text-left transition-colors duration-500 hover:border-gold-500/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400 ${
                g.wide ? "col-span-2" : ""
              } ${g.tall ? "row-span-2" : ""} ${i === 0 ? "md:row-span-2" : ""}`}
              aria-label={`Buka foto: ${g.caption}`}
            >
              <img
                src={g.src}
                alt={g.caption}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-pine-950/90 via-pine-950/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center gap-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <IconSparkle className="size-3.5 shrink-0 text-gold-400" />
                <span className="font-display text-sm italic text-gold-200 sm:text-base">
                  {g.caption}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* lightbox */}
      {idx !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-pine-950/95 p-4 backdrop-blur-sm animate-[tick-pop_0.45s_cubic-bezier(0.16,1,0.3,1)]"
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau foto"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full border border-gold-500/40 text-gold-300 transition-colors hover:bg-gold-500 hover:text-pine-950 sm:right-6 sm:top-6"
            aria-label="Tutup pratinjau"
          >
            <IconClose className="size-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold-500/40 text-gold-300 transition-all hover:bg-gold-500 hover:text-pine-950 sm:left-6"
            aria-label="Foto sebelumnya"
          >
            <IconChevronL className="size-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold-500/40 text-gold-300 transition-all hover:bg-gold-500 hover:text-pine-950 sm:right-6"
            aria-label="Foto berikutnya"
          >
            <IconChevronR className="size-5" />
          </button>

          <figure
            className="flex max-h-full flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={idx}
              src={items[idx].src}
              alt={items[idx].caption}
              className="max-h-[76vh] max-w-full border border-gold-500/30 object-contain shadow-[0_30px_80px_rgba(0,0,0,0.6)] animate-[tick-pop_0.5s_cubic-bezier(0.16,1,0.3,1)]"
            />
            <figcaption className="mt-4 flex items-center gap-2.5 font-display text-lg italic text-gold-200">
              <IconSparkle className="size-4 text-gold-400" />
              {items[idx].caption}
              <span className="ml-2 text-xs font-sans not-italic tracking-[0.3em] text-sage-300/70">
                {idx + 1} / {items.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
