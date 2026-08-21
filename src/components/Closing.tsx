import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { GIFTS, SEED_WISHES, WEDDING } from "../data";
import type { Attendance, Wish } from "../data";
import {
  CardIcon,
  CheckIcon,
  CopyIcon,
  CornerFlourish,
  FlourishDivider,
  ParcelIcon,
  Reveal,
  SectionHeading,
  SendIcon,
} from "./Ornaments";

/* ================================ GIFTS ================================ */

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }
}

export function GiftSection() {
  const [copied, setCopied] = useState<string | null>(null);
  const doCopy = async (key: string, value: string) => {
    if (await copyText(value)) {
      setCopied(key);
      window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 2200);
    }
  };

  return (
    <section id="hadiah" className="relative overflow-hidden bg-paper-50 px-6 py-24 text-ink-900 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_90%_15%,rgba(42,99,80,0.1),transparent_70%)]" />
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading tone="light" overline="Tanda Kasih" script="Wedding Gift" title="Doa Restu & Tanda Kasih" />
        <Reveal delay={150}>
          <p className="mx-auto mt-7 max-w-2xl text-center text-[15px] font-light leading-relaxed text-ink-700">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi
            adalah ungkapan tanda kasih, Anda dapat berbagi kebahagiaan melalui:
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {GIFTS.banks.map((b, i) => (
            <Reveal key={b.bank} delay={i * 140}>
              <div className="group flex h-full flex-col items-center border border-paper-300 bg-white/80 p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-gold-500/60 hover:shadow-[0_28px_60px_-28px_rgba(133,98,31,0.5)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-600/50 text-gold-700 transition-all duration-500 group-hover:rotate-6 group-hover:bg-gold-500 group-hover:text-pine-950">
                  <CardIcon className="h-7 w-7" />
                </div>
                <p className="font-display mt-5 text-2xl font-bold tracking-wide text-gold-700">{b.bank}</p>
                <p className="font-display mt-2 text-[22px] font-semibold tabular-nums tracking-wider text-ink-900">
                  {b.number}
                </p>
                <p className="mt-1 text-sm font-light text-ink-700">a.n. {b.name}</p>
                <button
                  onClick={() => doCopy(b.bank, b.raw)}
                  className={`mt-6 inline-flex w-full items-center justify-center gap-2 border py-2.5 text-[11px] font-semibold uppercase tracking-[0.25em] transition-all duration-300 active:scale-95 ${
                    copied === b.bank
                      ? "border-pine-600 bg-pine-700 text-paper-50"
                      : "border-gold-600/60 text-gold-700 hover:bg-gold-500 hover:text-pine-950"
                  }`}
                >
                  {copied === b.bank ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                  {copied === b.bank ? "Tersalin" : "Salin Nomor"}
                </button>
              </div>
            </Reveal>
          ))}

          <Reveal delay={280}>
            <div className="group flex h-full flex-col items-center border border-paper-300 bg-white/80 p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-gold-500/60 hover:shadow-[0_28px_60px_-28px_rgba(133,98,31,0.5)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-600/50 text-gold-700 transition-all duration-500 group-hover:-rotate-6 group-hover:bg-gold-500 group-hover:text-pine-950">
                <ParcelIcon className="h-7 w-7" />
              </div>
              <p className="font-display mt-5 text-2xl font-bold text-gold-700">Kirim Kado</p>
              <p className="mt-2 text-sm font-light leading-relaxed text-ink-700">{GIFTS.addressShort}</p>
              <p className="mt-1 text-sm font-light text-ink-700">(Raka & Laras)</p>
              <button
                onClick={() => doCopy("alamat", GIFTS.address)}
                className={`mt-6 inline-flex w-full items-center justify-center gap-2 border py-2.5 text-[11px] font-semibold uppercase tracking-[0.25em] transition-all duration-300 active:scale-95 ${
                  copied === "alamat"
                    ? "border-pine-600 bg-pine-700 text-paper-50"
                    : "border-gold-600/60 text-gold-700 hover:bg-gold-500 hover:text-pine-950"
                }`}
              >
                {copied === "alamat" ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                {copied === "alamat" ? "Tersalin" : "Salin Alamat"}
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================ RSVP ================================ */

const ATTENDANCE: { value: Attendance; label: string }[] = [
  { value: "hadir", label: "InsyaAllah Hadir" },
  { value: "berhalangan", label: "Berhalangan" },
  { value: "ragu", label: "Masih Ragu" },
];

const BADGE: Record<Attendance, { label: string; cls: string }> = {
  hadir: { label: "Berkenan Hadir", cls: "border-gold-500/50 bg-gold-500/12 text-gold-300" },
  berhalangan: { label: "Berhalangan", cls: "border-paper-100/25 bg-paper-100/8 text-paper-100/70" },
  ragu: { label: "Masih Ragu", cls: "border-emerald-300/40 bg-emerald-200/10 text-emerald-200" },
};

const AVATAR_COLORS = ["bg-gold-600", "bg-pine-600", "bg-gold-700", "bg-pine-700", "bg-emerald-800"];

function timeAgo(ts: number) {
  const d = Date.now() - ts;
  if (d < 60_000) return "Baru saja";
  if (d < 3_600_000) return `${Math.floor(d / 60_000)} menit lalu`;
  if (d < 86_400_000) return `${Math.floor(d / 3_600_000)} jam lalu`;
  return `${Math.floor(d / 86_400_000)} hari lalu`;
}

const STORAGE_KEY = "raka-laras-wishes-v1";

export function RsvpSection() {
  const [wishes, setWishes] = useState<Wish[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Wish[];
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch {
      /* abaikan */
    }
    return SEED_WISHES;
  });
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("hadir");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch {
      /* abaikan */
    }
  }, [wishes]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Mohon isi nama dan ucapan terlebih dahulu.");
      return;
    }
    setError("");
    const wish: Wish = {
      id: `w-${Date.now()}`,
      name: name.trim(),
      attendance,
      message: message.trim(),
      at: Date.now(),
    };
    setWishes((w) => [wish, ...w]);
    setName("");
    setMessage("");
    setSent(true);
    window.setTimeout(() => setSent(false), 2400);
  };

  const inputCls =
    "w-full border border-gold-500/25 bg-pine-950/70 px-4 py-3 text-sm font-light text-paper-50 placeholder:text-paper-100/35 transition-colors duration-300 focus:border-gold-400";

  return (
    <section id="ucapan" className="relative overflow-hidden bg-pine-900 px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_85%_10%,rgba(201,162,75,0.1),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_90%,rgba(42,99,80,0.45),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading overline="RSVP & Ucapan" script="Kirim Doa" title="Konfirmasi & Doa Terbaik" />
        <Reveal delay={140}>
          <p className="mx-auto mt-7 max-w-2xl text-center text-[15px] font-light leading-relaxed text-paper-100/70">
            Konfirmasikan kehadiran Anda dan tinggalkan doa terbaik untuk kami — setiap kata
            adalah pelita bagi langkah baru kami.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          {/* form */}
          <Reveal variant="left">
            <form onSubmit={submit} className="border border-gold-500/20 bg-pine-950/55 p-7 sm:p-9">
              <label className="block">
                <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.3em] text-gold-300">
                  Nama Anda
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama lengkap"
                  className={inputCls}
                  maxLength={60}
                />
              </label>

              <fieldset className="mt-6">
                <legend className="mb-2 text-[11px] font-medium uppercase tracking-[0.3em] text-gold-300">
                  Konfirmasi Kehadiran
                </legend>
                <div className="grid grid-cols-3 gap-2">
                  {ATTENDANCE.map((a) => (
                    <button
                      key={a.value}
                      type="button"
                      onClick={() => setAttendance(a.value)}
                      className={`border px-2 py-2.5 text-[11px] font-medium tracking-wide transition-all duration-300 active:scale-95 sm:text-xs ${
                        attendance === a.value
                          ? "border-gold-500 bg-gold-500 text-pine-950 shadow-[0_8px_24px_-8px_rgba(201,162,75,0.7)]"
                          : "border-gold-500/25 text-paper-100/70 hover:border-gold-500/60 hover:text-gold-200"
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="mt-6 block">
                <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.3em] text-gold-300">
                  Doa & Ucapan
                </span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan doa dan ucapan terbaik Anda…"
                  rows={5}
                  maxLength={400}
                  className={`${inputCls} resize-none leading-relaxed`}
                />
                <span className="mt-1.5 block text-right text-[10px] text-paper-100/40">
                  {message.length}/400
                </span>
              </label>

              {error && (
                <p className="mt-3 border border-red-400/40 bg-red-500/10 px-4 py-2.5 text-xs text-red-200">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={sent}
                className={`group mt-6 inline-flex w-full items-center justify-center gap-3 py-4 text-[12px] font-semibold uppercase tracking-[0.3em] transition-all duration-300 active:scale-[0.98] ${
                  sent
                    ? "cursor-default bg-pine-600 text-paper-50"
                    : "bg-gold-500 text-pine-950 hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-[0_16px_44px_-12px_rgba(201,162,75,0.65)]"
                }`}
              >
                {sent ? <CheckIcon className="h-4.5 w-4.5" /> : <SendIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />}
                {sent ? "Terkirim — Terima Kasih" : "Kirim Ucapan"}
              </button>
            </form>
          </Reveal>

          {/* wish wall */}
          <Reveal variant="right" delay={140}>
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-gold-500/20 pb-4">
                <h3 className="font-display text-2xl font-semibold text-paper-50">Doa & Ucapan</h3>
                <span className="rounded-full border border-gold-500/40 px-3.5 py-1 text-xs tracking-wide text-gold-300">
                  {wishes.length} ucapan
                </span>
              </div>
              <ul className="mt-5 max-h-[540px] space-y-5 overflow-y-auto pr-2">
                {wishes.map((w) => {
                  const badge = BADGE[w.attendance];
                  const color = AVATAR_COLORS[(w.name.charCodeAt(0) + w.name.length) % AVATAR_COLORS.length];
                  return (
                    <li key={w.id} className="animate-pop flex gap-4 border border-gold-500/10 bg-pine-950/45 p-5 transition-colors duration-300 hover:border-gold-500/35">
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${color} font-display text-lg font-semibold text-paper-50`}
                      >
                        {w.name.charAt(0).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                          <p className="font-medium text-paper-50">{w.name}</p>
                          <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium tracking-wide ${badge.cls}`}>
                            {badge.label}
                          </span>
                          <span className="text-[11px] font-light text-paper-100/45">{timeAgo(w.at)}</span>
                        </div>
                        <p className="mt-2 text-sm font-light leading-relaxed text-paper-100/85">
                          {w.message}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================ FOOTER ================================ */

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-pine-950 px-6 pb-36 pt-24 text-center sm:pb-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(201,162,75,0.14),transparent_70%)]" />
      <CornerFlourish className="absolute left-4 top-6 h-20 w-20 text-gold-500/35" />
      <CornerFlourish className="absolute right-4 top-6 h-20 w-20 rotate-90 text-gold-500/35" />

      <div className="relative mx-auto max-w-2xl">
        <Reveal>
          <p className="font-script text-6xl text-gold-300">Raka & Laras</p>
          <FlourishDivider className="mx-auto mt-6 h-9 w-64 text-gold-500/70" />
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-8 text-sm font-light leading-loose text-paper-100/70">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu. Atas kehadiran dan
            doa restunya, kami mengucapkan terima kasih.
          </p>
          <p className="mt-6 text-sm font-light italic text-paper-100/80">
            Wassalamu&rsquo;alaikum Warahmatullahi Wabarakatuh
          </p>
          <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.4em] text-gold-400">
            Kami yang berbahagia,
          </p>
          <p className="font-display mt-3 text-lg text-paper-100/90">
            Keluarga Besar Pratama <span className="text-gold-500">&</span> Keluarga Besar Mahendra
          </p>
          <p className="mt-8 inline-block border border-gold-500/30 px-5 py-2 text-xs tracking-[0.25em] text-gold-300">
            {WEDDING.hashtag}
          </p>
        </Reveal>
        <Reveal delay={260}>
          <p className="mt-12 text-[11px] font-light tracking-widest text-paper-100/35">
            {WEDDING.dateShort} · {WEDDING.city} · Dibuat dengan penuh sukacita
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
