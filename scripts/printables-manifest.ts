// v1.G — write src/data/printables.json (PDF stem → title + page URL) for
// scripts/printable_pdfs.py. Run inside the sites1 container (Node ≥ 22.18):
//   node scripts/printables-manifest.ts
import { writeFileSync } from "node:fs";
import { buildManifest } from "../src/lib/printables-manifest.ts";

const m = buildManifest();
const out = new URL("../src/data/printables.json", import.meta.url);
writeFileSync(out, JSON.stringify(m, null, 2) + "\n");
console.log(`✓ src/data/printables.json  (${Object.keys(m).length} PDFs)`);
