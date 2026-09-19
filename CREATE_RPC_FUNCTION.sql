-- ============================================
-- CREATE RPC FUNCTION FOR ADMIN CREATION
-- Jalankan di Supabase SQL Editor
-- ============================================

-- Drop function jika sudah ada
DROP FUNCTION IF EXISTS public.create_new_admin(TEXT, TEXT, TEXT, TEXT);

-- Create function baru
CREATE OR REPLACE FUNCTION public.create_new_admin(
  p_email TEXT,
  p_password TEXT,
  p_role TEXT,
  p_name TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER -- Jalankan dengan privilege admin
SET search_path = public, auth
AS $$
DECLARE
  new_user_id UUID;
  new_email TEXT;
BEGIN
  -- Validasi input
  IF p_email IS NULL OR p_email = '' THEN
    RAISE EXCEPTION 'Email tidak boleh kosong';
  END IF;
  
  IF p_password IS NULL OR LENGTH(p_password) < 6 THEN
    RAISE EXCEPTION 'Password minimal 6 karakter';
  END IF;
  
  -- Tambahkan domain jika tidak ada
  IF p_email NOT LIKE '%@%' THEN
    new_email := p_email || '@wedding.local';
  ELSE
    new_email := p_email;
  END IF;
  
  -- Cek apakah user sudah ada
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = new_email) THEN
    RAISE EXCEPTION 'Email sudah terdaftar: %', new_email;
  END IF;
  
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
    new_email,
    crypt(p_password, gen_salt('bf')),
    NOW(), -- Auto confirm email
    '{"provider": "email", "providers": ["email"]}'::jsonb,
    jsonb_build_object('name', COALESCE(p_name, SPLIT_PART(new_email, '@', 1)), 'role', p_role),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  )
  RETURNING id INTO new_user_id;
  const { data, error } = await supabase.functions.invoke('create-new-admin', {
  body: {
    email: 'eka@wedding.local',
    password: 'password-minimal-8-karakter',
  },
});

if (error) {
  console.error(error);
} else {
  console.log(data);
}
  -- Insert ke admin_profiles
  INSERT INTO admin_profiles (user_id, role, name)
  VALUES (new_user_id, p_role::TEXT, COALESCE(p_name, SPLIT_PART(new_email, '@', 1)));
  
  RETURN new_user_id;
END;
$$;

-- Grant permission
GRANT EXECUTE ON FUNCTION public.create_new_admin TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_new_admin TO anon;

-- Test function (optional)
-- SELECT create_new_admin('testadmin', 'password123', 'admin', 'Test Admin');

-- Verifikasi function sudah dibuat
SELECT '✅ Function create_new_admin berhasil dibuat!' as status;
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_name = 'create_new_admin';
