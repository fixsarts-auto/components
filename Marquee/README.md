MARQUEE LOGO - Fixs Arts

Isi folder (simpan satu folder, misal components/Marquee/):
  marquee.js            <- SATU-SATUNYA file yang dipanggil di halaman
  demo.html             pengaturan (buka di browser)
  index.html            contoh halaman
  config.json           untuk "Impor config.json" di demo.html
  css/  js/  assets/    dimuat otomatis oleh marquee.js (jangan dipindah)

Pasang di halaman mana pun (cukup ini):
  <section>
    <div id="fixs-marquee"></div>
    <script src="components/Marquee/marquee.js"></script>
  </section>


Pemasangan lewat lokal folder 

  <!-- ================= MARQUEE Logo ================= -->
<section style="
  width: 100%;
  max-width: 1184px;
  margin: 0 auto;
">
  <div id="fixs-marquee"></div>
  <script src="D:\Fixs Arts\Website\fixsarts-auto\components\Marquee\marquee.js"></script>
</section>


Alamat src = lokasi marquee.js RELATIF terhadap halaman tersebut (pakai garis miring /, bukan \, hindari spasi di nama folder).
Cara ini sama untuk lokal (file://), GitHub Pages, maupun Cloudflare Pages.

Ubah pengaturan: buka demo.html, Impor config.json, atur, lalu Unduh .zip terbaru dan timpa isi foldernya.
Tema: mode "Ikuti tema web" membaca data-theme / data-bs-theme / class dark pada <html> atau <body>.
