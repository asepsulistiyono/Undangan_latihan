import { useEffect, useState } from "react";
import { IconArrowUp, IconCalendar, IconChat, IconHeart, IconCamera, IconRings } from "./Icons";
import { WEDDING } from "../lib/wedding";

const items = [
  { id: "beranda", label: "Beranda", Icon: IconHeart },
  { id: "mempelai", label: "Mempelai", Icon: IconRings },
  { id: "acara", label: "Acara", Icon: IconCalendar },
  { id: "galeri", label: "Galeri", Icon: IconCamera },
  { id: "ucapan", label: "Ucapan", Icon: IconChat },
];

export default function Nav() {
  const [active, setActive] = useState("beranda");

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-42% 0px -52% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 animate-[tick-pop_0.7s_cubic-bezier(0.16,1,0.3,1)_both] sm:bottom-5"
      aria-label="Navigasi undangan"
    >
      <div className="flex items-center gap-1 rounded-full border border-gold-500/25 bg-pine-900/90 px-2 py-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <span className="mx-1 hidden select-none font-display text-lg italic text-gold-400 sm:inline">
          {WEDDING.initials}
        </span>
        {items.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => go(id)}
              title={label}
              aria-label={label}
              aria-current={isActive ? "true" : undefined}
              className={`flex size-10 items-center justify-center rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-gold-500 text-pine-950 shadow-[0_0_18px_rgba(200,169,97,0.5)]"
                  : "text-sage-300/80 hover:bg-pine-700 hover:text-gold-300"
              }`}
            >
              <Icon className="size-[18px]" />
            </button>
          );
        })}
        <button
          onClick={() => go("beranda")}
          title="Kembali ke atas"
          aria-label="Kembali ke atas"
          className="ml-1 flex size-10 items-center justify-center rounded-full border border-gold-500/25 text-gold-400 transition-all duration-300 hover:bg-gold-500 hover:text-pine-950"
        >
          <IconArrowUp className="size-4" />
        </button>
      </div>
    </nav>
  );
}
