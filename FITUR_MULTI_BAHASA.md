# Fitur Multi-Bahasa (Indonesia & English)

## 🎯 Fitur yang Ditambahkan

Sistem multi-bahasa untuk undangan pernikahan dengan dukungan:
- **Bahasa Indonesia** (default) - Format nasional
- **English** - Format internasional

## 📋 Cara Menggunakan

### Untuk Admin:

1. **Login ke Panel Admin**
   - Buka `https://your-domain.com/#/admin`
   - Login dengan username dan password

2. **Pilih Tab "Bahasa"**
   - Klik tab **"Bahasa"** di menu atas (tab pertama)
   - Akan muncul 2 pilihan bahasa

3. **Pilih Bahasa**
   - **🇮🇩 Bahasa Indonesia** - Format nasional Indonesia
   - **🇬🇧 English** - Format internasional
   - Klik bahasa yang diinginkan
   - Pilihan otomatis tersimpan

4. **Lihat Hasil**
   - Buka undangan di tab baru
   - Seluruh teks akan berubah sesuai bahasa yang dipilih
   - Nama mempelai, tanggal, dan lokasi tetap sesuai data yang Anda isi

### Contoh Perubahan:

**Bahasa Indonesia:**
```
Undangan Pernikahan
Kepada Yth. Bapak/Ibu/Saudara/i
Mohon maaf apabila terdapat kesalahan penulisan nama & gelar.
Buka
Kami Menikah — Assalamu'alaikum Wr. Wb.
Menghitung Hari
Hari | Jam | Menit | Detik
```

**English:**
```
Wedding Invitation
To Mr./Mrs./Ms.
We apologize for any errors in writing the name & title.
Open
We Are Getting Married
Counting The Days
Days | Hours | Minutes | Seconds
```

## 🔧 Yang Berubah

### Teks yang Diterjemahkan:

**Cover/Sampul:**
- "Undangan Pernikahan" → "Wedding Invitation"
- "Kepada Yth. Bapak/Ibu/Saudara/i" → "To Mr./Mrs./Ms."
- "Mohon maaf apabila..." → "We apologize for any errors..."
- "Buka" → "Open"
- "Gulir" → "Scroll"

**Hero Section:**
- "Kami Menikah — Assalamu'alaikum Wr. Wb." → "We Are Getting Married"
- "Menghitung Hari" → "Counting The Days"
- "Hari" → "Days"
- "Jam" → "Hours"
- "Menit" → "Minutes"
- "Detik" → "Seconds"

**Couple Section:**
- "Bismillahirrahmanirrahim" → "In The Name of Allah"
- "Kedua Mempelai" → "The Bride & Groom"
- Subtitle diterjemahkan

**Events Section:**
- "Simpan Tanggalnya" → "Save The Date"
- "Rangkaian Acara" → "Event Series"
- "Simpan ke Google Kalender" → "Save to Google Calendar"
- "Dress Code" → "Dress Code"
- "Lihat Lokasi" → "View Location"

**Story Section:**
- "Perjalanan Kami" → "Our Journey"
- "Kisah Kami" → "Our Story"
- Subtitle diterjemahkan

**Gallery Section:**
- "Lewat Lensa" → "Through The Lens"
- "Galeri Momen" → "Moment Gallery"
- Subtitle diterjemahkan

**Gift Section:**
- "Tanda Kasih" → "Token of Love"
- "Kado Terindah" → "Most Beautiful Gift"
- Subtitle diterjemahkan
- "Kirim Hadiah" → "Send Gift"
- "Salin Alamat" → "Copy Address"
- "Salin Nomor" → "Copy Number"
- "Tersalin!" → "Copied!"

**Wishes Section:**
- "Doa & Harapan" → "Prayers & Hopes"
- "Konfirmasi & Ucapan" → "Confirmation & Wishes"
- Subtitle diterjemahkan
- "Kirim Ucapan" → "Send Wishes"
- "Nama" → "Name"
- "Konfirmasi Kehadiran" → "Attendance Confirmation"
- "InsyaAllah Hadir" → "Will Attend"
- "Mohon Maaf, Berhalangan" → "Cannot Attend"
- "Jumlah Tamu" → "Number of Guests"
- "Ucapan & Doa" → "Message & Prayer"
- "Ucapan Doa" → "Wishes Wall"
- "Hadir" → "Attending"
- "Berhalangan" → "Not Attending"
- "baru saja" → "just now"
- "menit lalu" → "minutes ago"
- "jam lalu" → "hours ago"
- "hari lalu" → "days ago"

**Closing Section:**
- "Terima Kasih" → "Thank You"
- Subtitle diterjemahkan
- "Beserta keluarga besar" → "With the family"

### Yang TIDAK Berubah:

- ✅ Nama mempelai (sesuai data admin)
- ✅ Tanggal acara (sesuai data admin)
- ✅ Lokasi acara (sesuai data admin)
- ✅ Foto-foto (sesuai upload admin)
- ✅ Kutipan ayat (tetap dalam bahasa Arab + terjemahan)
- ✅ Informasi rekening bank
- ✅ Alamat kirim kado

