# Panduan Upload Ornamen Custom

## 📋 Deskripsi

Fitur upload ornamen custom memungkinkan admin untuk mengunggah file SVG mereka sendiri sebagai ornamen cover undangan. Ini memberikan fleksibilitas penuh untuk menggunakan ornamen yang sesuai dengan tema atau adat spesifik yang tidak tersedia di preset.

## 🎯 Cara Upload Ornamen Custom

### Langkah 1: Siapkan File SVG

**Spesifikasi File SVG:**
- Format: `.svg` (Scalable Vector Graphics)
- Ukuran maksimal: 500KB
- ViewBox rekomendasi: `0 0 120 120`
- Warna: Gunakan `currentColor` agar mengikuti tema

**Contoh SVG Template:**
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <!-- Ornamen Anda di sini -->
  <path d="M10 110 Q40 90, 60 60 Q80 30, 110 10" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round"/>
  <circle cx="60" cy="60" r="8" 
          stroke="currentColor" 
          stroke-width="1.5"/>
</svg>
```

### Langkah 2: Upload di Panel Admin

1. **Login ke Panel Admin**
   - Buka `https://your-domain.com/#/admin`
   - Login dengan kredensial Anda

2. **Pilih Tab "Ornamen"**
   - Klik tab "Ornamen" di menu atas
   - Scroll ke bagian "Upload Custom"

3. **Klik Area Upload**
   - Klik area bertuliskan "Upload Custom"
   - Atau klik ikon upload

4. **Pilih File SVG**
   - File browser akan terbuka
   - Pilih file SVG Anda
   - Klik "Open"

5. **Preview & Aktifkan**
   - SVG akan otomatis ditampilkan di preview
   - Klik tombol "Gunakan" untuk mengaktifkan
   - Ornamen custom akan tampil di cover undangan

### Langkah 3: Verifikasi di Cover

1. **Buka Undangan**
   - Klik "Lihat Undangan" di header admin
   - Atau buka URL undangan Anda

2. **Cek Cover**
   - Ornamen custom akan tampil di 4 sudut
   - Otomatis di-rotate sesuai posisi
   - Warna mengikuti tema undangan

## 🎨 Tips Membuat SVG Ornamen

### 1. Gunakan Software Desain

**Rekomendasi Software:**
- **Adobe Illustrator** (Professional)
- **Figma** (Free, web-based)
- **Inkscape** (Free, open-source)
- **Affinity Designer** (One-time purchase)

### 2. Best Practices SVG

**Struktur SVG yang Baik:**
```xml
<svg xmlns="http://www.w3.org/2000/svg" 
     viewBox="0 0 120 120" 
     fill="none">
  
  <!-- Group elemen -->
  <g id="ornament">
    <!-- Path utama -->
    <path d="..." stroke="currentColor" stroke-width="2"/>
    
    <!-- Elemen dekoratif -->
    <circle cx="60" cy="60" r="5" fill="currentColor"/>
  </g>
</svg>
```

