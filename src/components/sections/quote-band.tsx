import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export function QuoteBand() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-12">
        <Reveal className="relative z-10 lg:col-span-7">
          <svg width="92" height="64" viewBox="0 0 92 64" className="text-ink" aria-hidden>
            <path d="M0 0h40v36L26 64H10l10-28H0zM52 0h40v36L78 64H62l10-28H52z" fill="currentColor" />
          </svg>
          <blockquote className="mt-6 font-display text-[clamp(4rem,10vw,9.5rem)] uppercase">
            <p>
              A better <span className="text-gold-500">future</span>
              <br />
              is <span className="text-green-500">built</span>,
              <br />
              not promised.
            </p>
          </blockquote>
        </Reveal>

        <Reveal delay={0.1} className="relative lg:col-span-5">
          <div
            className="relative aspect-[595/900] w-full overflow-hidden bg-green-950"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 72%, 62% 100%, 0 100%)" }}
          >
            <Image
              src="/img/face-closeup.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 38vw, 92vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-green-900/70 via-transparent to-transparent" />
          </div>
        </Reveal>
      </div>

      <div className="bg-ink text-white">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-5 py-14 sm:px-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-8">
            <p className="font-display text-[clamp(2.6rem,5.5vw,5rem)] uppercase">
              Leadership must meet the people where their problems begin.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4">
            <p className="border-l-2 border-gold-400 pl-4 text-white/70">
              Public service should begin with reality and end with results.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
