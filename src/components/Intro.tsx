"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { photos } from "@/lib/photos";

const EASE = [0.16, 1, 0.3, 1] as const;
const CURTAIN = [0.76, 0, 0.24, 1] as const;

/** Three real frames from the fellowship, staggered like a contact sheet. */
const PLATES = [
  { photo: photos.auditorium, h: "h-28 md:h-36", w: "w-20 md:w-28", delay: 0.05 },
  { photo: photos.groupPortrait, h: "h-40 md:h-52", w: "w-28 md:w-40", delay: 0.16 },
  { photo: photos.founderAddress, h: "h-28 md:h-36", w: "w-20 md:w-28", delay: 0.27 },
] as const;

/**
 * Brand entrance: three arch-cropped programme photographs wipe up from a
 * cream ground, the wordmark rises through a mask, a saffron rule draws the
 * duration of the hold, then the whole plate lifts away with the content
 * trailing it. ~2.4s first visit, ~1s on return within a session.
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
    const t = setTimeout(() => setPhase("done"), isFast ? 1000 : 2400);
    return () => clearTimeout(t);
  }, []);

  const s = fast ? 0.45 : 1; // time scale
  const hold = fast ? 1.0 : 2.4; // seconds the rule takes to fill

  useEffect(() => {
    if (phase !== "playing") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  return (
    <AnimatePresence>
      {phase === "playing" && (
        <motion.div
          className="fixed inset-0 z-100 flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-paper"
          onClick={() => setPhase("done")}
          role="presentation"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: CURTAIN }}
        >
          {/* Content trails the curtain slightly — parallax on exit. */}
          <motion.div
            className="flex flex-col items-center px-6"
            exit={{ y: "-28%", opacity: 0 }}
            transition={{ duration: 0.9, ease: CURTAIN }}
          >
            {/* Contact sheet */}
            <div className="mb-8 flex items-end gap-2.5 md:gap-4">
              {PLATES.map((p) => (
                <motion.figure
                  key={p.photo.src}
                  className={`relative ${p.w} ${p.h} overflow-hidden rounded-t-full rounded-b-sm`}
                  initial={{ clipPath: "inset(100% 0 0 0)", y: 18 }}
                  animate={{ clipPath: "inset(0% 0 0 0)", y: 0 }}
                  transition={{ duration: 1.05 * s, delay: p.delay * s, ease: EASE }}
                >
                  <Image
                    src={p.photo.src}
                    alt=""
                    fill
                    priority
                    sizes="160px"
                    className="object-cover"
                    aria-hidden
                  />
                </motion.figure>
              ))}
            </div>

            {/* Wordmark rises through a mask. */}
            <span className="line-mask">
              <motion.span
                className="display block text-[clamp(52px,11vw,132px)]"
                initial={{ y: "112%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1 * s, delay: 0.34 * s, ease: EASE }}
              >
                MP LEAD
              </motion.span>
            </span>

            <span className="mt-4 line-mask">
              <motion.span
                className="eyebrow block text-center text-ink-soft"
                initial={{ y: "130%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.85 * s, delay: 0.58 * s, ease: EASE }}
              >
                Legislative Exposure · Administrative Development
              </motion.span>
            </span>

            {/* The rule draws for exactly as long as the plate holds. */}
            <div className="mt-9 h-px w-40 overflow-hidden bg-line md:w-56">
              <motion.div
                className="h-full origin-left bg-saffron-deep"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: hold, ease: "linear" }}
              />
            </div>
          </motion.div>

          <motion.span
            className="eyebrow absolute bottom-8 text-ink/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 * s, delay: 0.9 * s }}
          >
            Tap to skip
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
