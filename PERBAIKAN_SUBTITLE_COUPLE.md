# Perbaikan Format Agama - Subtitle Couple

## 🐛 Masalah yang Diperbaiki

Ketika admin memilih format Kristen Protestan, bagian Couple masih menampilkan subtitle Islam:
- ❌ **Sebelum**: "Dengan memohon rahmat dan ridha Allah SWT..."
- ✅ **Sesudah**: "Dengan memohon berkat dan rahmat Tuhan Yesus Kristus..."

## 🔍 Penyebab Masalah

Subtitle di bagian Couple menggunakan `t.couple.subtitle` dari `translations.ts` yang bersifat statis, bukan dari `religiousFormat`. Akibatnya, subtitle tidak berubah meskipun format agama sudah diganti.

## ✅ Solusi yang Diimplementasikan

### 1. Tambah Field Baru di `religiousFormats.ts`

Menambahkan `coupleSubtitle` dan `coupleSubtitleEn` untuk setiap format agama:

```typescript
export interface ReligiousFormatData {
  // ... existing fields
  
  // Couple Section
  coupleBlessing: string;
  coupleBlessingEn: string;
  coupleSubtitle: string;      // ← BARU
  coupleSubtitleEn: string;    // ← BARU
  
  // ... other fields
}
```

### 2. Tambah Subtitle untuk Setiap Agama

**Islam:**
```typescript
coupleSubtitle: "Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang insyaAllah akan berjalan beriringan.",
coupleSubtitleEn: "With the blessings of Allah SWT, we intend to hold the wedding of our children — two hearts that will walk together in life.",
```

**Kristen Protestan:**
```typescript
coupleSubtitle: "Dengan memohon berkat dan rahmat Tuhan Yesus Kristus, kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang akan berjalan bersama dalam iman dan kasih.",
coupleSubtitleEn: "With the blessings and grace of Lord Jesus Christ, we intend to hold the wedding of our children — two hearts that will walk together in faith and love.",
```

**Kristen Katolik:**
```typescript
coupleSubtitle: "Dengan memohon berkat dan rahmat Tuhan, kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang akan berjalan bersama dalam kasih karunia.",
coupleSubtitleEn: "With the blessings and grace of God, we intend to hold the wedding of our children — two hearts that will walk together in grace and love.",
```

**Hindu:**
```typescript
coupleSubtitle: "Dengan memohon restu dan berkat Ida Sang Hyang Widhi Wasa, kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang akan berjalan bersama dalam dharma.",
coupleSubtitleEn: "With the blessings of Ida Sang Hyang Widhi Wasa, we intend to hold the wedding of our children — two hearts that will walk together in dharma.",
```

**Buddha:**
```typescript
coupleSubtitle: "Dengan memohon berkat dan restu Tiga Permata (Triratna), kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang akan berjalan bersama dalam cinta kasih dan kebijaksanaan.",
coupleSubtitleEn: "With the blessings of The Three Jewels (Triratna), we intend to hold the wedding of our children — two hearts that will walk together in loving-kindness and wisdom.",
```

**Konghucu:**
```typescript
coupleSubtitle: "Dengan penuh hormat dan kebajikan, kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang akan berjalan bersama dalam harmoni dan kebajikan.",
coupleSubtitleEn: "With respect and virtue, we intend to hold the wedding of our children — two hearts that will walk together in harmony and virtue.",
```

**Universal:**
```typescript
coupleSubtitle: "Dengan penuh cinta dan kebahagiaan, kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang akan berjalan bersama dalam sukacita.",
coupleSubtitleEn: "With love and happiness, we intend to hold the wedding of our children — two hearts that will walk together in joy.",
```

### 3. Update `Couple.tsx`

Mengubah subtitle dari `t.couple.subtitle` menjadi `religiousFormat.coupleSubtitle`:

```typescript
// Sebelum
<SectionHead
  eyebrow={coupleBlessing}
  title={...}
  sub={t.couple.subtitle}  // ❌ Masih statis
/>

// Sesudah
const coupleSubtitle = language === "en"
  ? religiousFormat.coupleSubtitleEn
  : religiousFormat.coupleSubtitle;

<SectionHead
  eyebrow={coupleBlessing}
  title={...}
  sub={coupleSubtitle}  // ✅ Dinamis sesuai format agama
/>
```

## 📊 Perbandingan Hasil

### Format Islam
**Subtitle:**
> "Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang insyaAllah akan berjalan beriringan."

