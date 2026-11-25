# Aset header & footer

Alamat gambar di `headerfooter-config.js` dihitung dari folder `components/headerfooter/`,
jadi `assets/icon/search.png` = `components/headerfooter/assets/icon/search.png`.

```
components/headerfooter/assets/
├── logo/
│   ├── fixsarts.png          logo untuk latar GELAP (versi putih)  <- header & footer
│   └── fixsarts-light.png    logo untuk latar TERANG (opsional, dipakai footer tema terang)
└── icon/
    ├── search.png            ikon pencarian (header)    ✔ sudah ada
    └── cart.png              ikon keranjang (header)    ✔ sudah ada
```

- Pakai PNG transparan. Ikon header sebaiknya **putih** (header gelap).
- Ikon sosial media di footer (Instagram, WhatsApp, TikTok, Gmail, dll) **sudah bawaan** (SVG), tidak perlu file.
  Kalau mau pakai gambar sendiri, isi kolom "Gambar ikon sendiri" di demo.html lalu taruh file PNG-nya di `icon/`.
- Nama file huruf kecil semua (GitHub Pages membedakan huruf besar/kecil).
- Kalau file belum ada, tampilan tetap jalan: logo jadi teks, ikon header jadi emoji.
