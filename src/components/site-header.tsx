"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { DlaMark } from "@/components/ui/dla-mark";
import { election } from "@/content/campaign";

const links = [
  { href: "#about", label: "About" },
  { href: "#agenda", label: "Agenda" },
  { href: "#district", label: "Rivers West" },
  { href: "#vote", label: "How to vote" },
  { href: "#media", label: "Media" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled
            ? "bg-paper/95 shadow-[0_1px_0_rgba(13,15,12,.08)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-[1400px] items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="Back to top">
            <DlaMark size={42} />
            <span className="leading-none">
              <span className="block font-display text-[1.45rem] tracking-wide">Aneni Opoli</span>
              <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-mute">
                Democratic Leadership Alliance
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-sm font-medium text-ink/80 transition-colors hover:text-ink"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-gold-500 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#join"
              className={`btn hidden sm:inline-flex ${
                // over the hero's gold panel a gold button would disappear, so it starts brown
                scrolled ? "bg-gold-400 text-ink hover:bg-gold-500" : "bg-brown-900 text-gold-200 hover:bg-brown-700"
              }`}
            >
              Join the movement
              <ArrowUpRight size={16} strokeWidth={2.4} />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center bg-ink text-white lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-brown-900 text-white"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-[4.5rem] items-center justify-between px-5">
              <DlaMark size={42} withName tone="light" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center bg-white text-ink"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-5" aria-label="Mobile">
              {[...links, { href: "#join", label: "Join the movement" }].map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-6xl text-white/90 hover:text-gold-400"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <p className="px-5 pb-8 text-sm text-white/60">
              Polls open {election.label}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
