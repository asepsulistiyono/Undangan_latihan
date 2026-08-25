# Undangan_latihan
Anda bisa langsung mengedit undangan melalui GitHub dengan dua cara:
Cara cepat (tanpa install apa pun):
Unggah file proyek ke repository (hapus folder node_modules dulu)
Di GitHub, klik file src/lib/wedding.ts → ikon pensil → edit → Commit
Atau tekan tombol . di halaman repo untuk membuka VS Code di browser
Cara lengkap (dengan Codespaces):
Tombol <> Code → Codespaces → Create codespace, lalu jalankan npm install dan npm run dev untuk melihat hasilnya langsung di browser
Untuk menerbitkan website secara otomatis: hubungkan repository ke Netlify atau Vercel (gratis). Setiap commit akan otomatis membangun ulang website dalam ±1 menit, tanpa perlu menyentuh komputer.




cara menambahkan tamu undangan
Build sukses ✅ — fitur kelola 1000 tamu sudah jadi! Berikut cara pakainya:
Membuka panel pengelola
Tambahkan #/tamu di belakang alamat website Anda:

1
Ini halaman khusus Anda (tamu undangan tidak akan melihatnya). Klik "Lihat Undangan" untuk kembali.
Cara kerja untuk 1000 tamu
1. Tempel seluruh daftar sekaligus — di kotak "Tambahkan Tamu", tempel dari Excel/catatan Anda, satu nama per baris. Nomor WhatsApp opsional, dipisah tanda |:

1234
Klik Tambahkan — sistem menghitung baris yang terbaca saat Anda mengetik, dan otomatis melewati nama duplikat.
2. Setiap tamu langsung punya link pribadi — pola ?to=NamaTamu. Saat tamu membuka link itu, nama mereka tampil di sampul depan (nama panjang otomatis dipecah rapi: nama utama besar + keterangan "beserta keluarga" kecil di bawahnya).
3. Kirim ke tamu — tiap baris tamu punya 4 tombol:
🟢 Hijau (WhatsApp) — langsung membuka chat WA ke nomor tamu dengan pesan undangan yang sudah terisi nama & linknya (tinggal pencet kirim di WA)
🔗 Emas — salin link pribadi tamu
✏️ — ubah nama/nomor · 🗑 — hapus
4. Template pesan bisa diatur — bagian "Template Pesan WhatsApp" memakai {nama} dan {link} yang terisi otomatis, lengkap dengan pratinjau langsung.
5. Untuk broadcast massal — unduh CSV (kolom Nama, No HP, Link — bisa dipakai alat broadcast WA), TXT (daftar link), dan JSON sebagai cadangan. Ada tombol Pulihkan untuk memasukkan kembali cadangan JSON.
Yang penting diketahui
Daftar tamu tersimpan di peramban perangkat Anda (bukan di server) — jadi rutin unduh cadangan JSON, dan kelola dari perangkat yang sama.
Link tamu mandiri — nama tersandi langsung di URL, jadi tidak butuh database. Link yang sudah Anda bagikan tetap bekerja selamanya, di perangkat tamu mana pun.
Ada pencarian untuk menemukan tamu tertentu di antara 1000 nama, dan daftar dimuat bertahap agar tetap ringan.
Alur lengkap Anda nanti
Upload proyek ke GitHub (termasuk kode baru ini) → deploy ke Netlify
Buka link-anda.netlify.app/#/tamu → tempel 1000 nama
Unduh cadangan JSON (simpan baik-baik)
Bagikan link pribadi tiap tamu via tombol WhatsApp — atau salin semua link + CSV untuk broadcast
Coba buka #/tamu di pratinjau sekarang dan tempel beberapa nama untuk melihat alurnya. Kalau ada yang ingin ditambah — misalnya penanda "sudah dikirim" per tamu atau pembagian gelombang sesi — tinggal bilang!
