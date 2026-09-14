"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * The two figures MP LEAD publishes about selection, drawn to scale: over
 * five thousand applications narrowing to a cohort of forty. Only these two
 * numbers are verified, so only these two are shown — no invented
 * intermediate round sizes.
 */
const ROWS = [
  { value: "5,000+", label: "Applications received", width: "100%" },
  { value: "40", label: "Fellows selected", width: "12%" },
];

export function SelectionFunnel() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".funnel-bar", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        stagger: 0.18,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
      gsap.from(".funnel-fig", {
        y: 18,
        opacity: 0,
        duration: 0.6,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="flex flex-col gap-8">
      {ROWS.map((r) => (
        <div key={r.label}>
          <div className="funnel-fig mb-3 flex items-baseline gap-4">
            <span className="grotesque text-[clamp(38px,5.5vw,76px)] leading-none font-extrabold">
              {r.value}
            </span>
            <span className="eyebrow text-ink-soft">{r.label}</span>
          </div>
          <div className="h-3 w-full rounded-full bg-line/60">
            <div
              className="funnel-bar h-full rounded-full bg-linear-to-r from-saffron-deep to-saffron"
              style={{ width: r.width }}
            />
          </div>
        </div>
      ))}
      <p className="max-w-lg text-[13.5px] leading-relaxed text-ink-soft">
        Bars are drawn to the two selection figures MP LEAD publishes. Round-by-round
        shortlist sizes are not published, so none are shown.
      </p>
    </div>
  );
}
