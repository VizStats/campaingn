"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { election } from "@/content/campaign";

const DLA_ROW = 2;
const ROWS = 5;

const steps = [
  {
    title: "Get your PVC",
    body: "You need your Permanent Voter's Card (PVC) to vote. If you haven't collected it yet, go to the INEC office in your LGA.",
    link: { href: "https://cvr.inecnigeria.org", label: "Check your registration" },
  },
  {
    title: "Know where you vote",
    body: "You can only vote at the polling unit where you registered. If you're not sure where that is, check on the INEC portal.",
  },
  {
    title: `Go early on ${election.label.replace("Saturday, ", "")}`,
    body: "Polls open at 8:30am. An INEC official will check your PVC and fingerprint, then give you your Senate ballot.",
  },
  {
    title: "Thumbprint DLA",
    body: "Find the DLA logo — the gold pen. Press your inked thumb inside the box next to it, and nowhere else.",
  },
  {
    title: "Stay for the result",
    body: "Votes are counted and the result is posted at your polling unit. Wait and see it for yourself.",
  },
];

/** Plain placeholder marks — we never reproduce another party's logo. */
function OtherParty() {
  return <span className="text-xs text-ink/35">Other party</span>;
}

export function HowToVote() {
  const [picked, setPicked] = useState<number | null>(null);
  const [miss, setMiss] = useState<number | null>(null);
  const correct = picked === DLA_ROW;

  function stamp(row: number) {
    if (correct) return;
    if (row === DLA_ROW) {
      setPicked(row);
      setMiss(null);
    } else {
      setMiss(row);
      window.setTimeout(() => setMiss((m) => (m === row ? null : m)), 1400);
    }
  }

  return (
    <section id="vote" className="bg-paper py-24 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="max-w-2xl">
          <SectionLabel>How to vote</SectionLabel>
          <Reveal>
            <h2 className="mt-4 font-display text-[clamp(2.8rem,5vw,4.6rem)] uppercase">
              Five steps on <span className="text-green-700">election day</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">
              Follow these and your vote will count. A thumbprint in the wrong place can void your ballot,
              so you can practise below.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Steps */}
          <ol className="lg:col-span-7">
            {steps.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 0.05}
                className="grid grid-cols-[2.75rem_1fr] gap-4 border-t border-ink/15 py-6 last:border-b"
              >
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full text-sm font-semibold ${
                    i === 3 ? "bg-gold-400 text-ink" : "bg-green-700 text-white"
                  }`}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1.5 max-w-lg leading-relaxed text-ink/70">{s.body}</p>
                  {s.link && (
                    <a
                      href={s.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-green-700 underline decoration-green-700/30 underline-offset-4 hover:decoration-green-700"
                    >
                      {s.link.label} <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>

          {/* Practice ballot */}
          <Reveal className="lg:col-span-5">
            <div className="mx-auto max-w-[400px] lg:sticky lg:top-28">
              <p className="text-lg font-semibold">Try it</p>
              <p className="mt-1 text-sm text-ink/60">Tap the box where your thumbprint should go.</p>

              <div className="mt-5 bg-white p-4 shadow-[0_24px_60px_-30px_rgba(13,15,12,.35)] ring-1 ring-ink/10 sm:p-5">
                <p className="pb-3 text-center text-xs font-medium text-mute">Senate ballot · Rivers West</p>

                <table className="w-full table-fixed border-collapse text-center">
                  <thead>
                    <tr className="text-xs font-medium text-white">
                      <th className="bg-[#9b1c1c] py-2.5">Party</th>
                      <th className="bg-green-900 py-2.5">Thumbprint</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: ROWS }, (_, row) => {
                      const isDla = row === DLA_ROW;
                      const isMiss = miss === row;
                      return (
                        <tr key={row} className="h-[4.75rem]">
                          <td className={`border border-green-900/50 ${isDla ? "bg-gold-200/30" : ""}`}>
                            {isDla ? (
                              <Image src="/img/dla-logo.png" alt="DLA" width={312} height={312} className="mx-auto w-14" />
                            ) : (
                              <OtherParty />
                            )}
                          </td>
                          <td className="relative border border-green-900/50 p-0">
                            <button
                              type="button"
                              onClick={() => stamp(row)}
                              className={`absolute inset-0 grid place-items-center transition-colors ${
                                correct ? "cursor-default" : "hover:bg-green-700/5"
                              } ${isMiss ? "bg-red-50" : ""}`}
                              aria-label={isDla ? "Thumbprint the DLA box" : "Thumbprint this box"}
                            >
                              <AnimatePresence>
                                {(picked === row || isMiss) && (
                                  <motion.span
                                    initial={{ scale: 1.4, opacity: 0 }}
                                    animate={{ scale: 1, opacity: isMiss ? 0.5 : 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="block -rotate-6"
                                  >
                                    <Image
                                      src="/img/thumbprint.png"
                                      alt=""
                                      width={216}
                                      height={276}
                                      className={`h-12 w-auto ${isMiss ? "grayscale" : ""}`}
                                    />
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="mt-4 min-h-[3rem]" aria-live="polite">
                  {correct ? (
                    <div className="flex items-center justify-between gap-3 bg-green-700 px-4 py-3 text-sm font-medium text-white">
                      <span>Correct — that vote counts.</span>
                      <button
                        type="button"
                        onClick={() => setPicked(null)}
                        className="inline-flex items-center gap-1 text-white/80 hover:text-white"
                      >
                        <RotateCcw size={14} /> Again
                      </button>
                    </div>
                  ) : miss !== null ? (
                    <p className="bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                      Not this one. Look for the DLA logo with the gold pen.
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
