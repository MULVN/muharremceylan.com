/* =========================================================
   1. SVG ARTBOARD ÜRETİCİ (görsel bulunamazsa yedek önizleme)
   ========================================================= */
function createArtworkDataUri(config) {
  const { bg1, bg2, accent, textCol, brand, title, subtitle, badge, ratio } = config;
  const isWide = ratio === 'wide';
  const isSlide = ratio === 'slide';
  const w = isWide ? 1200 : (isSlide ? 1280 : 720);
  const h = isWide ? 520 : (isSlide ? 720 : 1280);

  const esc = (s) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const safeTitle = esc(title);
  const safeSub = esc(subtitle);
  const safeBrand = esc(brand);
  const x0 = isSlide ? 72 : 56;

  const lines = safeTitle.match(/.{1,22}(\s|$)/g) || [safeTitle];
  const titleSvg = lines.slice(0, 3).map((line, idx) =>
    `<text x="${x0}" y="${(isWide ? 190 : (isSlide ? 230 : 320)) + idx * (isWide ? 54 : 66)}" fill="${textCol}" font-family="Plus Jakarta Sans, Inter, sans-serif" font-weight="800" font-size="${isWide ? 46 : (isSlide ? 54 : 52)}">${line.trim()}</text>`
  ).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bg1}"/><stop offset="100%" stop-color="${bg2}"/>
      </linearGradient>
      <radialGradient id="glow" cx="75%" cy="50%" r="55%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.38"/><stop offset="100%" stop-color="${bg2}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <rect width="${w}" height="${h}" fill="url(#glow)"/>
    <g opacity="0.16" stroke="${textCol}" stroke-width="1">
      <line x1="0" y1="${Math.round(h * 0.25)}" x2="${w}" y2="${Math.round(h * 0.25)}"/>
      <line x1="0" y1="${Math.round(h * 0.75)}" x2="${w}" y2="${Math.round(h * 0.75)}"/>
      <line x1="${Math.round(w * 0.5)}" y1="0" x2="${Math.round(w * 0.5)}" y2="${h}"/>
    </g>
    <circle cx="${isWide ? 930 : (isSlide ? 1030 : 360)}" cy="${isWide ? 260 : (isSlide ? 360 : 790)}" r="${isWide ? 165 : (isSlide ? 190 : 210)}" fill="${accent}" opacity="0.22"/>
    <rect x="${isWide ? 840 : (isSlide ? 930 : 245)}" y="${isWide ? 135 : (isSlide ? 210 : 620)}" width="${isWide ? 180 : (isSlide ? 200 : 230)}" height="${isWide ? 260 : (isSlide ? 300 : 340)}" rx="28" fill="${bg1}" stroke="${accent}" stroke-width="3" opacity="0.9"/>
    <text x="${x0}" y="${isWide ? 86 : 105}" fill="${accent}" font-family="Plus Jakarta Sans, Inter, sans-serif" font-weight="700" font-size="20" letter-spacing="4">${safeBrand.toUpperCase()}</text>
    ${titleSvg}
    <text x="${x0}" y="${isWide ? 390 : (isSlide ? 470 : 550)}" fill="${textCol}" opacity="0.82" font-family="Inter, sans-serif" font-weight="500" font-size="${isWide ? 22 : 24}">${safeSub.slice(0, 56)}</text>
    <rect x="${x0}" y="${h - 96}" width="240" height="44" rx="22" fill="${accent}" opacity="0.25"/>
    <text x="${x0 + 24}" y="${h - 68}" fill="${textCol}" font-family="Plus Jakarta Sans, sans-serif" font-weight="700" font-size="18">${badge}</text>
  </svg>`;

  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

/* =========================================================
   2. VERİ (27 tasarım) — kısa yardımcılarla tanımlı
   ========================================================= */
// art: [bg1, bg2, accent, textCol, brand, title, subtitle, badge]
const art = (a, ratio) => ({ bg1: a[0], bg2: a[1], accent: a[2], textCol: a[3], brand: a[4], title: a[5], subtitle: a[6], badge: a[7], ratio });

const story = (o) => ({ fallbackUrl: "", aspectClass: "aspect-[9/16]", dimensions: "1080×1920 px", showcaseCat: "9:16 Story", ...o, artConfig: art(o.art, 'story') });
const web   = (o) => ({ fallbackUrl: "", aspectClass: "aspect-[21/9]", dimensions: "1920×840 px", showcaseCat: "Web Banner", subGroup: "web", ...o, artConfig: art(o.art, 'wide') });
const slide = (o) => ({ fallbackUrl: "", aspectClass: "aspect-video", dimensions: "1920×1080 px", showcaseCat: "16:9 Sunum", ...o, artConfig: art(o.art, 'slide') });
// Gentili slaytları için kısa yardımcı: gs(dosya, no, başlık, açıklama)
const gs = (file, num, title, desc) => slide({
  file, slideNum: num, tag: "Gentili Aesthetics • Slayt " + num, title, desc,
  art: ["#f4f4f2", "#e5e5e0", "#18181b", "#111111", "GENTILI AESTHETICS • SLIDE " + num, title.slice(0, 44), "Documento di discussione", "16:9 SUNUM"]
});

// Mobil uygulama ekranları ve web sitesi görselleri için yatay kartlar
const app = (o) => ({ fallbackUrl: "", aspectClass: "aspect-[3/2]", dimensions: "2400×1600 px", showcaseCat: "Mobil UI", ...o, artConfig: art(o.art, 'wide') });
const poster = (o) => ({ fallbackUrl: "", showcaseCat: "Poster", ...o, artConfig: art(o.art, 'story') });
const webshot = (o) => ({ fallbackUrl: "", aspectClass: "aspect-[921/868]", dimensions: "921×868 px", showcaseCat: "Web Sitesi", ...o, artConfig: art(o.art, 'wide') });

const portfolioCollections = {
  wiselab: [
    story({
      file: "wiselab-story-1.jpg",
      fallbackUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDt2UK5p4R0x4aM7nTkOPQU5UeYH78sSBqqhm4axZ3ZoVr_LNrQFcRltEcsE8EAkNf9vv1owE49fcPXZh4auDkZn-MzFrxcjmyLpmKQtUDMNLZVhwBy9YKrfEyw82K3lFIA08kfwFhRRINM4H2CBh_l2WpQ5vxrJVaD49XYH8xeek7qYOK5c2xXOTOXMuVXta8hi8iBZImsT3nQxhJC38ljIjNCFwEPSTS6UHrJkktAexV30knIp5S0",
      art: ["#ea580c", "#7c2d12", "#fed7aa", "#ffffff", "WiseLab Supplement", "Vitamin C 1000mg Lansman", "Acerola & Zinc Picolinate • 60 Kapsül", "9:16 DİKEY STORY"],
      subGroup: "story", slideNum: "01", tag: "WiseLab • 9:16 Story",
      title: "WiseLab Vitamin C 1000mg Lansman Story",
      desc: "Dökülen kapsül kurgusu, canlı turuncu ton ve yüksek kontrastlı tipografi ile hazırlanan lansman hikayesi."
    }),
    story({
      file: "story 1.png",
      fallbackUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnfnli9Km7z5kalH5AGxOKE-KfuUvxbNJxX0uoKXYfOIj5VDL92ghQK1SaOZ03bLkJfn8nF8HJ5VvhfkQ-mUOmfM21CwfOe4U5R5uKYx8Jqn65HJOfBIXa2d2Jc65M9LMs3iyztfo6xaSF4MXPdEAVoRtHBXnklFe1E4lfoi0xowXxRFtbUXWxpntrhf-2SoY3R1FFOrLe_L9TY13nB_qaBd7YPBsld5FlK2ee8QM8yL_n_5R_36uo",
      art: ["#eab308", "#854d0e", "#fef08a", "#1e1b18", "WiseLab Supplement", "Daima Zinde Kal D3K2", "1000 IU Vitamin D3 + Menaquinone-7", "9:16 DİKEY STORY"],
      subGroup: "story", slideNum: "02", tag: "WiseLab • 9:16 Story",
      title: "WiseLab D3K2 Vitamin Kampanya Story",
      desc: "'Daima Zinde Kal' ana mesajı, dinamik sarı arka plan ve net ambalaj konumlandırması."
    }),
    story({
      file: "Artboard 3 (2).png",
      fallbackUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxksuif2P6fZ-VdvrlfuFOnhVHaqSie811sv58UpLnvxOVa5tx5yy9xV8JwTXVjXxjELHBv-1h8dTurwN8GSzD4JNfEv5PMY7TNyN2RX_sklYoJbwbHYcVGEeFY8d3Mv-O4kXMlYr-ULXthTipiYQhyaYdXCngWlE16bN-4Rx4Xq0ANEAuNJpmAs_EAFTKUAROQ6t2dHFPQVwhi16nbJ_tikrUKnSBKvHwIOAIQ8TUYe7GdK6C7L_V",
      art: ["#facc15", "#ca8a04", "#ffffff", "#18181b", "WiseLab Supplement", "Çoklu Ürün Ailesi Podyum", "Weight Control • D3K2 • Collagen Men", "9:16 KAMPANYA"],
      subGroup: "story", slideNum: "03", tag: "WiseLab • 9:16 Story",
      title: "WiseLab Çoklu Ürün Ailesi 3D Podyum Story",
      desc: "Weight Control, Collagen ve D3K2 podyum sunumu, katmanlı ürün ailesi tanıtım kreatifi."
    }),
    story({
      file: "Artboard 4 (1).png",
      fallbackUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0vUdY-gLpnApwRvKIDaO2FRRbfdgmC7CW4UgZpViLGdjYfScGlLmmWye0t_YqTplNBpMDtaG6ZbcToMfP6NKfKlMZDsLdf4AxjCNgB5mKQriEsIR_-ha9ZTawRCdK5cd36LRKxVWDeVNvVZXlz8uladyXAY9lFczwltvEYlT8UOvOeIQkRKmZ-4pfwKcqSyItuRsFfuPcQLMWto_8hD57Hbn3JyhJoznolP2UixYTKrnP5KaTNMBj",
      art: ["#7e22ce", "#be185d", "#f9a8d4", "#ffffff", "WiseLab Supplement", "Collagen Tip 1-2-3 + C", "Daha Canlı, Sağlıklı ve Neme Doymuş", "9:16 DİKEY STORY"],
      subGroup: "story", slideNum: "04", tag: "WiseLab • 9:16 Story",
      title: "WiseLab Collagen Tip 1-2-3 Story",
      desc: "Mor ve pembe renk armonisi, el tutuş mockup'ı ve 'Daha Canlı, Sağlıklı' vurgulu tipografi."
    }),
    story({
      file: "dsadas.jpg",
      art: ["#334155", "#9a3412", "#fb923c", "#ffffff", "WiseLab D3K2", "5 Temel Fayda Haritası", "Kas • Bağışıklık • Kalsiyum • Kemik • Kan", "9:16 İNFOGRAFİK"],
      subGroup: "story", slideNum: "05", tag: "WiseLab • 9:16 Fayda Haritası",
      title: "WiseLab D3K2 Fayda Haritası Story",
      desc: "Kas fonksiyonları, Bağışıklık desteği, Kalsiyum emilimi, Kemik sağlığı ve Normal kan pıhtılaşması çağrı okları ile infografik story."
    }),
    story({
      file: "dsa.jpg",
      art: ["#0284c7", "#ea580c", "#bae6fd", "#ffffff", "WiseLab Efervesan", "Vitamin C 1000mg + Zinc", "Çinko Glukonat • Metalik Tat Bırakmaz", "9:16 İKONOGRAFİ"],
      subGroup: "story", slideNum: "06", tag: "WiseLab • 9:16 Ürün İkonografisi",
      title: "WiseLab Vitamin C + Zinc Efervesan Story",
      desc: "Çinko Glukonat Formu, 3'lü Sinerjik Destek ve Metalik Tat Bırakmaz özel vektör ikonografisi."
    }),
    story({
      file: "dsad.jpg",
      art: ["#38bdf8", "#c2410c", "#fef08a", "#ffffff", "WiseLab Lifestyle", "Quercetin & Vitamin C", "4 Güçlü Bileşen • Bromelain & Vitamin D", "9:16 LIFESTYLE"],
      subGroup: "story", slideNum: "07", tag: "WiseLab • 9:16 Lifestyle Reklam",
      title: "WiseLab Quercetin & Vitamin C İkilisi Story",
      desc: "Doğal gün ışığı lifestyle portre entegrasyonu ve '4 güçlü bileşen, günlük beslenmene güçlü destek' mesajı."
    }),

    web({
      file: "Artboard 1.jpg",
      art: ["#c2410c", "#f97316", "#5eead4", "#ffffff", "WiseLab Web Slider", "Vitamin Takviyesi Yanında — D3K2", "Enerji İhtiyacın İçin • Keşfet CTA", "WEB HERO BANNER"],
      slideNum: "08", tag: "WiseLab • Web Hero Banner",
      title: "WiseLab D3K2 Web Hero Banner",
      desc: "'Vitamin Takviyesi Yanında' ana başlığı, sıcak gün batımı atmosferi, el tutuş kompozisyonu ve Keşfet CTA butonu."
    }),
    web({
      file: "Artboard 3.png",
      art: ["#6b21a8", "#9333ea", "#f472b6", "#ffffff", "WiseLab Web Slider", "Daha Canlı, Sağlıklı ve Neme Doymuş", "Collagen Tip 1, 2, 3 ve Vitamin C", "WEB SLIDER BANNER"],
      slideNum: "09", tag: "WiseLab • Web Slider Banner",
      title: "WiseLab Collagen Tip 1-2-3 Web Banner",
      desc: "'Daha Canlı, Sağlıklı ve Neme Doymuş' vurgulu mor gradient web slider tasarımı ve ürün odak yerleşimi."
    }),
    web({
      file: "Artboard 4.png",
      art: ["#facc15", "#eab308", "#1e293b", "#1e293b", "WiseLab Web Vitrin", "Vitamin Takviyesi Yanında — Ürün Ailesi", "Weight Control • D3K2 • Collagen Men", "WEB VİTRİN BANNER"],
      slideNum: "10", tag: "WiseLab • Web Vitrin Banner",
      title: "WiseLab Çoklu Ürün Ailesi Web Banner",
      desc: "Weight Control, D3K2 ve Collagen Men ürünlerinin 3D geometrik podyumlar üzerinde sunulduğu sarı vitrin bannerı."
    }),
    web({
      file: "Artboard 5.png",
      art: ["#ea580c", "#9a3412", "#ffffff", "#ffffff", "WiseLab Web Lansman", "İhtiyacın Olan Vitamin C 1000mg", "Gücünü Doğadan Alman İçin • Keşfet", "WEB LANSMAN BANNER"],
      slideNum: "11", tag: "WiseLab • Web Lansman Banner",
      title: "WiseLab Vitamin C 1000mg Web Banner",
      desc: "'İhtiyacın Olan Vitamin Takviyesi Yanında' başlığıyla havada süzülen kapsül ve şişe kompozisyonu."
    })
  ],

  gentili: [
    slide({ file: "Artboard 1 (2).jpg", art: ["#f4f4f2", "#e5e5e0", "#18181b", "#111111", "GENTILI AESTHETICS • SLIDE 01", "GENTILI Aesthetics Business Unit", "Dal prodotto al mercato, con governance end-to-end", "16:9 KAPAK SLAYTI"],
      slideNum: "01", tag: "Gentili Aesthetics • Slayt 01",
      title: "Gentili Aesthetics Kapak & Business Unit Stratejisi",
      desc: "Üründen pazara uçtan uca yönetişim (end-to-end governance) modeli ile yeni Medikal Estetik İş Birimi kurgusu ve onay çerçevesi." }),
    slide({ file: "Artboard 2 (1).png", art: ["#f4f4f2", "#e7e5e4", "#27272a", "#111111", "GENTILI DISCUSSION • SLIDE 02", "EXECUTIVE decision: STAGE-GATE", "Gate 0 (Ora) • Gate 1 (45-60 Giorni) • Gate 2", "16:9 YÖNETİM KURULU"],
      slideNum: "02", tag: "Gentili Aesthetics • Slayt 02",
      title: "Executive Decision — Stage-Gate Onay Süreci (Gate 0, Gate 1, Gate 2)",
      desc: "Yönetim kurulu risk kontrolü için 3 aşamalı karar kapısı: Keşif yetkisi (Gate 0), üretici & MDR doğrulaması (Gate 1) ve üretim öncesi onay (Gate 2)." }),
    slide({ file: "Artboard 3 (3).png", art: ["#f4f4f2", "#e5e5e0", "#18181b", "#111111", "GENTILI DISCUSSION • SLIDE 03", "ACCOUNTABILITY INTEGRATA", "Strategy & P&L • Product & Science • Regulatory", "16:9 SORUMLULUK MATRİSİ"],
      slideNum: "03", tag: "Gentili Aesthetics • Slayt 03",
      title: "Entegre Sorumluluk Matrisi (Strategy & P&L, Product & Science, Manufacturing, Regulatory)",
      desc: "Ürün seçiminden finansal kârlılığa kadar 4 temel sütunda entegre sorumluluk ve operasyonel hesap verebilirlik mimarisi." }),
    slide({ file: "Artboard 4 (2).png", art: ["#f4f4f2", "#e5e5e0", "#18181b", "#111111", "GENTILI DISCUSSION • SLIDE 04", "COSA funziona, COSA manca", "Modello asset-light vs Revenue model & CE", "16:9 STRATEJİK ANALİZ"],
      slideNum: "04", tag: "Gentili Aesthetics • Slayt 04",
      title: "Stratejik Analiz — Güçlü Yönler & Eksikler (Cosa Funziona, Cosa Manca)",
      desc: "Varlık-hafif (asset-light) üretim modelinin avantajları ile gelir modeli, CE sertifikasyonu ve talep doğrulama gereksinimlerinin karşılaştırmalı analizi." }),
    slide({ file: "Artboard 5 (1).png", art: ["#f4f4f2", "#e5e5e0", "#18181b", "#111111", "STRATEGIA • SLIDE 05", "INVESTMENT THESIS: dove vincere", "Per il Medico • Per il Distributore • Per Gentili", "16:9 YATIRIM TEZİ"],
      slideNum: "05", tag: "Gentili Aesthetics • Slayt 05",
      title: "Yatırım Tezi & Konumlandırma (Investment Thesis)",
      desc: "Hekimler, distribütörler ve Gentili için kazan-kazan değer önermesi: 'Kanıtlanabilir klinik sonuçları destekleyen İtalyan farmasötik bilimi ve kalitesi'." }),
    slide({ file: "Artboard 6.png", art: ["#f4f4f2", "#e5e5e0", "#18181b", "#111111", "GENTILI DISCUSSION • SLIDE 06", "MERCATO: dal congresso alla domanda", "IMCAS 22.000 • AMWC 17.700 • Dubai Derma 25.000+", "16:9 PAZAR METRİKLERİ"],
      slideNum: "06", tag: "Gentili Aesthetics • Slayt 06",
      title: "Pazar Verileri & Kongre Metrikleri (IMCAS World, AMWC, Dubai Derma)",
      desc: "Küresel estetik kongrelerinin ziyaretçi ölçeği (64.700+ profesyonel) ve lansman öncesi 30–40 hekim görüşmesi ile TAM/SAM/SOM doğrulama planı." }),
    slide({ file: "Artboard 7.png", art: ["#f4f4f2", "#e5e5e0", "#18181b", "#111111", "PORTFOLIO STRATEGY • SLIDE 07", "LAUNCH PORTFOLIO: sequenza", "Wave 0 Validazione • Wave 1 Hero + Core • Wave 2-3", "16:9 LANSMAN PLANI"],
      slideNum: "07", tag: "Gentili Aesthetics • Slayt 07",
      title: "Lansman Portföyü & Ürün Sıralaması (Wave 0 - Wave 3)",
      desc: "5 kategoriden odaklanmış lansmana geçiş: Doğrulama (Wave 0), Hero Skin Booster & Core Filler (Wave 1), Genişleme (Wave 2) ve Biyostimülan (Wave 3)." }),
    slide({ file: "Artboard 8.png", art: ["#f4f4f2", "#e5e5e0", "#18181b", "#111111", "LEGAL & REGULATORY • SLIDE 08", "PRIMA DI FIRMARE: fabbricante", "Model A OEM vs Model B Own Legal Manufacturer", "16:9 MDR & HUKUK"],
      slideNum: "08", tag: "Gentili Aesthetics • Slayt 08",
      title: "Regülasyon & Üretici Modeli (OEM vs Own Legal Manufacturer)",
      desc: "Üretim sözleşmesi ve ambalaj tasarımı öncesinde AB MDR uyumluluğu, fikri mülkiyet kontrolü ve ülke bazlı kayıt stratejisi." }),
    slide({ file: "Artboard 9.png", art: ["#f4f4f2", "#e5e5e0", "#18181b", "#111111", "PORTFOLIO STRATEGY • SLIDE 09", "La prima scelta è COSA lanciare", "Clinical Need • Right to Win • Unit Economics", "16:9 SKU MATRİSİ"],
      slideNum: "09", tag: "Gentili Aesthetics • Slayt 09",
      title: "Ürün Seçim Kriterleri & SKU Sıralama Matrisi (6 Adım)",
      desc: "Klinik ihtiyaç, kazanma hakkı, pazar erişimi, birim ekonomisi, portföy rolü ve GO/TEST/HOLD karar kapısından oluşan 6 adımlı seçim modeli." }),
    slide({ file: "Artboard 10.png", art: ["#f4f4f2", "#e5e5e0", "#18181b", "#111111", "MANUFACTURER SELECTION • SLIDE 10", "MANUFACTURER DUE DILIGENCE", "30% Quality • 25% Product • 20% Supply • 15% Econ", "16:9 SCORECARD"],
      slideNum: "10", tag: "Gentili Aesthetics • Slayt 10",
      title: "Üretici Due Diligence & Skor Kartı (Ağırlıklı Değerlendirme)",
      desc: "Kalite & MDR (%30), Ürün & Dosya (%25), Tedarik Kapasitesi (%20), Ekonomi (%15) ve Stratejik Uyum (%10) kriterlerine dayalı üretici seçim karnesi." }),
    gs("Artboard 11.png", "11", "Portföy: Genişlemeden Önce Seçmek",
      "Skin Booster (giriş/sıklık), Orta Filler (çekirdek hacim), Volumizing Filler (miks ve değer), Genital Filler (farklılaşma) ve Tedavi Sonrası (çapraz satış) rolleri ile SKU bazlı yatırım kartı."),
    gs("Artboard 12.png", "12", "MDR: En Önemli Kontrol Noktası",
      "'Sertifikalı üretici + CE = anında satılabilirlik' varsayımına karşı; imza öncesi yasal üretici, MDR Madde 16, etiketleme, QMS/PMS ve tedarik sürekliliği doğrulaması."),
    gs("Artboard 13.png", "13", "Üretici Seçimi: Tedarik Değil, Stratejik Karar",
      "Kalite/Regülasyon, Sözleşme/Fikri Mülkiyet ve Ekonomi/Servis başlıklarında üç eksenli değerlendirme; Gate 1 için skor kartı, denetim, term sheet ve MDR görüşü."),
    gs("Artboard 14.png", "14", "Go-to-Market: Ülkeleri Değil, Kaynakları Yoğunlaştır",
      "Wave 1 GCC (BAE + ikinci pazar), Wave 2 Avrupa (2–3 pilot pazar) ve Wave 3 diğer bölgeler için aşamalı pazara giriş planı."),
    gs("Artboard 15.png", "15", "KPI'lar: Cirodan Önce Gelen Göstergeler",
      "Nitelikli lead, partner due diligence, minimum ve milestone sözleşmeleri, eğitim ve kullanım ile yeniden sipariş; aylık dashboard çerçevesi."),
    gs("Artboard 16.png", "16", "Kritik Yol: Fikirden İlk Tekrar Siparişe",
      "Discover, Select, Contract & Design, Validate, Produce & Enable ve Launch & Learn olmak üzere altı aşamalı bağımlılık planı."),
    gs("Artboard 17.png", "17", "Finans: İlan Edilen Bütçe, Nakit Taahhüdü Değildir",
      "12 aylık operasyonel maliyet aralığı € 0,79–1,25 M; kapsam dışı kalemler, eklenecek unsurlar ve Gate 1 çıktıları."),
    gs("Artboard 18.png", "18", "Ekonomik Model: Vaatlerden Önce Formüller",
      "Unit economics formülleri (net satış, brüt kâr, katkı payı, başa baş noktası) ve nicelleştirilecek üç senaryo: downside, base, upside."),
    gs("Artboard 19.png", "19", "Go / No-Go: Yönetim Kurulundan İstenen Altı Kanıt",
      "Product, Manufacturer, Regulatory, Market, Economics ve Operations başlıklarında lansman karar kriterleri; dilimler halinde finansman önerisi."),
    gs("Artboard 20.png", "20", "Hassasiyet Analizi: Sonucu Belirleyen Dört Değişken",
      "Net fiyat, hacim/yeniden sipariş, COGS/MOQ ve regülasyon süreleri; 6 aylık gecikme senaryosunda azami finansman ihtiyacı."),
    gs("Artboard 21.png", "21", "Dubai 2027: Sunum ile Stok Hazırlığı Aynı Şey Değil",
      "AMWC Cannes (1–3 Nisan), Dubai Derma (6–8 Nisan) ve ilk stok (19 Nisan) takvimi; lansman başarısını tek bir kongreye bağlamama önerisi."),
    gs("Artboard 22.png", "22", "İş Birimi Kurulum Yol Haritası (100 Gün)",
      "0–30 gün due diligence, 31–60 gün karar paketi, 61–90 gün pilot hazırlık ve 91–100 gün Go/No-Go; sahip, sponsor ve onay mekanizması."),
    gs("Artboard 23.png", "23", "Riskler: Betimleyici Listeden Operasyonel Sorumluluğa",
      "CE/private label, yetersiz talep, stok ve raf ömrü, dağıtım/ödemeler ve lansman gecikmesi için önlem ve sorumlu eşleştirmesi."),
    gs("Artboard 24.png", "24", "Board Dashboard: İlerleme Değil, Karar Raporu",
      "Sermaye, regülasyon, ticari, hekimler, tedarik ve karlılık başlıklarında yönetim kurulu için altı alanlı rapor yapısı."),
    gs("Artboard 25.png", "25", "Yönetim Kuruluna Önerilen Karar",
      "Gate 0 yetkilendirmesi (operasyonel yetki, due diligence bütçesi, 45–60 gün business case) ve Kurul'a dönüş için gereken kanıt paketi."),
    gs("Artboard 26.png", "26", "BU'yu Lansmana Taşıyacak Dört Kilit Figür",
      "BU Director, Business Development, Regulatory Estero ve Medical Marketing rolleriyle yalın başlangıç ekibi ve net sahiplik.")
  ],

  fpakademi: [
    story({ file: "Artboard 1 (3).jpg", art: ["#f1f5f9", "#cbd5e1", "#0284c7", "#0f172a", "FP AKADEMİ • 01", "Hassas İşçilik, Profesyonel Onarım", "Mikro Tornavida & Teknik Eğitim Programı", "9:16 REKLAM STORY"],
      slideNum: "01", tag: "FP Akademi • 9:16 Story",
      title: "Hassas İşçilik, Profesyonel Onarım",
      desc: "Dokulu açık gri zemin, zümrüt yeşili dinamik şeritler ve mikro hassas tornavida merkezli eğitim yönlendirme kreatifi." }),
    story({ file: "Artboard 2.jpg", art: ["#0369a1", "#0284c7", "#10b981", "#ffffff", "FP AKADEMİ • 02", "Teknik Bilgi Gerçek Uzmanlık", "Anakart & Mikro Devre Onarım Eğitimi", "9:16 REKLAM STORY"],
      slideNum: "02", tag: "FP Akademi • 9:16 Story",
      title: "Teknik Bilgi, Gerçek Uzmanlık",
      desc: "Derin teknik mavi arka plan, anakart makro çekimi ve mühendislik grid çizgileriyle kurgulanan akademi tanıtımı." }),
    story({ file: "Artboard 3.jpg", art: ["#f8fafc", "#e2e8f0", "#0284c7", "#0284c7", "FP AKADEMİ • 03", "ÖĞREN USTALAŞ", "İç Donanım Mimarisi & Teorik Uzmanlık", "9:16 REKLAM STORY"],
      slideNum: "03", tag: "FP Akademi • 9:16 Story",
      title: "Öğren Ustalaş — İç Donanım Mimarisi",
      desc: "Açık kasa akıllı telefon donanım illüstrasyonu, teknik ölçü yayları ve yüksek etkili 'Öğren Ustalaş' tipografisi." }),
    story({ file: "Artboard 4.jpg", art: ["#0284c7", "#1d4ed8", "#10b981", "#ffffff", "FP AKADEMİ • 04", "PREMIUM SERVİSE", "Uzman Eğitmenlerle Teknik Dünyaya Adım At", "9:16 REKLAM STORY"],
      slideNum: "04", tag: "FP Akademi • 9:16 Story",
      title: "Premium Servise — Teknik Dünyanın Kapılarını Arala",
      desc: "Çift katmanlı cihaz donanım sunumu, servis ekipmanları ve kurumsal FP monogram dokusuyla hazırlanan kampanya görseli." })
  ],

  adanaocakbasi: [
    story({ file: "10 kasım.jpg", art: ["#09090b", "#18181b", "#f5d0a9", "#f5d0a9", "ADANA OCAKBAŞI ATAŞEHİR", "10 KASIM Saygı, Minnet ve Özlemle Anıyoruz", "Büyük Önder Mustafa Kemal Atatürk", "9:16 ÖZEL GÜN"],
      slideNum: "01", tag: "Adana Ocakbaşı • 10 Kasım",
      title: "10 Kasım Atatürk'ü Anma Günü Tasarımı",
      desc: "Siyah-beyaz yüksek kontrastlı portre kompozisyonu, şampanya altını tipografi ve kaligrafik 'Anıyoruz' vurgusu." }),
    story({ file: "29 ekim.jpg", art: ["#09090b", "#27272a", "#fde68a", "#fde68a", "ADANA OCAKBAŞI ATAŞEHİR", "29 EKİM CUMHURİYET BAYRAMI Kutlu Olsun", "Adana Ocakbaşı Ataşehir Kurumsal Kutlama", "9:16 ÖZEL GÜN"],
      slideNum: "02", tag: "Adana Ocakbaşı • 29 Ekim",
      title: "29 Ekim Cumhuriyet Bayramı Kutlama Tasarımı",
      desc: "Dramatik ışık hüzmesi, ikonik tarihi portre ve altın çizgi detaylarıyla kurgulanan kurumsal Cumhuriyet Bayramı kreatifi." })
  ],

  zeytin: [
    story({ file: "zeytin.png", art: ["#e9e9e9", "#d6d6d2", "#6b7a2e", "#1a1a1a", "ZEYTİN BOSTANCI", "Her Çatalda Taze Bir Lezzet", "Akıp giden günün yorgunluğunu unutturan sofra", "9:16 STORY"],
      slideNum: "01", tag: "Zeytin Bostancı • Story",
      title: "Zeytin Bostancı Lezzet Story",
      desc: "Açık gri zemin üzerinde eğik kadrajlı yemek fotoğrafları ve sade tipografiyle hazırlanan marka hikayesi." }),
    story({ file: "rezerve 2.jpg", art: ["#7c3f1d", "#3b2412", "#f5efdc", "#f5efdc", "ZEYTİN BOSTANCI", "Anın Tadını Çıkarmak İçin", "Zeytin dalı çerçeveli marka tanıtımı", "9:16 STORY"],
      slideNum: "02", tag: "Zeytin Bostancı • Story",
      title: "Zeytin Bostancı Mekân Tanıtım Story",
      desc: "Rattan aydınlatmalı mekân fotoğrafı üzerine zeytin dalı illüstrasyonlu, süslü çerçeveli marka mesajı." }),
    story({ file: "rezerve.jpg", art: ["#1c1c1c", "#3a3a3a", "#f1ece0", "#f1ece0", "ZEYTİN BOSTANCI", "Rezervasyon İçin", "Siyah-beyaz mekân fotoğrafı", "9:16 STORY"],
      slideNum: "03", tag: "Zeytin Bostancı • Story",
      title: "Zeytin Bostancı Rezervasyon Story",
      desc: "Siyah-beyaz mekân ve zeytin dalı kompozisyonu üzerinde rezervasyon çağrısı." })
  ],

  musiumai: [
    app({ file: "musiumai-1.jpg", spanClass: "sm:col-span-2", art: ["#0c224e", "#020a18", "#38bdf8", "#ffffff", "MUSIUMAI", "Kayıt, Ana Sayfa ve Tarama", "Sanat eseri tanıyan mobil uygulama", "MOBİL UI"],
      slideNum: "01", tag: "MusiumAI • Mobil Uygulama",
      title: "MusiumAI — Kayıt, Ana Sayfa ve Tarama Ekranları",
      desc: "Sanat eserlerini kamerayla tarayıp yapay zekâ ile tanıyan mobil uygulamanın ana akışı." }),
    app({ file: "musiumai-2.jpg", art: ["#0c224e", "#020a18", "#38bdf8", "#ffffff", "MUSIUMAI", "Kayıt Ol ve Giriş Yap", "Üyelik ekranları", "MOBİL UI"],
      slideNum: "02", tag: "MusiumAI • Mobil Uygulama",
      title: "MusiumAI — Kayıt Ol ve Giriş Yap Ekranları",
      desc: "Heykel dokulu arka plan ve parlak mavi vurgularla hazırlanan üyelik ekranları." }),
    app({ file: "musiumai-3.jpg", art: ["#0c224e", "#020a18", "#38bdf8", "#ffffff", "MUSIUMAI", "Profil ve Ayarlar", "Koleksiyon ve hesap yönetimi", "MOBİL UI"],
      slideNum: "03", tag: "MusiumAI • Mobil Uygulama",
      title: "MusiumAI — Profil ve Ayarlar Ekranları",
      desc: "Seviye ve deneyim puanı gösteren profil ekranı ile hesap ve uygulama ayarları." }),
    app({ file: "musiumai-5.jpg", art: ["#0c224e", "#020a18", "#38bdf8", "#ffffff", "MUSIUMAI", "Keşfetmeye Hazır mısın?", "Kamerayı aç, eseri tara", "MOBİL UI"],
      slideNum: "04", tag: "MusiumAI • Mobil Uygulama",
      title: "MusiumAI — Ana Sayfa Ekranı",
      desc: "Tek dokunuşla eser taramayı başlatan ana ekran ve günün öne çıkan eserleri." }),
    app({ file: "musiumai-6.jpg", art: ["#0c224e", "#020a18", "#38bdf8", "#ffffff", "MUSIUMAI", "Eser Taranıyor", "Kamera ile eser analizi", "MOBİL UI"],
      slideNum: "05", tag: "MusiumAI • Mobil Uygulama",
      title: "MusiumAI — Eser Tarama Ekranı",
      desc: "Mavi tarama çerçevesi ve analiz bilgi kartıyla kamera ekranı." }),
    app({ file: "musiumai-7.jpg", spanClass: "sm:col-span-2", art: ["#0c224e", "#020a18", "#38bdf8", "#ffffff", "MUSIUMAI", "Uygulama Simgesi", "Müze motifli logo", "MOBİL UI"],
      slideNum: "06", tag: "MusiumAI • Uygulama Simgesi",
      title: "MusiumAI — Uygulama Simgesi",
      desc: "Müze binası ve 'M' harfini birleştiren uygulama simgesi." }),
    app({ file: "musiumai-brosur-1.jpg", spanClass: "sm:col-span-2", aspectClass: "aspect-[1800/1273]", dimensions: "1800×1273 px",
      art: ["#1b1a1f", "#2c2b35", "#5eb3dc", "#ffffff", "MUSIUMAI", "Bitirme Projesi", "Broşür kapağı", "BROŞÜR"],
      slideNum: "07", tag: "MusiumAI • Broşür",
      title: "MusiumAI — Broşür (Kapak)",
      desc: "Bitirme projesi için hazırlanan broşürün kapağı." }),
    app({ file: "musiumai-brosur-2.jpg", spanClass: "sm:col-span-2", aspectClass: "aspect-[1800/1273]", dimensions: "1800×1273 px",
      art: ["#1b1a1f", "#2c2b35", "#5eb3dc", "#ffffff", "MUSIUMAI", "Sanatın Dijital Evreni", "Kullanıcı yolculuğu", "BROŞÜR"],
      slideNum: "08", tag: "MusiumAI • Broşür",
      title: "MusiumAI — Broşür (İç Sayfa)",
      desc: "Tarama, tanımlama, keşfetme ve ödüllendirme adımlarını anlatan kullanıcı yolculuğu." }),
    app({ file: "musiumai-poster.jpg", spanClass: "sm:col-span-2 sm:max-w-md sm:mx-auto w-full", aspectClass: "aspect-[1400/1960]", dimensions: "1400×1960 px",
      art: ["#050a1f", "#0b1c4a", "#5eead4", "#ffffff", "MUSIUMAI", "Sanatın Zekayla Buluştuğu Noktada", "Mobil uygulama posteri", "POSTER"],
      slideNum: "09", tag: "MusiumAI • Poster",
      title: "MusiumAI — Poster",
      desc: "'Sanatın Zekayla Buluştuğu Noktada' sloganlı uygulama tanıtım posteri." })
  ],

  posterler: [
    poster({ file: "poster-1.jpg", aspectClass: "aspect-[1400/1986]", dimensions: "1400×1986 px",
      art: ["#ffffff", "#e5e5e5", "#111111", "#111111", "OKUYABİLİYORUM", "Sizin dokunamadığınız gibi", "Biz de göremiyoruz", "POSTER"],
      slideNum: "01", tag: "Poster • Okuyabiliyorum",
      title: "Okuyabiliyorum — Braille Afişi",
      desc: "Braille noktalarıyla yazılmış 'OKUYABİLİYORUM' kelimesiyle görme engelli okurlara dikkat çeken tipografik afiş." }),
    poster({ file: "poster-2.jpg", aspectClass: "aspect-[1400/1986]", dimensions: "1400×1986 px",
      art: ["#d8d3c8", "#b9b2a2", "#8b6a2b", "#1a1a1a", "POSTA SANATI", "Bir Varmış Bir Yokmuş", "II. Uluslararası Posta Sanatı Sergisi", "POSTER"],
      slideNum: "02", tag: "Poster • Posta Sanatı Sergisi",
      title: "II. Uluslararası Posta Sanatı Sergisi",
      desc: "Kahramanmaraş Büyükşehir Belediyesi'nin düzenlediği sergi için hazırlanan, pul çerçeveli dijital posta sanatı çalışması (17 Aralık 2022)." }),
    poster({ file: "poster-3.jpg", aspectClass: "aspect-[1400/1986]", dimensions: "1400×1986 px",
      art: ["#d9d6d2", "#bdb8b2", "#c2371a", "#111111", "İSTANBUL MÜZİK FESTİVALİ", "53. İstanbul Müzik Festivali", "20 Mayıs – 10 Haziran 2025", "POSTER"],
      slideNum: "03", tag: "Poster • İstanbul Müzik Festivali",
      title: "53. İstanbul Müzik Festivali Afişi",
      desc: "Kemanın gövdesinde şehir silüeti ve nota kıvrımları bir araya geliyor." }),
    poster({ file: "poster-4.jpg", aspectClass: "aspect-[1400/2240]", dimensions: "1400×2240 px",
      art: ["#ffffff", "#1d1a8a", "#1d1a8a", "#ffffff", "LEX COURTS", "No Just, Ex Lex", "Justice Unites Us", "POSTER"],
      slideNum: "04", tag: "Poster • Lex Courts",
      title: "Lex Courts — No Just, Ex Lex",
      desc: "Beyaz ve lacivert iki yarıya bölünmüş kompozisyonda kılıç ile terazinin buluştuğu afiş." }),
    poster({ file: "poster-5.jpg", aspectClass: "aspect-[1400/2250]", dimensions: "1400×2250 px",
      art: ["#26358f", "#1d2a73", "#38bdf8", "#ffffff", "LEX COURTS", "Cigarettes After Lex", "Justice Unites Us", "POSTER"],
      slideNum: "05", tag: "Poster • Lex Courts",
      title: "Lex Courts — Cigarettes After Lex",
      desc: "Lacivert zeminde iri tipografi ve küllükteki sigara illüstrasyonuyla hazırlanan afiş." })
  ],

  subapsan: [
    // Sitenin üst menüsündeki bölümler, menü sırasıyla
    ...[
      ["subapsan-1.jpg", "Anasayfa", "Güçlü bağlantılar: 3B jant subabı montaj animasyonlu karşılama ekranı."],
      ["subapsan-2.jpg", "Kurumsal", "Firma hikâyesi, vizyon ve üretim avantajlarını anlatan bölüm."],
      ["subapsan-3.jpg", "Üretimimiz", "Hammaddeden kargoya beş aşamalı üretim akışı."],
      ["subapsan-4.jpg", "Hizmetler", "İş makinesi, otobüs/kamyon ve traktör jant subapları için hizmet kartları."],
      ["subapsan-5.jpg", "Kalite", "ISO 9001:2015 kalite yönetim sistemi ve kalite politikası."],
      ["subapsan-6.jpg", "Ürünler", "Kategori filtreli ürün yelpazesi ve teklif isteme kartları."],
      ["subapsan-7.jpg", "Katalog", "Dijital ürün kataloğu bölümü."]
    ].map(([file, name, desc], i) => webshot({ file, dimensions: "1568×736 px",
      art: ["#0b0b1a", "#2a0b1e", "#e11d48", "#ffffff", "SUBAPSAN", name, "Kurumsal web sitesi", "WEB SİTESİ"],
      slideNum: String(i + 1).padStart(2, "0"), tag: "Subapsan • " + name,
      title: "Subapsan — " + name, desc, aspectClass: "aspect-[1568/736]" }))
  ],

  single: []
};

/* =========================================================
   3. GÖRSEL ÇÖZÜMLEME (yerel yükleme → dosya adı → images/ → URL → SVG)
   ========================================================= */
const uploadedBlobMap = {};

// Kartlarda küçük önizleme (images/thumb/…jpg), tam ekranda orijinal görsel kullanılır.
function resolveInitialSrc(item) {
  const key = item.file.toLowerCase();
  if (item.animated) return uploadedBlobMap[key] || ("images/" + encodeURI(item.file)); // GIF'in küçük kopyası yok, hareketi korunur
  const thumb = item.file + ".jpg"; // örn. "Artboard 3.png.jpg" (png/jpg adı çakışmasın)
  return uploadedBlobMap[key] || ("images/thumb/" + encodeURI(thumb));
}

function resolveFullSrc(item) {
  const key = item.file.toLowerCase();
  return uploadedBlobMap[key] || ("images/" + encodeURI(item.file));
}

function handleImageError(imgEl, collectionKey, index) {
  const item = portfolioCollections[collectionKey][index];
  if (!item) return;
  const stage = parseInt(imgEl.dataset.fallbackStage || "0", 10);

  if (stage === 0) {
    imgEl.dataset.fallbackStage = "1";
    imgEl.src = resolveFullSrc(item);
    return;
  }
  if (stage === 1 && item.fallbackUrl) {
    imgEl.dataset.fallbackStage = "2";
    imgEl.src = item.fallbackUrl;
    return;
  }
  if (stage <= 2 && item.artConfig) {
    imgEl.dataset.fallbackStage = "3";
    imgEl.src = createArtworkDataUri(item.artConfig);
  }
}

/* Yerel dosya yükleme */
(document.getElementById('local-folder-input') || document.createElement('input')).addEventListener('change', (e) => {
  const files = Array.from(e.target.files || []);
  if (!files.length) return;

  files.forEach(file => {
    uploadedBlobMap[file.name.toLowerCase()] = URL.createObjectURL(file);
  });
  renderAllPortfolios();
  showToast(`${files.length} yerel görsel dosyası tarayıcıya yüklendi ve tasarımlarla eşleştirildi!`, 4500);
});

function showToast(text, ms) {
  const toast = document.getElementById('global-toast');
  document.getElementById('global-toast-text').textContent = text;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), ms);
}

/* =========================================================
   4. KART OLUŞTURUCULAR
   ========================================================= */
function buildBrandCardHTML(item, key, idx) {
  // Kartta yazı yok: yalnızca görsel. Tıklayınca tam ekran açılır.
  return `
    <div onclick="openLightbox('${key}', ${idx})" onkeydown="if(event.key==='Enter'){openLightbox('${key}', ${idx})}" role="button" tabindex="0" aria-label="${item.title}"
      class="cursor-pointer group rounded-2xl bg-surface-container/85 border border-primary-container/30 overflow-hidden hover:border-primary/70 transition-all duration-300 slide-card-hover shadow-xl ${item.spanClass || ''}">
      <div class="relative w-full ${item.aspectClass} overflow-hidden bg-surface-container-lowest">
        <img src="${resolveInitialSrc(item)}" alt="${item.title}" loading="lazy" decoding="async"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onerror="handleImageError(this, '${key}', ${idx})">
        <div class="absolute inset-0 bg-primary-container/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span class="w-11 h-11 rounded-full bg-surface/90 text-white flex items-center justify-center shadow-lg border border-primary/40">
            <span class="material-symbols-outlined text-[22px]">zoom_in</span>
          </span>
        </div>
      </div>
    </div>`;
}
function renderWiseLabCards() {
  const storyGrid = document.getElementById('wiselab-story-grid');
  const webGrid = document.getElementById('wiselab-web-grid');
  if (!storyGrid || !webGrid) return;

  const stories = [], webs = [];
  portfolioCollections.wiselab.forEach((item, idx) => {
    const isWeb = item.subGroup === 'web';
    const html = buildBrandCardHTML(item, 'wiselab', idx, 'WiseLab',
      isWeb ? 'text-secondary' : 'text-primary',
      isWeb ? 'bg-secondary-container/90' : 'bg-primary-container/90',
      isWeb ? 'desktop_windows' : 'smart_display');
    (isWeb ? webs : stories).push(html);
  });
  storyGrid.innerHTML = stories.join('');
  webGrid.innerHTML = webs.join('');
}

function renderGentiliSlides() {
  const grid = document.getElementById('gentili-slides-grid');
  if (!grid) return;

  // 26 slayt tek bir kartta toplanır; tıklayınca tam ekran slayt gösterisi açılır.
  const slides = portfolioCollections.gentili;
  const cover = slides[0];
  grid.className = 'grid grid-cols-1';
  grid.innerHTML = `
    <div class="pr-3 pb-3 max-w-3xl w-full">
      <div onclick="openLightbox('gentili', 0)" onkeydown="if(event.key==='Enter'){openLightbox('gentili', 0)}" role="button" tabindex="0" aria-label="Gentili Aesthetics sunumunu aç"
        class="cursor-pointer group relative slide-card-hover">
        <div class="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-surface-container-high/60 border border-primary-container/20"></div>
        <div class="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl bg-surface-container/80 border border-primary-container/25"></div>
        <div class="relative rounded-2xl bg-surface-container/90 border border-primary-container/30 group-hover:border-primary/70 overflow-hidden shadow-xl transition-colors">
          <div class="relative w-full aspect-video overflow-hidden bg-[#f4f4f2]">
            <img src="${resolveInitialSrc(cover)}" alt="${cover.title}" loading="lazy" decoding="async"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onerror="handleImageError(this, 'gentili', 0)">
            <div class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface/90 text-white font-label-sm text-[11px] backdrop-blur-md border border-primary/25">${slides.length} Slayt</div>
            <div class="absolute inset-0 bg-primary-container/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span class="w-12 h-12 rounded-full bg-surface/90 text-white flex items-center justify-center shadow-lg border border-primary/40">
                <span class="material-symbols-outlined text-[24px]">slideshow</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}
