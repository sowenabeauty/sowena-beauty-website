const googleAnalyticsMeasurementId = "G-5N5W3493WT";

if (!document.querySelector('script[data-sowena-google-analytics]')) {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  window.gtag("js", new Date());
  window.gtag("config", googleAnalyticsMeasurementId);

  const googleAnalyticsScript = document.createElement("script");
  googleAnalyticsScript.async = true;
  googleAnalyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsMeasurementId}`;
  googleAnalyticsScript.dataset.sowenaGoogleAnalytics = "true";
  document.head.appendChild(googleAnalyticsScript);
}

const header = document.querySelector(".site-header");
const revealItems = document.querySelectorAll(".reveal");
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll("[data-hero-dot]");

const createFloatingContactWidget = () => {
  if (document.querySelector("[data-floating-contact-widget]")) return;

  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <div class="floating-contact-widget" data-floating-contact-widget>
        <a
          class="header-mobile-toggle"
          href="https://wa.me/84961751956?text=Hello%20Sowena%20Beauty%2C%20I%20would%20like%20to%20request%20a%20WhatsApp%20quote."
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="mobile-toggle-icon mobile-toggle-telegram" aria-hidden="true"></span>
          <span class="mobile-toggle-icon mobile-toggle-whatsapp" aria-hidden="true"></span>
          <span class="sr-only">Open WhatsApp quote</span>
        </a>
        <button
          class="floating-telegram-cta"
          type="button"
          aria-expanded="false"
          aria-controls="floating-contact-panel"
          data-mobile-contact-toggle
        >
          <span class="mobile-toggle-icon mobile-toggle-telegram" aria-hidden="true"></span>
          Community
        </button>
        <div class="mobile-contact-panel" id="floating-contact-panel" data-mobile-contact-panel hidden>
          <div class="mobile-contact-panel__inner">
            <div class="mobile-contact-panel__intro">
              <span class="mobile-toggle-icon mobile-toggle-telegram" aria-hidden="true"></span>
              <div>
                <strong>Wholesale sourcing community</strong>
                <p>Join our Telegram group for trusted wholesale sources, product updates and better partner pricing.</p>
              </div>
            </div>
            <form class="telegram-join-form" data-telegram-join-form>
              <label>
                <span>Name</span>
                <input type="text" name="customerName" autocomplete="name" required />
              </label>
              <label>
                <span>WhatsApp number</span>
                <input type="tel" name="whatsapp" autocomplete="tel" required />
              </label>
              <label>
                <span>Country</span>
                <input type="text" name="country" autocomplete="country-name" required />
              </label>
              <label class="telegram-join-form__check">
                <input type="checkbox" name="intent" required />
                <span>I want to join the group to receive the best wholesale sources and prices.</span>
              </label>
              <button type="submit">Send join request</button>
            </form>
          </div>
        </div>
      </div>
    `
  );
};

createFloatingContactWidget();

const mobileContactToggles = document.querySelectorAll("[data-mobile-contact-toggle]");
const telegramJoinForms = document.querySelectorAll("[data-telegram-join-form]");

const closeMobileContactPanels = (exceptPanel = null) => {
  document.querySelectorAll("[data-mobile-contact-panel]").forEach((panel) => {
    if (panel === exceptPanel) return;
    panel.hidden = true;
    panel.classList.remove("is-open");
    const toggle = panel
      .closest("[data-floating-contact-widget]")
      ?.querySelector("[data-mobile-contact-toggle]");
    toggle?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
};

mobileContactToggles.forEach((toggle) => {
  const panel = toggle
    .closest("[data-floating-contact-widget]")
    ?.querySelector("[data-mobile-contact-panel]");

  if (!panel) return;

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = panel.hidden;
    closeMobileContactPanels(panel);
    panel.hidden = !willOpen;
    panel.classList.toggle("is-open", willOpen);
    toggle.classList.toggle("is-open", willOpen);
    toggle.setAttribute("aria-expanded", String(willOpen));
  });
});

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-floating-contact-widget]")) return;
  closeMobileContactPanels();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMobileContactPanels();
});

telegramJoinForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const message = [
      "Hello Sowena Beauty, I would like to apply for the Telegram wholesale sourcing community. Please review and approve my request to join the group.",
      `Name: ${data.get("customerName")}`,
      `WhatsApp: ${data.get("whatsapp")}`,
      `Country: ${data.get("country")}`,
      "I want to join the group to receive the best wholesale sources and prices."
    ].join("\n");

    window.open(
      `https://wa.me/84961751956?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  });
});

if (heroSlides.length > 1) {
  let activeHeroSlide = 0;
  let heroSlideTimer;

  const setHeroSlide = (nextSlide) => {
    heroSlides[activeHeroSlide].classList.remove("is-active");
    heroDots[activeHeroSlide]?.classList.remove("is-active");
    activeHeroSlide = nextSlide;
    heroSlides[activeHeroSlide].classList.add("is-active");
    heroDots[activeHeroSlide]?.classList.add("is-active");
  };

  const startHeroSlider = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.clearInterval(heroSlideTimer);
    heroSlideTimer = window.setInterval(() => {
      setHeroSlide((activeHeroSlide + 1) % heroSlides.length);
    }, 4200);
  };

  heroDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      setHeroSlide(Number(dot.dataset.heroDot));
      startHeroSlider();
    });
  });

  startHeroSlider();
}

const rawCatalogue = {
  "Dermal Filler": [
    "Juvelook",
    "Juvederm Skinvive",
    "Juvederm Voluma",
    "Juvederm Ultra3",
    "Juvederm Ultra4",
    "Juvederm Vobela",
    "Juvederm Volift",
    "Juvederm XC",
    "Juvederm XC Plus",
    "Juvederm Volux",
    "Jariot VIP",
    "Helios VIP",
    "Revolax",
    "Neuramis",
    "Rejunese",
    "Restylane Skinbooster",
    "Restylane Kysse",
    "Restylane Defyne",
    "Restylane Refyne",
    "Restylane Lidocaine",
    "Restylane Eyelight",
    "Dermalax",
    "Ammi Eyes",
    "Admedic Hyaleca",
    "Hyadew",
    "Fabi Filler",
    "Milanie",
    "Dermacan",
    "Elasty",
    "Sardenya",
    "AT Filler",
    "Ultrafill",
    "Senorita",
    "Priere",
    "EPTQ",
    "Celine",
    "Amans",
    "Luxer",
    "Vesar",
    "Sculptra White",
    "Sculptra 2 Vial",
    "Sculptra 1 Vial",
    "Olidia PLLA",
    "Radiesse",
    "Chaeum",
    "Celosome VIP",
    "Stylage Vivacy",
    "White Filler Pro",
    "Arista",
    "Jariot Body",
    "Helios Body",
    "Maxxyfill Body",
    "France Body",
    "Sedy Fill Body",
    "Pink Fill Body",
    "Gouri",
    "GTM 3%",
    "GTM 5%",
    "GTM 8%"
  ],
  "Botulinum Toxin": [
    "Meditoxin 100",
    "Meditoxin 200",
    "Nabota 100",
    "Nabota 200",
    "Rentox 100",
    "Rentox 200",
    "Innotox 50",
    "Innotox 100",
    "Botulax 100",
    "Botulax 200",
    "Botulax 300",
    "Botox US 500",
    "Botox US 100",
    "Dysport 300",
    "Dysport 500",
    "Xeomin",
    "Blacktox",
    "Daxxify",
    "Kingtox",
    "Wondertox 100",
    "Wondertox 200",
    "Kaimax 200",
    "Hutox 100",
    "Hutox 200",
    "Neuronox 100",
    "Neuronox 200",
    "Evetox",
    "Onetox 100",
    "Onetox 200",
    "Coretox 100",
    "Toxta 100",
    "Bienox 100",
    "Liztox 100",
    "Rubytoxin 100",
    "Extox 100",
    "Dehantox 100",
    "Dehantox 200"
  ],
  "Fat Dissolving / Weight Loss": [
    "Aqualyx",
    "Muscle Evetox",
    "Ruby Luxury",
    "Lipolab",
    "Lemon Bottle",
    "Kabelline",
    "Gana Vline",
    "LRI Vline",
    "LRI Pro",
    "Tirzepatide 5mg",
    "Tirzepatide 10mg",
    "Tirzepatide 20mg",
    "Tirzepatide 30mg",
    "Retatrutide 10mg",
    "Retatrutide 30mg",
    "Retatrutide 60mg",
    "Mounjaro 2.5mg",
    "Mounjaro 5mg",
    "Mounjaro 7.5mg",
    "Mounjaro 10mg",
    "Mounjaro 12.5mg",
    "Mounjaro 15mg",
    "Ozempic",
    "V Line Sol"
  ],
  "IV Whitening Drip": [
    "Cindella Set",
    "Glutanex Drip Set",
    "Snow White",
    "Glutax 1000000",
    "Glutax 2200000",
    "Glutax 3500000",
    "Laroscorbine",
    "Placenta Collagen",
    "Lucchini",
    "Guthione 1200mg",
    "Glutathion 1200mg",
    "Luthione 12000mg"
  ],
  "Meso / Skin Booster": [
    "Skinfill Bacio",
    "Puri Lips",
    "VS NAD+",
    "VS Vitathione NAD+",
    "VS PNAD+",
    "VS Collagen NAD+",
    "VS Multi-lamellar NAD+",
    "VS Toxnad NAD+",
    "Complex ASCE",
    "Profhilo H+L",
    "Rubytoxin 100",
    "Puri PDRN",
    "Hyaron",
    "Jariot Baby Face",
    "Luhilo",
    "Luhilo Snow",
    "Dr. Lacir Mask",
    "Karisma",
    "NCTF (5 Bottles)",
    "Vitarium",
    "NCTF (10 Bottles)",
    "Exocode",
    "Exoten",
    "Evehilo",
    "Clear C'loud",
    "CURENEX Lipo Solution",
    "Curenex Snow Peel",
    "Curenex",
    "Derma Cindella PN",
    "Elravie Re2O",
    "Filorga Pink Glow X2",
    "GTM Melacell+",
    "Jaluro young eye",
    "Monica VIP Synerfill",
    "Monica VIP",
    "Multivita Inj",
    "NAD+ Complex",
    "Nadigo+",
    "Nadivo+ 500mg",
    "Nucleofill Strong",
    "P-Cell",
    "PDX 2 Whitening",
    "PDX 3 Purifying",
    "PDX 4 Revitalizing",
    "PDX 5 Total Solution",
    "Profilo Structura",
    "Reglory PN Plus",
    "Rejuran HB New",
    "Rejuran HB Old",
    "Rejuran Healer New",
    "Rejuran Healer Old",
    "Rejuran I New",
    "Rejuran I Old",
    "Rejuran S Old",
    "Rejuran S New",
    "Revok 50",
    "Teoxan 1",
    "Teoxan 2",
    "Vitaran HP",
    "Vitaran I",
    "Vitaran S",
    "Placentex",
    "Oxyx",
    "Laennec",
    "Pink Glow",
    "Kiara Reju",
    "Aqua PN",
    "Melsmon",
    "Jalupro Classic",
    "Jalupro Super Hydro",
    "Jalupro HMW",
    "Jalupro Young Eye",
    "RRS HA Eyes",
    "Ceret",
    "Lumi Eyes",
    "Richese Eyes",
    "Luna Eyes"
  ],
  "Topical Anaesthetic": [
    "Korean Medicaine",
    "J Cain 10.56%",
    "2% Anesthetic",
    "French Anesthetic",
    "Anesthetic 59.9",
    "Anesthetic 29.9",
    "Korean Medicaine 2%",
    "Samsung Anesthetic",
    "Anesthetic 15.6",
    "M-Caine Cream",
    "Lidocaine Cream",
    "Jade Caine Cream",
    "Chaeum 10.56",
    "Liporase",
    "Hyalaze",
    "Malinda Anesthetic"
  ]
};

const categoryDescriptions = {
  "Dermal Filler": "Dermal filler and biostimulator item from the Sowena catalogue.",
  "Botulinum Toxin": "Botulinum toxin product listing for quotation and availability confirmation.",
  "Fat Dissolving / Weight Loss": "Fat dissolving and weight-loss solution listed for professional enquiry.",
  "IV Whitening Drip": "IV whitening drip and brightening support product from the Sowena catalogue.",
  "Meso / Skin Booster": "Meso, PN, PDRN and skin booster item for professional aesthetic supply requests.",
  "Topical Anaesthetic": "Topical anaesthetic and procedure-support item from the Sowena catalogue."
};

const categoryImages = {
  "Dermal Filler": "./assets/sowena-hero.png",
  "Botulinum Toxin": "./assets/sowena-hero.png",
  "Fat Dissolving / Weight Loss": "./assets/sowena-hero.png",
  "IV Whitening Drip": "./assets/sowena-logo-transparent.png",
  "Meso / Skin Booster": "./assets/sowena-hero.png",
  "Topical Anaesthetic": "./assets/sowena-logo-transparent.png"
};

const productImages = {
  // PRODUCT_IMAGES_AUTO_GENERATED_START
  "Skinfill Bacio": "./assets/products/skinfill-bacio.webp",
  "Puri Lips": "./assets/products/puri-lips.webp",
  "VS NAD+": "./assets/products/vs-nad.webp",
  "VS Vitathione NAD+": "./assets/products/vs-vitathione-nad.webp",
  "VS PNAD+": "./assets/products/vs-pnad.webp",
  "VS Collagen NAD+": "./assets/products/vs-collagen-nad.webp",
  "VS Multi-lamellar NAD+": "./assets/products/vs-multi-lamellar-nad.webp",
  "VS Toxnad NAD+": "./assets/products/vs-toxnad-nad.webp",
  "Complex ASCE": "./assets/products/complex-asce.webp",
  "Profhilo H+L": "./assets/products/profhilo-h-l.webp",
  "Puri PDRN": "./assets/products/puri-pdrn.webp",
  "Hyaron": "./assets/products/hyaron.webp",
  "Jariot Baby Face": "./assets/products/jariot-baby-face.webp",
  "Luhilo": "./assets/products/luhilo.webp",
  "Luhilo Snow": "./assets/products/luhilo-snow.webp",
  "Dr. Lacir Mask": "./assets/products/dr-lacir-mask.webp",
  "Karisma": "./assets/products/karisma.webp",
  "NCTF (5 Bottles)": "./assets/products/nctf-5-bottles.webp",
  "Vitarium": "./assets/products/vitarium.webp",
  "NCTF (10 Bottles)": "./assets/products/nctf-10-bottles.webp",
  "Exocode": "./assets/products/exocode.webp",
  "Exoten": "./assets/products/exoten.webp",
  "Evehilo": "./assets/products/evehilo.webp",
  "Clear C'loud": "./assets/products/clear-c-loud.webp",
  "CURENEX Lipo Solution": "./assets/products/curenex-lipo-solution.webp",
  "Curenex Snow Peel": "./assets/products/curenex-snow-peel.webp",
  "Curenex": "./assets/products/curenex.webp",
  "Derma Cindella PN": "./assets/products/derma-cindella-pn.webp",
  "Elravie Re2O": "./assets/products/elravie-re2o.webp",
  "Filorga Pink Glow X2": "./assets/products/filorga-pink-glow-x2.webp",
  "GTM Melacell+": "./assets/products/gtm-melacell.webp",
  "Jaluro young eye": "./assets/products/jaluro-young-eye.webp",
  "Monica VIP Synerfill": "./assets/products/monica-vip-synerfill.webp",
  "Monica VIP": "./assets/products/monica-vip.webp",
  "Multivita Inj": "./assets/products/multivita-inj.webp",
  "NAD+ Complex": "./assets/products/nad-complex.webp",
  "Nadigo+": "./assets/products/nadigo.webp",
  "Nadivo+ 500mg": "./assets/products/nadivo-500mg.webp",
  "Nucleofill Strong": "./assets/products/nucleofill-strong.webp",
  "P-Cell": "./assets/products/p-cell.webp",
  "PDX 2 Whitening": "./assets/products/pdx-2-whitening.webp",
  "PDX 3 Purifying": "./assets/products/pdx-3-purifying.webp",
  "PDX 4 Revitalizing": "./assets/products/pdx-4-revitalizing.webp",
  "PDX 5 Total Solution": "./assets/products/pdx-5-total-solution.webp",
  "Profilo Structura": "./assets/products/profhilo-structura.webp",
  "Reglory PN Plus": "./assets/products/reglory-pn-plus.webp",
  "Rejuran HB New": "./assets/products/rejuran-hb-new.webp",
  "Rejuran HB Old": "./assets/products/rejuran-hb-old.webp",
  "Rejuran Healer New": "./assets/products/rejuran-healer-new.webp",
  "Rejuran Healer Old": "./assets/products/rejuran-healer-old.webp",
  "Rejuran I New": "./assets/products/rejuran-i-new.webp",
  "Rejuran I Old": "./assets/products/rejuran-i-old.webp",
  "Rejuran S Old": "./assets/products/rejuran-s-old.webp",
  "Rejuran S New": "./assets/products/rejuran-s-new.webp",
  "Revok 50": "./assets/products/revok-50.webp",
  "Teoxan 1": "./assets/products/teoxan-1.webp",
  "Teoxan 2": "./assets/products/teoxan-2.webp",
  "Vitaran HP": "./assets/products/vitaran-hp.webp",
  "Vitaran I": "./assets/products/vitaran-i.webp",
  "Vitaran S": "./assets/products/vitaran-s.webp",
  "Placentex": "./assets/products/placentex.webp",
  "Oxyx": "./assets/products/oxyx.webp",
  "Laennec": "./assets/products/laennec.webp",
  "Pink Glow": "./assets/products/pink-glow.webp",
  "Kiara Reju": "./assets/products/kiara-reju.webp",
  "Aqua PN": "./assets/products/aqua-pn.webp",
  "Melsmon": "./assets/products/melsmon.webp",
  "Jalupro Classic": "./assets/products/jalupro-classic.webp",
  "Jalupro Super Hydro": "./assets/products/jalupro-super-hydro.webp",
  "Jalupro HMW": "./assets/products/jalupro-hmw.webp",
  "RRS HA Eyes": "./assets/products/rrs-ha-eyes.webp",
  "Ceret": "./assets/products/ceret.webp",
  "Lumi Eyes": "./assets/products/lumi-eyes.webp",
  "Richese Eyes": "./assets/products/richese-eyes.webp",
  "Luna Eyes": "./assets/products/luna-eyes.webp",
  // PRODUCT_IMAGES_AUTO_GENERATED_END
};

const brandAliases = [
  "Juvederm",
  "Restylane",
  "Sculptra",
  "Rejuran",
  "Jalupro",
  "Teoxan",
  "Teoxane",
  "NCTF",
  "GTM",
  "VS",
  "LRI",
  "Mounjaro",
  "Tirzepatide",
  "Retatrutide",
  "Dysport",
  "Botox",
  "Meditoxin",
  "Nabota",
  "Botulax",
  "Innotox",
  "Neuronox",
  "Rubytoxin",
  "Korean Medicaine"
];

const originAliases = [
  { match: /juvederm|botox|daxxify|mounjaro|ozempic|tirzepatide|retatrutide/i, origin: "USA" },
  { match: /restylane|dysport|sculptra|radiesse|stylage|vivacy|teoxan|teoxane|jalupro|aqualyx|french|france/i, origin: "Europe" }
];

const inferBrand = (name) =>
  brandAliases.find((brand) => name.toLowerCase().startsWith(brand.toLowerCase())) ||
  name.split(" ")[0];

const inferOrigin = (name) =>
  originAliases.find((item) => item.match.test(name))?.origin || "Korea";

const products = Object.entries(rawCatalogue).flatMap(([category, names]) =>
  names.map((name) => ({
    name,
    category,
    brand: inferBrand(name),
    origin: inferOrigin(name),
    description: categoryDescriptions[category],
    image: productImages[name] || categoryImages[category]
  }))
);

const selectedProducts = new Set();

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const grid = document.querySelector("[data-products-grid]");
const tableBody = document.querySelector("[data-products-table]");
const searchInput = document.querySelector("[data-search]");
const categoryFilter = document.querySelector("[data-category-filter]");
const brandFilter = document.querySelector("[data-brand-filter]");
const originFilter = document.querySelector("[data-origin-filter]");
const countEl = document.querySelector("[data-results-count]");
const activeFiltersEl = document.querySelector("[data-active-filters]");
const clearFilters = document.querySelector("[data-clear-filters]");
const quickFilters = document.querySelectorAll("[data-quick-filter]");
const quoteCount = document.querySelector("[data-quote-count]");
const sendQuote = document.querySelector("[data-send-quote]");

const unique = (key) => ["All", ...new Set(products.map((product) => product[key]))];

const fillSelect = (select, values) => {
  if (!select) return;
  select.innerHTML = values
    .map((value) => `<option value="${value}">${value}</option>`)
    .join("");
};

const getFilters = () => ({
  search: searchInput?.value.trim().toLowerCase() || "",
  category: categoryFilter?.value || "All",
  brand: brandFilter?.value || "All",
  origin: originFilter?.value || "All"
});

const matchesFilters = (product, filters) => {
  const text = `${product.name} ${product.category} ${product.brand} ${product.origin}`.toLowerCase();
  return (
    (!filters.search || text.includes(filters.search)) &&
    (filters.category === "All" || product.category === filters.category) &&
    (filters.brand === "All" || product.brand === filters.brand) &&
    (filters.origin === "All" || product.origin === filters.origin)
  );
};

const productId = (product) => `${product.brand}-${product.name}`.replace(/\s+/g, "-").toLowerCase();

const updateQuoteDrawer = () => {
  if (!quoteCount || !sendQuote) return;
  quoteCount.textContent = selectedProducts.size;
  const selected = products.filter((product) => selectedProducts.has(productId(product)));
  const body = selected.map((product) => `- ${product.name} (${product.brand}, ${product.category})`).join("%0A");
  sendQuote.classList.toggle("disabled", selected.length === 0);
  sendQuote.href =
    selected.length === 0
      ? "https://wa.me/84961751956"
      : `https://wa.me/84961751956?text=Hello%20Sowena%20Beauty%2C%0AI%20would%20like%20to%20request%20a%20quotation%20for%3A%0A${body}`;
};

