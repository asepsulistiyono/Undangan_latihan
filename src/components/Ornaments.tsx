/**
 * Komponen ornamen adat Indonesia untuk cover undangan
 */

export interface OrnamentProps {
  className?: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

/**
 * Ornamen Adat Sunda - Motif Batik Megamendung & Sulur
 */
export function OrnamentSunda({ className = "", position }: OrnamentProps) {
  const rotation = {
    "top-left": "",
    "top-right": "scale-x-[-1]",
    "bottom-left": "scale-y-[-1]",
    "bottom-right": "scale-x-[-1] scale-y-[-1]",
  }[position];

  return (
    <svg
      viewBox="0 0 120 120"
      className={`${className} ${rotation}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Motif Megamendung (awan) */}
      <path
        d="M10 110 C10 80, 30 60, 50 60 C50 40, 70 20, 90 20 C100 20, 110 30, 110 40"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15 105 C15 85, 32 68, 48 68 C48 52, 65 35, 82 35 C90 35, 98 42, 98 50"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
        strokeLinecap="round"
      />
      
      {/* Sulur-suluran */}
      <path
        d="M20 100 Q30 90, 25 80 Q20 70, 30 65 Q40 60, 35 50"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M35 50 Q30 45, 35 40 Q40 35, 45 40"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      
      {/* Daun & bunga kecil */}
      <circle cx="30" cy="65" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="45" cy="40" r="1.5" fill="currentColor" opacity="0.7" />
      <path
        d="M25 80 L22 78 L25 76 M25 80 L28 78 L25 76"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      
      {/* Titik-titik dekoratif */}
      <circle cx="50" cy="60" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="70" cy="40" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="90" cy="20" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

/**
 * Ornamen Adat Jawa - Motif Parang & Kawung
 */
export function OrnamentJawa({ className = "", position }: OrnamentProps) {
  const rotation = {
    "top-left": "",
    "top-right": "scale-x-[-1]",
    "bottom-left": "scale-y-[-1]",
    "bottom-right": "scale-x-[-1] scale-y-[-1]",
  }[position];

  return (
    <svg
      viewBox="0 0 120 120"
      className={`${className} ${rotation}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Motif Parang (diagonal lines) */}
      <path
        d="M10 110 L40 80 M20 110 L50 80 M30 110 L60 80"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      
      {/* Motif Kawung (oval patterns) */}
      <ellipse cx="50" cy="70" rx="8" ry="12" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="50" cy="70" rx="4" ry="6" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      
      <ellipse cx="70" cy="50" rx="8" ry="12" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="70" cy="50" rx="4" ry="6" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      
      <ellipse cx="90" cy="30" rx="8" ry="12" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="90" cy="30" rx="4" ry="6" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      
      {/* Sulur melengkung */}
      <path
        d="M10 110 Q30 100, 40 80 Q50 60, 70 50 Q90 40, 110 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Titik-titik dekoratif */}
      <circle cx="40" cy="80" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="60" cy="60" r="2" fill="currentColor" opacity="0.7" />
      <circle cx="80" cy="40" r="2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

/**
 * Ornamen Adat Betawi - Motif Gigi Balang & Ondel-ondel
 */
export function OrnamentBetawi({ className = "", position }: OrnamentProps) {
  const rotation = {
    "top-left": "",
    "top-right": "scale-x-[-1]",
    "bottom-left": "scale-y-[-1]",
    "bottom-right": "scale-x-[-1] scale-y-[-1]",
  }[position];

  return (
    <svg
      viewBox="0 0 120 120"
      className={`${className} ${rotation}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Motif Gigi Balang (segitiga) */}
      <path
        d="M10 110 L20 100 L30 110 L40 100 L50 110 L60 100 L70 110 L80 100 L90 110"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Garis lengkung atas */}
      <path
        d="M10 110 Q30 90, 50 70 Q70 50, 90 30 Q100 20, 110 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Motif bunga sederhana */}
      <circle cx="50" cy="70" r="6" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="50" cy="70" r="3" fill="currentColor" opacity="0.5" />
      
      <circle cx="70" cy="50" r="6" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="70" cy="50" r="3" fill="currentColor" opacity="0.5" />
      
      <circle cx="90" cy="30" r="6" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="90" cy="30" r="3" fill="currentColor" opacity="0.5" />
      
      {/* Daun-daun kecil */}
      <path
        d="M30 90 Q35 85, 40 90 Q35 95, 30 90"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M60 60 Q65 55, 70 60 Q65 65, 60 60"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  );
}

/**
 * Ornamen Adat Bali - Motif Patra & Bunga Kamboja
 */
export function OrnamentBali({ className = "", position }: OrnamentProps) {
  const rotation = {
    "top-left": "",
    "top-right": "scale-x-[-1]",
    "bottom-left": "scale-y-[-1]",
    "bottom-right": "scale-x-[-1] scale-y-[-1]",
  }[position];

  return (
    <svg
      viewBox="0 0 120 120"
      className={`${className} ${rotation}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Motif Patra (sulur rumit) */}
      <path
        d="M10 110 C20 100, 25 90, 30 80 C35 70, 40 65, 45 60 C50 55, 55 50, 60 45 C65 40, 70 35, 75 30 C80 25, 85 20, 90 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Bunga Kamboja */}
      <g transform="translate(50, 70)">
        <ellipse cx="0" cy="-8" rx="3" ry="6" stroke="currentColor" strokeWidth="1" />
        <ellipse cx="7" cy="-4" rx="3" ry="6" stroke="currentColor" strokeWidth="1" transform="rotate(72)" />
        <ellipse cx="7" cy="4" rx="3" ry="6" stroke="currentColor" strokeWidth="1" transform="rotate(144)" />
        <ellipse cx="-7" cy="-4" rx="3" ry="6" stroke="currentColor" strokeWidth="1" transform="rotate(-72)" />
        <ellipse cx="-7" cy="4" rx="3" ry="6" stroke="currentColor" strokeWidth="1" transform="rotate(-144)" />
        <circle cx="0" cy="0" r="2" fill="currentColor" opacity="0.6" />
      </g>
      
      {/* Daun patra */}
      <path
        d="M30 80 Q25 75, 30 70 Q35 75, 30 80"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="currentColor"
        opacity="0.4"
      />
      <path
        d="M45 60 Q40 55, 45 50 Q50 55, 45 60"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="currentColor"
        opacity="0.4"
      />
      <path
        d="M60 45 Q55 40, 60 35 Q65 40, 60 45"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="currentColor"
        opacity="0.4"
      />
      
      {/* Titik-titik dekoratif */}
      <circle cx="75" cy="30" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="90" cy="15" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

/**
 * Ornamen Adat Minang - Motif Kaluak Paku & Rumah Gadang
 */
export function OrnamentMinang({ className = "", position }: OrnamentProps) {
  const rotation = {
    "top-left": "",
    "top-right": "scale-x-[-1]",
    "bottom-left": "scale-y-[-1]",
    "bottom-right": "scale-x-[-1] scale-y-[-1]",
  }[position];

  return (
    <svg
      viewBox="0 0 120 120"
      className={`${className} ${rotation}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Motif Kaluak Paku (pucuk rebung) */}
      <path
        d="M10 110 L30 90 L20 80 L40 60 L30 50 L50 30 L40 20 L60 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Garis paralel */}
      <path
        d="M15 110 L35 90 L25 80 L45 60 L35 50 L55 30 L45 20 L65 10"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Motif segitiga */}
      <path
        d="M50 70 L60 60 L70 70 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M70 50 L80 40 L90 50 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        opacity="0.3"
      />
      
      {/* Lingkaran dekoratif */}
      <circle cx="60" cy="60" r="4" stroke="currentColor" strokeWidth="1" />
      <circle cx="80" cy="40" r="4" stroke="currentColor" strokeWidth="1" />
      <circle cx="60" cy="60" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="80" cy="40" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

/**
 * Ornamen Adat Dayak - Motif Mandala & Ukiran
 */
export function OrnamentDayak({ className = "", position }: OrnamentProps) {
  const rotation = {
    "top-left": "",
    "top-right": "scale-x-[-1]",
    "bottom-left": "scale-y-[-1]",
    "bottom-right": "scale-x-[-1] scale-y-[-1]",
  }[position];

  return (
    <svg
      viewBox="0 0 120 120"
      className={`${className} ${rotation}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Motif spiral */}
      <path
        d="M10 110 Q20 100, 30 90 Q40 80, 50 70 Q60 60, 70 50 Q80 40, 90 30 Q100 20, 110 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Lingkaran konsentris */}
      <circle cx="50" cy="70" r="12" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="50" cy="70" r="8" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <circle cx="50" cy="70" r="4" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      
      <circle cx="80" cy="40" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="80" cy="40" r="6" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <circle cx="80" cy="40" r="3" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      
      {/* Motif mata (khas Dayak) */}
      <ellipse cx="50" cy="70" rx="3" ry="2" fill="currentColor" opacity="0.6" />
      <ellipse cx="80" cy="40" rx="2.5" ry="1.5" fill="currentColor" opacity="0.6" />
      
      {/* Garis-garis ukiran */}
      <path
        d="M20 100 L25 95 M30 90 L35 85 M40 80 L45 75"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Ornamen Modern - Minimalis & Elegan
 */
export function OrnamentModern({ className = "", position }: OrnamentProps) {
  const rotation = {
    "top-left": "",
    "top-right": "scale-x-[-1]",
    "bottom-left": "scale-y-[-1]",
    "bottom-right": "scale-x-[-1] scale-y-[-1]",
  }[position];

  return (
    <svg
      viewBox="0 0 120 120"
      className={`${className} ${rotation}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Garis lengkung minimalis */}
      <path
        d="M10 110 Q40 90, 60 60 Q80 30, 110 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Lingkaran sederhana */}
      <circle cx="60" cy="60" r="8" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="60" cy="60" r="4" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      
      {/* Titik-titik dekoratif */}
      <circle cx="30" cy="90" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="90" cy="30" r="2" fill="currentColor" opacity="0.6" />
      
      {/* Garis tipis */}
      <path
        d="M15 105 Q45 85, 65 55 Q85 25, 105 15"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Daftar semua ornamen yang tersedia
 */
export const ORNAMENTS = {
  sunda: {
    id: "sunda",
    name: "Adat Sunda",
    description: "Motif Megamendung & Sulur",
    component: OrnamentSunda,
  },
  jawa: {
    id: "jawa",
    name: "Adat Jawa",
    description: "Motif Parang & Kawung",
    component: OrnamentJawa,
  },
  betawi: {
    id: "betawi",
    name: "Adat Betawi",
    description: "Motif Gigi Balang",
    component: OrnamentBetawi,
  },
  bali: {
    id: "bali",
    name: "Adat Bali",
    description: "Motif Patra & Kamboja",
    component: OrnamentBali,
  },
  minang: {
    id: "minang",
    name: "Adat Minang",
    description: "Motif Kaluak Paku",
    component: OrnamentMinang,
  },
  dayak: {
    id: "dayak",
    name: "Adat Dayak",
    description: "Motif Mandala & Ukiran",
    component: OrnamentDayak,
  },
  modern: {
    id: "modern",
    name: "Modern",
    description: "Minimalis & Elegan",
    component: OrnamentModern,
  },
} as const;

export type OrnamentId = keyof typeof ORNAMENTS;