function renderNewBrands() {
  const fpGrid = document.getElementById('fpakademi-grid');
  if (fpGrid) {
    fpGrid.innerHTML = portfolioCollections.fpakademi.map((item, idx) =>
      buildBrandCardHTML(item, 'fpakademi', idx, 'FP Akademi', 'text-emerald-400', 'bg-emerald-700/90', 'build_circle')).join('');
  }
  const adanaGrid = document.getElementById('adanaocakbasi-grid');
  if (adanaGrid) {
    adanaGrid.innerHTML = portfolioCollections.adanaocakbasi.map((item, idx) =>
      buildBrandCardHTML(item, 'adanaocakbasi', idx, 'Adana Ocakbaşı', 'text-amber-400', 'bg-amber-800/90', 'auto_awesome')).join('');
  }
  const zeytinGrid = document.getElementById('zeytin-grid');
  if (zeytinGrid) {
    zeytinGrid.innerHTML = portfolioCollections.zeytin.map((item, idx) =>
      buildBrandCardHTML(item, 'zeytin', idx)).join('');
  }
  const musiumGrid = document.getElementById('musiumai-grid');
  if (musiumGrid) {
    musiumGrid.innerHTML = portfolioCollections.musiumai.map((item, idx) =>
      buildBrandCardHTML(item, 'musiumai', idx)).join('');
  }
  const posterGrid = document.getElementById('posterler-grid');
  if (posterGrid) {
    posterGrid.innerHTML = portfolioCollections.posterler.map((item, idx) =>
      buildBrandCardHTML(item, 'posterler', idx)).join('');
  }
  const subapsanGrid = document.getElementById('subapsan-grid');
  if (subapsanGrid) {
    subapsanGrid.innerHTML = portfolioCollections.subapsan.map((item, idx) =>
      buildBrandCardHTML(item, 'subapsan', idx)).join('');
  }
}

