"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { candidate, party } from "@/content/campaign";

const ease = [0.22, 1, 0.36, 1] as const;

/** A line of type that slides up out of a mask. */
function MaskLine({ children, delay, className }: { children: React.ReactNode; delay: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={reduce ? false : { y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * "Poster" hero: her full name runs large across the top, she stands at the right in front of it,
 * and a party-gold floor runs the full width along the bottom carrying the write-up.
 * A horizontal split — the network sites use vertical ones.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section ref={ref} id="top" className="relative -mt-[4.5rem] overflow-hidden bg-paper text-ink lg:min-h-[100svh]">
      {/* Gold floor (desktop): sweeps in from the left */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 hidden h-[34%] origin-left bg-gold-400 lg:block"
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease }}
      />

      {/* Name */}
      <div className="relative mx-auto max-w-[1400px] px-5 pt-28 sm:px-8 lg:pt-32">
        <motion.p
          className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-brown-700 sm:text-sm"
          {...enter(0.15)}
        >
          <span aria-hidden className="h-[2px] w-8 bg-gold-500" />
          {candidate.honorific}
        </motion.p>

        <h1 className="mt-5 font-display text-[17vw] leading-[0.88] lg:text-[clamp(6rem,11.5vw,11.5rem)]">
          <MaskLine delay={0.25}>
            {candidate.firstName} {candidate.middleName}
          </MaskLine>
          <MaskLine delay={0.4} className="text-brown-700">
            {candidate.lastName}
          </MaskLine>
        </h1>
      </div>

      {/* Portrait: on phones it sits on its own strip of gold floor */}
      <div className="relative mt-8 lg:static lg:mt-0">
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[36%] bg-gold-400 lg:hidden" />
        <motion.div
          style={{ y: reduce ? 0 : portraitY }}
          className="pointer-events-none relative z-10 mx-auto w-[min(80vw,400px)] lg:absolute lg:bottom-0 lg:right-[6%] lg:mx-0 lg:w-[min(34vw,520px,calc((100svh-6rem)/1.44))]"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.35, ease }}
          >
            <Image
              src="/img/portrait-suit.webp"
              alt={`${candidate.honorific} ${candidate.firstName} ${candidate.middleName} ${candidate.lastName}, ${party.name} candidate for ${candidate.district}`}
              width={1000}
              height={1440}
              preload
              sizes="(min-width: 1024px) 34vw, 80vw"
              className="h-auto w-full"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Write-up on the gold floor */}
      <div className="relative z-20 bg-gold-400 lg:absolute lg:inset-x-0 lg:bottom-0 lg:h-[34%] lg:bg-transparent">
        <div className="mx-auto flex h-full max-w-[1400px] items-center px-5 py-10 sm:px-8 lg:py-0">
          <motion.div className="lg:max-w-[48%]" {...enter(0.9)}>
            <p className="text-[clamp(1.5rem,2.4vw,2.25rem)] font-semibold leading-[1.15] tracking-tight">
              Competence, Integrity, and Service to the People.
            </p>
            <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink/70">
              {party.name} candidate for Senate, {candidate.district}.
            </p>
            <a
              href="#agenda"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brown-900 underline decoration-brown-900/30 underline-offset-4 hover:decoration-brown-900"
            >
              What she stands for <ArrowDown size={15} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
