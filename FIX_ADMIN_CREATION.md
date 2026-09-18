# 🔧 FIX: Admin Utama Tidak Bisa Membuat Admin Baru

## Masalah
Fungsi `createAdmin` menggunakan `supabase.auth.signUp()` yang memerlukan konfirmasi email. Jika email tidak dikonfirmasi, user baru tidak bisa login.

---

## ✅ Solusi Lengkap

### Langkah 1: Disable Email Confirmation di Supabase

1. Buka **Supabase Dashboard** → **Authentication** → **Providers**
2. Klik **Email**
3. **Matikan** opsi **"Confirm email"**
4. Klik **Save**

Ini akan membuat user baru langsung aktif tanpa perlu konfirmasi email.

---

### Langkah 2: Pastikan RLS Sudah Di-disable

Jalankan SQL ini di **SQL Editor**:

```sql
-- Disable RLS untuk admin_profiles
ALTER TABLE admin_profiles DISABLE ROW LEVEL SECURITY;

-- Verifikasi
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'admin_profiles';
```

Output harus menunjukkan `rowsecurity = false`.

---

### Langkah 3: Test Buat Admin Baru

Setelah langkah 1 & 2 selesai, coba buat admin baru dari panel admin.

Jika masih error, jalankan SQL manual ini untuk buat admin:

```sql
-- 1. Buat user baru (GANTI email & password)
-- Lakukan ini di Dashboard → Authentication → Users → Add User
-- Email: admin2@wedding.com
-- Password: password123
-- ✅ Centang "Auto Confirm User"

-- 2. Copy UID user baru, lalu jalankan:
INSERT INTO admin_profiles (user_id, role, name)
VALUES ('UID-BARU-DI-ATSAS', 'admin', 'Admin Baru')
ON CONFLICT (user_id) DO UPDATE 
SET role = 'admin', name = 'Admin Baru';

-- 3. Verifikasi
SELECT u.email, ap.role, ap.name 
FROM auth.users u 
JOIN admin_profiles ap ON ap.user_id = u.id;
```

---

### Langkah 4: Commit & Push

```bash
git add .
git commit -m "Fix: improve admin creation with better error handling"
git push
```

---

## 🎯 Cara Buat Admin Baru (2 Metode)

### Metode A: Lewat Panel Admin (Otomatis)

1. Login sebagai **super_admin**
2. Buka menu **Manajemen Admin**
3. Klik **Tambah Admin**
4. Isi:
   - Username: `admin2` (atau email: `admin2@wedding.com`)
   - Password: `password123`
   - Role: `admin` atau `super_admin`
   - Nama: `Admin Baru`
5. Klik **Simpan**

### Metode B: Manual Lewat Supabase Dashboard

1. Buka **Authentication** → **Users**
2. Klik **Add user** → **Create new user**
3. Isi:
   - Email: `admin2@wedding.com`
   - Password: `password123`
   - ✅ **Centang "Auto Confirm User"**
4. Klik **Create user**
5. **Copy UID** user baru
6. Buka **SQL Editor**, jalankan:

```sql
INSERT INTO admin_profiles (user_id, role, name)
VALUES ('UID-YANG-DI-COPY', 'admin', 'Admin Baru');
```

---

## 🔍 Troubleshooting

### Error: "User already registered"
Berarti email sudah ada. Gunakan email lain atau hapus user lama di Authentication → Users.

### Error: "Database error saving new user"
RLS masih aktif. Jalankan:
```sql
ALTER TABLE admin_profiles DISABLE ROW LEVEL SECURITY;
```

### Error: "Invalid email format"
Gunakan format email yang valid:
- ✅ `admin2@wedding.com`
- ✅ `admin2@gmail.com`
- ❌ `admin2` (harus ada @)

### User dibuat tapi tidak bisa login
Email belum dikonfirmasi. Pastikan **"Confirm email"** sudah dimatikan di Authentication → Providers → Email.

---

## 📋 Checklist

- [ ] Disable "Confirm email" di Authentication → Providers → Email
- [ ] Disable RLS untuk tabel `admin_profiles`
- [ ] Commit & push kode baru
- [ ] Test buat admin baru lewat panel
- [ ] Jika gagal, buat manual lewat Supabase Dashboard

---

## 💡 Tips

Untuk production, sebaiknya:
1. **Enable** kembali "Confirm email" agar user harus verifikasi
2. Setup email template yang bagus
3. Gunakan domain email sendiri (bukan @wedding.local)

Untuk development/testing:
1. **Disable** "Confirm email" biar cepat
2. Gunakan email dummy seperti `admin1@wedding.local`, `admin2@wedding.local`
