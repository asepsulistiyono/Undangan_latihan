/**
 * Sistem translations untuk undangan pernikahan
 * Support: Indonesia (id) dan English (en)
 */

export type Language = "id" | "en";

export interface Translations {
  // Cover
  cover: {
    invitation: string;
    to: string;
    apology: string;
    open: string;
    scrollHint: string;
  };
  
  // Days
  days: {
    minggu: string;
    senin: string;
    selasa: string;
    rabu: string;
    kamis: string;
    jumat: string;
    sabtu: string;
  };
  
  // Months
  months: {
    januari: string;
    februari: string;
    maret: string;
    april: string;
    mei: string;
    juni: string;
    juli: string;
    agustus: string;
    september: string;
    oktober: string;
    november: string;
    desember: string;
  };
  
  // Hero
  hero: {
    weAreGettingMarried: string;
    countdown: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  
  // Couple
  couple: {
    bismillah: string;
    theBrideAndGroom: string;
    subtitle: string;
  };
  
  // Events
  events: {
    saveTheDate: string;
    eventSeries: string;
    saveToCalendar: string;
    dressCode: string;
    viewLocation: string;
  };
  
  // Story
  story: {
    ourJourney: string;
    ourStory: string;
    subtitle: string;
  };
  
  // Gallery
  gallery: {
    throughTheLens: string;
    momentGallery: string;
    subtitle: string;
  };
  
  // Gift
  gift: {
    tokenOfLove: string;
    mostBeautifulGift: string;
    subtitle: string;
    sendGift: string;
    copyAddress: string;
    copyNumber: string;
    copied: string;
  };
  
  // Wishes
  wishes: {
    prayersAndHopes: string;
    confirmationAndWishes: string;
    subtitle: string;
    sendWishes: string;
    name: string;
    attendance: string;
    willAttend: string;
    cannotAttend: string;
    numberOfGuests: string;
    message: string;
    wishesWall: string;
    attending: string;
    notAttending: string;
    ago: string;
    justNow: string;
    minutesAgo: string;
    hoursAgo: string;
    daysAgo: string;
  };
  
  // Closing
  closing: {
    thankYou: string;
    subtitle: string;
    withFamily: string;
  };
  
  // Common
  common: {
    and: string;
    at: string;
    on: string;
  };
}

export const translations: Record<Language, Translations> = {
  id: {
    cover: {
      invitation: "Undangan Pernikahan",
      to: "Kepada Yth. Bapak/Ibu/Saudara/i",
      apology: "Mohon maaf apabila terdapat kesalahan penulisan nama & gelar.",
      open: "Buka",
      scrollHint: "Gulir",
    },
    days: {
      minggu: "Minggu",
      senin: "Senin",
      selasa: "Selasa",
      rabu: "Rabu",
      kamis: "Kamis",
      jumat: "Jumat",
      sabtu: "Sabtu",
    },
    months: {
      januari: "Januari",
      februari: "Februari",
      maret: "Maret",
      april: "April",
      mei: "Mei",
      juni: "Juni",
      juli: "Juli",
      agustus: "Agustus",
      september: "September",
      oktober: "Oktober",
      november: "November",
      desember: "Desember",
    },
    hero: {
      weAreGettingMarried: "Kami Menikah — Assalamu'alaikum Wr. Wb.",
      countdown: "Menghitung Hari",
      days: "Hari",
      hours: "Jam",
      minutes: "Menit",
      seconds: "Detik",
    },
    couple: {
      bismillah: "Bismillahirrahmanirrahim",
      theBrideAndGroom: "Kedua Mempelai",
      subtitle: "Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang insyaAllah akan berjalan beriringan.",
    },
    events: {
      saveTheDate: "Simpan Tanggalnya",
      eventSeries: "Rangkaian Acara",
      saveToCalendar: "Simpan ke Google Kalender",
      dressCode: "Dress Code",
      viewLocation: "Lihat Lokasi",
    },
    story: {
      ourJourney: "Perjalanan Kami",
      ourStory: "Kisah Kami",
      subtitle: "Empat bab yang membawa kami ke altar — dari pertemuan yang tak disengaja hingga janji yang akan segera diikrarkan.",
    },
    gallery: {
      throughTheLens: "Lewat Lensa",
      momentGallery: "Galeri Momen",
      subtitle: "Potongan-potongan kecil dari perjalanan kami — cahaya, tawa, dan hijau dedaunan yang menjadi saksi.",
    },
    gift: {
      tokenOfLove: "Tanda Kasih",
      mostBeautifulGift: "Kado Terindah",
      subtitle: "Doa restu Anda adalah karunia yang paling berarti bagi kami. Namun bila memberi merupakan ungkapan kasih, tanda kasih dapat disalurkan melalui:",
      sendGift: "Kirim Hadiah",
      copyAddress: "Salin Alamat",
      copyNumber: "Salin Nomor",
      copied: "Tersalin!",
    },
    wishes: {
      prayersAndHopes: "Doa & Harapan",
      confirmationAndWishes: "Konfirmasi & Ucapan",
      subtitle: "Kehadiran dan doa restu Anda adalah kehormatan bagi kami. Sampaikan konfirmasi kehadiran serta untaian doa terbaik.",
      sendWishes: "Kirim Ucapan",
      name: "Nama",
      attendance: "Konfirmasi Kehadiran",
      willAttend: "InsyaAllah Hadir",
      cannotAttend: "Mohon Maaf, Berhalangan",
      numberOfGuests: "Jumlah Tamu",
      message: "Ucapan & Doa",
      wishesWall: "Ucapan Doa",
      attending: "Hadir",
      notAttending: "Berhalangan",
      ago: "yang lalu",
      justNow: "baru saja",
      minutesAgo: "menit lalu",
      hoursAgo: "jam lalu",
      daysAgo: "hari lalu",
    },
    closing: {
      thankYou: "Terima Kasih",
      subtitle: "Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas perhatian dan doa baiknya, kami mengucapkan terima kasih.",
      withFamily: "Beserta keluarga besar",
    },
    common: {
      and: "&",
      at: "di",
      on: "pada",
    },
  },
  en: {
    cover: {
      invitation: "Wedding Invitation",
      to: "To Mr./Mrs./Ms.",
      apology: "We apologize for any errors in writing the name & title.",
      open: "Open",
      scrollHint: "Scroll",
    },
    days: {
      minggu: "Sunday",
      senin: "Monday",
      selasa: "Tuesday",
      rabu: "Wednesday",
      kamis: "Thursday",
      jumat: "Friday",
      sabtu: "Saturday",
    },
    months: {
      januari: "January",
      februari: "February",
      maret: "March",
      april: "April",
      mei: "May",
      juni: "June",
      juli: "July",
      agustus: "August",
      september: "September",
      oktober: "October",
      november: "November",
      desember: "December",
    },
    hero: {
      weAreGettingMarried: "We Are Getting Married",
      countdown: "Counting The Days",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
    couple: {
      bismillah: "In The Name of Allah",
      theBrideAndGroom: "The Bride & Groom",
      subtitle: "With the blessings of Allah SWT, we intend to hold the wedding of our children — two hearts that will walk together in life.",
    },
    events: {
      saveTheDate: "Save The Date",
      eventSeries: "Event Series",
      saveToCalendar: "Save to Google Calendar",
      dressCode: "Dress Code",
      viewLocation: "View Location",
    },
    story: {
      ourJourney: "Our Journey",
      ourStory: "Our Story",
      subtitle: "Four chapters that brought us to the altar — from an unexpected meeting to a promise that will soon be sealed.",
    },
    gallery: {
      throughTheLens: "Through The Lens",
      momentGallery: "Moment Gallery",
      subtitle: "Small pieces of our journey — light, laughter, and greenery that witnessed our love.",
    },
    gift: {
      tokenOfLove: "Token of Love",
      mostBeautifulGift: "Most Beautiful Gift",
      subtitle: "Your blessings are the most meaningful gift for us. However, if you wish to give, you can send it through:",
      sendGift: "Send Gift",
      copyAddress: "Copy Address",
      copyNumber: "Copy Number",
      copied: "Copied!",
    },
    wishes: {
      prayersAndHopes: "Prayers & Hopes",
      confirmationAndWishes: "Confirmation & Wishes",
      subtitle: "Your presence and blessings are an honor for us. Please confirm your attendance and share your best wishes.",
      sendWishes: "Send Wishes",
      name: "Name",
      attendance: "Attendance Confirmation",
      willAttend: "Will Attend",
      cannotAttend: "Cannot Attend",
      numberOfGuests: "Number of Guests",
      message: "Message & Prayer",
      wishesWall: "Wishes Wall",
      attending: "Attending",
      notAttending: "Not Attending",
      ago: "ago",
      justNow: "just now",
      minutesAgo: "minutes ago",
      hoursAgo: "hours ago",
      daysAgo: "days ago",
    },
    closing: {
      thankYou: "Thank You",
      subtitle: "It would be a joy and honor for us if you could attend and give your blessings. Thank you for your attention and prayers.",
      withFamily: "With the family",
    },
    common: {
      and: "&",
      at: "at",
      on: "on",
    },
  },
};

/**
 * Hook untuk mendapatkan translations berdasarkan bahasa
 */
export function useTranslations(lang: Language = "id"): Translations {
  return translations[lang];
}

/**
 * Translate date from Indonesian to English
 * Example: "Sabtu, 12 Juni 2027" → "Saturday, 12 June 2027"
 */
export function translateDate(dateStr: string, lang: Language): string {
  if (lang === "id") return dateStr;
  
  const t = translations.en;
  let result = dateStr;
  
  // Translate days
  result = result.replace(/\bMinggu\b/i, t.days.minggu);
  result = result.replace(/\bSenin\b/i, t.days.senin);
  result = result.replace(/\bSelasa\b/i, t.days.selasa);
  result = result.replace(/\bRabu\b/i, t.days.rabu);
  result = result.replace(/\bKamis\b/i, t.days.kamis);
  result = result.replace(/\bJumat\b/i, t.days.jumat);
  result = result.replace(/\bSabtu\b/i, t.days.sabtu);
  
  // Translate months
  result = result.replace(/\bJanuari\b/i, t.months.januari);
  result = result.replace(/\bFebruari\b/i, t.months.februari);
  result = result.replace(/\bMaret\b/i, t.months.maret);
  result = result.replace(/\bApril\b/i, t.months.april);
  result = result.replace(/\bMei\b/i, t.months.mei);
  result = result.replace(/\bJuni\b/i, t.months.juni);
  result = result.replace(/\bJuli\b/i, t.months.juli);
  result = result.replace(/\bAgustus\b/i, t.months.agustus);
  result = result.replace(/\bSeptember\b/i, t.months.september);
  result = result.replace(/\bOktober\b/i, t.months.oktober);
  result = result.replace(/\bNovember\b/i, t.months.november);
  result = result.replace(/\bDesember\b/i, t.months.desember);
  
  return result;
}