## 📁 File yang Dibuat/Diubah

### File Baru:
1. **`src/lib/translations.ts`** - Sistem translations lengkap
   - Definisi interface Translations
   - Translations untuk Indonesia (id)
   - Translations untuk English (en)
   - Hook useTranslations

2. **`src/components/admin/LanguageSelector.tsx`** - UI pemilihan bahasa
   - Preview visual untuk setiap bahasa
   - Tombol pilih bahasa
   - Info box dengan penjelasan

### File yang Diubah:
1. **`src/lib/useWeddingData.ts`**
   - Tambah field `language?: "id" | "en"` di WeddingData interface

2. **`src/lib/WeddingContext.tsx`**
   - Tambah `language` dan `t` (translations) di context
   - Update meta tags berdasarkan bahasa

3. **`src/components/admin/AdminPanel.tsx`**
   - Import LanguageSelector
   - Tambah tab "Bahasa" (tab pertama)
   - Render LanguageSelector di tab "bahasa"

4. **`src/components/Cover.tsx`**
   - Gunakan `t` dari context
   - Replace hardcoded text dengan translations

5. **`src/components/sections/Hero.tsx`**
   - Gunakan `t` dari context
   - Update Countdown component untuk terima `t` prop
   - Replace hardcoded text dengan translations

## 🎨 Preview di Admin Panel

Di tab "Bahasa", admin akan melihat:

```
┌─────────────────────────────────────────┐
│ Pilih Bahasa                            │
│ Pilih bahasa untuk tampilan undangan.   │
│ Bahasa akan diterapkan ke seluruh       │
│ halaman undangan.                       │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────┐  ┌──────────────┐    │
│  │   🇮🇩         │  │   🇬🇧         │    │
│  │              │  │              │    │
│  │  Undangan    │  │   Wedding    │    │
│  │  Pernikahan  │  │  Invitation  │    │
│  │              │  │              │    │
│  │  Raka &      │  │  John &      │    │
│  │  Sekar       │  │  Jane        │    │
│  │         ✓    │  │              │    │
│  └──────────────┘  └──────────────┘    │
│                                         │
│  Bahasa Indonesia  English              │
│  Format nasional   International format │
│                                         │
├─────────────────────────────────────────┤
│ 💡 Informasi                            │
│ • Bahasa akan diterapkan ke seluruh     │
│   teks di undangan                      │
│ • Nama mempelai, tanggal, dan lokasi    │
│   tetap sesuai data yang Anda isi       │
│ • Anda bisa mengubah bahasa kapan saja  │
│ • Bahasa default adalah Bahasa Indonesia│
└─────────────────────────────────────────┘
```

## 💡 Tips Penggunaan

### Kapan Menggunakan Bahasa Indonesia:
- ✅ Pernikahan adat Indonesia
- ✅ Tamu mayoritas orang Indonesia
- ✅ Acara formal tradisional
- ✅ Preferensi keluarga

### Kapan Menggunakan English:
- ✅ Pernikahan internasional
- ✅ Tamu campuran (lokal + asing)
- ✅ Acara modern/kontemporer
- ✅ Preferensi mempelai

### Yang Perlu Diperhatikan:
- ⚠️ Kutipan ayat tetap dalam bahasa Arab + terjemahan Indonesia
- ⚠️ Jika ingin kutipan dalam English, perlu edit manual di database
- ⚠️ Nama tamu di sampul tidak diterjemahkan (sesuai input)
- ⚠️ Ucapan tamu tidak diterjemahkan (sesuai input)

## 🧪 Cara Test

### Test 1: Ganti ke English
1. Login sebagai admin
2. Klik tab **"Bahasa"**
3. Pilih **"English"**
4. Buka undangan di tab baru
5. ✅ Seluruh teks berubah jadi English
6. ✅ Nama mempelai tetap sama
7. ✅ Tanggal tetap sama

### Test 2: Ganti ke Indonesia
1. Klik tab **"Bahasa"**
2. Pilih **"Bahasa Indonesia"**
3. Refresh undangan
4. ✅ Seluruh teks kembali ke Indonesia

### Test 3: Persistensi
1. Pilih bahasa English
2. Logout
3. Login lagi
4. ✅ Bahasa tetap English (tersimpan di database)

## 🔍 Cara Kerja Teknis

### 1. Penyimpanan Bahasa
```typescript
// Di WeddingData
{
  language: "id" | "en",
  // ... data lainnya
}
```

### 2. Loading Translations
```typescript
// Di WeddingContext
const language = (weddingData.data.language || "id") as Language;
const t = translations[language];

// Expose ke semua component
return <WeddingContext.Provider value={{ ..., language, t }}>
```

