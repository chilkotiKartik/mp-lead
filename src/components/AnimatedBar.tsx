"use client";

import { motion } from "motion/react";

export function AnimatedBar({
  targetPercent,
  color,
  children,
}: {
  targetPercent: number;
  color: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex-1 h-5.5 bg-line rounded-md overflow-hidden">
      <motion.div
        className="h-full rounded-md flex items-center justify-end px-2"
        style={{ background: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${targetPercent}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
