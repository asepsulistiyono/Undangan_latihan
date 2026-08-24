/* ════════════════════════════════════════════════════════════════════
   UNDANGAN PERNIKAHAN — RAKA & LARAS (HTML · CSS · JavaScript murni)
   ════════════════════════════════════════════════════════════════════ */

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const WEDDING_DATE = new Date("2026-12-12T08:00:00+07:00");
const WISHES_KEY = "raka-laras-wishes-v1";

/* ────────────────────────── musik kotak musik ────────────────────────── */
const midi = (m) => 440 * Math.pow(2, (m - 69) / 12);
const PROGRESSION = [
  [48, 55, 60, 64], // C
  [45, 52, 57, 60], // Am
  [41, 48, 53, 57], // F
  [43, 50, 55, 59], // G
];
const PATTERN = [0, 2, 1, 3, 2, 3, 1, 2];
const MELODY = [null, 3, null, 2, null, 3, 1, null];
const STEP_MS = 300;

const musicBox = {
  ctx: null,
  master: null,
  timer: null,
  step: 0,
  playing: false,

  ensure() {
    if (this.ctx) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.5;
    const delay = this.ctx.createDelay(1.2);
    delay.delayTime.value = 0.34;
    const fb = this.ctx.createGain();
    fb.gain.value = 0.32;
    const wet = this.ctx.createGain();
    wet.gain.value = 0.22;
    delay.connect(fb);
    fb.connect(delay);
    delay.connect(wet);
    wet.connect(this.ctx.destination);
    this.master.connect(this.ctx.destination);
    this.master.connect(delay);
  },

  note(freq, when, peak, dur) {
    const { ctx, master } = this;
    if (!ctx || !master) return;
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = freq;
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = freq * 2.001;
    const g = ctx.createGain();
    const g2 = ctx.createGain();
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(peak, when + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    g2.gain.setValueAtTime(0, when);
    g2.gain.linearRampToValueAtTime(peak * 0.18, when + 0.01);
    g2.gain.exponentialRampToValueAtTime(0.0001, when + dur * 0.6);
    osc.connect(g); g2.connect(g2);
    g.connect(master); g2.connect(master);
    osc.start(when); osc2.start(when);
    osc.stop(when + dur + 0.05);
    osc2.stop(when + dur + 0.05);
  },

  tick() {
    if (!this.ctx) return;
    const bar = Math.floor(this.step / PATTERN.length) % PROGRESSION.length;
    const chord = PROGRESSION[bar];
    const inBar = this.step % PATTERN.length;
    const when = this.ctx.currentTime + 0.03;
    this.note(midi(chord[PATTERN[inBar]]), when, 0.16, 1.5);
    if (inBar === 0) this.note(midi(chord[0] - 12), when, 0.1, 2.2);
    const m = MELODY[inBar];
    if (m !== null) this.note(midi(chord[m] + 12), when, 0.09, 1.1);
    this.step += 1;
  },

  start() {
    this.ensure();
    if (!this.ctx || this.playing) return;
    if (this.ctx.state === "suspended") this.ctx.resume();
    this.playing = true;
    this.tick();
    this.timer = window.setInterval(() => this.tick(), STEP_MS);
  },

  stop() {
    this.playing = false;
    if (this.timer !== null) { window.clearInterval(this.timer); this.timer = null; }
    if (this.ctx && this.master) {
      const t = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(t);
      this.master.gain.setValueAtTime(this.master.gain.value, t);
      this.master.gain.linearRampToValueAtTime(0.0001, t + 0.4);
      window.setTimeout(() => { if (this.master && !this.playing) this.master.gain.value = 0.5; }, 450);
    }
  },

  toggle() {
    if (this.playing) this.stop(); else this.start();
    return this.playing;
  },
};

/* ────────────────────────── nama tamu dari URL ────────────────────────── */
function initGuestName() {
  const to = new URLSearchParams(window.location.search).get("to");
  if (to) $("#guestName").textContent = to;
}

/* ────────────────────────── sampul undangan ────────────────────────── */
function initCover() {
  const cover = $("#cover");
  $("#openBtn").addEventListener("click", () => {
    document.body.classList.remove("no-scroll");
    cover.classList.add("is-open");
    musicBox.start();
    syncMusicButton();
    $("#navbar").classList.add("show");
    const mb = $("#musicBtn");
    mb.hidden = false;
    mb.style.animation = "popIn .6s cubic-bezier(.22,1.4,.36,1) both";
    window.setTimeout(() => cover.remove(), 1200);
  });
}

function syncMusicButton() {
  const btn = $("#musicBtn");
  btn.classList.toggle("playing", musicBox.playing);
  btn.setAttribute("aria-label", musicBox.playing ? "Matikan musik" : "Putar musik");
}

function initMusic() {
  $("#musicBtn").addEventListener("click", () => {
    musicBox.toggle();
    syncMusicButton();
  });
}

/* ────────────────────────── hitung mundur ────────────────────────── */
function initCountdown() {
  const els = { d: $("#cdD"), h: $("#cdH"), m: $("#cdM"), s: $("#cdS") };
  const setVal = (el, v) => {
    const txt = String(v).padStart(2, "0");
    if (el.textContent !== txt) {
      el.textContent = txt;
      el.classList.remove("pop");
      void el.offsetWidth; // mulai ulang animasi
      el.classList.add("pop");
    }
  };
  const tick = () => {
    const diff = WEDDING_DATE.getTime() - Date.now();
    if (diff <= 0) {
      $(".count-cells").style.display = "none";
      $("#cdPassed").hidden = false;
      return;
    }
    setVal(els.d, Math.floor(diff / 86_400_000));
    setVal(els.h, Math.floor(diff / 3_600_000) % 24);
    setVal(els.m, Math.floor(diff / 60_000) % 60);
    setVal(els.s, Math.floor(diff / 1_000) % 60);
  };
  tick();
  window.setInterval(tick, 1000);
}

/* ────────────────────────── reveal saat digulir ────────────────────────── */
function initReveal() {
  const targets = $$(".reveal, .reveal-left, .reveal-right, .reveal-scale");
  if (!("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
  );
  targets.forEach((t) => io.observe(t));
}

/* ────────────────────────── nav: scrollspy + progres ────────────────────────── */
function initNav() {
  const links = $$(".nav-link");
  const ids = links.map((l) => l.dataset.sec);
  const progressBar = $("#progressBar");
  let raf = 0;

  const update = () => {
    const mid = window.innerHeight * 0.4;
    let current = ids[0];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= mid) current = id;
    });
    links.forEach((l) => l.classList.toggle("is-active", l.dataset.sec === current));

    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progressBar.style.width = pct + "%";
  };

  window.addEventListener("scroll", () => {
    window.cancelAnimationFrame(raf);
    raf = window.requestAnimationFrame(update);
  }, { passive: true });
  update();
}

