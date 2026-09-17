import { usePhotoResolver } from "../lib/usePhotoResolver";

interface PhotoProps {
  src: string | undefined;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
}

/**
 * Component foto yang otomatis resolve URL dari IndexedDB jika perlu.
 * Gunakan ini sebagai pengganti <img> untuk foto yang disimpan di IndexedDB.
 */
export default function Photo({ src, alt, className = "", fallback }: PhotoProps) {
  const resolvedUrl = usePhotoResolver(src);

  if (!resolvedUrl) {
    return fallback ? <>{fallback}</> : null;
  }

  return <img src={resolvedUrl} alt={alt} className={className} />;
}
