#!/usr/bin/env node
/**
 * Generate favicon suite from logo-small.png
 * Uses sharp (available via Next.js)
 */

import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const SOURCE = join(projectRoot, 'public/logo-small.png');
const OUTPUT_DIR = join(projectRoot, 'public');

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

async function generateFavicons() {
  console.log('Generating favicons from:', SOURCE);

  for (const { name, size } of sizes) {
    const outputPath = join(OUTPUT_DIR, name);
    await sharp(SOURCE)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(outputPath);
    console.log(`✓ Generated ${name} (${size}x${size})`);
  }

  // Also create favicon.ico as a 32x32 PNG (modern browsers accept this)
  // For true .ico format we'd need a different library, but PNG works fine
  const faviconPath = join(OUTPUT_DIR, 'favicon.ico');
  await sharp(SOURCE)
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .png()
    .toFile(faviconPath);
  console.log('✓ Generated favicon.ico (32x32 PNG)');

  console.log('\nAll favicons generated successfully!');
}

generateFavicons().catch(console.error);