/* ────────────────────────── kelopak bunga jatuh ────────────────────────── */
function initPetals() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const host = $("#petals");
  const colors = ["#c9a24b", "#e8d395", "#3b7d66", "#d9b968"];
  const NS = "http://www.w3.org/2000/svg";
  for (let i = 0; i < 14; i += 1) {
    const r = Math.random;
    const span = document.createElement("span");
    span.className = "petal";
    const size = Math.round(9 + r() * 9);
    span.style.left = Math.round(r() * 100) + "%";
    span.style.setProperty("--dur", (13 + r() * 11).toFixed(1) + "s");
    span.style.setProperty("--delay", (-r() * 22).toFixed(1) + "s");
    span.style.setProperty("--sway", Math.round(20 + r() * 55) + "px");
    span.style.setProperty("--po", (0.2 + r() * 0.45).toFixed(2));
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.setAttribute("viewBox", "0 0 20 20");
    const path = document.createElementNS(NS, "path");
    path.setAttribute("d", "M10 1C14 5 16 9 10 19C4 9 6 5 10 1Z");
    path.setAttribute("fill", colors[Math.floor(r() * colors.length)]);
    path.setAttribute("opacity", "0.85");
    svg.appendChild(path);
    span.appendChild(svg);
    host.appendChild(span);
  }
}

/* ────────────────────────── galeri + lightbox ────────────────────────── */
function initGallery() {
  const items = $$(".ga[data-cap]");
  const box = $("#lightbox");
  const img = $("#lbImg");
  const cap = $("#lbCap");
  const count = $("#lbCount");
  let idx = 0;

  const show = (i) => {
    idx = (i + items.length) % items.length;
    const el = items[idx];
    img.src = $("img", el).src;
    img.alt = el.dataset.cap;
    cap.textContent = el.dataset.cap;
    count.textContent = (idx + 1) + " / " + items.length;
    box.classList.add("open");
    box.setAttribute("aria-hidden", "false");
  };
  const close = () => {
    box.classList.remove("open");
    box.setAttribute("aria-hidden", "true");
  };

  items.forEach((el, i) => el.addEventListener("click", () => show(i)));
  $("#lbClose").addEventListener("click", close);
  $("#lbPrev").addEventListener("click", (e) => { e.stopPropagation(); show(idx - 1); });
  $("#lbNext").addEventListener("click", (e) => { e.stopPropagation(); show(idx + 1); });
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  window.addEventListener("keydown", (e) => {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });
}

/* ────────────────────────── salin ke papan klip ────────────────────────── */
async function copyText(text) {
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
      ta.remove();
      return true;
    } catch {
      return false;
    }
  }
}

function initCopy() {
  $$(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (await copyText(btn.dataset.copy)) {
        const label = $(".copy-label", btn);
        const old = label.textContent;
        btn.classList.add("done");
        label.textContent = "Tersalin!";
        window.setTimeout(() => {
          btn.classList.remove("done");
          label.textContent = old;
        }, 2200);
      }
    });
  });
}

