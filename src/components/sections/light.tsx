import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

export function Light() {
  return (
    <section id="light" className="relative bg-green-950 text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-28">
        <SectionLabel tone="light">Why she is running</SectionLabel>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="font-display text-[clamp(2.8rem,6.4vw,6rem)] uppercase lg:col-span-8">
            <Reveal>
              <p className="text-white/40">
                Rivers State is in <span className="text-white/70">darkness.</span>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Rivers State needs <span className="text-gold-400">light.</span>
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Rivers State needs <span className="text-green-300">truth.</span>
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.3} className="lg:col-span-4">
            <div className="border-t-[3px] border-gold-400 pt-6">
              <p className="font-serif text-[clamp(1.8rem,2.6vw,2.4rem)] italic leading-tight">
                That light is <span className="not-italic text-gold-400">Rev. Ani Opoli.</span>
              </p>
              <p className="mt-4 leading-relaxed text-white/65">
                The voice for the voiceless and hope for the hopeless. This is not politics as usual —
                it is a calling to serve.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
