"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Download, Expand, X } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { gallery, shareText } from "@/content/campaign";

const src = (slug: string) => `/img/${slug}.webp`;
const download = (slug: string) => `/downloads/opoli-2027-${slug}.png`;

export function Media() {
  const [index, setIndex] = useState<number | null>(null);
  const item = index === null ? null : gallery[index];

  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, step]);

  return (
    <section id="media" className="relative bg-ink py-24 text-white sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <SectionLabel tone="light">
              Campaign media
            </SectionLabel>
            <Reveal>
              <h2 className="mt-8 font-display text-[clamp(3rem,6.5vw,6rem)] uppercase">
                Print it. Post it. <span className="text-gold-400">Share it.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <p className="text-lg leading-relaxed text-white/65">
              Official flyers from the campaign. Download the full-resolution files for your WhatsApp
              status, church bulletin, market stall or street pole.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
          {gallery.map((g, i) => (
            <Reveal as="li" key={g.slug} delay={(i % 4) * 0.05} className="mb-3 break-inside-avoid sm:mb-4">
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden bg-white/5 text-left"
                aria-label={`Open ${g.title}`}
              >
                <Image
                  src={src(g.slug)}
                  alt={g.title}
                  width={g.w}
                  height={g.h}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="h-auto w-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
                />
                <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-gold-400 px-3 py-2 text-xs font-semibold text-ink transition-transform duration-300 group-hover:translate-y-0">
                  {g.title}
                  <Expand size={14} />
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {item && index !== null && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
              <p className="truncate text-sm text-white/70">
                <span className="tabular-nums text-white">
                  {String(index + 1).padStart(2, "0")}/{String(gallery.length).padStart(2, "0")}
                </span>
                <span className="mx-2 text-white/30">—</span>
                {item.title}
              </p>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn bg-[#25D366] px-3 py-2 text-ink hover:bg-[#1ebe5b]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Share</span>
                </a>
                <a href={download(item.slug)} download className="btn bg-white px-3 py-2 text-ink hover:bg-gold-400">
                  <Download size={16} />
                  <span className="hidden sm:inline">Download PNG</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIndex(null)}
                  className="grid h-10 w-10 place-items-center bg-white/10 hover:bg-white/20"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative h-full w-full"
                >
                  <Image src={src(item.slug)} alt={item.title} fill sizes="90vw" className="object-contain" />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={() => step(-1)}
                className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center bg-white/10 hover:bg-white/20 sm:left-6"
                aria-label="Previous"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center bg-white/10 hover:bg-white/20 sm:right-6"
                aria-label="Next"
              >
                <ChevronRight />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
