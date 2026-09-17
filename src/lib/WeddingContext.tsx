import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useWeddingData, type WeddingData } from "./useWeddingData";
import { WEDDING as DEFAULT_WEDDING } from "./wedding";
import { getTheme, type Theme } from "./themes";
import { updateMetaTags } from "./metaTags";
import { translations, type Language, type Translations } from "./translations";

interface WeddingContextType {
  data: WeddingData;
  mergedData: typeof DEFAULT_WEDDING & { photos: any };
  theme: Theme;
  language: Language;
  t: Translations;
  loading: boolean;
  error: string | null;
  updateData: (patch: WeddingData) => Promise<void>;
  refetch: () => Promise<void>;
}

const WeddingContext = createContext<WeddingContextType | null>(null);

export function WeddingProvider({ children, userId }: { children: ReactNode; userId?: string | null }) {
  const weddingData = useWeddingData(userId);
  const theme = getTheme(weddingData.data.themeId || "emerald-garden");
  const language = (weddingData.data.language || "id") as Language;
  const t = translations[language];
  
  const value = {
    ...weddingData,
    theme,
    language,
    t,
  };
  
  // Update meta tags untuk preview link di WhatsApp/social media
  useEffect(() => {
    if (!weddingData.loading && weddingData.mergedData) {
      const { groom, bride, dateLabel } = weddingData.mergedData;
      const title = language === "id" 
        ? `Undangan Pernikahan ${groom.short} & ${bride.short}`
        : `Wedding Invitation ${groom.short} & ${bride.short}`;
      const description = `${groom.full} & ${bride.full} — ${dateLabel}`;
      
      // Meta tags akan di-update oleh Photo component saat foto di-resolve
      updateMetaTags({ title, description });
    }
  }, [weddingData.loading, weddingData.mergedData, language]);
  
  return <WeddingContext.Provider value={value}>{children}</WeddingContext.Provider>;
}

export function useWedding() {
  const ctx = useContext(WeddingContext);
  if (!ctx) throw new Error("useWedding must be used within WeddingProvider");
  return ctx;
}