function renderUnifiedShowcaseGrid() {
  const grid = document.getElementById('showcase-grid');
  if (!grid) return;

  const brandNames = { wiselab: 'WiseLab Supplement', gentili: 'Gentili Aesthetics', fpakademi: 'FP Akademi', adanaocakbasi: 'Adana Ocakbaşı' };
  const all = Object.keys(brandNames).flatMap(key =>
    portfolioCollections[key].map((item, idx) => ({ ...item, collectionKey: key, collectionIdx: idx, brandName: brandNames[key] })));

  grid.innerHTML = all.map(p => `
    <div data-category="${p.showcaseCat}" onclick="openLightbox('${p.collectionKey}', ${p.collectionIdx})"
      class="showcase-card cursor-pointer rounded-2xl bg-surface-container/80 border border-primary-container/30 backdrop-blur-xl p-space-md flex flex-col justify-between gap-space-sm hover:border-primary/60 transition-all duration-300 group slide-card-hover">
      <div class="flex flex-col gap-space-sm">
        <div class="w-full h-52 rounded-xl overflow-hidden relative bg-surface-container-high">
          <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="${p.title}" loading="lazy" decoding="async"
            src="${resolveInitialSrc(p)}" onerror="handleImageError(this, '${p.collectionKey}', ${p.collectionIdx})">
          <div class="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-surface/85 text-white font-label-sm text-[10px] backdrop-blur-md border border-primary/20">${p.showcaseCat}</div>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-label-sm text-label-sm text-primary font-semibold uppercase tracking-wider">${p.brandName}</span>
          <h4 class="font-headline-sm text-headline-sm text-white font-bold leading-tight line-clamp-1">${p.title}</h4>
          <p class="font-body-md text-body-md text-on-surface-variant line-clamp-2 text-[12px]">${p.desc}</p>
        </div>
      </div>
      <div class="pt-space-sm border-t border-surface-container-high flex items-center justify-between text-outline font-label-sm text-label-sm">
        <span>${p.dimensions}</span>
        <span class="text-primary flex items-center gap-1 font-semibold"><span>Aç</span><span class="material-symbols-outlined text-[16px]">open_in_full</span></span>
      </div>
    </div>`).join('');
}

