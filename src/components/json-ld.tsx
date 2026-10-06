import { candidate, election, party } from "@/content/facts";
import { MAIN_SITE, NETWORK } from "@/content/network";
import { site } from "@/content/site";

/**
 * Structured data shared by every site in the network: the same Person and party
 * entities (same @id) so search engines connect all sites to one candidate.
 * Pages can pass extra nodes (FAQPage, ItemList…) via `extra`.
 */
export function JsonLd({ extra = [] }: { extra?: Record<string, unknown>[] }) {
  const personId = `${MAIN_SITE.url}/#person`;
  const partyId = `${MAIN_SITE.url}/#party`;

  const graph = [
    {
      "@type": "Person",
      "@id": personId,
      name: candidate.fullName,
      honorificPrefix: candidate.honorific,
      alternateName: candidate.callName,
      jobTitle: `${candidate.office} candidate, ${candidate.district}`,
      image: `${site.url}/og-portrait.png`,
      url: MAIN_SITE.url,
      affiliation: { "@id": partyId },
      homeLocation: {
        "@type": "AdministrativeArea",
        name: `${candidate.district}, ${candidate.state}, ${candidate.country}`,
      },
      sameAs: [MAIN_SITE.url, ...NETWORK.map((s) => s.url)],
    },
    {
      "@type": "PoliticalParty",
      "@id": partyId,
      name: party.name,
      url: party.url,
      slogan: party.motto,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.title,
      inLanguage: "en-NG",
      about: { "@id": personId },
    },
    {
      "@type": "WebPage",
      "@id": `${site.url}/#webpage`,
      url: site.url,
      name: site.title,
      description: site.description,
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": personId },
      mentions: {
        "@type": "Event",
        name: `${candidate.district} ${election.type}`,
        startDate: election.iso,
        location: { "@type": "Place", name: `${candidate.district}, ${candidate.state}` },
        organizer: { "@type": "GovernmentOrganization", name: election.source },
      },
    },
    ...extra,
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
