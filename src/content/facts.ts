// Verified campaign facts — identical in every site of the campaign network.
// Change a fact here, then copy this file to all sites (scripts/sync-network.mjs in the main repo).
// Never add claims that the campaign hasn't confirmed (no invented biography, endorsements or numbers).

export const candidate = {
  honorific: "Rev. Hon. Amb. Mrs",
  firstName: "Aneni",
  middleName: "Opoli",
  lastName: "Inyamoyio",
  fullName: "Aneni Opoli Inyamoyio",
  callName: "Rev. Aneni Opoli",
  epithet: "The Light Carrier",
  office: "Senate",
  seat: "Senate candidate, Rivers West Senatorial District",
  district: "Rivers West Senatorial District",
  districtShort: "Rivers West",
  state: "Rivers State",
  country: "Nigeria",
  writeUp: "Competence, Integrity, and Service to the People.",
  slogans: ["Vote for competence. Vote for integrity.", "A woman of justice."],
  traits: ["Competent", "Vocal", "Outspoken", "Vibrant", "Strong"],
} as const;

export const party = {
  // Always the full name in visible copy — never the abbreviation.
  name: "Democratic Leadership Alliance",
  motto: "Leading with Courage, Serving with Integrity",
  registered: "Registered by INEC on 5 February 2026",
  url: "https://dlanigeria.org",
  values: ["Progress", "Integrity", "Faith"] as const,
};

// INEC revised timetable under the Electoral Act 2026.
export const election = {
  label: "Saturday, 16 January 2027",
  short: "16 January 2027",
  iso: "2027-01-16T08:30:00+01:00", // polls open 8:30am WAT
  pollsOpen: "8:30am",
  campaignStart: "2026-08-19T00:00:00+01:00",
  type: "National Assembly (Senate) election",
  source: "Independent National Electoral Commission (INEC)",
};

// Rivers West Senatorial District — 8 LGAs with administrative headquarters.
export const lgas = [
  { name: "Abua/Odual", hq: "Abua" },
  { name: "Ahoada East", hq: "Ahoada" },
  { name: "Ahoada West", hq: "Akinima" },
  { name: "Akuku-Toru", hq: "Abonnema" },
  { name: "Asari-Toru", hq: "Buguma" },
  { name: "Bonny", hq: "Bonny" },
  { name: "Degema", hq: "Degema" },
  { name: "Ogba/Egbema/Ndoni", hq: "Omoku" },
] as const;

// The four commitments, in the campaign's own words.
export const commitments = {
  youth: {
    audience: "For the youth",
    title: "Jobs, not guns",
    body: [
      "She does not want to see our young people carrying guns and roaming the streets. Many are not criminals — they do it because of hardship and lack of jobs.",
      "Rev. Aneni Opoli will give them skills, empowerment and real jobs. She will turn wasted lives into useful lives.",
    ],
    points: ["Skills acquisition", "Youth empowerment", "Real, paying jobs"],
  },
  women: {
    audience: "For the women",
    title: "Education & empowerment",
    body: [
      "She is here for the woman who wants to go to school but whose husband cannot afford it.",
      "She will make sure women are educated, skilled and empowered — so they can support their homes financially and build stronger families.",
    ],
    quote: "When you build a woman, you build the future.",
    points: ["Access to education", "Vocational skills", "Financial independence"],
  },
  justice: {
    audience: "For the less privileged",
    title: "Justice & a voice",
    body: [
      "She will defend the oppressed and speak for those who have no voice.",
      "She will not allow the rich to oppress the poor with their wealth. She will not allow the powerful to intimidate the weak.",
    ],
    points: ["Defend the oppressed", "Speak for the voiceless", "Stand up to intimidation"],
  },
  governance: {
    audience: "For all",
    title: "Competent & truthful governance",
    body: [
      "Competent leadership that delivers results. Sincere, accountable and transparent governance.",
      "Jobs, industries, healthcare, education and infrastructure that actually work for the people of Rivers West.",
    ],
    points: ["Jobs & industries", "Healthcare & education", "Working infrastructure"],
  },
} as const;

// Plain-language voting steps (INEC process). Keep wording consistent across sites.
export const votingSteps = [
  {
    title: "Get your PVC",
    body: "You need your Permanent Voter's Card (PVC) to vote. If you haven't collected it, go to the INEC office in your LGA.",
  },
  {
    title: "Know where you vote",
    body: "You can only vote at the polling unit where you registered. Check on the INEC portal if you're not sure.",
  },
  {
    title: "Go early on 16 January 2027",
    body: "Polls open at 8:30am. An INEC official checks your PVC and fingerprint, then gives you your Senate ballot.",
  },
  {
    title: "Thumbprint Democratic Leadership Alliance",
    body: "Find the Democratic Leadership Alliance logo — the gold pen. Press your inked thumb inside the box next to it, and nowhere else.",
  },
  {
    title: "Stay for the result",
    body: "Votes are counted and the result is posted at your polling unit. Wait and see it for yourself.",
  },
] as const;

export const inecLinks = {
  portal: "https://www.inecnigeria.org",
  voterRegistration: "https://cvr.inecnigeria.org",
};
