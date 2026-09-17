import { useRef, useState, useEffect, type ChangeEvent } from "react";
import { compressImage, formatSize, PRESETS } from "../../lib/imageCompress";
import { supabase, BUCKET, SUPABASE_ENABLED } from "../../lib/supabase";
import { IconUpload } from "../Icons";
import { savePhoto, getPhoto, isIndexedDBAvailable } from "../../lib/indexedDB";

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

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  // Load preview dari IndexedDB saat component mount (untuk persist setelah reload)
  useEffect(() => {
    if (!currentUrl || !currentUrl.startsWith("indexeddb:")) return;
    
    const loadPreview = async () => {
      if (!isIndexedDBAvailable()) return;
      
      const dbKey = currentUrl.replace("indexeddb:", "");
      try {
        const url = await getPhoto(dbKey);
        if (url) {
          setPreview(url);
        }
      } catch (err) {
        console.error("Gagal load preview dari IndexedDB:", err);
      }
    };
    
    loadPreview();
  }, [currentUrl]);

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setProgress(0);
    setUploading(true);

    try {
      // Validasi ukuran file
      const maxSize = isMobile ? 10 * 1024 * 1024 : 20 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error(
          `File terlalu besar (${formatSize(file.size)}). Maksimal ${isMobile ? "10MB" : "20MB"}.`
        );
      }

      // Kompresi foto
      const compressOptions = {
        ...PRESETS[preset],
        ...(isMobile && {
          maxWidthOrHeight: Math.min(PRESETS[preset].maxWidthOrHeight, 1200),
          maxSizeMB: Math.min(PRESETS[preset].maxSizeMB, 0.15),
          quality: Math.min(PRESETS[preset].quality, 0.7),
        }),
        onProgress: (p: number) => setProgress(Math.round(p)),
      };

      const compressed = await compressImage(file, compressOptions);

      // Upload berdasarkan mode
      if (SUPABASE_ENABLED) {
        // Production mode: upload ke Supabase Storage
        const localUrl = URL.createObjectURL(compressed);
        setPreview(localUrl);

        const fileName = `${Date.now()}-${compressed.name}`;
        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(fileName, compressed, {
            cacheControl: "3600",
            upsert: false,
            contentType: compressed.type,
          });
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
        onUpload(data.publicUrl);
      } else if (isMobile && isIndexedDBAvailable()) {
        // Mobile + Demo mode: gunakan IndexedDB (lebih reliable)
        // Simpan ke IndexedDB
        const photoKey = `photo-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        await savePhoto(photoKey, compressed);
        
        // Load preview dari IndexedDB (persist setelah reload)
        const previewUrl = await getPhoto(photoKey);
        if (previewUrl) {
          setPreview(previewUrl);
        }
        
        // Simpan reference key di localStorage (bukan base64)
        onUpload(`indexeddb:${photoKey}`);
      } else {
        // Desktop + Demo mode: gunakan base64 di localStorage
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          
          // Cek ukuran base64
          if (base64.length > 4 * 1024 * 1024) { // 4MB limit untuk base64
            setError(
              `Foto terlalu besar untuk disimpan di browser. ` +
              `Silakan gunakan foto yang lebih kecil atau setup Supabase untuk storage cloud.`
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
      
      let errorMessage = "Gagal mengunggah foto";
      
      if (err.message?.includes("terlalu besar")) {
        errorMessage = err.message;
      } else if (err.message?.includes("memory") || err.message?.includes("quota")) {
        errorMessage = "Memory browser penuh. Silakan refresh halaman dan coba foto yang lebih kecil.";
      } else if (err.message?.includes("IndexedDB")) {
        errorMessage = "Gagal menyimpan foto. Browser tidak mendukung IndexedDB atau storage penuh.";
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
              {isMobile && (
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
              {isMobile ? "Mode demo — foto tersimpan di IndexedDB (persistent)" : "Mode demo — foto tersimpan di browser"}
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
