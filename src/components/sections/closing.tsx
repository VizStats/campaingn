import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { candidate, election } from "@/content/campaign";

export function Closing() {
  return (
    <section className="grain relative overflow-hidden bg-gold-400 text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="label">
            Vote {candidate.callName} &mdash; {candidate.epithet} &mdash; 2027
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-8 font-display text-[clamp(5rem,17vw,17rem)] uppercase">
            Liberty
            <br />
            <span className="text-green-800">has come.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 border-t-2 border-ink pt-8 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="font-serif text-[clamp(1.5rem,2.6vw,2.2rem)] italic leading-snug">
              With Rev. Opoli, we are sure of transformation. We are sure of a new Rivers West.
            </p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink/70">
              Competent &middot; Vocal &middot; Strong &middot; Restoring human dignity &middot; Restoring
              lost hope
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-5 md:justify-self-end">
            <div className="flex items-stretch bg-white shadow-[0_20px_50px_-25px_rgba(13,15,12,.5)]">
              <div className="grid w-24 place-items-center p-2">
                <Image src="/img/dla-logo.png" alt="DLA" width={312} height={312} className="w-full" />
              </div>
              <div className="flex flex-col justify-center bg-ink px-5 py-4 text-white">
                <p className="font-display text-3xl leading-none">Thumbprint DLA</p>
                <p className="mt-1 text-xs text-white/70">
                  Senate &middot; {candidate.districtShort} &middot; {election.label.replace("Saturday, ", "")}
                </p>
              </div>
              <div className="grid w-20 place-items-center border-l border-ink/10">
                <Image src="/img/thumbprint.png" alt="" width={216} height={276} className="h-12 w-auto -rotate-6" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
