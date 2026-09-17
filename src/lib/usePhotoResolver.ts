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
    if (!photoUrl) {
      setResolvedUrl(null);
      return;
    }

    // Base64 atau HTTP URL - langsung gunakan
    if (photoUrl.startsWith("data:") || photoUrl.startsWith("blob:") || photoUrl.startsWith("http://") || photoUrl.startsWith("https://")) {
      setResolvedUrl(photoUrl);
      return;
    }

    // IndexedDB reference - load dari IndexedDB
    if (photoUrl.startsWith("indexeddb:")) {
      const key = photoUrl.replace("indexeddb:", "");
      
      if (!isIndexedDBAvailable()) {
        console.warn("IndexedDB tidak tersedia, tidak bisa load foto");
        setResolvedUrl(null);
        return;
      }

      let cancelled = false;

      getPhoto(key)
        .then((url) => {
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
            setResolvedUrl(null);
          }
        })
        .catch((err) => {
          if (!cancelled) {
            console.error("Gagal load foto dari IndexedDB:", err);
            setResolvedUrl(null);
          }
        });

      // Cleanup saat unmount atau photoUrl berubah
      return () => {
        cancelled = true;
        // Jangan revoke object URL di sini karena masih digunakan oleh <img>
        // Object URL akan di-revoke saat component unmount atau saat ada URL baru
      };
    }

    // Unknown format
    console.warn("Unknown photo URL format:", photoUrl);
    setResolvedUrl(null);
  }, [photoUrl]);

  // Revoke object URL saat component unmount
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  return resolvedUrl;
}

/**
 * Resolve photo URL secara synchronous untuk use case sederhana.
 * Untuk base64 dan HTTP URL, langsung return.
 * Untuk IndexedDB, perlu gunakan usePhotoResolver hook.
 */
export function resolvePhotoUrlSync(photoUrl: string | undefined): string | null {
  if (!photoUrl) return null;
  
  // Base64 atau HTTP URL - langsung return
  if (photoUrl.startsWith("data:") || photoUrl.startsWith("http://") || photoUrl.startsWith("https://")) {
    return photoUrl;
  }

  // IndexedDB reference - tidak bisa resolve synchronous
  if (photoUrl.startsWith("indexeddb:")) {
    return null; // Caller harus gunakan usePhotoResolver hook
  }

  return null;
}
