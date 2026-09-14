"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import type { Photo } from "@/lib/photos";

const EASE = [0.16, 1, 0.3, 1] as const;
const INTERVAL = 5000;

/**
 * Cinematic auto-advancing gallery. The frame changes roughly every five
 * seconds with a directional mask wipe plus a slow drift on the live plate —
 * deliberately a different treatment from the arch-crop hover used elsewhere.
 * Advancing pauses while a pointer is over it, while it is off-screen, while
 * the tab is hidden, and entirely under reduced-motion.
 */
export function PhotoCarousel({
  items,
  className = "",
  aspect = "aspect-16/10",
}: {
  items: Photo[];
  className?: string;
  aspect?: string;
}) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const [manual, setManual] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduced = useReducedMotion();

  const total = items.length;
  const go = useCallback(
    (next: number, d: 1 | -1) => {
      setDir(d);
      setIndex(((next % total) + total) % total);
    },
    [total]
  );

  const running = !paused && !manual && inView && !reduced && total > 1;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % total);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [running, total, index]);

  // Browser-level pause: a hidden tab should not burn through the reel.
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1, 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1, -1);
    }
  };

  if (total === 0) {
    return (
      <div
        className={`${aspect} flex w-full items-center justify-center rounded-md border border-dashed border-line bg-paper-dim ${className}`}
      >
        <span className="eyebrow text-ink-soft">Photographs publish here shortly</span>
      </div>
    );
  }

  const active = items[index];

  return (
    <div
      ref={ref}
      className={className}
      role="group"
      aria-roledescription="carousel"
      aria-label="Programme photography"
      tabIndex={0}
      onKeyDown={onKey}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={`relative ${aspect} w-full overflow-hidden rounded-md bg-paper-dim`}>
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={active.src}
            className="absolute inset-0"
            custom={dir}
            initial={{ clipPath: dir === 1 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0%)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.95, ease: EASE }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: reduced ? 0 : 6.5, ease: "linear" }}
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="(min-width: 768px) 70vw, 100vw"
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Caption plate */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/85 to-transparent px-5 pt-20 pb-5 md:px-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.caption}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <div className="eyebrow mb-1 text-saffron">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </div>
              <div className="display text-[clamp(19px,2.4vw,28px)] text-paper">
                {active.caption}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Advance timer */}
        <div className="absolute inset-x-0 top-0 h-0.5 bg-paper/20">
          <motion.div
            key={`${index}-${running}`}
            className="h-full origin-left bg-saffron"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: running ? 1 : 0 }}
            transition={{ duration: running ? INTERVAL / 1000 : 0.25, ease: "linear" }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => go(index - 1, -1)}
          aria-label="Previous photograph"
          className="grid size-10 place-items-center rounded-full border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
        >
          <ArrowLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1, 1)}
          aria-label="Next photograph"
          className="grid size-10 place-items-center rounded-full border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
        >
          <ArrowRight className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => setManual((m) => !m)}
          aria-pressed={manual}
          aria-label={manual ? "Resume automatic advance" : "Pause automatic advance"}
          className="grid size-10 place-items-center rounded-full border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
        >
          {manual ? <Play className="size-4" /> : <Pause className="size-4" />}
        </button>

        <div className="ml-1 flex flex-1 items-center gap-1.5">
          {items.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => go(i, i > index ? 1 : -1)}
              aria-label={`Go to photograph ${i + 1}`}
              aria-current={i === index}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i === index ? "bg-saffron-deep" : "bg-ink/15 hover:bg-ink/35"
              }`}
            />
          ))}
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        {active.caption}
      </span>
    </div>
  );
}
