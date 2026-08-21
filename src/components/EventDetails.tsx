import { CALENDAR_URL, EVENTS, WEDDING } from "../data";
import { useCountdown } from "../hooks";
import {
  CalendarIcon,
  ClockIcon,
  CornerFlourish,
  DressIcon,
  MapPinIcon,
  Reveal,
  RingsIcon,
  SectionHeading,
  ToastIcon,
} from "./Ornaments";

export function EventsSection() {
  return (
    <section id="acara" className="relative overflow-hidden bg-pine-900 px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_15%_15%,rgba(201,162,75,0.1),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_90%_85%,rgba(42,99,80,0.4),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          overline="Rangkaian Acara"
          script="Save the Date"
          title="Dua Acara, Satu Bahagia"
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          {/* date block */}
          <Reveal variant="left">
            <div className="relative flex h-full flex-col items-center justify-center overflow-hidden border border-gold-500/30 bg-pine-950/60 px-8 py-14 text-center">
              <CornerFlourish className="absolute left-0 top-0 h-20 w-20 text-gold-500/50" />
              <CornerFlourish className="absolute bottom-0 right-0 h-20 w-20 rotate-180 text-gold-500/50" />
              <p className="text-xs font-medium uppercase tracking-[0.5em] text-gold-300">Desember</p>
              <p className="font-display mt-3 text-[112px] font-semibold leading-none text-paper-50 sm:text-[140px]">
                12
              </p>
              <div className="mt-3 flex items-center gap-4">
                <span className="rule-gold w-12" />
                <p className="font-display text-3xl font-medium italic text-gold-300">2026</p>
                <span className="rule-gold w-12" />
              </div>
              <p className="mt-6 text-sm font-light tracking-wide text-paper-100/75">
                {WEDDING.dateLong} · {WEDDING.city}
              </p>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noreferrer"
                className="group mt-9 inline-flex items-center gap-3 border border-gold-500 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-500 hover:text-pine-950 hover:shadow-[0_12px_36px_-10px_rgba(201,162,75,0.6)] active:scale-95"
              >
                <CalendarIcon className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-rotate-6" />
                Simpan Tanggal
              </a>
              <p className="mt-6 text-xs italic text-gold-400/80">{WEDDING.hashtag}</p>
            </div>
          </Reveal>

          {/* events list */}
          <div className="flex flex-col justify-center gap-10">
            {EVENTS.map((ev, i) => (
              <Reveal key={ev.id} variant="right" delay={i * 160}>
                <article className="group relative border border-gold-500/15 bg-pine-950/50 p-7 transition-all duration-500 hover:border-gold-500/45 hover:bg-pine-950/75 sm:p-9">
                  <span className="absolute left-0 top-0 h-px w-0 bg-gold-500 transition-all duration-700 group-hover:w-full" />
                  <div className="flex items-start gap-6">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gold-500/60 text-gold-300 transition-all duration-500 group-hover:rotate-6 group-hover:bg-gold-500 group-hover:text-pine-950">
                      {i === 0 ? <RingsIcon className="h-8 w-8" /> : <ToastIcon className="h-8 w-8" />}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-3xl font-semibold text-paper-50">{ev.name}</h3>
                      <p className="mt-2 flex items-center gap-2 text-sm tracking-wide text-gold-300">
                        <ClockIcon className="h-4 w-4" /> {ev.time}
                      </p>
                      <p className="mt-4 font-medium text-paper-100">{ev.venue}</p>
                      <p className="mt-1 text-sm font-light leading-relaxed text-paper-100/65">
                        {ev.address}
                      </p>
                      <p className="mt-3 flex items-center gap-2 text-xs italic text-paper-100/55">
                        <DressIcon className="h-4 w-4 text-gold-400/80" /> {ev.dressnote}
                      </p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ev.mapQuery)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold-400 transition-colors hover:text-gold-200"
                      >
                        <MapPinIcon className="h-4 w-4" />
                        Lihat Lokasi
                        <span className="h-px w-6 bg-current transition-all duration-300 group-hover:w-10" />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CountCell({ value, label }: { value: number; label: string }) {
  const v = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden">
        <span key={v} className="font-display block animate-pop text-6xl font-semibold tabular-nums text-gold-300 sm:text-8xl">
          {v}
        </span>
      </div>
      <span className="mt-3 text-[10px] font-medium uppercase tracking-[0.4em] text-paper-100/60 sm:text-[11px]">
        {label}
      </span>
    </div>
  );
}

export function CountdownSection() {
  const { days, hours, minutes, seconds, passed } = useCountdown(WEDDING.dateISO);
  return (
    <section className="relative overflow-hidden border-y border-gold-500/15 bg-pine-950 px-6 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_50%_50%,rgba(201,162,75,0.08),transparent_70%)]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.45em] text-gold-400">
            Menuju Hari Bahagia
          </p>
        </Reveal>
        {passed ? (
          <Reveal delay={150}>
            <p className="font-display mt-8 text-4xl italic text-gold-200 sm:text-5xl">
              Alhamdulillah, hari yang dinanti telah tiba.
            </p>
          </Reveal>
        ) : (
          <Reveal delay={150}>
            <div className="mt-8 flex items-start justify-center gap-4 sm:gap-10">
              <CountCell value={days} label="Hari" />
              <span className="font-display mt-4 text-4xl text-gold-500/50 sm:text-6xl">:</span>
              <CountCell value={hours} label="Jam" />
              <span className="font-display mt-4 text-4xl text-gold-500/50 sm:text-6xl">:</span>
              <CountCell value={minutes} label="Menit" />
              <span className="font-display mt-4 text-4xl text-gold-500/50 sm:text-6xl">:</span>
              <CountCell value={seconds} label="Detik" />
            </div>
          </Reveal>
        )}
        <Reveal delay={300}>
          <p className="mt-10 text-sm font-light tracking-wide text-paper-100/60">
            {WEDDING.dateLong} — {WEDDING.city}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
