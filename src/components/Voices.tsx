"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";
import { voices } from "@/lib/voices";

/**
 * GSAP pinned horizontal run of pull-quotes. The section pins, the track
 * travels sideways as the page scrolls, and each card lifts as it arrives.
 * Below lg — and under reduced-motion — it degrades to a native horizontal
 * scroller with snap, which works without any script at all.
 */
export function Voices() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 1024px)");
    if (reduced || !wide.matches || !track.current || !root.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth + 96;

      gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.from(".voice-card", {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="overflow-hidden bg-paper-dim py-24 lg:py-0">
      <div className="lg:flex lg:h-screen lg:flex-col lg:justify-center">
        <div className="mx-auto mb-10 w-full max-w-6xl px-6 md:px-12 lg:mb-12">
          <div className="eyebrow mb-4 text-saffron-deep">In the fellowship&rsquo;s words</div>
          <h2 className="display max-w-3xl text-[clamp(34px,5.6vw,78px)]">
            What the programme <span className="text-saffron-deep italic">actually offers.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-ink-soft">
            Fellow reflections publish here as each fellow submits and consents to them.
            Until then, these are the fellowship&rsquo;s own statements and its verified figures —
            nothing is attributed to anyone who has not said it.
          </p>
        </div>

        <div
          ref={track}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-6 px-6 pb-4 md:scroll-pl-12 md:px-12 lg:w-max lg:overflow-visible lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {voices.map((v, i) => (
            <figure
              key={v.source}
              className="voice-card flex w-[82vw] shrink-0 snap-start flex-col justify-between rounded-2xl bg-paper p-7 shadow-[0_1px_0_rgba(20,16,24,0.06)] sm:w-[460px] md:p-9 lg:h-[54vh] lg:min-h-[400px] lg:w-[520px]"
            >
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <Quote className="size-7 text-saffron-deep" aria-hidden />
                  <span className="grotesque text-[12px] font-extrabold text-ink/20">
                    {String(i + 1).padStart(2, "0")} / {String(voices.length).padStart(2, "0")}
                  </span>
                </div>
                <blockquote className="display text-[clamp(21px,2.5vw,31px)] leading-[1.18]">
                  {v.statement}
                </blockquote>
              </div>

              <div className="mt-9 flex flex-col-reverse items-start gap-5 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                <div className="flex min-w-0 items-center gap-3.5">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-md">
                    <Image src={v.image} alt="" fill sizes="48px" className="object-cover" />
                  </div>
                  <figcaption className="eyebrow text-ink-soft">{v.source}</figcaption>
                </div>
                {v.figure && (
                  <div className="shrink-0 text-left sm:text-right">
                    <div className="grotesque text-[30px] leading-none font-extrabold text-saffron-deep">
                      {v.figure.value}
                    </div>
                    <div className="eyebrow mt-1.5 text-ink-soft">{v.figure.label}</div>
                  </div>
                )}
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
