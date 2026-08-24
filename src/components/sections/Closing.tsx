import { useReveal } from "../../hooks/useReveal";
import { IconHeart } from "../Icons";
import { DividerOrnament, Monogram } from "../Decor";

export default function Closing() {
  const ref = useReveal();

  return (
    <footer className="relative z-10 overflow-hidden pb-32 pt-28 sm:pb-36">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none font-display text-[22rem] italic leading-none text-gold-500/[0.04]"
      >
        &
      </span>

      <div ref={ref} className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
        <Monogram className="reveal mx-auto size-16 text-gold-400" />
        <p className="reveal rd-1 mt-6 text-[11px] font-semibold uppercase tracking-[0.42em] text-sage-300/80">
          Wassalamu&rsquo;alaikum Warahmatullahi Wabarakatuh
        </p>
        <h2 className="reveal rd-2 mt-5 font-display text-5xl font-light italic text-ivory sm:text-6xl">
          Terima <span className="text-gold-300">Kasih</span>
        </h2>
        <p className="reveal rd-3 mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-sage-300/90">
          Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas
          perhatian dan doa baiknya, kami mengucapkan terima kasih.
        </p>
        <DividerOrnament className="reveal rd-4 mt-9" />
        <p className="reveal rd-5 mt-9 font-display text-3xl italic text-gold-200 sm:text-4xl">
          Raka <span className="text-gold-400">&</span> Sekar
        </p>
        <p className="reveal rd-6 mt-3 text-[11px] uppercase tracking-[0.3em] text-sage-300/70">
          Beserta keluarga besar Prasetya & Laras
        </p>
      </div>

      <div className="relative mx-auto mt-20 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-gold-500/10 px-5 pt-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-sage-300/60 sm:flex-row sm:px-8">
        <span>Raka ♥ Sekar — 12 · 06 · 2027</span>
        <span className="flex items-center gap-1.5">
          Dibuat dengan <IconHeart className="size-3.5 text-gold-400" /> di Jakarta
        </span>
      </div>
    </footer>
  );
}
