/**
 * Removes macOS AppleDouble files ("._name") from the build directories.
 *
 * WHY THIS EXISTS
 *
 * This project lives on an exFAT volume, which cannot store macOS extended
 * attributes natively. macOS therefore writes a companion "._name" file next to
 * each real file to hold them.
 *
 * Turbopack's persistent cache names its files numerically — 00000001.sst,
 * 00000008.meta — and parses those names as integers when it opens the store.
 * It hits "._00000001.sst", fails to parse "._00000001" as a number, and dies
 * with:
 *
 *     Failed to open database
 *     Caused by: Loading persistence directory failed
 *                invalid digit found in string
 *
 * Deleting the companions fixes it without discarding the cache itself — the
 * files only carry extended attributes, which the build output does not use.
 *
 * Runs from `predev` and `prebuild`. It is a no-op everywhere else (Netlify's
 * Linux builders never create these), and it never fails the build.
 */
import { readdir, rm } from "node:fs/promises";
import path from "node:path";

const ROOTS = [".next", "out"];
const projectRoot = path.join(import.meta.dirname, "..");

let removed = 0;

async function strip(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return; // Directory does not exist yet — nothing to clean.
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("._")) {
      try {
        await rm(full, { recursive: true, force: true });
        removed++;
      } catch {
        // A file we cannot remove is not worth failing the build over.
      }
      continue;
    }
    if (entry.isDirectory()) await strip(full);
  }
}

try {
  await Promise.all(ROOTS.map((root) => strip(path.join(projectRoot, root))));
  if (removed > 0) {
    console.log(`Removed ${removed} AppleDouble file(s) from build output.`);
  }
} catch {
  // Never block dev or build on housekeeping.
}
