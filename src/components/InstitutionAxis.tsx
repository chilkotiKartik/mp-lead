"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Elevation diagram of the offices along the central vista in New Delhi,
 * drawn as line work. Proportions are schematic — this is a locator, not a
 * survey drawing, and it is labelled as such.
 */
const MARKS = [
  { label: "Rashtrapati Bhavan", sub: "Presidential Estate", x: 60, w: 78, h: 86, dome: true },
  { label: "South Block", sub: "Cabinet Secretariat · MEA", x: 190, w: 70, h: 66, dome: false },
  { label: "India Gate", sub: "Kartavya Path", x: 320, w: 54, h: 78, dome: false },
  { label: "Supreme Court", sub: "Constitutional bench", x: 440, w: 74, h: 70, dome: true },
];

const BASE = 130;

export function InstitutionAxis() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".axis-draw", { strokeDasharray: 400, strokeDashoffset: 400 });
      gsap.set(".axis-label", { opacity: 0, y: 10 });
      gsap.set(".axis-node", { scale: 0, transformOrigin: "center" });

      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 80%" } });
      tl.to(".axis-line", { scaleX: 1, duration: 1, ease: "power3.inOut" })
        .to(".axis-draw", { strokeDashoffset: 0, duration: 1.2, stagger: 0.12, ease: "power2.out" }, "-=0.6")
        .to(".axis-node", { scale: 1, duration: 0.4, stagger: 0.1, ease: "back.out(2.2)" }, "-=0.8")
        .to(".axis-label", { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.6");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <svg
        viewBox="0 0 560 180"
        className="h-auto w-full min-w-[520px]"
        role="img"
        aria-label="Schematic elevation of the offices along the central vista in New Delhi: Rashtrapati Bhavan, South Block, India Gate and the Supreme Court."
      >
        <line
          className="axis-line"
          x1="20"
          y1={BASE}
          x2="540"
          y2={BASE}
          stroke="var(--saffron-deep)"
          strokeWidth="1.5"
          style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
        />

        {MARKS.map((m) => {
          const left = m.x;
          const right = m.x + m.w;
          const top = BASE - m.h;
          const cx = m.x + m.w / 2;
          const d = m.dome
            ? `M ${left} ${BASE} L ${left} ${top + 22} A ${m.w / 2} ${m.w / 2} 0 0 1 ${right} ${top + 22} L ${right} ${BASE}`
            : `M ${left} ${BASE} L ${left} ${top + 30} A ${m.w / 2} ${m.w / 2} 0 0 1 ${right} ${top + 30} L ${right} ${BASE}`;
          return (
            <g key={m.label}>
              <path
                className="axis-draw"
                d={d}
                fill="none"
                stroke="var(--ink)"
                strokeOpacity="0.55"
                strokeWidth="1.4"
              />
              <circle
                className="axis-node"
                cx={cx}
                cy={BASE}
                r="4"
                fill="var(--saffron-deep)"
              />
              <text
                className="axis-label"
                x={cx}
                y={BASE + 24}
                textAnchor="middle"
                fill="var(--ink)"
                fontSize="10.5"
                fontWeight="800"
                letterSpacing="1.4"
              >
                {m.label.toUpperCase()}
              </text>
              <text
                className="axis-label"
                x={cx}
                y={BASE + 39}
                textAnchor="middle"
                fill="var(--ink-soft)"
                fontSize="9.5"
                letterSpacing="0.6"
              >
                {m.sub}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-4 text-[13px] text-ink-soft">
        Schematic elevation — a locator for the offices fellows engage with, not a survey
        drawing. Placements are indicative.
      </p>
    </div>
  );
}
