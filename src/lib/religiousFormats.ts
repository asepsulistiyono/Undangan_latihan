/**
 * Sistem format penulisan berdasarkan agama
 * Support: Islam, Kristen (Protestan & Katolik), Hindu, Buddha, Konghucu, Universal
 */

export type ReligiousFormat = 
  | "islam" 
  | "kristen-protestan" 
  | "kristen-katolik" 
  | "hindu" 
  | "buddha" 
  | "konghucu" 
  | "universal";

export interface ReligiousFormatData {
  id: ReligiousFormat;
  name: string;
  nameEn: string;
  symbol: string;
  color: string;
  
  // Cover
  openingGreeting: string;
  openingGreetingEn: string;
  closingGreeting: string;
  closingGreetingEn: string;
  
  // Hero - Ayat/Kitab Suci
  scriptureTitle: string;
  scriptureTitleEn: string;
  defaultScripture: {
    arabic?: string; // Untuk Islam
    text: string;
    textEn: string;
    source: string;
  };
  
  // Couple Section
  coupleBlessing: string;
  coupleBlessingEn: string;
  coupleSubtitle: string;
  coupleSubtitleEn: string;
  
  // Closing
  closingBlessing: string;
  closingBlessingEn: string;
  
  // Wishes
  wishesPlaceholder: string;
  wishesPlaceholderEn: string;
}

