# Perbaikan Hero Announcement Berdasarkan Format Agama

## Masalah

Ketika admin memilih format agama (Kristen Protestan, Hindu, Buddha, dll), teks "Kami Menikah — Assalamu'alaikum Wr. Wb." di Hero section tidak berubah dan tetap menampilkan salam Islam.

## Penyebab

Hero section menggunakan `t.hero.weAreGettingMarried` dari `translations.ts` yang bersifat statis, sehingga tidak berubah sesuai dengan format agama yang dipilih.

## Solusi

### 1. Tambah Field Baru di `religiousFormats.ts`

Menambahkan field `heroAnnouncement` dan `heroAnnouncementEn` di interface `ReligiousFormatData`:

```typescript
export interface ReligiousFormatData {
  // ... existing fields
  
  // Hero - Announcement
  heroAnnouncement: string;
  heroAnnouncementEn: string;
  
  // ... other fields
}
```

### 2. Tambah Hero Announcement untuk Setiap Format Agama

**Islam:**
```typescript
heroAnnouncement: "Kami Menikah — Assalamu'alaikum Wr. Wb.",
heroAnnouncementEn: "We Are Getting Married — Peace Be Upon You",
```

**Kristen Protestan:**
```typescript
heroAnnouncement: "Kami Menikah — Shalom",
heroAnnouncementEn: "We Are Getting Married — Shalom",
```

**Kristen Katolik:**
```typescript
heroAnnouncement: "Kami Menikah — Salam Sejahtera",
heroAnnouncementEn: "We Are Getting Married — Peace Be With You",
```

**Hindu:**
```typescript
heroAnnouncement: "Kami Menikah — Om Swastiastu",
heroAnnouncementEn: "We Are Getting Married — Om Swastiastu",
```

**Buddha:**
```typescript
heroAnnouncement: "Kami Menikah — Namo Buddhaya",
heroAnnouncementEn: "We Are Getting Married — Namo Buddhaya",
```

**Konghucu:**
```typescript
heroAnnouncement: "Kami Menikah — Salam Kebajikan",
heroAnnouncementEn: "We Are Getting Married — Greetings of Virtue",
```

**Universal:**
```typescript
heroAnnouncement: "Kami Menikah — Dengan Sukacita",
heroAnnouncementEn: "We Are Getting Married — With Joy",
```

### 3. Update `Hero.tsx`

Mengubah teks announcement dari `t.hero.weAreGettingMarried` menjadi `religiousFormat.heroAnnouncement`:

```typescript
// Sebelum
<p className="mask-line ml-d1 text-[11px] font-semibold uppercase tracking-[0.42em] text-gold-300">
  <span>{t.hero.weAreGettingMarried}</span>
</p>

// Sesudah
<p className="mask-line ml-d1 text-[11px] font-semibold uppercase tracking-[0.42em] text-gold-300">
  <span>{language === "en" ? religiousFormat.heroAnnouncementEn : religiousFormat.heroAnnouncement}</span>
</p>
```

## Hasil

Sekarang ketika admin memilih format agama, teks announcement di Hero section akan berubah sesuai dengan format yang dipilih:

### Format Islam
```
Kami Menikah — Assalamu'alaikum Wr. Wb.
```

### Format Kristen Protestan
```
Kami Menikah — Shalom
```

### Format Kristen Katolik
```
Kami Menikah — Salam Sejahtera
```

### Format Hindu
```
Kami Menikah — Om Swastiastu
```

### Format Buddha
```
Kami Menikah — Namo Buddhaya
```

### Format Konghucu
```
Kami Menikah — Salam Kebajikan
```

### Format Universal
```
Kami Menikah — Dengan Sukacita
```

## File yang Diubah

1. **`src/lib/religiousFormats.ts`**
   - Tambah field `heroAnnouncement` dan `heroAnnouncementEn` di interface
   - Tambah hero announcement untuk semua 7 format agama

2. **`src/components/sections/Hero.tsx`**
   - Gunakan `religiousFormat.heroAnnouncement` alih-alih `t.hero.weAreGettingMarried`
   - Support multi-bahasa (Indonesia & English)

## Testing

### Test 1: Format Kristen Protestan
1. Login sebagai admin
2. Klik tab "Format Agama"
3. Pilih "Kristen Protestan"
4. Buka undangan
5. ✅ Hero: "Kami Menikah — Shalom"

### Test 2: Format Hindu
1. Pilih "Hindu"
2. Buka undangan
3. ✅ Hero: "Kami Menikah — Om Swastiastu"

### Test 3: Format Universal
1. Pilih "Universal"
2. Buka undangan
3. ✅ Hero: "Kami Menikah — Dengan Sukacita"

### Test 4: Kombinasi dengan Bahasa
1. Pilih "Kristen Protestan" + "English"
2. Buka undangan
3. ✅ Hero: "We Are Getting Married — Shalom"

## Kesimpulan

**Masalah:** Teks "Kami Menikah" di Hero section tidak berubah sesuai format agama

**Solusi:** 
- ✅ Tambah field `heroAnnouncement` di setiap format agama
- ✅ Update `Hero.tsx` untuk menggunakan `religiousFormat.heroAnnouncement`
- ✅ Announcement sekarang dinamis dan berubah sesuai format agama

**Hasil:**
- ✅ Semua 7 format agama memiliki announcement yang sesuai
- ✅ Announcement berubah otomatis saat format agama diganti
- ✅ Support multi-bahasa (Indonesia & English)
- ✅ Build berhasil tanpa error

---

**Status:** ✅ Build berhasil, perbaikan siap digunakan!

Teks announcement di Hero section sekarang sudah berubah sesuai dengan format agama yang dipilih. Setiap format agama memiliki announcement yang sesuai dengan tradisi dan salam masing-masing.
