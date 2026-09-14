# Undangan Pernikahan - Sistem Admin Lengkap

Website undangan pernikahan dengan sistem admin terintegrasi Supabase untuk pengelolaan data real-time.

## Fitur Utama

✅ **Panel Admin** - Edit semua data undangan (nama, tanggal, foto, dll)
✅ **Super Admin** - Kelola admin lain, ganti password
✅ **Upload Foto** - Kompresi otomatis agresif (WebP, <200KB)
✅ **Real-time** - Perubahan langsung tampil di website publik
✅ **Responsif** - Tampilan optimal di HP dan desktop
✅ **Kelola Tamu** - 1000+ tamu dengan link pribadi
✅ **Supabase Integration** - Database cloud + storage + auth

## Setup Supabase

### 1. Buat Project Supabase

1. Buka [supabase.com](https://supabase.com)
2. Buat project baru
3. Catat **Project URL** dan **anon public key** dari Settings → API

### 2. Setup Database

Jalankan SQL berikut di **SQL Editor** Supabase:

```sql
-- Tabel settings (menyimpan data undangan)
CREATE TABLE settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  data jsonb NOT NULL,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- Insert row awal
INSERT INTO settings (data) VALUES ('{}'::jsonb);

-- Tabel profil admin
CREATE TABLE admin_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('admin','super_admin')),
  name text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: semua orang boleh baca settings
CREATE POLICY "Public read settings" ON settings
  FOR SELECT USING (true);

-- Policy: hanya admin boleh update settings
CREATE POLICY "Admin update settings" ON settings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE user_id = auth.uid()
    )
  );

-- Policy: admin boleh baca admin_profiles
CREATE POLICY "Admin read profiles" ON admin_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE user_id = auth.uid()
    )
  );

-- Policy: super_admin boleh insert/update/delete admin_profiles
CREATE POLICY "Super admin manage profiles" ON admin_profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );
```

### 3. Setup Storage

Jalankan SQL berikut untuk bucket foto:

```sql
-- Buat bucket storage
INSERT INTO storage.buckets (id, name, public) VALUES ('photos','photos', true);

-- Policy: semua orang boleh baca foto
CREATE POLICY "Public read photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'photos');

-- Policy: hanya admin boleh upload
CREATE POLICY "Admin upload photos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'photos' AND
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE user_id = auth.uid()
    )
  );

-- Policy: admin boleh delete foto
CREATE POLICY "Admin delete photos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'photos' AND
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE user_id = auth.uid()
    )
  );
```

### 4. Buat Super Admin Pertama

1. Buka **Authentication** → **Users** di Supabase dashboard
2. Klik **Add user** → **Create new user**
3. Isi email dan password
4. Catat **User UID** yang muncul
5. Jalankan SQL berikut di SQL Editor (ganti `YOUR_UID` dengan UID tadi):

```sql
INSERT INTO admin_profiles (user_id, role, name)
VALUES ('YOUR_UID', 'super_admin', 'Nama Anda');
```

### 5. Konfigurasi Environment

Buat file `.env` di root proyek:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Ganti dengan URL dan key dari Supabase.

### 6. Jalankan Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` untuk undangan publik.
Buka `http://localhost:5173/#/admin` untuk login admin.

## Deploy ke Netlify

1. Push kode ke GitHub
2. Buka [app.netlify.com](https://app.netlify.com)
3. **Add new site** → Import repository
4. Tambahkan environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Klik **Deploy**

Setiap commit ke GitHub akan otomatis rebuild website.

## Akses Panel

### Undangan Publik
```
https://your-site.netlify.app/
```

### Panel Admin
```
https://your-site.netlify.app/#/admin
```

### Panel Super Admin
```
https://your-site.netlify.app/#/admin/super
```

### Kelola Tamu
```
https://your-site.netlify.app/#/tamu
```

## Struktur Data

Data undangan disimpan di tabel `settings` sebagai JSON:

```json
{
  "initials": "R·S",
  "dateLabel": "Sabtu, 12 Juni 2027",
  "groom": {
    "short": "Raka",
    "full": "Raka Adyatma Prasetya",
    "parents": "Putra pertama dari...",
    "ig": "rakaadyatma",
    "bio": "..."
  },
  "bride": { ... },
  "photos": {
    "hero": "https://.../hero.webp",
    "groom": "https://.../groom.webp",
    "bride": "https://.../bride.webp"
  },
  "events": [ ... ],
  "story": [ ... ],
  "gallery": [ ... ],
  "gifts": [ ... ],
  "dresscode": [ ... ]
}
```

## Kompresi Foto

Semua foto dikompresi otomatis sebelum upload:
- **Hero**: max 1800px, 0.25MB, WebP
- **Portrait**: max 1400px, 0.18MB, WebP
- **Gallery**: max 1500px, 0.15MB, WebP
- **Thumbnail**: max 900px, 0.08MB, WebP

## Troubleshooting

**Foto tidak tampil?**
- Cek bucket storage sudah public
- Cek RLS policy untuk storage.objects

**Admin tidak bisa login?**
- Cek user sudah ada di `admin_profiles`
- Cek role sudah diset dengan benar

**Perubahan tidak muncul di website?**
- Cek real-time subscription aktif
- Refresh halaman

**Build error?**
- Pastikan `.env` sudah diisi
- Jalankan `npm install` ulang

## Lisensi

MIT License - Bebas digunakan untuk keperluan pribadi maupun komersial.
