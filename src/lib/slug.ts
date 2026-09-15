/**
 * Utility untuk slug URL undangan yang personal.
 * Contoh: "Putra" + "Putri" → "putra_dan_putri"
 */

const LS_SLUGS = "wedding-slugs-v1";

/**
 * Generate slug dari nama kedua mempelai.
 * - Lowercase
 * - Ganti spasi dengan underscore
 * - Hapus karakter non-alfanumerik (kecuali underscore)
 * - Format: {nama_pria}_dan_{nama_wanita}
 */
export function generateSlug(groomName: string, brideName: string): string {
  const clean = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "")
      .replace(/_+/g, "_")
      .replace(/^_|_$/g, "");

  const groom = clean(groomName) || "mempelai";
  const bride = clean(brideName) || "mempelai";

  return `${groom}_dan_${bride}`;
}

/**
 * Simpan mapping slug → userId di localStorage.
 */
export function saveSlugMapping(slug: string, userId: string): void {
  try {
    const raw = localStorage.getItem(LS_SLUGS);
    const map: Record<string, string> = raw ? JSON.parse(raw) : {};
    map[slug] = userId;
    localStorage.setItem(LS_SLUGS, JSON.stringify(map));
  } catch {
    // ignore
  }
}

/**
 * Lookup userId dari slug.
 */
export function getUserIdFromSlug(slug: string): string | null {
  try {
    const raw = localStorage.getItem(LS_SLUGS);
    if (!raw) return null;
    const map: Record<string, string> = JSON.parse(raw);
    return map[slug] || null;
  } catch {
    return null;
  }
}

/**
 * Hapus slug mapping (saat admin dihapus).
 */
export function removeSlugByUserId(userId: string): void {
  try {
    const raw = localStorage.getItem(LS_SLUGS);
    if (!raw) return;
    const map: Record<string, string> = JSON.parse(raw);
    const newMap: Record<string, string> = {};
    for (const [slug, uid] of Object.entries(map)) {
      if (uid !== userId) newMap[slug] = uid;
    }
    localStorage.setItem(LS_SLUGS, JSON.stringify(newMap));
  } catch {
    // ignore
  }
}

/**
 * Cek apakah hash route adalah slug undangan (bukan admin/tamu).
 * Return slug jika ya, null jika bukan.
 */
export function parseInvitationSlug(hash: string): string | null {
  const path = hash.replace(/^#\/?/, "").trim();
  if (!path) return null;
  if (path === "admin" || path.startsWith("admin/") || path === "tamu") return null;
  // Valid slug: hanya huruf kecil, angka, dan underscore
  if (/^[a-z0-9_]+$/.test(path) && path.includes("_dan_")) {
    return path;
  }
  return null;
}
