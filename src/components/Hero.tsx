"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MagneticLink } from "./Magnetic";

const EASE = [0.16, 1, 0.3, 1] as const;

// The headline states through: the page announces one idea, then the other.
const PHASES = [
  { a: "Legislative", b: "Exposure." },
  { a: "Administrative", b: "Development." },
] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const plateScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const stackY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % PHASES.length), 4200);
    return () => clearInterval(t);
  }, []);

  const current = PHASES[phase];

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-ink px-6 pt-36 pb-14 md:px-12"
    >
      {/* Full-bleed plate */}
      <motion.div className="absolute inset-0" style={{ y: plateY, scale: plateScale }}>
        <Image
          src="/images/hero-india-gate.jpg"
          alt="India Gate, New Delhi, at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/70 to-ink/35" />
      <div className="absolute inset-0 bg-linear-to-r from-ink/85 via-transparent to-transparent" />

      {/* Overlapping portrait stack — image as composition, not a rectangle. */}
      <motion.div
        style={{ y: stackY }}
        className="pointer-events-none absolute top-[16%] right-[4%] hidden w-[22vw] max-w-[300px] lg:block"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 3 }}
          animate={{ opacity: 1, y: 0, rotate: 2.5 }}
          transition={{ duration: 1.2, delay: 0.55, ease: EASE }}
          className="relative aspect-3/4 overflow-hidden rounded-t-full shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
        >
          <Image
            src="/images/inst-rashtrapati-bhavan.jpg"
            alt="Rashtrapati Bhavan"
            fill
            sizes="300px"
            className="object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.75, ease: EASE }}
          className="relative -mt-16 ml-[-38%] aspect-square w-[62%] overflow-hidden rounded-md shadow-[0_30px_60px_-18px_rgba(0,0,0,0.7)]"
        >
          <Image
            src="/images/inst-supreme-court.jpg"
            alt="Supreme Court of India"
            fill
            sizes="190px"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      <motion.div className="relative z-10 text-paper" style={{ y: copyY, opacity: copyOpacity }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="eyebrow mb-6 flex items-center gap-3 text-saffron"
        >
          <span className="h-px w-10 bg-saffron" />
          Batch 05 — Applications Open
        </motion.div>

        {/* Two-phase kinetic headline */}
        <h1 className="display mb-8 text-[clamp(52px,11vw,168px)]">
          <KineticLine text={current.a} phase={phase} delay={0} />
          <KineticLine text={current.b} phase={phase} delay={0.06} italic />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
          className="mb-9 max-w-md text-[17px] leading-relaxed text-paper/70"
        >
          A two-month journey into governance, public policy and leadership — for
          India&apos;s most driven young minds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease: EASE }}
          className="flex flex-wrap gap-3.5"
        >
          <MagneticLink
            href="/fellowship"
            className="grotesque group inline-flex items-center gap-2 rounded-full bg-paper px-8 py-4 text-[13px] font-bold tracking-wide text-ink uppercase transition-colors hover:bg-saffron"
          >
            Explore Fellowship
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticLink>
          <MagneticLink
            href="/apply"
            className="grotesque rounded-full border border-paper/35 px-8 py-4 text-[13px] font-bold tracking-wide text-paper uppercase transition-colors hover:border-paper hover:bg-paper hover:text-ink"
          >
            Apply Now
          </MagneticLink>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="absolute right-6 bottom-14 z-10 hidden items-center gap-3 md:right-12 md:flex"
      >
        <span className="eyebrow text-paper/40">Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-paper/20">
          <motion.span
            className="absolute inset-x-0 h-1/2 bg-saffron"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>

      <div className="absolute bottom-4 left-6 z-10 text-[10px] text-paper/25 md:left-12">
        India Gate, New Delhi — Wikimedia Commons
      </div>
    </section>
  );
}

/** One headline line: letters rise through a mask, restaged on every phase change. */
function KineticLine({
  text,
  phase,
  delay,
  italic,
}: {
  text: string;
  phase: number;
  delay: number;
  italic?: boolean;
}) {
  return (
    <span className="line-mask">
      <motion.span
        key={`${phase}-${text}`}
        className={`block ${italic ? "italic text-saffron" : ""}`}
        initial={{ y: "108%" }}
        animate={{ y: "0%" }}
        exit={{ y: "-108%" }}
        transition={{ duration: 1, delay: 0.45 + delay, ease: EASE }}
      >
        {text}
      </motion.span>
    </span>
  );
}
