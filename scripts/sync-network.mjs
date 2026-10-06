// Copies the shared campaign files from this (main) project into every network site,
// so facts, links and the indexing switch stay identical everywhere.
//   node scripts/sync-network.mjs
import fs from "node:fs";
import path from "node:path";

const SHARED = ["src/content/facts.ts", "src/content/network.ts", "src/content/indexing.ts"];
const DOCS = path.resolve("../..");
const SITES = [
  "opoli-youth-jobs",
  "opoli-women-empowerment",
  "opoli-justice-voice",
  "opoli-good-governance",
  "opoli-vote-guide",
  "opoli-rivers-west-lgas",
  "opoli-volunteer",
  "opoli-election-countdown",
  "opoli-campaign-media",
];

for (const name of SITES) {
  const root = path.join(DOCS, name);
  if (!fs.existsSync(root)) {
    console.warn(`skip ${name}: not found at ${root}`);
    continue;
  }
  for (const file of SHARED) fs.copyFileSync(path.resolve(file), path.join(root, file));
  console.log(`synced ${name}`);
}
