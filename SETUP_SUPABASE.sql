-- ============================================================
-- PANDUAN SETUP SUPABASE - JALANKAN DI SQL EDITOR
-- ============================================================
-- 
-- CARA MENJALANKAN:
-- 1. Buka Supabase Dashboard → SQL Editor (sidebar kiri)
-- 2. Klik "New Query"
-- 3. Copy-paste SEMUA script di bawah ini
-- 4. Klik tombol "Run" (atau tekan Ctrl+Enter)
--
-- ============================================================

-- LANGKAH 1: Buat tabel settings
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- LANGKAH 2: Buat tabel admin_profiles
CREATE TABLE IF NOT EXISTS admin_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('admin', 'super_admin')),
  name text,
  created_at timestamptz DEFAULT now()
);

-- LANGKAH 3: Buat tabel wishes
CREATE TABLE IF NOT EXISTS wishes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  message text NOT NULL,
  attendance text DEFAULT 'hadir' CHECK (attendance IN ('hadir', 'tidak_hadir', 'ragu')),
  created_at timestamptz DEFAULT now()
);

-- LANGKAH 4: Insert data default
INSERT INTO settings (data) VALUES ('{}'::jsonb) ON CONFLICT DO NOTHING;

-- LANGKAH 5: DISABLE RLS (PENTING! Agar tidak error 401/500)
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE wishes DISABLE ROW LEVEL SECURITY;

-- LANGKAH 6: Hapus semua policy lama yang mungkin bermasalah
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON ' || quote_ident(r.tablename);
    END LOOP;
END $$;

-- LANGKAH 7: Buat storage bucket untuk foto
INSERT INTO storage.buckets (id, name, public)
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO NOTHING;

-- LANGKAH 8: Verifikasi setup berhasil
SELECT '✅ Setup berhasil!' as status;
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename IN ('settings', 'admin_profiles', 'wishes');
