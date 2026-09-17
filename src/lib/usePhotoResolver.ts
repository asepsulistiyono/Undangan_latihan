import { useEffect, useRef, useState } from "react";
import { getPhoto, isIndexedDBAvailable } from "./indexedDB";

/**
 * Hook untuk resolve photo URL.
 * Handle 3 jenis URL:
 * 1. Base64 data URL (desktop demo mode)
 * 2. HTTP/HTTPS URL (Supabase production)
 * 3. IndexedDB reference (mobile demo mode) - format: "indexeddb:photo-key"
 */
export function usePhotoResolver(photoUrl: string | undefined): string | null {
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    // Reset state saat photoUrl berubah
    setResolvedUrl(null);
    
    if (!photoUrl) {
      return;
    }

    // Base64 data URL - langsung gunakan
    if (photoUrl.startsWith("data:")) {
      setResolvedUrl(photoUrl);
      return;
    }

    // HTTP/HTTPS URL - langsung gunakan
    if (photoUrl.startsWith("http://") || photoUrl.startsWith("https://")) {
      setResolvedUrl(photoUrl);
      return;
    }

    // Blob URL - langsung gunakan (sudah di-resolve sebelumnya)
    if (photoUrl.startsWith("blob:")) {
      setResolvedUrl(photoUrl);
      return;
    }

    // IndexedDB reference - load dari IndexedDB
    if (photoUrl.startsWith("indexeddb:")) {
      const key = photoUrl.replace("indexeddb:", "");
      
      if (!isIndexedDBAvailable()) {
        console.warn("IndexedDB tidak tersedia, tidak bisa load foto");
        return;
      }

      let cancelled = false;

      const loadPhoto = async () => {
        try {
          const url = await getPhoto(key);
          
          if (cancelled) {
            // Jika effect sudah di-cancel, revoke URL immediately
            if (url) URL.revokeObjectURL(url);
            return;
          }
          
          if (url) {
            // Revoke old object URL jika ada
            if (objectUrlRef.current) {
              URL.revokeObjectURL(objectUrlRef.current);
            }
            objectUrlRef.current = url;
            setResolvedUrl(url);
          } else {
            console.warn("Foto tidak ditemukan di IndexedDB:", key);
          }
        } catch (err) {
          if (!cancelled) {
            console.error("Gagal load foto dari IndexedDB:", err);
          }
        }
      };

      loadPhoto();

      // Cleanup saat component unmount atau photoUrl berubah
      return () => {
        cancelled = true;
      };
    }

    // Unknown format
    console.warn("Unknown photo URL format:", photoUrl);
  }, [photoUrl]);

  // Revoke object URL saat component unmount
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, []);

  return resolvedUrl;
}
