import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useWeddingData, type WeddingData } from "./useWeddingData";
import { WEDDING as DEFAULT_WEDDING } from "./wedding";
import { getTheme, type Theme } from "./themes";
import { updateMetaTags } from "./metaTags";

interface WeddingContextType {
  data: WeddingData;
  mergedData: typeof DEFAULT_WEDDING & { photos: any };
  theme: Theme;
  loading: boolean;
  error: string | null;
  updateData: (patch: WeddingData) => Promise<void>;
  refetch: () => Promise<void>;
}

const WeddingContext = createContext<WeddingContextType | null>(null);

export function WeddingProvider({ children, userId }: { children: ReactNode; userId?: string | null }) {
  const weddingData = useWeddingData(userId);
  const theme = getTheme(weddingData.data.themeId || "emerald-garden");
  
  const value = {
    ...weddingData,
    theme,
  };
  
  // Update meta tags untuk preview link di WhatsApp/social media
  useEffect(() => {
    if (!weddingData.loading && weddingData.mergedData) {
      const { groom, bride, dateLabel, photos } = weddingData.mergedData;
      const title = `Undangan Pernikahan ${groom.short} & ${bride.short}`;
      const description = `${groom.full} & ${bride.full} — ${dateLabel}`;
      const image = photos?.hero || photos?.groom || photos?.bride;
      
      updateMetaTags({ title, description, image });
    }
  }, [weddingData.loading, weddingData.mergedData]);
  
  return <WeddingContext.Provider value={value}>{children}</WeddingContext.Provider>;
}

export function useWedding() {
  const ctx = useContext(WeddingContext);
  if (!ctx) throw new Error("useWedding must be used within WeddingProvider");
  return ctx;
}
