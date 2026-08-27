import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { Gauge, Phone, Trophy, Search, X, ChevronDown, Car, MapPin, Globe, Lock, ChevronLeft, ChevronRight, HelpCircle, ArrowRight } from "lucide-react";

/* ============================================================
   1. THEME
   ============================================================ */
const THEME = {
  bg: "#0b0e11",
  card: "#151a1f",
  line: "#272f38",
  text: "#f2f4f6",
  muted: "#7b8794",
  accent: "#d0202c",
  second: "#f2f4f6",
  warn: "#f0b429",
  btn: "#181e25",
  r: { card: 6, btn: 3 },
  pad: 11,
  gap: 6,
};
const ThemeCtx = createContext(THEME);
const useT = () => useContext(ThemeCtx);

const MONO = "ui-monospace, SFMono-Regular, SF Mono, Menlo, monospace";

/* ============================================================
   2. APP / BANNER
   ============================================================ */
const BANNER_SRC = "./banner.png";
const APP = {
  name: "MgRemaps",
  dev: "MgRemaps",
  version: "1.0.0",
  privacy: "https://devmaindragon.github.io/mgremaps/privacy.html",
  support: "https://devmaindragon.github.io/mgremaps/support.html",
  about: "https://devmaindragon.github.io/mgremaps/about.html",
  // Leaderboard JSON — depoya yükleyip bu adresi güncelle
  leaderboard:
    "https://raw.githubusercontent.com/devmaindragon/mgremaps/main/public/leaderboard.json",
  recent: "https://raw.githubusercontent.com/devmaindragon/mgremaps/main/public/recent.json",
};

/* ============================================================
   3. STR — çeviriler
   ============================================================ */
const STR = {
  tr: {
    code: "tr-TR",
    nav: ["GÜÇ ARTIŞI", "BAYİ AĞIMIZ", "SÜRE TABLOSU"],
    pickVehicle: "ARAÇ SEÇ",
    pickHint: "Marka, model veya motor kodu ara",
    pickPrompt: "Başlamak için bir araç seç",
    notice: "Eksik araç modelleri güncellemelerle gelecektir, takipte kalın!",
    pickBrand: "MARKA SEÇ",
    pickModel: "MODEL SEÇ",
    back: "GERİ",
    recent: "ÖNE ÇIKAN ARAÇLAR",
    notFound: "Aracınızı bulamıyor musunuz?",
    notFoundBody: "Detaylı bilgi almak için bayilerimizle iletişime geçebilirsiniz.",
    wLead: "Motor yazılımı sonrası aracınızın ne kazanacağını, ölçümlere dayalı olarak gösterir.",
    wF1: "Stage 1, 2 ve 3 için hp ve tork eğrileri, gereken donanımla birlikte",
    wF2: "Bayi ağımızın il bazında iletişim bilgileri, tek dokunuşla arama",
    wF3: "100-200 km/h süre tablosu ve son yapılan araçlar",
    wTitle: "MgRemaps Asistan'a hoş geldiniz",
    wGo: "BAŞLA",
    brandHint: "Marka seçerek başla",
    search: "Ara",
    noResult: "Sonuç yok. Aramayı kısalt.",
    stock: "STOK",
    s1: "STAGE 1",
    s2: "STAGE 2",
    s3: "STAGE 3",
    s3off: "Bu araç için sunulmuyor",
    req: "gerekir",
    power: "GÜÇ",
    torque: "TORK",
    hp: "hp",
    nm: "Nm",
    rpm: "d/dk",
    gain: "KAZANIM",
    peak: "TEPE",
    disclaimer:
      "Değerler sağlıklı, bakımı yapılmış araçlar için tahminî kazanımlardır. Gerçek sonuç yakıt kalitesine, donanıma ve araç durumuna göre değişir.",
    dealers: "BAYİLER",
    dealerHint: "İl veya bayi adı ara",
    call: "ARA",
    board: "SIRALAMA",
    boardHint: "100-200 km/h ölçüm sıralaması",
    t100: "100-200 km/h",
    sec: "sn",
    loading: "Yükleniyor…",
    close: "KAPAT",
    lang: "DİL",
    about: "HAKKINDA",
    privacy: "GİZLİLİK",
    support: "DESTEK",
    ver: "SÜRÜM",
    grp: {
      marmara: "MARMARA",
      ege: "EGE",
      ic: "İÇ ANADOLU",
      akdeniz: "AKDENİZ",
      karadeniz: "KARADENİZ",
      dogu: "DOĞU VE GÜNEYDOĞU",
    },
  },
  en: {
    code: "en-US",
    nav: ["POWER GAIN", "OUR DEALERS", "TIME TABLE"],
    pickVehicle: "SELECT VEHICLE",
    pickHint: "Search make, model or engine code",
    pickPrompt: "Select a vehicle to start",
    notice: "Missing vehicle models will arrive with updates — stay tuned!",
    pickBrand: "SELECT BRAND",
    pickModel: "SELECT MODEL",
    back: "BACK",
    recent: "FEATURED VEHICLES",
    notFound: "Can't find your vehicle?",
    notFoundBody: "Contact our dealers for detailed information.",
    wLead: "Shows what your vehicle gains after an ECU remap, based on measured results.",
    wF1: "Power and torque curves for Stage 1, 2 and 3, with the hardware each needs",
    wF2: "Dealer contacts by city, one-tap calling",
    wF3: "100-200 km/h time table and recent builds",
    wTitle: "Welcome to MgRemaps — Assistant",
    wGo: "START",
    brandHint: "Start by choosing a brand",
    search: "Search",
    noResult: "No match. Try a shorter search.",
    stock: "STOCK",
    s1: "STAGE 1",
    s2: "STAGE 2",
    s3: "STAGE 3",
    s3off: "Not offered for this vehicle",
    req: "required",
    power: "POWER",
    torque: "TORQUE",
    hp: "hp",
    nm: "Nm",
    rpm: "rpm",
    gain: "GAIN",
    peak: "PEAK",
    disclaimer:
      "Figures are estimated gains for healthy, well-maintained vehicles. Real results vary with fuel quality, hardware and condition.",
    dealers: "DEALERS",
    dealerHint: "Search city or dealer",
    call: "CALL",
    board: "LEADERBOARD",
    boardHint: "100-200 km/h ranking",
    t100: "100-200 km/h",
    sec: "s",
    loading: "Loading…",
    close: "CLOSE",
    lang: "LANGUAGE",
    about: "ABOUT",
    privacy: "PRIVACY",
    support: "SUPPORT",
    ver: "VERSION",
    grp: {
      marmara: "MARMARA",
      ege: "AEGEAN",
      ic: "CENTRAL ANATOLIA",
      akdeniz: "MEDITERRANEAN",
      karadeniz: "BLACK SEA",
      dogu: "EAST & SOUTHEAST",
    },
  },
  de: {
    code: "de-DE",
    nav: ["LEISTUNGSPLUS", "HÄNDLERNETZ", "ZEITTABELLE"],
    pickVehicle: "FAHRZEUG WÄHLEN",
    pickHint: "Marke, Modell oder Motorcode suchen",
    pickPrompt: "Fahrzeug wählen, um zu starten",
    notice: "Fehlende Modelle folgen mit Updates — bleiben Sie dran!",
    pickBrand: "MARKE WÄHLEN",
    pickModel: "MODELL WÄHLEN",
    back: "ZURÜCK",
    recent: "AUSGEWÄHLTE FAHRZEUGE",
    notFound: "Fahrzeug nicht gefunden?",
    notFoundBody: "Für Details wenden Sie sich an unsere Händler.",
    wLead: "Zeigt auf Basis gemessener Ergebnisse, was Ihr Fahrzeug nach dem Chiptuning gewinnt.",
    wF1: "Leistungs- und Drehmomentkurven für Stufe 1, 2 und 3 samt nötiger Hardware",
    wF2: "Händlerkontakte nach Stadt, Anruf mit einem Tipp",
    wF3: "100-200 km/h Zeittabelle und letzte Umbauten",
    wTitle: "Willkommen bei MgRemaps — Assistent",
    wGo: "LOSLEGEN",
    brandHint: "Zuerst eine Marke wählen",
    search: "Suchen",
    noResult: "Kein Treffer. Suche kürzen.",
    stock: "SERIE",
    s1: "STUFE 1",
    s2: "STUFE 2",
    s3: "STUFE 3",
    s3off: "Für dieses Fahrzeug nicht verfügbar",
    req: "erforderlich",
    power: "LEISTUNG",
    torque: "DREHMOMENT",
    hp: "PS",
    nm: "Nm",
    rpm: "U/min",
    gain: "ZUWACHS",
    peak: "SPITZE",
    disclaimer:
      "Werte sind geschätzte Zuwächse für gesunde, gewartete Fahrzeuge. Ergebnisse variieren je nach Kraftstoff, Hardware und Zustand.",
    dealers: "HÄNDLER",
    dealerHint: "Stadt oder Händler suchen",
    call: "ANRUFEN",
    board: "RANGLISTE",
    boardHint: "100-200 km/h Rangliste",
    t100: "100-200 km/h",
    sec: "s",
    loading: "Wird geladen…",
    close: "SCHLIESSEN",
    lang: "SPRACHE",
    about: "ÜBER",
    privacy: "DATENSCHUTZ",
    support: "SUPPORT",
    ver: "VERSION",
    grp: {
      marmara: "MARMARA",
      ege: "ÄGÄIS",
      ic: "ZENTRALANATOLIEN",
      akdeniz: "MITTELMEER",
      karadeniz: "SCHWARZES MEER",
      dogu: "OST & SÜDOST",
    },
  },
};
const LANGS = [
  ["tr", "Türkçe"],
  ["en", "English"],
  ["de", "Deutsch"],
];

const LS_KEY = "mg.lang";
const LS_SEEN = "mg.seen";
function seenWelcome() {
  try {
    return localStorage.getItem(LS_SEEN) === "1";
  } catch (e) {
    return false;
  }
}
function markWelcome() {
  try {
    localStorage.setItem(LS_SEEN, "1");
  } catch (e) {}
}
function detectLang() {
  try {
    const saved = localStorage.getItem(LS_KEY);
    if (saved && STR[saved]) return saved;
  } catch (e) {}
  try {
    const list = navigator.languages || [navigator.language || "en"];
    for (const l of list) {
      const c = String(l).slice(0, 2).toLowerCase();
      if (STR[c]) return c;
    }
  } catch (e) {}
  return "en";
}
function rememberLang(l) {
  try {
    localStorage.setItem(LS_KEY, l);
  } catch (e) {}
}

/* ============================================================
   4. SAF HESAP — dyno eğrisi
   Tork şekli üretilir, güç P = T * rpm / 7127 ile türetilir.
   Her iki eğri de veri tepe değerine ölçeklenir.
   ============================================================ */
const IDLE = 1000;
const N_PTS = 120;

/* Fritsch-Carlson monotonik kübik. Düz doğrusal ara değerin köşeleri yerine
   yumuşak geçiş verir, normal kübik spline'ın aşımını da yapmaz. */
function pchip(xs, ys) {
  const n = xs.length,
    d = [],
    m = [];
  for (let i = 0; i < n - 1; i++) d.push((ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]));
  m.push(d[0]);
  for (let i = 1; i < n - 1; i++) m.push(d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2);
  m.push(d[n - 2]);
  for (let i = 0; i < n - 1; i++) {
    if (d[i] === 0) {
      m[i] = 0;
      m[i + 1] = 0;
      continue;
    }
    const a = m[i] / d[i],
      b = m[i + 1] / d[i],
      ss = a * a + b * b;
    if (ss > 9) {
      const q = 3 / Math.sqrt(ss);
      m[i] = q * a * d[i];
      m[i + 1] = q * b * d[i];
    }
  }
  return (x) => {
    if (x <= xs[0]) return ys[0];
    if (x >= xs[n - 1]) return ys[n - 1];
    let i = 0;
    while (x > xs[i + 1]) i++;
    const h = xs[i + 1] - xs[i],
      u = (x - xs[i]) / h,
      u2 = u * u,
      u3 = u2 * u;
    return (
      ys[i] * (2 * u3 - 3 * u2 + 1) +
      h * m[i] * (u3 - 2 * u2 + u) +
      ys[i + 1] * (-2 * u3 + 3 * u2) +
      h * m[i + 1] * (u3 - u2)
    );
  };
}

