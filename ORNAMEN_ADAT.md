# Fitur Ornamen Adat Indonesia

## 📋 Deskripsi

Fitur ornamen adat memungkinkan admin memilih ornamen tradisional Indonesia untuk ditampilkan di sudut-sudut cover undangan. Setiap ornamen memiliki motif khas dari berbagai daerah di Indonesia.

## 🎨 Pilihan Ornamen Tersedia

### 1. **Adat Sunda** - Motif Megamendung & Sulur
- **Motif:** Awan megamendung dan sulur-suluran
- **Karakteristik:** Lembut, mengalir, elegan
- **Cocok untuk:** Pernikahan adat Sunda, tema natural

### 2. **Adat Jawa** - Motif Parang & Kawung
- **Motif:** Garis diagonal parang dan oval kawung
- **Karakteristik:** Klasik, agung, tradisional
- **Cocok untuk:** Pernikahan adat Jawa, tema keraton

### 3. **Adat Betawi** - Motif Gigi Balang
- **Motif:** Segitiga gigi balang dan bunga sederhana
- **Karakteristik:** Ceria, khas Jakarta, unik
- **Cocok untuk:** Pernikahan adat Betawi, tema urban

### 4. **Adat Bali** - Motif Patra & Kamboja
- **Motif:** Sulur patra rumit dan bunga kamboja
- **Karakteristik:** Intricate, spiritual, artistik
- **Cocok untuk:** Pernikahan adat Bali, tema tropis

### 5. **Adat Minang** - Motif Kaluak Paku
- **Motif:** Pucuk rebung dan segitiga
- **Karakteristik:** Geometris, kuat, dinamis
- **Cocok untuk:** Pernikahan adat Minang, tema modern-tradisional

### 6. **Adat Dayak** - Motif Mandala & Ukiran
- **Motif:** Spiral, lingkaran konsentris, dan ukiran
- **Karakteristik:** Etnik, misterius, bold
- **Cocok untuk:** Pernikahan adat Dayak, tema etnik

### 7. **Modern** - Minimalis & Elegan
- **Motif:** Garis lengkung sederhana dan lingkaran
- **Karakteristik:** Clean, modern, timeless
- **Cocok untuk:** Pernikahan modern, tema minimalis

## 🎯 Cara Menggunakan

### Untuk Admin:

1. **Login ke Panel Admin**
   - Buka `https://your-domain.com/#/admin`
   - Login dengan username dan password

2. **Pilih Tab "Ornamen"**
   - Klik tab "Ornamen" di menu atas
   - Akan muncul 7 pilihan ornamen dengan preview

3. **Pilih Ornamen**
   - Klik ornamen yang diinginkan
   - Preview akan menampilkan ornamen di 4 sudut cover
   - Pilihan otomatis tersimpan

4. **Lihat Hasil**
   - Buka undangan di tab baru
   - Cover akan menampilkan ornamen yang dipilih
   - Ornamen tampil di 4 sudut dengan rotasi yang sesuai

### Untuk Developer:

#### 1. Menambahkan Ornamen Baru

Buka file `src/components/Ornaments.tsx` dan tambahkan komponen baru:

```tsx
export function OrnamentBaru({ className = "", position }: OrnamentProps) {
  const rotation = {
    "top-left": "",
    "top-right": "scale-x-[-1]",
    "bottom-left": "scale-y-[-1]",
    "bottom-right": "scale-x-[-1] scale-y-[-1]",
  }[position];

  return (
    <svg
      viewBox="0 0 120 120"
      className={`${className} ${rotation}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* SVG path untuk ornamen */}
    </svg>
  );
}
```

Kemudian tambahkan ke object ORNAMENTS:

```tsx
export const ORNAMENTS = {
  // ... ornamen existing
  baru: {
    id: "baru",
    name: "Adat Baru",
    description: "Motif khas daerah baru",
    component: OrnamentBaru,
  },
} as const;
```

#### 2. Struktur Data

Ornamen disimpan di `WeddingData`:

```typescript
export interface WeddingData {
  // ... field lainnya
  ornamentId?: string; // ID ornamen yang dipilih
}
```

Default: `"modern"` jika tidak ada pilihan.

#### 3. Rendering di Cover

Di `src/components/Cover.tsx`:

```tsx
const ornamentId = (data.ornamentId || "modern") as OrnamentId;
const SelectedOrnament = ORNAMENTS[ornamentId]?.component || ORNAMENTS.modern.component;

<SelectedOrnament
  className="absolute left-2 top-2 size-16 text-gold-500/70 sm:size-24"
  position="top-left"
