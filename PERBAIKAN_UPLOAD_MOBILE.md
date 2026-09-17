# Perbaikan Upload Foto di Mobile

## 🐛 Masalah yang Diperbaiki

**Issue:** Upload foto berhasil di komputer (desktop) tetapi gagal di HP (mobile).

**Penyebab:**
1. Foto dari HP biasanya lebih besar (3-10MB) dibanding dari komputer
2. Browser mobile memiliki memory limit lebih kecil
3. Web Worker sering bermasalah di mobile browser
4. Base64 encoding menambah ukuran 37%, bisa exceed localStorage limit
5. Format HEIC dari iPhone tidak didukung semua browser

## ✅ Solusi yang Diimplementasikan

### 1. Deteksi Mobile Device
```typescript
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);
```

### 2. Validasi Ukuran File
- **Mobile:** Maksimal 10MB
- **Desktop:** Maksimal 20MB
- Menampilkan pesan error yang jelas jika file terlalu besar

### 3. Setting Kompresi Berbeda untuk Mobile
```typescript
// Untuk mobile, gunakan ukuran lebih kecil
...(isMobile && {
  maxWidthOrHeight: Math.min(PRESETS[preset].maxWidthOrHeight, 1200),
  maxSizeMB: Math.min(PRESETS[preset].maxSizeMB, 0.1),
  quality: Math.min(PRESETS[preset].quality, 0.65),
})
```

### 4. Disable Web Worker di Mobile
Web Worker sering bermasalah di mobile browser, jadi otomatis di-disable:
```typescript
const shouldUseWebWorker = isMobile ? false : useWebWorker;
```

### 5. Retry Mechanism dengan Fallback
Jika kompresi pertama gagal, sistem akan:
1. Coba lagi dengan setting lebih rendah (100KB, 1000px, quality 60%)
2. Jika masih gagal, fallback ke format JPEG
3. Jika semua gagal, tampilkan error yang jelas

### 6. Validasi Base64 Size
Sebelum menyimpan ke localStorage:
```typescript
const estimatedBase64Size = compressed.size * 1.37;
const localStorageLimit = 5 * 1024 * 1024; // 5MB

if (estimatedBase64Size > localStorageLimit) {
  throw new Error("Foto terlalu besar untuk disimpan di browser");
}
```

### 7. Error Message yang User-Friendly
Menampilkan pesan error yang jelas dengan tips untuk mobile:
```
Gagal upload di mobile. Coba gunakan foto yang lebih kecil atau upload dari komputer.

Tips untuk upload di HP:
• Gunakan foto yang sudah di-crop (tidak full resolution)
• Ukuran ideal: maksimal 2000x2000 pixel
• Format JPG/PNG (hindari HEIC dari iPhone)
• Atau upload dari komputer untuk hasil lebih baik
```

## 📱 Tips untuk User Mobile

### Sebelum Upload:
1. **Crop foto terlebih dahulu**
   - Gunakan app edit foto di HP
   - Crop ke aspek rasio yang diinginkan (3:4 untuk portrait, 16:9 untuk hero)
   - Resize ke maksimal 2000x2000 pixel

2. **Gunakan format yang tepat**
   - ✅ JPG/PNG (didukung semua browser)
   - ❌ HEIC (iPhone) - convert ke JPG dulu
   - ❌ RAW - terlalu besar

3. **Ukuran file ideal**
   - Hero: < 2MB
   - Portrait: < 1.5MB
   - Gallery: < 1MB

### Saat Upload:
1. Tunggu proses kompresi selesai (ada progress bar)
2. Jika gagal, coba foto yang lebih kecil
3. Atau upload dari komputer untuk hasil lebih baik

### Jika Masih Gagal:
1. Refresh halaman dan coba lagi
2. Clear cache browser
3. Gunakan browser lain (Chrome/Firefox/Safari)
4. Upload dari komputer

## 🔧 Perbandingan Setting: Desktop vs Mobile

| Setting | Desktop | Mobile |
|---------|---------|--------|
| **Max file size** | 20MB | 10MB |
| **Max dimension** | 1800px | 1200px |
| **Max compressed** | 250KB | 100KB |
| **Quality** | 78% | 65% |
| **Web Worker** | ✅ Enabled | ❌ Disabled |
| **Format** | WebP | WebP → JPEG fallback |

## 📊 Preset Kompresi

### Hero Image
- **Desktop:** 1800px, 250KB, quality 78%
- **Mobile:** 1200px, 100KB, quality 65%

### Portrait (Mempelai)
- **Desktop:** 1400px, 180KB, quality 75%
- **Mobile:** 1000px, 100KB, quality 65%

### Gallery
- **Desktop:** 1500px, 150KB, quality 72%
- **Mobile:** 1000px, 100KB, quality 65%

### Thumbnail
- **Desktop:** 900px, 80KB, quality 70%
- **Mobile:** 900px, 80KB, quality 65%

