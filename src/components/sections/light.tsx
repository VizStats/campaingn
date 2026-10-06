import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

export function Light() {
  return (
    <section id="light" className="relative bg-brown-900 text-white">
      <div className="mx-auto max-w-[1400px] px-5 pb-40 pt-24 sm:px-8 sm:pb-44 sm:pt-28">
        <SectionLabel tone="light">Why she is running</SectionLabel>

        <div className="mt-10 font-display text-[clamp(2.8rem,6.4vw,6rem)] uppercase">
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
              Rivers State needs <span className="text-gold-200">truth.</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
