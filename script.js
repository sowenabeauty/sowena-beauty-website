const header = document.querySelector(".site-header");
const revealItems = document.querySelectorAll(".reveal");
const products = [
  {
    name: "Juvederm Ultra 4",
    category: "Dermal Filler",
    brand: "Juvederm",
    origin: "USA",
    description: "Premium dermal filler product for professional aesthetic supply requests.",
    image: "./assets/sowena-hero.png"
  },
  {
    name: "Rejuran Healer",
    category: "Skin Booster",
    brand: "Rejuran",
    origin: "Korea",
    description: "Skin booster / PN product group for clinic and partner catalogue enquiries.",
    image: "./assets/sowena-hero.png"
  },
  {
    name: "Botox Type A",
    category: "Toxin",
    brand: "Allergan",
    origin: "USA",
    description: "Toxin product listing for quotation and availability confirmation.",
    image: "./assets/sowena-hero.png"
  },
  {
    name: "Dysport",
    category: "Toxin",
    brand: "Galderma",
    origin: "Europe",
    description: "Professional aesthetic product for B2B enquiry workflows.",
    image: "./assets/sowena-hero.png"
  },
  {
    name: "Sculptra",
    category: "Biostimulator",
    brand: "Galderma",
    origin: "Europe",
    description: "Biostimulator category item for partner and distributor requests.",
    image: "./assets/sowena-hero.png"
  },
  {
    name: "Mounjaro",
    category: "Aesthetic Solution",
    brand: "Lilly",
    origin: "USA",
    description: "Listed for professional product quotation only, subject to market availability.",
    image: "./assets/sowena-hero.png"
  },
  {
    name: "Injection Supply Kit",
    category: "Injection Supply",
    brand: "Sowena",
    origin: "Korea",
    description: "Support item category for professional aesthetic supply requests.",
    image: "./assets/sowena-logo-transparent.png"
  },
  {
    name: "Clinic Partner Bundle",
    category: "Partner Bundle",
    brand: "Sowena",
    origin: "Korea",
    description: "Mixed product request bundle for clinics, resellers and distributors.",
    image: "./assets/sowena-logo-transparent.png"
  }
];

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
  const body = selected.map((product) => `- ${product.name} (${product.brand}, ${product.category})`).join("%0D%0A");
  sendQuote.classList.toggle("disabled", selected.length === 0);
  sendQuote.href =
    selected.length === 0
      ? "mailto:sowenabeauty.support@gmail.com"
      : `mailto:sowenabeauty.support@gmail.com?subject=Sowena%20product%20quotation%20request&body=Hello%20Sowena%20Beauty%2C%0D%0AI%20would%20like%20to%20request%20a%20quotation%20for%3A%0D%0A${body}`;
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
