# Perbaikan Terjemahan Bio Mempelai

## Masalah

Ketika admin memilih bahasa Inggris, bio mempelai masih dalam bahasa Indonesia:
- ❌ "Arsitek yang percaya bahwa rumah terbaik adalah tempat kita pulang."
- ❌ "Penata bunga yang menemukan taman paling indah di hati Raka."

Seharusnya:
- ✅ "An architect who believes that the best home is where we return."
- ✅ "A florist who found the most beautiful garden in Raka's heart."

## Penyebab

Komponen `Couple.tsx` menampilkan bio mempelai langsung dari `person.bio` tanpa memeriksa bahasa yang dipilih.

## Solusi

### 1. Tambah Field `bioEn` di Interface

Update `src/lib/useWeddingData.ts`:

```typescript
groom?: Partial<typeof DEFAULT_WEDDING.groom> & { 
  parentsEn?: string; 
  bioEn?: string;  // ← Tambahan
};
bride?: Partial<typeof DEFAULT_WEDDING.bride> & { 
  parentsEn?: string; 
  bioEn?: string;  // ← Tambahan
};
```

### 2. Tambah Bio Versi Inggris di Data Default

Update `src/lib/wedding.ts`:

```typescript
groom: {
  // ... existing fields
  bio: "Arsitek yang percaya bahwa rumah terbaik adalah tempat kita pulang.",
  bioEn: "An architect who believes that the best home is where we return.",
},
bride: {
  // ... existing fields
  bio: "Penata bunga yang menemukan taman paling indah di hati Raka.",
  bioEn: "A florist who found the most beautiful garden in Raka's heart.",
},
```

### 3. Update Komponen Couple.tsx

Tambahkan parameter `bio` di `PersonCard`:

```typescript
function PersonCard({
  person,
  parents,
  bio,  // ← Tambahan
  side,
  delay,
}: {
  person: typeof WEDDING.groom;
  parents: string;
  bio: string;  // ← Tambahan
  side: "left" | "right";
  delay: string;
}) {
  // ...
  <p className="mt-3 font-display text-sm italic text-gold-300/85">
    &ldquo;{bio}&rdquo;  // ← Gunakan parameter bio
  </p>
  // ...
}
```

Tambahkan logic untuk memilih bio berdasarkan bahasa:

```typescript
// Gunakan bioEn jika bahasa Inggris dan tersedia
const groomBio = language === "en" && groom.bioEn ? groom.bioEn : groom.bio;
const brideBio = language === "en" && bride.bioEn ? bride.bioEn : bride.bio;
```

Update pemanggilan `PersonCard`:

```typescript
<PersonCard person={groom} parents={groomParents} bio={groomBio} side="left" delay="rd-1" />
<PersonCard person={bride} parents={brideParents} bio={brideBio} side="right" delay="rd-2" />
```

## Hasil

Sekarang ketika admin memilih bahasa Inggris, bio mempelai akan diterjemahkan:

### Bahasa Indonesia
```
Raka Adyatma Prasetya
Putra pertama dari Bapak Hendra Prasetya & Ibu Wulan Kusuma — Jakarta
"Arsitek yang percaya bahwa rumah terbaik adalah tempat kita pulang."

Sekar Ayu Larasati
Putri kedua dari Bapak Bimo Laras & Ibu Ratna Dewi — Yogyakarta
"Penata bunga yang menemukan taman paling indah di hati Raka."
```

### Bahasa Inggris
```
Raka Adyatma Prasetya
First son of Mr. Hendra Prasetya & Mrs. Wulan Kusuma — Jakarta
"An architect who believes that the best home is where we return."

Sekar Ayu Larasati
Second daughter of Mr. Bimo Laras & Mrs. Ratna Dewi — Yogyakarta
"A florist who found the most beautiful garden in Raka's heart."
```

## File yang Diubah

1. **`src/lib/useWeddingData.ts`**
   - Tambah field `bioEn` di interface `groom` dan `bride`

2. **`src/lib/wedding.ts`**
   - Tambah `bioEn` untuk groom dan bride di data default

3. **`src/components/sections/Couple.tsx`**
   - Tambah parameter `bio` di `PersonCard`
   - Tambah logic untuk memilih bio berdasarkan bahasa
   - Update pemanggilan `PersonCard` dengan parameter `bio`

## Testing

### Test 1: Bahasa Indonesia
1. Login sebagai admin
2. Pilih tab "Bahasa"
3. Pilih "Bahasa Indonesia"
4. Buka undangan
5. ✅ Bio: "Arsitek yang percaya bahwa rumah terbaik adalah tempat kita pulang."

### Test 2: Bahasa Inggris
1. Pilih tab "Bahasa"
2. Pilih "English"
3. Buka undangan
4. ✅ Bio: "An architect who believes that the best home is where we return."

### Test 3: Bio Custom
1. Login sebagai admin
2. Pilih tab "Pengantin"
3. Edit bio mempelai
4. Tambahkan bioEn (versi Inggris)
5. Simpan
6. Pilih bahasa Inggris
7. ✅ Bio custom versi Inggris ditampilkan

## Kesimpulan

**Masalah:** Bio mempelai tidak diterjemahkan saat memilih bahasa Inggris

**Solusi:** 
- ✅ Tambah field `bioEn` di interface dan data default
- ✅ Update `Couple.tsx` untuk memilih bio berdasarkan bahasa
- ✅ Support bio custom dengan versi Inggris

**Hasil:**
- ✅ Bio mempelai sekarang diterjemahkan sesuai bahasa yang dipilih
- ✅ Support multi-bahasa (Indonesia & English)
- ✅ Admin bisa menambahkan bio custom dengan versi Inggris
- ✅ Build berhasil tanpa error

---

**Status:** ✅ Build berhasil, perbaikan siap digunakan!

Bio mempelai sekarang sudah diterjemahkan sesuai dengan bahasa yang dipilih. Admin bisa menambahkan versi Inggris untuk bio custom mereka di panel admin.
