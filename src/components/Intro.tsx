"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * MP LEAD brand entrance: an architectural line draws the arch of the mark,
 * the wordmark rises through it, a photograph bleeds in behind, then the
 * whole plate lifts away. ~2s first visit, ~0.9s on return within a session.
 */
export function Intro() {
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [fast, setFast] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFast = sessionStorage.getItem("mplead-intro") === "1";
    if (!reduced) sessionStorage.setItem("mplead-intro", "1");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- gated on client-only APIs; cannot be derived during SSR
    setFast(isFast);
    setPhase(reduced ? "done" : "playing");
    if (reduced) return;
    const t = setTimeout(() => setPhase("done"), isFast ? 900 : 2000);
    return () => clearTimeout(t);
  }, []);

  const s = fast ? 0.45 : 1; // time scale

  return (
    <AnimatePresence>
      {phase === "playing" && (
        <motion.div
          className="fixed inset-0 z-100 flex cursor-pointer items-center justify-center overflow-hidden bg-ink"
          onClick={() => setPhase("done")}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Photograph bleeds in last, behind everything. */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 1.6 * s, delay: 0.75 * s, ease: EASE }}
          >
            <Image
              src="/images/inst-south-block.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover grayscale"
              aria-hidden
            />
          </motion.div>

          <div className="relative flex flex-col items-center">
            {/* Architectural arch — drawn, not faded. */}
            <svg
              width="132"
              height="96"
              viewBox="0 0 132 96"
              fill="none"
              aria-hidden
              className="mb-5"
            >
              <motion.path
                d="M8 94 L8 46 A58 58 0 0 1 124 46 L124 94"
                stroke="var(--saffron)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1 * s, ease: EASE }}
              />
              <motion.path
                d="M34 94 L34 52 A32 32 0 0 1 98 52 L98 94"
                stroke="var(--paper)"
                strokeOpacity="0.35"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1 * s, delay: 0.18 * s, ease: EASE }}
              />
              <motion.line
                x1="0"
                y1="94.5"
                x2="132"
                y2="94.5"
                stroke="var(--paper)"
                strokeOpacity="0.5"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7 * s, delay: 0.5 * s, ease: EASE }}
              />
            </svg>

            {/* Wordmark rises through a mask. */}
            <span className="line-mask">
              <motion.span
                className="display block text-[clamp(46px,9vw,104px)] text-paper"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.95 * s, delay: 0.42 * s, ease: EASE }}
              >
                MP LEAD
              </motion.span>
            </span>

            <span className="mt-4 line-mask">
              <motion.span
                className="eyebrow block text-paper/45"
                initial={{ y: "120%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8 * s, delay: 0.72 * s, ease: EASE }}
              >
                Legislative Exposure · Administrative Development
              </motion.span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
