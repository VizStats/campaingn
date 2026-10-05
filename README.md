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
