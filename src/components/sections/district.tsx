import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { lgas } from "@/content/campaign";

export function District() {
  return (
    <section id="district" className="bg-green-900 py-24 text-white sm:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionLabel tone="light">Rivers West</SectionLabel>
          <Reveal>
            <h2 className="mt-4 font-display text-[clamp(2.8rem,5vw,4.6rem)] uppercase">
              Let every community count.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/75">
              Rivers West Senatorial District is made up of eight local government areas. If you are
              registered in any of them, this is your Senate election.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <ul className="grid border-t border-white/15 sm:grid-cols-2 sm:gap-x-10">
            {lgas.map((l) => (
              <li key={l.name} className="flex items-baseline justify-between gap-4 border-b border-white/15 py-4">
                <span className="text-lg font-medium">{l.name}</span>
                <span className="shrink-0 whitespace-nowrap text-sm text-white/55">HQ: {l.hq}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
