-- ============================================================
-- SETUP DATABASE SUPABASE
-- Jalankan script ini di Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================

-- 1. TABEL SETTINGS (menyimpan data undangan wedding)
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- Insert satu baris default
INSERT INTO settings (data) VALUES ('{}'::jsonb);

-- 2. TABEL ADMIN PROFILES (menyimpan role admin)
CREATE TABLE IF NOT EXISTS admin_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('admin', 'super_admin')),
  name text,
  created_at timestamptz DEFAULT now()
);

-- 3. TABEL WISHES / UCAPAN (opsional - untuk ucapan tamu)
CREATE TABLE IF NOT EXISTS wishes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  message text NOT NULL,
  attendance text DEFAULT 'hadir' CHECK (attendance IN ('hadir', 'tidak_hadir', 'ragu')),
  created_at timestamptz DEFAULT now()
);

-- 4. STORAGE BUCKET untuk foto
INSERT INTO storage.buckets (id, name, public)
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;

-- SETTINGS: Semua orang bisa baca, hanya admin yang bisa update
CREATE POLICY "settings_select_public" ON settings
  FOR SELECT USING (true);

CREATE POLICY "settings_update_admin" ON settings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.user_id = auth.uid()
    )
  );

-- ADMIN PROFILES: Semua orang bisa baca, hanya super_admin yang bisa insert/update/delete
CREATE POLICY "admin_profiles_select_public" ON admin_profiles
  FOR SELECT USING (true);

CREATE POLICY "admin_profiles_insert_super" ON admin_profiles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.user_id = auth.uid()
      AND admin_profiles.role = 'super_admin'
    )
  );

CREATE POLICY "admin_profiles_update_super" ON admin_profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.user_id = auth.uid()
      AND admin_profiles.role = 'super_admin'
    )
  );

CREATE POLICY "admin_profiles_delete_super" ON admin_profiles
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.user_id = auth.uid()
      AND admin_profiles.role = 'super_admin'
    )
  );

-- WISHES: Semua orang bisa baca & insert, hanya admin yang bisa delete
CREATE POLICY "wishes_select_public" ON wishes
  FOR SELECT USING (true);

CREATE POLICY "wishes_insert_public" ON wishes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "wishes_delete_admin" ON wishes
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.user_id = auth.uid()
    )
  );

-- STORAGE: Semua orang bisa baca foto, hanya admin yang bisa upload
CREATE POLICY "photos_select_public" ON storage.objects
  FOR SELECT USING (bucket_id = 'photos');

CREATE POLICY "photos_insert_admin" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'photos'
    AND EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "photos_update_admin" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'photos'
    AND EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "photos_delete_admin" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'photos'
    AND EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE admin_profiles.user_id = auth.uid()
    )
  );

-- ============================================================
-- SELESAI! Database sudah siap.
-- ============================================================
