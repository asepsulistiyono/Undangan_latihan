import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useWeddingData, type WeddingData } from "./useWeddingData";
import { WEDDING as DEFAULT_WEDDING } from "./wedding";
import { getTheme, type Theme } from "./themes";
import { updateMetaTags } from "./metaTags";
import { getPhoto, isIndexedDBAvailable } from "./indexedDB";

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
  const [resolvedPhotos, setResolvedPhotos] = useState<Record<string, string>>({});
  
  // Resolve foto dari IndexedDB saat data di-load
  useEffect(() => {
    if (weddingData.loading || !weddingData.mergedData?.photos) return;
    
    const photos = weddingData.mergedData.photos;
    const photoKeys = Object.keys(photos);
    const newResolved: Record<string, string> = {};
    const objectUrls: string[] = [];
    
    const resolvePhotos = async () => {
      for (const key of photoKeys) {
        const photoUrl = (photos as Record<string, string>)[key];
        
        // Skip jika sudah base64 atau HTTP URL
        if (!photoUrl || photoUrl.startsWith("data:") || photoUrl.startsWith("http://") || photoUrl.startsWith("https://")) {
          continue;
        }
        
        // Resolve IndexedDB reference
        if (photoUrl.startsWith("indexeddb:") && isIndexedDBAvailable()) {
          const dbKey = photoUrl.replace("indexeddb:", "");
          try {
            const url = await getPhoto(dbKey);
            if (url) {
              newResolved[key] = url;
              objectUrls.push(url);
            }
          } catch (err) {
            console.error(`Gagal resolve foto ${key}:`, err);
          }
        }
      }
      
      setResolvedPhotos(newResolved);
      
      // Cleanup function untuk revoke object URLs
      return () => {
        objectUrls.forEach(url => URL.revokeObjectURL(url));
      };
    };
    
    resolvePhotos();
  }, [weddingData.loading, weddingData.mergedData]);
  
  // Merge resolved photos ke mergedData
  const mergedDataWithResolvedPhotos = {
    ...weddingData.mergedData,
    photos: {
      ...weddingData.mergedData?.photos,
      ...resolvedPhotos,
    },
  };
  
  const value = {
    ...weddingData,
    mergedData: mergedDataWithResolvedPhotos,
    theme,
  };
  
  // Update meta tags untuk preview link di WhatsApp/social media
  useEffect(() => {
    if (!weddingData.loading && mergedDataWithResolvedPhotos) {
      const { groom, bride, dateLabel, photos } = mergedDataWithResolvedPhotos;
      const title = `Undangan Pernikahan ${groom.short} & ${bride.short}`;
      const description = `${groom.full} & ${bride.full} — ${dateLabel}`;
      const image = photos?.hero || photos?.groom || photos?.bride;
      
      // Skip update meta tags jika image masih indexeddb: reference
      if (image && !image.startsWith("indexeddb:")) {
        updateMetaTags({ title, description, image });
      }
    }
  }, [weddingData.loading, mergedDataWithResolvedPhotos]);
  
  return <WeddingContext.Provider value={value}>{children}</WeddingContext.Provider>;
}

export function useWedding() {
  const ctx = useContext(WeddingContext);
  if (!ctx) throw new Error("useWedding must be used within WeddingProvider");
  return ctx;
}