/* Tork şablonu — tepe devrine göre MUTLAK kayma (d/dk) ile tanımlı.
   Tepe torku 3000'e konunca: 1000-2000 arası DÜZ (-2000 ve -1000 düğümleri
   eşit, o yüzden eğim tam sıfır), 2000'den sonra sert tırmanış, 3000'de tepe. Tepe devri 3500'e konunca (büyük turbo)
   aynı şekil olduğu gibi 500 d/dk yukarı kayar. */
const T_OFF = [-3000, -2500, -2000, -1000, -750, -500, -250, 0];
const T_VAL = [0.18, 0.24, 0.3, 0.3, 0.46, 0.72, 0.93, 1];

function buildCurves(peakHp, peakNm, tRpm, pRpm, rl, diesel) {
  const t0 = Math.max(2200, Math.min(tRpm, rl - 900));
  const target = Math.max(t0 + 400, Math.min(pRpm, rl - 200));
  const f = pchip(T_OFF.map((o) => t0 + o), T_VAL);
  const step = (rl - IDLE) / (N_PTS - 1);

  const sample = (dEnd) => {
    const a = [];
    for (let i = 0; i < N_PTS; i++) {
      const r = IDLE + i * step;
      a.push([r, r <= t0 ? f(r) : 1 - dEnd * Math.pow((r - t0) / (rl - t0), 1.7)]);
    }
    // tepe geçişindeki sertliği al
    for (let k = 0; k < 3; k++) {
      const c = a.map((z) => z[1]);
      for (let i = 1; i < a.length - 1; i++) a[i][1] = (c[i - 1] + 2 * c[i] + c[i + 1]) / 4;
    }
    return a;
  };
  const hpPeakOf = (a) => a.reduce((x, y) => (y[1] * y[0] > x[1] * x[0] ? y : x))[0];

  let lo = 0.01,
    hi = 0.95;
  for (let i = 0; i < 28; i++) {
    const mid = (lo + hi) / 2;
    if (hpPeakOf(sample(mid)) > target) lo = mid;
    else hi = mid;
  }
  const s = sample((lo + hi) / 2);

  const sMax = Math.max(...s.map((a) => a[1])) || 1;
  const nm = s.map(([r, v]) => [r, (v / sMax) * peakNm]);

  const raw = nm.map(([r, v]) => [r, (v * r) / 7127]);
  const pMax = Math.max(...raw.map((a) => a[1])) || 1;
  const hp = raw.map(([r, v]) => [r, (v / pMax) * peakHp]);

  return { hp, nm };
}

/* ============================================================
   5. VERİ
   ============================================================ */
/* Araç: g=marka, m=model, y=yıl, e=motor kodu, d=dizel mi,
   hp=[stok,s1,s2], nm=[stok,s1,s2], t=tork tepe d/dk, p=güç tepe d/dk, rl=devir sınırı
   s3 = isteğe bağlı büyük turbo paketi: { l:ad, hp, nm, t, p, rl }
        alan yoksa Stage 3 kartı gri ve tıklanamaz görünür */
/* Dyno kuralı tüm araçlarda ortak, araca göre değişmez:
   tork tepesi 3000, güç tepesi 5500, grafik 6500'e kadar.
   Stage 3 (büyük turbo) aynı şeklin 500 d/dk yukarı kaymış hâli. */
const RPM = { t: 3000, p: 5500, rl: 6500 };
const RPM3 = { t: 3500, p: 6000, rl: 6500 };

/* Tork katsayısı. Elimizdeki tablo yalnızca beygir veriyor; Nm buradan
   türetilir. Seviye yükseldikçe tork/beygir oranı bir miktar düşer, dizelde
   oran benzinliye göre çok daha yüksektir. Bir araca gerçek ölçüm gelirse
   satıra nm: [stok, s1, s2] yazmak yeterli, o zaman katsayı devreye girmez. */
const NM_K = { p: [1.45, 1.4, 1.35, 1.33], d: [2.1, 2.05, 2.0, 2.0] };
const torqueOf = (hp, diesel, stage) =>
  hp == null ? null : Math.round((hp * NM_K[diesel ? "d" : "p"][stage]) / 5) * 5;

