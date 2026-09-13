"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const letters = "MP LEAD".split("");

export function Intro() {
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("mplead-intro-seen");
    const shouldPlay = !reduced && !seen;
    if (shouldPlay) sessionStorage.setItem("mplead-intro-seen", "1");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only intro gate; no way to derive this during SSR
    setShow(shouldPlay);
    setReady(true);
    if (!shouldPlay) return;
    const t = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-ink cursor-pointer"
          onClick={() => setShow(false)}
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex overflow-hidden">
            {letters.map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-paper text-5xl md:text-7xl font-medium"
                style={{ whiteSpace: "pre" }}
              >
                {ch}
              </motion.span>
            ))}
          </div>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 h-px w-24 bg-saffron origin-left"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-5 text-[11px] uppercase tracking-[0.25em] text-paper/50"
          >
            Legislative Exposure & Administrative Development
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
