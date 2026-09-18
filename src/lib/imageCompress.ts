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

  // Untuk mobile, gunakan setting yang lebih konservatif
  const mobileMaxSizeMB = Math.min(maxSizeMB, 0.1); // Max 100KB
  const mobileMaxDimension = Math.min(maxWidthOrHeight, 1200); // Max 1200px
  const mobileQuality = Math.min(quality, 0.65); // Quality 65%

  try {
    // Untuk mobile, langsung gunakan setting konservatif
    const compressed = await imageCompression(file, {
      maxSizeMB: isMobile ? mobileMaxSizeMB : maxSizeMB,
      maxWidthOrHeight: isMobile ? mobileMaxDimension : maxWidthOrHeight,
      useWebWorker: shouldUseWebWorker,
      initialQuality: isMobile ? mobileQuality : quality,
      fileType: "image/jpeg", // Gunakan JPEG untuk kompatibilitas maksimal
      onProgress,
    });

    // Beri nama baru agar jelas
    const newName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([compressed], newName, { type: "image/jpeg" });
  } catch (firstError: any) {
    console.error("Error kompresi pertama:", firstError);
    
    // Jika gagal, coba dengan canvas manual (fallback ultimate)
    if (isMobile) {
      console.warn("Kompresi gagal, mencoba fallback canvas manual...");
      
      try {
        return await compressWithCanvas(file, mobileMaxDimension, mobileQuality);
      } catch (canvasError: any) {
        console.error("Canvas fallback juga gagal:", canvasError);
        
        // Jika semua gagal, return file original (tanpa kompresi)
        console.warn("Semua metode kompresi gagal, menggunakan file original");
        return file;
      }
    } else {
      throw new Error(
        `Gagal mengompresi foto: ${firstError.message || "Unknown error"}. ` +
        `Silakan coba foto lain.`
      );
    }
  }
}

/**
 * Fallback kompresi menggunakan canvas manual
 * Lebih reliable di mobile device
 */
async function compressWithCanvas(
  file: File,
  maxDimension: number,
  quality: number
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Canvas not supported"));
      return;
    }

    img.onload = () => {
      try {
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxDimension) {
            height = (height * maxDimension) / width;
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = (width * maxDimension) / height;
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw image
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to create blob"));
              return;
            }

            const newName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
            const compressedFile = new File([blob], newName, { type: "image/jpeg" });
            resolve(compressedFile);
          },
          "image/jpeg",
          quality
        );
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    // Load image from file
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    reader.readAsDataURL(file);
  });
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
