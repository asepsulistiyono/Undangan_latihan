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

    try {
      // 1. Kompresi agresif
      const compressed = await compressImage(file, {
        ...PRESETS[preset],
        onProgress: (p) => setProgress(Math.round(p)),
      });

      // 2. Preview lokal
      const localUrl = URL.createObjectURL(compressed);
      setPreview(localUrl);

      // 3. Upload ke Supabase Storage (jika aktif)
      if (SUPABASE_ENABLED) {
        const fileName = `${Date.now()}-${compressed.name}`;
        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(fileName, compressed, {
            cacheControl: "3600",
            upsert: false,
            contentType: "image/webp",
          });
        if (uploadError) throw uploadError;

        // 4. Dapatkan URL publik
        const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
        onUpload(data.publicUrl);
      } else {
        // Fallback: pakai URL lokal (demo mode)
        onUpload(localUrl);
      }
    } catch (err: any) {
      setError(err.message || "Gagal mengunggah foto");
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
            <p className="text-xs text-rose-300">{error}</p>
          )}

          {!SUPABASE_ENABLED && (preview || currentUrl) && (
            <p className="text-[10px] text-sage-300/50">
              Mode demo — foto tidak tersimpan permanen
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
