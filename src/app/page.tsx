import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { Marquee } from "@/components/Marquee";
import { TiltCard } from "@/components/TiltCard";
import { RingBlob } from "@/components/RingBlob";
import { CategoryRail } from "@/components/CategoryRail";
import { stats, institutions, journeyStages, projects, categories } from "@/lib/data";
import { gallery } from "@/lib/photos";

export default function Home() {
  return (
    <>
      <Intro />
      <Nav />
      <main>
        <Hero />

        <Marquee
          items={[
            "Batch 05 Applications Open",
            "Legislative Exposure",
            "Administrative Development",
            "62% Women Fellows",
            "18 States Represented",
          ]}
        />

        {/* SIGNATURE CATEGORY RAIL */}
        <CategoryRail categories={[...categories]} />

        {/* INSTITUTIONS — access → observation → learning → perspective */}
        <section className="relative overflow-hidden bg-paper-dim px-6 py-32 md:px-12">
          <RingBlob className="-top-24 -right-24" color="var(--saffron)" size={460} />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="mb-16 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
              <div>
                <div className="eyebrow mb-4 text-saffron-deep">Institutional Exposure</div>
                <h2 className="display text-[clamp(36px,6vw,82px)]">
                  Access. <span className="italic text-saffron-deep">Observation.</span>
                  <br />
                  Learning. Perspective.
                </h2>
              </div>
              <p className="text-[15px] leading-relaxed text-ink-soft">
                Fellows engage directly with constitutional offices and ministries —
                observing process, not performing politics.
              </p>
            </Reveal>

            <RevealStagger className="grid gap-5 md:grid-cols-3">
              {institutions.map((inst, i) => (
                <RevealItem key={inst.name} className={i === 1 ? "md:-mt-12" : ""}>
                  <TiltCard maxTilt={8} className="group aspect-3/4 overflow-hidden rounded-t-[120px] rounded-b-md">
                    <Image
                      src={inst.image}
                      alt={inst.name}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover grayscale-[55%] transition-[transform,filter] duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-ink/90" />
                      <h3 className="display relative mb-1.5 text-[26px] text-paper">
                        {inst.name}
                      </h3>
                      <span className="eyebrow relative text-paper/60">{inst.tag}</span>
                    </div>
                  </TiltCard>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* JOURNEY PREVIEW */}
        <section className="px-6 py-32 md:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-16">
              <div className="eyebrow mb-4 text-saffron-deep">The Fellowship Journey</div>
              <h2 className="display max-w-2xl text-[clamp(36px,6vw,82px)]">
                Nine stages.
                <br />
                <span className="italic">One transformation.</span>
              </h2>
            </Reveal>

            <Reveal>
              <div className="relative -mx-6 flex snap-x gap-2 overflow-x-auto px-6 md:mx-0 md:justify-between md:overflow-visible md:px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="absolute top-[9px] right-6 left-6 h-px bg-line md:right-0 md:left-0" />
                {journeyStages.map((s, i) => (
                  <div
                    key={s.title}
                    className="relative flex w-16 shrink-0 snap-start flex-col items-center gap-3.5 md:w-auto md:flex-1"
                  >
                    <div
                      className={`h-[19px] w-[19px] shrink-0 rounded-full border transition-colors ${
                        i < 3 ? "border-saffron-deep bg-saffron" : "border-ink bg-paper"
                      }`}
                    />
                    <div className="grotesque max-w-16 text-center text-[10px] font-bold tracking-wide text-ink-soft uppercase md:max-w-22 md:text-[11px]">
                      {s.title}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="mt-16 text-center">
              <Link
                href="/journey"
                className="grotesque group inline-flex items-center gap-2 rounded-full border border-ink px-8 py-4 text-[13px] font-bold tracking-wide uppercase transition-colors hover:bg-ink hover:text-paper"
              >
                Experience the full journey
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* THE COHORT — real programme photography */}
        <section className="bg-paper-dim py-32">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="eyebrow mb-4 text-saffron-deep">The Cohort</div>
                <h2 className="display text-[clamp(36px,6vw,82px)]">
                  Forty voices. <span className="text-saffron-deep italic">One republic.</span>
                </h2>
              </div>
              <Link
                href="/fellows"
                className="grotesque rounded-full border border-ink px-7 py-3.5 text-[13px] font-bold tracking-wide uppercase transition-colors hover:bg-ink hover:text-paper"
              >
                Meet the cohort
              </Link>
            </Reveal>
          </div>

          <RevealStagger className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-6 px-6 pb-4 md:scroll-pl-12 md:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {gallery.slice(0, 7).map((p) => (
              <RevealItem key={p.src} className="w-72 shrink-0 snap-start">
                <Link href="/fellows" className="group block">
                  <TiltCard maxTilt={6} className="h-90 w-72 overflow-hidden rounded-t-[110px] rounded-b-md">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="288px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </TiltCard>
                  <div className="eyebrow pt-3.5 text-ink-soft">{p.caption}</div>
                </Link>
              </RevealItem>
            ))}
          </RevealStagger>
        </section>

        {/* PROJECTS */}
        <section className="px-6 py-32 md:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-20">
              <div className="eyebrow mb-4 text-saffron-deep">Field Projects</div>
              <h2 className="display max-w-2xl text-[clamp(36px,6vw,82px)]">
                Research that <span className="italic">meets the ground.</span>
              </h2>
            </Reveal>

            <div className="flex flex-col gap-28">
              {projects.map((p, i) => (
                <Reveal key={p.id}>
                  <div
                    className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                      i % 2 === 1 ? "md:[direction:rtl]" : ""
                    }`}
                  >
                    <TiltCard maxTilt={6} className="group aspect-4/3 overflow-hidden rounded-md [direction:ltr]">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <span className="eyebrow absolute top-5 left-5 rounded-full bg-paper/90 px-3.5 py-1.5 text-ink">
                        {p.tag}
                      </span>
                    </TiltCard>
                    <div className="[direction:ltr]">
                      <h3 className="display mb-4 text-[clamp(28px,3.4vw,44px)]">{p.title}</h3>
                      <p className="mb-7 max-w-md text-[15px] leading-relaxed text-ink-soft">
                        {p.body}
                      </p>
                      <div className="flex gap-8">
                        {p.figures.map((f) => (
                          <div key={f.label}>
                            <span className="grotesque block text-[32px] leading-none font-extrabold">
                              {f.value}
                            </span>
                            <span className="eyebrow mt-1.5 block text-ink-soft">{f.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* IMPACT */}
        <section className="relative overflow-hidden bg-ink px-6 py-36 text-paper md:px-12">
          <RingBlob
            className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            color="var(--saffron)"
            size={720}
          />
          <div className="relative mx-auto max-w-5xl">
            <Reveal className="mb-16 text-center">
              <div className="eyebrow text-saffron">The Fellowship, In Numbers</div>
            </Reveal>
            <RevealStagger className="grid grid-cols-2 gap-10 md:grid-cols-4">
              {[...stats.slice(0, 3), { value: 18, suffix: "", label: "States Represented" }].map(
                (s) => (
                  <RevealItem key={s.label} className="text-center">
                    <div className="grotesque text-[clamp(54px,8vw,112px)] leading-[0.85] font-extrabold">
                      <Counter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="eyebrow mt-4 text-paper/45">{s.label}</div>
                  </RevealItem>
                )
              )}
            </RevealStagger>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden px-6 py-40 md:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <div className="eyebrow mb-8 text-saffron-deep">
                Applications for Batch 05 Open
              </div>
            </Reveal>
            <Reveal>
              <h2 className="display mb-12 text-[clamp(40px,8vw,116px)]">
                Step into the rooms
                <br />
                <span className="italic">where it happens.</span>
              </h2>
            </Reveal>
            <Reveal>
              <Link
                href="/apply"
                className="grotesque group inline-flex items-center gap-2.5 rounded-full bg-ink px-10 py-5 text-[14px] font-bold tracking-wide text-paper uppercase transition-colors hover:bg-saffron-deep"
              >
                Start your application
                <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
