/**
 * Locates the source artwork folder.
 *
 * The repo lives on the internal drive (~/Developer/sidecar-website) while the
 * artwork lives with the rest of the client files on the external drive, so the
 * two are no longer siblings and a relative "../.." no longer finds them.
 *
 * Resolution order:
 *   1. $SIDECAR_ASSETS, if set — override for any other machine or layout
 *   2. the folder next to the repo, for a checkout that sits beside the artwork
 *   3. the known client folder on the external drive
 */
import { existsSync } from "node:fs";
import path from "node:path";

const CANDIDATES = [
  process.env.SIDECAR_ASSETS,
  path.join(import.meta.dirname, "..", ".."),
  "/Volumes/Brandon 1TB/Regent/CLIENTS/Sidecar - Budget App/Sidecar Website",
].filter(Boolean);

/**
 * @param {string} subdir a folder that must exist inside the assets directory,
 *   used to tell the real artwork folder from a coincidental path match.
 */
export function findAssetsDir(subdir = "Screenshots") {
  for (const dir of CANDIDATES) {
    if (existsSync(path.join(dir, subdir))) return dir;
  }

  throw new Error(
    `Could not find the source artwork.\n\n` +
      `Looked for a folder containing "${subdir}/" in:\n` +
      CANDIDATES.map((c) => `  - ${c}`).join("\n") +
      `\n\nThe artwork is not in the repo — it lives with the client files on ` +
      `the external drive. Plug it in, or point at it directly:\n\n` +
      `  SIDECAR_ASSETS="/path/to/Sidecar Website" node scripts/<script>.mjs\n`,
  );
}
