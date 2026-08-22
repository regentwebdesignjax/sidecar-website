/**
 * Builds app/favicon.ico and the small PNG favicons from the source mark at
 * public/sidecar-favicon.png.
 *
 *   node scripts/build-favicon.mjs
 *
 * Unlike the other asset scripts, the source here is checked into the repo
 * rather than pulled from the external drive — it's a favicon-specific mark
 * (the car glyph alone), not a crop of a larger asset. The app icon proper
 * (public/icon-1024.png, App Icon/icon-1024.png) is the wordmark, which reads
 * fine at app-icon size but is illegible at 16–32px; this mark exists because
 * that one doesn't work small.
 *
 * sharp cannot write .ico directly, so this packs PNG-compressed frames into
 * an ICO container by hand. Every modern browser (Chrome, Firefox, Safari,
 * Edge) accepts PNG frames inside an ICO — this is also what `next build`
 * itself produces for an `app/icon.png` convention file, so it isn't a hack.
 */
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const SRC = path.join(import.meta.dirname, "..", "public", "sidecar-favicon.png");
const APP_DIR = path.join(import.meta.dirname, "..", "app");
const PUBLIC_DIR = path.join(import.meta.dirname, "..", "public");

const ICO_SIZES = [16, 32, 48];

/** Minimal ICO container: an ICONDIR header, one ICONDIRENTRY per frame, then
 *  the frames themselves — each a plain PNG buffer. */
function packIco(frames) {
  const HEADER_SIZE = 6;
  const ENTRY_SIZE = 16;
  const dataOffset0 = HEADER_SIZE + ENTRY_SIZE * frames.length;

  const header = Buffer.alloc(HEADER_SIZE);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(frames.length, 4);

  const entries = [];
  const bodies = [];
  let offset = dataOffset0;

  for (const { size, buffer } of frames) {
    const entry = Buffer.alloc(ENTRY_SIZE);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // 0 means 256 in ICO format
    entry.writeUInt8(size === 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buffer.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    bodies.push(buffer);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...entries, ...bodies]);
}

const frames = await Promise.all(
  ICO_SIZES.map(async (size) => ({
    size,
    buffer: await sharp(SRC).resize(size, size).png().toBuffer(),
  })),
);

await writeFile(path.join(APP_DIR, "favicon.ico"), packIco(frames));
console.log(`app/favicon.ico  (${ICO_SIZES.join("/")}px frames)`);

// Standalone PNGs for the <link rel="icon"> entries in metadata, which browsers
// that ignore favicon.ico (or want a crisper single size) fall back to.
for (const [size, name] of [
  [16, "favicon-16.png"],
  [32, "favicon-32.png"],
]) {
  await sharp(SRC).resize(size, size).png({ compressionLevel: 9 }).toFile(
    path.join(PUBLIC_DIR, name),
  );
  console.log(`public/${name}  ${size}x${size}`);
}

console.log("done");
