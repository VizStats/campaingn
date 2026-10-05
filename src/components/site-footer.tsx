import { ArrowUpRight } from "lucide-react";
import { DlaMark } from "@/components/ui/dla-mark";
import { candidate, election, party } from "@/content/campaign";

const nav = [
  { href: "#about", label: "About" },
  { href: "#agenda", label: "Agenda" },
  { href: "#district", label: "Rivers West" },
  { href: "#vote", label: "How to vote" },
  { href: "#media", label: "Media" },
  { href: "#join", label: "Volunteer" },
];

const external = [
  { href: party.site, label: "Democratic Leadership Alliance" },
  { href: "https://www.inecnigeria.org", label: "INEC Nigeria" },
  { href: "https://cvr.inecnigeria.org", label: "Voter registration & PVC" },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-20 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <DlaMark size={56} withName tone="light" />
            <p className="mt-8 font-display text-5xl uppercase leading-[0.9]">
              {candidate.firstName} {candidate.middleName}
              <br />
              <span className="text-gold-400">{candidate.lastName}</span>
            </p>
            <p className="mt-3 text-sm text-white/55">
              {candidate.office} &middot; {candidate.district}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="label text-white/40">Navigate</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-white/75 hover:text-gold-400">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="label text-white/40">Official links</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {external.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-white/75 hover:text-gold-400"
                  >
                    {n.label} <ArrowUpRight size={13} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="label text-white/40">Election day</p>
            <p className="mt-5 text-sm text-white/75">{election.label}</p>
            <p className="mt-1 text-sm text-white/45">Polls open 8:30am</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; 2026 Authorised by the {candidate.callName} Campaign Organisation &middot; {party.short}
          </p>
          <p>{party.motto}.</p>
        </div>
      </div>
    </footer>
  );
}
