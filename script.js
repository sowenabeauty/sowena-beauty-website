const header = document.querySelector(".site-header");
const revealItems = document.querySelectorAll(".reveal");
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
    "Placentex",
    "Rejuran Healer V1",
    "Rejuran Healer V2",
    "Rejuran S V1",
    "Rejuran S V2",
    "Rejuran I V1",
    "Rejuran I V2",
    "Rejuran HB V1",
    "Rejuran HB V2",
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
    "Teoxane",
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

const brandAliases = [
  "Juvederm",
  "Restylane",
  "Sculptra",
  "Rejuran",
  "Jalupro",
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
  { match: /restylane|dysport|sculptra|radiesse|stylage|vivacy|teoxane|jalupro|aqualyx|french|france/i, origin: "Europe" }
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
    image: categoryImages[category]
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
      ? "https://wa.me/821032577559"
      : `https://wa.me/821032577559?text=Hello%20Sowena%20Beauty%2C%0AI%20would%20like%20to%20request%20a%20quotation%20for%3A%0A${body}`;
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
          <div class="catalogue-card-visual">
            <img src="${product.image}" alt="${product.name}" />
          </div>
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
