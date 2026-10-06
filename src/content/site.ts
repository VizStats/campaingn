import { MAIN_SITE } from "./network";

// SEO identity of the main campaign site (the hub every network site links back to).
export const site = {
  key: MAIN_SITE.key,
  // Set NEXT_PUBLIC_SITE_URL on the host once the real domain is live.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? MAIN_SITE.url,
  title: "Rev. Aneni Opoli for Senate — Rivers West 2027",
  description:
    "Official campaign of Rev. Hon. Amb. Mrs Aneni Opoli Inyamoyio, Democratic Leadership Alliance candidate for Rivers West Senatorial District, 16 January 2027.",
  keywords: [
    "Aneni Opoli Inyamoyio",
    "Rev. Aneni Opoli",
    "Rivers West Senatorial District",
    "Rivers West senator 2027",
    "Democratic Leadership Alliance",
    "Rivers State Senate election 2027",
    "Nigeria 2027 National Assembly election",
  ],
  ogLine: "Senate · Rivers West Senatorial District",
};
