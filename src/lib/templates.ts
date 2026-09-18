/**
 * Sistem desain template untuk undangan pernikahan
 * 10 template dengan karakteristik visual berbeda
 */

export type TemplateId =
  | "classic-elegant"
  | "modern-minimalist"
  | "romantic-garden"
  | "royal-luxury"
  | "rustic-vintage"
  | "tropical-paradise"
  | "japanese-zen"
  | "art-deco"
  | "bohemian-chic"
  | "islamic-calligraphy";

export interface DesignTemplate {
  id: TemplateId;
  name: string;
  description: string;
  preview: string;
  
  // Layout
  layout: {
    heroStyle: "centered" | "split" | "fullscreen";
    coupleStyle: "side-by-side" | "stacked" | "circular";
    eventStyle: "cards" | "timeline" | "accordion";
  };
  
  // Visual
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  
  // Typography
  fonts: {
    heading: string;
    body: string;
    accent: string;
  };
  
  // Elements
  ornaments: string[];
  backgrounds: string[];
  animations: string[];
}

export const DESIGN_TEMPLATES: Record<TemplateId, DesignTemplate> = {
  "classic-elegant": {
    id: "classic-elegant",
    name: "Classic Elegant",
    description: "Layout tradisional dengan ornamen klasik",
    preview: "bg-gradient-to-br from-pine-950 to-pine-800",
    layout: {
      heroStyle: "centered",
      coupleStyle: "side-by-side",
      eventStyle: "cards",
    },
    colors: {
      primary: "#0b1f17",
      secondary: "#c8a961",
      accent: "#a9c3ad",
      background: "#071510",
      text: "#f4edda",
    },
    fonts: {
      heading: "Fraunces",
      body: "Manrope",
      accent: "Cormorant Garamond",
    },
    ornaments: ["classic-flourish", "elegant-divider"],
    backgrounds: ["subtle-gradient", "texture-overlay"],
    animations: ["fade-in", "slide-up"],
  },
  
  "modern-minimalist": {
    id: "modern-minimalist",
    name: "Modern Minimalist",
    description: "Clean layout dengan banyak white space",
    preview: "bg-gradient-to-br from-neutral-950 to-neutral-800",
    layout: {
      heroStyle: "fullscreen",
      coupleStyle: "stacked",
      eventStyle: "accordion",
    },
    colors: {
      primary: "#0a0a0a",
      secondary: "#d4af37",
      accent: "#e5e5e5",
      background: "#000000",
      text: "#fafafa",
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
      accent: "Playfair Display",
    },
    ornaments: ["minimal-line", "geometric-shape"],
    backgrounds: ["solid-color", "subtle-noise"],
    animations: ["fade-in", "scale-up"],
  },
  
  "romantic-garden": {
    id: "romantic-garden",
    name: "Romantic Garden",
    description: "Nuansa romantis dengan elemen floral",
    preview: "bg-gradient-to-br from-rose-950 to-rose-800",
    layout: {
      heroStyle: "centered",
      coupleStyle: "circular",
      eventStyle: "cards",
    },
    colors: {
      primary: "#1a0a0f",
      secondary: "#f43f5e",
      accent: "#fda4af",
      background: "#0f0508",
      text: "#fff1f2",
    },
    fonts: {
      heading: "Playfair Display",
      body: "Lato",
      accent: "Great Vibes",
    },
    ornaments: ["floral-corner", "rose-divider"],
    backgrounds: ["floral-pattern", "soft-gradient"],
    animations: ["fade-in", "float"],
  },
  
  "royal-luxury": {
    id: "royal-luxury",
    name: "Royal Luxury",
    description: "Desain mewah dengan aksen emas",
    preview: "bg-gradient-to-br from-violet-950 to-violet-800",
    layout: {
      heroStyle: "centered",
      coupleStyle: "side-by-side",
      eventStyle: "timeline",
    },
    colors: {
      primary: "#1a0f2e",
      secondary: "#fbbf24",
      accent: "#c4b5fd",
      background: "#0f0819",
      text: "#faf5ff",
    },
    fonts: {
      heading: "Cinzel",
      body: "Raleway",
      accent: "Tangerine",
    },
    ornaments: ["royal-crown", "luxury-border"],
    backgrounds: ["velvet-texture", "gold-foil"],
    animations: ["fade-in", "shimmer"],
  },
  
  "rustic-vintage": {
    id: "rustic-vintage",
    name: "Rustic Vintage",
    description: "Gaya vintage dengan nuansa alami",
    preview: "bg-gradient-to-br from-stone-950 to-stone-800",
    layout: {
      heroStyle: "split",
      coupleStyle: "side-by-side",
      eventStyle: "cards",
    },
    colors: {
      primary: "#1c1410",
      secondary: "#a16207",
      accent: "#fef3c7",
      background: "#0f0b08",
      text: "#fffbeb",
    },
    fonts: {
      heading: "Lora",
      body: "Source Sans Pro",
      accent: "Satisfy",
    },
    ornaments: ["vintage-frame", "rustic-leaf"],
    backgrounds: ["paper-texture", "wood-grain"],
    animations: ["fade-in", "slide-in"],
  },
  
  "tropical-paradise": {
    id: "tropical-paradise",
    name: "Tropical Paradise",
    description: "Warna-warni cerah bergaya tropis",
    preview: "bg-gradient-to-br from-teal-950 to-teal-800",
    layout: {
      heroStyle: "fullscreen",
      coupleStyle: "circular",
      eventStyle: "accordion",
    },
    colors: {
      primary: "#042f2e",
      secondary: "#14b8a6",
      accent: "#fb7185",
      background: "#021b1a",
      text: "#f0fdfa",
    },
    fonts: {
      heading: "Poppins",
      body: "Open Sans",
      accent: "Pacifico",
    },
    ornaments: ["tropical-leaf", "palm-tree"],
    backgrounds: ["gradient-mesh", "tropical-pattern"],
    animations: ["fade-in", "bounce"],
  },
  
  "japanese-zen": {
    id: "japanese-zen",
    name: "Japanese Zen",
    description: "Estetika minimalis Jepang",
    preview: "bg-gradient-to-br from-slate-950 to-slate-800",
    layout: {
      heroStyle: "centered",
      coupleStyle: "stacked",
      eventStyle: "timeline",
    },
    colors: {
      primary: "#0f172a",
      secondary: "#94a3b8",
      accent: "#7dd3fc",
      background: "#020617",
      text: "#f8fafc",
    },
    fonts: {
      heading: "Noto Serif JP",
      body: "Noto Sans JP",
      accent: "Shippori Mincho",
    },
    ornaments: ["zen-circle", "bamboo-line"],
    backgrounds: ["ink-wash", "paper-texture"],
    animations: ["fade-in", "slide-right"],
  },
  
  "art-deco": {
    id: "art-deco",
    name: "Art Deco",
    description: "Pola geometris bergaya 1920-an",
    preview: "bg-gradient-to-br from-amber-950 to-amber-800",
    layout: {
      heroStyle: "split",
      coupleStyle: "side-by-side",
      eventStyle: "cards",
    },
    colors: {
      primary: "#1c1208",
      secondary: "#f59e0b",
      accent: "#fbbf24",
      background: "#0f0a04",
      text: "#fffbeb",
    },
    fonts: {
      heading: "Bebas Neue",
      body: "Montserrat",
      accent: "Poiret One",
    },
    ornaments: ["geometric-pattern", "deco-line"],
    backgrounds: ["art-deco-pattern", "metallic-gradient"],
    animations: ["fade-in", "rotate"],
  },
  
  "bohemian-chic": {
    id: "bohemian-chic",
    name: "Bohemian Chic",
    description: "Eklektik dan artistik",
    preview: "bg-gradient-to-br from-orange-950 to-orange-800",
    layout: {
      heroStyle: "fullscreen",
      coupleStyle: "circular",
      eventStyle: "accordion",
    },
    colors: {
      primary: "#431407",
      secondary: "#ea580c",
      accent: "#fdba74",
      background: "#1c0a04",
      text: "#fff7ed",
    },
    fonts: {
      heading: "Abril Fatface",
      body: "Quicksand",
      accent: "Dancing Script",
    },
    ornaments: ["boho-feather", "ethnic-pattern"],
    backgrounds: ["macrame-texture", "earth-tone-gradient"],
    animations: ["fade-in", "wave"],
  },
  
  "islamic-calligraphy": {
    id: "islamic-calligraphy",
    name: "Islamic Calligraphy",
    description: "Motif Timur Tengah dan kaligrafi",
    preview: "bg-gradient-to-br from-emerald-950 to-emerald-800",
    layout: {
      heroStyle: "centered",
      coupleStyle: "side-by-side",
      eventStyle: "timeline",
    },
    colors: {
      primary: "#064e3b",
      secondary: "#10b981",
      accent: "#6ee7b7",
      background: "#022c22",
      text: "#ecfdf5",
    },
    fonts: {
      heading: "Amiri",
      body: "Cairo",
      accent: "Reem Kufi",
    },
    ornaments: ["arabesque", "islamic-geometric"],
    backgrounds: ["mosque-pattern", "calligraphy-overlay"],
    animations: ["fade-in", "glow"],
  },
};

export function getTemplate(templateId: TemplateId = "classic-elegant"): DesignTemplate {
  return DESIGN_TEMPLATES[templateId];
}

export function getAllTemplates(): DesignTemplate[] {
  return Object.values(DESIGN_TEMPLATES);
}
