# components/headerfooter

Header dan footer website jadi **satu paket**. Ubah sekali di sini, semua halaman ikut berubah.

```
components/headerfooter/
├── demo.html                ⭐ TEMPAT MENGATUR: editor + preview langsung
├── headerfooter-config.js   hasil pengaturan (dibuat / ditimpa dari demo.html)
├── headerfooter.js          mesin header + footer (tidak perlu diubah)
├── headerfooter.css         tampilan header + footer
└── assets/                  logo/ & icon/ untuk header + footer (lihat assets/README.md)
```

## Cara kerja sehari-hari

1. Buka `demo.html` lewat Live Server / GitHub Pages (`https://fixsarts-auto.github.io/components/headerfooter/demo.html`).
2. Atur lewat tab **Header · Footer · Bahasa · Tampilan** — preview di kanan berubah langsung.
   **Edit visual** (tombol ON/OFF di atas preview): klik bagian mana saja di preview (logo, menu, ikon sosmed, copyright, dll) dan panel kiri otomatis lompat ke pengaturannya.
   Ganti ukuran **Desktop / Tablet / HP** dari tombol di atas preview.
3. Klik **Unduh headerfooter-config.js**, timpa file `components/headerfooter/headerfooter-config.js` di repo, commit & push.

Perubahan yang belum diunduh tersimpan sebagai *draft* di browser (ada penanda di bagian atas).
**Reset ke file** membuang draft.

## Preview di website lain

Tempel alamat website target di kolom di atas preview lalu **Muat**. Hasilnya: header di atas,
website target di tengah, footer di bawah, dengan ukuran Desktop / Tablet / HP yang dipilih.

> Batasan browser: website yang melarang ditampilkan di dalam iframe (`X-Frame-Options` /
> `frame-ancestors`, mis. Google, Instagram, sebagian besar situs besar) akan tampil kosong.
> Itu aturan dari website tersebut, bukan error di demo. Header & footer tetap bisa dicek lewat halaman contoh.

## Memasang di website lain

Tab **Pasang** di demo.html menghasilkan kodenya (alamat folder bisa diubah). Intinya:

```html
<link rel="stylesheet" href="https://fixsarts-auto.github.io/components/headerfooter/headerfooter.css">

<header data-site-header></header>
<script src="https://fixsarts-auto.github.io/components/headerfooter/headerfooter-config.js"></script>
<script src="https://fixsarts-auto.github.io/components/headerfooter/headerfooter.js"></script>

<footer data-site-footer></footer>
```

Config dibaca dari alamat itu, jadi mengubah config sekali akan mengubah **semua** website yang memasangnya.
Semua class header berawalan `hf-` dan footer `ft-`, jadi tidak bentrok dengan CSS website lain.

## Di website ini (relatif)

```html
<!-- di <head>, setelah style.css & responsive.css -->
<link rel="stylesheet" href="components/headerfooter/headerfooter.css">

<!-- di <body>, paling atas -->
<header data-site-header></header>
<script src="components/headerfooter/headerfooter-config.js"></script>
<script src="components/headerfooter/headerfooter.js"></script>

<main> ... </main>

<footer data-site-footer></footer>
```

Dua `<script>` itu harus **tepat setelah** `<header data-site-header>` dan sebelum `js/app.js`.

## Edit manual tanpa demo (opsional)

`headerfooter-config.js` tetap bisa diedit langsung: bagian A = `HeaderConfig`, bagian B = `FooterConfig`.
Catatan: file yang diunduh dari demo.html tidak membawa komentar panduan.

## Header di website berlatar putih

Tab **Header → Latar header**:
- **Otomatis** (bawaan): di halaman berlatar terang header jadi **hitam solid tanpa blur** (blur di atas putih terlihat abu-abu), di halaman gelap tetap kaca/blur.
- **Selalu hitam solid** / **Kaca / blur**: paksa salah satunya.
- **Warna latar header**: samakan dengan background logo, mis. `#000000` untuk logo GIF berlatar hitam, supaya tidak ada kotak yang nabrak.

Header tidak mewarisi warna dari website (pakai variabel `--hf-*`), jadi tetap gelap meski CSS website bertema terang.
Cek lewat tombol **Halaman putih** di atas preview demo.

## Catatan

- Link tanpa skema seperti `tr.ee/fixs-store` otomatis jadi `https://tr.ee/fixs-store`. Centang **Buka di tab baru** pada menu untuk link luar.
- Logo & ikon header (search, keranjang) diatur di tab **Header** (file di `assets/logo/` dan `assets/icon/`). Pengaturan ikon di Admin tidak lagi memengaruhi header.
- Header: opsi **Nonaktifkan semua link header** (logo, menu, submenu, keranjang jadi tidak bisa diklik).
- Footer: kontak = **ikon sosial media saja** (Instagram, WhatsApp, TikTok, Gmail, dll). Tiap ikon punya on/off **Tampilkan** dan on/off **Link**. Ikon bawaan berupa SVG, jadi tidak butuh file gambar.
- Dropdown menu: tiap menu bisa punya submenu dengan centang on/off. Tombol pojok kanan bisa **Keranjang** atau **Hamburger menu** (menu bar tetap tampil di desktop; hamburger membuka panel berisi menu yang sama).
- Badge angka keranjang diisi oleh `js/cart.js` (hanya ada di website studio ini).
- Dropdown bahasa footer menyimpan pilihan di `localStorage` (`ft_lang`). Header belum ikut diterjemahkan.
