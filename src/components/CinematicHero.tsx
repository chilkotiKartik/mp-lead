"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Full-bleed photographic opening plate with GSAP-scrubbed depth: the
 * photograph drifts and scales slower than the page, the headline rises
 * faster, and a hairline grid draws itself over the frame on load. Under
 * reduced-motion everything renders in its final position.
 */
export function CinematicHero({
  image,
  alt,
  eyebrow,
  children,
  caption,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  children: ReactNode;
  caption?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ch-image",
        { scale: 1.14, yPercent: -3 },
        {
          scale: 1,
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
      gsap.to(".ch-copy", {
        yPercent: -34,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(".ch-rule", { scaleX: 0, transformOrigin: "left", duration: 0.9, stagger: 0.08, ease: "power3.out" })
        .from(".ch-line", { yPercent: 112, duration: 1, stagger: 0.1, ease: "power4.out" }, "-=0.7")
        .from(".ch-eyebrow", { opacity: 0, y: 12, duration: 0.6 }, "-=0.8");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[82vh] items-end overflow-hidden px-6 pt-40 pb-16 md:px-12"
    >
      <div className="ch-image absolute inset-0">
        <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/60 to-ink/20" />

      {/* Hairline survey grid — draws on load, reads as architectural drafting. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {[0.25, 0.5, 0.75].map((t) => (
          <span
            key={t}
            className="ch-rule absolute inset-x-0 h-px bg-paper/12"
            style={{ top: `${t * 100}%` }}
          />
        ))}
      </div>

      <div className="ch-copy relative max-w-4xl">
        <div className="ch-eyebrow eyebrow mb-5 flex items-center gap-3 text-saffron">
          <span className="h-px w-10 bg-saffron" />
          {eyebrow}
        </div>
        {children}
        {caption && (
          <p className="eyebrow mt-7 text-paper/45">{caption}</p>
        )}
      </div>
    </section>
  );
}

/** One masked headline line — wrap each line so it can rise independently. */
export function HeroLine({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className="line-mask">
      <span className={`ch-line block ${className}`}>{children}</span>
    </span>
  );
}