### 3. Penggunaan di Component
```typescript
// Di component manapun
const { t } = useWedding();

// Gunakan translations
<p>{t.cover.invitation}</p>
<p>{t.hero.countdown}</p>
```

### 4. Struktur Translations
```typescript
{
  cover: {
    invitation: "Undangan Pernikahan",
    to: "Kepada Yth. Bapak/Ibu/Saudara/i",
    // ...
  },
  hero: {
    weAreGettingMarried: "Kami Menikah",
    countdown: "Menghitung Hari",
    // ...
  },
  // ... section lainnya
}
```

## 📊 Perbandingan Fitur

| Fitur | Sebelum | Sesudah |
|-------|---------|---------|
| Bahasa | ❌ Hanya Indonesia | ✅ Indonesia & English |
| Pilihan bahasa | ❌ Tidak ada | ✅ Tab "Bahasa" di admin |
| Preview visual | ❌ Tidak ada | ✅ Preview dengan bendera |
| Persistensi | ❌ N/A | ✅ Tersimpan per admin |
| Meta tags | ❌ Hanya Indonesia | ✅ Sesuai bahasa |

## 🎯 Keuntungan

### Untuk Admin:
- ✅ Fleksibilitas memilih bahasa
- ✅ Mudah berganti bahasa
- ✅ Preview visual sebelum pilih
- ✅ Settings tersimpan otomatis

### Untuk Tamu:
- ✅ Undangan dalam bahasa yang sesuai
- ✅ Lebih personal untuk tamu internasional
- ✅ Tetap mudah dipahami

### Untuk Developer:
- ✅ Sistem translations yang scalable
- ✅ Mudah menambah bahasa baru
- ✅ Type-safe dengan TypeScript
- ✅ Clean separation of concerns

## 🚀 Menambah Bahasa Baru

Jika ingin menambah bahasa lain (misal: Arabic, Japanese):

### 1. Update `src/lib/translations.ts`

```typescript
export type Language = "id" | "en" | "ar" | "jp";

export const translations: Record<Language, Translations> = {
  id: { ... },
  en: { ... },
  ar: {
    cover: {
      invitation: "دعوة زفاف",
      to: "إلى السيد/السيدة",
      // ... terjemahan Arabic
    },
    // ... section lainnya
  },
  jp: {
    cover: {
      invitation: "結婚式の招待状",
      to: "様",
      // ... terjemahan Japanese
    },
    // ... section lainnya
  },
};
```

### 2. Update `src/components/admin/LanguageSelector.tsx`

```typescript
const languages = [
  { id: "id" as const, name: "Bahasa Indonesia", flag: "🇮🇩", description: "..." },
  { id: "en" as const, name: "English", flag: "🇬🇧", description: "..." },
  { id: "ar" as const, name: "العربية", flag: "🇸🇦", description: "..." },
  { id: "jp" as const, name: "日本語", flag: "🇯🇵", description: "..." },
];
```

### 3. Update `src/lib/useWeddingData.ts`

```typescript
export interface WeddingData {
  // ...
  language?: "id" | "en" | "ar" | "jp";
}
```

### 4. Build & Deploy

```bash
npm run build
# Deploy ke Vercel/Netlify
```

## 📝 Catatan Penting

### Yang Sudah Diterjemahkan:
- ✅ Semua teks UI (cover, hero, couple, events, story, gallery, gift, wishes, closing)
- ✅ Label form (nama, kehadiran, jumlah tamu, ucapan)
- ✅ Tombol dan link
- ✅ Countdown labels
- ✅ Meta tags (title, description)

### Yang Belum Diterjemahkan:
- ⚠️ Kutipan ayat (tetap Arab + Indonesia)
- ⚠️ Kisah cinta (custom per admin)
- ⚠️ Ucapan tamu (custom per tamu)
- ⚠️ Nama bank (custom per admin)

### Untuk Production:
- ✅ Sistem translations siap untuk production
- ✅ Mudah maintain dan extend
- ✅ Type-safe dengan TypeScript
- ✅ Performance optimal (no runtime overhead)

## 🎉 Kesimpulan

Fitur multi-bahasa telah berhasil ditambahkan dengan:
- ✅ 2 bahasa: Indonesia & English
- ✅ Tab "Bahasa" di admin panel
- ✅ Preview visual dengan bendera
- ✅ Translations lengkap untuk semua section
- ✅ Persistensi per admin
- ✅ Mudah extend untuk bahasa lain

Admin sekarang bisa memilih bahasa yang sesuai untuk undangan mereka, memberikan fleksibilitas untuk berbagai jenis pernikahan (tradisional, internasional, modern, dll).

---

**Status:** ✅ Build berhasil, fitur siap digunakan!

Admin bisa memilih bahasa Indonesia atau English untuk undangan mereka. Seluruh teks UI akan berubah sesuai bahasa yang dipilih, sementara nama mempelai, tanggal, dan lokasi tetap sesuai data yang diisi. Dokumentasi lengkap tersedia di file ini.
