import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { candidate } from "@/content/campaign";

export function About() {
  return (
    <section id="about" className="bg-paper pb-24 pt-40 sm:pb-28 sm:pt-44">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Image
            src="/img/about-cutout.webp"
            alt={`${candidate.callName} in traditional attire`}
            width={1000}
            height={1440}
            sizes="(min-width: 1024px) 420px, 80vw"
            className="mx-auto h-auto w-full max-w-[420px]"
          />
        </Reveal>

        <div className="lg:col-span-7">
          <SectionLabel>Who she is</SectionLabel>
          <Reveal>
            <h2 className="mt-4 font-display text-[clamp(2.8rem,5vw,4.6rem)] uppercase">
              Vote for competence.
              <br />
              <span className="text-gold-600">Vote for integrity.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-ink/75">
              <p>
                {candidate.callName} is vocal and unafraid to speak the truth to power. She will not keep
                quiet in the face of injustice, and she has the courage to stand up for the people of
                Rivers West.
              </p>
              <p>
                She leads with integrity and transparency — a woman of conscience who feels the pain of
                her people and is driven to serve them.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
