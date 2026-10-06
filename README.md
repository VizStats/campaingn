# Opoli 2027 — Rivers West Senate campaign site

Campaign website for **Rev. Hon. Amb. Mrs Aneni Opoli Inyamoyio**, Democratic Leadership Alliance (DLA)
candidate for Rivers West Senatorial District. Election day: **Saturday, 16 January 2027**.

Built with Next.js 16 (App Router), Tailwind CSS v4 and Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where things live

| Path | What |
| --- | --- |
| `src/content/campaign.ts` | All campaign copy, dates, LGAs, gallery list — edit text here |
| `src/components/sections/` | One file per page section |
| `src/app/api/volunteer/route.ts` | Volunteer sign-up endpoint |
| `public/img/` | Web-optimised images (generated) |
| `public/downloads/` | Full-resolution flyers offered for download |
| `scripts/process-assets.mjs` | Regenerates `public/img` and `public/downloads` from the raw flyers |

## Updating artwork

Drop new flyers into the asset folder and run:

```bash
ASSET_DIR="path/to/campaign asset" node scripts/process-assets.mjs
```

Then add the new file to `gallery` in `src/content/campaign.ts`.

## Volunteer sign-ups

In development, sign-ups are appended to `.data/volunteers.jsonl` (git-ignored). That file does not
persist on serverless hosts — connect `persist()` in `src/app/api/volunteer/route.ts` to a database,
Google Sheet or CRM before launch.

## SEO & launch settings

Set these on the host, then redeploy:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | The live URL (defaults to `https://opoli-2027.vercel.app`) |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` when ready for Google. **Until then every page sends noindex and robots.txt blocks crawlers.** |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Code from Google Search Console (HTML-tag method) |

Built in: title/description/keywords (`src/content/site.ts`), canonical URL, Open Graph + Twitter card
with a generated share image (`src/app/opengraph-image.tsx`), `sitemap.xml`, `robots.txt`, web manifest,
Rivers State geo tags, and JSON-LD (Person, PoliticalParty, WebSite, WebPage, election Event).

## Campaign network

Nine two-screen topic sites live next to this project in `Documents/` (`opoli-youth-jobs`,
`opoli-women-empowerment`, `opoli-justice-voice`, `opoli-good-governance`, `opoli-vote-guide`,
`opoli-rivers-west-lgas`, `opoli-volunteer`, `opoli-election-countdown`, `opoli-campaign-media`).
The footer links to all of them and each links back here.

Shared files — `src/content/facts.ts`, `network.ts`, `indexing.ts` — are edited **here only**, then copied out:

```bash
node scripts/sync-network.mjs
```

When real domains are bought, update the URLs in `src/content/network.ts`, sync, and redeploy all ten sites.
