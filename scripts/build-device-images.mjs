/**
 * Builds the app screenshots the site serves, from the raw device captures in
 * ../Screenshots/RAW.
 *
 *   node scripts/build-device-images.mjs
 *
 * The RAW files are clean full-bleed 1320x2868 captures — no marketing caption,
 * no device bezel, square corners. That matters for two reasons:
 *
 *  - The corner radius is applied in CSS instead of being baked in, so it stays
 *    a true circular arc at every rendered size (see `.screen-radius`).
 *  - Nothing of the surrounding artwork can bleed in at the edges. The earlier
 *    images were cropped out of the App Store marketing slides and caught a
 *    sliver of the teal background along the sides.
 *
 * Keep the output aspect ratio at 1320:2868 — `.screen-radius` is calibrated to
 * it, and a different ratio would make the corners elliptical.
 */
import sharp from "sharp";
import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";

import { findAssetsDir } from "./assets-dir.mjs";

const SRC = path.join(findAssetsDir("Screenshots"), "Screenshots", "RAW");
const OUT = path.join(import.meta.dirname, "..", "public", "device");

/** Half of 1320x2868 — an exact 2:1 downscale, so no resampling softness. */
const WIDTH = 660;

const FILES = {
  "raw-home.png": "home",
  "raw-envelopes.png": "envelopes",
  "raw-activity.png": "activity",
  "raw-reports.png": "reports",
  "raw-schedule.png": "schedule",
  "raw-split.png": "split-income",
  "raw-splitexpense.png": "split-expense",
  "raw-splitledger.png": "split-ledger",
  "raw-add.png": "add",
  "raw-detail.png": "detail",
};

await mkdir(OUT, { recursive: true });

// Clear anything left from a previous run so renamed files cannot linger.
for (const file of await readdir(OUT)) {
  await rm(path.join(OUT, file), { force: true });
}

for (const [file, name] of Object.entries(FILES)) {
  const info = await sharp(path.join(SRC, file))
    .resize({ width: WIDTH })
    .webp({ quality: 86 })
    .toFile(path.join(OUT, `${name}.webp`));
  console.log(
    `${name}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`,
  );
}
