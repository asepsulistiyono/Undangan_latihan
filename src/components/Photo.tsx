import { usePhotoResolver } from "../lib/usePhotoResolver";

interface PhotoProps {
  src: string | undefined;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
}

/**
 * Component foto yang otomatis resolve URL dari IndexedDB jika perlu.
 * Handle 3 jenis URL:
 * 1. Base64 data URL (desktop demo mode)
 * 2. HTTP/HTTPS URL (Supabase production)
 * 3. IndexedDB reference (mobile demo mode) - format: "indexeddb:photo-key"
 */
export default function Photo({ src, alt, className = "", fallback }: PhotoProps) {
  const resolvedUrl = usePhotoResolver(src);

  // Loading state - tampilkan placeholder saat foto belum di-resolve
  if (!resolvedUrl && src?.startsWith("indexeddb:")) {
    return (
      <div className={`flex items-center justify-center bg-pine-900/50 ${className}`}>
        <div className="size-8 animate-spin rounded-full border-2 border-gold-400 border-t-transparent" />
      </div>
    );
  }

  // Error state - tampilkan fallback atau nothing
  if (!resolvedUrl) {
    return fallback ? <>{fallback}</> : null;
  }

  return <img src={resolvedUrl} alt={alt} className={className} />;
}
