import { readFileSync, writeFileSync } from "node:fs";

const indexPath = new URL("../blog/index.html", import.meta.url);
const source = readFileSync(indexPath, "utf8");
const sectionStart = source.indexOf('      <section class="blog-list-section');
const mainEnd = source.indexOf("    </main>", sectionStart);
const sectionEnd = source.lastIndexOf("      </section>", mainEnd);

if (sectionStart === -1 || sectionEnd === -1) {
  throw new Error("Could not find the blog list section.");
}

const oldSection = source.slice(sectionStart, sectionEnd + "      </section>".length);
const cardPattern = /<article class="[^"]*\bblog-card\b[^"]*"[\s\S]*?<\/article>/g;
const cards = [...oldSection.matchAll(cardPattern)].map((match) => match[0]);

if (cards.length < 12) {
  throw new Error(`Expected at least 12 blog cards, found ${cards.length}.`);
}

const getHref = (card) => card.match(/class="blog-card-media" href="([^"]+)"/)?.[1] ?? "";
const getRoadmapNumber = (card) => {
  const match = card.match(/data-(?:gpt-)?roadmap-id="SEO-(\d+)"/);
  return match ? Number(match[1]) : -1;
};
const formatCard = (card, modifier, extraAttribute = "") => {
  const normalized = card
    .trim()
    .replace(/\s(?:data-blog-more-card|role="listitem")/g, "")
    .replace(
      /class="[^"]*\bblog-card\b[^"]*"/,
      `class="blog-card ${modifier} reveal"${extraAttribute ? ` ${extraAttribute}` : ""}`
    );
  return normalized
    .split("\n")
    .map((line) => `          ${line.trimStart()}`)
    .join("\n");
};

const topSearchHrefs = [
  "./lemon-bottle-professional-guide.html",
  "./rejuran-product-range-explained-for-professional-buyers.html",
  "./korean-dermal-filler-wholesale.html",
  "./korean-aesthetic-product-supplier.html"
];

const topCards = topSearchHrefs.map((href) => {
  const card = cards.find((candidate) => getHref(candidate) === href);
  if (!card) throw new Error(`Missing top-search article card: ${href}`);
  return card;
});

const topCardSet = new Set(topCards);
const latestCards = cards
  .filter((card) => !topCardSet.has(card) && getRoadmapNumber(card) >= 0)
  .sort((left, right) => getRoadmapNumber(right) - getRoadmapNumber(left))
  .slice(0, 8);
const latestCardSet = new Set(latestCards);
const moreCards = cards.filter((card) => !topCardSet.has(card) && !latestCardSet.has(card));

const newSection = `      <section class="blog-list-section blog-library" aria-label="Sowena Beauty article library">
        <section class="blog-library-group blog-library-group--popular" aria-labelledby="popular-searches-title">
          <div class="blog-list-heading blog-list-heading--split">
            <div>
              <p class="eyebrow">Popular searches</p>
              <h2 id="popular-searches-title">Guides customers look for first</h2>
            </div>
            <p>High-interest sourcing and product topics, prioritised from current catalogue demand and search intent.</p>
          </div>

          <div class="blog-card-grid blog-card-grid--popular" role="list" aria-label="Four popular article guides">
${topCards.map((card) => formatCard(card, "blog-card--priority", 'role="listitem"')).join("\n")}
          </div>
        </section>

        <section class="blog-library-group" aria-labelledby="latest-articles-title">
          <div class="blog-list-heading blog-list-heading--split">
            <div>
              <p class="eyebrow">Recently published</p>
              <h2 id="latest-articles-title">Latest articles</h2>
            </div>
            <p>New product comparisons, sourcing checks and practical beauty education from the Sowena team.</p>
          </div>

          <div class="blog-card-grid blog-card-grid--latest">
            <!-- Add newly published article cards at the start of this grid. -->
${latestCards.map((card) => formatCard(card, "blog-card--latest")).join("\n")}
          </div>
        </section>

        <section class="blog-library-group" aria-labelledby="more-insights-title">
          <div class="blog-list-heading blog-list-heading--split">
            <div>
              <p class="eyebrow">Beauty library</p>
              <h2 id="more-insights-title">More product insights</h2>
            </div>
            <p>Browse the complete collection of product guides, ingredient explainers and professional buying notes.</p>
          </div>

          <div class="blog-card-grid blog-card-grid--more" id="blog-more-grid" data-blog-more-grid>
${moreCards.map((card) => formatCard(card, "blog-card--secondary", "data-blog-more-card")).join("\n")}
          </div>
          <div class="blog-load-more-wrap">
            <button class="button button-secondary blog-load-more" type="button" data-blog-load-more aria-controls="blog-more-grid">
              Load more articles
            </button>
          </div>
        </section>
      </section>`;

const updated = source.slice(0, sectionStart) + newSection + source.slice(sectionEnd + "      </section>".length);
writeFileSync(indexPath, updated, "utf8");

console.log(`Rebuilt blog index: ${topCards.length} popular, ${latestCards.length} latest, ${moreCards.length} more.`);
