// Builds /public/img + /public/downloads from the raw campaign flyers.
// Re-run whenever the design team drops new artwork:  node scripts/process-assets.mjs
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

// Raw flyers live next to the project folder by default; override with ASSET_DIR.
const SRC = process.env.ASSET_DIR ?? path.resolve("../../campaing asset");
const OUT = path.resolve("public/img");
const DL = path.resolve("public/downloads");
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(DL, { recursive: true });

const src = (f) => path.join(SRC, f);

// Portrait crops, cut to avoid the baked-in flyer typography.
const crops = [
  { from: "CAMPAIGN Flyer 6.png", to: "portrait-pink.jpg", box: [200, 1075, 1100, 900] },
  { from: "CAMPAIGN Flyer 1.png", to: "portrait-2027.jpg", box: [430, 493, 740, 930] },
  { from: "CAMPAIGN Flyer 5.png", to: "portrait-mono.jpg", box: [690, 380, 810, 1420] },
  { from: "CAMPAIGN Flyer 2.png", to: "portrait-green.jpg", box: [0, 140, 820, 1420] },
  { from: "CAMPAIGN Flyer 3.png", to: "face-closeup.jpg", box: [905, 0, 595, 1620] },
  { from: "CAMPAIGN Flyer 7.png", to: "portrait-green-attire.jpg", box: [860, 150, 644, 1000] },
  { from: "CAMPAIGN Flyer 4.png", to: "portrait-gold.jpg", box: [600, 330, 900, 850] },
  { from: "CAMPAIGN Flyer 7.png", to: "portrait-hero.jpg", box: [862, 118, 638, 1030] },
];

for (const c of crops) {
  const [left, top, width, height] = c.box;
  await sharp(src(c.from))
    .extract({ left, top, width, height })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(OUT, c.to));
  console.log("crop", c.to);
}

// Knock a white background out to alpha, with a soft ramp so edges don't fringe.
async function knockoutWhite(file, box, to, scale = 1) {
  const [left, top, width, height] = box;
  const { data, info } = await sharp(src(file))
    .extract({ left, top, width, height })
    .resize(Math.round(width * scale))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
    if (min > 242) data[i + 3] = 0;
    else if (min > 215) data[i + 3] = Math.round(((242 - min) / 27) * 255);
  }
  await sharp(data, { raw: info }).png().toFile(path.join(OUT, to));
  console.log("knockout", to);
}

await knockoutWhite("CAMPAIGN Flyer 7.png", [1162, 1190, 156, 156], "dla-logo.png", 2);
await knockoutWhite("CAMPAIGN Flyer 7.png", [348, 636, 108, 138], "thumbprint.png", 2);

// Gallery: web-sized webp + untouched PNG for download.
const gallery = fs.readdirSync(SRC).filter((f) => f.toLowerCase().endsWith(".png"));
for (const f of gallery) {
  const slug = f
    .toLowerCase()
    .replace(/\.png$/, "")
    .replace(/election campaign /, "")
    .replace(/campaign /, "")
    .replace(/\s+/g, "-");
  const img = sharp(src(f));
  const meta = await img.metadata();
  await img.resize({ width: 1100 }).webp({ quality: 82 }).toFile(path.join(OUT, `${slug}.webp`));
  fs.copyFileSync(src(f), path.join(DL, `opoli-2027-${slug}.png`));
  console.log("gallery", slug, meta.width, meta.height);
}

// Social share card (1200x630) from the green duotone flyer.
await sharp(src("CAMPAIGN Flyer 2.png"))
  .extract({ left: 0, top: 380, width: 1500, height: 788 })
  .resize(1200, 630)
  .jpeg({ quality: 84 })
  .toFile(path.resolve("src/app/opengraph-image.jpg"));
console.log("og image");
