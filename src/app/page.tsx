import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { Ticker } from "@/components/sections/ticker";
import { Light } from "@/components/sections/light";
import { CountdownBridge } from "@/components/sections/countdown-bridge";
import { About } from "@/components/sections/about";
import { Agenda } from "@/components/sections/agenda";
import { QuoteBand } from "@/components/sections/quote-band";
import { District } from "@/components/sections/district";
import { HowToVote } from "@/components/sections/how-to-vote";
import { Media } from "@/components/sections/media";
import { Join } from "@/components/sections/join";
import { Closing } from "@/components/sections/closing";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Light />
        <CountdownBridge />
        <About />
        <Ticker />
        <Agenda />
        <QuoteBand />
        <District />
        <HowToVote />
        <Media />
        <Join />
        <Closing />
      </main>
      <SiteFooter />
    </>
  );
}
