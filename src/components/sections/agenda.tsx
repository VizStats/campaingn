import Image from "next/image";
import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { commitments, type Commitment } from "@/content/campaign";

const tones: Record<
  Commitment["tone"],
  { card: string; num: string; muted: string; chip: string; img: string }
> = {
  green: {
    card: "bg-green-800 text-white",
    num: "text-green-300/25",
    muted: "text-white/75",
    chip: "bg-white/10 text-white ring-white/20",
    img: "mix-blend-luminosity",
  },
  gold: {
    card: "bg-gold-400 text-ink",
    num: "text-ink/10",
    muted: "text-ink/75",
    chip: "bg-ink/5 text-ink ring-ink/15",
    img: "",
  },
  brown: {
    card: "bg-brown-900 text-white",
    num: "text-gold-400/20",
    muted: "text-white/70",
    chip: "bg-white/10 text-white ring-white/20",
    img: "grayscale",
  },
  ink: {
    card: "bg-ink text-white",
    num: "text-white/10",
    muted: "text-white/70",
    chip: "bg-white/10 text-white ring-white/20",
    img: "",
  },
};

export function Agenda() {
  return (
    <section id="agenda" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel>The agenda</SectionLabel>
          </div>
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-[clamp(3rem,6.5vw,6rem)] uppercase">
              Her commitment to <span className="text-green-700">Rivers people</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/70">
              Four promises, plainly stated. She refuses to see the tears of Rivers people again.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 space-y-6 lg:mt-24">
          {commitments.map((c, i) => {
            const t = tones[c.tone];
            return (
              <li
                key={c.n}
                className="lg:sticky"
                style={{ top: `calc(6rem + ${i * 1.75}rem)` }}
              >
                <article
                  className={`grain relative grid overflow-hidden shadow-[0_-20px_50px_-30px_rgba(0,0,0,.45)] md:grid-cols-12 ${t.card}`}
                >
                  <div className="relative z-[2] flex flex-col p-7 sm:p-10 md:col-span-7 lg:p-14">
                    <div className="flex items-start justify-between gap-6">
                      <p className="label opacity-80">{c.audience}</p>
                      <span className={`font-display text-[7rem] leading-[0.7] sm:text-[9rem] ${t.num}`} aria-hidden>
                        {c.n}
                      </span>
                    </div>
                    <h3 className="-mt-6 font-display text-[clamp(2.8rem,6vw,5.5rem)] uppercase sm:-mt-10">
                      {c.title}
                    </h3>
                    <div className={`mt-6 max-w-xl space-y-4 text-[1.02rem] leading-relaxed ${t.muted}`}>
                      {c.body.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                    <ul className="mt-8 flex flex-wrap gap-2 md:mt-auto md:pt-10">
                      {c.points.map((p) => (
                        <li
                          key={p}
                          className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium ring-1 ring-inset ${t.chip}`}
                        >
                          <Check size={14} strokeWidth={3} /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative min-h-[320px] md:col-span-5 md:min-h-[560px]">
                    <Image
                      src={c.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className={`object-cover ${t.img}`}
                      style={{ objectPosition: c.image.position }}
                    />
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
