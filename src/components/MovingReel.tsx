"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Photo } from "@/lib/photos";

/**
 * GSAP infinite photo reel. The track loops seamlessly on its own, scroll
 * velocity pushes it faster and skews the frames, and hovering eases it down
 * so a photograph can actually be read. Pauses off-screen and under
 * reduced-motion the track simply sits still and scrolls natively.
 */
export function MovingReel({
  items,
  speed = 42,
  direction = 1,
}: {
  items: Photo[];
  /** Seconds for one full pass of the track. */
  speed?: number;
  direction?: 1 | -1;
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !track.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const loop = gsap.to(track.current, {
        xPercent: -50 * direction,
        ease: "none",
        duration: speed,
        repeat: -1,
      });

      // Scroll velocity feeds both the reel's speed and a slight shear.
      const skew = gsap.quickTo(".reel-frame", "skewX", { duration: 0.5, ease: "power3" });
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          loop.timeScale(gsap.utils.clamp(0.4, 5, 1 + Math.abs(v) / 1600));
          skew(gsap.utils.clamp(-7, 7, -v / 380));
        },
        onLeave: () => loop.pause(),
        onLeaveBack: () => loop.pause(),
        onEnter: () => loop.play(),
        onEnterBack: () => loop.play(),
      });

      const el = root.current;
      const slow = () => gsap.to(loop, { timeScale: 0.15, duration: 0.6, overwrite: true });
      const resume = () => gsap.to(loop, { timeScale: 1, duration: 0.8, overwrite: true });
      el?.addEventListener("pointerenter", slow);
      el?.addEventListener("pointerleave", resume);

      return () => {
        st.kill();
        el?.removeEventListener("pointerenter", slow);
        el?.removeEventListener("pointerleave", resume);
      };
    }, root);

    return () => ctx.revert();
  }, [speed, direction]);

  // Doubled so the loop wraps seamlessly at -50%.
  const run = [...items, ...items];

  return (
    <div
      ref={root}
      className="relative overflow-hidden py-2"
      aria-label="Programme photography reel"
    >
      <div ref={track} className="flex w-max gap-5 will-change-transform">
        {run.map((p, i) => (
          <figure
            key={`${p.src}-${i}`}
            className="reel-frame group w-64 shrink-0 md:w-80"
            aria-hidden={i >= items.length}
          >
            <div className="relative aspect-3/4 overflow-hidden rounded-t-[110px] rounded-b-md">
              <Image
                src={p.src}
                alt={i < items.length ? p.alt : ""}
                fill
                sizes="(min-width: 768px) 320px, 256px"
                className="object-cover grayscale-[30%] transition-[filter,transform] duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
            <figcaption className="eyebrow mt-3.5 text-ink-soft">{p.caption}</figcaption>
          </figure>
        ))}
      </div>

      {/* Cream fades so the reel reads as endless rather than cut off. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-paper-dim to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-paper-dim to-transparent md:w-28" />
    </div>
  );
}
