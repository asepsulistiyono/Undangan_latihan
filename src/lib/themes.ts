export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  gradient: string;
  preview: string;
}

export const THEMES: Theme[] = [
  {
    id: "emerald-garden",
    name: "Emerald Garden",
    description: "Hijau pinus & emas - Elegan dan natural",
    colors: {
      primary: "#0b1f17",
      secondary: "#c8a961",
      accent: "#a9c3ad",
      background: "#071510",
      text: "#f4edda",
    },
    gradient: "from-pine-950 via-pine-900 to-pine-950",
    preview: "bg-gradient-to-br from-pine-950 to-pine-800",
  },
  {
    id: "midnight-rose",
    name: "Midnight Rose",
    description: "Rose & hitam - Romantis dan mewah",
    colors: {
      primary: "#1a0a0f",
      secondary: "#f43f5e",
      accent: "#fda4af",
      background: "#0f0508",
      text: "#fff1f2",
    },
    gradient: "from-rose-950 via-rose-900 to-rose-950",
    preview: "bg-gradient-to-br from-rose-950 to-rose-800",
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    description: "Biru navy & perak - Tenang dan sophisticated",
    colors: {
      primary: "#0c1929",
      secondary: "#94a3b8",
      accent: "#7dd3fc",
      background: "#060d17",
      text: "#f0f9ff",
    },
    gradient: "from-sky-950 via-sky-900 to-sky-950",
    preview: "bg-gradient-to-br from-sky-950 to-sky-800",
  },
  {
    id: "golden-sunset",
    name: "Golden Sunset",
    description: "Amber & emas - Hangat dan mewah",
    colors: {
      primary: "#1c1208",
      secondary: "#f59e0b",
      accent: "#fbbf24",
      background: "#0f0a04",
      text: "#fffbeb",
    },
    gradient: "from-amber-950 via-amber-900 to-amber-950",
    preview: "bg-gradient-to-br from-amber-950 to-amber-800",
  },
  {
    id: "lavender-dream",
    name: "Lavender Dream",
    description: "Ungu lavender & perak - Lembut dan magical",
    colors: {
      primary: "#1a0f2e",
      secondary: "#a78bfa",
      accent: "#c4b5fd",
      background: "#0f0819",
      text: "#faf5ff",
    },
    gradient: "from-violet-950 via-violet-900 to-violet-950",
    preview: "bg-gradient-to-br from-violet-950 to-violet-800",
  },
  {
    id: "classic-monochrome",
    name: "Classic Monochrome",
    description: "Hitam putih & emas - Timeless dan elegant",
    colors: {
      primary: "#0a0a0a",
      secondary: "#d4af37",
      accent: "#e5e5e5",
      background: "#000000",
      text: "#fafafa",
    },
    gradient: "from-neutral-950 via-neutral-900 to-neutral-950",
    preview: "bg-gradient-to-br from-neutral-950 to-neutral-800",
  },
  {
    id: "tropical-paradise",
    name: "Tropical Paradise",
    description: "Teal & coral - Fresh dan vibrant",
    colors: {
      primary: "#042f2e",
      secondary: "#14b8a6",
      accent: "#fb7185",
      background: "#021b1a",
      text: "#f0fdfa",
    },
    gradient: "from-teal-950 via-teal-900 to-teal-950",
    preview: "bg-gradient-to-br from-teal-950 to-teal-800",
  },
  {
    id: "rustic-charm",
    name: "Rustic Charm",
    description: "Coklat earth tone & krem - Warm dan cozy",
    colors: {
      primary: "#1c1410",
      secondary: "#a16207",
      accent: "#fef3c7",
      background: "#0f0b08",
      text: "#fffbeb",
    },
    gradient: "from-stone-950 via-stone-900 to-stone-950",
    preview: "bg-gradient-to-br from-stone-950 to-stone-800",
  },
];

export function getTheme(themeId: string): Theme {
  return THEMES.find((t) => t.id === themeId) || THEMES[0];
}
