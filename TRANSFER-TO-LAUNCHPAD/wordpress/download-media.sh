#!/bin/bash
# Download all images from WordPress site
# Run this after you've set up the new site to pull images

OUTPUT_DIR="./public/images/wp"
mkdir -p $OUTPUT_DIR

# Logo images (most important)
LOGOS=(
  "https://lastapple.com/wp-content/uploads/2021/02/last-apple-logo-360w-retina.png"
  "https://lastapple.com/wp-content/uploads/2022/03/last-apple-logo-180w.png"
  "https://lastapple.com/wp-content/uploads/2023/03/Original-on-Transparent.png"
)

# Service page images
SERVICE_IMAGES=(
  "https://lastapple.com/wp-content/uploads/2021/02/digital-marketing-AdobeStock_252760983.jpg"
  "https://lastapple.com/wp-content/uploads/2021/02/contact-center-2-AdobeStock_153160005.jpg"
  "https://lastapple.com/wp-content/uploads/2021/02/back-office-AdobeStock_125581183.jpg"
)

echo "Downloading logos..."
for url in "${LOGOS[@]}"; do
  filename=$(basename "$url")
  echo "  → $filename"
  curl -sS -o "$OUTPUT_DIR/$filename" "$url"
done

echo "Downloading service images..."
for url in "${SERVICE_IMAGES[@]}"; do
  filename=$(basename "$url")
  echo "  → $filename"
  curl -sS -o "$OUTPUT_DIR/$filename" "$url"
done

echo ""
echo "Done! Images saved to $OUTPUT_DIR/"
echo ""
echo "To use in your site:"
echo "  <img src=\"/images/wp/last-apple-logo-360w-retina.png\" />"
