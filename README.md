# Sowena Beauty Global Website

Official website source code for Sowena Beauty Global.

## Current stack

- Static HTML
- CSS
- Ready to deploy on Vercel, Netlify, or GitHub Pages

## Repository

https://github.com/sowenabeauty/sowena-beauty-website.git

## Product image auto update

Put product photos in one folder on your computer, then run:

```bash
node tools/update-product-images.js "C:\path\to\your\product-image-folder"
```

The script will:

- Read all `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, and `.gif` files in that folder.
- Match image file names to product names in `script.js`.
- Copy matched images into `assets/products/`.
- Update the generated `productImages` map in `script.js`.
- Keep unmatched products using the current category fallback image.

Recommended image naming:

```text
Juvederm Ultra4.jpg
Botox 100 Units.png
Rejuran Healer.webp
```

After running the script, commit and push the changed files so Vercel can deploy them.
