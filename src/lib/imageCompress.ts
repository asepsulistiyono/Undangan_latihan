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

  const compressed = await imageCompression(file, {
    maxSizeMB,
    maxWidthOrHeight,
    useWebWorker,
    initialQuality: quality,
    fileType: "image/webp",
    onProgress,
  });

  // Beri nama baru agar jelas
  const newName = file.name.replace(/\.[^.]+$/, "") + ".webp";
  return new File([compressed], newName, { type: "image/webp" });
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
