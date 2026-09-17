# Perbaikan Nama Acara Berdasarkan Format Agama

## Masalah

Ketika admin memilih format agama (Kristen Protestan, Hindu, Buddha, dll), nama acara seperti "Akad Nikah" dan "Resepsi Pernikahan" masih dalam bahasa Indonesia dan menggunakan terminologi Islam, tidak berubah sesuai dengan format agama yang dipilih.

## Penyebab

Events.tsx menggunakan `ev.name` dan `ev.nameEn` dari data admin yang bersifat statis, sehingga tidak berubah sesuai dengan format agama yang dipilih. Istilah seperti "Akad Nikah" adalah terminologi Islam yang tidak cocok untuk format agama Kristen, Hindu, dll.

## Solusi

### 1. Tambah Field Baru di `religiousFormats.ts`

Menambahkan field `eventNames` di interface `ReligiousFormatData`:

```typescript
export interface ReligiousFormatData {
  // ... existing fields
  
  // Events
  eventNames: {
    ceremony: string;
    ceremonyEn: string;
    reception: string;
    receptionEn: string;
  };
  
  // ... other fields
}
```

### 2. Tambah Nama Acara untuk Setiap Format Agama

**Islam:**
```typescript
eventNames: {
  ceremony: "Akad Nikah",
  ceremonyEn: "Wedding Ceremony",
  reception: "Resepsi Pernikahan",
  receptionEn: "Wedding Reception",
},
```

**Kristen Protestan:**
```typescript
eventNames: {
  ceremony: "Ibadah Pemberkatan Nikah",
  ceremonyEn: "Wedding Blessing Service",
  reception: "Perjamuan Syukur",
  receptionEn: "Thanksgiving Reception",
},
```

**Kristen Katolik:**
```typescript
eventNames: {
  ceremony: "Misa Pemberkatan Nikah",
  ceremonyEn: "Wedding Blessing Mass",
  reception: "Perjamuan Syukur",
  receptionEn: "Thanksgiving Reception",
},
```

**Hindu:**
```typescript
eventNames: {
  ceremony: "Upacara Pawiwahan",
  ceremonyEn: "Pawiwahan Ceremony",
  reception: "Perjamuan Syukur",
  receptionEn: "Thanksgiving Reception",
},
```

**Buddha:**
```typescript
eventNames: {
  ceremony: "Upacara Pemberkatan Nikah",
  ceremonyEn: "Wedding Blessing Ceremony",
  reception: "Perjamuan Syukur",
  receptionEn: "Thanksgiving Reception",
},
```

**Konghucu:**
```typescript
eventNames: {
  ceremony: "Upacara Pemberkatan Nikah",
  ceremonyEn: "Wedding Blessing Ceremony",
  reception: "Perjamuan Syukur",
  receptionEn: "Thanksgiving Reception",
},
```

**Universal:**
```typescript
eventNames: {
  ceremony: "Upacara Pernikahan",
  ceremonyEn: "Wedding Ceremony",
  reception: "Perjamuan Syukur",
  receptionEn: "Reception",
},
```

### 3. Update `Events.tsx`

Mengubah logika penentuan nama acara dari `ev.name` menjadi `religiousFormat.eventNames`:

```typescript
// Sebelum
const eventName = language === "en" && ev.nameEn ? ev.nameEn : ev.name;

// Sesudah
let eventName = ev.name;
if (ev.id === "akad") {
  eventName = language === "en" 
    ? religiousFormat.eventNames.ceremonyEn 
    : religiousFormat.eventNames.ceremony;
} else if (ev.id === "resepsi") {
  eventName = language === "en" 
    ? religiousFormat.eventNames.receptionEn 
    : religiousFormat.eventNames.reception;
} else {
  // Fallback ke nameEn jika ada
  eventName = language === "en" && ev.nameEn ? ev.nameEn : ev.name;
}
```

## Hasil

Sekarang ketika admin memilih format agama, nama acara di Events section akan berubah sesuai dengan format yang dipilih:

