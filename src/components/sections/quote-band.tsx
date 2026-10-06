import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export function QuoteBand() {
  return (
    <section className="relative overflow-hidden">
      {/* Banner: portrait fills the right side and fades into brown under the quote */}
      <div className="relative isolate bg-brown-900 text-white">
        <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[62%]">
          <Image
            src="/img/face-closeup.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="object-cover object-[50%_35%]"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-brown-900/75 lg:bg-transparent lg:bg-[linear-gradient(to_right,var(--color-brown-900)_38%,rgba(42,26,5,.85)_55%,rgba(42,26,5,.25)_100%)]"
        />

        <div className="mx-auto max-w-[1400px] px-5 py-28 sm:px-8 sm:py-36">
          <Reveal className="max-w-3xl">
            <svg width="72" height="50" viewBox="0 0 92 64" className="text-gold-400" aria-hidden>
              <path d="M0 0h40v36L26 64H10l10-28H0zM52 0h40v36L78 64H62l10-28H52z" fill="currentColor" />
            </svg>
            <blockquote className="mt-6 font-display text-[clamp(3.6rem,8.5vw,8rem)] uppercase">
              <p>
                A better <span className="text-gold-400">future</span>
                <br />
                is <span className="text-gold-200">built</span>,
                <br />
                not promised.
              </p>
            </blockquote>
          </Reveal>
        </div>
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
