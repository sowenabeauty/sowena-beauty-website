const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const scriptPath = path.join(root, "script.js");
const outputDir = path.join(root, "assets", "products");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

const sourceArg = process.argv.slice(2).join(" ").trim();

if (!sourceArg) {
  console.error("Usage: node tools/update-product-images.js \"C:\\\\path\\\\to\\\\product images\"");
  process.exit(1);
}

const sourceDir = path.resolve(sourceArg);

if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
  console.error(`Image folder not found: ${sourceDir}`);
  process.exit(1);
}

const normalize = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const walkImages = (dir) => {
  const found = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...walkImages(fullPath));
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (supportedExtensions.has(ext)) found.push(fullPath);
  }
  return found;
};

const readRawCatalogue = () => {
  const script = fs.readFileSync(scriptPath, "utf8");
  const match = script.match(/const rawCatalogue = (\{[\s\S]*?\n\});\s*\n\s*const categoryDescriptions/);
  if (!match) {
    throw new Error("Could not find rawCatalogue in script.js");
  }

  return {
    script,
    catalogue: vm.runInNewContext(`(${match[1]})`)
  };
};

const findImageForProduct = (productSlug, images) => {
  const exact = images.find((image) => image.slug === productSlug);
  if (exact) return exact;

  return images.find((image) => image.slug.includes(productSlug) || productSlug.includes(image.slug));
};

const replaceGeneratedMap = (script, entries) => {
  const start = "  // PRODUCT_IMAGES_AUTO_GENERATED_START";
  const end = "  // PRODUCT_IMAGES_AUTO_GENERATED_END";
  const startIndex = script.indexOf(start);
  const endIndex = script.indexOf(end);

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error("Could not find product image generation markers in script.js");
  }

  const generated = entries.length
    ? entries.map(([name, image]) => `  ${JSON.stringify(name)}: ${JSON.stringify(image)},`).join("\n")
    : "  // No product images generated yet.";

  return `${script.slice(0, startIndex + start.length)}\n${generated}\n${script.slice(endIndex)}`;
};

const main = () => {
  const { script, catalogue } = readRawCatalogue();
  const products = Object.values(catalogue).flat();
  const images = walkImages(sourceDir).map((filePath) => ({
    filePath,
    ext: path.extname(filePath).toLowerCase(),
    slug: normalize(path.basename(filePath, path.extname(filePath)))
  }));

  fs.mkdirSync(outputDir, { recursive: true });

  const matched = [];
  const unmatchedImages = new Set(images.map((image) => image.filePath));

  for (const productName of products) {
    const productSlug = normalize(productName);
    const image = findImageForProduct(productSlug, images);
    if (!image) continue;

    const outputFileName = `${productSlug}${image.ext}`;
    const outputPath = path.join(outputDir, outputFileName);
    fs.copyFileSync(image.filePath, outputPath);
    matched.push([productName, `./assets/products/${outputFileName}`]);
    unmatchedImages.delete(image.filePath);
  }

  const nextScript = replaceGeneratedMap(script, matched);
  fs.writeFileSync(scriptPath, nextScript);

  console.log(`Product images updated: ${matched.length}`);
  console.log(`Copied to: ${outputDir}`);

  if (unmatchedImages.size) {
    console.log("\nImages not matched to a product name:");
    [...unmatchedImages].forEach((filePath) => console.log(`- ${filePath}`));
  }

  const productsWithoutImages = products.length - matched.length;
  console.log(`\nProducts still using category fallback image: ${productsWithoutImages}`);
};

main();
