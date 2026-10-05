// Single source of truth for campaign copy. Edit here, not inside components.

export const candidate = {
  honorific: "Rev. Hon. Amb. Mrs",
  firstName: "Aneni",
  middleName: "Opoli",
  lastName: "Inyamoyio",
  callName: "Rev. Ani Opoli",
  epithet: "The Light Carrier",
  office: "Senate",
  district: "Rivers West Senatorial District",
  districtShort: "Rivers West",
  state: "Rivers State",
  tagline:
    "A leadership vision grounded in faith, guided by integrity, and committed to meaningful progress.",
} as const;

export const party = {
  name: "Democratic Leadership Alliance",
  short: "DLA",
  motto: "Leading with Courage, Serving with Integrity",
  registered: "Registered by INEC, 5 February 2026",
  site: "https://dlanigeria.org",
  values: ["Progress", "Integrity", "Faith"] as const,
};

// INEC revised timetable (Electoral Act 2026): Presidential & National Assembly polls.
export const election = {
  label: "Saturday, 16 January 2027",
  // Polls open 8:30am WAT
  iso: "2027-01-16T08:30:00+01:00",
  // INEC: National Assembly campaigns opened 19 August 2026
  campaignStart: "2026-08-19T00:00:00+01:00",
};

export type Commitment = {
  n: string;
  audience: string;
  title: string;
  body: string[];
  points: string[];
  image: { src: string; w: number; h: number; position?: string };
  tone: "green" | "gold" | "brown" | "ink";
};

export const commitments: Commitment[] = [
  {
    n: "01",
    audience: "For the youth",
    title: "Jobs, not guns",
    body: [
      "She does not want to see our young people carrying guns and roaming the streets. Many are not criminals — they do it because of hardship and lack of jobs.",
      "Rev. Ani Opoli will give them skills, empowerment and real jobs. She will turn wasted lives into useful lives.",
    ],
    points: ["Skills acquisition", "Youth empowerment", "Real, paying jobs"],
    image: { src: "/img/portrait-green.jpg", w: 820, h: 1420, position: "50% 30%" },
    tone: "green",
  },
  {
    n: "02",
    audience: "For the women",
    title: "Education & empowerment",
    body: [
      "She is here for the woman who wants to go to school but whose husband cannot afford it.",
      "She will make sure women are educated, skilled and empowered — so they can support their homes financially and build stronger families. Because when you build a woman, you build the future.",
    ],
    points: ["Access to education", "Vocational skills", "Financial independence"],
    image: { src: "/img/portrait-gold.jpg", w: 900, h: 850, position: "60% 30%" },
    tone: "gold",
  },
  {
    n: "03",
    audience: "For the less privileged",
    title: "Justice & a voice",
    body: [
      "She will defend the oppressed and speak for those who have no voice.",
      "She will not allow the rich to oppress the poor with their wealth. She will not allow the powerful to intimidate the weak.",
    ],
    points: ["Defend the oppressed", "Speak for the voiceless", "Stand up to intimidation"],
    image: { src: "/img/portrait-mono.jpg", w: 810, h: 1420, position: "50% 25%" },
    tone: "brown",
  },
  {
    n: "04",
    audience: "For all",
    title: "Competent & truthful governance",
    body: [
      "Competent leadership that delivers results. Sincere, accountable and transparent governance.",
      "Jobs, industries, healthcare, education and infrastructure that actually work for the people of Rivers West.",
    ],
    points: ["Jobs & industries", "Healthcare & education", "Working infrastructure"],
    image: { src: "/img/portrait-green-attire.jpg", w: 644, h: 1000, position: "50% 25%" },
    tone: "ink",
  },
];

// Rivers West Senatorial District — 8 LGAs, with administrative HQ.
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

export const gallery = [
  { slug: "flyer-1", title: "Rivers West 2027", w: 1100, h: 1540 },
  { slug: "flyer-6", title: "A stronger voice", w: 1100, h: 1760 },
  { slug: "quote-1", title: "Built, not promised", w: 1100, h: 1100 },
  { slug: "flyer-2", title: "Vote DLA — green", w: 1100, h: 1320 },
  { slug: "flyer-7", title: "How to vote", w: 1100, h: 1100 },
  { slug: "quote-2", title: "Every voice matters", w: 1100, h: 1100 },
  { slug: "flyer-3", title: "Hope for a better Rivers", w: 1100, h: 1320 },
  { slug: "flyer-4", title: "Vote for Rivers West", w: 1100, h: 1100 },
  { slug: "quote-3", title: "Meet the people", w: 1100, h: 1100 },
  { slug: "flyer-5", title: "Vote — monochrome", w: 1100, h: 1320 },
] as const;

export const helpOptions = [
  "Door-to-door",
  "Polling unit agent",
  "Social media",
  "Mobilise my ward",
  "Logistics & transport",
  "Women's wing",
  "Youth wing",
] as const;

export const shareText =
  "Rivers West, the time has come. Vote Rev. Ani Opoli (DLA) for Senate — 16 January 2027. Competent. Vocal. Strong.";
