# 🚀 PANDUAN SETUP SUPABASE - LENGKAP

## ⚡ QUICK START (5 Langkah)

### ✅ LANGKAH 1: Dapatkan Anon Key dari Supabase

1. Buka: https://supabase.com/dashboard/project/allyucwsnwgxbifsthhq/settings/api
2. Scroll ke bagian **"Project API keys"**
3. Copy nilai **`anon` `public`** key (sangat panjang, dimulai dengan `eyJ...`)
4. Buka file `.env` di root project
5. Ganti `PASTE_ANON_KEY_ANDA_DI_SINI` dengan key yang sudah di-copy
6. Save file `.env`

Contoh isi `.env` yang benar:
```env
VITE_SUPABASE_URL=https://allyucwsnwgxbifsthhq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsbHl1Y3dzbndneGJpZnN0aGhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwNjQwMDAsImV4cCI6MjAxOTY0MDAwMH0.example...
```

---

### ✅ LANGKAH 2: Matikan Email Confirmation

1. Buka: https://supabase.com/dashboard/project/allyucwsnwgxbifsthhq/auth/providers
2. Klik **Email**
3. **MATIKAN** toggle **"Confirm email"**
4. Klik **Save**

⚠️ **PENTING:** Jika tidak dimatikan, user baru tidak bisa login tanpa verifikasi email!

---

### ✅ LANGKAH 3: Jalankan SQL Setup Database

1. Buka: https://supabase.com/dashboard/project/allyucwsnwgxbifsthhq/sql
   
2. Klik **"New Query"**

3. Buka file `SETUP_SUPABASE.sql` di project Anda

4. Copy **SEMUA** isi file tersebut

5. Paste di SQL Editor

6. Klik tombol **"Run"** (atau tekan `Ctrl+Enter`)

7. Tunggu sampai muncul: `✅ Setup berhasil!`

---

### ✅ LANGKAH 4: Buat User Admin

1. Buka: https://supabase.com/dashboard/project/allyucwsnwgxbifsthhq/auth/users

2. Klik **"Add user"** → **"Create new user"**

3. Isi form:
   - **Email:** `admin@wedding.com` (atau email Anda)
   - **Password:** `password123` (buat yang kuat)
   - ✅ **Centang "Auto Confirm User"**

4. Klik **"Create user"**

5. **COPY UID** user yang baru dibuat (contoh: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

---

### ✅ LANGKAH 5: Jadikan User Sebagai Admin

1. Buka: https://supabase.com/dashboard/project/allyucwsnwgxbifsthhq/sql

2. Klik **"New Query"**

3. Copy-paste SQL ini (GANTI `UID-ANDA-DI-SINI` dengan UID dari Langkah 4):

```sql
INSERT INTO admin_profiles (user_id, role, name)
VALUES ('UID-ANDA-DI-SINI', 'super_admin', 'Admin Utama')
ON CONFLICT (user_id) DO UPDATE 
SET role = 'super_admin', name = 'Admin Utama';

-- Verifikasi
SELECT u.email, ap.role, ap.name 
FROM auth.users u 
JOIN admin_profiles ap ON ap.user_id = u.id;
```

4. Klik **"Run"**

5. Output harus menunjukkan 1 baris dengan email Anda dan role `super_admin`

---

### ✅ LANGKAH 6: Commit & Push ke GitHub

Buka terminal di folder project, jalankan:

```bash
git add .
git commit -m "Setup Supabase for production"
git push
```

Vercel akan otomatis redeploy dalam 1-2 menit.

---

### ✅ LANGKAH 7: Test Login

1. Buka URL Vercel Anda: `https://your-app.vercel.app/#/admin`

2. Login dengan:
   - **Email:** `admin@wedding.com` (email yang Anda buat di Langkah 4)
   - **Password:** `password123`

3. Seharusnya berhasil masuk ke panel admin! ✅

---

## 🔍 TROUBLESHOOTING

### ❌ Error 401 Unauthorized
**Penyebab:** RLS masih aktif atau user tidak ada di `admin_profiles`

**Solusi:**
```sql
-- Jalankan di SQL Editor
ALTER TABLE admin_profiles DISABLE ROW LEVEL SECURITY;

-- Cek apakah user ada
SELECT * FROM admin_profiles;

-- Jika kosong, insert ulang (ganti UID)
INSERT INTO admin_profiles (user_id, role, name)
VALUES ('UID-ANDA', 'super_admin', 'Admin');
```

---

### ❌ Error 500 Internal Server Error
**Penyebab:** RLS policy bermasalah

**Solusi:** Jalankan ulang `SETUP_SUPABASE.sql`

---

### ❌ Error "Email not confirmed"
**Penyebab:** "Confirm email" masih aktif

**Solusi:** 
1. Buka Authentication → Providers → Email
2. Matikan "Confirm email"
3. Buat user baru atau confirm user yang ada

---

### ❌ Tidak Bisa Buat Admin Baru
**Penyebab:** Email confirmation aktif

**Solusi:** Pastikan "Confirm email" sudah dimatikan di Langkah 2

---

### ❌ Login Berhasil Tapi "Akses Ditolak"
**Penyebab:** UID user belum di-insert ke `admin_profiles`

**Solusi:** Jalankan SQL di Langkah 5

---

## 📋 CHECKLIST FINAL

- [ ] File `.env` sudah diisi dengan URL & Anon Key
- [ ] "Confirm email" sudah dimatikan di Authentication → Providers
- [ ] SQL `SETUP_SUPABASE.sql` sudah dijalankan
- [ ] Tabel `settings`, `admin_profiles`, `wishes` sudah dibuat
- [ ] RLS sudah di-disable untuk semua tabel
- [ ] User admin sudah dibuat di Authentication → Users
- [ ] UID user sudah di-insert ke `admin_profiles`
- [ ] Kode sudah di-commit & push ke GitHub
- [ ] Vercel sudah redeploy
- [ ] Test login berhasil di `/#/admin`

---

## 💡 TIPS

**Untuk keamanan production:**
- Gunakan password yang kuat (min 12 karakter)
- Ganti domain email dari `@wedding.local` ke email asli
- Setup RLS policy yang proper (bukan disable)
- Enable email confirmation untuk user baru
- Backup database secara berkala

**Untuk development/testing:**
- Disable RLS (seperti sekarang)
- Disable email confirmation
- Gunakan email dummy

---

## 🎯 RINGKASAN CEPAT

```bash
# 1. Edit file .env dengan Anon Key dari Supabase

# 2. Matikan "Confirm email" di Supabase Dashboard

# 3. Jalankan SETUP_SUPABASE.sql di SQL Editor

# 4. Buat user admin di Authentication → Users

# 5. Insert UID user ke admin_profiles (SQL di Langkah 5)

# 6. Commit & push
git add .
git commit -m "Setup Supabase"
git push

# 7. Test login di /#/admin
```

---

## 🆘 BUTUH BANTUAN?

Jika ada error, buka Browser Console (F12) dan copy pesan error-nya.

Beri tahu saya:
1. Error message lengkap
2. Screenshot halaman yang error
3. Output dari query: `SELECT * FROM admin_profiles;`

Saya akan bantu troubleshoot! 🚀