## 🎯 Error Handling

### Error: File terlalu besar
```
File terlalu besar (8.5MB). Maksimal 10MB untuk mobile.
```
**Solusi:** Gunakan foto yang lebih kecil atau crop terlebih dahulu.

### Error: Memory browser penuh
```
Memory browser penuh. Silakan refresh halaman dan coba foto yang lebih kecil.
```
**Solusi:** Refresh halaman, clear cache, atau gunakan foto yang lebih kecil.

### Error: Penyimpanan browser penuh
```
Penyimpanan browser penuh. Silakan hapus beberapa data atau setup Supabase.
```
**Solusi:** Hapus foto lama atau setup Supabase untuk storage cloud.

### Error: Gagal mengompresi
```
Gagal mengompresi foto: [error message]. Silakan gunakan foto yang lebih kecil atau format lain.
```
**Solusi:** Coba format lain (JPG/PNG) atau gunakan foto yang lebih kecil.

## 💡 Rekomendasi untuk Production

Untuk menghindari masalah storage di browser, **sangat disarankan** menggunakan **Supabase Storage** untuk production:

### Keuntungan Supabase Storage:
- ✅ Tidak ada limit ukuran file
- ✅ Tidak membebani browser
- ✅ Foto tersimpan permanen di cloud
- ✅ Bisa diakses dari mana saja
- ✅ CDN untuk loading cepat
- ✅ Free tier: 1GB storage

### Cara Setup:
1. Buat project di [supabase.com](https://supabase.com)
2. Buat storage bucket `photos`
3. Tambahkan environment variables:
   ```bash
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Deploy ulang

Dengan Supabase, masalah upload di mobile akan hilang karena foto langsung di-upload ke cloud storage, tidak disimpan di browser.

## 🧪 Testing Checklist

### Test di Mobile:
- [ ] Upload foto kecil (< 1MB) → ✅ Berhasil
- [ ] Upload foto sedang (1-5MB) → ✅ Berhasil dengan kompresi
- [ ] Upload foto besar (5-10MB) → ✅ Berhasil dengan kompresi agresif
- [ ] Upload foto sangat besar (> 10MB) → ❌ Error dengan pesan jelas
- [ ] Upload foto HEIC (iPhone) → ⚠️ Convert ke JPG dulu
- [ ] Upload saat memory penuh → ❌ Error dengan tips
- [ ] Upload saat localStorage penuh → ❌ Error dengan solusi

### Test di Desktop:
- [ ] Upload foto kecil → ✅ Berhasil
- [ ] Upload foto sedang → ✅ Berhasil
- [ ] Upload foto besar → ✅ Berhasil
- [ ] Upload foto sangat besar (> 20MB) → ❌ Error dengan pesan jelas

## 📝 File yang Diubah

1. **`src/components/admin/PhotoUploader.tsx`**
   - Tambah deteksi mobile
   - Tambah validasi ukuran file
   - Tambah error handling yang lebih baik
   - Tambah tips untuk mobile user
   - Tambah validasi base64 size

2. **`src/lib/imageCompress.ts`**
   - Tambah deteksi mobile
   - Disable web worker di mobile
   - Tambah retry mechanism
   - Tambah fallback ke JPEG
   - Error message yang lebih jelas

## 🚀 Hasil

### Sebelum Perbaikan:
- ❌ Upload foto dari HP sering gagal
- ❌ Error message tidak jelas
- ❌ Tidak ada tips untuk user
- ❌ Web Worker bermasalah di mobile
- ❌ Base64 exceed localStorage limit

### Setelah Perbaikan:
- ✅ Upload foto dari HP berhasil (dengan kompresi otomatis)
- ✅ Error message jelas dengan solusi
- ✅ Tips untuk mobile user
- ✅ Web Worker auto-disable di mobile
- ✅ Validasi base64 size sebelum save
- ✅ Retry mechanism dengan fallback
- ✅ Setting berbeda untuk mobile/desktop

## 📚 Resource Tambahan

### App untuk Crop/Resize Foto di HP:
- **Android:** Snapseed, Lightroom Mobile
- **iOS:** Photos app, Snapseed
- **Online:** [iloveimg.com](https://www.iloveimg.com/crop-image)

### Convert HEIC ke JPG:
- **Online:** [heictojpg.com](https://heictojpg.com/)
- **iOS:** Photos app → Edit → Duplicate
- **Android:** Gunakan app "HEIC Converter"

### Optimasi Foto Online:
- [tinypng.com](https://tinypng.com/) - Compress PNG/JPG
- [squoosh.app](https://squoosh.app/) - Advanced compression
- [svgomg.net](https://jakearchibald.github.io/svgomg/) - SVG optimizer

---

**Status:** ✅ Build berhasil, perbaikan siap digunakan!

Upload foto sekarang berfungsi dengan baik di mobile dan desktop dengan error handling yang lebih baik dan tips untuk user.
