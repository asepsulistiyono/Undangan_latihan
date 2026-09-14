import { useCallback, useEffect, useState } from "react";
import { supabase, SUPABASE_ENABLED } from "./supabase";
import { WEDDING as DEFAULT_WEDDING, IMG as DEFAULT_IMG } from "./wedding";

/**
 * Tipe data undangan yang bisa disimpan di DB.
 * Semua field opsional — field yang tidak ada akan diisi dari DEFAULT.
 */
export interface WeddingData {
  initials?: string;
  dateLabel?: string;
  dateShort?: string;
  dateISO?: string;
  city?: string;
  venueMain?: string;
  groom?: Partial<typeof DEFAULT_WEDDING.groom>;
  bride?: Partial<typeof DEFAULT_WEDDING.bride>;
  quote?: Partial<typeof DEFAULT_WEDDING.quote>;
  events?: Array<Partial<(typeof DEFAULT_WEDDING.events)[number]>>;
  story?: Array<Partial<(typeof DEFAULT_WEDDING.story)[number]>>;
  gallery?: Array<Partial<(typeof DEFAULT_WEDDING.gallery)[number]>>;
  gifts?: Array<Partial<(typeof DEFAULT_WEDDING.gifts)[number]>>;
  giftAddress?: string;
  dresscode?: Array<Partial<(typeof DEFAULT_WEDDING.dresscode)[number]>>;
  photos?: Partial<typeof DEFAULT_IMG>;
}

const LS_KEY = "wedding-data-v1";

/**
 * Hook untuk fetch & update data undangan.
 * - Jika Supabase aktif: fetch dari tabel `settings`, subscribe real-time.
 * - Jika tidak: pakai localStorage sebagai fallback (demo mode).
 */
export function useWeddingData() {
  const [data, setData] = useState<WeddingData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (SUPABASE_ENABLED) {
        const { data: rows, error: err } = await supabase
          .from("settings")
          .select("data")
          .limit(1)
          .single();
        if (err && err.code !== "PGRST116") throw err; // PGRST116 = not found
        setData((rows?.data as WeddingData) || {});
      } else {
        const raw = localStorage.getItem(LS_KEY);
        setData(raw ? JSON.parse(raw) : {});
      }
    } catch (e: any) {
      setError(e.message || "Gagal memuat data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Subscribe real-time (jika Supabase aktif)
  useEffect(() => {
    if (!SUPABASE_ENABLED) return;
    const channel = supabase
      .channel("settings-changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "settings" },
        (payload) => {
          setData((payload.new as any).data || {});
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Update data
  const updateData = useCallback(
    async (patch: WeddingData) => {
      const merged = { ...data, ...patch };
      setData(merged);
      try {
        if (SUPABASE_ENABLED) {
          // Cek apakah ada row
          const { data: existing } = await supabase.from("settings").select("id").limit(1);
          if (existing && existing.length > 0) {
            const { error } = await supabase
              .from("settings")
              .update({ data: merged, updated_at: new Date().toISOString() })
              .eq("id", existing[0].id);
            if (error) throw error;
          } else {
            const { error } = await supabase.from("settings").insert({ data: merged });
            if (error) throw error;
          }
        } else {
          localStorage.setItem(LS_KEY, JSON.stringify(merged));
        }
      } catch (e: any) {
        setError(e.message || "Gagal menyimpan");
        throw e;
      }
    },
    [data]
  );

  // Merge dengan default
  const mergedData = mergeWithDefaults(data);

  return { data, mergedData, loading, error, updateData, refetch: fetchData };
}

/**
 * Gabungkan data dari DB dengan default, agar field yang tidak ada tetap terisi.
 */
function mergeWithDefaults(data: WeddingData): typeof DEFAULT_WEDDING & { photos: typeof DEFAULT_IMG } {
  return {
    initials: data.initials ?? DEFAULT_WEDDING.initials,
    dateLabel: data.dateLabel ?? DEFAULT_WEDDING.dateLabel,
    dateShort: data.dateShort ?? DEFAULT_WEDDING.dateShort,
    dateISO: data.dateISO ?? DEFAULT_WEDDING.dateISO,
    city: data.city ?? DEFAULT_WEDDING.city,
    venueMain: data.venueMain ?? DEFAULT_WEDDING.venueMain,
    groom: { ...DEFAULT_WEDDING.groom, ...data.groom },
    bride: { ...DEFAULT_WEDDING.bride, ...data.bride },
    quote: { ...DEFAULT_WEDDING.quote, ...data.quote },
    events: data.events?.length ? data.events.map((e) => ({ ...DEFAULT_WEDDING.events[0], ...e })) : DEFAULT_WEDDING.events,
    story: data.story?.length ? data.story.map((s) => ({ ...DEFAULT_WEDDING.story[0], ...s })) : DEFAULT_WEDDING.story,
    gallery: data.gallery?.length ? data.gallery.map((g) => ({ ...DEFAULT_WEDDING.gallery[0], ...g })) : DEFAULT_WEDDING.gallery,
    gifts: data.gifts?.length ? data.gifts.map((g) => ({ ...DEFAULT_WEDDING.gifts[0], ...g })) : DEFAULT_WEDDING.gifts,
    giftAddress: data.giftAddress ?? DEFAULT_WEDDING.giftAddress,
    dresscode: data.dresscode?.length ? data.dresscode.map((d) => ({ ...DEFAULT_WEDDING.dresscode[0], ...d })) : DEFAULT_WEDDING.dresscode,
    photos: { ...DEFAULT_IMG, ...data.photos },
  };
}
