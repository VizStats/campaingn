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

/** Quiet one-line "N days to election day" for places that shouldn't compete for attention. */
export function DaysLeft({ className }: { className?: string }) {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const t = now === null ? null : diff(now);
  return (
    <span className={className}>
      <span className="tabular-nums">{t ? t.days : "–"}</span> days to election day
    </span>
  );
}

const themes = {
  brown: {
    card: "bg-brown-900 text-white",
    sub: "text-white/60",
    tile: "bg-white/[0.07]",
    tileLabel: "text-white/55",
    accent: "bg-gold-400 text-ink",
    accentLabel: "text-ink/70",
    track: "bg-white/10",
    fill: "bg-gold-400",
  },
  gold: {
    card: "bg-gold-400 text-ink",
    sub: "text-ink/65",
    tile: "bg-ink/[0.08]",
    tileLabel: "text-ink/65",
    accent: "bg-brown-900 text-gold-400",
    accentLabel: "text-gold-200/80",
    track: "bg-ink/15",
    fill: "bg-brown-900",
  },
};

/** Election-day countdown card. Renders dashes on the server to avoid a hydration mismatch. */
export function Countdown({ tone = "brown" }: { tone?: keyof typeof themes }) {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const t = now === null ? null : diff(now);
  const progress = now === null ? 0 : Math.min(1, Math.max(0, (now - START) / (TARGET - START)));
  const th = themes[tone];

  const cells: { label: string; value: string; accent?: boolean }[] = [
    { label: "Days", value: t ? String(t.days) : "––", accent: true },
    { label: "Hours", value: t ? pad(t.hours) : "––" },
    { label: "Minutes", value: t ? pad(t.mins) : "––" },
    { label: "Seconds", value: t ? pad(t.secs) : "––" },
  ];

  return (
    <div className={`p-5 sm:p-6 ${th.card}`} role="timer" aria-label="Countdown to election day">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold">Election day</p>
        <p className={`text-xs ${th.sub}`}>{election.label}</p>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-1.5">
        {cells.map((c) => (
          <div key={c.label} className={`flex flex-col items-center py-3 ${c.accent ? th.accent : th.tile}`}>
            <span className="font-display text-[2.6rem] sm:text-5xl">
              <Roll value={c.value} />
            </span>
            <span className={`mt-1.5 text-[0.62rem] font-medium ${c.accent ? th.accentLabel : th.tileLabel}`}>
              {c.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <div className={`flex justify-between text-[0.68rem] ${th.sub}`}>
          <span>Campaign opened 19 Aug</span>
          <span suppressHydrationWarning>{Math.round(progress * 100)}% of the way there</span>
        </div>
        <div className={`mt-2 h-1 ${th.track}`}>
          <div className={`h-full transition-[width] duration-1000 ${th.fill}`} style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
