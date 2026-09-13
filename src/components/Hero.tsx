"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MagneticLink } from "./Magnetic";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
};

const line = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const } },
};

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-end overflow-hidden px-6 md:px-12 pt-40 pb-16">
      <motion.div className="absolute inset-0 z-0" style={{ y: imgY, scale: imgScale }}>
        <Image
          src="/images/hero-india-gate.jpg"
          alt="India Gate, New Delhi, at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 z-0 bg-linear-to-t from-ink via-ink/55 to-ink/20"
        style={{ opacity: overlayOpacity }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.1 }}
        className="absolute inset-0 z-0 bg-linear-to-b from-ink/50 via-transparent to-transparent"
      />

      <motion.div
        className="relative z-10 text-paper"
        variants={container}
        initial="hidden"
        animate="show"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div variants={fade} className="text-xs tracking-[0.22em] uppercase font-bold text-saffron mb-5">
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
        <motion.p variants={fade} className="text-lg max-w-md text-paper/75 mb-10">
          A two-month immersive fellowship into governance, public policy and institutional
          leadership — for India&apos;s most driven young minds.
        </motion.p>
        <motion.div variants={fade} className="flex gap-4">
          <MagneticLink
            href="/apply"
            className="rounded-full bg-paper text-ink px-7 py-4 text-sm font-bold transition-colors hover:bg-saffron"
          >
            Apply Now
          </MagneticLink>
          <MagneticLink
            href="/fellowship"
            className="rounded-full border border-paper/50 px-7 py-4 text-sm font-bold text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            Explore MP LEAD
          </MagneticLink>
        </motion.div>
      </motion.div>

      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        className="absolute left-6 md:left-12 bottom-7 z-10 flex items-center gap-2.5 text-xs uppercase tracking-[0.18em] text-paper/70"
      >
        <span>Scroll</span>
        <span className="relative w-px h-8.5 bg-paper/40 overflow-hidden">
          <motion.span
            className="absolute inset-0 bg-paper"
            animate={{ top: ["-100%", "0%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>

      <div className="absolute right-6 md:right-12 bottom-7 z-10 text-[10px] text-paper/40 hidden md:block">
        India Gate, New Delhi — Wikimedia Commons
      </div>
    </section>
  );
}