const VEHICLES = [
  { id: "vw-polo-6r-1-4-tsi-ea111-180", g: "VW Polo 6R", m: "1.4 TSI EA111", y: "2009-2014", e: "180 hp stok", d: false,
    hp: [180, 210, 220], n2: "Downpipe + Dsg yazılımı", ...RPM,
    s3: { l: "Oem Hybrid + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "vw-polo-6r-1-2-tsi-ea111-105", g: "VW Polo 6R", m: "1.2 TSI EA111", y: "2009-2014", e: "105 hp stok", d: false,
    hp: [105, 130, 140], n2: "Downpipe", ...RPM },
  { id: "vw-polo-6r-1-4-tsi-ea211-150", g: "VW Polo 6R", m: "1.4 TSI EA211", y: "2009-2014", e: "150 hp stok", d: false,
    hp: [150, 180, 200], n2: "Downpipe+Dsg Yazılımı", ...RPM },
  { id: "vw-polo-6r-1-6-tdi-cay-90", g: "VW Polo 6R", m: "1.6 TDI CAY", y: "2009-2014", e: "90 hp stok", d: true,
    hp: [90, 135, 150], n2: "Downpipe", ...RPM,
    s3: { l: "Oem Hybrid + Dsg yazılımı", hp: 200, ...RPM3 } },

  { id: "vw-scirocco-1-4-tsi-ea111-122", g: "VW Scirocco", m: "1.4 TSI EA111", y: "2009-2016", e: "122 hp stok", d: false,
    hp: [122, 145, 160], n2: "Downpipe + Dsg yazılımı", ...RPM },
  { id: "vw-scirocco-1-4-tsi-ea111-160", g: "VW Scirocco", m: "1.4 TSI EA111", y: "2009-2016", e: "160 hp stok", d: false,
    hp: [160, 200, 220], n2: "Downpipe + Dsg yazılımı", ...RPM,
    s3: { l: "Oem Hybrid + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "vw-scirocco-1-4-tsi-ea211-150", g: "VW Scirocco", m: "1.4 TSI EA211", y: "2009-2016", e: "150 hp stok", d: false,
    hp: [150, 180, 200], n2: "Downpipe+Dsg Yazılımı", ...RPM },

  { id: "vw-golf-6-1-2-tsi-ea111-105", g: "VW Golf 6", m: "1.2 TSI EA111", y: "2008-2012", e: "105 hp stok", d: false,
    hp: [105, 130, 140], n2: "Downpipe", ...RPM },
  { id: "vw-golf-6-1-4-tsi-ea111-122", g: "VW Golf 6", m: "1.4 TSI EA111", y: "2008-2012", e: "122 hp stok", d: false,
    hp: [122, 145, 160], n2: "Downpipe + Dsg yazılımı", ...RPM },
  { id: "vw-golf-6-1-4-tsi-ea111-160", g: "VW Golf 6", m: "1.4 TSI EA111", y: "2008-2012", e: "160 hp stok", d: false,
    hp: [160, 200, 220], n2: "Downpipe + Dsg yazılımı", ...RPM,
    s3: { l: "Oem Hybrid + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "vw-golf-6-1-6-tdi-cay-105", g: "VW Golf 6", m: "1.6 TDI CAY", y: "2008-2012", e: "105 hp stok", d: true,
    hp: [105, 135, 150], n2: "Downpipe", ...RPM,
    s3: { l: "Oem Hybrid + Dsg yazılımı", hp: 200, ...RPM3 } },
  { id: "vw-golf-6-gti-2-0-tsi-ea113-210", g: "VW Golf 6", m: "Gti 2.0 TSI EA113", y: "2008-2012", e: "210 hp stok", d: false,
    hp: [210, 260, 275], n2: "Downpipe + Dsg yazılımı", ...RPM,
    s3: { l: "K04-64 Turbo + DSG Yazılımı", hp: 320, ...RPM3 } },
  { id: "vw-golf-6-r-2-0-tsi-ea113-270", g: "VW Golf 6", m: "R 2.0 TSI EA113", y: "2008-2012", e: "270 hp stok", d: false,
    hp: [270, 310, 330], n2: "Downpipe + Dsg yazılımı", ...RPM,
    s3: { l: "Oem Hybrid + Dsg yazılımı", hp: 370, ...RPM3 } },

  { id: "vw-golf-7-1-0-tsi-85", g: "VW Golf 7", m: "1.0 TSI", y: "2012-2020", e: "85 hp stok", d: false,
    hp: [85, 130, null], ...RPM },
  { id: "vw-golf-7-1-4-tsi-ea211-125", g: "VW Golf 7", m: "1.4 TSI EA211", y: "2012-2020", e: "125 hp stok", d: false,
    hp: [125, 155, 165], n2: "Downpipe", ...RPM,
    s3: { l: "IS20 Turbo + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "vw-golf-7-1-4-tsi-ea211-140", g: "VW Golf 7", m: "1.4 TSI EA211", y: "2012-2020", e: "140 hp stok", d: false,
    hp: [140, 170, 220], n2: "Hybrid Turbo + Dsg yazılımı", ...RPM,
    s3: { l: "IS20 Turbo + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "vw-golf-7-1-2-tsi-ea211-105", g: "VW Golf 7", m: "1.2 TSI EA211", y: "2012-2020", e: "105 hp stok", d: false,
    hp: [105, 130, 140], n2: "Downpipe", ...RPM,
    s3: { l: "IHI 140 Turbo", hp: 170, ...RPM3 } },
  { id: "vw-golf-7-1-6-tdi-105", g: "VW Golf 7", m: "1.6 TDI", y: "2012-2020", e: "105 hp stok", d: true,
    hp: [105, 145, 150], n2: "Downpipe", ...RPM,
    s3: { l: "1449 Turbo + Dsg yazılımı", hp: 200, ...RPM3 } },
  { id: "vw-golf-7-gti-2-0-tsi-ea888-220", g: "VW Golf 7", m: "GTI 2.0 TSI EA888", y: "2012-2020", e: "220 hp stok", d: false,
    hp: [220, 300, 320], n2: "Downpipe", ...RPM,
    s3: { l: "IS38 Turbo", hp: 380, ...RPM3 } },
  { id: "vw-golf-7-r-2-0-tsi-ea888-320", g: "VW Golf 7", m: "R 2.0 TSI EA888", y: "2012-2020", e: "320 hp stok", d: false,
    hp: [320, 350, 380], n2: "Downpipe", ...RPM,
    s3: { l: "2260s + Dsg Yazılımı", hp: 450, ...RPM3 } },

  { id: "vw-golf-8-1-5-tsi-evo-150", g: "VW Golf 8", m: "1.5 TSI Evo", y: "2020-202x", e: "150 hp stok", d: false,
    hp: [150, 180, 200], n2: "Downpipe+Dsg Yazılımı", ...RPM },
  { id: "vw-golf-8-gti-2-0-tsi-ea888-g4-245", g: "VW Golf 8", m: "GTI 2.0 TSI EA888 G4", y: "2020-202x", e: "245 hp stok", d: false,
    hp: [245, 340, 350], n2: "Downpipe+Dsg Yazılımı", ...RPM,
    s3: { l: "Continental Turbo + Dsg Yazılımı", hp: 400, ...RPM3 } },
  { id: "vw-golf-8-r-2-0-tsi-ea888-g4-320", g: "VW Golf 8", m: "R 2.0 TSI EA888 G4", y: "2020-202x", e: "320 hp stok", d: false,
    hp: [320, 380, 400], n2: "Downpipe+Dsg Yazılımı", ...RPM,
    s3: { l: "Powermax 2563s Turbo + Dsg", hp: 480, ...RPM3 } },

  { id: "vw-passat-b8-1-4-tsi-ea211-125", g: "VW Passat B8", m: "1.4 TSI EA211", y: "2014-2023", e: "125 hp stok", d: false,
    hp: [125, 155, 165], n2: "Downpipe", ...RPM,
    s3: { l: "IS20 Turbo + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "vw-passat-b8-1-4-tsi-ea211-150", g: "VW Passat B8", m: "1.4 TSI EA211", y: "2014-2023", e: "150 hp stok", d: false,
    hp: [150, 170, 220], n2: "Hybrid Turbo + Dsg yazılımı", ...RPM,
    s3: { l: "IS20 Turbo + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "vw-passat-b8-1-5-tsi-evo-150", g: "VW Passat B8", m: "1.5 TSI Evo", y: "2014-2023", e: "150 hp stok", d: false,
    hp: [150, 180, 200], n2: "Downpipe+Dsg Yazılımı", ...RPM },
  { id: "vw-passat-b8-1-6-tdi-105", g: "VW Passat B8", m: "1.6 TDI", y: "2014-2023", e: "105 hp stok", d: true,
    hp: [105, 145, 150], n2: "Downpipe", ...RPM,
    s3: { l: "1449 Turbo + Dsg yazılımı", hp: 200, ...RPM3 } },
  { id: "vw-passat-b8-2-0-tdi-190", g: "VW Passat B8", m: "2.0 TDI", y: "2014-2023", e: "190 hp stok", d: true,
    hp: [190, 220, 240], n2: "Downpipe", ...RPM },

  { id: "vw-jetta-1-2-tsi-ea111-105", g: "VW Jetta", m: "1.2 TSI EA111", y: "2011-2018", e: "105 hp stok", d: false,
    hp: [105, 130, 140], n2: "Downpipe", ...RPM },
  { id: "vw-jetta-1-4-tsi-ea111-122", g: "VW Jetta", m: "1.4 TSI EA111", y: "2011-2018", e: "122 hp stok", d: false,
    hp: [122, 145, 160], n2: "Downpipe + Dsg yazılımı", ...RPM },
  { id: "vw-jetta-1-4-tsi-ea111-160", g: "VW Jetta", m: "1.4 TSI EA111", y: "2011-2018", e: "160 hp stok", d: false,
    hp: [160, 200, 220], n2: "Downpipe+Dsg Yazılımı", ...RPM,
    s3: { l: "Oem Hybrid + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "vw-jetta-1-6-tdi-cay-105", g: "VW Jetta", m: "1.6 TDI CAY", y: "2011-2018", e: "105 hp stok", d: true,
    hp: [105, 135, 150], n2: "Downpipe", ...RPM,
    s3: { l: "Oem Hybrid + Dsg yazılımı", hp: 200, ...RPM3 } },

  { id: "vw-tiguan-1-4-tsi-ea211-150", g: "VW Tiguan", m: "1.4 TSI EA211", y: "2016-202x", e: "150 hp stok", d: false,
    hp: [150, 170, 220], n2: "Hybrid Turbo + Dsg yazılımı", ...RPM,
    s3: { l: "IS20 Turbo + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "vw-tiguan-1-5-tsi-evo-150", g: "VW Tiguan", m: "1.5 TSI Evo", y: "2016-202x", e: "150 hp stok", d: false,
    hp: [150, 180, 200], n2: "Downpipe+Dsg Yazılımı", ...RPM },
  { id: "vw-tiguan-1-6-tdi-115", g: "VW Tiguan", m: "1.6 TDI", y: "2016-202x", e: "115 hp stok", d: true,
    hp: [115, 145, 150], n2: "Downpipe", ...RPM,
    s3: { l: "1449 Turbo + Dsg yazılımı", hp: 200, ...RPM3 } },

  { id: "vw-t-roc-1-5-tsi-evo-150", g: "VW T-Roc", m: "1.5 TSI Evo", y: "2017-202x", e: "150 hp stok", d: false,
    hp: [150, 180, 200], n2: "Downpipe+Dsg Yazılımı", ...RPM },

  { id: "vw-cc-1-4-tsi-ea211-150", g: "VW CC", m: "1.4 TSI EA211", y: "2012-2017", e: "150 hp stok", d: false,
    hp: [150, 170, 220], n2: "Hybrid Turbo + Dsg yazılımı", ...RPM,
    s3: { l: "IS20 Turbo + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "vw-cc-1-4-tsi-ea111-160", g: "VW CC", m: "1.4 TSI EA111", y: "2012-2017", e: "160 hp stok", d: false,
    hp: [160, 200, 220], n2: "Downpipe+Dsg Yazılımı", ...RPM,
    s3: { l: "Oem Hybrid + Dsg yazılımı", hp: 280, ...RPM3 } },

  { id: "vw-arteon-1-5-tsi-evo-150", g: "VW Arteon", m: "1.5 TSI Evo", y: "2017-202x", e: "150 hp stok", d: false,
    hp: [150, 180, 200], n2: "Downpipe+Dsg Yazılımı", ...RPM },
  { id: "vw-arteon-2-0-tdi-190", g: "VW Arteon", m: "2.0 TDI", y: "2017-202x", e: "190 hp stok", d: true,
    hp: [190, 220, 240], n2: "Downpipe", ...RPM },

  { id: "seat-ibiza-1-2-tsi-ea111-105", g: "SEAT Ibiza", m: "1.2 TSI EA111", y: "2009-2017", e: "105 hp stok", d: false,
    hp: [105, 130, 140], n2: "Downpipe", ...RPM },
  { id: "seat-ibiza-1-4-tsi-ea111-180", g: "SEAT Ibiza", m: "1.4 TSI EA111", y: "2009-2017", e: "180 hp stok", d: false,
    hp: [180, 210, 220], n2: "Downpipe + Dsg yazılımı", ...RPM,
    s3: { l: "Oem Hybrid + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "seat-ibiza-1-5-tsi-evo-150", g: "SEAT Ibiza", m: "1.5 TSI Evo", y: "2020-202x", e: "150 hp stok", d: false,
    hp: [150, 180, 200], n2: "Downpipe+Dsg Yazılımı", ...RPM },
  { id: "seat-ibiza-1-6-tdi-cay-90", g: "SEAT Ibiza", m: "1.6 TDI CAY", y: "2009-2017", e: "90 hp stok", d: true,
    hp: [90, 135, 150], n2: "Downpipe", ...RPM,
    s3: { l: "Oem Hybrid + Dsg yazılımı", hp: 200, ...RPM3 } },

  { id: "seat-leon-1-2-tsi-ea211-105", g: "SEAT Leon", m: "1.2 TSI EA211", y: "2012-2020", e: "105 hp stok", d: false,
    hp: [105, 130, 140], n2: "Downpipe", ...RPM,
    s3: { l: "IHI 140 Turbo", hp: 170, ...RPM3 } },
  { id: "seat-leon-1-4-tsi-ea211-125", g: "SEAT Leon", m: "1.4 TSI EA211", y: "2012-2020", e: "125 hp stok", d: false,
    hp: [125, 155, 165], n2: "Downpipe", ...RPM,
    s3: { l: "IS20 Turbo + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "seat-leon-1-4-tsi-ea211-140", g: "SEAT Leon", m: "1.4 TSI EA211", y: "2012-2020", e: "140 hp stok", d: false,
    hp: [140, 170, 220], n2: "Hybrid Turbo + Dsg yazılımı", ...RPM,
    s3: { l: "IS20 Turbo + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "seat-leon-1-4-tsi-ea211-150", g: "SEAT Leon", m: "1.4 TSI EA211", y: "2012-2020", e: "150 hp stok", d: false,
    hp: [150, 170, 220], n2: "Hybrid Turbo + Dsg yazılımı", ...RPM,
    s3: { l: "IS20 Turbo + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "seat-leon-1-5-tsi-evo-150", g: "SEAT Leon", m: "1.5 TSI Evo", y: "2020-202x", e: "150 hp stok", d: false,
    hp: [150, 180, 200], n2: "Downpipe+Dsg Yazılımı", ...RPM },
  { id: "seat-leon-1-6-tdi-105", g: "SEAT Leon", m: "1.6 TDI", y: "2012-2020", e: "105 hp stok", d: true,
    hp: [105, 145, 150], n2: "Downpipe", ...RPM,
    s3: { l: "1449 Turbo + Dsg yazılımı", hp: 200, ...RPM3 } },
  { id: "seat-leon-2-0-tsi-ea888-280", g: "SEAT Leon", m: "2.0 TSI EA888", y: "2012-2020", e: "280 hp stok", d: false,
    hp: [280, 350, 380], n2: "Downpipe", ...RPM,
    s3: { l: "2260s + Dsg Yazılımı", hp: 450, ...RPM3 } },

  { id: "seat-arona-1-0-tsi-85", g: "SEAT Arona", m: "1.0 TSI", y: "2017-202x", e: "85 hp stok", d: false,
    hp: [85, 130, null], ...RPM },
  { id: "seat-arona-1-6-tdi-105", g: "SEAT Arona", m: "1.6 TDI", y: "2017-202x", e: "105 hp stok", d: true,
    hp: [105, 145, 150], n2: "Downpipe", ...RPM,
    s3: { l: "1449 Turbo + Dsg yazılımı", hp: 200, ...RPM3 } },
  { id: "seat-arona-1-5-tsi-evo-150", g: "SEAT Arona", m: "1.5 TSI Evo", y: "2017-202x", e: "150 hp stok", d: false,
    hp: [150, 180, 200], n2: "Downpipe+Dsg Yazılımı", ...RPM },

  { id: "seat-ateca-1-4-tsi-ea211-150", g: "SEAT Ateca", m: "1.4 TSI EA211", y: "2016-202x", e: "150 hp stok", d: false,
    hp: [150, 170, 220], n2: "Hybrid Turbo + Dsg yazılımı", ...RPM,
    s3: { l: "IS20 Turbo + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "seat-ateca-1-5-tsi-evo-150", g: "SEAT Ateca", m: "1.5 TSI Evo", y: "2016-202x", e: "150 hp stok", d: false,
    hp: [150, 180, 200], n2: "Downpipe+Dsg Yazılımı", ...RPM },
  { id: "seat-ateca-1-6-tdi-105", g: "SEAT Ateca", m: "1.6 TDI", y: "2016-202x", e: "105 hp stok", d: true,
    hp: [105, 145, 150], n2: "Downpipe", ...RPM,
    s3: { l: "1449 Turbo + Dsg yazılımı", hp: 200, ...RPM3 } },

  { id: "cupra-leon-1-5-tsi-evo-150", g: "CUPRA Leon", m: "1.5 TSI Evo", y: "2020-202x", e: "150 hp stok", d: false,
    hp: [150, 180, 200], n2: "Downpipe+Dsg Yazılımı", ...RPM },
  { id: "cupra-leon-2-0-tsi-ea888-g4-320", g: "CUPRA Leon", m: "2.0 TSI EA888 G4", y: "2020-202x", e: "320 hp stok", d: false,
    hp: [320, 380, 400], n2: "Downpipe+Dsg Yazılımı", ...RPM,
    s3: { l: "Powermax 2563s Turbo + Dsg", hp: 480, ...RPM3 } },

  { id: "cupra-formentor-1-5-tsi-evo-150", g: "CUPRA Formentor", m: "1.5 TSI Evo", y: "2020-202x", e: "150 hp stok", d: false,
    hp: [150, 180, 200], n2: "Downpipe+Dsg Yazılımı", ...RPM },
  { id: "cupra-formentor-2-0-tsi-ea888-g4-320", g: "CUPRA Formentor", m: "2.0 TSI EA888 G4", y: "2020-202x", e: "320 hp stok", d: false,
    hp: [320, 380, 400], n2: "Downpipe+Dsg Yazılımı", ...RPM,
    s3: { l: "Powermax 2563s Turbo + Dsg", hp: 480, ...RPM3 } },

  { id: "skoda-fabia-1-2-tsi-ea111-105", g: "Skoda Fabia", m: "1.2 TSI EA111", y: "2009-2014", e: "105 hp stok", d: false,
    hp: [105, 130, 140], n2: "Downpipe", ...RPM },
  { id: "skoda-fabia-1-4-tsi-ea111-180", g: "Skoda Fabia", m: "1.4 TSI EA111", y: "2009-2014", e: "180 hp stok", d: false,
    hp: [180, 210, 220], n2: "Downpipe + Dsg yazılımı", ...RPM,
    s3: { l: "Oem Hybrid + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "skoda-fabia-1-6-tdi-cay-90", g: "Skoda Fabia", m: "1.6 TDI CAY", y: "2009-2014", e: "90 hp stok", d: true,
    hp: [90, 135, 150], n2: "Downpipe", ...RPM,
    s3: { l: "Oem Hybrid + Dsg yazılımı", hp: 200, ...RPM3 } },

  { id: "skoda-rapid-1-2-tsi-ea111-105", g: "Skoda Rapid", m: "1.2 TSI EA111", y: "2012-2019", e: "105 hp stok", d: false,
    hp: [105, 130, 140], n2: "Downpipe", ...RPM },
  { id: "skoda-rapid-1-4-tsi-ea211-125", g: "Skoda Rapid", m: "1.4 TSI EA211", y: "2012-2019", e: "125 hp stok", d: false,
    hp: [125, 155, 165], n2: "Downpipe", ...RPM,
    s3: { l: "IS20 Turbo + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "skoda-rapid-1-6-tdi-cay-90", g: "Skoda Rapid", m: "1.6 TDI CAY", y: "2012-2019", e: "90 hp stok", d: true,
    hp: [90, 135, 150], n2: "Downpipe", ...RPM,
    s3: { l: "Oem Hybrid + Dsg yazılımı", hp: 200, ...RPM3 } },

  { id: "skoda-scala-1-0-tsi-85", g: "Skoda Scala", m: "1.0 TSI", y: "2019-202x", e: "85 hp stok", d: false,
    hp: [85, 130, null], ...RPM },
  { id: "skoda-scala-1-5-tsi-evo-150", g: "Skoda Scala", m: "1.5 TSI Evo", y: "2019-202x", e: "150 hp stok", d: false,
    hp: [150, 180, 200], n2: "Downpipe+Dsg Yazılımı", ...RPM },
  { id: "skoda-scala-1-6-tdi-105", g: "Skoda Scala", m: "1.6 TDI", y: "2019-202x", e: "105 hp stok", d: true,
    hp: [105, 145, 150], n2: "Downpipe", ...RPM,
    s3: { l: "1449 Turbo + Dsg yazılımı", hp: 200, ...RPM3 } },

  { id: "skoda-octavia-1-2-tsi-ea211-105", g: "Skoda Octavia", m: "1.2 TSI EA211", y: "2013-2020", e: "105 hp stok", d: false,
    hp: [105, 130, 140], n2: "Downpipe", ...RPM,
    s3: { l: "IHI 140 Turbo", hp: 170, ...RPM3 } },
  { id: "skoda-octavia-1-4-tsi-ea211-150", g: "Skoda Octavia", m: "1.4 TSI EA211", y: "2013-2020", e: "150 hp stok", d: false,
    hp: [150, 170, 220], n2: "Hybrid Turbo + Dsg yazılımı", ...RPM,
    s3: { l: "IS20 Turbo + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "skoda-octavia-1-6-tdi-105", g: "Skoda Octavia", m: "1.6 TDI", y: "2013-2020", e: "105 hp stok", d: true,
    hp: [105, 145, 150], n2: "Downpipe", ...RPM,
    s3: { l: "1449 Turbo + Dsg yazılımı", hp: 200, ...RPM3 } },
  { id: "skoda-octavia-2-0-tdi-190", g: "Skoda Octavia", m: "2.0 TDI", y: "2013-2020", e: "190 hp stok", d: true,
    hp: [190, 220, 240], n2: "Downpipe", ...RPM },
  { id: "skoda-octavia-2-0-tsi-ea888-220", g: "Skoda Octavia", m: "2.0 TSI EA888", y: "2013-2020", e: "220 hp stok", d: false,
    hp: [220, 300, 320], n2: "Downpipe", ...RPM,
    s3: { l: "IS38 Turbo", hp: 380, ...RPM3 } },

  { id: "skoda-superb-1-4-tsi-ea211-125", g: "Skoda Superb", m: "1.4 TSI EA211", y: "2015-2023", e: "125 hp stok", d: false,
    hp: [125, 155, 165], n2: "Downpipe", ...RPM,
    s3: { l: "IS20 Turbo + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "skoda-superb-1-4-tsi-ea211-150", g: "Skoda Superb", m: "1.4 TSI EA211", y: "2015-2023", e: "150 hp stok", d: false,
    hp: [150, 170, 220], n2: "Hybrid Turbo + Dsg yazılımı", ...RPM,
    s3: { l: "IS20 Turbo + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "skoda-superb-1-5-tsi-evo-150", g: "Skoda Superb", m: "1.5 TSI Evo", y: "2015-2023", e: "150 hp stok", d: false,
    hp: [150, 180, 200], n2: "Downpipe+Dsg Yazılımı", ...RPM },
  { id: "skoda-superb-1-6-tdi-105", g: "Skoda Superb", m: "1.6 TDI", y: "2015-2023", e: "105 hp stok", d: true,
    hp: [105, 145, 150], n2: "Downpipe", ...RPM,
    s3: { l: "1449 Turbo + Dsg yazılımı", hp: 200, ...RPM3 } },
  { id: "skoda-superb-2-0-tdi-190", g: "Skoda Superb", m: "2.0 TDI", y: "2015-2023", e: "190 hp stok", d: true,
    hp: [190, 220, 240], n2: "Downpipe", ...RPM },
  { id: "skoda-superb-2-0-tsi-ea888-320", g: "Skoda Superb", m: "2.0 TSI EA888", y: "2015-2023", e: "320 hp stok", d: false,
    hp: [320, 350, 380], n2: "Downpipe", ...RPM,
    s3: { l: "2260s + Dsg Yazılımı", hp: 450, ...RPM3 } },

  { id: "skoda-karoq-1-5-tsi-evo-150", g: "Skoda Karoq", m: "1.5 TSI Evo", y: "2017-202x", e: "150 hp stok", d: false,
    hp: [150, 180, 200], n2: "Downpipe+Dsg Yazılımı", ...RPM },
  { id: "skoda-karoq-1-6-tdi-105", g: "Skoda Karoq", m: "1.6 TDI", y: "2017-202x", e: "105 hp stok", d: true,
    hp: [105, 145, 150], n2: "Downpipe", ...RPM,
    s3: { l: "1449 Turbo + Dsg yazılımı", hp: 200, ...RPM3 } },

  { id: "skoda-kodiaq-1-4-tsi-ea211-150", g: "Skoda Kodiaq", m: "1.4 TSI EA211", y: "2016-202x", e: "150 hp stok", d: false,
    hp: [150, 170, 220], n2: "Hybrid Turbo + Dsg yazılımı", ...RPM,
    s3: { l: "IS20 Turbo + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "skoda-kodiaq-1-5-tsi-evo-150", g: "Skoda Kodiaq", m: "1.5 TSI Evo", y: "2016-202x", e: "150 hp stok", d: false,
    hp: [150, 180, 200], n2: "Downpipe+Dsg Yazılımı", ...RPM },
  { id: "skoda-kodiaq-2-0-tdi-190", g: "Skoda Kodiaq", m: "2.0 TDI", y: "2016-202x", e: "190 hp stok", d: true,
    hp: [190, 220, 240], n2: "Downpipe", ...RPM },

  { id: "audi-a1-1-4-tsi-ea111-122", g: "Audi A1", m: "1.4 TSI EA111", y: "2010-2018", e: "122 hp stok", d: false,
    hp: [122, 145, 160], n2: "Downpipe + Dsg yazılımı", ...RPM },
  { id: "audi-a1-1-6-tdi-cay-105", g: "Audi A1", m: "1.6 TDI CAY", y: "2010-2018", e: "105 hp stok", d: true,
    hp: [105, 135, 150], n2: "Downpipe", ...RPM,
    s3: { l: "Oem Hybrid + Dsg yazılımı", hp: 200, ...RPM3 } },

  { id: "audi-a3-1-0-tsi-116", g: "Audi A3", m: "1.0 TSI", y: "2012-2020", e: "116 hp stok", d: false,
    hp: [116, 130, null], ...RPM },
  { id: "audi-a3-1-2-tsi-ea211-105", g: "Audi A3", m: "1.2 TSI EA211", y: "2012-2020", e: "105 hp stok", d: false,
    hp: [105, 130, 140], n2: "Downpipe", ...RPM,
    s3: { l: "IHI 140 Turbo", hp: 170, ...RPM3 } },
  { id: "audi-a3-1-4-tsi-ea211-125", g: "Audi A3", m: "1.4 TSI EA211", y: "2012-2020", e: "125 hp stok", d: false,
    hp: [125, 155, 165], n2: "Downpipe", ...RPM,
    s3: { l: "IS20 Turbo + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "audi-a3-1-4-tsi-ea211-150", g: "Audi A3", m: "1.4 TSI EA211", y: "2012-2020", e: "150 hp stok", d: false,
    hp: [150, 170, 220], n2: "Hybrid Turbo + Dsg yazılımı", ...RPM,
    s3: { l: "IS20 Turbo + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "audi-a3-1-6-tdi-105", g: "Audi A3", m: "1.6 TDI", y: "2012-2020", e: "105 hp stok", d: true,
    hp: [105, 145, 150], n2: "Downpipe", ...RPM,
    s3: { l: "1449 Turbo + Dsg yazılımı", hp: 200, ...RPM3 } },
  { id: "audi-a3-1-5-tsi-evo-150", g: "Audi A3", m: "1.5 TSI Evo", y: "2020-202x", e: "150 hp stok", d: false,
    hp: [150, 180, 200], n2: "Downpipe+Dsg Yazılımı", ...RPM },
  { id: "audi-s3-2-0-tsi-ea888-g4-320", g: "Audi A3", m: "S3 2.0 TSI EA888 G4", y: "2020-202x", e: "320 hp stok", d: false,
    hp: [320, 380, 400], n2: "Downpipe+Dsg Yazılımı", ...RPM,
    s3: { l: "Powermax 2563s Turbo + Dsg", hp: 480, ...RPM3 } },

  { id: "audi-q2-1-0-tsi-85", g: "Audi Q2", m: "1.0 TSI", y: "2016-202x", e: "85 hp stok", d: false,
    hp: [85, 130, null], ...RPM },
  { id: "audi-q2-1-4-tsi-ea211-150", g: "Audi Q2", m: "1.4 TSI EA211", y: "2016-202x", e: "150 hp stok", d: false,
    hp: [150, 170, 220], n2: "Hybrid Turbo + Dsg yazılımı", ...RPM,
    s3: { l: "IS20 Turbo + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "audi-q2-1-5-tsi-evo-150", g: "Audi Q2", m: "1.5 TSI Evo", y: "2016-202x", e: "150 hp stok", d: false,
    hp: [150, 180, 200], n2: "Downpipe+Dsg Yazılımı", ...RPM },
  { id: "audi-q2-1-6-tdi-105", g: "Audi Q2", m: "1.6 TDI", y: "2016-202x", e: "105 hp stok", d: true,
    hp: [105, 145, 150], n2: "Downpipe", ...RPM,
    s3: { l: "1449 Turbo + Dsg yazılımı", hp: 200, ...RPM3 } },

  { id: "audi-q3-1-4-tsi-ea211-150", g: "Audi Q3", m: "1.4 TSI EA211", y: "2011-2018", e: "150 hp stok", d: false,
    hp: [150, 170, 220], n2: "Hybrid Turbo + Dsg yazılımı", ...RPM,
    s3: { l: "IS20 Turbo + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "audi-q3-2-0-tdi-190", g: "Audi Q3", m: "2.0 TDI", y: "2011-2018", e: "190 hp stok", d: true,
    hp: [190, 220, 240], n2: "Downpipe", ...RPM },
  { id: "audi-q3-1-5-tsi-evo-150", g: "Audi Q3", m: "1.5 TSI Evo", y: "2018-202x", e: "150 hp stok", d: false,
    hp: [150, 180, 200], n2: "Downpipe+Dsg Yazılımı", ...RPM },

  { id: "audi-a4-1-4-tsi-ea211-150", g: "Audi A4", m: "1.4 TSI EA211", y: "2015-202x", e: "150 hp stok", d: false,
    hp: [150, 170, 220], n2: "Hybrid Turbo + Dsg yazılımı", ...RPM,
    s3: { l: "IS20 Turbo + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "audi-a4-2-0-tdi-190", g: "Audi A4", m: "2.0 TDI", y: "2015-202x", e: "190 hp stok", d: true,
    hp: [190, 220, 240], n2: "Downpipe", ...RPM },
  { id: "audi-a4-2-0-tsi-280", g: "Audi A4", m: "2.0 TSI", y: "2015-202x", e: "280 hp stok", d: false,
    hp: [280, 350, 380], n2: "Downpipe", ...RPM,
    s3: { l: "2260s + Dsg Yazılımı", hp: 450, ...RPM3 } },

  { id: "audi-a5-1-4-tsi-ea211-150", g: "Audi A5", m: "1.4 TSI EA211", y: "2016-202x", e: "150 hp stok", d: false,
    hp: [150, 170, 220], n2: "Hybrid Turbo + Dsg yazılımı", ...RPM,
    s3: { l: "IS20 Turbo + Dsg yazılımı", hp: 280, ...RPM3 } },
  { id: "audi-a5-2-0-tdi-190", g: "Audi A5", m: "2.0 TDI", y: "2016-202x", e: "190 hp stok", d: true,
    hp: [190, 220, 240], n2: "Downpipe", ...RPM },
  { id: "audi-a5-2-0-tsi-280", g: "Audi A5", m: "2.0 TSI", y: "2015-202x", e: "280 hp stok", d: false,
    hp: [280, 350, 380], n2: "Downpipe", ...RPM,
    s3: { l: "2260s + Dsg Yazılımı", hp: 450, ...RPM3 } },

  { id: "audi-a6-2-0-tdi-190", g: "Audi A6", m: "2.0 TDI", y: "2011-2018", e: "190 hp stok", d: true,
    hp: [190, 220, 240], n2: "Downpipe", ...RPM },

  { id: "audi-tt-8j-2-0-tsi-ea888-g2-220", g: "Audi TT", m: "8J 2.0 TSI EA888 G2", y: "2009-2012", e: "220 hp stok", d: false,
    hp: [220, 260, 280], n2: "Downpipe", ...RPM,
    s3: { l: "K04-64 Turbo + DSG Yazılımı", hp: 320, ...RPM3 } },
  { id: "audi-tt-2-0-tsi-ea888-g3-220", g: "Audi TT", m: "2.0 TSI EA888 G3", y: "2014-2020", e: "220 hp stok", d: false,
    hp: [220, 300, 320], n2: "Downpipe", ...RPM,
    s3: { l: "IS38 Turbo", hp: 380, ...RPM3 } },
  { id: "audi-tts-2-0-tsi-ea888-g3-320", g: "Audi TT", m: "S 2.0 TSI EA888 G3", y: "2014-2020", e: "320 hp stok", d: false,
    hp: [320, 350, 380], n2: "Downpipe", ...RPM,
    s3: { l: "2260s + Dsg Yazılımı", hp: 450, ...RPM3 } },

  { id: "bmw-116ed-1-6-n47-116", g: "BMW 1 Serisi", m: "116ed", y: "F20", e: "1.6 N47", d: true,
    hp: [116, 150, 160], n2: "Downpipe", ...RPM },
  { id: "bmw-116i-1-6-n13-136", g: "BMW 1 Serisi", m: "116i", y: "F20", e: "1.6 N13", d: false,
    hp: [136, 200, 220], n2: "Downpipe + Sport Cooling", ...RPM,
    s3: { l: "Oem Hybrid + ZF8 Yazılımı", hp: 260, ...RPM3 } },
  { id: "bmw-118i-1-6-n13-170", g: "BMW 1 Serisi", m: "118i", y: "F20", e: "1.6 N13", d: false,
    hp: [170, 200, 220], n2: "Downpipe + Sport Cooling", ...RPM,
    s3: { l: "Oem Hybrid + ZF8 Yazılımı", hp: 260, ...RPM3 } },
  { id: "bmw-118i-1-6-n13-136", g: "BMW 1 Serisi", m: "118i", y: "F20 LCI", e: "1.6 N13", d: false,
    hp: [136, 200, 220], n2: "Downpipe + Sport Cooling", ...RPM,
    s3: { l: "Oem Hybrid + ZF8 Yazılımı", hp: 260, ...RPM3 } },
  { id: "bmw-120i-1-6-n13-177", g: "BMW 1 Serisi", m: "120i", y: "F20 LCI", e: "1.6 N13", d: false,
    hp: [177, 200, 220], n2: "Downpipe + Sport Cooling", ...RPM,
    s3: { l: "Oem Hybrid + ZF8 Yazılımı", hp: 260, ...RPM3 } },
  { id: "bmw-118i-1-5-b38-136", g: "BMW 1 Serisi", m: "118i", y: "F20 LCI", e: "1.5 B38", d: false,
    hp: [136, 160, 180], n2: "Downpipe", ...RPM },
  { id: "bmw-116d-1-5-b38d-116", g: "BMW 1 Serisi", m: "116d", y: "F20 LCI", e: "1.5 B38d", d: true,
    hp: [116, 150, null], ...RPM },

  { id: "bmw-218i-1-5-b38-136", g: "BMW 2 Serisi", m: "218i", y: "F22", e: "1.5 B38", d: false,
    hp: [136, 160, 180], n2: "Downpipe", ...RPM },
  { id: "bmw-220d-2-0-n47-184", g: "BMW 2 Serisi", m: "220d", y: "F22", e: "2.0 N47", d: true,
    hp: [184, 220, 235], n2: "Downpipe", ...RPM,
    s3: { l: "Oem Hybrid + ZF8 Yazılımı", hp: 280, ...RPM3 } },

  { id: "bmw-316i-1-6-n13-136", g: "BMW 3 Serisi", m: "316i", y: "F30", e: "1.6 N13", d: false,
    hp: [136, 200, 220], n2: "Downpipe + Sport Cooling", ...RPM,
    s3: { l: "Oem Hybrid + ZF8 Yazılımı", hp: 260, ...RPM3 } },
  { id: "bmw-320i-ed-1-6-n13-170", g: "BMW 3 Serisi", m: "320i ed", y: "F30", e: "1.6 N13", d: false,
    hp: [170, 200, 220], n2: "Downpipe + Sport Cooling", ...RPM,
    s3: { l: "Oem Hybrid + ZF8 Yazılımı", hp: 260, ...RPM3 } },
  { id: "bmw-320d-2-0-n47-184", g: "BMW 3 Serisi", m: "320d", y: "F30", e: "2.0 N47", d: true,
    hp: [184, 220, 235], n2: "Downpipe", ...RPM,
    s3: { l: "Oem Hybrid + ZF8 Yazılımı", hp: 280, ...RPM3 } },
  { id: "bmw-320d-2-0-b47-190", g: "BMW 3 Serisi", m: "320d", y: "F30 LCI", e: "2.0 B47", d: true,
    hp: [190, 220, 240], n2: "Downpipe", ...RPM,
    s3: { l: "Oem Hybrid + ZF8 Yazılımı", hp: 280, ...RPM3 } },
  { id: "bmw-320i-1-6-b48-170", g: "BMW 3 Serisi", m: "320i", y: "G20", e: "1.6 B48", d: false,
    hp: [170, 280, 340], n2: "Downpipe", ...RPM,
    s3: { l: "IMS500 + ZF8 Yazılımı", hp: 420, ...RPM3 } },

  { id: "bmw-418i-1-5-b38-136", g: "BMW 4 Serisi", m: "418i", y: "F32", e: "1.5 B38", d: false,
    hp: [136, 160, 180], n2: "Downpipe", ...RPM },
  { id: "bmw-420d-2-0-n47-184", g: "BMW 4 Serisi", m: "420d", y: "F32", e: "2.0 N47", d: true,
    hp: [184, 220, 235], n2: "Downpipe", ...RPM,
    s3: { l: "Oem Hybrid + ZF8 Yazılımı", hp: 280, ...RPM3 } },

  { id: "bmw-520i-1-6-n20-170", g: "BMW 5 Serisi", m: "520i", y: "F10", e: "1.6 N20", d: false,
    hp: [170, 220, 240], n2: "Downpipe", ...RPM },
  { id: "bmw-520d-2-0-n47-184", g: "BMW 5 Serisi", m: "520d", y: "F10", e: "2.0 N47", d: true,
    hp: [184, 220, 235], n2: "Downpipe", ...RPM,
    s3: { l: "Oem Hybrid + ZF8 Yazılımı", hp: 280, ...RPM3 } },
  { id: "bmw-525d-2-0-n47-211", g: "BMW 5 Serisi", m: "525d", y: "F10", e: "2.0 N47", d: true,
    hp: [211, 270, 285], n2: "Downpipe", ...RPM },
  { id: "bmw-520i-1-6-b48-170", g: "BMW 5 Serisi", m: "520i", y: "G30", e: "1.6 B48", d: false,
    hp: [170, 280, 340], n2: "Downpipe + Sport Cooling", ...RPM,
    s3: { l: "IMS500 + ZF8 Yazılımı", hp: 420, ...RPM3 } },
  { id: "bmw-530i-2-0-b48-252", g: "BMW 5 Serisi", m: "530i", y: "G30", e: "2.0 B48", d: false,
    hp: [252, 320, 360], n2: "Downpipe + Sport Cooling", ...RPM },

  { id: "bmw-x1-sdrive18i-1-5-b38-136", g: "BMW X1", m: "X1 sDrive18i", y: "2015-2022", e: "1.5 B38", d: false,
    hp: [136, 160, 180], n2: "Downpipe", ...RPM },
  { id: "bmw-x1-sdrive16d-1-5-b38d-116", g: "BMW X1", m: "X1 sDrive16d", y: "2015-2022", e: "1.5 B38d", d: true,
    hp: [116, 150, null], ...RPM },

  { id: "bmw-x2-sdrive18i-1-5-b38-136", g: "BMW X2", m: "X2 sDrive18i", y: "2018-2023", e: "1.5 B38", d: false,
    hp: [136, 160, 180], n2: "Downpipe", ...RPM },

  { id: "bmw-x3-sdrive20i-1-6-n20-170", g: "BMW X3", m: "X3 sDrive20i", y: "2014-2017", e: "1.6 N20", d: false,
    hp: [170, 220, 240], n2: "Downpipe", ...RPM },
  { id: "bmw-x3-xdrive20d-2-0-n47-b47-184", g: "BMW X3", m: "X3 xDrive20d", y: "2010-2017", e: "2.0 N47 / B47", d: true,
    hp: [184, 220, 240], n2: "Downpipe", ...RPM,
    s3: { l: "Oem Hybrid + ZF8 Yazılımı", hp: 280, ...RPM3 } },

  { id: "bmw-x5-xdrive25d-2-0-n47-b47-218", g: "BMW X5", m: "X5 xDrive25d", y: "2013-2018", e: "2.0 N47 / B47", d: true,
    hp: [218, 270, 285], n2: "Downpipe", ...RPM },

  { id: "mini-cooper-d-1-6-n47-112", g: "Mini", m: "Cooper D", y: "2010-2014", e: "1.6 N47", d: true,
    hp: [112, 150, 160], n2: "Downpipe", ...RPM },
  { id: "mini-cooper-s-1-6-n18-184", g: "Mini", m: "Cooper S", y: "2010-2016", e: "1.6 N18", d: false,
    hp: [184, 215, 235], n2: "Downpipe + Intercooler", ...RPM,
    s3: { l: "JCW Turbo + Yazılım", hp: 280, ...RPM3 } },
  { id: "mini-jcw-1-6-n14-n18-211", g: "Mini", m: "JCW", y: "2008-2014", e: "1.6 N14/N18", d: false,
    hp: [211, 250, 270], n2: "Downpipe + Intercooler", ...RPM,
    s3: { l: "Oem Hybrid Turbo", hp: 300, ...RPM3 } },
  { id: "mini-cooper-suv-1-5-b38-136", g: "Mini", m: "Cooper SUV", y: "2014-202x", e: "1.5 B38", d: false,
    hp: [136, 160, 180], n2: "Downpipe", ...RPM },
  { id: "mini-coopers-suv-2-0-b48-192", g: "Mini", m: "CooperS SUV", y: "2014-202x", e: "2.0 B48", d: false,
    hp: [192, 260, 280], n2: "Downpipe + Sport Cooling", ...RPM,
    s3: { l: "IMS / Big Turbo + Şanzıman Yaz.", hp: 350, ...RPM3 } },
  { id: "mini-jcw-suv-2-0-b48-231", g: "Mini", m: "JCW SUV", y: "2015-202x", e: "2.0 B48", d: false,
    hp: [231, 300, 330], n2: "Downpipe + Sport Cooling", ...RPM,
    s3: { l: "Big Turbo + Şanzıman Yaz.", hp: 400, ...RPM3 } },
];

const brandOf = (g) => g.split(" ")[0];

/* Son yapılan araçlar. public/recent.json aynı biçimde, oradan güncellenir.
   Kaç kayıt olursa olsun şerit yatay kaydırılır.
   l: seviye yazısını elle vermek için (örn. "STAGE 3 · IS20"). Yoksa s'ten üretilir.
   img: public/recent/ altındaki görselin yolu. Dosya yoksa araç ikonu çıkar. */
const RECENT_FALLBACK = [
  { v: "BMW 320i G20", s: 2, gain: 170, img: "./recent/1.jpg" },
  { v: "VW Golf 7 1.4 TSI", s: 3, l: "STAGE 3 · IS20", gain: 155, img: "./recent/2.jpg" },
  { v: "Audi S3 8Y", s: 2, gain: 80, img: "./recent/3.jpg" },
  { v: "BMW 320i G20", s: 1, gain: 110, img: "./recent/4.jpg" },
];

const GROUPS = [
  "VW Polo 6R",
  "VW Scirocco",
  "VW Golf 6",
  "VW Golf 7",
  "VW Golf 8",
  "VW Passat B8",
  "VW Jetta",
  "VW Tiguan",
  "VW T-Roc",
  "VW CC",
  "VW Arteon",
  "SEAT Ibiza",
  "SEAT Leon",
  "SEAT Arona",
  "SEAT Ateca",
  "CUPRA Leon",
  "CUPRA Formentor",
  "Skoda Fabia",
  "Skoda Rapid",
  "Skoda Scala",
  "Skoda Octavia",
  "Skoda Superb",
  "Skoda Karoq",
  "Skoda Kodiaq",
  "Audi A1",
  "Audi A3",
  "Audi Q2",
  "Audi Q3",
  "Audi A4",
  "Audi A5",
  "Audi A6",
  "Audi TT",
  "BMW 1 Serisi",
  "BMW 2 Serisi",
  "BMW 3 Serisi",
  "BMW 4 Serisi",
  "BMW 5 Serisi",
  "BMW X1",
  "BMW X2",
  "BMW X3",
  "BMW X5",
  "Mini",
];

const BRANDS = GROUPS.map(brandOf).filter((b, i, a) => a.indexOf(b) === i);

/* Bayi: g=bölge anahtarı, c=il, n=isim, p=telefon (uluslararası biçim) */
const DEALERS = [
  { g: "marmara", c: "Tekirdağ", n: "Kadir Balkan", p: "+905383968814" },
  // Yeni bayi eklemek için aynı biçimde satır ekle.
];
const REGIONS = ["marmara", "ege", "ic", "akdeniz", "karadeniz", "dogu"];

/* Sıralama satırı: n=isim, v=araç, s=seviye (1,2,3), t=100-200 km/h saniye,
   d=stok zamana göre yüzde fark (negatif = daha hızlı), hp=isteğe bağlı */
const BOARD_FALLBACK = [
  { n: "EZ_CarProjects", v: "BMW G20 320i", s: 2, t: 11.8, d: -0.8, hp: 340 },
];

/* ============================================================
   6. BİÇİMLENDİRME
   ============================================================ */
function makeFmt(locale) {
  const nf = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  const sf = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const pf = new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    signDisplay: "exceptZero",
  });
  return {
    fmt: (n) => nf.format(Math.round(n)),
    sec: (n) => sf.format(n),
    pct: (n) => pf.format(n / 100),
  };
}
const FmtCtx = createContext(makeFmt("en-US"));
const useF = () => useContext(FmtCtx);

/* ============================================================
   7. BİLEŞENLER
   ============================================================ */
function Card({ children, hot, style }) {
  const t = useT();
  return (
    <div
      style={{
        background: t.card,
        border: `1px solid ${hot ? t.accent : t.line}`,
        borderRadius: t.r.card,
        padding: t.pad,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Label({ children, color }) {
  const t = useT();
  return (
    <div
      style={{
        fontSize: 10,
        letterSpacing: ".09em",
        fontWeight: 600,
        textTransform: "uppercase",
        color: color || t.muted,
      }}
    >
      {children}
    </div>
  );
}

function Segmented({ items, value, onChange, onReselect }) {
  const t = useT();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${items.length},1fr)`,
        gap: 2,
        background: t.btn,
        border: `1px solid ${t.line}`,
        borderRadius: t.r.btn,
        padding: 2,
      }}
    >
      {items.map((it, i) => {
        const on = value === i;
        return (
          <button
            key={i}
            onClick={() => (on ? onReselect && onReselect(i) : onChange(i))}
            style={{
              minHeight: 40,
              border: 0,
              cursor: "pointer",
              borderRadius: t.r.btn,
              background: on ? t.accent : "transparent",
              color: on ? "#fff" : t.muted,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: ".09em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            {it}
          </button>
        );
      })}
    </div>
  );
}

function Readout({ label, value, unit, color, small }) {
  const t = useT();
  return (
    <div>
      <Label>{label}</Label>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 2 }}>
        <span
          style={{
            fontFamily: MONO,
            fontSize: small ? 20 : 30,
            fontWeight: 800,
            letterSpacing: "-.03em",
            color: color || t.text,
            lineHeight: 1.1,
          }}
        >
          {value}
        </span>
        <span style={{ fontSize: 11, color: t.muted, fontFamily: MONO }}>{unit}</span>
      </div>
    </div>
  );
}

function Modal({ open, title, note, onClose, closeLabel, children }) {
  const t = useT();
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 14,
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 360,
          maxHeight: "78vh",
          background: t.card,
          border: `1px solid ${t.line}`,
          borderRadius: t.r.card,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: t.pad, borderBottom: `1px solid ${t.line}` }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 13,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: t.text,
              fontWeight: 700,
            }}
          >
            {title}
          </div>
          {note && (
            <div style={{ fontSize: 11, color: t.muted, marginTop: 4 }}>{note}</div>
          )}
        </div>
        <div style={{ overflowY: "auto", flex: 1 }}>{children}</div>
        <button
          onClick={onClose}
          style={{
            minHeight: 44,
            border: 0,
            borderTop: `1px solid ${t.line}`,
            background: t.btn,
            color: t.text,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: ".09em",
            cursor: "pointer",
          }}
        >
          {closeLabel}
        </button>
      </div>
    </div>
  );
}

function PickRow({ title, sub, right, onClick }) {
  const t = useT();
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        minHeight: 44,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 11px",
        background: "transparent",
        border: 0,
        borderBottom: `1px solid ${t.line}`,
        color: t.text,
        textAlign: "left",
        cursor: "pointer",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, color: t.text, fontWeight: 600 }}>{title}</div>
        {sub && (
          <div style={{ fontSize: 11, color: t.muted, fontFamily: MONO, marginTop: 1 }}>
            {sub}
          </div>
        )}
      </div>
      {right}
    </button>
  );
}

function SearchBox({ value, onChange, placeholder }) {
  const t = useT();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "0 11px",
        borderBottom: `1px solid ${t.line}`,
        minHeight: 44,
      }}
    >
      <Search size={14} color={t.muted} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1,
          background: "transparent",
          border: 0,
          outline: "none",
          color: t.text,
          fontSize: 14,
          minHeight: 40,
        }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          style={{ background: "transparent", border: 0, cursor: "pointer", padding: 4 }}
        >
          <X size={14} color={t.muted} />
        </button>
      )}
    </div>
  );
}

/* ---------- Dyno grafiği ---------- */
function DynoChart({ hp, nm, hpRef, nmRef, maxHp, maxNm, xMin, xMax, S }) {
  const t = useT();
  const W = 340,
    H = 200,
    L = 30,
    R = 30,
    T = 14,
    B = 22;
  const DIV = 4;

  const nice = (v) => {
    const st = v > 600 ? 100 : v > 250 ? 50 : v > 120 ? 25 : 10;
    return Math.max(st, Math.ceil(v / (st * DIV)) * st * DIV);
  };
  const yH = nice(maxHp),
    yN = nice(maxNm);

  const x = (v) => L + ((v - xMin) / (xMax - xMin)) * (W - L - R);
  const yh = (v) => T + (1 - v / yH) * (H - T - B);
  const yn = (v) => T + (1 - v / yN) * (H - T - B);
  const path = (pts, f) => pts.map((p) => `${x(p[0]).toFixed(1)},${f(p[1]).toFixed(1)}`).join(" ");

  const xTicks = [];
  for (let v = Math.ceil(xMin / 1000) * 1000; v <= xMax; v += 1000) xTicks.push(v);

  const peak = (pts) => pts.reduce((a, b) => (b[1] > a[1] ? b : a));
  const pH = peak(hp),
    pN = peak(nm);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {Array.from({ length: DIV + 1 }, (_, i) => {
        const yy = T + (i / DIV) * (H - T - B);
        return (
          <g key={"g" + i}>
            <line x1={L} y1={yy} x2={W - R} y2={yy} stroke={t.line} strokeWidth="1" />
            <text x={L - 4} y={yy + 3} textAnchor="end" fontSize="8" fontFamily={MONO} fill={t.accent}>
              {Math.round((yH * (DIV - i)) / DIV)}
            </text>
            <text x={W - R + 4} y={yy + 3} fontSize="8" fontFamily={MONO} fill={t.second} opacity=".7">
              {Math.round((yN * (DIV - i)) / DIV)}
            </text>
          </g>
        );
      })}
      {xTicks.map((v) => (
        <g key={"x" + v}>
          <line x1={x(v)} y1={T} x2={x(v)} y2={H - B} stroke={t.line} strokeWidth="1" opacity=".5" />
          <text x={x(v)} y={H - B + 11} textAnchor="middle" fontSize="8" fontFamily={MONO} fill={t.muted}>
            {v / 1000}k
          </text>
        </g>
      ))}
      <text x={L - 4} y={T - 4} textAnchor="end" fontSize="8" fontFamily={MONO} fill={t.accent}>
        {S.hp}
      </text>
      <text x={W - R + 4} y={T - 4} fontSize="8" fontFamily={MONO} fill={t.second} opacity=".7">
        {S.nm}
      </text>
      <text x={W - R} y={H - 2} textAnchor="end" fontSize="8" fontFamily={MONO} fill={t.muted}>
        {S.rpm}
      </text>

      {hpRef && (
        <polyline points={path(hpRef, yh)} fill="none" stroke={t.accent} strokeWidth="1"
          strokeDasharray="3 3" opacity=".38" />
      )}
      {nmRef && (
        <polyline points={path(nmRef, yn)} fill="none" stroke={t.second} strokeWidth="1"
          strokeDasharray="3 3" opacity=".28" />
      )}
      <polyline points={path(nm, yn)} fill="none" stroke={t.second} strokeWidth="1.8"
        strokeLinejoin="round" strokeLinecap="round" opacity=".9" />
      <polyline points={path(hp, yh)} fill="none" stroke={t.accent} strokeWidth="2.2"
        strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={x(pN[0])} cy={yn(pN[1])} r="2.4" fill={t.second} />
      <circle cx={x(pH[0])} cy={yh(pH[1])} r="2.8" fill={t.accent} />
    </svg>
  );
}

/* ============================================================
   8. SEKMELER
   ============================================================ */
function PowerTab({ S, veh, setVeh }) {
  const t = useT();
  const { fmt } = useF();
  const [pick, setPick] = useState(false);
  const [brand, setBrand] = useState(null);
  const [help, setHelp] = useState(false);
  const [stage, setStage] = useState(2); // 0 stok, 1 s1, 2 s2, 3 büyük turbo
  const [q, setQ] = useState("");

  const s3 = (veh && veh.s3) || null;
  // Araçta nm dizisi varsa o kullanılır, yoksa katsayıdan türetilir
  const NM = veh
    ? [0, 1, 2].map((i) => (veh.nm ? veh.nm[i] : torqueOf(veh.hp[i], veh.d, i)))
    : [];
  const NM3 = s3 ? (s3.nm != null ? s3.nm : torqueOf(s3.hp, veh.d, 3)) : null;

  // Seçili seviye bu araçta yoksa mevcut en yüksek seviyeye düş
  useEffect(() => {
    if (!veh) return;
    const has = (i) => (i === 3 ? !!s3 : veh.hp[i] != null);
    if (!has(stage)) {
      for (let i = 3; i >= 0; i--)
        if (has(i)) {
          setStage(i);
          break;
        }
    }
  }, [veh, s3, stage]);

  const curves = useMemo(() => {
    if (!veh) return [];
    const base = [0, 1, 2].map((i) =>
      veh.hp[i] != null ? buildCurves(veh.hp[i], NM[i], veh.t, veh.p, veh.rl, veh.d) : null
    );
    base.push(s3 ? buildCurves(s3.hp, NM3, s3.t, s3.p, s3.rl, veh.d) : null);
    return base;
  }, [veh, s3, NM3]);

  const list = useMemo(() => {
    const s = q.trim().toLocaleLowerCase("tr");
    if (!s) return VEHICLES;
    return VEHICLES.filter((v) =>
      `${v.g} ${v.m} ${v.e} ${v.y} ${v.s3 ? v.s3.l : ""}`.toLocaleLowerCase("tr").includes(s)
    );
  }, [q]);

  let body = null;
  if (veh) {
    // Eksen en yüksek seviyeye göre sabit: seviye değişince eğri büyüyüp küçülür
    const all = [0, 1, 2]
      .map((i) => ({ hp: veh.hp[i], nm: NM[i] }))
      .concat(s3 ? [{ hp: s3.hp, nm: NM3 }] : []);
    const maxHp = Math.max(...all.filter((a) => a.hp != null).map((a) => a.hp));
    const maxNm = Math.max(...all.filter((a) => a.nm != null).map((a) => a.nm));
    const xMax = Math.max(veh.rl, s3 ? s3.rl : 0);
    const cur = curves[stage] || curves.find((c) => c) ;

    const stages = [
      { label: S.stock, i: 0, hp: veh.hp[0], nm: NM[0] },
      { label: S.s1, i: 1, hp: veh.hp[1], nm: NM[1] },
      { label: S.s2, i: 2, hp: veh.hp[2], nm: NM[2], note: veh.n2 },
      { label: S.s3, i: 3, hp: s3 && s3.hp, nm: NM3, note: s3 && s3.l },
    ].map((st) => ({ ...st, off: st.hp == null }));

    const note = stages[stage] && stages[stage].note;

    body = (
      <>
        <div style={{ display: "grid", gap: 4, gridTemplateColumns: "repeat(4,1fr)" }}>
          {stages.map((st) => {
            const on = st.i === stage;
            const off = !!st.off;
            return (
              <button
                key={st.i}
                disabled={off}
                onClick={() => !off && setStage(st.i)}
                title={off ? S.s3off : undefined}
                style={{
                  textAlign: "left",
                  cursor: off ? "default" : "pointer",
                  background: on ? t.card : t.btn,
                  border: `1px solid ${on ? t.accent : t.line}`,
                  borderRadius: t.r.card,
                  padding: "7px 5px",
                  color: t.text,
                  opacity: off ? 0.42 : 1,
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <div
                  style={{
                    fontSize: 8.5,
                    letterSpacing: ".05em",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: on ? t.accent : t.muted,
                    lineHeight: 1.15,
                    minHeight: 20,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 3,
                  }}
                >
                  <span style={{ minWidth: 0, wordBreak: "break-word" }}>{st.label}</span>
                  {off && <Lock size={9} color={t.muted} style={{ flexShrink: 0, marginTop: 1 }} />}
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 17,
                    fontWeight: 800,
                    letterSpacing: "-.04em",
                    color: off ? t.muted : on ? t.text : t.muted,
                    lineHeight: 1.15,
                  }}
                >
                  {off ? "—" : fmt(st.hp)}
                  {!off && <span style={{ fontSize: 8.5, color: t.muted }}> {S.hp}</span>}
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    color: off ? t.muted : on ? t.text : t.muted,
                    lineHeight: 1.2,
                  }}
                >
                  {off ? "—" : fmt(st.nm)}
                  {!off && <span style={{ fontSize: 8.5, color: t.muted }}> {S.nm}</span>}
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 9,
                    fontWeight: 700,
                    color: on ? t.accent : t.muted,
                    minHeight: 12,
                    lineHeight: 1.2,
                  }}
                >
                  {!off && st.i > 0 ? `+${fmt(st.hp - veh.hp[0])}/+${fmt(st.nm - NM[0])}` : ""}
                </div>
              </button>
            );
          })}
        </div>

        {note && (
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10,
              color: t.warn,
              padding: "0 2px",
              letterSpacing: ".04em",
            }}
          >
            {stages[stage].label} · {note} {S.req}
          </div>
        )}

        <Card style={{ padding: "10px 6px 4px" }}>
          <DynoChart
            hp={cur.hp}
            nm={cur.nm}
            hpRef={stage > 0 && curves[0] ? curves[0].hp : null}
            nmRef={stage > 0 && curves[0] ? curves[0].nm : null}
            maxHp={maxHp}
            maxNm={maxNm}
            xMin={IDLE}
            xMax={xMax}
            S={S}
          />
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              padding: "6px 0 8px",
              flexWrap: "wrap",
            }}
          >
            {[
              { c: t.accent, l: S.power, d: false },
              { c: t.second, l: S.torque, d: false },
              ...(stage > 0 ? [{ c: t.muted, l: S.stock, d: true }] : []),
            ].map((s) => (
              <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span
                  style={{
                    width: 12,
                    height: 0,
                    borderTop: `2px ${s.d ? "dashed" : "solid"} ${s.c}`,
                    display: "block",
                  }}
                />
                <span
                  style={{ fontSize: 9, letterSpacing: ".09em", color: t.text, fontWeight: 600 }}
                >
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <div style={{ fontSize: 10, color: t.muted, lineHeight: 1.5, padding: "0 2px" }}>
          {S.disclaimer}
        </div>
      </>
    );
  } else {
    body = (
      <button
        onClick={() => setPick(true)}
        style={{
          background: t.card,
          border: `1px dashed ${t.line}`,
          borderRadius: t.r.card,
          padding: "34px 14px",
          color: t.muted,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 9,
        }}
      >
        <Car size={22} color={t.muted} />
        <span style={{ fontSize: 12, color: t.text }}>{S.pickPrompt}</span>
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setHelp((v) => !v)}
        style={{
          textAlign: "left",
          width: "100%",
          background: t.btn,
          border: `1px solid ${t.line}`,
          borderRadius: t.r.btn,
          padding: "8px 9px",
          cursor: "pointer",
          display: "grid",
          gap: 5,
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            fontWeight: 600,
            color: t.warn,
          }}
        >
          <HelpCircle size={13} />
          {S.notFound}
          <ChevronDown
            size={13}
            style={{
              marginLeft: "auto",
              transform: help ? "rotate(180deg)" : "none",
              transition: "transform .15s",
            }}
          />
        </span>
        {help && (
          <span style={{ fontSize: 11, lineHeight: 1.45, color: t.text }}>{S.notFoundBody}</span>
        )}
      </button>

      <Card style={{ padding: 0 }} hot={!veh}>
        <PickRow
          title={veh ? `${veh.g} ${veh.m}` : S.pickVehicle}
          sub={veh ? `${veh.y} · ${veh.e}` : S.pickHint}
          right={<ChevronDown size={16} color={veh ? t.muted : t.accent} />}
          onClick={() => setPick(true)}
        />
      </Card>

      {body}

      <Modal
        open={pick}
        title={brand ? `${brand} · ${S.pickModel}` : S.pickBrand}
        note={brand ? S.pickHint : S.brandHint}
        closeLabel={S.close}
        onClose={() => {
          setPick(false);
          setQ("");
          setBrand(null);
        }}
      >
        <SearchBox value={q} onChange={setQ} placeholder={S.search} />

        {brand && !q && (
          <button
            onClick={() => setBrand(null)}
            style={{
              width: "100%",
              minHeight: 40,
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "0 11px",
              background: t.btn,
              border: 0,
              borderBottom: `1px solid ${t.line}`,
              color: t.muted,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: ".09em",
              cursor: "pointer",
            }}
          >
            <ChevronLeft size={13} /> {S.back}
          </button>
        )}

        {/* 1. adım: marka */}
        {!brand && !q &&
          BRANDS.map((b) => (
            <PickRow
              key={b}
              title={b}
              right={<ChevronRight size={15} color={t.muted} />}
              onClick={() => setBrand(b)}
            />
          ))}

        {/* 2. adım: model — arama varsa tüm markalarda arar */}
        {(brand || q) &&
          GROUPS.map((gname) => {
            if (!q && brandOf(gname) !== brand) return null;
            const rows = list.filter((v) => v.g === gname);
            if (!rows.length) return null;
            return (
              <div key={gname}>
                <div
                  style={{
                    padding: "7px 11px",
                    background: t.btn,
                    fontSize: 10,
                    letterSpacing: ".09em",
                    fontWeight: 700,
                    color: t.muted,
                    textTransform: "uppercase",
                  }}
                >
                  {gname}
                </div>
                {rows.map((v) => (
                  <PickRow
                    key={v.id}
                    title={v.m}
                    sub={`${v.y} · ${v.e} · ${v.hp[0]}→${
                      v.s3 ? v.s3.hp : v.hp[2] != null ? v.hp[2] : v.hp[1]
                    } ${S.hp}`}
                    right={<Car size={14} color={veh && v.id === veh.id ? t.accent : t.muted} />}
                    onClick={() => {
                      setVeh(v);
                      setPick(false);
                      setQ("");
                      setBrand(null);
                    }}
                  />
                ))}
              </div>
            );
          })}

        {(brand || q) && !list.length && (
          <div style={{ padding: 16, fontSize: 12, color: t.muted, textAlign: "center" }}>
            {S.noResult}
          </div>
        )}
      </Modal>
    </>
  );
}

function DealerTab({ S }) {
  const t = useT();
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const s = q.trim().toLocaleLowerCase("tr");
    if (!s) return DEALERS;
    return DEALERS.filter((d) => `${d.c} ${d.n}`.toLocaleLowerCase("tr").includes(s));
  }, [q]);

  return (
    <>
      <Card style={{ padding: 0 }}>
        <SearchBox value={q} onChange={setQ} placeholder={S.dealerHint} />
        {REGIONS.map((r) => {
          const rows = list.filter((d) => d.g === r);
          if (!rows.length) return null;
          return (
            <div key={r}>
              <div
                style={{
                  padding: "7px 11px",
                  background: t.btn,
                  fontSize: 10,
                  letterSpacing: ".09em",
                  fontWeight: 700,
                  color: t.muted,
                }}
              >
                {S.grp[r]}
              </div>
              {rows.map((d) => (
                <div
                  key={d.p}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 11px",
                    borderBottom: `1px solid ${t.line}`,
                    minHeight: 44,
                  }}
                >
                  <MapPin size={14} color={t.muted} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{d.c}</div>
                    <div style={{ fontSize: 11, color: t.text, opacity: 0.8 }}>{d.n}</div>
                    <div style={{ fontSize: 11, color: t.muted, fontFamily: MONO }}>{d.p}</div>
                  </div>
                  <a
                    href={`tel:${d.p}`}
                    style={{
                      minHeight: 40,
                      padding: "0 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: t.accent,
                      color: "#fff",
                      borderRadius: t.r.btn,
                      textDecoration: "none",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: ".09em",
                    }}
                  >
                    <Phone size={13} />
                    {S.call}
                  </a>
                </div>
              ))}
            </div>
          );
        })}
        {!list.length && (
          <div style={{ padding: 16, fontSize: 12, color: t.muted, textAlign: "center" }}>
            {S.noResult}
          </div>
        )}
      </Card>
    </>
  );
}

function BoardTab({ S }) {
  const t = useT();
  const { fmt, sec, pct } = useF();
  const [rows, setRows] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch(APP.leaderboard, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => {
        if (!alive) return;
        setRows(Array.isArray(j) ? j : j.entries || []);
      })
      .catch(() => {
        if (!alive) return;
        setRows(BOARD_FALLBACK);
      });
    return () => {
      alive = false;
    };
  }, []);

  // Küçük zaman önde
  const sorted = useMemo(() => (rows ? [...rows].sort((a, b) => a.t - b.t) : null), [rows]);

  const stageLabel = (n) => (n === 3 ? "STAGE 3" : n === 2 ? S.s2 : n === 1 ? S.s1 : S.stock);

  if (!sorted)
    return (
      <Card>
        <div style={{ fontSize: 12, color: t.muted, textAlign: "center", padding: 12 }}>
          {S.loading}
        </div>
      </Card>
    );

  return (
    <>
      <Card style={{ padding: 0 }}>
        <div style={{ padding: "9px 11px", borderBottom: `1px solid ${t.line}` }}>
          <Label>{S.t100}</Label>
          <div style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{S.boardHint}</div>
        </div>
        {sorted.map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "8px 11px",
              borderBottom: `1px solid ${t.line}`,
              minHeight: 46,
            }}
          >
            <div
              style={{
                width: 22,
                textAlign: "center",
                fontFamily: MONO,
                fontSize: 14,
                fontWeight: 800,
                color: i === 0 ? t.accent : t.muted,
              }}
            >
              {i + 1}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{r.n}</div>
              <div style={{ fontSize: 11, color: t.muted }}>
                {r.v} · {stageLabel(r.s)}
                {r.hp != null && ` · ${fmt(r.hp)} ${S.hp}`}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 17,
                  fontWeight: 800,
                  letterSpacing: "-.03em",
                  color: t.text,
                }}
              >
                {sec(r.t)}
                <span style={{ fontSize: 9, color: t.muted }}> {S.sec}</span>
              </div>
              {r.d != null && (
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    fontWeight: 700,
                    color: r.d < 0 ? t.accent : t.muted,
                  }}
                >
                  {pct(r.d)}
                </div>
              )}
            </div>
          </div>
        ))}
      </Card>
    </>
  );
}

function RecentStrip({ S }) {
  const t = useT();
  const { fmt } = useF();
  const [rows, setRows] = useState(RECENT_FALLBACK);

  useEffect(() => {
    let alive = true;
    fetch(APP.recent, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => {
        if (alive && Array.isArray(j) && j.length) setRows(j);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const stageLabel = (n) => (n === 3 ? S.s3 : n === 2 ? S.s2 : n === 1 ? S.s1 : S.stock);

  return (
    <div>
      <div style={{ padding: "2px 2px 5px" }}>
        <Label>{S.recent}</Label>
      </div>
      {/* yatay kaydırmalı şerit — kart genişliği sabit, taşan kısım kaydırılır */}
      <div
        className="hstrip"
        style={{
          display: "flex",
          gap: 5,
          overflowX: "auto",
          scrollSnapType: "x proximity",
          WebkitOverflowScrolling: "touch",
          paddingBottom: 2,
        }}
      >
        {rows.map((r, i) => (
          <div
            key={i}
            style={{
              flex: "0 0 auto",
              width: 118,
              scrollSnapAlign: "start",
              background: t.card,
              border: `1px solid ${t.line}`,
              borderRadius: t.r.card,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                aspectRatio: "16 / 9",
                background: t.btn,
                borderBottom: `1px solid ${t.line}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {r.img ? (
                <img
                  src={r.img}
                  alt={r.v}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <Car size={17} color={t.line} />
              )}
            </div>
            <div style={{ padding: "7px 8px 8px" }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: t.text,
                lineHeight: 1.25,
                minHeight: 25,
                overflow: "hidden",
              }}
            >
              {r.v}
            </div>
            <div
              style={{
                fontSize: 8.5,
                fontWeight: 700,
                letterSpacing: ".05em",
                color: t.muted,
                marginTop: 3,
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {r.l || stageLabel(r.s)}
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: "-.03em",
                color: t.accent,
                marginTop: 1,
              }}
            >
              +{fmt(r.gain)}
              <span style={{ fontSize: 8.5, color: t.muted }}> {S.hp}</span>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Welcome({ S, open, onClose }) {
  const t = useT();
  if (!open) return null;
  const rows = [
    [Gauge, S.nav[0], S.wF1],
    [Phone, S.nav[1], S.wF2],
    [Trophy, S.nav[2], S.wF3],
  ];
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: t.bg,
        display: "flex",
        flexDirection: "column",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "26px 18px 18px",
          maxWidth: 420,
          width: "100%",
          margin: "0 auto",
        }}
      >
        {/* marka bloğu */}
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 20 }}>
          <span style={{ width: 3, height: 30, background: t.accent, display: "block" }} />
          <span
            style={{
              fontFamily: MONO,
              fontSize: 17,
              fontWeight: 800,
              letterSpacing: ".16em",
              color: t.text,
            }}
          >
            MGREMAPS
          </span>
        </div>

        <h1
          style={{
            margin: "0 0 8px",
            fontSize: 21,
            lineHeight: 1.25,
            letterSpacing: "-.02em",
            color: t.text,
            fontWeight: 800,
          }}
        >
          {S.wTitle}
        </h1>
        <p style={{ margin: "0 0 20px", fontSize: 13, lineHeight: 1.55, color: t.muted }}>
          {S.wLead}
        </p>

        <div style={{ display: "grid", gap: 6 }}>
          {rows.map(([I, title, desc]) => (
            <div
              key={title}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
                background: t.card,
                border: `1px solid ${t.line}`,
                borderRadius: t.r.card,
                padding: 11,
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 30,
                  height: 30,
                  borderRadius: t.r.btn,
                  background: t.btn,
                  border: `1px solid ${t.line}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <I size={15} color={t.accent} />
              </span>
              <span style={{ minWidth: 0 }}>
                <span
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: ".09em",
                    color: t.text,
                    textTransform: "uppercase",
                  }}
                >
                  {title}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: 11,
                    lineHeight: 1.45,
                    color: t.muted,
                    marginTop: 3,
                  }}
                >
                  {desc}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: "10px 18px 16px",
          maxWidth: 420,
          width: "100%",
          margin: "0 auto",
          borderTop: `1px solid ${t.line}`,
        }}
      >
        <button
          onClick={onClose}
          style={{
            width: "100%",
            minHeight: 48,
            border: 0,
            borderRadius: t.r.btn,
            background: t.accent,
            color: "#fff",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: ".12em",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {S.wGo}
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   9. APP
   ============================================================ */
export default function App() {
  const [lang, setLang] = useState(detectLang);
  const [tab, setTab] = useState(0);
  const [veh, setVeh] = useState(null);
  const [langOpen, setLangOpen] = useState(false);
  const [welcome, setWelcome] = useState(() => !seenWelcome());

  const S = STR[lang];
  const fmtCtx = useMemo(() => makeFmt(S.code), [S.code]);
  const t = THEME;

  useEffect(() => {
    try {
      document.documentElement.lang = lang;
    } catch (e) {}
  }, [lang]);

  const NAV_ICONS = [Gauge, Phone, Trophy];

  return (
    <ThemeCtx.Provider value={t}>
      <FmtCtx.Provider value={fmtCtx}>
        <style>{`
          *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
          body{margin:0;background:${t.bg};color:${t.text};
            font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
          button,input{font-family:inherit}
          ::-webkit-scrollbar{width:0;height:0}
          .hstrip{scrollbar-width:none}
        `}</style>
        <div
          style={{
            minHeight: "100vh",
            background: t.bg,
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "calc(env(safe-area-inset-bottom) + 14px)",
            paddingLeft: "max(8px, env(safe-area-inset-left))",
            paddingRight: "max(8px, env(safe-area-inset-right))",
          }}
        >
          <div style={{ maxWidth: 480, margin: "0 auto", display: "grid", gap: t.gap }}>
            {/* banner */}
            <div
              style={{
                width: 320,
                height: 50,
                maxWidth: "100%",
                margin: "8px auto 2px",
                border: `1px solid ${t.line}`,
                borderRadius: t.r.btn,
                overflow: "hidden",
                background: t.card,
              }}
            >
              <img
                src={BANNER_SRC}
                alt={APP.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            {/* menü */}
            <Segmented
              items={S.nav.map((n, i) => {
                const I = NAV_ICONS[i];
                return (
                  <span
                    key={n}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 9.5,
                      letterSpacing: ".04em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <I size={12} />
                    {n}
                  </span>
                );
              })}
              value={tab}
              onChange={setTab}
            />

            {tab === 0 && <PowerTab S={S} veh={veh} setVeh={setVeh} />}
            {tab === 1 && <DealerTab S={S} />}
            {tab === 2 && <BoardTab S={S} />}

            <RecentStrip S={S} />

            {/* alt bilgi */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                justifyContent: "center",
                flexWrap: "wrap",
                paddingTop: 4,
                fontSize: 10,
                color: t.muted,
              }}
            >
              <button
                onClick={() => setLangOpen(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  minHeight: 34,
                  padding: "0 10px",
                  background: t.btn,
                  border: `1px solid ${t.line}`,
                  borderRadius: t.r.btn,
                  color: t.text,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: ".09em",
                  cursor: "pointer",
                }}
              >
                <Globe size={12} />
                {lang.toUpperCase()}
              </button>
              <a href={APP.privacy} target="_blank" rel="noopener noreferrer" style={{ color: t.muted }}>
                {S.privacy}
              </a>
              <a href={APP.support} target="_blank" rel="noopener noreferrer" style={{ color: t.muted }}>
                {S.support}
              </a>
              <span style={{ fontFamily: MONO }}>
                {APP.name} {S.ver} {APP.version}
              </span>
            </div>
          </div>
        </div>

        <Welcome
          S={S}
          open={welcome}
          onClose={() => {
            setWelcome(false);
            markWelcome();
          }}
        />

        <Modal
          open={langOpen}
          title={S.lang}
          closeLabel={S.close}
          onClose={() => setLangOpen(false)}
        >
          {LANGS.map(([c, n]) => (
            <PickRow
              key={c}
              title={n}
              sub={c.toUpperCase()}
              right={
                c === lang ? (
                  <span style={{ color: t.accent, fontFamily: MONO, fontSize: 12 }}>●</span>
                ) : null
              }
              onClick={() => {
                setLang(c);
                rememberLang(c);
                setLangOpen(false);
              }}
            />
          ))}
        </Modal>
      </FmtCtx.Provider>
    </ThemeCtx.Provider>
  );
}