const toggleProduct = (id) => {
  if (selectedProducts.has(id)) {
    selectedProducts.delete(id);
  } else {
    selectedProducts.add(id);
  }
  renderProducts();
  updateQuoteDrawer();
};

const renderActiveFilters = (filters) => {
  if (!activeFiltersEl) return;
  const active = [];
  if (filters.search) active.push(`Search: ${filters.search}`);
  if (filters.category !== "All") active.push(`Category: ${filters.category}`);
  if (filters.brand !== "All") active.push(`Brand: ${filters.brand}`);
  if (filters.origin !== "All") active.push(`Origin: ${filters.origin}`);
  activeFiltersEl.innerHTML = active.map((filter) => `<span>${filter}</span>`).join("");
};

const renderProducts = () => {
  if (!grid || !tableBody) return;
  const filters = getFilters();
  const filtered = products.filter((product) => matchesFilters(product, filters));

  grid.innerHTML = filtered
    .map((product) => {
      const id = productId(product);
      const selected = selectedProducts.has(id);
      return `
        <article class="catalogue-card reveal is-visible">
          <figure class="catalogue-card-visual">
            <span>
              <img src="${product.image}" alt="${product.name}" loading="lazy" />
            </span>
          </figure>
          <div class="catalogue-card-body">
            <div class="catalogue-meta">
              <span>${product.category}</span>
              <span>${product.origin}</span>
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <button class="add-quote ${selected ? "is-selected" : ""}" data-product-id="${id}" type="button">
              ${selected ? "Selected" : "Add to quote"}
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  tableBody.innerHTML = filtered
    .map((product) => {
      const id = productId(product);
      const selected = selectedProducts.has(id);
      return `
        <tr>
          <td><strong>${product.name}</strong></td>
          <td>${product.category}</td>
          <td>${product.brand}</td>
          <td>${product.origin}</td>
          <td><button class="table-action" data-product-id="${id}" type="button">${selected ? "Selected" : "Add"}</button></td>
        </tr>
      `;
    })
    .join("");

  if (countEl) countEl.textContent = `${filtered.length} products found`;
  renderActiveFilters(filters);

  document.querySelectorAll("[data-product-id]").forEach((button) => {
    button.addEventListener("click", () => toggleProduct(button.dataset.productId));
  });
};

if (grid) {
  fillSelect(categoryFilter, unique("category"));
  fillSelect(brandFilter, unique("brand"));
  fillSelect(originFilter, unique("origin"));

  [searchInput, categoryFilter, brandFilter, originFilter].forEach((control) => {
    control?.addEventListener("input", renderProducts);
    control?.addEventListener("change", renderProducts);
  });

  quickFilters.forEach((button) => {
    button.addEventListener("click", () => {
      quickFilters.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      if (categoryFilter) categoryFilter.value = button.dataset.quickFilter || "All";
      renderProducts();
    });
  });

  clearFilters?.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    if (categoryFilter) categoryFilter.value = "All";
    if (brandFilter) brandFilter.value = "All";
    if (originFilter) originFilter.value = "All";
    quickFilters.forEach((item) => item.classList.remove("is-active"));
    document.querySelector('[data-quick-filter="All"]')?.classList.add("is-active");
    renderProducts();
  });

  document.querySelector('[data-quick-filter="All"]')?.classList.add("is-active");
  renderProducts();
  updateQuoteDrawer();
}

const offerConfig = {
  code: "SOWENA10",
  phone: "84961751956",
  validDays: 30,
  minimumProducts: 10,
  minimumOrderValue: 1000
};

const getOfferDeadline = () => {
  const deadline = new Date(Date.now() + offerConfig.validDays * 24 * 60 * 60 * 1000);
  return deadline.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

const getOfferMessage = (deadline) =>
  `Hello Sowena Beauty, I would like to receive the ${offerConfig.code} discount code. I understand the offer is valid until ${deadline} and applies to orders of ${offerConfig.minimumProducts}+ products or orders over $${offerConfig.minimumOrderValue}.`;

const getOfferClaimedUntil = () => Number(window.localStorage.getItem("sowenaOfferClaimedUntil") || 0);

const hasActiveOfferClaim = () => getOfferClaimedUntil() > Date.now();

const createOfferPopup = () => {
  let popup = document.querySelector("[data-offer-popup]");
  if (popup) return popup;

  const deadline = getOfferDeadline();
  const whatsappUrl = `https://wa.me/${offerConfig.phone}?text=${encodeURIComponent(getOfferMessage(deadline))}`;
  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <div class="offer-popup" data-offer-popup role="dialog" aria-modal="true" aria-labelledby="offer-popup-title" aria-hidden="true">
        <div class="offer-popup__backdrop" data-offer-close></div>
        <div class="offer-popup__panel">
          <button class="offer-popup__close" type="button" data-offer-close aria-label="Close offer">x</button>
          <span class="offer-popup__badge">Limited website offer</span>
          <h2 id="offer-popup-title">Get 10% off your quote</h2>
          <p>
            Receive your discount code on WhatsApp. Valid for ${offerConfig.validDays}
            days and applied to orders of ${offerConfig.minimumProducts}+ products
            or orders over $${offerConfig.minimumOrderValue}.
          </p>
          <div class="offer-popup__code" aria-label="Discount code">
            <span>Your code</span>
            <strong>${offerConfig.code}</strong>
          </div>
          <p class="offer-popup__deadline">Valid until ${deadline}</p>
          <div class="offer-popup__actions">
            <a class="button primary" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" data-offer-claim>
              Receive on WhatsApp
            </a>
            <button class="button secondary" type="button" data-offer-close>Maybe later</button>
          </div>
        </div>
      </div>
    `
  );

  popup = document.querySelector("[data-offer-popup]");
  popup.querySelectorAll("[data-offer-close]").forEach((control) => {
    control.addEventListener("click", () => hideOfferPopup());
  });
  popup.querySelector("[data-offer-claim]")?.addEventListener("click", () => {
    const claimedUntil = Date.now() + offerConfig.validDays * 24 * 60 * 60 * 1000;
    window.localStorage.setItem("sowenaOfferClaimedUntil", String(claimedUntil));
    hideOfferPopup();
  });

  return popup;
};

const showOfferPopup = () => {
  if (hasActiveOfferClaim()) return;
  const popup = createOfferPopup();
  popup.classList.add("is-visible");
  popup.setAttribute("aria-hidden", "false");
  document.body.classList.add("has-offer-popup");
};

const hideOfferPopup = () => {
  const popup = document.querySelector("[data-offer-popup]");
  if (!popup) return;
  popup.classList.remove("is-visible");
  popup.setAttribute("aria-hidden", "true");
  document.body.classList.remove("has-offer-popup");
};

const scheduleOfferPopup = () => {
  if (hasActiveOfferClaim()) return;

  const pageKey = window.location.pathname || "/";
  const firstVisitKey = "sowenaOfferFirstVisit";
  const reminderKey = `sowenaOfferReminder:${pageKey}`;

  if (!window.sessionStorage.getItem(firstVisitKey)) {
    window.sessionStorage.setItem(firstVisitKey, "true");
    window.setTimeout(showOfferPopup, 30000);
    return;
  }

  if (!window.sessionStorage.getItem(reminderKey)) {
    window.sessionStorage.setItem(reminderKey, "true");
    window.setTimeout(showOfferPopup, 1000);
  }
};

scheduleOfferPopup();
