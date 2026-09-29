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
- Product background image source: only use files from `C:\Users\This PC\Downloads\SOWENA BEAUTY GLOBAL\ẢNH WEB SẢN PHẨM\`, including its subfolders
- Timezone: Asia/Ho_Chi_Minh

For each run:
1. Pull the latest GitHub `main`.
2. Select the next unpublished product from `seo-automation/product-seo-queue.csv`.
3. Confirm that the product has image or video media in `assets/products/`.
4. If real keyword-volume exports are available, use them to refine the title and headings without breaking product order.
5. Write a practical skincare and beauty education article in English for readers who want value before choosing a product. Do not frame the article mainly around wholesale sourcing, distributor needs, MOQ, quotation preparation, or buying in bulk.
6. Cover useful reader value: product purpose, key features, active ingredients when verified, practical visible-use goals, beauty methods, routine ideas, and comparisons such as top product categories for sensitive skin, dry skin, glow, texture, lips, or eye-area care when relevant.
7. Avoid medical claims, treatment-result promises, dosage instructions, procedure instructions, and unsupported regulatory claims. Keep professional-use products educational and recommend qualified professional consultation where needed.
8. Include Sowena channel links in every product article: Instagram `https://www.instagram.com/sowena_beauty`, WhatsApp quotation link, and Telegram community `https://t.me/sowenabeauty`.
9. Add external links only to verified official manufacturer or official regional brand pages. If no official brand page can be verified, do not add an unverified external link and note the gap in the queue notes.
10. Product background images must come only from `C:\Users\This PC\Downloads\SOWENA BEAUTY GLOBAL\ẢNH WEB SẢN PHẨM\`, searched recursively by product name. Copy the selected file into `assets/products/` before using it on the website. Do not use web image search, hotlinked external images, official manufacturer images, third-party distributor images, Telegram images, or generated images as product background visuals unless the user explicitly supplies/approves them and they are copied into this source folder first.
11. Use only clean product images or videos: no third-party distributor watermark, no competitor logo, no unrelated shop information. If the approved source folder does not contain a matching product image, pause that product and mark the queue notes as `Needs approved product background image`.
12. Show the main product image outside the article body, next to the article title in the hero area. Secondary product images can also appear in a compact gallery lower in the article.
13. Create the static HTML article in `blog/`.
14. Update `blog/index.html`.
15. Update `sitemap.xml`.
16. Mark the queue row as published and keep the next 7 days planned.
17. Validate JSON-LD, sitemap XML, and basic syntax.
18. Commit and push to GitHub `main`.

If required keyword data is missing, continue with the catalogue-driven content plan and mark the topic as needing keyword volume validation.
```
