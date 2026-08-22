/**
 * Builds the photography, logos and icons the site serves, from the source
 * artwork on the external drive.
 *
 *   node scripts/optimize-assets.mjs
 *
 * A static export disables the Next image optimizer, so there is no server to
 * resize anything on request — every asset in /public is sized and compressed
 * ahead of time here.
 *
 * App screenshots are NOT handled here; they come from the clean RAW device
 * captures via scripts/build-device-images.mjs.
 *
 * Reads from the source and writes into /public, so it is safe to re-run.
 */
import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";

import { findAssetsDir } from "./assets-dir.mjs";

const pub = path.join(import.meta.dirname, "..", "public");
const assets = findAssetsDir("Images");

/** source folder on the drive -> folder under /public */
const jobs = [
  // Lifestyle photography — full-bleed sections, so allow more width.
  { from: "Images", to: "images", width: 1600, quality: 78 },
  // Logo lockups and wordmarks; WebP keeps the alpha channel.
  { from: "Logos", to: "logos", width: 640, quality: 90 },
];

for (const { from, to, width, quality } of jobs) {
  const srcDir = path.join(assets, from);
  const outDir = path.join(pub, to);
  await mkdir(outDir, { recursive: true });

  const files = (await readdir(srcDir)).filter(
    (f) => f.endsWith(".png") && !f.startsWith("._"),
  );

  for (const file of files) {
    const out = path.join(outDir, file.replace(/\.png$/, ".webp"));
    const info = await sharp(path.join(srcDir, file))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(out);
    console.log(
      `${to}/${path.basename(out)}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`,
    );
  }
}

// Favicons and touch icons have to stay PNG.
const appIcon = path.join(assets, "App Icon", "icon-1024.png");
for (const [size, name] of [
  [180, "apple-touch-icon.png"],
  [512, "icon-512.png"],
  [192, "icon-192.png"],
  [32, "favicon-32.png"],
]) {
  await sharp(appIcon)
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(path.join(pub, name));
  console.log(`${name}  ${size}x${size}`);
}

// One full-size icon for Open Graph, as WebP.
await mkdir(path.join(pub, "icon"), { recursive: true });
await sharp(appIcon)
  .resize(1024, 1024)
  .webp({ quality: 90 })
  .toFile(path.join(pub, "icon", "app-icon.webp"));
console.log("icon/app-icon.webp  1024x1024");

console.log("done");