/>
```

## 🎨 Spesifikasi Teknis

### Ukuran & Posisi

- **Desktop:** `size-24` (96px × 96px)
- **Mobile:** `size-16` (64px × 64px)
- **Posisi:** 4 sudut cover dengan jarak `inset-3` (12px)
- **Warna:** `text-gold-500/70` (emas dengan opacity 70%)

### Rotasi Otomatis

Setiap ornamen otomatis di-rotate sesuai posisi:
- **Top-left:** Normal (0°)
- **Top-right:** Flip horizontal (`scale-x-[-1]`)
- **Bottom-left:** Flip vertical (`scale-y-[-1]`)
- **Bottom-right:** Flip horizontal & vertical (`scale-x-[-1] scale-y-[-1]`)

### ViewBox SVG

Semua ornamen menggunakan viewBox `0 0 120 120` untuk konsistensi.

## 🖼️ Preview di Admin Panel

Di admin panel, setiap ornamen ditampilkan dengan:
- **Preview box** (h-40) dengan background `bg-pine-900/80`
- **4 ornamen** di sudut preview
- **Teks tengah** "A & B" untuk simulasi
- **Info** nama dan deskripsi ornamen
- **Badge** centang untuk ornamen yang dipilih

## 📱 Responsivitas

Ornamen otomatis menyesuaikan ukuran layar:
- **Mobile (< 640px):** `size-16` (64px)
- **Tablet/Desktop (≥ 640px):** `size-24` (96px)

## 🎯 Best Practices

### Memilih Ornamen yang Tepat

1. **Sesuaikan dengan adat:** Pilih ornamen yang sesuai dengan adat mempelai
2. **Pertimbangkan tema:** Ornamen harus complement tema keseluruhan
3. **Test preview:** Selalu lihat preview sebelum memutuskan
4. **Konsultasi:** Diskusikan dengan mempelai tentang pilihan ornamen

### Tips Desain

1. **Kontras:** Ornamen harus kontras dengan background
2. **Opacity:** Gunakan opacity 60-80% agar tidak terlalu dominan
3. **Ukuran:** Sesuaikan ukuran dengan elemen lain di cover
4. **Warna:** Sesuaikan warna ornamen dengan tema warna undangan

## 🔧 Troubleshooting

### Ornamen Tidak Muncul

**Penyebab:** Data `ornamentId` tidak tersimpan
**Solusi:** 
- Refresh halaman admin
- Pilih ulang ornamen
- Pastikan koneksi internet stabil saat save

### Ornamen Terlihat Kecil

**Penyebab:** Class size tidak sesuai
**Solusi:** 
- Cek class `size-16` atau `size-24` di Cover.tsx
- Sesuaikan dengan desain cover

### Ornamen Tidak Rotasi

**Penyebab:** Property `position` tidak dikirim
**Solusi:** 
- Pastikan setiap `<SelectedOrnament>` memiliki prop `position`
- Cek nilai position: "top-left", "top-right", "bottom-left", "bottom-right"

## 📚 File Terkait

- `src/components/Ornaments.tsx` - Komponen ornamen
- `src/components/admin/OrnamentSelector.tsx` - UI pemilihan ornamen
- `src/components/Cover.tsx` - Rendering ornamen di cover
- `src/lib/useWeddingData.ts` - Tipe data `ornamentId`
- `src/components/admin/AdminPanel.tsx` - Tab ornamen di admin panel

## 🚀 Future Enhancements

Ide pengembangan selanjutnya:

1. **Custom Upload:** Admin bisa upload ornamen custom (SVG)
2. **Warna Custom:** Admin bisa pilih warna ornamen
3. **Ukuran Custom:** Admin bisa atur ukuran ornamen
4. **Animasi:** Tambahkan animasi pada ornamen
5. **Lebih Banyak Pilihan:** Tambahkan ornamen dari daerah lain (Papua, Madura, dll)
6. **Kombinasi:** Admin bisa pilih ornamen berbeda untuk setiap sudut

## 📝 Kesimpulan

Fitur ornamen adat memberikan sentuhan personal dan kultural pada undangan pernikahan. Dengan 7 pilihan ornamen dari berbagai daerah di Indonesia, admin dapat memilih ornamen yang paling sesuai dengan tema dan adat pernikahan mereka.

Sistem ini fleksibel dan mudah dikembangkan untuk menambahkan ornamen baru di masa depan.

---

**Versi:** 1.0  
**Terakhir Diupdate:** 2024  
**Status:** ✅ Production Ready
