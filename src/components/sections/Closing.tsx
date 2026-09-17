import { useReveal } from "../../hooks/useReveal";
import { useWedding } from "../../lib/WeddingContext";
import { IconHeart } from "../Icons";
import { DividerOrnament, Monogram } from "../Decor";

export default function Closing() {
  const ref = useReveal();
  const { mergedData, t, language, religiousFormat } = useWedding();

  // Gunakan closing greeting dan blessing dari religious format
  const closingGreeting = language === "en" 
    ? religiousFormat.closingGreetingEn 
    : religiousFormat.closingGreeting;
  
  const closingBlessing = language === "en" 
    ? religiousFormat.closingBlessingEn 
    : religiousFormat.closingBlessing;

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
        <p className="reveal rd-1 mt-6 text-sm font-display italic text-gold-300/90">
          {closingGreeting}
        </p>
        <h2 className="reveal rd-2 mt-5 font-display text-5xl font-light italic text-ivory sm:text-6xl">
          {t.closing.thankYou.split(" ")[0]} <span className="text-gold-300">{t.closing.thankYou.split(" ").slice(1).join(" ")}</span>
        </h2>
        <p className="reveal rd-3 mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-sage-300/90">
          {t.closing.subtitle}
        </p>
        <p className="reveal rd-4 mx-auto mt-4 max-w-xl text-sm italic text-gold-300/80">
          {closingBlessing}
        </p>
        <DividerOrnament className="reveal rd-4 mt-9" />
        <p className="reveal rd-5 mt-9 font-display text-3xl italic text-gold-200 sm:text-4xl">
          {mergedData.groom.short} <span className="text-gold-400">&</span> {mergedData.bride.short}
        </p>
        <p className="reveal rd-6 mt-3 text-[11px] uppercase tracking-[0.3em] text-sage-300/70">
          {t.closing.withFamily}
        </p>
      </div>

      <div className="relative mx-auto mt-20 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-gold-500/10 px-5 pt-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-sage-300/60 sm:flex-row sm:px-8">
        <span>{mergedData.groom.short} ♥ {mergedData.bride.short} — {mergedData.dateShort}</span>
        <span className="flex items-center gap-1.5">
          Dibuat dengan <IconHeart className="size-3.5 text-gold-400" /> di Jakarta
        </span>
      </div>
    </footer>
  );
}
