export const IMAGES = {
  couple:
    "https://image.qwenlm.ai/generated-images/bbb151e9-608d-4e33-bb0f-4828f6f35674/_result.png",
  hands:
    "https://image.qwenlm.ai/generated-images/7cabbb4c-fd41-48b7-b4dd-87701c319e69/_result.png",
  table:
    "https://image.qwenlm.ai/generated-images/62d6e25b-4e9e-41bf-a0ca-ed39f9c721ad/_result.png",
  candid:
    "https://image.qwenlm.ai/generated-images/457f578d-48c2-499a-8583-f416989e6ea9/_result.png",
  lamaran:
    "https://image.qwenlm.ai/generated-images/9cead132-7520-4505-93e1-2280ca7ed40d/_result.png",
};

export const WEDDING = {
  dateISO: "2026-12-12T08:00:00+07:00",
  dateShort: "12 . 12 . 2026",
  dateLong: "Sabtu, 12 Desember 2026",
  city: "Jakarta",
  hashtag: "#RakaLarasMenikah",
  groom: {
    name: "Raka Aditya Pratama",
    short: "Raka",
    initial: "R",
    child: "Putra pertama dari",
    parents: "Bapak Hendra Pratama & Ibu Sari Wulandari",
    ig: "@raka.aditya",
  },
  bride: {
    name: "Larasati Maheswari",
    short: "Laras",
    initial: "L",
    child: "Putri kedua dari",
    parents: "Bapak Bagas Mahendra & Ibu Dewi Anjani",
    ig: "@larasmaheswari",
  },
};

export const EVENTS = [
  {
    id: "akad",
    name: "Akad Nikah",
    time: "08.00 – 10.00 WIB",
    venue: "Masjid Agung Al-Azhar",
    address: "Jl. Sisingamangaraja No. 1, Kebayoran Baru, Jakarta Selatan",
    mapQuery: "Masjid Agung Al-Azhar, Jakarta Selatan",
    dressnote: "Busana muslim bernuansa hijau sage & krem",
  },
  {
    id: "resepsi",
    name: "Resepsi",
    time: "11.00 – 14.00 WIB",
    venue: "The Kasablanka — Grand Ballroom",
    address: "Kota Kasablanka Lt. 2, Jl. Casablanca Raya Kav. 88, Jakarta Selatan",
    mapQuery: "The Kasablanka, Kota Kasablanka Jakarta",
    dressnote: "Formal — sentuhan emerald & gold",
  },
];

export const CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=Pernikahan%20Raka%20%26%20Laras" +
  "&dates=20261212T010000Z/20261212T070000Z" +
  "&details=Akad%20Nikah%20%26%20Resepsi%20Pernikahan%20Raka%20%26%20Laras" +
  "&location=The%20Kasablanka%2C%20Kota%20Kasablanka%2C%20Jakarta";

export const STORY = [
  {
    year: "2019",
    title: "Pertama Bertemu",
    image: IMAGES.candid,
    text: "Berawal dari satu kelompok KKN di lereng Merapi — obrolan panjang di pos ronda yang tak pernah benar-benar selesai hingga hari ini.",
  },
  {
    year: "2025",
    title: "Lamaran",
    image: IMAGES.lamaran,
    text: "Dengan restu kedua keluarga, Raka menyematkan cincin dan mengikat janji — disaksikan hangatnya doa di sebuah sore bulan Juni.",
  },
  {
    year: "2026",
    title: "Menikah",
    image: IMAGES.hands,
    text: "InsyaAllah, dua keluarga menjadi satu. Kami memohon doa restu untuk memulai babak baru kehidupan kami bersama.",
  },
];

export const GALLERY = [
  { src: IMAGES.couple, caption: "Menuju hari bahagia", tall: true },
  { src: IMAGES.candid, caption: "Tawa yang sama sejak 2019", tall: false },
  { src: IMAGES.hands, caption: "Janji yang tersemat", tall: false },
  { src: IMAGES.lamaran, caption: "Lamaran, Juni 2025", tall: false },
  { src: IMAGES.table, caption: "Menanti kedatangan Anda", tall: false },
];

export const GIFTS = {
  banks: [
    { bank: "BCA", number: "2841 0394 75", raw: "2841039475", name: "Raka Aditya Pratama" },
    { bank: "Mandiri", number: "1270 0099 8821", raw: "127000998821", name: "Larasati Maheswari" },
  ],
  address:
    "Raka & Laras — Jl. Kemang Timur No. 27, RT 04/RW 02, Bangka, Mampang Prapatan, Jakarta Selatan 12730",
  addressShort: "Jl. Kemang Timur No. 27, Jakarta Selatan 12730",
};

export type Attendance = "hadir" | "berhalangan" | "ragu";

export interface Wish {
  id: string;
  name: string;
  attendance: Attendance;
  message: string;
  at: number;
  seed?: boolean;
}

const h = 3_600_000;
export const SEED_WISHES: Wish[] = [
  {
    id: "seed-1",
    name: "Nadia & Bimo",
    attendance: "hadir",
    message:
      "Barakallahu laka wa baraka 'alaika. Selamat menempuh hidup baru, Raka & Laras! Sampai jumpa di hari bahagia.",
    at: Date.now() - 26 * h,
    seed: true,
  },
  {
    id: "seed-2",
    name: "Tante Ratna",
    attendance: "hadir",
    message:
      "Alhamdulillah, akhirnya sampai di hari yang dinanti. Doa terbaik dari kami sekeluarga di Bandung.",
    at: Date.now() - 20 * h,
    seed: true,
  },
  {
    id: "seed-3",
    name: "Dimas Prasetyo",
    attendance: "ragu",
    message:
      "Selamat bro! Semoga jadi keluarga sakinah mawaddah warahmah. Kabari kalau butuh bantuan apa pun.",
    at: Date.now() - 7 * h,
    seed: true,
  },
  {
    id: "seed-4",
    name: "Keluarga Besar Mahendra",
    attendance: "hadir",
    message: "Selamat berbahagia, Laras & Raka. Semoga cinta kalian tumbuh seperti taman yang tak pernah kering.",
    at: Date.now() - 2 * h,
    seed: true,
  },
];
