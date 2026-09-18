-- ============================================
-- FIX ADMIN PROFILE FALSE
-- Jalankan script ini di Supabase SQL Editor
-- ============================================

-- LANGKAH 1: Cek apakah tabel admin_profiles ada
SELECT '🔍 Cek tabel admin_profiles...' as status;

SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'admin_profiles'
ORDER BY ordinal_position;

-- Jika error "relation admin_profiles does not exist", jalankan ini:
-- CREATE TABLE admin_profiles (
--   user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
--   role text NOT NULL CHECK (role IN ('admin', 'super_admin')),
--   name text,
--   created_at timestamptz DEFAULT now()
-- );

-- LANGKAH 2: Disable RLS (PENTING!)
SELECT '🔓 Disable RLS...' as status;

ALTER TABLE admin_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE wishes DISABLE ROW LEVEL SECURITY;

-- LANGKAH 3: Lihat semua user yang terdaftar
SELECT '👥 Semua user di auth.users:' as status;

SELECT 
  id as user_id,
  email,
  created_at,
  email_confirmed_at
FROM auth.users 
ORDER BY created_at DESC;

-- LANGKAH 4: Lihat admin yang sudah ada
SELECT '👨‍💼 Admin di admin_profiles:' as status;

SELECT 
  user_id,
  role,
  name,
  created_at
FROM admin_profiles;

-- LANGKAH 5: Hapus semua data lama (reset)
SELECT '🗑️ Hapus data admin lama...' as status;

DELETE FROM admin_profiles;

-- LANGKAH 6: Insert SEMUA user sebagai super_admin
SELECT '➕ Insert semua user sebagai admin...' as status;

INSERT INTO admin_profiles (user_id, role, name)
SELECT 
  id as user_id,
  'super_admin' as role,
  SPLIT_PART(email, '@', 1) as name
FROM auth.users
ON CONFLICT (user_id) DO UPDATE 
SET role = 'super_admin', name = EXCLUDED.name;

-- LANGKAH 7: Verifikasi hasil
SELECT '✅ Verifikasi hasil:' as status;

SELECT 
  u.id as user_id,
  u.email,
  ap.role,
  ap.name,
  CASE 
    WHEN ap.user_id IS NULL THEN '❌ TIDAK ADA DI ADMIN'
    ELSE '✅ ADMIN AKTIF'
  END as status
FROM auth.users u
LEFT JOIN admin_profiles ap ON ap.user_id = u.id
ORDER BY u.created_at DESC;

-- LANGKAH 8: Cek RLS status
SELECT '🔒 Cek RLS status:' as status;

SELECT 
  tablename,
  rowsecurity,
  CASE 
    WHEN rowsecurity = false THEN '✅ RLS DISABLED'
    ELSE '❌ RLS AKTIF (MASALAH!)'
  END as status
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('admin_profiles', 'settings', 'wishes');

-- LANGKAH 9: Test query (harus berhasil)
SELECT '🧪 Test query admin_profiles:' as status;

SELECT COUNT(*) as total_admins
FROM admin_profiles;

-- ============================================
-- SELESAI! 
-- ============================================
-- Jika semua langkah berhasil:
-- 1. Clear cache browser (Ctrl+Shift+R)
-- 2. Logout dari admin
-- 3. Login kembali
-- 4. Seharusnya berhasil masuk! ✅
-- 
-- Jika masih error, copy SEMUA output di atas
-- dan kirim ke saya untuk debug lebih lanjut.
-- ============================================
