/**
 * Update meta tags Open Graph untuk preview link di WhatsApp, Facebook, dll
 */
export function updateMetaTags(data: {
  title?: string;
  description?: string;
  image?: string;
}) {
  if (typeof document === 'undefined') return;

  // Update title
  if (data.title) {
    document.title = data.title;
  }

  // Update atau buat meta description
  updateOrCreateMeta('description', data.description || '');

  // Update Open Graph tags
  updateOrCreateMeta('og:title', data.title || '');
  updateOrCreateMeta('og:description', data.description || '');
  if (data.image) {
    updateOrCreateMeta('og:image', data.image);
  }
  updateOrCreateMeta('og:type', 'website');

  // Update Twitter Card tags
  updateOrCreateMeta('twitter:card', 'summary_large_image');
  updateOrCreateMeta('twitter:title', data.title || '');
  updateOrCreateMeta('twitter:description', data.description || '');
  if (data.image) {
    updateOrCreateMeta('twitter:image', data.image);
  }
}

function updateOrCreateMeta(name: string, content: string) {
  // Cari meta tag yang sudah ada
  let meta = document.querySelector(`meta[name="${name}"]`) ||
             document.querySelector(`meta[property="${name}"]`);

  if (meta) {
    // Update yang sudah ada
    meta.setAttribute('content', content);
  } else {
    // Buat yang baru
    meta = document.createElement('meta');
    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      meta.setAttribute('property', name);
    } else {
      meta.setAttribute('name', name);
    }
    meta.setAttribute('content', content);
    document.head.appendChild(meta);
  }
}
