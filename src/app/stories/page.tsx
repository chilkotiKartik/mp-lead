import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { stories } from "@/lib/content";
import { gallery } from "@/lib/photos";

export const metadata: Metadata = { title: "Stories — MP LEAD" };

export default function StoriesPage() {
  const [lead, ...rest] = stories;

  return (
    <>
      <Nav />
      <main className="w-full pt-32 pb-28">
        {/* Masthead — this page reads as a publication */}
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-6">
            <h1 className="display text-[clamp(44px,9vw,140px)] leading-[0.8]">
              Dispatches
            </h1>
            <span className="eyebrow pb-3 text-ink-soft">
              Writing from the MP LEAD cohort
            </span>
          </div>
        </div>

        {/* Lead story — oversized, image left, type right */}
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <Reveal>
            <article className="group grid gap-10 border-b border-line py-16 md:grid-cols-[1.15fr_1fr] md:gap-16">
              <div className="relative aspect-4/5 overflow-hidden rounded-md md:aspect-4/3">
                <Image
                  src={lead.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="eyebrow mb-4 flex items-center gap-3 text-saffron-deep">
                  {lead.category}
                  <span className="h-px w-8 bg-line" />
                  <span className="text-ink-soft">{lead.readingTime}</span>
                </div>
                <h2 className="display mb-5 text-[clamp(32px,4.6vw,66px)]">{lead.title}</h2>
                <p className="max-w-md text-[16px] leading-relaxed text-ink-soft">
                  {lead.excerpt}
                </p>
              </div>
            </article>
          </Reveal>
        </div>

        <Marquee
          items={["Dispatch", "Field Notes", "Reflection", "Programme"]}
          speed={20}
          className="my-16"
        />

        {/* Secondary stories — staggered editorial grid */}
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="grid gap-x-10 gap-y-16 md:grid-cols-3">
            {rest.map((s, i) => (
              <Reveal key={s.id} className={i === 1 ? "md:pt-16" : ""}>
                <article className="group">
                  <div className="relative mb-5 aspect-4/3 overflow-hidden rounded-t-[34px] rounded-b-md">
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover grayscale transition-[transform,filter] duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>
                  <div className="eyebrow mb-2.5 flex items-center gap-2.5 text-saffron-deep">
                    {s.category}
                    <span className="h-px w-5 bg-line" />
                    <span className="text-ink-soft">{s.readingTime}</span>
                  </div>
                  <h3 className="display mb-2.5 text-[26px] transition-colors duration-300 group-hover:text-saffron-deep">
                    {s.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-ink-soft">{s.excerpt}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* FROM THE PROGRAMME — fills the page with real photography */}
        <section className="mt-28 border-t border-line pt-16">
          <div className="mx-auto mb-10 max-w-6xl px-6 md:px-12">
            <div className="eyebrow mb-3 text-saffron-deep">From the programme</div>
            <h2 className="display max-w-2xl text-[clamp(30px,4.5vw,60px)]">
              The fellowship, <span className="italic">as it happened.</span>
            </h2>
          </div>

          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <Reveal>
              <PhotoCarousel items={gallery} aspect="aspect-4/3 md:aspect-16/9" />
            </Reveal>
          </div>

          <div className="mx-auto mt-14 max-w-6xl px-6 md:px-12">
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-paper-dim px-8 py-10">
              <div>
                <h3 className="display mb-2 text-[clamp(24px,3vw,38px)]">
                  Write the next dispatch.
                </h3>
                <p className="max-w-md text-[14.5px] text-ink-soft">
                  Batch 05 applications are open. Fellows publish their field notes here.
                </p>
              </div>
              <Link
                href="/apply"
                className="grotesque shrink-0 rounded-full bg-ink px-8 py-4 text-[13px] font-bold tracking-wide text-paper uppercase transition-colors hover:bg-saffron-deep"
              >
                Apply to Batch 05
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
