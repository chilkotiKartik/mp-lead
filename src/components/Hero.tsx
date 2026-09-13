"use client";

import Link from "next/link";
import { motion } from "motion/react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } },
};

const line = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } },
};

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden px-6 md:px-12 pt-40 pb-16 bg-linear-to-b from-paper from-55% to-paper-dim">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-[8%] right-[6%] w-[34%] h-[52%] rounded-[2px]"
          style={{ background: "linear-gradient(155deg, var(--maroon), oklch(0.3 0.09 20))" }}
        />
        <div className="absolute top-[2%] right-[2%] w-[11%] h-[16%] rounded-[2px] bg-saffron" />
        <div className="absolute top-[40%] right-[32%] w-[9%] h-[9%] rounded-full bg-paper border-2 border-ink" />
        <div
          className="absolute bottom-[6%] right-[14%] w-[16%] h-[22%] rounded-[2px]"
          style={{ background: "var(--green)" }}
        />
      </div>

      <motion.div className="relative z-10" variants={container} initial="hidden" animate="show">
        <motion.div variants={fade} className="text-xs tracking-[0.22em] uppercase font-bold text-saffron-deep mb-5">
          MP LEAD — Batch 05 Applications Open
        </motion.div>
        <h1 className="font-serif font-medium text-[clamp(44px,7.4vw,108px)] leading-[0.98] tracking-tight max-w-4xl mb-7">
          <span className="block overflow-hidden">
            <motion.span variants={line} className="block">
              Legislative exposure.
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={line} className="block">
              Administrative development.
            </motion.span>
          </span>
        </h1>
        <motion.p variants={fade} className="text-lg max-w-md text-ink-soft mb-10">
          A two-month immersive fellowship into governance, public policy and institutional
          leadership — for India&apos;s most driven young minds.
        </motion.p>
        <motion.div variants={fade} className="flex gap-4">
          <Link
            href="/apply"
            className="rounded-full bg-ink text-paper px-7 py-4 text-sm font-bold transition-colors hover:bg-saffron-deep"
          >
            Apply Now
          </Link>
          <Link
            href="/fellowship"
            className="rounded-full border border-ink px-7 py-4 text-sm font-bold transition-colors hover:bg-ink hover:text-paper"
          >
            Explore MP LEAD
          </Link>
        </motion.div>
      </motion.div>

      <div className="absolute left-6 md:left-12 bottom-7 flex items-center gap-2.5 text-xs uppercase tracking-[0.18em] text-ink-soft">
        <span>Scroll</span>
        <span className="relative w-px h-8.5 bg-ink-soft overflow-hidden">
          <motion.span
            className="absolute inset-0 bg-ink"
            animate={{ top: ["-100%", "0%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>
    </section>
  );
}
