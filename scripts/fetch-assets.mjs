// Downloads every image from the old Squarespace site into public/ so the new
// site is fully self-hosted. Run once on your computer before your first push:
//
//   npm run fetch-assets
//
// It also tries to save the promo video with ffmpeg (if installed). If that
// fails, put the original DBAd1_Horizontal.mp4 at public/video/dance-break.mp4.

import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { ASSETS, VIDEO } from '../src/assets.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const exists = (p) => access(p).then(() => true, () => false);

let ok = 0, failed = 0;
for (const [key, { local, remote }] of Object.entries(ASSETS)) {
  const dest = join(root, local);
  if (await exists(dest)) { console.log(`✓ ${local} (already there)`); ok++; continue; }
  // ?format=2500w asks Squarespace for a large, web-optimized version
  const url = remote.includes('images.squarespace-cdn.com') ? `${remote}?format=2500w` : `${remote}?format=1500w`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    console.log(`✓ ${local}`);
    ok++;
  } catch (e) {
    console.error(`✗ ${key}: ${e.message}`);
    failed++;
  }
}

const videoDest = join(root, VIDEO.local);
if (await exists(videoDest)) {
  console.log(`✓ ${VIDEO.local} (already there)`);
} else {
  await mkdir(dirname(videoDest), { recursive: true });
  const ff = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', VIDEO.hls, '-c', 'copy', '-bsf:a', 'aac_adtstoasc', '-movflags', '+faststart', videoDest], { stdio: 'inherit' });
  if (ff.status === 0) console.log(`✓ ${VIDEO.local}`);
  else console.warn(`! Couldn't save the video automatically. Copy your original DBAd1_Horizontal.mp4 to public${VIDEO.local}`);
}

console.log(`\nImages: ${ok} saved, ${failed} failed.`);
