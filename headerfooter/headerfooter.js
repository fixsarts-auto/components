/**
 * =====================================================================
 *  HEADER + FOOTER — headerfooter.js
 *  Satu file berisi mesin HEADER dan mesin FOOTER. Umumnya tidak perlu diubah.
 *  Yang diedit: headerfooter-config.js
 *
 *  Penting: file ini harus diletakkan TEPAT SETELAH <header data-site-header>
 *  dan sebelum js/app.js, supaya header langsung tampil tanpa berkedip.
 *  Footer dirender otomatis di <footer data-site-footer> setelah halaman dimuat.
 * =====================================================================
 */

/* ################ BAGIAN 1 — HEADER ################ */
(function () {
  "use strict";

  // Lokasi file ini dipakai untuk menghitung alamat logo & ikon (relatif ke folder headerfooter).
  var SCRIPT_SRC = (document.currentScript && document.currentScript.src) || "";

  var DEFAULTS = {
    assetBase: "",
    brand: { logoUrl: "", logoHeight: "32px", main: "BRAND", accent: "", href: "index.html" },
    menu: [],
    search: { show: true, action: "services.html", placeholder: "Cari...", label: "Cari", icon: "", emoji: "🔍" },
    rightButton: { mode: "cart" },                       // "cart" | "hamburger" | "none"
    disableLinks: false,                                 // true = semua link header tidak bisa diklik
    style: { mode: "auto", background: "" },             // latar header: "auto" | "solid" | "glass"
    cart: { href: "cart.html", label: "Keranjang", icon: "", emoji: "🛍️" },
    iconSize: "20px",
    toggleLabel: "Buka menu"
  };

  var MOBILE_QUERY = "(max-width: 959px)";

  /* ---------- helper ---------- */
  function esc(value) {
    return String(value === undefined || value === null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  // Hanya izinkan protokol aman (tolak "javascript:" dsb).
  function safeHref(href) {
    var h = String(href || "").trim();
    if (!h) return "#";
    if (/^(https?:|mailto:|tel:|#|\/|\.\.?\/)/i.test(h)) return h;
    // alamat tanpa skema, mis. "tr.ee/fixs-store" -> dianggap website luar (https://), bukan file di situs ini
    if (/^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}\//i.test(h) && !/^[^/]+\.(html?|php|aspx?|pdf|png|jpe?g|gif|webp|svg|css|js)\//i.test(h)) return "https://" + h;
    if (/^[a-z][a-z0-9+.-]*:/i.test(h)) return "#";
    return h;
  }

  function merge(base, extra) {
    var out = {};
    Object.keys(base).forEach(function (k) { out[k] = base[k]; });
    Object.keys(extra || {}).forEach(function (k) {
      var isObj = extra[k] && typeof extra[k] === "object" && !Array.isArray(extra[k]);
      out[k] = isObj && base[k] && typeof base[k] === "object" && !Array.isArray(base[k])
        ? merge(base[k], extra[k]) : extra[k];
    });
    return out;
  }

  function buildConfig() {
    var user = window.HeaderConfig || {};
    var cfg = merge(DEFAULTS, user);
    // kompatibilitas config lama: cart.show === false  ->  tanpa tombol kanan
    if (!(user.rightButton && user.rightButton.mode) && user.cart && user.cart.show === false) cfg.rightButton.mode = "none";
    if (["cart", "hamburger", "none"].indexOf(cfg.rightButton.mode) === -1) cfg.rightButton.mode = "cart";
    return cfg;
  }

  /* ---------- alamat logo & ikon ---------- */
  function baseUrl(cfg) {
    var raw = (cfg && cfg.assetBase) || "";
    try {
      if (raw) return new URL(raw.replace(/\/*$/, "/"), location.href).href;
      if (SCRIPT_SRC) return new URL("./", SCRIPT_SRC).href;
    } catch (e) { /* abaikan */ }
    return "";
  }
  function assetUrl(path, cfg) {
    var p = String(path || "").trim();
    if (!p || /^(javascript|vbscript):/i.test(p)) return "";
    if (/^([a-z][a-z0-9+.-]*:|\/\/|\/|#)/i.test(p)) return p;     // URL penuh / dari root
    var b = baseUrl(cfg);
    try { return b ? new URL(p, b).href : p; } catch (e) { return p; }
  }

  // Ikon = gambar dari config. Kalau kosong / gagal dimuat -> emoji cadangan.
  function iconHtml(path, emoji, cfg) {
    var url = assetUrl(path, cfg);
    if (!url) return "<span class=\"hf-icon-emoji\" aria-hidden=\"true\">" + esc(emoji) + "</span>";
    return "<img class=\"hf-icon\" src=\"" + esc(url) + "\" alt=\"\" aria-hidden=\"true\" data-hf-emoji=\"" + esc(emoji) + "\">";
  }

  /* ---------- halaman aktif ---------- */
  function currentPage() {
    return window.location.pathname.split("/").pop() || "index.html";
  }
  function pageOf(href) {
    return String(href || "").split("#")[0].split("?")[0].split("/").pop() || "index.html";
  }
  function pageWithQuery(href) {
    var h = String(href || "").split("#")[0];
    var q = h.indexOf("?") === -1 ? "" : h.slice(h.indexOf("?"));
    return pageOf(h) + q;
  }

  /* ---------- markup ---------- */
  function dropdownItems(item) {
    var d = item.dropdown;
    return (d && d.show === true && Array.isArray(d.items) && d.items.length) ? d.items : null;
  }

  // external: true -> link dibuka di tab baru
  function extAttr(item) { return item && item.external ? " target=\"_blank\" rel=\"noopener noreferrer\"" : ""; }

  function buildMenu(cfg) {
    var current = currentPage();
    var currentFull = current + (window.location.search || "");
    return (cfg.menu || []).map(function (item, idx) {
      var kids = dropdownItems(item);
      var mk = "header.menu." + idx;
      var pages = [pageOf(item.href)].concat(item.also || []);
      if (kids) kids.forEach(function (k) { pages.push(pageOf(k.href)); });
      var active = pages.indexOf(current) !== -1;
      var link = "<a href=\"" + esc(safeHref(item.href)) + "\"" + extAttr(item) +
        (active ? " class=\"active\" aria-current=\"page\"" : "") + ">" + esc(item.label) + "</a>";

      if (!kids) return "<li data-hf-key=\"" + mk + "\">" + link + "</li>";

      var matches = kids.filter(function (k) { return pageWithQuery(k.href) === currentFull; }).length;
      var sub = kids.map(function (k, ki) {
        var on = matches === 1 && pageWithQuery(k.href) === currentFull;      // tandai hanya bila cocoknya unik
        return "<li data-hf-key=\"" + mk + ".dropdown.items." + ki + "\"><a href=\"" + esc(safeHref(k.href)) + "\"" + extAttr(k) + (on ? " class=\"active\"" : "") + ">" + esc(k.label) + "</a></li>";
      }).join("");
      return "<li class=\"hf-has-dd\" data-hf-key=\"" + mk + "\">" +
        "<div class=\"hf-nav-item\">" + link +
          "<button type=\"button\" class=\"hf-dd-toggle\" aria-expanded=\"false\" aria-label=\"Submenu " + esc(item.label) + "\"></button></div>" +
        "<ul class=\"hf-dd\">" + sub + "</ul></li>";
    }).join("");
  }

  function buildBrand(cfg) {
    var b = cfg.brand;
    var url = assetUrl(b.logoUrl, cfg);
    var accent = b.accent ? "<span>" + esc(b.accent) + "</span>" : "";
    var inner = url
      ? "<img class=\"hf-brand-logo\" src=\"" + esc(url) + "\" alt=\"" + esc(String(b.main || "") + String(b.accent || "")) + "\" data-hf-logo>"
      : esc(b.main) + accent;
    return "<a class=\"hf-brand\" data-hf-key=\"header.brand\" href=\"" + esc(safeHref(b.href)) + "\"" +
      " data-hf-main=\"" + esc(b.main) + "\" data-hf-accent=\"" + esc(b.accent) + "\">" + inner + "</a>";
  }

  function buildSearch(cfg) {
    var s = cfg.search;
    if (!s || s.show === false) return "";
    return (
      "<form class=\"hf-nav-search\" data-hf-key=\"header.search\" action=\"" + esc(safeHref(s.action)) + "\" method=\"GET\" role=\"search\">" +
        "<button type=\"submit\" class=\"hf-nav-search-icon\" aria-label=\"" + esc(s.label) + "\">" + iconHtml(s.icon, s.emoji, cfg) + "</button>" +
        "<input type=\"text\" name=\"search\" placeholder=\"" + esc(s.placeholder) + "\" aria-label=\"" + esc(s.label) + "\">" +
      "</form>"
    );
  }

  function buildCart(cfg) {
    if (cfg.rightButton.mode !== "cart") return "";
    var c = cfg.cart;
    return (
      "<a class=\"hf-icon-btn\" data-hf-key=\"header.cart\" href=\"" + esc(safeHref(c.href)) + "\" aria-label=\"" + esc(c.label) + "\">" +
        iconHtml(c.icon, c.emoji, cfg) + "<span class=\"hf-cart-count\">0</span></a>"
    );
  }

  function buildMarkup(cfg) {
    return (
      "<nav class=\"hf-nav-wrap\">" +
        buildBrand(cfg) +
        "<ul class=\"hf-nav-menu\" id=\"hfNavMenu\">" + buildMenu(cfg) + "</ul>" +
        "<div class=\"hf-nav-actions\">" +
          buildSearch(cfg) + buildCart(cfg) +
          "<button class=\"hf-nav-toggle\" data-hf-key=\"header.rightButton\" id=\"hfNavToggle\" aria-label=\"" + esc(cfg.toggleLabel) + "\" aria-expanded=\"false\" aria-controls=\"hfNavMenu\"><span></span></button>" +
        "</div>" +
        // mode hamburger: panel berisi menu yang sama, terbuka dari tombol hamburger (menu bar tetap tampil di desktop)
        (cfg.rightButton.mode === "hamburger" ? "<ul class=\"hf-ham-menu\" id=\"hfHamMenu\">" + buildMenu(cfg) + "</ul>" : "") +
      "</nav>"
    );
  }

  /* ---------- gambar gagal dimuat -> cadangan ---------- */
  function attachFallbacks(el) {
    Array.prototype.forEach.call(el.querySelectorAll("img.hf-icon"), function (img) {
      function fail() {
        var s = document.createElement("span");
        s.className = "hf-icon-emoji"; s.setAttribute("aria-hidden", "true");
        s.textContent = img.getAttribute("data-hf-emoji") || "";
        if (img.parentNode) img.parentNode.replaceChild(s, img);
      }
      img.addEventListener("error", fail);
      if (img.complete && img.naturalWidth === 0) fail();
    });
    var logo = el.querySelector("img[data-hf-logo]");
    if (logo) {
      var toText = function () {
        var a = logo.parentNode; if (!a) return;
        a.textContent = a.getAttribute("data-hf-main") || "";
        var acc = a.getAttribute("data-hf-accent");
        if (acc) { var sp = document.createElement("span"); sp.textContent = acc; a.appendChild(sp); }
      };
      logo.addEventListener("error", toText);
      if (logo.complete && logo.naturalWidth === 0) toText();
    }
  }

  /* ---------- buka / tutup menu ---------- */
  var headers = [];                       // semua header yang sedang aktif
  var mq = window.matchMedia ? window.matchMedia(MOBILE_QUERY) : null;

  function closeDropdowns(el, except) {
    Array.prototype.forEach.call(el.querySelectorAll(".hf-has-dd.open"), function (li) {
      if (li === except) return;
      li.classList.remove("open");
      var b = li.querySelector(".hf-dd-toggle"); if (b) b.setAttribute("aria-expanded", "false");
    });
  }
  function closeAll(el) {
    closeDropdowns(el, null);
    var toggle = el.querySelector("#hfNavToggle");
    Array.prototype.forEach.call(el.querySelectorAll(".hf-nav-menu, .hf-ham-menu"), function (m) { m.classList.remove("open"); });
    if (toggle) { toggle.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
  }
  function applyCompact(el) {
    var compact = !!(mq && mq.matches);                       // < 960px: menu jadi laci
    if (el.classList.contains("hf-compact") !== compact) closeAll(el);
    el.classList.toggle("hf-compact", compact);
  }

  function bind(el) {
    if (el.__hfBound) return;
    el.__hfBound = true;
    el.addEventListener("click", function (e) {
      var t = e.target;
      var tg = t.closest ? t.closest("#hfNavToggle") : null;
      if (tg) {
        // layar kecil: laci = menu utama. Desktop + mode hamburger: panel hamburger.
        var menu = (el.classList.contains("hf-compact") ? null : el.querySelector("#hfHamMenu")) || el.querySelector("#hfNavMenu");
        var open = !menu.classList.contains("open");
        closeDropdowns(el, null);
        menu.classList.toggle("open", open);
        tg.classList.toggle("open", open);
        tg.setAttribute("aria-expanded", String(open));
        return;
      }
      var dd = t.closest ? t.closest(".hf-dd-toggle") : null;
      if (dd) {
        var li = dd.closest(".hf-has-dd");
        var willOpen = !li.classList.contains("open");
        closeDropdowns(el, li);
        li.classList.toggle("open", willOpen);
        dd.setAttribute("aria-expanded", String(willOpen));
        return;
      }
      if (t.closest && t.closest(".hf-nav-menu a, .hf-ham-menu a")) closeAll(el);     // pilih link -> menu menutup
    });
  }

  var globalsBound = false;
  function bindGlobals() {
    if (globalsBound) return;
    globalsBound = true;
    document.addEventListener("click", function (e) {
      headers.forEach(function (h) { if (!h.contains(e.target)) closeAll(h); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      headers.forEach(function (h) {
        var tg = h.querySelector("#hfNavToggle");
        var ae = document.activeElement;
        var inDd = !!(ae && h.contains(ae) && ae.closest && ae.closest(".hf-has-dd"));
        var wasOpen = !!h.querySelector(".hf-nav-menu.open, .hf-ham-menu.open, .hf-has-dd.open");
        closeAll(h);
        if (inDd) ae.blur();                                        // fokus keyboard keluar -> dropdown tertutup
        else if (wasOpen && tg && tg.offsetParent !== null) tg.focus();
      });
    });
    window.addEventListener("load", function () {           // CSS situs yang telat dimuat -> cek ulang warna halaman
      headers.forEach(function (h) { if (h.__hfCfg) applyStyle(h, h.__hfCfg); });
    });
    if (mq) {
      var onChange = function () { headers.forEach(applyCompact); };
      if (mq.addEventListener) mq.addEventListener("change", onChange); else if (mq.addListener) mq.addListener(onChange);
    }
  }

  // Nonaktifkan semua link: href dicabut, jadi tidak bisa diklik / dibuka di tab baru.
  function disableLinks(el) {
    Array.prototype.forEach.call(el.querySelectorAll("a[href]"), function (a) {
      a.setAttribute("data-hf-href", a.getAttribute("href"));
      a.removeAttribute("href");
      a.setAttribute("aria-disabled", "true");
      a.setAttribute("role", "link");
    });
  }

  /* ---------- latar header: solid hitam di halaman terang, kaca di halaman gelap ---------- */
  function parseRgb(str) {
    var s = String(str || "").trim(), m = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (m) {
      var x = m[1].length === 3 ? m[1].replace(/./g, "$&$&") : m[1];
      return [parseInt(x.slice(0, 2), 16), parseInt(x.slice(2, 4), 16), parseInt(x.slice(4, 6), 16)];
    }
    m = s.match(/^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
    return m ? [+m[1], +m[2], +m[3]] : null;
  }
  // Warna latar halaman: cari background pertama yang tidak transparan dari <body> ke atas.
  function pageIsLight() {
    var node = document.body;
    while (node) {
      var m = window.getComputedStyle(node).backgroundColor.match(/rgba?\(([^)]+)\)/);
      if (m) {
        var p = m[1].split(/[,\s\/]+/).filter(Boolean).map(parseFloat);
        if ((p.length > 3 ? p[3] : 1) > 0.05) return (0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]) / 255 > 0.6;
      }
      node = node.parentElement;
    }
    return true;                                         // tidak ada warna = putih bawaan browser
  }
  function applyStyle(el, cfg) {
    var st = cfg.style || {}, mode = st.mode;
    var solid = mode === "solid" || (mode !== "glass" && pageIsLight());
    el.setAttribute("data-hf-style", solid ? "solid" : "glass");
    var rgb = parseRgb(st.background);
    if (st.background) el.style.setProperty("--hf-nav-solid", st.background); else el.style.removeProperty("--hf-nav-solid");
    if (rgb) el.style.setProperty("--hf-nav-glass", "rgba(" + rgb.join(",") + ",0.78)"); else el.style.removeProperty("--hf-nav-glass");
  }

  /* ---------- render ---------- */
  function render(target) {
    var el = typeof target === "string" ? document.querySelector(target) : target;
    if (!el) return null;
    var cfg = buildConfig();
    el.classList.add("hf-nav");
    el.classList.toggle("hf-ham", cfg.rightButton.mode === "hamburger");
    el.style.setProperty("--hf-icon-size", cfg.iconSize || "20px");
    el.style.setProperty("--hf-logo-h", cfg.brand.logoHeight || "32px");
    el.innerHTML = buildMarkup(cfg);
    el.__hfCfg = cfg;
    applyStyle(el, cfg);
    el.classList.toggle("hf-links-off", cfg.disableLinks === true);
    if (cfg.disableLinks === true) disableLinks(el);
    attachFallbacks(el);
    bind(el);
    if (headers.indexOf(el) === -1) headers.push(el);
    bindGlobals();
    applyCompact(el);
    return el;
  }

  // Render sekarang juga (script ini ada tepat setelah placeholder-nya),
  // supaya header sudah ada di DOM sebelum js/app.js berjalan.
  Array.prototype.forEach.call(document.querySelectorAll("[data-site-header]"), render);

  window.Header = { render: render };
})();


/* ################ BAGIAN 2 — FOOTER ################ */
/**
 * FOOTER TEMPLATE — footer.js
 * =====================================================================
 * Merender footer dari window.FooterConfig (lihat footer-config.js).
 * File ini umumnya TIDAK perlu diubah.
 *
 * Yang dilakukan file ini secara otomatis (website tidak perlu menambah apa pun):
 *   - memuat footer.css sendiri (lengkap dengan font Inter)
 *   - mengubah path gambar relatif (logo, ikon) agar menunjuk ke folder footer
 *   - membuat ikon PNG otomatis putih (latar gelap) / hitam (latar terang)
 *   - menerjemahkan teks footer + dropdown bahasa yang berfungsi
 *
 * Pemakaian paling sederhana:
 *   <footer data-site-footer></footer>
 *   <script src="js/footer-config.js"></script>
 *   <script src="js/footer.js"></script>
 *
 * API (opsional):
 *   Footer.render(elementOrSelector, config)  -> render manual
 *   Footer.update(partialConfig)              -> ubah sebagian setting lalu render ulang
 *   Footer.getConfig()                        -> config aktif (sudah di-merge)
 *   Footer.setLanguage("en")                  -> ganti bahasa lewat kode
 *   Footer.getLanguage()                      -> kode bahasa aktif
 *
 * Event (opsional, untuk website yang ingin ikut berganti bahasa):
 *   window.addEventListener("footer:languagechange", e => console.log(e.detail.lang));
 * =====================================================================
 */
(function (global) {
  "use strict";

  /* =================================================================
     1. DEFAULT AMAN (dipakai bila config tidak lengkap)
     ================================================================= */
  var DEFAULTS = {
    brand: { logoUrl: "", logoUrlLight: "", logoHeight: "", textMain: "BRAND", textAccent: "", href: "/", description: "" },
    social: { show: true, shape: "circle", size: "44px", label: "Media sosial", items: [] },
    icons: {},
    iconColor: "auto",
    assetBase: "",
    autoCss: true,
    columns: [],
    language: { show: true, default: "", remember: true, autoDetect: false, list: [] },
    texts: {},
    bottom: { copyright: "© {year} Nama Brand.", note: "" },
    layout: {
      maxWidth: "1240px",
      brandWeight: "1.4fr",
      iconSize: "20px",
      mobileColumns: 1,
      mobileAlign: "left",
      showBrand: true,
      showBottomBar: true
    },
    theme: { mode: "dark", background: "", text: "", muted: "", faint: "", border: "", accent: "" }
  };

  var LANG_STORAGE_KEY = "ft_lang";
  var activeConfig = null;
  var mountedNodes = [];
  var currentLang = null;

  // Lokasi file ini -> dipakai untuk mencari folder footer (css, assets)
  var SCRIPT_SRC = (function () {
    var s = document.currentScript;
    if (!s || !s.src) {
      var all = document.getElementsByTagName("script");
      for (var i = all.length - 1; i >= 0; i--) {
        if (/headerfooter\.js(\?|#|$)/i.test(all[i].src || "")) { s = all[i]; break; }
      }
    }
    return s && s.src ? s.src : "";
  })();

  /* =================================================================
     2. UTIL
     ================================================================= */
  function isPlainObject(v) {
    return v && typeof v === "object" && !Array.isArray(v);
  }

  // Gabung objek secara dalam. Array TIDAK digabung (diganti utuh).
  function deepMerge(base, extra) {
    var out = {};
    Object.keys(base).forEach(function (k) {
      out[k] = isPlainObject(base[k]) ? deepMerge(base[k], {}) : base[k];
    });
    Object.keys(extra || {}).forEach(function (k) {
      if (isPlainObject(extra[k]) && isPlainObject(out[k])) out[k] = deepMerge(out[k], extra[k]);
      else out[k] = extra[k];
    });
    return out;
  }

  function esc(value) {
    return String(value === undefined || value === null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Hanya izinkan protokol aman pada link (tolak "javascript:" dsb).
  function safeHref(href) {
    var h = String(href || "").trim();
    if (!h) return "#";
    if (/^(https?:|mailto:|tel:|#|\/|\.\.?\/)/i.test(h)) return h;
    if (/^[a-z][a-z0-9+.-]*:/i.test(h)) return "#";   // protokol asing -> tolak
    return h;                                           // path relatif biasa, mis. "services.html"
  }

  function isImageValue(v) {
    var s = String(v || "").trim();
    return /^(https?:\/\/|\/|\.\.?\/|assets\/|data:image)/i.test(s) ||
           /\.(png|jpe?g|gif|svg|webp|ico)(\?.*)?$/i.test(s);
  }

  function fillYear(text) {
    return String(text || "").replace(/\{year\}/gi, String(new Date().getFullYear()));
  }

  /* =================================================================
     3. LOKASI ASET (logo, ikon, css)
     Path relatif dihitung dari folder headerfooter (tempat file ini berada),
     jadi footer tetap benar di website mana pun.
     Bisa diganti manual lewat config: assetBase: "https://situs/footer/"
     ================================================================= */
  function baseUrl(cfg) {
    var raw = (cfg && cfg.assetBase) || "";
    try {
      if (raw) {
        var u = new URL(raw, document.baseURI).href;
        return u.charAt(u.length - 1) === "/" ? u : u + "/";
      }
      if (SCRIPT_SRC) return new URL("./", SCRIPT_SRC).href;
    } catch (e) { /* abaikan */ }
    return document.baseURI;
  }

  function assetUrl(path, cfg) {
    var s = String(path || "").trim();
    if (!s) return "";
    if (/^(https?:)?\/\//i.test(s) || /^(data|blob):/i.test(s) || s.charAt(0) === "/") return s;
    try { return new URL(s, baseUrl(cfg)).href; } catch (e) { return s; }
  }

  /* =================================================================
     4. CSS OTOMATIS
     headerfooter.css dimuat sendiri (kalau belum ada <link>-nya di halaman); footer disembunyikan sebentar sampai CSS
     siap supaya tidak "berkedip" tampil tanpa gaya.
     ================================================================= */
  var cssState = "idle";   // idle | loading | ready
  var cssWaiters = [];

  function ensureCss(cfg, done) {
    if (cssState === "ready") { done(); return; }
    cssWaiters.push(done);
    if (cssState === "loading") return;
    cssState = "loading";

    function finish() {
      if (cssState === "ready") return;
      cssState = "ready";
      cssWaiters.splice(0).forEach(function (fn) { fn(); });
    }

    var link = document.querySelector("link[data-ft-css], link[href*=\"headerfooter.css\"]");
    if (!link) {
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = new URL("headerfooter.css", baseUrl(cfg)).href;
      link.setAttribute("data-ft-css", "");
      document.head.appendChild(link);
    } else if (link.sheet) {
      finish();
      return;
    }
    link.addEventListener("load", finish);
    link.addEventListener("error", finish);
    setTimeout(finish, 3000);   // jaring pengaman
  }

  /* =================================================================
     5. WARNA IKON & LOGO OTOMATIS (ikut warna latar footer)
     ================================================================= */
  // Ubah warna CSS apa pun (hex, rgb, nama warna) menjadi [r,g,b], atau null.
  function parseColor(c) {
    if (!c || !document.body) return null;
    var probe = document.createElement("span");
    probe.style.color = "";
    probe.style.color = c;
    if (!probe.style.color) return null;           // warna tidak valid
    probe.style.display = "none";
    document.body.appendChild(probe);
    var rgb = getComputedStyle(probe).color;
    document.body.removeChild(probe);
    var m = String(rgb).match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    var p = m[1].split(/[\s,\/]+/).filter(Boolean).map(parseFloat);
    if (p.length > 3 && p[3] < 0.5) return null;   // hampir transparan -> tidak dipakai
    return p.slice(0, 3);
  }

  function luminance(rgb) {
    function lin(v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }
    return 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
  }

  // true bila latar footer terang
  function isLightBackground(cfg) {
    var rgb = parseColor(cfg.theme.background);
    if (rgb) return luminance(rgb) > 0.179;        // titik tengah kontras hitam vs putih
    return cfg.theme.mode === "light";
  }

  // white | black | original
  function iconTone(cfg) {
    var c = String(cfg.iconColor || "auto").toLowerCase();
    if (c === "white" || c === "black" || c === "original") return c;
    return isLightBackground(cfg) ? "black" : "white";
  }

  /* =================================================================
     6. BAHASA
     ================================================================= */
  function langList(cfg) {
    return (cfg.language && Array.isArray(cfg.language.list)) ? cfg.language.list : [];
  }
  function hasLang(cfg, code) {
    return langList(cfg).some(function (l) { return l.code === code; });
  }
  function defaultLang(cfg) {
    var d = cfg.language && cfg.language.default;
    if (d && hasLang(cfg, d)) return d;
    var list = langList(cfg);
    return list.length ? list[0].code : (d || "");
  }

  function pickInitialLang(cfg) {
    var L = cfg.language || {};
    if (L.remember !== false) {
      try {
        var saved = localStorage.getItem(LANG_STORAGE_KEY);
        if (saved && hasLang(cfg, saved)) return saved;
      } catch (e) { /* abaikan */ }
    }
    if (L.autoDetect) {
      var nav = String(navigator.language || "").toLowerCase().split("-")[0];
      if (nav && hasLang(cfg, nav)) return nav;
    }
    return defaultLang(cfg);
  }

  // Terjemahkan sebuah nilai:
  //   "@kunci"            -> ambil dari texts[bahasa aktif][kunci]
  //   { id:"..", en:".." } -> pilih sesuai bahasa aktif
  //   "teks biasa"        -> dipakai apa adanya
  function tr(cfg, value) {
    var T = cfg.texts || {};
    var fallbackLang = defaultLang(cfg);

    if (isPlainObject(value)) {
      if (value[currentLang] != null) return value[currentLang];
      if (value[fallbackLang] != null) return value[fallbackLang];
      var first = Object.keys(value)[0];
      return first ? value[first] : "";
    }

    var s = String(value == null ? "" : value);
    if (s.charAt(0) !== "@") return s;

    var key = s.slice(1);
    if (T[currentLang] && T[currentLang][key] != null) return T[currentLang][key];
    if (T[fallbackLang] && T[fallbackLang][key] != null) return T[fallbackLang][key];
    return key;   // kunci tidak ditemukan -> tampilkan nama kuncinya agar mudah dilacak
  }

  /* =================================================================
     7. BUILDER MARKUP
     ================================================================= */
  /* Ikon sosial media bawaan (SVG garis minimalis, warna mengikuti teks).
     Dipakai kalau item sosmed tidak punya file ikon sendiri. */
  var SOCIAL_SVG = {
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".7" fill="currentColor" stroke="none"/>',
    whatsapp:  '<path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>',
    tiktok:    '<path d="M21 7.917v4.034a9.948 9.948 0 0 1-5-1.951v4.5a6.5 6.5 0 1 1-8-6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z"/>',
    email:     '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7.5L12 13l8.5-5.5"/>',
    website:   '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18"/>',
    facebook:  '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    youtube:   '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><path d="M9.75 15.02l5.75-3.27-5.75-3.27z"/>',
    x:         '<path d="M4 4l11.733 16h4.267l-11.733-16z"/><path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772"/>',
    linkedin:  '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    telegram:  '<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>'
  };

  function socialIcon(it, cfg) {
    if (it.icon) {
      var url = assetUrl(it.icon, cfg);
      if (url) return '<img class="ft-social-img" src="' + esc(url) + '" alt="" loading="lazy" decoding="async" data-name="' + esc(it.name || "") + '">';
    }
    return socialSvg(it.name);
  }
  function socialSvg(name) {
    var body = SOCIAL_SVG[String(name || "").toLowerCase()] || SOCIAL_SVG.website;
    return '<svg class="ft-social-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + body + "</svg>";
  }

  // Baris ikon sosmed (tanpa teks). Tiap item: show = tampil/sembunyi, link = bisa diklik/tidak.
  function buildSocial(cfg) {
    var s = cfg.social || {};
    if (s.show === false || !Array.isArray(s.items)) return "";
    var html = "";
    s.items.forEach(function (it, i) {
      if (!it || it.show === false) return;
      var label = tr(cfg, it.label) || it.name || "";
      var key = ' data-hf-key="footer.social.items.' + i + '"';
      var icon = socialIcon(it, cfg);
      if (it.link !== false && it.href) {
        var ext = /^https?:/i.test(it.href) ? ' target="_blank" rel="noopener noreferrer"' : "";
        html += "<li" + key + '><a class="ft-social-link" href="' + esc(safeHref(it.href)) + '"' + ext +
          ' aria-label="' + esc(label) + '" title="' + esc(label) + '">' + icon + "</a></li>";
      } else {
        html += "<li" + key + '><span class="ft-social-link is-static" role="img" aria-label="' + esc(label) +
          '" title="' + esc(label) + '">' + icon + "</span></li>";
      }
    });
    return html ? '<ul class="ft-social" aria-label="' + esc(s.label || "") + '">' + html + "</ul>" : "";
  }

  function renderIcon(icon, cfg) {
    if (!icon) return "";
    var ref = (cfg.icons && cfg.icons[icon]) ? cfg.icons[icon] : icon;   // nama ikon -> path
    var inner = isImageValue(ref)
      ? '<img class="ft-icon-img" src="' + esc(assetUrl(ref, cfg)) + '" alt="" loading="lazy" decoding="async">'
      : esc(ref);                                                          // emoji / teks
    return '<span class="ft-icon" aria-hidden="true">' + inner + "</span>";
  }

  function buildBrand(cfg, light) {
    var b = cfg.brand;
    var label = (b.textMain || "") + (b.textAccent || "");
    var logo = (light && b.logoUrlLight) ? b.logoUrlLight : b.logoUrl;
    var textBrand = esc(b.textMain) + (b.textAccent ? '<span class="ft-brand-accent">' + esc(b.textAccent) + "</span>" : "");
    var content = logo
      ? '<img class="ft-brand-logo" src="' + esc(assetUrl(logo, cfg)) + '" alt="' + esc(label || "Logo") + '" data-ft-logo>'
      : textBrand;
    var desc = tr(cfg, b.description);

    return (
      '<div class="ft-brand">' +
        '<a class="ft-brand-link" data-hf-key="footer.brand" href="' + esc(safeHref(b.href)) + '">' + content + "</a>" +
        (desc ? '<p class="ft-brand-text" data-hf-key="footer.brand.description">' + esc(desc) + "</p>" : "") +
        buildSocial(cfg) +
      "</div>"
    );
  }

  function buildColumn(cfg, col, ci) {
    var ck = "footer.columns." + ci;
    var titleText = tr(cfg, col.title);
    var title = titleText ? '<h4 class="ft-col-title">' + esc(titleText) + "</h4>" : "";
    var items = "";

    (col.links || []).forEach(function (link, li) {
      var external = link.external ? ' target="_blank" rel="noopener noreferrer"' : "";
      items +=
        '<li data-hf-key="' + ck + ".links." + li + '">' + renderIcon(link.icon, cfg) +
        '<a href="' + esc(safeHref(link.href)) + '"' + external + ">" + esc(tr(cfg, link.label)) + "</a></li>";
    });

    (col.lines || []).forEach(function (line, li) {
      items += '<li data-hf-key="' + ck + ".lines." + li + '">' + esc(tr(cfg, line)) + "</li>";
    });

    var tag = (col.links && col.links.length) ? "nav" : "div";
    var aria = tag === "nav" && titleText ? ' aria-label="' + esc(titleText) + '"' : "";
    return "<" + tag + ' class="ft-col" data-hf-key="' + ck + '"' + aria + ">" + title + '<ul class="ft-list">' + items + "</ul></" + tag + ">";
  }

  function langLabel(l) {
    return (l.flag ? l.flag + " | " : "") + (l.name || l.code);
  }

  // Dropdown bahasa buatan sendiri (bukan <select> bawaan browser), supaya
  // warna daftar pilihan selalu mengikuti tema footer — tidak lagi putih di atas putih.
  function buildLanguageMenu(cfg) {
    var L = cfg.language || {};
    var list = langList(cfg);
    if (L.show === false || list.length < 2) return "";

    var label = tr(cfg, "@language");
    var current = list.filter(function (l) { return l.code === currentLang; })[0] || list[0];
    var options = list.map(function (l) {
      var selected = l.code === current.code;
      return '<li class="ft-lang-opt" role="option" tabindex="-1" data-code="' + esc(l.code) + '"' +
        ' aria-selected="' + (selected ? "true" : "false") + '">' + esc(langLabel(l)) + "</li>";
    }).join("");

    return (
      '<div class="ft-lang" data-ft-lang data-dir="up" data-hf-key="footer.language">' +
        '<button type="button" class="ft-lang-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="' + esc(label) + '">' +
          '<span class="ft-lang-current">' + esc(langLabel(current)) + "</span>" +
          '<span class="ft-lang-caret" aria-hidden="true"></span>' +
        "</button>" +
        '<ul class="ft-lang-list" role="listbox" aria-label="' + esc(label) + '" hidden>' + options + "</ul>" +
      "</div>"
    );
  }

  function buildBottom(cfg) {
    var b = cfg.bottom || {};
    var copy = b.copyright ? fillYear(tr(cfg, b.copyright)) : "";
    var note = b.note ? fillYear(tr(cfg, b.note)) : "";
    var menu = buildLanguageMenu(cfg);
    if (!copy && !note && !menu) return "";

    var end = (note ? "<span>" + esc(note) + "</span>" : "") + menu;
    return (
      '<div class="ft-wrap"><div class="ft-bottom">' +
        (copy ? '<span class="ft-copy" data-hf-key="footer.bottom">' + esc(copy) + "</span>" : "") +
        (end ? '<div class="ft-bottom-end">' + end + "</div>" : "") +
      "</div></div>"
    );
  }

  function buildMarkup(cfg, light) {
    var columns = (cfg.columns || []).map(function (c, i) { return buildColumn(cfg, c, i); }).join("");
    return (
      '<div class="ft-wrap">' +
        '<div class="ft-grid">' + buildBrand(cfg, light) + columns + "</div>" +
      "</div>" +
      buildBottom(cfg)
    );
  }

  /* =================================================================
     8. TERAPKAN SETTING KE ELEMEN <footer>
     ================================================================= */
  function applySettings(el, cfg, tone) {
    var l = cfg.layout, t = cfg.theme;

    el.classList.add("site-footer");
    el.setAttribute("data-footer-theme", t.mode === "light" ? "light" : "dark");
    el.setAttribute("data-icon-tone", tone);
    el.setAttribute("data-mobile-columns", String(Number(l.mobileColumns) === 2 ? 2 : 1));
    el.setAttribute("data-mobile-align", l.mobileAlign === "center" ? "center" : "left");
    el.setAttribute("data-hide-brand", l.showBrand === false ? "true" : "false");
    el.setAttribute("data-hide-bottom", l.showBottomBar === false ? "true" : "false");
    var shape = (cfg.social && cfg.social.shape) || "circle";
    el.setAttribute("data-social-shape", ["circle", "rounded", "plain"].indexOf(shape) === -1 ? "circle" : shape);
    if (currentLang) el.setAttribute("lang", currentLang);

    var vars = {
      "--ft-max": l.maxWidth,
      "--ft-brand-weight": l.brandWeight,
      "--ft-cols": Math.max(1, (cfg.columns || []).length),
      "--ft-logo-height": cfg.brand.logoHeight,
      "--ft-icon-size": l.iconSize,
      "--ft-social-size": cfg.social && cfg.social.size,
      "--ft-bg": t.background,
      "--ft-text": t.text,
      "--ft-muted": t.muted,
      "--ft-faint": t.faint,
      "--ft-border": t.border,
      "--ft-accent": t.accent
    };
    Object.keys(vars).forEach(function (name) {
      var val = vars[name];
      if (val === "" || val === undefined || val === null) el.style.removeProperty(name);
      else el.style.setProperty(name, val);
    });
  }

  // Kalau gambar logo gagal dimuat -> kembali ke tulisan. Ikon gagal -> disembunyikan.
  function attachImageFallbacks(el, cfg) {
    var logo = el.querySelector("img[data-ft-logo]");
    if (logo) {
      logo.addEventListener("error", function () {
        var b = cfg.brand;
        logo.parentNode.innerHTML = esc(b.textMain) + (b.textAccent ? '<span class="ft-brand-accent">' + esc(b.textAccent) + "</span>" : "");
      }, { once: true });
    }
    Array.prototype.forEach.call(el.querySelectorAll("img.ft-social-img"), function (img) {
      img.addEventListener("error", function () {
        if (img.parentNode) img.outerHTML = socialSvg(img.getAttribute("data-name"));
      }, { once: true });
    });
    Array.prototype.forEach.call(el.querySelectorAll("img.ft-icon-img"), function (img) {
      img.addEventListener("error", function () {
        if (img.parentNode) img.parentNode.style.display = "none";
      }, { once: true });
    });
  }

  function closeLangMenus(except) {
    Array.prototype.forEach.call(document.querySelectorAll("[data-ft-lang]"), function (box) {
      if (box === except) return;
      var btn = box.querySelector(".ft-lang-btn");
      var listEl = box.querySelector(".ft-lang-list");
      if (listEl) listEl.hidden = true;
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }

  // Klik di luar dropdown / tekan Esc menutup menu bahasa (dipasang sekali saja).
  var langGlobalBound = false;
  function bindLangGlobals() {
    if (langGlobalBound) return;
    langGlobalBound = true;
    document.addEventListener("click", function (e) {
      var box = e.target && e.target.closest ? e.target.closest("[data-ft-lang]") : null;
      closeLangMenus(box);
    });
    window.addEventListener("resize", function () { closeLangMenus(null); });
  }

  function attachLanguageMenu(el) {
    var box = el.querySelector("[data-ft-lang]");
    if (!box) return;
    bindLangGlobals();

    var btn = box.querySelector(".ft-lang-btn");
    var listEl = box.querySelector(".ft-lang-list");
    var opts = Array.prototype.slice.call(listEl.querySelectorAll(".ft-lang-opt"));

    function isOpen() { return !listEl.hidden; }

    function close(refocus) {
      listEl.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      if (refocus) btn.focus();
    }

    function open() {
      closeLangMenus(box);
      listEl.hidden = false;
      btn.setAttribute("aria-expanded", "true");

      // buka ke atas (bawaan, karena footer ada di dasar halaman); kalau tidak muat, buka ke bawah
      var r = btn.getBoundingClientRect();
      var need = listEl.offsetHeight + 12;
      var above = r.top, below = window.innerHeight - r.bottom;
      box.setAttribute("data-dir", (above >= need || above >= below) ? "up" : "down");

      var sel = opts.filter(function (o) { return o.getAttribute("aria-selected") === "true"; })[0] || opts[0];
      if (sel) sel.focus();
    }

    function choose(opt) {
      var code = opt && opt.getAttribute("data-code");
      if (!code) return;
      if (code === currentLang) { close(true); return; }
      setLanguage(code, { from: el });
    }

    function move(delta) {
      var i = opts.indexOf(document.activeElement);
      var next = i === -1 ? 0 : Math.min(opts.length - 1, Math.max(0, i + delta));
      opts[next].focus();
    }

    btn.addEventListener("click", function () { isOpen() ? close(false) : open(); });
    btn.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); open(); }
    });

    listEl.addEventListener("click", function (e) {
      var opt = e.target.closest ? e.target.closest(".ft-lang-opt") : null;
      if (opt) choose(opt);
    });
    listEl.addEventListener("keydown", function (e) {
      var opt = e.target.closest ? e.target.closest(".ft-lang-opt") : null;
      switch (e.key) {
        case "ArrowDown": e.preventDefault(); move(1); break;
        case "ArrowUp":   e.preventDefault(); move(-1); break;
        case "Home":      e.preventDefault(); opts[0].focus(); break;
        case "End":       e.preventDefault(); opts[opts.length - 1].focus(); break;
        case "Enter":
        case " ":         e.preventDefault(); choose(opt); break;
        case "Escape":    e.preventDefault(); close(true); break;
        case "Tab":       close(false); break;
      }
    });
  }

  /* =================================================================
     9. API PUBLIK
     ================================================================= */
  function resolveElement(target) {
    if (!target) return null;
    return typeof target === "string" ? document.querySelector(target) : target;
  }

  function render(target, config) {
    var el = resolveElement(target);
    if (!el) return null;

    var cfg = deepMerge(DEFAULTS, config || global.FooterConfig || {});
    activeConfig = cfg;
    if (currentLang === null || (langList(cfg).length && !hasLang(cfg, currentLang))) {
      currentLang = pickInitialLang(cfg);
    }

    var light = isLightBackground(cfg);
    var tone = iconTone(cfg);

    if (cfg.autoCss !== false) {
      if (cssState !== "ready") el.style.visibility = "hidden";
      ensureCss(cfg, function () { el.style.visibility = ""; });
    }

    applySettings(el, cfg, tone);
    el.innerHTML = buildMarkup(cfg, light);
    attachImageFallbacks(el, cfg);
    attachLanguageMenu(el);

    if (mountedNodes.indexOf(el) === -1) mountedNodes.push(el);
    return el;
  }

  function update(partial) {
    var next = deepMerge(activeConfig || DEFAULTS, partial || {});
    mountedNodes.forEach(function (el) { render(el, next); });
    return next;
  }

  function getConfig() {
    return activeConfig ? deepMerge(activeConfig, {}) : deepMerge(DEFAULTS, global.FooterConfig || {});
  }

  function setLanguage(code, opts) {
    var cfg = activeConfig || deepMerge(DEFAULTS, global.FooterConfig || {});
    if (!hasLang(cfg, code)) return false;

    currentLang = code;
    if (cfg.language.remember !== false) {
      try { localStorage.setItem(LANG_STORAGE_KEY, code); } catch (e) { /* abaikan */ }
    }

    mountedNodes.forEach(function (el) { render(el, cfg); });

    // kembalikan fokus ke dropdown setelah footer digambar ulang
    var from = opts && opts.from;
    if (from) {
      var sel = from.querySelector(".ft-lang-btn");
      if (sel) sel.focus();
    }

    try {
      global.dispatchEvent(new CustomEvent("footer:languagechange", { detail: { lang: code } }));
    } catch (e) { /* browser lama */ }
    return true;
  }

  function getLanguage() {
    return currentLang;
  }

  function autoInit() {
    var nodes = document.querySelectorAll("[data-site-footer]");
    Array.prototype.forEach.call(nodes, function (el) { render(el); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", autoInit);
  else autoInit();

  global.Footer = {
    render: render,
    update: update,
    getConfig: getConfig,
    setLanguage: setLanguage,
    getLanguage: getLanguage
  };
})(window);