### Format Islam
```
Akad Nikah
Sabtu, 12 Juni 2027
08.00 – 10.00 WIB

Resepsi Pernikahan
Sabtu, 12 Juni 2027
11.00 – 14.00 WIB
```

### Format Kristen Protestan
```
Ibadah Pemberkatan Nikah
Sabtu, 12 Juni 2027
08.00 – 10.00 WIB

Perjamuan Syukur
Sabtu, 12 Juni 2027
11.00 – 14.00 WIB
```

### Format Kristen Katolik
```
Misa Pemberkatan Nikah
Sabtu, 12 Juni 2027
08.00 – 10.00 WIB

Perjamuan Syukur
Sabtu, 12 Juni 2027
11.00 – 14.00 WIB
```

### Format Hindu
```
Upacara Pawiwahan
Sabtu, 12 Juni 2027
08.00 – 10.00 WIB

Perjamuan Syukur
Sabtu, 12 Juni 2027
11.00 – 14.00 WIB
```

### Format Buddha
```
Upacara Pemberkatan Nikah
Sabtu, 12 Juni 2027
08.00 – 10.00 WIB

Perjamuan Syukur
Sabtu, 12 Juni 2027
11.00 – 14.00 WIB
```

### Format Konghucu
```
Upacara Pemberkatan Nikah
Sabtu, 12 Juni 2027
08.00 – 10.00 WIB

Perjamuan Syukur
Sabtu, 12 Juni 2027
11.00 – 14.00 WIB
```

### Format Universal
```
Upacara Pernikahan
Sabtu, 12 Juni 2027
08.00 – 10.00 WIB

Perjamuan Syukur
Sabtu, 12 Juni 2027
11.00 – 14.00 WIB
```

## File yang Diubah

1. **`src/lib/religiousFormats.ts`**
   - Tambah field `eventNames` di interface `ReligiousFormatData`
   - Tambah nama acara untuk semua 7 format agama (ceremony, ceremonyEn, reception, receptionEn)

2. **`src/components/sections/Events.tsx`**
   - Extract `religiousFormat` dari `useWedding()`
   - Gunakan `religiousFormat.eventNames` berdasarkan ID acara (akad/resepsi)
   - Support multi-bahasa (Indonesia & English)

## Testing

### Test 1: Format Kristen Protestan
1. Login sebagai admin
2. Klik tab "Format Agama"
3. Pilih "Kristen Protestan"
4. Buka undangan
5. ✅ Events: "Ibadah Pemberkatan Nikah" dan "Perjamuan Syukur"

### Test 2: Format Hindu
1. Pilih "Hindu"
2. Buka undangan
3. ✅ Events: "Upacara Pawiwahan" dan "Perjamuan Syukur"

### Test 3: Format Universal
1. Pilih "Universal"
2. Buka undangan
3. ✅ Events: "Upacara Pernikahan" dan "Perjamuan Syukur"

### Test 4: Kombinasi dengan Bahasa
1. Pilih "Kristen Protestan" + "English"
2. Buka undangan
3. ✅ Events: "Wedding Blessing Service" dan "Thanksgiving Reception"

## Kesimpulan

**Masalah:** Nama acara seperti "Akad Nikah" tidak berubah sesuai format agama

**Solusi:** 
- ✅ Tambah field `eventNames` di setiap format agama
- ✅ Update `Events.tsx` untuk menggunakan `religiousFormat.eventNames`
- ✅ Nama acara sekarang dinamis dan berubah sesuai format agama

**Hasil:**
- ✅ Semua 7 format agama memiliki nama acara yang sesuai
- ✅ Nama acara berubah otomatis saat format agama diganti
- ✅ Support multi-bahasa (Indonesia & English)
- ✅ Build berhasil tanpa error

---

**Status:** ✅ Build berhasil, perbaikan siap digunakan!

Nama acara di Events section sekarang sudah berubah sesuai dengan format agama yang dipilih. Setiap format agama memiliki nama acara yang sesuai dengan tradisi dan terminologi masing-masing.
