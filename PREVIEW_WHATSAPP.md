# Preview Link WhatsApp - Dokumentasi

## ✅ Perubahan yang Telah Dilakukan

### 1. Meta Tags Generic di `index.html`

File `index.html` telah diupdate dengan meta tags yang tidak spesifik untuk nama mempelai tertentu:

```html
<!-- Title Generic -->
<title>Undangan Pernikahan Digital</title>

<!-- Description Generic -->
<meta name="description" content="Undangan Pernikahan Digital — Buka undangan digital kami dan berikan doa restu untuk hari bahagia kami." />

<!-- Open Graph Tags untuk WhatsApp/Facebook -->
<meta property="og:type" content="website" />
<meta property="og:title" content="Undangan Pernikahan Digital" />
<meta property="og:description" content="Buka undangan digital kami dan berikan doa restu untuk hari bahagia kami." />
<meta property="og:image" content="https://image.qwenlm.ai/generated-images/c7a005ab-60cd-4af6-a501-56b105912776/_result.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Twitter Card Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Undangan Pernikahan Digital" />
<meta name="twitter:description" content="Buka undangan digital kami dan berikan doa restu untuk hari bahagia kami." />
<meta name="twitter:image" content="https://image.qwenlm.ai/generated-images/c7a005ab-60cd-4af6-a501-56b105912776/_result.png" />

<!-- Favicon dengan emoji cincin 💍 -->
<link rel="icon" href="data:image/svg+xml,..." />
```

### 2. Dynamic Meta Tags di JavaScript

File `src/lib/metaTags.ts` dan `src/lib/WeddingContext.tsx` telah ditambahkan untuk mengupdate meta tags secara dinamis setelah halaman di-load. Ini akan mengubah:
- Title browser
- Meta description
- OG tags (setelah halaman di-load)

**Catatan:** Perubahan dinamis ini hanya berlaku setelah halaman dibuka, TIDAK mempengaruhi preview link di WhatsApp.

## 📱 Cara Kerja Preview Link di WhatsApp

### Yang Terjadi Saat User Share Link:

1. **User paste link di WhatsApp**
   ```
   https://undangan-latihan.vercel.app/#/putra_dan_putri/?to=Budi+Santoso
   ```

2. **WhatsApp fetch halaman HTML**
   - WhatsApp membaca `index.html` SEBELUM JavaScript dijalankan
   - WhatsApp hanya membaca meta tags statis

3. **WhatsApp tampilkan preview**
   ```
   ┌─────────────────────────┐
   │ [Foto Prewedding]       │
   │                         │
   │ Undangan Pernikahan     │
   │ Digital                 │
   │                         │
   │ Buka undangan digital   │
   │ kami dan berikan doa    │
   │ restu...                │
   │                         │
   │ undangan-latihan.ver... │
   └─────────────────────────┘
   ```

4. **User klik link**
   - Halaman terbuka
   - JavaScript dijalankan
   - Data admin "Eka" di-load
   - Nama "Putra & Putri" ditampilkan
   - Nama tamu "Budi Santoso" ditampilkan di sampul

## 🎯 Hasil yang Diharapkan

### Preview Link di WhatsApp:
- **Title:** "Undangan Pernikahan Digital"
- **Description:** "Buka undangan digital kami dan berikan doa restu untuk hari bahagia kami."
- **Image:** Foto prewedding (generic, bisa dipakai semua admin)
- **URL:** `undangan-latihan.vercel.app`

### Setelah Link Dibuka:
- **Sampul:** Menampilkan nama tamu (jika ada parameter `?to=`)
- **Halaman Utama:** Menampilkan data admin yang sesuai dengan slug URL
- **Contoh:** 
  - URL: `/#/putra_dan_putri/?to=Budi` → Menampilkan "Putra & Putri" dengan nama tamu "Budi"
  - URL: `/#/budi_dan_wati/?to=Siti` → Menampilkan "Budi & Wati" dengan nama tamu "Siti"

## 🔧 Cara Mengganti Foto Preview

Jika ingin mengganti foto yang muncul di preview WhatsApp:

