import { Countdown } from "@/components/ui/countdown";
import { Reveal } from "@/components/ui/reveal";

/**
 * Zero-height strip placed between two sections: the countdown card sits
 * centred on the seam, half over the section above and half over the one below.
 * Neighbouring sections reserve extra padding for it.
 */
export function CountdownBridge() {
  return (
    <div className="relative z-20 h-0">
      <div className="mx-auto flex max-w-[1400px] justify-end px-5 sm:px-8">
        <div className="w-full max-w-[420px] -translate-y-1/2">
          <Reveal>
            <div className="shadow-[0_28px_60px_-28px_rgba(42,26,5,.65)]">
              <Countdown tone="gold" />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
