import { WEDDING } from "../data";
import {
  FlourishDivider,
  InstagramIcon,
  LeafSprig,
  Reveal,
  SectionHeading,
} from "./Ornaments";

export function QuoteSection() {
  return (
    <section className="relative overflow-hidden bg-pine-950 px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(29,74,57,0.5),transparent_70%)]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal variant="scale">
          <FlourishDivider className="mx-auto h-10 w-72 text-gold-400" />
        </Reveal>
        <Reveal delay={120}>
          <p dir="rtl" lang="ar" className="font-display mt-8 text-2xl leading-[2.1] text-paper-100/95 sm:text-[27px]">
            وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا
            وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً
          </p>
        </Reveal>
        <Reveal delay={240}>
          <p className="font-display mt-8 text-lg font-light italic leading-relaxed text-paper-100/80 sm:text-xl">
            “Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu
            dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia
            menjadikan di antaramu rasa kasih dan sayang.”
          </p>
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.42em] text-gold-400">
            QS. Ar-Rūm : 21
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function CoupleCard({
  person,
  delay,
  side,
}: {
  person: typeof WEDDING.groom;
  delay: number;
  side: "left" | "right";
}) {
  return (
    <Reveal variant={side === "left" ? "left" : "right"} delay={delay} className="flex-1">
      <div className="group flex flex-col items-center text-center">
        <div className="relative">
          <div className="flex h-36 w-36 items-center justify-center rounded-full border border-gold-500/70 bg-pine-900 shadow-[inset_0_0_0_6px_rgba(250,246,236,1),inset_0_0_0_7px_rgba(201,162,75,0.55)] transition-transform duration-500 group-hover:scale-[1.04] sm:h-40 sm:w-40">
            <span className="font-display text-6xl font-medium text-gold-300 sm:text-7xl">
              {person.initial}
            </span>
          </div>
          <LeafSprig className="absolute -right-4 -top-3 h-10 w-10 rotate-[35deg] text-gold-600/80 transition-transform duration-500 group-hover:rotate-[55deg]" />
        </div>
        <p className="font-script mt-7 text-5xl text-gold-600 sm:text-6xl">{person.short}</p>
        <h3 className="font-display mt-3 text-2xl font-semibold text-ink-900">{person.name}</h3>
        <p className="mt-3 text-sm font-light leading-relaxed text-ink-700">
          {person.child}
          <br />
          <span className="font-normal">{person.parents}</span>
        </p>
        <a
          href={`https://instagram.com/${person.ig.replace("@", "")}`}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold-600/50 px-4 py-1.5 text-xs font-medium tracking-wide text-gold-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-500 hover:text-pine-950"
        >
          <InstagramIcon className="h-3.5 w-3.5" />
          {person.ig}
        </a>
      </div>
    </Reveal>
  );
}

export function CoupleSection() {
  return (
    <section id="mempelai" className="relative overflow-hidden bg-paper-50 px-6 py-24 text-ink-900 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_85%_10%,rgba(201,162,75,0.14),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_10%_90%,rgba(42,99,80,0.1),transparent_70%)]" />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          tone="light"
          overline="Mempelai"
          script="Bismillahirrahmanirrahim"
          title={
            <>
              Assalamu&rsquo;alaikum <span className="italic text-gold-600">Warahmatullahi Wabarakatuh</span>
            </>
          }
        />
        <Reveal delay={150}>
          <p className="mx-auto mt-7 max-w-2xl text-center text-[15px] font-light leading-relaxed text-ink-700">
            Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud menyelenggarakan resepsi
            pernikahan putra–putri kami, yang insyaAllah akan dilaksanakan pada:
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col items-center gap-14 md:flex-row md:items-start md:gap-8">
          <CoupleCard person={WEDDING.groom} delay={0} side="left" />

          <Reveal variant="scale" delay={200} className="shrink-0 self-center">
            <span className="font-script block rotate-6 text-8xl leading-none text-gold-500 transition-transform duration-500 hover:rotate-0 md:text-9xl">
              &
            </span>
          </Reveal>

          <CoupleCard person={WEDDING.bride} delay={120} side="right" />
        </div>
      </div>
    </section>
  );
}
