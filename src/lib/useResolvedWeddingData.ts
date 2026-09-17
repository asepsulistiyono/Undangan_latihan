import { useEffect, useState } from "react";
import { useWedding } from "./WeddingContext";
import { getPhoto, isIndexedDBAvailable } from "./indexedDB";

/**
 * Hook yang resolve semua foto URL di wedding data.
 * Handle foto yang disimpan di IndexedDB (mobile demo mode).
 */
export function useResolvedWeddingData() {
  const { mergedData, ...rest } = useWedding();
  const [resolvedData, setResolvedData] = useState(mergedData);

  useEffect(() => {
    const resolvePhotos = async () => {
      const resolved = { ...mergedData };
      const photos = { ...mergedData.photos };

      // Resolve setiap foto
      const photoKeys = Object.keys(photos) as string[];
      
      for (const key of photoKeys) {
        const photoUrl = photos[key as keyof typeof photos];
        
        if (!photoUrl) continue;

        // Jika sudah base64 atau HTTP URL, skip
        if (photoUrl.startsWith("data:") || photoUrl.startsWith("http://") || photoUrl.startsWith("https://")) {
          continue;
        }

        // Jika IndexedDB reference, resolve
        if (photoUrl.startsWith("indexeddb:") && isIndexedDBAvailable()) {
          const dbKey = photoUrl.replace("indexeddb:", "");
          try {
            const url = await getPhoto(dbKey);
            if (url) {
              photos[key] = url;
            }
          } catch (err) {
            console.error(`Gagal resolve foto ${key}:`, err);
          }
        }
      }

      resolved.photos = photos;
      setResolvedData(resolved);
    };

    resolvePhotos();
  }, [mergedData]);

  return { mergedData: resolvedData, ...rest };
}
