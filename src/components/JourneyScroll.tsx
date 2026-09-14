"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { journeyStages } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Sticky-plate scroll story: the photograph holds its column and cross-fades
 * as each stage enters, while the text scrolls past it. No dead space between
 * stages, and the image is always doing work.
 */
export function JourneyScroll() {
  const [active, setActive] = useState(0);
  const total = journeyStages.length;
  const stage = journeyStages[active];

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <div className="relative">
      {/* Progress rail */}
      <div className="fixed top-32 bottom-24 left-5 z-20 hidden w-px bg-line md:left-8 lg:block">
        <motion.div
          className="absolute inset-x-0 top-0 h-full origin-top bg-saffron-deep"
          style={{ scaleY: progress }}
        />
      </div>
      <div className="grotesque fixed bottom-9 left-3 z-20 hidden text-[11px] font-bold tracking-wide text-ink-soft uppercase md:left-6 lg:block">
        {String(active + 1).padStart(2, "0")} / {total}
      </div>

      {/* Opening plate */}
      <section className="px-6 pt-36 pb-16 md:px-12 lg:pl-24">
        <div className="mx-auto max-w-6xl">
          <div className="eyebrow mb-5 flex items-center gap-3 text-saffron-deep">
            <span className="h-px w-10 bg-saffron-deep" />
            The Fellowship Journey
          </div>
          <h1 className="display mb-8 max-w-4xl text-[clamp(46px,8vw,124px)]">
            Nine stages.
            <br />
            <span className="text-saffron-deep italic">One transformation.</span>
          </h1>
          <p className="max-w-lg text-[16.5px] leading-relaxed text-ink-soft">
            Two months, from the first introduction to graduation — scrolled end to end.
          </p>
        </div>
      </section>

      {/* The story */}
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-24 md:px-12 lg:grid-cols-2 lg:gap-16 lg:pl-24">
        {/* Text column */}
        <div>
          {journeyStages.map((s, i) => (
            <motion.section
              key={s.title}
              onViewportEnter={() => setActive(i)}
              viewport={{ amount: 0.6 }}
              className="flex min-h-[54vh] flex-col justify-center border-b border-line py-10 last:border-0"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="grotesque text-[13px] font-extrabold text-ink/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="eyebrow rounded-full border border-saffron-deep/40 px-3 py-1 text-saffron-deep">
                  {s.week}
                </span>
              </div>

              <h2 className="display mb-4 text-[clamp(34px,5vw,68px)]">{s.title}</h2>
              <p className="max-w-md text-[15.5px] leading-relaxed text-ink-soft">{s.body}</p>

              {/* Mobile gets the photograph inline — no sticky column below lg. */}
              <figure className="relative mt-7 lg:hidden">
                <div className="relative aspect-4/3 overflow-hidden rounded-md">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="eyebrow mt-2.5 text-ink-soft">{s.caption}</figcaption>
              </figure>

              {i === total - 1 && (
                <Link
                  href="/apply"
                  className="grotesque mt-8 inline-flex w-fit rounded-full bg-ink px-7 py-3.5 text-[13px] font-bold tracking-wide text-paper uppercase transition-colors hover:bg-saffron-deep"
                >
                  Apply to Batch 05
                </Link>
              )}
            </motion.section>
          ))}
        </div>

        {/* Sticky plate — desktop only */}
        <div className="hidden lg:block">
          <div className="sticky top-24 h-[74vh]">
            <span
              aria-hidden
              className="absolute -top-3 -right-3 bottom-3 left-3 rounded-t-[110px] rounded-b-md border border-saffron-deep/25"
            />
            <div className="relative h-full overflow-hidden rounded-t-[110px] rounded-b-md">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={stage.image}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  <Image
                    src={stage.image}
                    alt={stage.alt}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Caption plate rides the bottom of the image */}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/85 to-transparent px-6 pt-16 pb-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stage.caption}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <div className="eyebrow mb-1 text-saffron">{stage.week}</div>
                    <div className="display text-[22px] text-paper">{stage.caption}</div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
