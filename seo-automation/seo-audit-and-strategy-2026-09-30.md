# Sowena Beauty Global SEO Audit and Strategy

Audit date: 2026-09-30

## 1. Website SEO audit

The source repository contains 11 HTML pages: one homepage, one catalogue, one brand page, one contact page, one legacy solutions page, one blog index and five blog articles. The sitemap listed all 11 URLs at audit time.

The local link audit found no broken internal HTML links. Every canonical page has one H1. Titles and meta descriptions are unique across the current pages.

The most important technical issue was `solutions.html`: it had no inbound internal links, appeared in the sitemap and declared `brand.html` as its canonical. This mixed redirect, sitemap and canonical signals. The fix removes it from the sitemap and adds a permanent Vercel redirect to `brand.html`.

The catalogue is populated with JavaScript. Some search crawlers and link-analysis tools may initially see an empty table. Crawlable category and pillar pages should be added as the roadmap grows.

## 2. Existing content inventory

The complete inventory is stored in `sowena-seo-master-tracker.xlsx`, including URL, page type, title, intent, approximate word count, inbound links, contextual links, external references, problems and recommendations.

Current blog articles:

1. Rubytoxin 100 and Expression Line Care
2. Skinfill Bacio Benefits for Dry-Looking Lips
3. Puri Lips Benefits for Dry, Chapped-Looking Lips
4. Skin Volume, Hydration and Facial Balance Guide
5. How to Choose Korean Aesthetic Products for Your Skin Goals

All five need expansion. Product articles currently contain approximately 606-804 article-body words; educational articles contain approximately 441-483 words. These are below the new targets of 1,200-2,000 and 1,500-2,500 words.

## 3. Content gap analysis

Priority gaps:

- No dedicated crawlable category pages for major catalogue categories.
- No fully developed pillar pages for Rejuran, PDRN/PN, NAD+, fillers, botulinum toxin, eye-area products, exosomes or product authenticity.
- Existing articles do not yet form reciprocal topic clusters.
- Skinfill Bacio and Puri Lips overlap on lip hydration intent and need clearer differentiation.
- Existing product articles do not consistently cover verified packaging, professional buyer considerations and related-product comparisons.
- Search Console and verified keyword-volume data are not connected, so high-volume labels cannot yet be claimed.
- Several homepage featured products are generic examples rather than verified catalogue items.

## 4. Proposed 100-article roadmap

The roadmap contains exactly 100 new articles in a strict repeating sequence:

- Four product/commercial articles
- One supporting educational article

This pattern repeats 20 times, producing 80 product articles and 20 educational articles. The detailed order, keywords, slugs, image status, internal-link targets, source requirements and publication status are stored in the `Roadmap 100` sheet.

## 5. Topic cluster architecture

The 20 clusters are:

1. NAD+ skin boosters
2. Advanced NAD+ formulas
3. PDRN and PN
4. Rejuran
5. Polynucleotide alternatives
6. Hybrid hyaluronic acid
7. Jalupro
8. NCTF and revitalisation
9. Eye-area products
10. Exosome products
11. Collagen biostimulators
12. Korean HA fillers
13. Premium filler systems
14. Lip filler products
15. Body filler products
16. Established botulinum toxin products
17. Korean botulinum toxin products
18. Body contouring products
19. Topical anaesthetic products
20. Authenticity, storage and sourcing

Each cluster uses the fifth article as its pillar or educational hub.

## 6. Keyword strategy

Product pages target commercial-investigation terms built around the verified product name plus modifiers such as `wholesale`, `supplier`, `professional guide`, `packaging` and the relevant product category.

Educational articles target broader informational questions that support the preceding four products. Secondary keywords are mapped in the tracker but must be validated against live query data before publication.

No keyword is labelled high-volume without evidence. Search Console should become the primary source once connected; Keyword Planner or a licensed SEO platform can supplement it.

## 7. Internal linking architecture

Every product article should link contextually to:

- The relevant educational pillar
- The catalogue
- The contact or quotation page
- One or two genuinely related articles when available

Every pillar should link back to its four product articles. Reciprocal links should be added to older pages when a future target becomes live. The exact relationships appear in the `Internal Links` sheet.

## 8. External source strategy

Product-specific facts should come from verified official manufacturer pages. Scientific or safety context should use PubMed, NIH, FDA, WHO, government sources, professional associations or peer-reviewed journals as relevant.

Competing ecommerce sellers are not acceptable evidence for product facts. Unverified certifications, approvals, studies, compositions, statistics and manufacturer claims must be omitted.

## 9. SEO tracker structure

The master tracker includes:

- ID
- Article title
- Cluster
- Article type
- Primary keyword
- Secondary keywords
- Search intent
- Proposed slug
- Image
- Internal links
- External sources
- Status
- Published URL
- Publish date
- Index status
- Last update
- Notes

Allowed statuses are `PLANNED`, `RESEARCHING`, `WRITING`, `SEO QA`, `READY`, `PUBLISHED`, `FAILED` and `UPDATE REQUIRED`.

## 10. Publishing workflow

Audit, select, research, verify image, outline, write, fact-check, add links, optimize metadata, add accurate schema, perform SEO QA, preview desktop and mobile, check links, publish, verify the live URL, update the sitemap, update the tracker and add reciprocal links.

After article 100, bulk mode ends automatically. The maintenance limit is one new article per day, with updates prioritized when an existing page already satisfies the same intent.

## 11. Technical SEO checklist

- One H1
- Unique title, meta description and slug
- Canonical URL
- Indexable robots directive
- Responsive hero image with descriptive ALT text
- Open Graph and Twitter metadata
- Article schema
- Breadcrumb schema when implemented consistently
- FAQ schema only when visible FAQ content is useful
- No fabricated Product schema fields
- Three to six useful internal links
- One to three verified external references where relevant
- Sitemap entry and current `lastmod`
- Desktop and mobile preview
- Broken-link check

## 12. Problems to fix before and during bulk publishing

The legacy solutions URL is fixed first. Existing thin articles should be expanded through the normal roadmap and maintenance workflow rather than blocking all new content. Crawlable category pages, homepage product accuracy, image self-hosting and Search Console access remain high-priority improvements.
