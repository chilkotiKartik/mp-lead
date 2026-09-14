"use client";

import { motion } from "motion/react";

export function Marquee({
  items,
  className,
  speed = 28,
  dark = false,
}: {
  items: string[];
  className?: string;
  speed?: number;
  dark?: boolean;
}) {
  const loop = [...items, ...items];

  return (
    <div
      className={`relative overflow-hidden border-y ${
        dark ? "bg-ink border-white/10" : "bg-paper-dim border-line"
      } py-5 ${className ?? ""}`}
    >
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className={`display flex items-center gap-10 text-3xl italic md:text-4xl ${
              dark ? "text-paper/80" : "text-ink/70"
            }`}
          >
            {item}
            <span className="text-saffron not-italic">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
