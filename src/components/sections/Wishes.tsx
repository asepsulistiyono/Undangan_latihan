import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { timeAgo } from "../../lib/wedding";
import { useReveal } from "../../hooks/useReveal";
import { IconChat, IconCheck, IconUsers } from "../Icons";
import { SectionHead } from "../Decor";

type Wish = {
  id: string;
  name: string;
  attend: "hadir" | "berhalangan";
  guests: number;
  message: string;
  ts: number;
};

const DAY = 86_400_000;
const SEEDS: Wish[] = [
  { id: "s1", name: "Nadia & Bagas", attend: "hadir", guests: 2, ts: Date.now() - DAY * 2 - 3_600_000, message: "Barakallahu laka wa baraka 'alaika wa jama'a bainakuma fii khair. Tak sabar menunggu hari bahagianya! 🤍" },
  { id: "s2", name: "Tante Mira", attend: "hadir", guests: 2, ts: Date.now() - DAY * 3, message: "Alhamdulillah, akhirnya sampai di titik ini. Semoga menjadi keluarga sakinah, mawaddah, warahmah. Peluk jauh dari Bandung!" },
  { id: "s3", name: "Dimas Prasetyo", attend: "hadir", guests: 1, ts: Date.now() - DAY * 4 - 7_200_000, message: "Selamat menempuh hidup baru, Bro Raka! Dari teman sebangku sampai jadi saksi bahagiamu. Sampai jumpa di Cilandak!" },
  { id: "s4", name: "Kania Larasati", attend: "berhalangan", guests: 0, ts: Date.now() - DAY * 5, message: "Mohon maaf belum bisa hadir karena sedang di luar kota. Doa terbaik untuk Sekar & Raka, semoga lancar sampai hari H!" },
  { id: "s5", name: "Pak Bimo & Ibu Ratna", attend: "hadir", guests: 2, ts: Date.now() - DAY * 6, message: "Doa restu kami menyertai setiap langkah kalian. Selamat membangun rumah tangga yang penuh cinta dan keberkahan." },
  { id: "s6", name: "Rania Puspita", attend: "hadir", guests: 1, ts: Date.now() - DAY * 7 - 1_800_000, message: "MasyaAllah, pasangan paling serasi tahun ini! Semoga pernikahan kalian dipenuhi tawa setiap hari. Congrats, Sekar!" },
];

const LS_KEY = "raka-sekar-wishes-v1";

