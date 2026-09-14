"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journeyStages } from "@/lib/data";

const R = 150;
const CX = 170;
const CY = 170;

/** Point on the arc at t ∈ [0,1], sweeping 180° from left to right. */
function pt(t: number, r = R) {
  const a = Math.PI - t * Math.PI;
  return { x: CX + Math.cos(a) * r, y: CY - Math.sin(a) * r };
}

const SEGMENTS = [
  { label: "Legislative Exposure", color: "var(--saffron-deep)", from: 0, to: 0.28 },
  { label: "Administrative Development", color: "var(--green)", from: 0.3, to: 0.56 },
  { label: "Field Research", color: "var(--blue)", from: 0.58, to: 0.84 },
  { label: "Mentorship", color: "var(--maroon)", from: 0.86, to: 1 },
];

function arcPath(from: number, to: number, r = R) {
  const a = pt(from, r);
  const b = pt(to, r);
  return `M ${a.x} ${a.y} A ${r} ${r} 0 0 1 ${b.x} ${b.y}`;
}

/**
 * The programme as a single drawn arc: four tracks running across the two
 * months, with a tick for each of the nine stages. Strokes draw themselves on
 * scroll; under reduced-motion the finished diagram is simply present.
 */
export function ProgrammeArc() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".arc-seg", { strokeDasharray: 600, strokeDashoffset: 600 });
      gsap.set(".arc-tick", { opacity: 0, scale: 0, transformOrigin: "center" });
      gsap.set(".arc-label", { opacity: 0, y: 8 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
      tl.to(".arc-seg", {
        strokeDashoffset: 0,
        duration: 1.4,
        stagger: 0.14,
        ease: "power2.inOut",
      })
        .to(".arc-tick", { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: "back.out(2)" }, "-=0.9")
        .to(".arc-label", { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.7");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="w-full">
      <svg
        viewBox="0 0 340 230"
        className="h-auto w-full"
        role="img"
        aria-label="The fellowship runs four tracks — legislative exposure, administrative development, field research and mentorship — across nine stages over two months."
      >
        {/* Ground line */}
        <line x1="10" y1={CY + 0.5} x2="330" y2={CY + 0.5} stroke="var(--line)" strokeWidth="1" />

        {/* Track segments */}
        {SEGMENTS.map((s) => (
          <path
            key={s.label}
            className="arc-seg"
            d={arcPath(s.from, s.to)}
            stroke={s.color}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        ))}

        {/* Inner reference arc */}
        <path d={arcPath(0, 1, R - 30)} stroke="var(--line)" strokeWidth="1" fill="none" />

        {/* Nine stage ticks along the inner arc */}
        {journeyStages.map((s, i) => {
          const t = journeyStages.length === 1 ? 0.5 : i / (journeyStages.length - 1);
          const p = pt(t, R - 30);
          return (
            <circle
              key={s.title}
              className="arc-tick"
              cx={p.x}
              cy={p.y}
              r="4"
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="1.4"
            />
          );
        })}

        {/* Endpoints */}
        <text
          className="arc-label"
          x="10"
          y={CY + 20}
          fill="var(--ink-soft)"
          fontSize="10"
          fontWeight="700"
          letterSpacing="1.8"
        >
          WEEK 1
        </text>
        <text
          className="arc-label"
          x="330"
          y={CY + 20}
          textAnchor="end"
          fill="var(--ink-soft)"
          fontSize="10"
          fontWeight="700"
          letterSpacing="1.8"
        >
          WEEK 8
        </text>
        <text
          className="arc-label"
          x={CX}
          y={CY - 8}
          textAnchor="middle"
          fill="var(--ink)"
          fontSize="13"
          fontWeight="800"
          letterSpacing="2.4"
        >
          9 STAGES
        </text>
      </svg>

      {/* Legend */}
      <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
        {SEGMENTS.map((s) => (
          <li key={s.label} className="flex items-center gap-2.5">
            <span
              className="h-1.5 w-7 shrink-0 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            <span className="eyebrow text-ink-soft">{s.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
