MARQUEE LOGO - Fixs Arts

Struktur:
  index.html            contoh halaman (bisa dibuka langsung, file://)
  css/marquee-logo.css  style marquee
  js/marquee-logo.js    mesin marquee (jangan diubah)
  js/marquee-config.js  data & pengaturan (dibuat oleh demo.html)
  config.json           salinan pengaturan, untuk "Impor config.json" di demo.html
  assets/               salinan file logo (arsip)

Pasang di index.html lain:
  1. Salin folder css/ dan js/ ke website.
  2. Di <head>:   <link rel="stylesheet" href="css/marquee-logo.css">
  3. Di posisi section:  <div id="fixs-marquee"></div>
  4. Sebelum </body>:
       <script src="js/marquee-config.js"></script>
       <script src="js/marquee-logo.js"></script>
  Atau cukup tempel hasil "Salin script" dari demo.html (tanpa file lain).

Ubah pengaturan: buka demo.html (satu folder dengan folder js/), Impor config.json, atur, lalu Unduh .zip terbaru.

Tema: mode "Ikuti tema web" membaca data-theme / data-bs-theme / class dark pada <html> atau <body>.