/* ────────────────────────── RSVP & ucapan ────────────────────────── */
const H = 3_600_000;
const SEED_WISHES = [
  { id: "seed-1", name: "Nadia & Bimo", attendance: "hadir", at: Date.now() - 26 * H,
    message: "Barakallahu laka wa baraka 'alaika. Selamat menempuh hidup baru, Raka & Laras! Sampai jumpa di hari bahagia." },
  { id: "seed-2", name: "Tante Ratna", attendance: "hadir", at: Date.now() - 20 * H,
    message: "Alhamdulillah, akhirnya sampai di hari yang dinanti. Doa terbaik dari kami sekeluarga di Bandung." },
  { id: "seed-3", name: "Dimas Prasetyo", attendance: "ragu", at: Date.now() - 7 * H,
    message: "Selamat bro! Semoga jadi keluarga sakinah mawaddah warahmah. Kabari kalau butuh bantuan apa pun." },
  { id: "seed-4", name: "Keluarga Besar Mahendra", attendance: "hadir", at: Date.now() - 2 * H,
    message: "Selamat berbahagia, Laras & Raka. Semoga cinta kalian tumbuh seperti taman yang tak pernah kering." },
];

const BADGE = {
  hadir: { label: "Berkenan Hadir", cls: "b-hadir" },
  berhalangan: { label: "Berhalangan", cls: "b-berhalangan" },
  ragu: { label: "Masih Ragu", cls: "b-ragu" },
};

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function timeAgo(ts) {
  const d = Date.now() - ts;
  if (d < 60_000) return "Baru saja";
  if (d < H) return Math.floor(d / 60_000) + " menit lalu";
  if (d < 24 * H) return Math.floor(d / H) + " jam lalu";
  return Math.floor(d / (24 * H)) + " hari lalu";
}

function wishHTML(w) {
  const badge = BADGE[w.attendance] || BADGE.hadir;
  const av = (w.name.charCodeAt(0) + w.name.length) % 5;
  return `
    <div class="wish-body">
      <div class="wish-top">
        <span class="wish-name">${esc(w.name)}</span>
        <span class="wish-badge ${badge.cls}">${badge.label}</span>
        <span class="wish-time">${timeAgo(w.at)}</span>
      </div>
      <p class="wish-msg">${esc(w.message)}</p>
    </div>`;
}

function loadWishes() {
  try {
    const raw = localStorage.getItem(WISHES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch { /* abaikan */ }
  return SEED_WISHES;
}

function initRsvp() {
  let wishes = loadWishes();
  const list = $("#wishList");
  const countEl = $("#wishCount");
  const nameInput = $("#wishName");
  const msgInput = $("#wishMsg");
  const charCount = $("#charCount");
  const errEl = $("#formError");
  const submitBtn = $("#wishSubmit");
  const submitLabel = $(".submit-label", submitBtn);
  let attendance = "hadir";
  let sentTimer = null;

  const persist = () => {
    try { localStorage.setItem(WISHES_KEY, JSON.stringify(wishes)); } catch { /* abaikan */ }
  };

  const addWishEl = (w, animate) => {
    const li = document.createElement("li");
    li.className = "wish" + (animate ? " pop-in" : "");
    const av = (w.name.charCodeAt(0) + w.name.length) % 5;
    li.innerHTML =
      `<span class="wish-avatar av-${av}">${esc(w.name.charAt(0).toUpperCase())}</span>` +
      wishHTML(w);
    return li;
  };

  const render = () => {
    list.textContent = "";
    wishes.forEach((w) => list.appendChild(addWishEl(w, false)));
    countEl.textContent = wishes.length + " ucapan";
  };

  $$(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      $$(".chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      attendance = chip.dataset.att;
    });
  });

  msgInput.addEventListener("input", () => {
    charCount.textContent = msgInput.value.length + "/400";
  });

  $("#wishForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const message = msgInput.value.trim();
    if (!name || !message) {
      errEl.hidden = false;
      return;
    }
    errEl.hidden = true;

    const wish = {
      id: "w-" + Date.now(),
      name: name.slice(0, 60),
      attendance,
      message: message.slice(0, 400),
      at: Date.now(),
    };
    wishes = [wish, ...wishes];
    persist();

    list.prepend(addWishEl(wish, true));
    countEl.textContent = wishes.length + " ucapan";

    nameInput.value = "";
    msgInput.value = "";
    charCount.textContent = "0/400";

    submitBtn.classList.add("sent");
    submitBtn.disabled = true;
    submitLabel.textContent = "Terkirim — Terima Kasih";
    window.clearTimeout(sentTimer);
    sentTimer = window.setTimeout(() => {
      submitBtn.classList.remove("sent");
      submitBtn.disabled = false;
      submitLabel.textContent = "Kirim Ucapan";
    }, 2400);
  });

  render();
}

/* ────────────────────────── mulai semuanya ────────────────────────── */
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);

initGuestName();
initCover();
initMusic();
initCountdown();
initReveal();
initNav();
initPetals();
initGallery();
initCopy();
initRsvp();