function renderAllPortfolios() {
  renderWiseLabCards();
  renderGentiliSlides();
  renderNewBrands();
  renderUnifiedShowcaseGrid();
}

/* =========================================================
   5. FİLTRELER
   ========================================================= */
const ACTIVE_TAB = ['bg-primary-container', 'text-white', 'shadow-[0_0_16px_rgba(105,55,158,0.5)]'];
const IDLE_TAB = ['text-on-surface-variant', 'hover:text-white', 'hover:bg-surface-container-high'];

function setActiveTab(buttons, active) {
  buttons.forEach(b => { b.classList.remove(...ACTIVE_TAB); b.classList.add(...IDLE_TAB); });
  active.classList.add(...ACTIVE_TAB);
  active.classList.remove(...IDLE_TAB);
}

function initBrandFilters() {
  const buttons = document.querySelectorAll('.brand-tab-btn');
  const brandMap = {
    wiselab: document.getElementById('brand-section-wiselab'),
    gentili: document.getElementById('brand-section-gentili'),
    fpakademi: document.getElementById('brand-section-fpakademi'),
    adanaocakbasi: document.getElementById('brand-section-adanaocakbasi'),
    zeytin: document.getElementById('brand-section-zeytin'),
    musiumai: document.getElementById('brand-section-musiumai'),
    subapsan: document.getElementById('brand-section-subapsan'),
    posterler: document.getElementById('brand-section-posterler')
  };

  buttons.forEach(btn => btn.addEventListener('click', () => {
    const filter = btn.dataset.brandFilter;
    setActiveTab(buttons, btn);
    Object.entries(brandMap).forEach(([key, el]) => {
      if (el) el.classList.toggle('hidden', !(filter === 'all' || filter === key));
    });
  }));

  const subButtons = document.querySelectorAll('.wiselab-sub-btn');
  const groups = document.querySelectorAll('.wiselab-group');
  subButtons.forEach(btn => btn.addEventListener('click', () => {
    const format = btn.dataset.wiselabFormat;
    subButtons.forEach(b => {
      b.classList.remove('bg-secondary-container', 'text-white', 'shadow-sm');
      b.classList.add('text-on-surface-variant', 'hover:text-white');
    });
    btn.classList.add('bg-secondary-container', 'text-white', 'shadow-sm');
    btn.classList.remove('text-on-surface-variant', 'hover:text-white');
    groups.forEach(g => g.classList.toggle('hidden', !(format === 'all' || g.dataset.wiselabGroup === format)));
  }));
}