1. **Upload foto baru** ke hosting (imgbb, Cloudinary, dll)
2. **Update `index.html`** di bagian:
   ```html
   <meta property="og:image" content="URL_FOTO_BARU.jpg" />
   <meta name="twitter:image" content="URL_FOTO_BARU.jpg" />
   ```
3. **Rebuild dan deploy**

**Rekomendasi ukuran foto:**
- Aspect ratio: 1.91:1 (1200x630px ideal)
- Format: JPG atau PNG
- Ukuran max: 300KB untuk loading cepat

## ⚠️ Batasan Teknis

### Yang BISA Dilakukan:
✅ Preview link generic untuk semua admin  
✅ Foto thumbnail yang sama untuk semua undangan  
✅ Title dan description yang universal  
✅ Data undangan dinamis setelah halaman dibuka  

### Yang TIDAK BISA Dilakukan (Tanpa Backend):
❌ Preview link berbeda untuk setiap admin  
❌ Nama mempelai muncul di preview WhatsApp  
❌ Tanggal acara muncul di preview WhatsApp  
❌ Foto berbeda untuk setiap admin di preview  

### Solusi untuk Preview Dinamis (Butuh Backend):
Jika ingin preview link yang benar-benar dinamis (nama mempelai, tanggal, foto berbeda per admin), diperlukan:
- Server-side rendering (Next.js, Nuxt.js, dll)
- Backend API untuk generate meta tags dinamis
- Hosting yang mendukung SSR (Vercel, Netlify Functions, dll)

## 🧪 Cara Test Preview Link

### Test di WhatsApp:
1. Copy link undangan: `https://undangan-latihan.vercel.app/#/putra_dan_putri`
2. Paste di chat WhatsApp (jangan kirim dulu)
3. Tunggu 2-3 detik untuk preview muncul
4. Lihat preview yang ditampilkan

### Test di Facebook:
1. Gunakan [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. Paste URL undangan
3. Klik "Debug"
4. Lihat preview yang di-generate

### Test di Twitter:
1. Gunakan [Twitter Card Validator](https://cards-dev.twitter.com/validator)
2. Paste URL undangan
3. Lihat preview card yang ditampilkan

## 📊 Perbandingan: Sebelum vs Sesudah

### Sebelum (dengan nama spesifik):
```
Preview WhatsApp:
┌─────────────────────────┐
│ [Foto Raka & Sekar]     │
│ Undangan Pernikahan     │
│ Raka & Sekar            │
│ Sabtu, 12 Juni 2027     │
└─────────────────────────┘
```
❌ Tidak cocok untuk admin lain

### Sesudah (generic):
```
Preview WhatsApp:
┌─────────────────────────┐
│ [Foto Prewedding]       │
│ Undangan Pernikahan     │
│ Digital                 │
│ Buka undangan digital   │
│ kami dan berikan doa... │
└─────────────────────────┘
```
✅ Cocok untuk semua admin

## 🎨 Customisasi Lanjutan

### Jika Ingin Mengganti Teks Preview:

Edit `index.html`:
```html
<meta property="og:title" content="TEKS_JUDUL_ANDA" />
<meta property="og:description" content="TEKS_DESKRIPSI_ANDA" />
```

### Jika Ingin Mengganti Foto:

1. Upload foto baru (1200x630px)
2. Edit `index.html`:
```html
<meta property="og:image" content="URL_FOTO_BARU" />
<meta name="twitter:image" content="URL_FOTO_BARU" />
```

### Jika Ingin Favicon Berbeda:

Edit `index.html`:
```html
<link rel="icon" href="URL_FAVICON_BARU" />
```

## 📝 Kesimpulan

Dengan perubahan ini:
- ✅ Preview link di WhatsApp sekarang menampilkan thumbnail yang representatif
- ✅ Semua admin bisa menggunakan sistem yang sama
- ✅ Data undangan tetap dinamis setelah halaman dibuka
- ✅ Tidak perlu backend untuk fitur dasar

Preview link sekarang sudah siap digunakan untuk semua admin dengan tampilan yang profesional dan konsisten! 🎉
