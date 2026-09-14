"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { fellows } from "@/lib/data";
import { TiltCard } from "@/components/TiltCard";

const chipColors = [
  "var(--saffron)",
  "var(--green)",
  "var(--blue)",
  "var(--amber)",
  "var(--maroon)",
];

export function FellowsGrid() {
  const states = useMemo(
    () => ["All States", ...Array.from(new Set(fellows.map((f) => f.state)))],
    []
  );
  const [active, setActive] = useState("All States");
  const visible = active === "All States" ? fellows : fellows.filter((f) => f.state === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2.5 mb-9">
        {states.map((s, i) => {
          const isActive = active === s;
          const color = i === 0 ? "var(--ink)" : chipColors[(i - 1) % chipColors.length];
          return (
            <button
              key={s}
              onClick={() => setActive(s)}
              style={isActive ? { background: color, borderColor: color } : undefined}
              className={`rounded-full border px-4.5 py-2 text-[13px] font-semibold transition-colors cursor-pointer ${
                isActive ? "text-paper" : "border-line hover:border-ink"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>
      <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-5.5">
        {visible.map((f) => (
          <motion.div key={f.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Link href={`/fellows/${f.id}`} className="group block">
              <TiltCard maxTilt={7} className="aspect-3/4">
                <div
                  className="h-full w-full rounded-[3px] overflow-hidden flex items-end transition-[border-radius,transform] duration-500 group-hover:rounded-br-[46px] group-hover:-translate-y-1"
                  style={{ background: f.tint }}
                >
                  <span className="absolute top-3.5 left-3.5 bg-white/92 text-ink text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {f.focus}
                  </span>
                  <div
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center display text-8xl font-medium text-white/18"
                  >
                    {f.initial}
                  </div>
                  <div className="relative p-4.5 text-white">
                    <h4 className="display text-[17px] mb-0.5">
                      Fellow — {f.batch}
                    </h4>
                    <span className="text-[11.5px] text-white/70">{f.state}</span>
                  </div>
                </div>
              </TiltCard>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
