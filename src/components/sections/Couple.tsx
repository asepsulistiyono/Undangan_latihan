import { WEDDING } from "../../lib/wedding";
import { useReveal } from "../../hooks/useReveal";
import { IconInstagram } from "../Icons";
import { SectionHead } from "../Decor";

function PersonCard({
  person,
  side,
  delay,
}: {
  person: typeof WEDDING.groom;
  side: "left" | "right";
  delay: string;
}) {
  return (
    <figure className={`reveal ${side === "left" ? "from-left" : "from-right"} ${delay} group mx-auto w-full max-w-sm`}>
      {/* bingkai berlapis dengan lengkungan kubah */}
      <div className="border border-gold-500/25 p-3 transition-colors duration-500 group-hover:border-gold-500/60">
        <div className="overflow-hidden rounded-t-full border border-gold-500/40">
          <img
            src={person.photo}
            alt={`Foto ${person.full}`}
            loading="lazy"
            className="aspect-[3/4] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          />
        </div>
      </div>
      <figcaption className="mt-7 text-center">
        <h3 className="font-display text-3xl font-light italic text-ivory sm:text-4xl">
          {person.full}
        </h3>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-sage-300/90">
          {person.parents}
        </p>
        <p className="mt-3 font-display text-sm italic text-gold-300/85">
          &ldquo;{person.bio}&rdquo;
        </p>
        <a
          href={`https://instagram.com/${person.ig}`}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-gold-500/35 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-gold-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-500 hover:text-pine-950"
        >
          <IconInstagram className="size-4" />
          @{person.ig}
        </a>
      </figcaption>
    </figure>
  );
}

export default function Couple() {
  const ref = useReveal();
  return (
    <section id="mempelai" className="relative z-10 py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead
          eyebrow="Bismillahirrahmanirrahim"
          title={
            <>
              Kedua <em className="italic text-gold-300">Mempelai</em>
            </>
          }
          sub="Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang insyaAllah akan berjalan beriringan."
        />

        <div className="relative mt-16 grid gap-16 md:grid-cols-2 md:gap-10 lg:gap-16">
          {/* ampersand raksasa di tengah */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 select-none font-display text-[170px] italic leading-none text-gold-500/10 md:block"
          >
            &
          </span>

          <PersonCard person={WEDDING.groom} side="left" delay="rd-1" />
          <PersonCard person={WEDDING.bride} side="right" delay="rd-2" />
        </div>
      </div>
    </section>
  );
}