**Tips Penting:**
- ✅ Gunakan `currentColor` untuk stroke/fill
- ✅ Set `viewBox="0 0 120 120"` untuk konsistensi
- ✅ Gunakan `stroke-linecap="round"` untuk ujung halus
- ✅ Hindari warna hardcoded (seperti `#FF0000`)
- ✅ Optimize SVG dengan [SVGOMG](https://jakearchibald.github.io/svgomg/)

### 3. Contoh Ornamen Sederhana

**Contoh 1: Sulur Sederhana**
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <path d="M10 110 C30 90, 50 70, 70 50 C90 30, 100 20, 110 10" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round"/>
  <circle cx="70" cy="50" r="4" 
          stroke="currentColor" 
          stroke-width="1.5"/>
  <circle cx="40" cy="80" r="3" 
          fill="currentColor" 
          opacity="0.5"/>
</svg>
```

**Contoh 2: Bunga Stylized**
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <!-- Kelopak bunga -->
  <ellipse cx="60" cy="40" rx="8" ry="15" 
           stroke="currentColor" 
           stroke-width="1.5"/>
  <ellipse cx="60" cy="40" rx="8" ry="15" 
           stroke="currentColor" 
           stroke-width="1.5" 
           transform="rotate(72 60 60)"/>
  <ellipse cx="60" cy="40" rx="8" ry="15" 
           stroke="currentColor" 
           stroke-width="1.5" 
           transform="rotate(144 60 60)"/>
  <ellipse cx="60" cy="40" rx="8" ry="15" 
           stroke="currentColor" 
           stroke-width="1.5" 
           transform="rotate(216 60 60)"/>
  <ellipse cx="60" cy="40" rx="8" ry="15" 
           stroke="currentColor" 
           stroke-width="1.5" 
           transform="rotate(288 60 60)"/>
  
  <!-- Tengah bunga -->
  <circle cx="60" cy="60" r="6" 
          fill="currentColor" 
          opacity="0.6"/>
</svg>
```

**Contoh 3: Geometris Modern**
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <!-- Garis diagonal -->
  <path d="M10 110 L110 10" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round"/>
  
  <!-- Lingkaran -->
  <circle cx="60" cy="60" r="12" 
          stroke="currentColor" 
          stroke-width="1.5"/>
  <circle cx="60" cy="60" r="6" 
          stroke="currentColor" 
          stroke-width="1" 
          opacity="0.5"/>
  
  <!-- Titik dekoratif -->
  <circle cx="30" cy="90" r="2" 
          fill="currentColor" 
          opacity="0.6"/>
  <circle cx="90" cy="30" r="2" 
          fill="currentColor" 
          opacity="0.6"/>
</svg>
```

## 🔧 Cara Membuat SVG dari Software Desain

### Adobe Illustrator

1. **Buat Dokumen Baru**
   - File → New
   - Width: 120px, Height: 120px
   - Units: Pixels

2. **Desain Ornamen**
   - Gunakan Pen Tool, Shape Tool, dll
   - Desain di area 120x120px

3. **Export sebagai SVG**
   - File → Export → Export As
   - Pilih format: SVG
   - Klik "Export"
   - Di dialog SVG Options:
     - Styling: Internal CSS
     - Font: Convert to Outline
     - Location: Embed
     - Decimal: 2
   - Klik "OK"

### Figma

1. **Buat Frame Baru**
   - Tekan `F`
   - Set size: 120 x 120

2. **Desain Ornamen**
   - Gunakan Pen Tool, Shapes, dll
   - Pastikan semua dalam frame 120x120

3. **Export sebagai SVG**
   - Select frame
   - Klik kanan → Export
   - Pilih format: SVG
   - Klik "Export"

### Inkscape (Free)

1. **Buat Dokumen Baru**
   - File → New
   - File → Document Properties
   - Set width: 120px, height: 120px

2. **Desain Ornamen**
   - Gunakan Bezier Pen Tool, Shapes, dll

3. **Export sebagai SVG**
   - File → Save As
   - Pilih format: Optimized SVG
   - Klik "Save"
   - Di dialog:
     - Strip whitespace
     - Shorten color values
     - Convert CSS to XML attributes
   - Klik "OK"

## 🎨 Optimasi SVG

### Gunakan SVGOMG

1. Buka [SVGOMG](https://jakearchibald.github.io/svgomg/)
2. Upload file SVG Anda
3. Aktifkan opsi:
   - ✅ Clean up IDs
   - ✅ Remove unused namespaces
   - ✅ Remove raster images
   - ✅ Remove metadata
   - ✅ Remove titles
   - ✅ Remove descriptions
   - ✅ Minify
4. Download SVG yang sudah dioptimasi

### Manual Optimization

**Sebelum:**
```xml
<svg xmlns="http://www.w3.org/2000/svg" 
     xmlns:xlink="http://www.w3.org/1999/xlink" 
     version="1.1" 
     viewBox="0 0 120 120">
  <title>Ornamen</title>
  <desc>Ornamen untuk undangan</desc>
  <g id="layer1">
    <path id="path1" d="M10 110 L110 10" stroke="#000000" stroke-width="2"/>
  </g>
</svg>
```

**Sesudah:**
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <path d="M10 110 L110 10" stroke="currentColor" stroke-width="2"/>
</svg>
```

## 📱 Testing Ornamen Custom

### Test di Browser

1. **Upload SVG**
   - Upload file SVG Anda di admin panel
   - Pastikan tidak ada error

2. **Cek Preview**
   - Lihat preview di admin panel
   - Pastikan ornamen tampil dengan baik

3. **Cek di Cover**
   - Buka undangan di tab baru
   - Cek 4 sudut cover
   - Pastikan rotasi benar

### Test Responsivitas

1. **Desktop View**
   - Ornamen ukuran 96px (size-24)
   - Cek di layar 1920x1080

2. **Mobile View**
   - Ornamen ukuran 64px (size-16)
   - Cek di layar 375x667 (iPhone)
   - Pastikan ornamen tidak terpotong

## 🗑️ Menghapus Ornamen Custom

### Cara Hapus

1. **Buka Panel Admin**
   - Login ke `/#/admin`
   - Pilih tab "Ornamen"

2. **Klik Tombol Hapus**
   - Di card "Custom Ornamen"
   - Klik ikon trash (🗑️)
   - Konfirmasi penghapusan

3. **Otomatis Reset**
   - Ornamen akan reset ke "Modern"
   - SVG custom akan dihapus dari database

## ⚠️ Troubleshooting

### Error: "Hanya file SVG yang diperbolehkan"

**Penyebab:** File yang diupload bukan SVG
**Solusi:**
- Pastikan file berekstensi `.svg`
- Cek MIME type: `image/svg+xml`
- Jika dari software desain, export ulang sebagai SVG

### Error: "Ukuran file maksimal 500KB"

**Penyebab:** File SVG terlalu besar
**Solusi:**
- Optimize SVG dengan SVGOMG
- Hapus elemen yang tidak perlu
- Kurangi detail path
- Gunakan shape sederhana

### Ornamen Tidak Muncul di Cover

**Penyebab:** SVG tidak valid atau ada error
**Solusi:**
- Cek SVG di browser (buka file SVG langsung)
- Validasi dengan [SVG Validator](https://validator.w3.org/)
- Pastikan ada atribut `xmlns="http://www.w3.org/2000/svg"`
- Cek console browser untuk error

### Ornamen Tidak Berwarna Emas

**Penyebab:** SVG menggunakan warna hardcoded
**Solusi:**
- Ganti semua warna dengan `currentColor`
- Contoh: `stroke="#FFD700"` → `stroke="currentColor"`
- Upload ulang SVG yang sudah diperbaiki

### Ornamen Terpotong

**Penyebab:** ViewBox tidak sesuai
**Solusi:**
- Set `viewBox="0 0 120 120"`
- Pastikan semua elemen dalam area 120x120
- Cek di software desain, resize jika perlu

## 📚 Contoh SVG Siap Pakai

### Contoh 1: Ornamen Minimalis

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <path d="M10 110 Q40 90, 60 60 Q80 30, 110 10" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round"/>
  <circle cx="60" cy="60" r="8" 
          stroke="currentColor" 
          stroke-width="1.5"/>
  <circle cx="60" cy="60" r="4" 
          stroke="currentColor" 
          stroke-width="0.8" 
          opacity="0.5"/>
</svg>
```

### Contoh 2: Ornamen Floral

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <!-- Daun -->
  <path d="M20 100 Q30 80, 40 70 Q50 60, 60 50" 
        stroke="currentColor" 
        stroke-width="1.5" 
        stroke-linecap="round"/>
  
  <!-- Bunga kecil -->
  <circle cx="60" cy="50" r="6" 
          stroke="currentColor" 
          stroke-width="1.2"/>
  <circle cx="60" cy="50" r="3" 
          fill="currentColor" 
          opacity="0.5"/>
  
  <!-- Daun dekoratif -->
  <path d="M30 80 Q25 75, 30 70 Q35 75, 30 80" 
        stroke="currentColor" 
        stroke-width="0.8" 
        fill="currentColor" 
        opacity="0.3"/>
</svg>
```

### Contoh 3: Ornamen Geometris

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <!-- Segitiga -->
  <path d="M60 20 L100 100 L20 100 Z" 
        stroke="currentColor" 
        stroke-width="1.5" 
        stroke-linejoin="round"/>
  
  <!-- Lingkaran dalam -->
  <circle cx="60" cy="70" r="15" 
          stroke="currentColor" 
          stroke-width="1.2"/>
  
  <!-- Titik tengah -->
  <circle cx="60" cy="70" r="3" 
          fill="currentColor" 
          opacity="0.6"/>
</svg>
```

## 🎯 Best Practices

### DO ✅

- Gunakan `currentColor` untuk semua stroke dan fill
- Set viewBox ke `0 0 120 120`
- Optimize SVG sebelum upload
- Test di multiple browser
- Gunakan nama file yang deskriptif
- Backup file SVG asli

### DON'T ❌

- Jangan gunakan warna hardcoded (#FF0000, rgb(), dll)
- Jangan gunakan ukuran file > 500KB
- Jangan gunakan raster image (PNG, JPG) di dalam SVG
- Jangan gunakan font (convert to path)
- Jangan gunakan JavaScript di SVG
- Jangan gunakan external resources

## 📊 Spesifikasi Teknis

### Ukuran & Posisi

- **Desktop:** 96px × 96px (size-24)
- **Mobile:** 64px × 64px (size-16)
- **Posisi:** 4 sudut dengan jarak 12px dari tepi
- **Warna:** Mengikuti tema (default: emas)

### Rotasi Otomatis

- **Top-left:** Normal (0°)
- **Top-right:** Flip horizontal (`scale-x-[-1]`)
- **Bottom-left:** Flip vertical (`scale-y-[-1]`)
- **Bottom-right:** Flip horizontal & vertical

### Validasi File

- **Format:** `.svg` atau `image/svg+xml`
- **Ukuran max:** 500KB
- **ViewBox:** `0 0 120 120` (rekomendasi)
- **Warna:** `currentColor` (wajib)

## 🔗 Resource Tambahan

### Tools Online

- [SVGOMG](https://jakearchibald.github.io/svgomg/) - Optimizer SVG
- [SVG Viewer](https://www.svgviewer.dev/) - Preview SVG
- [W3C SVG Validator](https://validator.w3.org/) - Validasi SVG
- [IconMoon](https://icomoon.io/app/) - SVG Editor

### Inspirasi Ornamen

- [Freepik](https://www.freepik.com/) - Free SVG ornaments
- [Flaticon](https://www.flaticon.com/) - Free icons & ornaments
- [The Noun Project](https://thenounproject.com/) - SVG icons
- Pinterest - Cari "wedding ornament SVG"

### Tutorial

- [SVG Tutorial - MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)
- [SVG Path Editor](https://yqnn.github.io/svg-path-editor/)
- [CSS Tricks - SVG](https://css-tricks.com/using-svg/)

## 📝 Kesimpulan

Fitur upload ornamen custom memberikan fleksibilitas penuh untuk admin dalam mendesain cover undangan yang unik dan personal. Dengan mengikuti panduan ini, Anda dapat:

1. ✅ Membuat ornamen SVG sendiri
2. ✅ Upload dan preview di admin panel
3. ✅ Menggunakan ornamen custom di cover undangan
4. ✅ Mengoptimasi SVG untuk performa terbaik
5. ✅ Troubleshoot masalah yang mungkin muncul

Selamat berkreasi dengan ornamen custom Anda! 🎨

---

**Versi:** 1.0  
**Terakhir Diupdate:** 2024  
**Status:** ✅ Production Ready
