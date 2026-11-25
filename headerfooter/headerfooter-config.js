/**
 * HEADER + FOOTER — headerfooter-config.js
 * File ini dihasilkan oleh demo.html. Cara termudah mengubahnya: buka demo.html,
 * atur sampai pas, lalu unduh ulang file ini dan timpa yang lama. (Boleh juga diedit manual.)
 *
 * Pasang di halaman:
 *   <link rel="stylesheet" href="components/headerfooter/headerfooter.css">
 *   <header data-site-header></header>
 *   <script src="components/headerfooter/headerfooter-config.js"></script>
 *   <script src="components/headerfooter/headerfooter.js"></script>
 *   ...
 *   <footer data-site-footer></footer>
 */

/* ===== HEADER ===== */
window.HeaderConfig = {
  brand: {
    logoUrl: "assets/logo/fixs arts.gif",
    logoHeight: "42px",
    main: "FIXS",
    accent: ".ARTS",
    href: "index.html"
  },
  menu: [
    { label: "Home", href: "index.html" },
    { label: "Store", href: "https://tr.ee/fixs-store" },
    {
      label: "Layanan",
      href: "#services.html",
      also: ["service-detail.html"],
      dropdown: {
        show: true,
        items: [
          { label: "Creative Design", href: "services.html" },
          { label: "Instal Ulang Windows", href: "services.html" }
        ]
      }
    },
    { label: "Portfolio", href: "#portfolio.html", also: ["project-detail.html"] },
    {
      label: "Tools",
      href: "#",
      dropdown: { show: true, items: [{ label: "Fixs Flow", href: "#" }, { label: "Fixs QR", href: "#" }] }
    },
    { label: "Tentang", href: "https://fikrispt.github.io/", external: true }
  ],
  search: {
    show: true,
    action: "services.html",
    placeholder: "Cari layanan...",
    label: "Cari layanan",
    icon: "assets/icon/search.png",
    emoji: "🔍"
  },
  rightButton: { mode: "hamburger" },
  cart: { href: "cart.html", label: "Keranjang", icon: "assets/icon/cart.png", emoji: "🛍️" },
  iconSize: "20px",
  toggleLabel: "Buka menu",
  style: { mode: "solid", background: "#000000" }
};

