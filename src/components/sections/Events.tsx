import { CALENDAR_URL, WEDDING } from "../../lib/wedding";
import { useReveal } from "../../hooks/useReveal";
import { IconCalendar, IconClock, IconGlass, IconPin, IconRings } from "../Icons";
import { SectionHead } from "../Decor";

function Corner({ className }: { className: string }) {
  return <span aria-hidden="true" className={`absolute size-5 border-gold-500/70 ${className}`} />;
}

export default function Events() {
  const ref = useReveal();

  return (
    <section
      id="acara"
      className="relative z-10 border-y border-gold-500/10 bg-pine-900/50 py-24 sm:py-32"
    >
      <div ref={ref} className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        {/* kolom kiri — lengket */}
        <div className="self-start lg:sticky lg:top-24">
          <SectionHead
            align="left"
            eyebrow="Simpan Tanggalnya"
            title={
              <>
                Rangkaian <em className="italic text-gold-300">Acara</em>
              </>
            }
            sub="Tanpa mengurangi rasa hormat, kami memohon kehadiran Bapak/Ibu/Saudara/i untuk turut menyaksikan dan mendoakan momen sakral kami."
          />

          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noreferrer"
            className="reveal rd-3 mt-9 inline-flex items-center gap-3 bg-gold-500 px-6 py-3.5 text-xs font-extrabold uppercase tracking-[0.22em] text-pine-950 shadow-[0_10px_30px_rgba(200,169,97,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
          >
            <IconCalendar className="size-4" />
            Simpan ke Google Kalender
          </a>

          <div className="reveal rd-4 mt-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-gold-400">
              Dress Code
            </p>
            <div className="mt-4 flex items-center gap-6">
              {WEDDING.dresscode.map((d) => (
                <span key={d.name} className="group flex flex-col items-center gap-2">
                  <span
                    className="size-9 rounded-full border-2 border-pine-950 ring-1 ring-gold-500/40 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: d.hex }}
                  />
                  <span className="text-[11px] font-semibold tracking-wider text-sage-300/85">
                    {d.name}
                  </span>
                </span>
              ))}
            </div>
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-sage-300/70">
              Nuansa hijau sage, emerald, dan sentuhan emas — selaras dengan taman yang memeluk perayaan kami.
            </p>
          </div>
        </div>

        {/* kolom kanan — kartu acara */}
        <div className="space-y-8">
          {WEDDING.events.map((ev, i) => {
            const Icon = ev.id === "akad" ? IconRings : IconGlass;
            return (
              <article
                key={ev.id}
                className={`reveal ${i % 2 ? "from-right" : "from-left"} rd-${i + 1} group relative border border-gold-500/20 bg-pine-800/70 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/60 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:p-9`}
              >
                <Corner className="left-2.5 top-2.5 border-l border-t" />
                <Corner className="right-2.5 top-2.5 border-r border-t" />
                <Corner className="bottom-2.5 left-2.5 border-b border-l" />
                <Corner className="bottom-2.5 right-2.5 border-b border-r" />

                <div className="flex items-center gap-5">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-gold-500/40 text-gold-400 transition-all duration-500 group-hover:bg-gold-500 group-hover:text-pine-950">
                    <Icon className="size-6" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-sage-300/70">
                      {String(i + 1).padStart(2, "0")} — Rangkaian
                    </p>
                    <h3 className="mt-1 font-display text-3xl font-light italic text-ivory">
                      {ev.name}
                    </h3>
                  </div>
                </div>

                <dl className="mt-7 space-y-3 text-sm">
                  <div className="flex items-center gap-3.5">
                    <IconCalendar className="size-[18px] shrink-0 text-gold-400" />
                    <dd className="font-semibold text-ivory">{ev.date}</dd>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <IconClock className="size-[18px] shrink-0 text-gold-400" />
                    <dd className="font-semibold text-ivory">{ev.time}</dd>
                  </div>
                  <div className="flex items-start gap-3.5">
                    <IconPin className="mt-0.5 size-[18px] shrink-0 text-gold-400" />
                    <dd>
                      <span className="block font-semibold text-ivory">{ev.venue}</span>
                      <span className="mt-0.5 block text-[13px] leading-relaxed text-sage-300/80">
                        {ev.address}
                      </span>
                    </dd>
                  </div>
                </dl>

                <p className="mt-6 border-l-2 border-gold-500/50 pl-4 font-display text-sm italic leading-relaxed text-gold-300/85">
                  {ev.note}
                </p>

                <a
                  href={ev.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex items-center gap-2.5 border border-gold-500/40 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-gold-300 transition-all duration-300 hover:bg-gold-500 hover:text-pine-950"
                >
                  <IconPin className="size-4" />
                  Lihat Lokasi
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
