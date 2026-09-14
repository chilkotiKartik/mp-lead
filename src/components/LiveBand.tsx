"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { events } from "@/lib/content";

/**
 * Broadcast-style live band. The only thing asserted as live is the one fact
 * that genuinely is — Batch 05 applications are open. Everything else is the
 * published programme sequence, labelled as such. The clock is real IST.
 */
export function LiveBand() {
  const [time, setTime] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.to(".live-dot", {
        scale: 1.9,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: "power2.out",
      });
      gsap.to(".live-ticker-track", {
        xPercent: -50,
        duration: 26,
        ease: "none",
        repeat: -1,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const queue = events.map((e) => `${e.stage} — ${e.title}`);
  const run = [...queue, ...queue];

  return (
    <section ref={root} className="border-y border-ink/10 bg-saffron/12">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:gap-8 md:px-12">
        {/* Live marker */}
        <div className="flex shrink-0 items-center gap-3">
          <span className="relative grid size-3 place-items-center">
            <span className="live-dot absolute inset-0 rounded-full bg-saffron-deep" />
            <span className="relative size-2 rounded-full bg-saffron-deep" />
          </span>
          <span className="eyebrow text-saffron-deep">Live now</span>
          <span className="grotesque tabular-nums text-[12px] font-bold text-ink-soft">
            {time ?? "--:--:--"} IST
          </span>
        </div>

        <div className="hidden h-8 w-px shrink-0 bg-ink/10 md:block" />

        {/* The one genuinely live fact */}
        <div className="min-w-0 flex-1">
          <p className="display text-[clamp(19px,2.4vw,28px)] leading-tight">
            Batch 05 applications are open.
          </p>
          <div className="mt-1.5 overflow-hidden">
            <div className="live-ticker-track flex w-max gap-8">
              {run.map((q, i) => (
                <span
                  key={`${q}-${i}`}
                  className="eyebrow shrink-0 text-ink-soft"
                  aria-hidden={i >= queue.length}
                >
                  {q}
                  <span className="ml-8 text-saffron-deep">◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <Link
          href="/apply"
          className="grotesque group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-ink px-7 py-3.5 text-[12.5px] font-bold tracking-wide text-paper uppercase transition-colors hover:bg-saffron-deep md:self-auto"
        >
          Apply now
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}