function loadStored(): Wish[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const inputCls =
  "w-full rounded-[3px] border border-gold-500/25 bg-pine-900/80 px-4 py-3 text-sm text-ivory placeholder:text-sage-300/40 transition-colors duration-300 focus:border-gold-400 focus:outline-none";

export default function Wishes() {
  const ref = useReveal();
  const [stored, setStored] = useState<Wish[]>(loadStored);
  const [name, setName] = useState("");
  const [attend, setAttend] = useState<"hadir" | "berhalangan">("hadir");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const [lastId, setLastId] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const all = useMemo(() => [...stored, ...SEEDS], [stored]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Mohon lengkapi nama dan ucapan terlebih dahulu.");
      return;
    }
    setError("");
    const w: Wish = {
      id: `u-${Date.now()}`,
      name: name.trim(),
      attend,
      guests: attend === "hadir" ? guests : 0,
      message: message.trim(),
      ts: Date.now(),
    };
    const next = [w, ...stored];
    setStored(next);
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(next));
    } catch {
      /* penyimpanan penuh — abaikan */
    }
    setLastId(w.id);
    setName("");
    setMessage("");
    setGuests(1);
    setToast(true);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(false), 2800);
  };

  return (
    <section
      id="ucapan"
      className="relative z-10 border-t border-gold-500/10 bg-pine-900/50 py-24 sm:py-32"
    >
      <div ref={ref} className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead
          eyebrow="Doa & Harapan"
          title={
            <>
              Konfirmasi &amp; <em className="italic text-gold-300">Ucapan</em>
            </>
          }
          sub="Kehadiran dan doa restu Anda adalah kehormatan bagi kami. Sampaikan konfirmasi kehadiran serta untaian doa terbaik."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* ===== formulir ===== */}
          <form
            onSubmit={submit}
            className="reveal from-left rd-1 self-start border border-gold-500/20 bg-pine-800/70 p-7 sm:p-9 lg:sticky lg:top-24"
            noValidate
          >
            <h3 className="font-display text-2xl font-light italic text-ivory">
              Kirim Ucapan &amp; Konfirmasi
            </h3>

            <label htmlFor="w-name" className="mt-7 block text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400">
              Nama
            </label>
            <input
              id="w-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Anda"
              className={`${inputCls} mt-2.5`}
            />

            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400">
              Konfirmasi Kehadiran
            </p>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5">
              {(
                [
                  ["hadir", "InsyaAllah Hadir"],
                  ["berhalangan", "Mohon Maaf, Berhalangan"],
                ] as const
              ).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAttend(val)}
                  aria-pressed={attend === val}
                  className={`rounded-[3px] border px-3 py-3 text-xs font-semibold leading-snug transition-all duration-300 ${
                    attend === val
                      ? "border-gold-400 bg-gold-500 text-pine-950 shadow-[0_0_20px_rgba(200,169,97,0.3)]"
                      : "border-gold-500/25 text-sage-300 hover:border-gold-500/60 hover:text-gold-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {attend === "hadir" && (
              <>
                <label htmlFor="w-guests" className="mt-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400">
                  <IconUsers className="size-4" /> Jumlah Tamu
                </label>
                <div id="w-guests" className="mt-2.5 flex w-fit items-center border border-gold-500/25 rounded-[3px]">
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    disabled={guests <= 1}
                    className="flex size-11 items-center justify-center text-lg text-gold-300 transition-colors hover:bg-pine-700 disabled:opacity-30"
                    aria-label="Kurangi jumlah tamu"
                  >
                    −
                  </button>
                  <span key={guests} className="tick w-12 text-center font-display text-xl text-gold-200">
                    {guests}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(2, g + 1))}
                    disabled={guests >= 2}
                    className="flex size-11 items-center justify-center text-lg text-gold-300 transition-colors hover:bg-pine-700 disabled:opacity-30"
                    aria-label="Tambah jumlah tamu"
                  >
                    +
                  </button>
                </div>
                <p className="mt-2 text-[11px] text-sage-300/60">Maksimal 2 tamu per undangan.</p>
              </>
            )}

            <label htmlFor="w-msg" className="mt-5 block text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400">
              Ucapan &amp; Doa
            </label>
            <textarea
              id="w-msg"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan doa terbaik Anda untuk kedua mempelai…"
              className={`${inputCls} mt-2.5 resize-none`}
            />

            {error && (
              <p role="alert" className="mt-3 border-l-2 border-rose-400/70 pl-3 text-xs text-rose-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-7 flex w-full items-center justify-center gap-3 bg-gold-500 px-6 py-4 text-xs font-extrabold uppercase tracking-[0.25em] text-pine-950 shadow-[0_10px_30px_rgba(200,169,97,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 active:translate-y-0"
            >
              <IconChat className="size-4" />
              Kirim Ucapan
            </button>
          </form>

          {/* ===== dinding ucapan ===== */}
          <div className="reveal from-right rd-2">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-2xl font-light italic text-ivory">Ucapan Doa</h3>
              <span className="border border-gold-500/30 px-3 py-1 text-xs font-bold text-gold-300">
                {all.length} ucapan
              </span>
            </div>

            <ul className="mt-6 max-h-[600px] space-y-4 overflow-y-auto pr-2">
              {all.map((w) => (
                <li
                  key={w.id}
                  className={`flex gap-4 border border-gold-500/12 bg-pine-800/50 p-5 transition-colors duration-300 hover:border-gold-500/35 ${
                    w.id === lastId ? "animate-[tick-pop_0.6s_cubic-bezier(0.16,1,0.3,1)] border-gold-500/50" : ""
                  }`}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/10 font-display text-lg italic text-gold-300">
                    {w.name.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-ivory">{w.name}</span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          w.attend === "hadir"
                            ? "border-gold-500/40 text-gold-300"
                            : "border-sage-500/40 text-sage-300"
                        }`}
                      >
                        {w.attend === "hadir" ? `Hadir · ${w.guests} org` : "Berhalangan"}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-sage-300/60">{timeAgo(w.ts)}</p>
                    <p className="mt-2 text-sm leading-relaxed text-sage-300/95">{w.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* toast */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-24 left-1/2 z-[95] flex -translate-x-1/2 items-center gap-2.5 bg-gold-500 px-6 py-3.5 text-xs font-extrabold uppercase tracking-[0.18em] text-pine-950 shadow-[0_16px_44px_rgba(200,169,97,0.4)] animate-[tick-pop_0.5s_cubic-bezier(0.16,1,0.3,1)]"
        >
          <IconCheck className="size-4" />
          Terima kasih! Ucapan tersimpan
        </div>
      )}
    </section>
  );
}
