import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { LiveBadge } from "@/components/LiveBadge";
import { events } from "@/lib/content";

export const metadata: Metadata = { title: "Events — MP LEAD" };

export default function EventsPage() {
  const [feature, ...rest] = events;

  return (
    <>
      <Nav />
      <main className="w-full pt-32 pb-28">
        <div className="mx-auto mb-14 max-w-6xl px-6 md:px-12">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="eyebrow text-saffron-deep">Programme Calendar</span>
            <LiveBadge label="Batch 05 Cycle" />
          </div>
          <h1 className="display max-w-3xl text-[clamp(40px,7vw,104px)]">
            Where the cohort <span className="italic">gathers.</span>
          </h1>
        </div>

        {/* Featured event — full-bleed with oversized date typography */}
        <Reveal>
          <section className="group relative mb-20 flex min-h-[62vh] items-end overflow-hidden px-6 py-14 md:px-12">
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              priority
              sizes="100vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/60 to-transparent" />
            <div className="relative w-full max-w-6xl md:mx-auto">
              <div className="flex flex-wrap items-end justify-between gap-8">
                <div>
                  <span className="eyebrow mb-4 block text-saffron">
                    {feature.kind} · {feature.stage}
                  </span>
                  <h2 className="display mb-3 max-w-2xl text-[clamp(32px,5.5vw,78px)] text-paper">
                    {feature.title}
                  </h2>
                  <p className="max-w-lg text-[15px] leading-relaxed text-paper/60">
                    {feature.summary}
                  </p>
                </div>
                <div className="text-paper">
                  <div className="grotesque text-[clamp(26px,3vw,42px)] leading-none font-extrabold">
                    {feature.date}
                  </div>
                  <div className="eyebrow mt-2 text-paper/50">{feature.venue}</div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* The rest — editorial rows, date-led */}
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          {rest.map((e) => (
            <Reveal key={e.id}>
              <article className="group grid items-center gap-6 border-t border-line py-8 md:grid-cols-[150px_1fr_220px] md:gap-10">
                <div>
                  <div className="grotesque text-[22px] leading-none font-extrabold">
                    {e.date}
                  </div>
                  <div className="eyebrow mt-2 text-ink-soft">{e.stage}</div>
                </div>

                <div>
                  <span className="eyebrow mb-2 block text-saffron-deep">{e.kind}</span>
                  <h3 className="display mb-2 text-[clamp(24px,2.8vw,38px)] transition-colors duration-300 group-hover:text-saffron-deep">
                    {e.title}
                  </h3>
                  <p className="max-w-xl text-[14.5px] leading-relaxed text-ink-soft">
                    {e.summary}
                  </p>
                  <div className="eyebrow mt-3 text-ink-soft">{e.venue}</div>
                </div>

                <div className="relative aspect-4/3 overflow-hidden rounded-md">
                  <Image
                    src={e.image}
                    alt={e.title}
                    fill
                    sizes="220px"
                    className="object-cover grayscale transition-[transform,filter] duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-6xl px-6 text-[12px] text-ink-soft/70 md:px-12">
          Dates and venues are confirmed per batch and published here once finalised.
        </p>
      </main>
      <Footer />
    </>
  );
}
