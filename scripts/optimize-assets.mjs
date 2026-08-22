// One-time asset preparation. Static export disables the Next image optimizer,
// so every asset in /public is pre-sized and pre-compressed here instead.
//
//   node scripts/optimize-assets.mjs
//
// Source PNGs live in the sibling asset folders (../Screenshots, ../Images,
// ../Logos, ../App Icon) and are not committed. Re-run this if they change.
import sharp from "sharp";
import { readdir, unlink } from "node:fs/promises";
import path from "node:path";

const pub = path.join(import.meta.dirname, "..", "public");

const jobs = [
  // App screenshots are NOT handled here — they come from the clean RAW device
  // captures via scripts/build-device-images.mjs. The marketing slides in
  // ../Screenshots have a caption and a coloured ground baked in and are not
  // used by the site.
  //
  // Lifestyle photography — full-bleed sections, so allow more width.
  { dir: "images", width: 1600, quality: 78 },
  // Logo lockups and wordmarks; keep alpha.
  { dir: "logos", width: 640, quality: 90 },
];

for (const { dir, width, quality } of jobs) {
  const abs = path.join(pub, dir);
  const files = (await readdir(abs)).filter((f) => f.endsWith(".png"));
  for (const file of files) {
    const src = path.join(abs, file);
    const out = src.replace(/\.png$/, ".webp");
    const info = await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(out);
    console.log(
      `${dir}/${file} -> ${path.basename(out)}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`,
    );
    await unlink(src);
  }
}

// Favicons and touch icons must stay PNG.
const iconDir = path.join(pub, "icon");
for (const [size, name] of [
  [180, "apple-touch-icon.png"],
  [512, "icon-512.png"],
  [192, "icon-192.png"],
  [32, "favicon-32.png"],
]) {
  await sharp(path.join(iconDir, "icon-1024.png"))
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(path.join(pub, name));
  console.log(`icon -> ${name} ${size}x${size}`);
}

// Keep one full-size icon for Open Graph, as WebP.
await sharp(path.join(iconDir, "icon-1024.png"))
  .resize(1024, 1024)
  .webp({ quality: 90 })
  .toFile(path.join(pub, "icon", "app-icon.webp"));
for (const f of await readdir(iconDir)) {
  if (f.endsWith(".png")) await unlink(path.join(iconDir, f));
}
console.log("done");
