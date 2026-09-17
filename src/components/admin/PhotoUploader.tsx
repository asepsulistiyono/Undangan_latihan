import { useRef, useState, type ChangeEvent } from "react";
import { compressImage, formatSize, PRESETS } from "../../lib/imageCompress";
import { supabase, BUCKET, SUPABASE_ENABLED } from "../../lib/supabase";
import { IconUpload, IconCheck, IconClose } from "../Icons";

interface PhotoUploaderProps {
  label: string;
  currentUrl?: string;
  onUpload: (url: string) => void;
  preset?: keyof typeof PRESETS;
  description?: string;
}

export default function PhotoUploader({
  label,
  currentUrl,
  onUpload,
  preset = "gallery",
  description,
}: PhotoUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setProgress(0);
    setUploading(true);

    // Deteksi apakah ini mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    try {
      // Validasi ukuran file (max 10MB untuk mobile, 20MB untuk desktop)
      const maxSize = isMobile ? 10 * 1024 * 1024 : 20 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error(
          `File terlalu besar (${formatSize(file.size)}). Maksimal ${isMobile ? "10MB" : "20MB"} untuk ${isMobile ? "mobile" : "desktop"}.`
        );
      }

      // 1. Kompresi agresif dengan setting berbeda untuk mobile
      const compressOptions = {
        ...PRESETS[preset],
        // Untuk mobile, gunakan ukuran lebih kecil untuk menghemat memory
        ...(isMobile && {
          maxWidthOrHeight: Math.min(PRESETS[preset].maxWidthOrHeight, 1200),
          maxSizeMB: Math.min(PRESETS[preset].maxSizeMB, 0.1),
          quality: Math.min(PRESETS[preset].quality, 0.65),
        }),
        onProgress: (p: number) => setProgress(Math.round(p)),
      };

      const compressed = await compressImage(file, compressOptions);

      // Validasi ukuran setelah kompresi
      if (compressed.size > 500 * 1024) {
        console.warn("Foto masih besar setelah kompresi:", formatSize(compressed.size));
      }

      // 2. Upload ke Supabase Storage (jika aktif)
      if (SUPABASE_ENABLED) {
        // Preview lokal dulu
        const localUrl = URL.createObjectURL(compressed);
        setPreview(localUrl);

        const fileName = `${Date.now()}-${compressed.name}`;
        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(fileName, compressed, {
            cacheControl: "3600",
            upsert: false,
            contentType: "image/webp",
          });
        if (uploadError) throw uploadError;

        // 3. Dapatkan URL publik
        const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
        onUpload(data.publicUrl);
      } else {
        // Fallback: konversi ke base64 untuk demo mode
        // Cek apakah base64 akan exceed localStorage limit
        const estimatedBase64Size = compressed.size * 1.37; // Base64 adds ~37%
        const localStorageLimit = 5 * 1024 * 1024; // 5MB conservative limit
        
        if (estimatedBase64Size > localStorageLimit) {
          throw new Error(
            `Foto terlalu besar untuk disimpan di browser (${formatSize(compressed.size)}). ` +
            `Silakan gunakan foto yang lebih kecil atau setup Supabase untuk storage cloud.`
          );
        }

        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          
          // Cek lagi ukuran base64
          if (base64.length > localStorageLimit) {
            setError(
              `Foto terlalu besar untuk disimpan. Silakan gunakan foto yang lebih kecil.`
            );
            setUploading(false);
            return;
          }
          
          setPreview(base64);
          onUpload(base64);
        };
        reader.onerror = () => {
          setError("Gagal membaca file. Silakan coba foto lain.");
          setUploading(false);
        };
        reader.readAsDataURL(compressed);
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      
      // Pesan error yang lebih user-friendly
      let errorMessage = "Gagal mengunggah foto";
      
      if (err.message?.includes("too large") || err.message?.includes("terlalu besar")) {
        errorMessage = err.message;
      } else if (err.message?.includes("memory") || err.message?.includes("quota")) {
        errorMessage = "Memory browser penuh. Silakan refresh halaman dan coba foto yang lebih kecil.";
      } else if (err.message?.includes("localStorage")) {
        errorMessage = "Penyimpanan browser penuh. Silakan hapus beberapa data atau setup Supabase.";
      } else if (isMobile) {
        errorMessage = "Gagal upload di mobile. Coba gunakan foto yang lebih kecil atau upload dari komputer.";
      }
      
      setError(errorMessage);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400">
        {label}
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Preview */}
        <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-[3px] border border-gold-500/20 bg-pine-900/50 sm:h-40 sm:w-40">
          {(preview || currentUrl) && (
            <img
              src={preview || currentUrl}
              alt={label}
              className="h-full w-full object-cover"
            />
          )}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-pine-950/80">
              <div className="text-center">
                <div className="mx-auto mb-2 size-8 animate-spin rounded-full border-2 border-gold-400 border-t-transparent" />
                <p className="text-xs text-gold-300">{progress}%</p>
              </div>
            </div>
          )}
        </div>

        {/* Kontrol */}
        <div className="flex flex-1 flex-col justify-between gap-2">
          <div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              disabled={uploading}
              className="hidden"
              id={`upload-${label}`}
            />
            <label
              htmlFor={`upload-${label}`}
              className={`inline-flex cursor-pointer items-center gap-2.5 border border-gold-500/30 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-300 transition-all hover:bg-gold-500 hover:text-pine-950 ${
                uploading ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <IconUpload className="size-4" />
              {uploading ? "Mengunggah..." : "Pilih Foto"}
            </label>
            {description && (
              <p className="mt-2 text-xs text-sage-300/60">{description}</p>
            )}
          </div>

          {error && (
            <div className="rounded-[3px] border border-rose-400/30 bg-rose-400/10 p-3">
              <p className="text-xs text-rose-300">{error}</p>
              {error.includes("mobile") && (
                <div className="mt-2 space-y-1 text-[10px] text-rose-200/80">
                  <p className="font-semibold">Tips untuk upload di HP:</p>
                  <ul className="list-inside list-disc space-y-0.5">
                    <li>Gunakan foto yang sudah di-crop (tidak full resolution)</li>
                    <li>Ukuran ideal: maksimal 2000x2000 pixel</li>
                    <li>Format JPG/PNG (hindari HEIC dari iPhone)</li>
                    <li>Atau upload dari komputer untuk hasil lebih baik</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {!SUPABASE_ENABLED && (preview || currentUrl) && (
            <p className="text-[10px] text-sage-300/50">
              Mode demo — foto tersimpan di browser (max ~3MB total)
            </p>
          )}
          
          {!SUPABASE_ENABLED && !preview && !currentUrl && (
            <p className="text-[10px] text-sage-300/50">
              💡 Tip: Gunakan foto &lt;2MB untuk hasil terbaik di mobile
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
