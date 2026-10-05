"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Countdown } from "@/components/ui/countdown";
import { candidate } from "@/content/campaign";

const ease = [0.22, 1, 0.36, 1] as const;

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section id="top" ref={ref} className="relative -mt-[4.5rem] overflow-hidden pt-[4.5rem]">
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:pb-14 lg:pt-12">
        {/* Copy */}
        <div className="relative z-10 lg:col-span-7">
          <motion.p
            className="text-[0.95rem] font-medium text-green-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            DLA candidate for the Senate, 2027
          </motion.p>

          <h1 className="mt-5 font-display text-[clamp(3.6rem,8.2vw,7.6rem)] uppercase">
            <Line delay={0.1}>
              <span className="text-green-700">A stronger</span>
            </Line>
            <Line delay={0.2}>
              <span className="text-gold-500">voice</span> <span className="text-ink">for</span>
            </Line>
            <Line delay={0.3}>
              <span className="text-ink">Rivers West</span>
            </Line>
          </h1>

          <motion.div
            className="mt-10 border-l-[3px] border-gold-500 pl-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
          >
            <p className="text-sm text-mute">{candidate.honorific}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
              {candidate.firstName} {candidate.middleName} {candidate.lastName}
            </p>
            <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-ink/70">
              Running for the Senate so Rivers West finally has someone who speaks up — for our young
              people, for our women, and for everyone who has been left out.
            </p>
          </motion.div>
        </div>

        {/* Portrait */}
        <div className="relative lg:col-span-5">
          <motion.div
            className="relative mx-auto w-full max-w-[460px] lg:ml-auto lg:mr-0"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease, delay: 0.15 }}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#eef0ee]">
              <motion.div style={{ y: imgY }} className="absolute inset-0 scale-[1.06]">
                <Image
                  src="/img/portrait-hero.jpg"
                  alt={`${candidate.honorific} ${candidate.firstName} ${candidate.middleName} ${candidate.lastName}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 460px, 92vw"
                  className="object-cover object-[50%_8%]"
                />
              </motion.div>
            </div>

            <div className="relative -mt-16 ml-auto w-[min(94%,380px)] shadow-[0_24px_60px_-24px_rgba(6,51,26,.6)] sm:-mr-6">
              <Countdown />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
