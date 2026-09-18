-- ============================================================
-- FIX: SUPER ADMIN TIDAK BISA MEMBUAT ADMIN BARU
-- ============================================================
-- 
-- JALANKAN SCRIPT INI DI SQL EDITOR SUPABASE
-- 
-- ============================================================

-- 1. PASTIKAN RLS SUDAH DI-DISABLE
ALTER TABLE admin_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE wishes DISABLE ROW LEVEL SECURITY;

-- 2. HAPUS SEMUA POLICY
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON ' || quote_ident(r.tablename);
    END LOOP;
END $$;

-- 3. BUAT FUNCTION UNTUK MEMBUAT ADMIN BARU
CREATE OR REPLACE FUNCTION public.create_new_admin(
  p_email TEXT,
  p_password TEXT,
  p_role TEXT,
  p_name TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER -- Jalankan dengan privilege admin
AS $$
DECLARE
  new_user_id UUID;
BEGIN
  -- Buat user baru di auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  )
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    p_email,
    crypt(p_password, gen_salt('bf')),
    NOW(), -- Auto confirm email
    '{"provider": "email", "providers": ["email"]}',
    jsonb_build_object('name', p_name, 'role', p_role),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  )
  RETURNING id INTO new_user_id;
  
  -- Insert ke admin_profiles
  INSERT INTO admin_profiles (user_id, role, name)
  VALUES (new_user_id, p_role::TEXT, p_name);
  
  RETURN new_user_id;
END;
$$;

-- 4. GRANT PERMISSION
GRANT EXECUTE ON FUNCTION public.create_new_admin TO authenticated;

-- 5. VERIFIKASI
SELECT '✅ Function created successfully!' as status;
SELECT routine_name FROM information_schema.routines WHERE routine_name = 'create_new_admin';
