"use client";

import { motion } from "motion/react";

export function RingBlob({
  className,
  color = "var(--saffron)",
  size = 420,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <motion.svg
      aria-hidden
      className={`pointer-events-none absolute ${className ?? ""}`}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
      whileInView={{ opacity: 0.5, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.circle
        cx="100"
        cy="100"
        r="86"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="4 3"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        style={{ transformOrigin: "100px 100px" }}
      />
      <motion.circle
        cx="100"
        cy="100"
        r="60"
        fill="none"
        stroke={color}
        strokeWidth="1"
        opacity={0.6}
        animate={{ rotate: -360 }}
        transition={{ duration: 45, ease: "linear", repeat: Infinity }}
        style={{ transformOrigin: "100px 100px" }}
      />
    </motion.svg>
  );
}
