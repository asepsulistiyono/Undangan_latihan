import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase.
 * Jika env variable tidak tersedia, kita tetap membuat client "kosong"
 * agar kode tetap bisa di-compile. Layer `useWeddingData` akan mendeteksi
 * kondisi ini dan beralih ke mode lokal (localStorage).
 */
const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string) || "";
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || "";

export const SUPABASE_ENABLED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase: SupabaseClient = createClient(
  SUPABASE_URL || "https://placeholder.supabase.co",
  SUPABASE_ANON_KEY || "placeholder",
  {
    auth: { persistSession: true, autoRefreshToken: true },
  }
);

export const BUCKET = "photos";

/**
 * Schema tabel yang dibutuhkan:
 *
 * CREATE TABLE settings (
 *   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 *   data jsonb NOT NULL,
 *   updated_at timestamptz DEFAULT now(),
 *   updated_by uuid REFERENCES auth.users(id)
 * );
 * INSERT INTO settings (data) VALUES ('{}'::jsonb);
 *
 * CREATE TABLE admin_profiles (
 *   user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
 *   role text NOT NULL CHECK (role IN ('admin','super_admin')),
 *   name text,
 *   created_at timestamptz DEFAULT now()
 * );
 *
 * -- Storage bucket:
 * INSERT INTO storage.buckets (id, name, public) VALUES ('photos','photos', true);
 *
 * -- RLS policies (contoh):
 * -- SELECT semua orang boleh baca settings
 * -- UPDATE hanya user yang punya admin_profiles
 * -- Storage: semua orang boleh baca, hanya admin boleh upload
 */
