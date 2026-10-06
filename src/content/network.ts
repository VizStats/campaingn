// Every site in the campaign network. Identical in all 10 projects so they cross-link consistently.
// URLs default to the Vercel project URL each folder would get if deployed under its folder name.
// Once real domains are bought, update them here and re-sync to every project.

export type NetworkSite = {
  key: string;
  label: string;
  url: string;
};

export const MAIN_SITE: NetworkSite = {
  key: "main",
  label: "Main campaign site",
  url: "https://opoli-2027.vercel.app",
};

export const NETWORK: NetworkSite[] = [
  { key: "youth", label: "Jobs, not guns", url: "https://opoli-youth-jobs.vercel.app" },
  { key: "women", label: "Women: education & empowerment", url: "https://opoli-women-empowerment.vercel.app" },
  { key: "justice", label: "Justice & a voice", url: "https://opoli-justice-voice.vercel.app" },
  { key: "governance", label: "Competent governance", url: "https://opoli-good-governance.vercel.app" },
  { key: "vote", label: "How to vote in Rivers West", url: "https://opoli-vote-guide.vercel.app" },
  { key: "lgas", label: "The 8 LGAs of Rivers West", url: "https://opoli-rivers-west-lgas.vercel.app" },
  { key: "volunteer", label: "Volunteer", url: "https://opoli-volunteer.vercel.app" },
  { key: "countdown", label: "Election countdown", url: "https://opoli-election-countdown.vercel.app" },
  { key: "media", label: "Campaign flyers & media", url: "https://opoli-campaign-media.vercel.app" },
];
