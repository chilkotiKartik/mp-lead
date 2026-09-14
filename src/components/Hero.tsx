"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MagneticLink } from "./Magnetic";
import { Counter } from "./Counter";
import { stats } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

// The page announces one half of the name, then the other.
const PHASES = [
  { a: "Legislative", b: "Exposure." },
  { a: "Administrative", b: "Development." },
] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Only the photograph moves — the type stays planted.
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % PHASES.length), 4400);
    return () => clearInterval(t);
  }, []);

  const current = PHASES[phase];

  return (
    <section ref={ref} className="relative flex min-h-screen flex-col justify-between pt-28">
      {/* Editorial register lines — structure, not decoration. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-6 hidden w-px bg-ink/8 md:left-12 lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-6 hidden w-px bg-ink/8 md:right-12 lg:block"
      />

      <div className="mx-auto grid w-full max-w-[1400px] flex-1 items-center gap-10 px-6 pb-8 md:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* TYPE */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            className="eyebrow mb-7 flex items-center gap-3 text-saffron-deep"
          >
            <span className="h-px w-10 bg-saffron-deep" />
            Batch 05 — Applications Open
          </motion.div>

          <h1 className="display mb-8 text-[clamp(46px,7vw,112px)]">
            <KineticLine text={current.a} phase={phase} delay={0} />
            <KineticLine text={current.b} phase={phase} delay={0.07} italic />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
            className="mb-10 max-w-md text-[17px] leading-relaxed text-ink-soft"
          >
            A two-month journey into governance, public policy and leadership — for
            India&apos;s most driven young minds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95, ease: EASE }}
            className="flex flex-wrap gap-3.5"
          >
            <MagneticLink
              href="/fellowship"
              className="grotesque group inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-[13px] font-bold tracking-wide text-paper uppercase transition-colors hover:bg-saffron-deep"
            >
              Explore Fellowship
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticLink>
            <MagneticLink
              href="/apply"
              className="grotesque rounded-full border border-ink px-8 py-4 text-[13px] font-bold tracking-wide uppercase transition-colors hover:bg-ink hover:text-paper"
            >
              Apply Now
            </MagneticLink>
          </motion.div>
        </div>

        {/* PHOTOGRAPH — one frame, properly composed */}
        <motion.figure
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.45, ease: EASE }}
          className="relative mx-auto w-full max-w-[360px] lg:max-w-[480px]"
        >
          {/* Offset outline — a printed register mark, gives the plate depth. */}
          <span
            aria-hidden
            className="absolute -top-4 -right-4 bottom-8 left-4 rounded-t-full rounded-b-md border border-saffron-deep/30"
          />

          <div className="relative aspect-3/4 overflow-hidden rounded-t-full rounded-b-md">
            <motion.div className="absolute inset-[-6%]" style={{ y: imgY, scale: imgScale }}>
              <Image
                src="/images/hero-india-gate.jpg"
                alt="India Gate, New Delhi, at golden hour"
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 90vw"
                className="object-cover"
              />
            </motion.div>
          </div>

          <figcaption className="mt-3 flex items-baseline gap-3">
            <span className="eyebrow text-saffron-deep">Delhi</span>
            <span className="text-[11.5px] text-ink-soft">
              India Gate — Wikimedia Commons
            </span>
          </figcaption>
        </motion.figure>
      </div>

      {/* STATS STRIP — anchors the composition instead of empty space */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.15 }}
        className="relative border-t border-line"
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-8 px-6 py-8 md:grid-cols-4 md:px-12">
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-3">
              <span className="grotesque text-[clamp(28px,3vw,44px)] leading-none font-extrabold">
                <Counter value={s.value} suffix={s.suffix} />
              </span>
              <span className="eyebrow text-ink-soft">{s.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/** One headline line: rises through a mask, restaged on every phase change. */
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
        className={`block ${italic ? "text-saffron-deep italic" : ""}`}
        initial={{ y: "108%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, delay: 0.4 + delay, ease: EASE }}
      >
        {text}
      </motion.span>
    </span>
  );
}
