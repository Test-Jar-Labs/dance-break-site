// Builds every site image as an optimized WebP in public/images, sized from the list in
// src/assets.js. Run after changing that list:
//
//   npm run optimize-images
//
// Originals are downloaded once into source-images/ and kept in the repo, so images can be
// rebuilt after the Squarespace site is gone. To replace an image, overwrite its file in
// source-images/ (same name) and run the script again.

import { mkdir, readFile, writeFile, access, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { ASSETS, META_IMAGES } from '../src/assets.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = join(root, 'source-images');
const PUBLIC = join(root, 'public', 'images');
const exists = (p) => access(p).then(() => true, () => false);

async function original(name, remote) {
  const file = join(SOURCE, name + '.src');
  if (!(await exists(file))) {
    const res = await fetch(remote);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${remote}`);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, Buffer.from(await res.arrayBuffer()));
  }
  return readFile(file);
}

// Lanczos resampling (sharp's default) keeps edges crisp when shrinking. Photos use lossy
// WebP at a high quality; logos use near-lossless so text and edges stay sharp.
const PHOTO = { quality: 82, alphaQuality: 90, effort: 6, smartSubsample: true };
const LOGO = { nearLossless: true, quality: 70, effort: 6 };

const kb = async (p) => `${((await stat(p)).size / 1024).toFixed(0)}KB`;
let total = 0;

for (const asset of Object.values(ASSETS)) {
  const src = await original(asset.name, asset.remote);
  const meta = await sharp(src).metadata();

  if (asset.widths) {
    for (const w of asset.widths) {
      const out = join(PUBLIC, `${asset.name}-${w}.webp`);
      await mkdir(dirname(out), { recursive: true });
      await sharp(src).resize({ width: w, withoutEnlargement: true }).webp(PHOTO).toFile(out);
      total += (await stat(out)).size;
      console.log(`✓ ${asset.name}-${w}.webp  ${await kb(out)}`);
    }
  } else {
    const out = join(PUBLIC, `${asset.name}.webp`);
    await mkdir(dirname(out), { recursive: true });
    await sharp(src).resize({ height: Math.min(asset.height, meta.height) }).webp(LOGO).toFile(out);
    total += (await stat(out)).size;
    console.log(`✓ ${asset.name}.webp  ${await kb(out)}`);
  }
}

for (const m of META_IMAGES) {
  const src = await original(m.source || m.file.replace(/\.\w+$/, ''), m.remote);
  const out = join(PUBLIC, m.file);
  // extend() runs after resize() inside one sharp pipeline, so pad in a separate pass first.
  const padded = m.padTop
    ? await sharp(src).extend({ top: m.padTop, background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer()
    : src;
  let img = sharp(padded);
  if (m.width) img = img.resize({ width: m.width, withoutEnlargement: true });
  if (m.square) img = img.resize({ width: m.square, height: m.square, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });
  img = m.file.endsWith('.png') ? img.png({ compressionLevel: 9 }) : img.jpeg({ quality: 88, mozjpeg: true });
  await img.toFile(out);
  console.log(`✓ ${m.file}  ${await kb(out)}`);
}

console.log(`\nWebP total: ${(total / 1024).toFixed(0)}KB`);
