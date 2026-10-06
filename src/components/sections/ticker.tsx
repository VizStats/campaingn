// Campaign lines people already repeat — all from the campaign's own copy.
const words = [
  "Voice for the voiceless",
  "Hope for the hopeless",
  "Jobs, not guns",
  "A woman of justice",
  "Restoring lost hope",
  "A new Rivers West",
  "Liberty has come",
];

export function Ticker() {
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden}>
      {words.map((w) => (
        <li key={w} className="flex items-center font-display text-[2.6rem] uppercase sm:text-6xl">
          <span className="px-6 sm:px-8">{w}</span>
          <svg width="18" height="18" viewBox="0 0 18 18" className="text-brown-700" aria-hidden>
            <path d="M9 0l2.2 6.8L18 9l-6.8 2.2L9 18l-2.2-6.8L0 9l6.8-2.2z" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  );

  // Split backdrop (About's paper above, Agenda's cream below) so the tilted
  // strip never shows a white gap against the dark section underneath.
  return (
    <div className="relative z-10 bg-[linear-gradient(to_bottom,var(--color-paper)_50%,var(--color-cream)_50%)]">
      <div className="-rotate-[1.2deg] overflow-hidden border-y-4 border-ink bg-gold-400 py-3 text-ink">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {row()}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
