export const IMG = {
  hero: "https://image.qwenlm.ai/generated-images/c7a005ab-60cd-4af6-a501-56b105912776/_result.png",
  bride: "https://image.qwenlm.ai/generated-images/3f8bf4b6-0973-4e3f-96f2-492a34e99cc4/_result.png",
  groom: "https://image.qwenlm.ai/generated-images/f9d7a546-3f5b-4fdc-90a6-121b99d8533c/_result.png",
  rings: "https://image.qwenlm.ai/generated-images/72bbe85d-5f02-4c48-88e0-9712ecf8098d/_result.png",
  walk: "https://image.qwenlm.ai/generated-images/d38a9199-eec5-40ad-8b74-1807f54bd49e/_result.png",
  bouquet: "https://image.qwenlm.ai/generated-images/3121502a-99d4-444d-b4ee-ae396472c5f9/_result.png",
  venue: "https://image.qwenlm.ai/generated-images/62db5103-74ca-457d-86db-f9f677136d56/_result.png",
};

export const WEDDING = {
  initials: "R·S", // inisial di logo bulat & navigasi
  dateLabel: "Sabtu, 12 Juni 2027",
  dateShort: "12 · 06 · 2027",
  dateISO: "2027-06-12T08:00:00+07:00",
  city: "Jakarta Selatan",
  venueMain: "Plataran Cilandak",

  groom: {
    short: "Raka",
    full: "Raka Adyatma Prasetya",
    parents:
      "Putra pertama dari Bapak Hendra Prasetya & Ibu Wulan Kusuma — Jakarta",
    ig: "rakaadyatma",
    photo: IMG.groom,
    bio: "Arsitek yang percaya bahwa rumah terbaik adalah tempat kita pulang.",
  },
  bride: {
    short: "Sekar",
    full: "Sekar Ayu Larasati",
    parents:
      "Putri kedua dari Bapak Bimo Laras & Ibu Ratna Dewi — Yogyakarta",
    ig: "sekarlaras",
    photo: IMG.bride,
    bio: "Penata bunga yang menemukan taman paling indah di hati Raka.",
  },

  quote: {
    arabic:
      "وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةًۗ",
    text: "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum : 21",
  },

  events: [
    {
      id: "akad",
      name: "Akad Nikah",
      date: "Sabtu, 12 Juni 2027",
      time: "08.00 – 10.00 WIB",
      venue: "Pendopo Ageng · Plataran Cilandak",
      address: "Jl. Cilandak Tengah Raya No.14, Cilandak, Jakarta Selatan",
      maps: "https://maps.google.com/?q=Plataran+Cilandak+Jakarta+Selatan",
      note: "Mohon hadir 30 menit sebelumnya. Pakaian adat & batik dipersilakan.",
    },
    {
      id: "resepsi",
      name: "Resepsi Pernikahan",
      date: "Sabtu, 12 Juni 2027",
      time: "11.00 – 14.00 WIB",
      venue: "Glass Pavilion · Plataran Cilandak",
      address: "Jl. Cilandak Tengah Raya No.14, Cilandak, Jakarta Selatan",
      maps: "https://maps.google.com/?q=Plataran+Cilandak+Jakarta+Selatan",
      note: "Doa restu Anda adalah kado terindah. Dress code: sage, emerald & gold.",
    },
  ],

  story: [
    {
      year: "2019",
      title: "Pertama Berjumpa",
      text: "Di sebuah pameran arsitektur di Jakarta, Sekar menjatuhkan sketsanya — dan Raka memungutnya sambil pura-pura paham soal bunga. Obrolan singkat itu ternyata tak pernah benar-benar selesai.",
    },
    {
      year: "2021",
      title: "Menyemai Rasa",
      text: "Dari kopi sore menjadi perjalanan jauh: Dieng, Bromo, hingga hujan-hujanan di Malioboro. Kami belajar bahwa cinta tumbuh paling subur saat dirawat bersama.",
    },
    {
      year: "2025",
      title: "Lamaran",
      text: "Di bawah langit senja Pantai Parangtritis, dengan debur ombak sebagai saksi, Raka berlutut membawa cincin dan seluruh keberaniannya. Sekar menjawab: iya.",
    },
    {
      year: "2027",
      title: "Menyempurnakan Janji",
      text: "Dengan restu kedua keluarga dan doa orang-orang tercinta, kami melangkah ke hari yang dinanti — mengikat janji sehidup semati di hadapan Tuhan.",
    },
  ],

  gallery: [
    { src: IMG.venue, caption: "Rumah kaca, tempat kami berjanji", tall: false, wide: true },
    { src: IMG.walk, caption: "Berjalan searah, selamanya", tall: true, wide: false },
    { src: IMG.rings, caption: "Dua cincin, satu janji", tall: false, wide: false },
    { src: IMG.bouquet, caption: "Buket untuk mempelai", tall: false, wide: false },
    { src: IMG.hero, caption: "Di antara hijau & keemasan", tall: false, wide: true },
    { src: IMG.groom, caption: "Sang mempelai pria", tall: false, wide: false },
    { src: IMG.bride, caption: "Sang mempelai wanita", tall: false, wide: false },
  ],

  gifts: [
    { bank: "BCA", number: "1234 5678 90", holder: "Raka Adyatma P." },
    { bank: "Mandiri", number: "9876 5432 10", holder: "Sekar Ayu L." },
  ],
  giftAddress: "Jl. Kenanga VIII No. 12, Kebayoran Baru, Jakarta Selatan 12160",

  dresscode: [
    { name: "Sage", hex: "#a9c3ad" },
    { name: "Emerald", hex: "#2f6b4f" },
    { name: "Gold", hex: "#c8a961" },
  ],
};

export const CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=" +
  encodeURIComponent(`Pernikahan ${WEDDING.groom.short} & ${WEDDING.bride.short}`) +
  "&dates=20270612T010000Z/20270612T070000Z" +
  "&details=" +
  encodeURIComponent(
    "Akad Nikah 08.00 WIB — Resepsi 11.00–14.00 WIB di Plataran Cilandak, Jakarta Selatan. Dress code: sage, emerald & gold."
  ) +
  "&location=" + encodeURIComponent("Plataran Cilandak, Jakarta Selatan");

export function getGuestName(): string {
  if (typeof window === "undefined") return "Tamu Undangan";
  const q = new URLSearchParams(window.location.search);
  return q.get("to") || q.get("kepada") || "Tamu Undangan";
}

export function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "baru saja";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} menit lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d} hari lalu`;
  return new Date(ts).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}
