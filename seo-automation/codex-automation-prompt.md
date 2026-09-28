# Codex Automation Prompt

Use this prompt when creating a Codex scheduled automation after usage limits allow it.

```text
Run the Sowena Beauty Global SEO blog publishing workflow.

Default settings:
- Target market: Global
- Article language: English
- Product priority: all products and categories contained in the website catalogue
- Publishing cadence: 1 article per day at 8:00 PM Vietnam time
- Planning rule: keep the next 7 days drafted or scheduled in advance
- Product order: follow `seo-automation/product-seo-queue.csv`, then continue by website catalogue category order
- Timezone: Asia/Ho_Chi_Minh

For each run:
1. Pull the latest GitHub `main`.
2. Select the next unpublished product from `seo-automation/product-seo-queue.csv`.
3. Confirm that the product has image or video media in `assets/products/`.
4. If real keyword-volume exports are available, use them to refine the title and headings without breaking product order.
5. Write a practical buyer-focused SEO article in English.
6. Avoid medical claims, treatment-result promises, and unsupported regulatory claims.
7. Include the product image or video, internal links to products, brand and contact pages, plus a WhatsApp quotation CTA.
8. Create the static HTML article in `blog/`.
9. Update `blog/index.html`.
10. Update `sitemap.xml`.
11. Mark the queue row as published and keep the next 7 days planned.
12. Validate JSON-LD, sitemap XML, and basic syntax.
13. Commit and push to GitHub `main`.

If required keyword data is missing, continue with the catalogue-driven content plan and mark the topic as needing keyword volume validation.
```