function initShowcaseFilters() {
  const buttons = document.querySelectorAll('.showcase-tab-btn');
  buttons.forEach(btn => btn.addEventListener('click', () => {
    const category = btn.dataset.showcaseFilter;
    setActiveTab(buttons, btn);
    document.querySelectorAll('.showcase-card').forEach(card => {
      card.classList.toggle('hidden', !(category === 'all' || card.dataset.category === category));
    });
  }));
}

/* =========================================================
   6. LIGHTBOX
   ========================================================= */
let activeCollectionKey = 'gentili';
let activeIndex = 0;

function openLightbox(key, index) {
  activeCollectionKey = key;
  activeIndex = index;
  document.getElementById('lightbox-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  updateLightboxView();
}

function closeLightbox() {
  document.getElementById('lightbox-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

function navigateLightbox(step) {
  const list = portfolioCollections[activeCollectionKey];
  if (!list || list.length <= 1) return;
  activeIndex = (activeIndex + step + list.length) % list.length;
  updateLightboxView();
}

function updateLightboxView() {
  const list = portfolioCollections[activeCollectionKey];
  const item = list[activeIndex];
  if (!item) return;

  const imgEl = document.getElementById('lightbox-img');
  const multi = list.length > 1;

  document.getElementById('lightbox-badge').textContent = `${item.tag} • ${item.dimensions || ''}`;
  document.getElementById('lightbox-counter').textContent = multi ? `Tasarım ${activeIndex + 1} / ${list.length}` : 'Tekil Önizleme';
  document.getElementById('lightbox-title').textContent = item.title;
  document.getElementById('lightbox-desc').textContent = item.desc;
  document.getElementById('lightbox-prev').style.display = multi ? 'flex' : 'none';
  document.getElementById('lightbox-next').style.display = multi ? 'flex' : 'none';

  imgEl.dataset.fallbackStage = "0";
  imgEl.onerror = () => handleImageError(imgEl, activeCollectionKey, activeIndex);
  imgEl.src = resolveFullSrc(item);
  imgEl.alt = item.title;

  document.getElementById('lightbox-thumbs').innerHTML = multi ? list.map((s, i) => `
    <button type="button" onclick="activeIndex=${i}; updateLightboxView();"
      class="px-3 py-1 rounded-full font-label-sm text-xs transition-all shrink-0 ${i === activeIndex ? 'bg-primary-container text-white font-bold shadow-[0_0_12px_rgba(105,55,158,0.6)]' : 'bg-surface-container text-on-surface-variant hover:text-white'}">${s.slideNum}</button>`).join('') : '';
}

document.addEventListener('keydown', (e) => {
  if (document.getElementById('lightbox-modal').classList.contains('hidden')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
});

document.getElementById('lightbox-modal').addEventListener('click', (e) => {
  if (e.target.id === 'lightbox-modal' || e.target.id === 'lightbox-stage') closeLightbox();
});

/* =========================================================
   7. MOBİL MENÜ, FORM, CV TOAST, YETENEK ÇUBUKLARI
   ========================================================= */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  document.querySelectorAll('.mobile-nav-link').forEach(l => l.addEventListener('click', () => mobileMenu.classList.add('hidden')));
}

const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Form içeriği WhatsApp mesajına çevrilip sohbet penceresi açılır.
    const WHATSAPP_NUMBER = "905455007587";
    const name = contactForm.querySelector('input[type="text"]').value.trim();
    const email = contactForm.querySelector('input[type="email"]').value.trim();
    const topic = document.getElementById('contact-topic').value.trim();
    const message =
      "Merhaba Muharrem, sitenizden proje talebi gönderiyorum.\n\n" +
      "Ad Soyad: " + name + "\n" +
      "E-Posta: " + email + "\n" +
      "Konu: " + topic;
    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message), "_blank", "noopener");
    formFeedback.classList.remove('hidden');
    contactForm.reset();
    setTimeout(() => formFeedback.classList.add('hidden'), 6000);
  });
}

