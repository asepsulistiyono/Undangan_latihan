# 🔧 FIX: Super Admin Tidak Bisa Membuat Admin Baru

## Masalah
Super admin tidak bisa membuat admin baru karena:
1. RLS (Row Level Security) masih aktif
2. Fungsi `signUp()` tidak bekerja dengan baik ketika super admin sudah login

---

## ✅ SOLUSI 1: Gunakan RPC Function (RECOMMENDED)

### Langkah 1: Jalankan SQL di Supabase

1. Buka **Supabase Dashboard** → **SQL Editor**
2. Klik **New Query**
3. Copy-paste **SEMUA** isi file `fix-create-admin.sql`
4. Klik **Run**

Script ini akan:
- Disable RLS untuk semua tabel
- Buat RPC function `create_new_admin` yang bisa dipanggil oleh super admin
- Grant permission ke authenticated users

### Langkah 2: Commit & Push

```bash
git add .
git commit -m "Fix: super admin can create new admin"
git push
```

### Langkah 3: Test

1. Login sebagai super admin di `/#/admin`
2. Buka menu **Manajemen Admin**
3. Klik **Tambah Admin**
4. Isi form dan klik **Simpan**
5. Seharusnya berhasil! ✅

---

## ✅ SOLUSI 2: Buat Admin Manual (ALTERNATIF)

Jika Solusi 1 tidak bekerja, buat admin manual:

### Langkah 1: Buat User di Authentication

1. Buka **Authentication** → **Users**
2. Klik **Add user** → **Create new user**
3. Isi:
   - **Email:** `admin2@wedding.com`
   - **Password:** `password123`
   - ✅ **Centang "Auto Confirm User"**
4. Klik **Create user**
5. **COPY UID** user baru (contoh: `a1b2c3d4-e5f6-...`)

### Langkah 2: Insert ke admin_profiles

Buka **SQL Editor** → **New Query** → Jalankan:

```sql
-- GANTI 'UID-DI-ATSAS' dengan UID yang sudah di-copy
INSERT INTO admin_profiles (user_id, role, name)
VALUES ('UID-DI-ATSAS', 'admin', 'Admin Baru')
ON CONFLICT (user_id) DO UPDATE 
SET role = 'admin', name = 'Admin Baru';

-- Verifikasi
SELECT u.email, ap.role, ap.name 
FROM auth.users u 
JOIN admin_profiles ap ON ap.user_id = u.id;
```

### Langkah 3: Test Login

1. Logout dari super admin
2. Login dengan email & password admin baru
3. Seharusnya berhasil masuk! ✅

---

## 🔍 TROUBLESHOOTING

### Error: "function create_new_admin does not exist"
**Solusi:** Jalankan script `fix-create-admin.sql` di Langkah 1

### Error: "permission denied for table admin_profiles"
**Solusi:** RLS masih aktif. Jalankan:
```sql
ALTER TABLE admin_profiles DISABLE ROW LEVEL SECURITY;
```

### Error: "duplicate key value violates unique constraint"
**Solusi:** User sudah ada di `admin_profiles`. Gunakan email lain atau hapus user lama.

### Admin baru tidak bisa login
**Solusi:** 
1. Pastikan "Confirm email" sudah dimatikan di Authentication → Providers → Email
2. Atau buat user baru dengan centang "Auto Confirm User"

---

## 📋 CHECKLIST

- [ ] Script `fix-create-admin.sql` sudah dijalankan
- [ ] RPC function `create_new_admin` sudah dibuat
- [ ] RLS sudah di-disable untuk semua tabel
- [ ] Kode sudah di-commit & push
- [ ] Vercel sudah redeploy
- [ ] Test buat admin baru berhasil

---

## 💡 TIPS

**Untuk keamanan production:**
- Enable kembali RLS setelah setup
- Buat policy yang proper (bukan disable semua)
- Gunakan service role key untuk operasi admin (di backend)

**Untuk development/testing:**
- Disable RLS (seperti sekarang)
- Gunakan RPC function untuk kemudahan

---

## 🎯 RINGKASAN CEPAT

```bash
# 1. Jalankan SQL di Supabase
# Copy-paste isi file fix-create-admin.sql → Run

# 2. Commit & push
git add .
git commit -m "Fix: super admin can create new admin"
git push

# 3. Test buat admin baru di /#/admin
```

Jika masih error, gunakan **Solusi 2** (buat admin manual).
