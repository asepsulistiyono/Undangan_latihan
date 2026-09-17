import imageCompression from "browser-image-compression";

/**
 * Kompresi agresif untuk foto undangan.
 * Target: < 150KB untuk hero, < 80KB untuk thumbnail, < 200KB untuk galeri.
 */
export async function compressImage(
  file: File,
  opts: {
    maxSizeMB?: number;
    maxWidthOrHeight?: number;
    quality?: number;
    useWebWorker?: boolean;
    onProgress?: (percent: number) => void;
  } = {}
): Promise<File> {
  const {
    maxSizeMB = 0.15,
    maxWidthOrHeight = 1600,
    quality = 0.72,
    useWebWorker = true,
    onProgress,
  } = opts;

  // Jika bukan gambar, lempar
  if (!file.type.startsWith("image/")) {
    throw new Error("File harus berupa gambar");
  }

  // Deteksi mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  // Untuk mobile, disable web worker karena sering bermasalah
  const shouldUseWebWorker = isMobile ? false : useWebWorker;

  try {
    // Percobaan pertama dengan setting normal
    const compressed = await imageCompression(file, {
      maxSizeMB,
      maxWidthOrHeight,
      useWebWorker: shouldUseWebWorker,
      initialQuality: quality,
      fileType: "image/webp",
      onProgress,
    });

    // Beri nama baru agar jelas
    const newName = file.name.replace(/\.[^.]+$/, "") + ".webp";
    return new File([compressed], newName, { type: "image/webp" });
  } catch (firstError: any) {
    // Jika gagal dan ini mobile, coba lagi dengan setting lebih rendah
    if (isMobile) {
      console.warn("Kompresi pertama gagal, mencoba dengan setting lebih rendah:", firstError);
      
      try {
        // Percobaan kedua dengan ukuran lebih kecil dan kualitas lebih rendah
        const compressed = await imageCompression(file, {
          maxSizeMB: Math.min(maxSizeMB, 0.1), // Max 100KB
          maxWidthOrHeight: Math.min(maxWidthOrHeight, 1000), // Max 1000px
          useWebWorker: false, // Disable web worker
          initialQuality: Math.min(quality, 0.6), // Quality 60%
          fileType: "image/webp",
          onProgress,
        });

        const newName = file.name.replace(/\.[^.]+$/, "") + ".webp";
        return new File([compressed], newName, { type: "image/webp" });
      } catch (secondError: any) {
        // Jika masih gagal, coba fallback ke JPEG
        console.warn("Kompresi WebP gagal, mencoba JPEG:", secondError);
        
        try {
          const compressed = await imageCompression(file, {
            maxSizeMB: Math.min(maxSizeMB, 0.15),
            maxWidthOrHeight: Math.min(maxWidthOrHeight, 1200),
            useWebWorker: false,
            initialQuality: 0.7,
            fileType: "image/jpeg", // Fallback ke JPEG
            onProgress,
          });

          const newName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
          return new File([compressed], newName, { type: "image/jpeg" });
        } catch (finalError: any) {
          throw new Error(
            `Gagal mengompresi foto: ${finalError.message || "Unknown error"}. ` +
            `Silakan gunakan foto yang lebih kecil atau format lain.`
          );
        }
      }
    } else {
      // Untuk desktop, langsung throw error
      throw new Error(
        `Gagal mengompresi foto: ${firstError.message || "Unknown error"}. ` +
        `Silakan coba foto lain.`
      );
    }
  }
}

/** Kompresi preset untuk berbagai jenis foto */
export const PRESETS = {
  hero: { maxSizeMB: 0.25, maxWidthOrHeight: 1800, quality: 0.78 },
  portrait: { maxSizeMB: 0.18, maxWidthOrHeight: 1400, quality: 0.75 },
  gallery: { maxSizeMB: 0.15, maxWidthOrHeight: 1500, quality: 0.72 },
  thumbnail: { maxSizeMB: 0.08, maxWidthOrHeight: 900, quality: 0.7 },
} as const;

/**
 * Hitung ukuran file dalam format yang mudah dibaca.
 */
export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
