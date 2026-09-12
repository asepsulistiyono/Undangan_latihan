import { WEDDING } from "../../lib/wedding";
import { useReveal } from "../../hooks/useReveal";
import { IconHeart, IconRings, IconSparkle, IconLeaf } from "../Icons";
import { SectionHead } from "../Decor";

const icons = [IconLeaf, IconHeart, IconRings, IconSparkle];

export default function Story() {
  const ref = useReveal();

  return (
    <section id="kisah" className="relative z-10 py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHead
          eyebrow="Perjalanan Kami"
          title={
            <>
              Kisah <em className="italic text-gold-300">Kami</em>
            </>
          }
          sub="Empat bab yang membawa kami ke altar — dari pertemuan yang tak disengaja hingga janji yang akan segera diikrarkan."
        />

        <ol className="relative mt-20 space-y-14 md:space-y-20">
          {/* garis tengah */}
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-[26px] top-2 w-px bg-gradient-to-b from-gold-500/0 via-gold-500/45 to-gold-500/0 md:left-1/2"
          />

          {WEDDING.story.map((s, i) => {
            const Icon = icons[i % icons.length];
            const leftSide = i % 2 === 0;
            return (
              <li key={s.year} className="relative md:grid md:grid-cols-2 md:gap-16">
                {/* lencana tahun */}
                <span
                  className={`reveal from-scale absolute left-0 top-0 z-10 flex size-[52px] items-center justify-center rounded-full border border-gold-500/50 bg-pine-900 shadow-[0_0_24px_rgba(200,169,97,0.18)] md:left-1/2 md:-translate-x-1/2`}
                >
                  <Icon className="size-5 text-gold-400" />
                </span>

                {/* kartu */}
                <div
                  className={`ml-[76px] md:ml-0 ${
                    leftSide ? "md:col-start-1 md:pr-2 md:text-right" : "md:col-start-2 md:pl-2"
                  }`}
                >
                  <div
                    className={`reveal ${leftSide ? "from-left" : "from-right"} rd-1 border border-gold-500/15 bg-pine-800/50 p-6 transition-colors duration-500 hover:border-gold-500/45 sm:p-7 ${
                      leftSide ? "md:mr-4" : "md:ml-4"
                    }`}
                  >
                    <p className="font-display text-2xl italic text-gold-400">{s.year}</p>
                    <h3 className="mt-1.5 font-display text-xl font-normal text-ivory">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-sage-300/90">{s.text}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
