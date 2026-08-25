import { WEDDING } from "./wedding";

export type Guest = { id: string; name: string; phone: string };

export const LS_GUESTS = "raka-sekar-guests-v1";
export const LS_TEMPLATE = "raka-sekar-template-v1";

export const DEFAULT_TEMPLATE = `Assalamu'alaikum Warahmatullahi Wabarakatuh.

Kepada Yth. Bapak/Ibu/Saudara/i
*{nama}*

Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir di pernikahan kami:

*${WEDDING.groom.short} & ${WEDDING.bride.short}*
${WEDDING.dateLabel} · ${WEDDING.venueMain}

Buka undangan digital kami melalui tautan berikut:
{link}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu. Terima kasih.

Wassalamu'alaikum Warahmatullahi Wabarakatuh.
*Raka & Sekar beserta keluarga*`;

/* ---------- URL & tautan ---------- */

export function baseUrl(): string {
  return `${window.location.origin}${window.location.pathname}`;
}

/** Tautan undangan pribadi — nama tamu tersandi langsung di URL. */
export function guestLink(name: string): string {
  return `${baseUrl()}?to=${encodeURIComponent(name)}`;
}

/* ---------- nomor WhatsApp ---------- */

/** "0812-3456-7890" → "6281234567890" */
export function normalizePhone(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("0")) d = "62" + d.slice(1);
  else if (d.startsWith("8")) d = "62" + d;
  return d;
}

export function waShareLink(phone: string, message: string): string {
  const text = encodeURIComponent(message);
  return phone
    ? `https://wa.me/${normalizePhone(phone)}?text=${text}`
    : `https://wa.me/?text=${text}`;
}

/* ---------- parser input massal ---------- */

/**
 * Satu nama per baris. Nomor HP opsional dipisah pipa:
 *   Bapak H. Ahmad Fauzi
 *   Ibu Siti Aminah | 081234567890
 */
export function parseBulk(text: string): { name: string; phone: string }[] {
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, phone] = line.split("|").map((s) => s.trim());
      return { name: name || "", phone: phone || "" };
    })
    .filter((g) => g.name.length > 0);
}

/* ---------- template pesan ---------- */

export function fillTemplate(template: string, name: string, link: string): string {
  return template.split("{nama}").join(name).split("{link}").join(link);
}

/* ---------- penyimpanan ---------- */

export function loadGuests(): Guest[] {
  try {
    const raw = localStorage.getItem(LS_GUESTS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((g) => g && g.name) : [];
  } catch {
    return [];
  }
}

export function saveGuests(guests: Guest[]): void {
  try {
    localStorage.setItem(LS_GUESTS, JSON.stringify(guests));
  } catch {
    /* penyimpanan penuh — abaikan */
  }
}

export function loadTemplate(): string {
  try {
    return localStorage.getItem(LS_TEMPLATE) || DEFAULT_TEMPLATE;
  } catch {
    return DEFAULT_TEMPLATE;
  }
}

export function saveTemplate(t: string): void {
  try {
    localStorage.setItem(LS_TEMPLATE, t);
  } catch {
    /* abaikan */
  }
}

export function makeId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/* ---------- ekspor ---------- */

export function downloadFile(filename: string, content: string, mime: string): void {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const escCsv = (s: string) => `"${s.split('"').join('""')}"`;

export function toCsv(guests: Guest[]): string {
  const head = "Nama,No HP,Link Undangan";
  const rows = guests.map((g) =>
    [escCsv(g.name), escCsv(g.phone), escCsv(guestLink(g.name))].join(",")
  );
  return "\uFEFF" + [head, ...rows].join("\n");
}

export function toLinksTxt(guests: Guest[]): string {
  return guests.map((g) => `${g.name}\n${guestLink(g.name)}`).join("\n\n");
}
