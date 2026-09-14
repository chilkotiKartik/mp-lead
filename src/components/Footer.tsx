"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, ArrowUpRight } from "lucide-react";

const COLUMNS = [
  {
    heading: "Explore",
    links: [
      ["Fellowship", "/fellowship"],
      ["Journey", "/journey"],
      ["The Cohort", "/fellows"],
      ["Projects", "/projects"],
      ["Institutions", "/institutions"],
    ],
  },
  {
    heading: "Programme",
    links: [
      ["Apply", "/apply"],
      ["Track application", "/apply/track"],
      ["Alumni", "/alumni"],
      ["Fellow portal", "/portal"],
      ["Admin console", "/admin"],
    ],
  },
  {
    heading: "Connect",
    links: [
      ["Contact", "/contact"],
      ["Media & press", "/media"],
      ["Events", "/events"],
      ["Dispatches", "/stories"],
    ],
  },
] as const;

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".foot-col", {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 85%" },
      });
      // The oversized wordmark rises out of its own mask as the page bottoms out.
      gsap.from(".foot-mark", {
        yPercent: 100,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".foot-mark-mask", start: "top 95%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-line bg-paper-dim">
      {/* Closing CTA */}
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-line pb-14">
          <h2 className="display max-w-xl text-[clamp(30px,4.6vw,62px)]">
            Step into the rooms
            <br />
            <span className="text-saffron-deep italic">where it happens.</span>
          </h2>
          <Link
            href="/apply"
            className="grotesque group inline-flex items-center gap-2.5 rounded-full bg-ink px-9 py-4.5 text-[13px] font-bold tracking-wide text-paper uppercase transition-colors hover:bg-saffron-deep"
          >
            Apply to Batch 05
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Columns */}
        <div className="grid gap-12 pt-14 md:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div className="foot-col">
            <div className="display mb-4 text-[30px]">MP LEAD</div>
            <p className="mb-6 max-w-xs text-[14px] leading-relaxed text-ink-soft">
              Legislative Exposure &amp; Administrative Development Fellowship — a two-month
              immersion into how the Indian republic is actually run.
            </p>
            <div className="flex items-center gap-2.5">
              <span className="size-2 animate-pulse rounded-full bg-saffron-deep" />
              <span className="eyebrow text-saffron-deep">Batch 05 applications open</span>
            </div>
          </div>

          {COLUMNS.map((c) => (
            <nav key={c.heading} className="foot-col" aria-label={c.heading}>
              <h3 className="eyebrow mb-5 text-ink/40">{c.heading}</h3>
              <ul className="flex flex-col gap-3">
                {c.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group inline-flex items-center gap-1.5 text-[14.5px] text-ink-soft transition-colors hover:text-ink"
                    >
                      <span className="gradient-underline">{label}</span>
                      <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-60" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="foot-mark-mask overflow-hidden px-4 md:px-8">
        <div
          className="foot-mark display w-full text-center leading-[0.76] tracking-[-0.045em] text-ink/12 select-none"
          style={{ fontSize: "clamp(78px, 29.5vw, 520px)" }}
          aria-hidden
        >
          MP LEAD
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 md:px-12">
          <p className="max-w-2xl text-[11.5px] leading-relaxed text-ink-soft/70">
            Programme photography © MP LEAD Fellowship. Architectural photography courtesy of
            Wikimedia Commons contributors. Dates and venues marked TBC publish once confirmed.
          </p>
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "auto"
                  : "smooth",
              })
            }
            className="grotesque inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-[11px] font-bold tracking-wide uppercase transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            Back to top
            <ArrowUp className="size-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
