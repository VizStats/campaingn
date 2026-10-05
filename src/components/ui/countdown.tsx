"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSyncExternalStore } from "react";
import { election } from "@/content/campaign";

const TARGET = new Date(election.iso).getTime();
const START = new Date(election.campaignStart).getTime();

function diff(now: number) {
  const ms = Math.max(0, TARGET - now);
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    mins: Math.floor(ms / 60_000) % 60,
    secs: Math.floor(ms / 1000) % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

// One shared 1s clock for every countdown on the page.
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;
let clock = Date.now();

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (!timer) {
    clock = Date.now();
    timer = setInterval(() => {
      clock = Date.now();
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(cb);
    if (!listeners.size && timer) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

const getSnapshot = () => clock;
const getServerSnapshot = () => null;

/** Digit that rolls up when its value changes. */
function Roll({ value }: { value: string }) {
  return (
    <span className="relative inline-flex h-[1em] overflow-hidden leading-none">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="block tabular-nums"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Election-day countdown card. Renders dashes on the server to avoid a hydration mismatch. */
export function Countdown() {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const t = now === null ? null : diff(now);
  const progress = now === null ? 0 : Math.min(1, Math.max(0, (now - START) / (TARGET - START)));

  const cells: { label: string; value: string; accent?: boolean }[] = [
    { label: "Days", value: t ? String(t.days) : "––", accent: true },
    { label: "Hours", value: t ? pad(t.hours) : "––" },
    { label: "Minutes", value: t ? pad(t.mins) : "––" },
    { label: "Seconds", value: t ? pad(t.secs) : "––" },
  ];

  return (
    <div className="bg-green-900 p-5 text-white sm:p-6" role="timer" aria-label="Countdown to election day">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold">Election day</p>
        <p className="text-xs text-white/60">{election.label}</p>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-1.5">
        {cells.map((c) => (
          <div
            key={c.label}
            className={`flex flex-col items-center py-3 ${c.accent ? "bg-gold-400 text-ink" : "bg-white/[0.07]"}`}
          >
            <span className="font-display text-[2.6rem] sm:text-5xl">
              <Roll value={c.value} />
            </span>
            <span className={`mt-1.5 text-[0.62rem] font-medium ${c.accent ? "text-ink/70" : "text-white/55"}`}>
              {c.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <div className="flex justify-between text-[0.68rem] text-white/55">
          <span>Campaign opened 19 Aug</span>
          <span suppressHydrationWarning>{Math.round(progress * 100)}% of the way there</span>
        </div>
        <div className="mt-2 h-1 bg-white/10">
          <div className="h-full bg-gold-400 transition-[width] duration-1000" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
