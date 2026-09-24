# Codex Automation Prompt

Use this prompt when creating a Codex scheduled automation after usage limits allow it.

```text
Run the Sowena Beauty Global SEO blog publishing workflow.

Default settings:
- Target market: Global
- Article language: English
- Product priority: all products and categories contained in the website catalogue
- Publishing cadence: Monday, Wednesday, Friday at 8:00 PM Vietnam time
- Timezone: Asia/Ho_Chi_Minh

For each run:
1. Pull the latest GitHub `main`.
2. Select the next unpublished topic from `seo-automation/content-calendar-template.csv`.
3. If real keyword-volume exports are available, prioritize stronger search demand.
4. Write a practical buyer-focused SEO article in English.
5. Avoid medical claims, treatment-result promises, and unsupported regulatory claims.
6. Include internal links to products, solutions, brand, and contact pages where relevant.
7. Include a WhatsApp quotation CTA and mention SOWENA10 only where natural.
8. Create the static HTML article in `blog/`.
9. Update `blog/index.html`.
10. Update `sitemap.xml`.
11. Validate JSON-LD, sitemap XML, and basic syntax.
12. Commit and push to GitHub `main`.

If required keyword data is missing, continue with the catalogue-driven content plan and mark the topic as needing keyword volume validation.
```
