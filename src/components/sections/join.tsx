"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { helpOptions, lgas, shareText } from "@/content/campaign";

type Errors = Partial<Record<"name" | "phone" | "lga" | "form", string>>;

const field =
  "mt-2 block w-full border-0 border-b-2 border-ink/15 bg-transparent px-0 py-3 text-lg outline-none transition-colors placeholder:text-ink/30 focus:border-green-700 focus-visible:outline-none";

export function Join() {
  const [help, setHelp] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [firstName, setFirstName] = useState("");

  function toggle(h: string) {
    setHelp((cur) => (cur.includes(h) ? cur.filter((x) => x !== h) : [...cur, h]));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      phone: fd.get("phone"),
      lga: fd.get("lga"),
      ward: fd.get("ward"),
      company: fd.get("company"),
      help,
    };

    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrors(data.errors ?? { form: data.error ?? "Something went wrong. Try again." });
        setStatus("idle");
        return;
      }
      setFirstName(String(payload.name ?? "").trim().split(/\s+/)[0]);
      setStatus("done");
    } catch {
      setErrors({ form: "Network problem — check your connection and try again." });
      setStatus("idle");
    }
  }

  return (
    <section id="join" className="relative bg-cream">
      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-12">
        {/* Pitch */}
        <div className="grain grain-light relative overflow-hidden bg-green-800 px-5 py-20 text-white sm:px-8 sm:py-24 lg:col-span-5 lg:px-12">
          <div aria-hidden className="ridges pointer-events-none absolute inset-0 text-white/[0.04]" />
          <div className="relative z-[2]">
            <SectionLabel tone="light">
              Get involved
            </SectionLabel>
            <Reveal>
              <h2 className="mt-8 font-display text-[clamp(3.2rem,6vw,5.6rem)] uppercase">
                Rivers West, <span className="text-gold-400">the time has come.</span>
              </h2>
            </Reveal>
            <p className="mt-6 max-w-sm leading-relaxed text-white/70">
              Campaigns are won ward by ward, unit by unit. Tell us where you are and how you can help —
              the team in your LGA will reach out on WhatsApp.
            </p>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noreferrer"
              className="btn mt-10 bg-[#25D366] text-ink hover:bg-[#1ebe5b]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Share on WhatsApp
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="px-5 py-16 sm:px-8 sm:py-24 lg:col-span-7 lg:px-16">
          <AnimatePresence mode="wait">
            {status === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex h-full flex-col justify-center"
              >
                <p className="label text-green-700">Registered</p>
                <p className="mt-4 font-display text-[clamp(3rem,6vw,5rem)] uppercase">
                  You&rsquo;re in{firstName ? `, ${firstName}` : ""}.
                </p>
                <p className="mt-4 max-w-md text-lg text-ink/70">
                  Welcome to the movement. Your LGA coordinator will be in touch. Until then, bring two
                  more people with you.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setHelp([]);
                  }}
                  className="mt-8 w-fit text-sm font-semibold text-green-700 underline underline-offset-4"
                >
                  Register someone else
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-8 sm:grid-cols-2"
              >
                <label className="sm:col-span-2">
                  <span className="label text-mute">Full name</span>
                  <input name="name" autoComplete="name" placeholder="e.g. Blessing Amadi" className={field} />
                  {errors.name && <span className="mt-2 block text-sm text-red-700">{errors.name}</span>}
                </label>

                <label>
                  <span className="label text-mute">Phone / WhatsApp</span>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="0803 000 0000"
                    className={field}
                  />
                  {errors.phone && <span className="mt-2 block text-sm text-red-700">{errors.phone}</span>}
                </label>

                <label>
                  <span className="label text-mute">LGA</span>
                  <select name="lga" defaultValue="" className={`${field} cursor-pointer`}>
                    <option value="" disabled>
                      Select your LGA
                    </option>
                    {lgas.map((l) => (
                      <option key={l.name} value={l.name}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                  {errors.lga && <span className="mt-2 block text-sm text-red-700">{errors.lga}</span>}
                </label>

                <label className="sm:col-span-2">
                  <span className="label text-mute">
                    Ward / community <span className="normal-case tracking-normal text-ink/40">(optional)</span>
                  </span>
                  <input name="ward" placeholder="e.g. Ward 7, Omoku" className={field} />
                </label>

                {/* honeypot */}
                <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                <fieldset className="sm:col-span-2">
                  <legend className="label text-mute">I can help with</legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {helpOptions.map((h) => {
                      const on = help.includes(h);
                      return (
                        <button
                          key={h}
                          type="button"
                          onClick={() => toggle(h)}
                          aria-pressed={on}
                          className={`px-4 py-2.5 text-sm font-medium ring-1 ring-inset transition-colors ${
                            on
                              ? "bg-ink text-white ring-ink"
                              : "bg-white text-ink/80 ring-ink/15 hover:ring-ink/40"
                          }`}
                        >
                          {h}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-xs text-xs leading-relaxed text-mute">
                    We only use your details to organise campaign activity in Rivers West. No spam, ever.
                  </p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn justify-center bg-green-700 px-8 text-white hover:bg-green-800 disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending
                      </>
                    ) : (
                      <>
                        Count me in <ArrowRight size={16} strokeWidth={2.4} />
                      </>
                    )}
                  </button>
                </div>
                {errors.form && <p className="text-sm text-red-700 sm:col-span-2">{errors.form}</p>}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