export const religiousFormats: Record<ReligiousFormat, ReligiousFormatData> = {
  islam: {
    id: "islam",
    name: "Islam",
    nameEn: "Islam",
    symbol: "☪",
    color: "#2d5016",
    
    openingGreeting: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    openingGreetingEn: "Peace be upon you",
    closingGreeting: "Wassalamu'alaikum Warahmatullahi Wabarakatuh",
    closingGreetingEn: "And God Bless You",
    
    scriptureTitle: "Ayat Suci Al-Quran",
    scriptureTitleEn: "Holy Quran Verse",
    defaultScripture: {
      arabic: "وَمِنْ اٰيَاتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةًۗ",
      text: "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
      textEn: "And among His Signs is this, that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts.",
      source: "QS. Ar-Rum : 21",
    },
    
    coupleBlessing: "Bismillahirrahmanirrahim",
    coupleBlessingEn: "In The Name of Allah, The Most Gracious, The Most Merciful",
    coupleSubtitle: "Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang insyaAllah akan berjalan beriringan.",
    coupleSubtitleEn: "With the blessings of Allah SWT, we intend to hold the wedding of our children — two hearts that will walk together in life.",
    
    closingBlessing: "Semoga Allah SWT memberkahi pernikahan ini dan menjadikan keluarga yang sakinah, mawaddah, warahmah.",
    closingBlessingEn: "May Allah SWT bless this marriage and make it a family full of tranquility, love, and mercy.",
    
    wishesPlaceholder: "Tuliskan doa terbaik Anda untuk kedua mempelai…",
    wishesPlaceholderEn: "Write your best prayers for the couple…",
  },
  
  "kristen-protestan": {
    id: "kristen-protestan",
    name: "Kristen Protestan",
    nameEn: "Protestant Christian",
    symbol: "✝",
    color: "#1e40af",
    
    openingGreeting: "Shalom, Salam Sejahtera",
    openingGreetingEn: "Shalom, Peace Be With You",
    closingGreeting: "Tuhan Yesus Memberkati",
    closingGreetingEn: "God Bless You",
    
    scriptureTitle: "Firman Tuhan",
    scriptureTitleEn: "Word of God",
    defaultScripture: {
      text: "Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia.",
      textEn: "So they are no longer two, but one flesh. Therefore what God has joined together, let no one separate.",
      source: "Markus 10:8-9",
    },
    
    coupleBlessing: "Dalam Nama Tuhan Yesus Kristus",
    coupleBlessingEn: "In The Name of Lord Jesus Christ",
    coupleSubtitle: "Dengan memohon berkat dan rahmat Tuhan Yesus Kristus, kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang akan berjalan bersama dalam iman dan kasih.",
    coupleSubtitleEn: "With the blessings and grace of Lord Jesus Christ, we intend to hold the wedding of our children — two hearts that will walk together in faith and love.",
    
    closingBlessing: "Kiranya Tuhan Yesus Kristus memberkati pernikahan ini dan menjadikan keluarga yang penuh kasih dan iman.",
    closingBlessingEn: "May Lord Jesus Christ bless this marriage and make it a family full of love and faith.",
    
    wishesPlaceholder: "Tuliskan berkat dan doa Anda untuk kedua mempelai…",
    wishesPlaceholderEn: "Write your blessings and prayers for the couple…",
  },
  
  "kristen-katolik": {
    id: "kristen-katolik",
    name: "Kristen Katolik",
    nameEn: "Catholic Christian",
    symbol: "✝",
    color: "#7c2d12",
    
    openingGreeting: "Salam Sejahtera dalam Kristus",
    openingGreetingEn: "Peace Be With You in Christ",
    closingGreeting: "Tuhan Memberkati",
    closingGreetingEn: "God Bless You",
    
    scriptureTitle: "Bacaan Kitab Suci",
    scriptureTitleEn: "Holy Scripture Reading",
    defaultScripture: {
      text: "Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong.",
      textEn: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.",
      source: "1 Korintus 13:4",
    },
    
    coupleBlessing: "Dalam Nama Bapa, Putra, dan Roh Kudus",
    coupleBlessingEn: "In The Name of The Father, The Son, and The Holy Spirit",
    coupleSubtitle: "Dengan memohon berkat dan rahmat Tuhan, kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang akan berjalan bersama dalam kasih karunia.",
    coupleSubtitleEn: "With the blessings and grace of God, we intend to hold the wedding of our children — two hearts that will walk together in grace and love.",
    
    closingBlessing: "Kiranya Tuhan memberkati pernikahan ini dan menjadikan keluarga yang penuh kasih karunia.",
    closingBlessingEn: "May God bless this marriage and make it a family full of grace and love.",
    
    wishesPlaceholder: "Tuliskan berkat dan doa Anda untuk kedua mempelai…",
    wishesPlaceholderEn: "Write your blessings and prayers for the couple…",
  },
  
  hindu: {
    id: "hindu",
    name: "Hindu",
    nameEn: "Hindu",
    symbol: "🕉",
    color: "#ea580c",
    
    openingGreeting: "Om Swastiastu",
    openingGreetingEn: "Om Swastiastu",
    closingGreeting: "Om Shanti Shanti Shanti Om",
    closingGreetingEn: "Om Peace Peace Peace Om",
    
    scriptureTitle: "Wedasana",
    scriptureTitleEn: "Sacred Verse",
    defaultScripture: {
      text: "Semoga kalian berdua hidup bersama dengan penuh kebahagiaan, saling melengkapi dalam dharma, dan diberkahi dengan keturunan yang baik.",
      textEn: "May you both live together in happiness, complementing each other in dharma, and be blessed with good offspring.",
      source: "Wedas - Mantra Pernikahan",
    },
    
    coupleBlessing: "Om Swastiastu",
    coupleBlessingEn: "Om Swastiastu",
    coupleSubtitle: "Dengan memohon restu dan berkat Ida Sang Hyang Widhi Wasa, kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang akan berjalan bersama dalam dharma.",
    coupleSubtitleEn: "With the blessings of Ida Sang Hyang Widhi Wasa, we intend to hold the wedding of our children — two hearts that will walk together in dharma.",
    
    closingBlessing: "Semoga Ida Sang Hyang Widhi Wasa memberkati pernikahan ini dan menjadikan keluarga yang bahagia dan sejahtera.",
    closingBlessingEn: "May Ida Sang Hyang Widhi Wasa bless this marriage and make it a happy and prosperous family.",
    
    wishesPlaceholder: "Tuliskan doa dan harapan Anda untuk kedua mempelai…",
    wishesPlaceholderEn: "Write your prayers and wishes for the couple…",
  },
  
  buddha: {
    id: "buddha",
    name: "Buddha",
    nameEn: "Buddhist",
    symbol: "☸",
    color: "#ca8a04",
    
    openingGreeting: "Namo Buddhaya",
    openingGreetingEn: "Namo Buddhaya",
    closingGreeting: "Sabbe Satta Bhavantu Sukhitatta",
    closingGreetingEn: "May All Beings Be Happy",
    
    scriptureTitle: "Dhammapada",
    scriptureTitleEn: "Dhammapada Verse",
    defaultScripture: {
      text: "Kasih sayang yang tulus adalah sumber kebahagiaan terbesar. Dengan cinta kasih, kita dapat mengatasi segala penderitaan.",
      textEn: "Genuine loving-kindness is the source of greatest happiness. With loving-kindness, we can overcome all suffering.",
      source: "Dhammapada - Ajaran Buddha",
    },
    
    coupleBlessing: "Namo Buddhaya",
    coupleBlessingEn: "Namo Buddhaya",
    coupleSubtitle: "Dengan memohon berkat dan restu Tiga Permata (Triratna), kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang akan berjalan bersama dalam cinta kasih dan kebijaksanaan.",
    coupleSubtitleEn: "With the blessings of The Three Jewels (Triratna), we intend to hold the wedding of our children — two hearts that will walk together in loving-kindness and wisdom.",
    
    closingBlessing: "Semoga Tiga Permata (Triratna) memberkati pernikahan ini dan menjadikan keluarga yang penuh cinta kasih dan kebijaksanaan.",
    closingBlessingEn: "May The Three Jewels (Triratna) bless this marriage and make it a family full of loving-kindness and wisdom.",
    
    wishesPlaceholder: "Tuliskan doa dan harapan Anda untuk kedua mempelai…",
    wishesPlaceholderEn: "Write your prayers and wishes for the couple…",
  },
  
  konghucu: {
    id: "konghucu",
    name: "Konghucu",
    nameEn: "Confucian",
    symbol: "道",
    color: "#dc2626",
    
    openingGreeting: "Salam Kebajikan",
    openingGreetingEn: "Greetings of Virtue",
    closingGreeting: "Tian Ming You De",
    closingGreetingEn: "Heaven Bless You",
    
    scriptureTitle: "Ajaran Suci",
    scriptureTitleEn: "Sacred Teaching",
    defaultScripture: {
      text: "Suami dan istri adalah dasar dari segala hubungan manusia. Dengan kebajikan dan harmoni, keluarga akan sejahtera.",
      textEn: "Husband and wife are the foundation of all human relationships. With virtue and harmony, the family will prosper.",
      source: "Kitab Li Ji - Ajaran Konghucu",
    },
    
    coupleBlessing: "Dengan Hormat dan Kebajikan",
    coupleBlessingEn: "With Respect and Virtue",
    coupleSubtitle: "Dengan penuh hormat dan kebajikan, kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang akan berjalan bersama dalam harmoni dan kebajikan.",
    coupleSubtitleEn: "With respect and virtue, we intend to hold the wedding of our children — two hearts that will walk together in harmony and virtue.",
    
    closingBlessing: "Semoga Tian (Tuhan) memberkati pernikahan ini dan menjadikan keluarga yang harmonis dan sejahtera.",
    closingBlessingEn: "May Tian (God) bless this marriage and make it a harmonious and prosperous family.",
    
    wishesPlaceholder: "Tuliskan doa dan harapan Anda untuk kedua mempelai…",
    wishesPlaceholderEn: "Write your prayers and wishes for the couple…",
  },
  
  universal: {
    id: "universal",
    name: "Universal",
    nameEn: "Universal",
    symbol: "♡",
    color: "#7c3aed",
    
    openingGreeting: "Dengan Hormat dan Sukacita",
    openingGreetingEn: "With Respect and Joy",
    closingGreeting: "Salam Hangat",
    closingGreetingEn: "Warm Regards",
    
    scriptureTitle: "Kata-Kata Inspirasi",
    scriptureTitleEn: "Words of Inspiration",
    defaultScripture: {
      text: "Cinta bukan tentang saling menatap, tetapi tentang bersama-sama melihat ke arah yang sama.",
      textEn: "Love does not consist in gazing at each other, but in looking together in the same direction.",
      source: "Antoine de Saint-Exupéry",
    },
    
    coupleBlessing: "Dengan Cinta dan Kebahagiaan",
    coupleBlessingEn: "With Love and Happiness",
    coupleSubtitle: "Dengan penuh cinta dan kebahagiaan, kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang akan berjalan bersama dalam sukacita.",
    coupleSubtitleEn: "With love and happiness, we intend to hold the wedding of our children — two hearts that will walk together in joy.",
    
    closingBlessing: "Semoga cinta dan kebahagiaan selalu menyertai pernikahan ini dan menjadikan keluarga yang penuh sukacita.",
    closingBlessingEn: "May love and happiness always accompany this marriage and make it a family full of joy.",
    
    wishesPlaceholder: "Tuliskan ucapan dan harapan terbaik Anda untuk kedua mempelai…",
    wishesPlaceholderEn: "Write your best wishes for the couple…",
  },
};

/**
 * Helper function untuk mendapatkan format agama
 */
export function getReligiousFormat(formatId: ReligiousFormat = "islam"): ReligiousFormatData {
  return religiousFormats[formatId];
}
