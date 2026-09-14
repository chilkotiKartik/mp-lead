"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { journeyStages } from "@/lib/data";

function Stage({
  index,
  active,
  onActive,
}: {
  index: number;
  active: boolean;
  onActive: (i: number) => void;
}) {
  const stage = journeyStages[index];
  const isLast = index === journeyStages.length - 1;

  return (
    <motion.section
      onViewportEnter={() => onActive(index)}
      viewport={{ amount: 0.55 }}
      className="min-h-screen flex items-center px-6 md:px-12 md:pl-28"
    >
      <div className="grid md:grid-cols-[110px_1fr_1fr] gap-8 md:gap-10 items-center w-full max-w-6xl mx-auto">
        <div className="hidden md:block display text-2xl text-paper/35">
          {String(index + 1).padStart(2, "0")}
        </div>
        <motion.div
          animate={{ opacity: active ? 1 : 0.25, x: active ? 0 : -16 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block text-xs uppercase tracking-wider font-bold text-saffron border border-saffron/35 rounded-full px-3.5 py-1.5 mb-4">
            {stage.week}
          </span>
          <h2 className="display text-[clamp(30px,3.6vw,52px)] mb-4">
            {stage.title}
          </h2>
          <p className="text-paper/60 text-[15px] leading-relaxed max-w-md">{stage.body}</p>
        </motion.div>
        <motion.div
          animate={{ opacity: active ? 1 : 0.3, scale: active ? 1 : 0.94 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="aspect-4/5 rounded overflow-hidden relative flex items-end p-6"
          style={stage.image ? undefined : { background: stage.tint }}
        >
          {stage.image && (
            <>
              <Image
                src={stage.image}
                alt={stage.title}
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
            </>
          )}
          <span className="relative display text-[15px] text-white">
            {isLast ? "Welcome to the alumni network" : stage.title}
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
}

export function JourneyScroll() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = journeyStages.length;

  return (
    <div className="relative bg-ink text-paper">
      <div className="sticky top-0 z-10 flex justify-between items-center px-6 md:px-12 py-6 bg-linear-to-b from-ink to-transparent">
        <div className="display text-lg">MP LEAD</div>
        <div className="eyebrow text-saffron">
          The Fellowship Journey
        </div>
      </div>

      <div className="fixed left-6 md:left-12 top-30 bottom-20 w-px bg-paper/15 z-10">
        <motion.div
          className="absolute top-0 left-0 w-full bg-saffron"
          animate={{ height: `${((activeIndex + 1) / total) * 100}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
      <div className="fixed left-4 md:left-10 bottom-9 text-xs text-paper/50 z-10">
        Stage {activeIndex + 1} / {total}
      </div>

      {journeyStages.map((_, i) => (
        <Stage key={i} index={i} active={activeIndex === i} onActive={setActiveIndex} />
      ))}
    </div>
  );
}