/* ===== FOOTER ===== */
window.FooterConfig = {
  brand: {
    logoUrl: "assets/logo/Fixs Arts (White).png",
    logoUrlLight: "assets/logo/fixsarts-light.png",
    logoHeight: "42px",
    textMain: "FIXS",
    textAccent: ".ARTS",
    href: "index.html",
    description: "@tagline"
  },
  social: {
    show: true,
    shape: "circle",
    size: "44px",
    label: "Media sosial",
    items: [
      {
        name: "whatsapp",
        label: "WhatsApp",
        href: "https://api.whatsapp.com/send/?phone=6285655526686&text=Hallo%21+%2Afixs.arts%2A%0ASaya+tertarik+dengan+jasa+Creative+Design&type=phone_number&app_absent=0",
        show: true,
        link: true
      },
      {
        name: "instagram",
        label: "Instagram",
        href: "https://www.instagram.com/fixs.arts/",
        show: true,
        link: true
      },
      {
        name: "tiktok",
        label: "TikTok",
        href: "https://www.tiktok.com/@fixs.arts",
        show: true,
        link: true
      },
      { name: "email", label: "Gmail", href: "mailto:fixs.arts@gmail.com", show: true, link: true },
      { name: "website", label: "Website", href: "https://", show: true, link: true }
    ]
  },
  icons: {},
  iconColor: "auto",
  columns: [
    {
      title: "@explore",
      links: [
        { label: "@services", href: "services.html" },
        { label: "@portfolio", href: "portfolio.html" },
        { label: "@about", href: "https://fikrispt.github.io/", external: true }
      ]
    },
    { title: "@location", lines: ["Indonesia"] }
  ],
  bottom: { copyright: "@copyright", note: "" },
  language: {
    show: true,
    default: "id",
    remember: true,
    autoDetect: false,
    list: [
      { code: "id", flag: "ID", name: "Indonesia" },
      { code: "en", flag: "US", name: "United States" },
      { code: "ms", flag: "MY", name: "Malaysia" },
      { code: "ja", flag: "JP", name: "Japan" },
      { code: "ko", flag: "KR", name: "Korea" },
      { code: "zh", flag: "CN", name: "China" },
      { code: "es", flag: "ES", name: "Spain" },
      { code: "fr", flag: "FR", name: "France" },
      { code: "de", flag: "DE", name: "Germany" }
    ]
  },
  texts: {
    id: {
      tagline: "Studio desain kreatif untuk brand yang ingin tampil beda — dari identitas visual sampai materi promosi.",
      explore: "Jelajahi",
      services: "Layanan",
      portfolio: "Portofolio",
      about: "Tentang",
      contact: "Kontak",
      location: "Lokasi",
      copyright: "© {year} Fixs.Arts Studio. Seluruh hak cipta dilindungi.",
      language: "Bahasa"
    },
    en: {
      tagline: "A creative design studio for brands that want to stand out — from visual identity to promotional materials.",
      explore: "Explore",
      services: "Services",
      portfolio: "Portfolio",
      about: "About",
      contact: "Contact",
      location: "Location",
      copyright: "© {year} Fixs.Arts Studio. All rights reserved.",
      language: "Language"
    },
    ms: {
      tagline: "Studio reka bentuk kreatif untuk jenama yang ingin tampil berbeza — daripada identiti visual hingga bahan promosi.",
      explore: "Teroka",
      services: "Perkhidmatan",
      portfolio: "Portfolio",
      about: "Tentang",
      contact: "Hubungi",
      location: "Lokasi",
      copyright: "© {year} Fixs.Arts Studio. Hak cipta terpelihara.",
      language: "Bahasa"
    },
    ja: {
      tagline: "個性を打ち出したいブランドのためのクリエイティブデザインスタジオ。ビジュアルアイデンティティから販促物まで。",
      explore: "探す",
      services: "サービス",
      portfolio: "ポートフォリオ",
      about: "私たちについて",
      contact: "お問い合わせ",
      location: "所在地",
      copyright: "© {year} Fixs.Arts Studio. 無断転載を禁じます。",
      language: "言語"
    },
    ko: {
      tagline: "차별화된 모습을 원하는 브랜드를 위한 크리에이티브 디자인 스튜디오 — 비주얼 아이덴티티부터 홍보 자료까지.",
      explore: "둘러보기",
      services: "서비스",
      portfolio: "포트폴리오",
      about: "소개",
      contact: "연락처",
      location: "위치",
      copyright: "© {year} Fixs.Arts Studio. 모든 권리 보유.",
      language: "언어"
    },
    zh: {
      tagline: "为想要脱颖而出的品牌打造的创意设计工作室——从视觉形象到宣传物料。",
      explore: "探索",
      services: "服务",
      portfolio: "作品集",
      about: "关于我们",
      contact: "联系方式",
      location: "地址",
      copyright: "© {year} Fixs.Arts Studio. 版权所有。",
      language: "语言"
    },
    es: {
      tagline: "Estudio de diseño creativo para marcas que quieren destacar: desde la identidad visual hasta el material promocional.",
      explore: "Explorar",
      services: "Servicios",
      portfolio: "Portafolio",
      about: "Acerca de",
      contact: "Contacto",
      location: "Ubicación",
      copyright: "© {year} Fixs.Arts Studio. Todos los derechos reservados.",
      language: "Idioma"
    },
    fr: {
      tagline: "Studio de design créatif pour les marques qui veulent se démarquer : de l'identité visuelle aux supports promotionnels.",
      explore: "Découvrir",
      services: "Services",
      portfolio: "Portfolio",
      about: "À propos",
      contact: "Contact",
      location: "Localisation",
      copyright: "© {year} Fixs.Arts Studio. Tous droits réservés.",
      language: "Langue"
    },
    de: {
      tagline: "Kreatives Designstudio für Marken, die auffallen wollen – von der visuellen Identität bis zu Werbematerialien.",
      explore: "Entdecken",
      services: "Leistungen",
      portfolio: "Portfolio",
      about: "Über uns",
      contact: "Kontakt",
      location: "Standort",
      copyright: "© {year} Fixs.Arts Studio. Alle Rechte vorbehalten.",
      language: "Sprache"
    }
  },
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