function initSkillBarAnimation() {
  const container = document.getElementById('skills-bars-container');
  const bars = document.querySelectorAll('.skill-progress-bar');
  if (!container || !bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bars.forEach(bar => { bar.style.width = bar.dataset.targetWidth; });
        observer.disconnect();
      }
    });
  }, { threshold: 0.25 });
  observer.observe(container);
}

/* =========================================================
   8. THREE.JS HERO SAHNESİ
   ========================================================= */
function initThreeHero() {
  const container = document.getElementById('hero-3d-scene');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 6.5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  container.appendChild(renderer.domElement);

  const mainGroup = new THREE.Group();
  mainGroup.position.set(window.innerWidth > 1024 ? 2.1 : 0.6, -0.1, 0);
  scene.add(mainGroup);

  scene.add(new THREE.AmbientLight(0x38bdf8, 1.2));
  const dir1 = new THREE.DirectionalLight(0xa855f7, 2.8); dir1.position.set(5, 6, 4); scene.add(dir1);
  const dir2 = new THREE.DirectionalLight(0x38bdf8, 2.0); dir2.position.set(-6, -4, 3); scene.add(dir2);
  const pointLight = new THREE.PointLight(0xc084fc, 3.5, 12); mainGroup.add(pointLight);

  const wireframeIco = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.2, 1),
    new THREE.MeshStandardMaterial({ color: 0xc084fc, wireframe: true, transparent: true, opacity: 0.95, roughness: 0.2, metalness: 0.8 })
  );
  mainGroup.add(wireframeIco);

  const innerCrystal = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.25, 0),
    new THREE.MeshPhongMaterial({ color: 0x69379e, emissive: 0x3d2984, specular: 0xa855f7, shininess: 90, transparent: true, opacity: 0.88, flatShading: true })
  );
  mainGroup.add(innerCrystal);

  const rings = [
    { radius: 2.8, tube: 0.025, color: 0xa855f7, rotX: 1.1, rotY: 0.4 },
    { radius: 3.3, tube: 0.02, color: 0x6366f1, rotX: 0.5, rotY: 1.3 },
    { radius: 3.7, tube: 0.018, color: 0x38bdf8, rotX: -0.8, rotY: 0.9 }
  ].map(p => {
    const mesh = new THREE.Mesh(
      new THREE.TorusGeometry(p.radius, p.tube, 16, 100),
      new THREE.MeshBasicMaterial({ color: p.color, transparent: true, opacity: 0.85 })
    );
    mesh.rotation.x = p.rotX; mesh.rotation.y = p.rotY;
    mainGroup.add(mesh);
    return { mesh };
  });

  const satGeo = new THREE.OctahedronGeometry(0.14, 0);
  const satMat = new THREE.MeshStandardMaterial({ color: 0xefdbff, emissive: 0x69379e, roughness: 0.3, metalness: 0.9 });
  const satellites = Array.from({ length: 10 }, (_, i) => {
    const mesh = new THREE.Mesh(satGeo, satMat);
    mainGroup.add(mesh);
    return { mesh, orbitRadius: 2.6 + Math.random() * 1.4, speed: 0.008 + Math.random() * 0.012, angle: (i / 10) * Math.PI * 2, yOffset: (Math.random() - 0.5) * 1.8 };
  });

  const count = 240;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    pos[i] = (Math.random() - 0.5) * 9;
    pos[i + 1] = (Math.random() - 0.5) * 9;
    pos[i + 2] = (Math.random() - 0.5) * 6;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.045, color: 0xc0c1ff, transparent: true, opacity: 0.75 }));
  mainGroup.add(particles);

  let targetRotX = 0, targetRotY = 0;
  window.addEventListener('mousemove', (e) => {
    targetRotY = ((e.clientX / window.innerWidth) * 2 - 1) * 0.45;
    targetRotX = (e.clientY / window.innerHeight * 2 - 1) * 0.35;
  });

  window.addEventListener('resize', () => {
    const w = container.clientWidth, h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    mainGroup.position.x = w > 1024 ? 2.1 : (w > 640 ? 1.0 : 0);
  });

  // Hero ekranda değilken 3B animasyonu durdur (kasmayı azaltır).
  let heroVisible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; }).observe(container);
  }

  (function animate() {
    requestAnimationFrame(animate);
    if (!heroVisible) return;
    wireframeIco.rotation.y += 0.006; wireframeIco.rotation.x += 0.003;
    innerCrystal.rotation.y -= 0.009; innerCrystal.rotation.z += 0.005;
    rings.forEach((r, i) => { r.mesh.rotation.z += 0.004 * (i % 2 === 0 ? 1 : -1); r.mesh.rotation.y += 0.003; });
    satellites.forEach(s => {
      s.angle += s.speed;
      s.mesh.position.set(Math.cos(s.angle) * s.orbitRadius, s.yOffset + Math.sin(s.angle * 2) * 0.3, Math.sin(s.angle) * s.orbitRadius);
      s.mesh.rotation.x += 0.02; s.mesh.rotation.y += 0.02;
    });
    particles.rotation.y -= 0.0015;
    mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.05;
    mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.05;
    renderer.render(scene, camera);
  })();
}

/* =========================================================
   9. BAŞLAT
   ========================================================= */
window.addEventListener('DOMContentLoaded', () => {
  renderAllPortfolios();
  initBrandFilters();
  initShowcaseFilters();
  initSkillBarAnimation();
});
window.addEventListener('load', initThreeHero);
