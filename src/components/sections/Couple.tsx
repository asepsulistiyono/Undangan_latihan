import { WEDDING } from "../../lib/wedding";
import { useWedding } from "../../lib/WeddingContext";
import { useReveal } from "../../hooks/useReveal";
import { IconInstagram } from "../Icons";
import { SectionHead } from "../Decor";
import Photo from "../Photo";

function PersonCard({
  person,
  parents,
  bio,
  side,
  delay,
}: {
  person: typeof WEDDING.groom;
  parents: string;
  bio: string;
  side: "left" | "right";
  delay: string;
}) {
  return (
    <figure className={`reveal ${side === "left" ? "from-left" : "from-right"} ${delay} group mx-auto w-full max-w-sm`}>
      {/* bingkai berlapis dengan lengkungan kubah */}
      <div className="border border-gold-500/25 p-3 transition-colors duration-500 group-hover:border-gold-500/60">
        <div className="overflow-hidden rounded-t-full border border-gold-500/40">
          <Photo
            src={person.photo}
            alt={`Foto ${person.full}`}
            className="aspect-[3/4] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          />
        </div>
      </div>
      <figcaption className="mt-7 text-center">
        <h3 className="font-display text-3xl font-light italic text-ivory sm:text-4xl">
          {person.full}
        </h3>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-sage-300/90">
          {parents}
        </p>
        <p className="mt-3 font-display text-sm italic text-gold-300/85">
          &ldquo;{bio}&rdquo;
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
  const { mergedData, t, language, religiousFormat, template } = useWedding();
  
  // Gabungkan data mempelai dengan foto dari context
  const groom = { ...mergedData.groom, photo: mergedData.photos.groom };
  const bride = { ...mergedData.bride, photo: mergedData.photos.bride };
  
  // Gunakan parentsEn jika bahasa Inggris dan tersedia
  const groomParents = language === "en" && groom.parentsEn ? groom.parentsEn : groom.parents;
  const brideParents = language === "en" && bride.parentsEn ? bride.parentsEn : bride.parents;
  
  // Gunakan bioEn jika bahasa Inggris dan tersedia
  const groomBio = language === "en" && groom.bioEn ? groom.bioEn : groom.bio;
  const brideBio = language === "en" && bride.bioEn ? bride.bioEn : bride.bio;
  
  // Gunakan coupleBlessing dari religious format
  const coupleBlessing = language === "en" 
    ? religiousFormat.coupleBlessingEn 
    : religiousFormat.coupleBlessing;
    
  // Gunakan coupleSubtitle dari religious format
  const coupleSubtitle = language === "en"
    ? religiousFormat.coupleSubtitleEn
    : religiousFormat.coupleSubtitle;
  
  return (
    <section id="mempelai" className="relative z-10 py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead
          eyebrow={coupleBlessing}
          title={
            <>
              {t.couple.theBrideAndGroom.split(" ")[0]} <em className="italic text-gold-300">{t.couple.theBrideAndGroom.split(" ").slice(1).join(" ")}</em>
            </>
          }
          sub={coupleSubtitle}
        />

        <div 
          className="relative mt-16 grid gap-16 md:grid-cols-2 md:gap-10 lg:gap-16"
          style={{
            gridTemplateColumns: template.layout.coupleStyle === "stacked" ? "1fr" : undefined,
          }}
        >
          {/* ampersand raksasa di tengah */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 select-none font-display text-[170px] italic leading-none text-gold-500/10 md:block"
          >
            &
          </span>

          <PersonCard person={groom} parents={groomParents} bio={groomBio} side="left" delay="rd-1" />
          <PersonCard person={bride} parents={brideParents} bio={brideBio} side="right" delay="rd-2" />
        </div>
      </div>
    </section>
  );
}