### Format Kristen Protestan
**Subtitle:**
> "Dengan memohon berkat dan rahmat Tuhan Yesus Kristus, kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang akan berjalan bersama dalam iman dan kasih."

### Format Kristen Katolik
**Subtitle:**
> "Dengan memohon berkat dan rahmat Tuhan, kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang akan berjalan bersama dalam kasih karunia."

### Format Hindu
**Subtitle:**
> "Dengan memohon restu dan berkat Ida Sang Hyang Widhi Wasa, kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang akan berjalan bersama dalam dharma."

### Format Buddha
**Subtitle:**
> "Dengan memohon berkat dan restu Tiga Permata (Triratna), kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang akan berjalan bersama dalam cinta kasih dan kebijaksanaan."

### Format Konghucu
**Subtitle:**
> "Dengan penuh hormat dan kebajikan, kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang akan berjalan bersama dalam harmoni dan kebajikan."

### Format Universal
**Subtitle:**
> "Dengan penuh cinta dan kebahagiaan, kami bermaksud menyelenggarakan pernikahan putra-putri kami — dua hati yang akan berjalan bersama dalam sukacita."

## 📁 File yang Diubah

1. **`src/lib/religiousFormats.ts`**
   - Tambah field `coupleSubtitle` dan `coupleSubtitleEn` di interface
   - Tambah subtitle untuk semua 7 format agama

2. **`src/components/sections/Couple.tsx`**
   - Extract `coupleSubtitle` dari `religiousFormat`
   - Gunakan `coupleSubtitle` alih-alih `t.couple.subtitle`

3. **`src/lib/useWeddingData.ts`**
   - Tambah `religiousFormat` dan `language` di return type `mergeWithDefaults`

## 🧪 Cara Testing

### Test 1: Format Kristen Protestan
1. Login sebagai admin
2. Klik tab **"Format Agama"**
3. Pilih **"Kristen Protestan"**
4. Buka undangan
5. ✅ Cover: "Shalom, Salam Sejahtera"
6. ✅ Hero: "Firman Tuhan" + Markus 10:8-9
7. ✅ Couple: "Dalam Nama Tuhan Yesus Kristus"
8. ✅ **Couple Subtitle**: "Dengan memohon berkat dan rahmat Tuhan Yesus Kristus..."

### Test 2: Format Hindu
1. Pilih **"Hindu"**
2. Buka undangan
3. ✅ Cover: "Om Swastiastu"
4. ✅ Hero: "Wedasana" + Mantra Pernikahan
5. ✅ Couple: "Om Swastiastu"
6. ✅ **Couple Subtitle**: "Dengan memohon restu dan berkat Ida Sang Hyang Widhi Wasa..."

### Test 3: Format Universal
1. Pilih **"Universal"**
2. Buka undangan
3. ✅ Cover: "Dengan Hormat dan Sukacita"
4. ✅ Hero: "Kata-Kata Inspirasi" + Antoine de Saint-Exupéry
5. ✅ Couple: "Dengan Cinta dan Kebahagiaan"
6. ✅ **Couple Subtitle**: "Dengan penuh cinta dan kebahagiaan..."

### Test 4: Kombinasi dengan Bahasa
1. Pilih **"Kristen Protestan"** + **"English"**
2. Buka undangan
3. ✅ Cover: "Shalom, Peace Be With You"
4. ✅ Hero: "Word of God" + Mark 10:8-9
5. ✅ Couple: "In The Name of Lord Jesus Christ"
6. ✅ **Couple Subtitle**: "With the blessings and grace of Lord Jesus Christ..."

## 💡 Kesimpulan

**Masalah:** Subtitle di bagian Couple tidak berubah sesuai format agama

**Solusi:** 
- ✅ Tambah field `coupleSubtitle` di setiap format agama
- ✅ Update `Couple.tsx` untuk menggunakan `religiousFormat.coupleSubtitle`
- ✅ Subtitle sekarang dinamis dan berubah sesuai format agama yang dipilih

**Hasil:**
- ✅ Semua 7 format agama memiliki subtitle yang sesuai
- ✅ Subtitle berubah otomatis saat format agama diganti
- ✅ Support multi-bahasa (Indonesia & English)
- ✅ Build berhasil tanpa error

---

**Status:** ✅ Build berhasil, perbaikan siap digunakan!

Subtitle di bagian Couple sekarang sudah berubah sesuai dengan format agama yang dipilih. Setiap format agama memiliki subtitle yang sesuai dengan ajaran dan tradisi masing-masing.
