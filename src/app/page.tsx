import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { stats, institutions, journeyStages, fellows, projects } from "@/lib/data";

export default function Home() {
  const journeyLabels = journeyStages.map((s) => s.title);

  return (
    <>
      <Intro />
      <Nav dark />
      <main>
        <Hero />

        {/* STATS */}
        <section className="py-24 px-6 md:px-12 border-y border-line">
          <RevealStagger className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((s) => (
              <RevealItem key={s.label}>
                <div className="font-serif font-medium text-[clamp(36px,4.4vw,64px)] leading-none">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2.5 text-[13px] uppercase tracking-wider text-ink-soft font-semibold">
                  {s.label}
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </section>

        {/* ENTER THE INSTITUTIONS */}
        <section className="py-36 px-6 md:px-12 bg-ink text-paper">
          <div className="max-w-6xl mx-auto">
            <Reveal className="flex flex-col md:flex-row md:justify-between md:items-end gap-10 mb-16">
              <div>
                <div className="text-xs tracking-[0.2em] uppercase font-bold text-saffron mb-3.5">
                  Enter the Institutions
                </div>
                <h2 className="font-serif font-medium text-[clamp(32px,4.2vw,56px)] max-w-2xl">
                  Exposure to the offices that shape the republic.
                </h2>
              </div>
              <p className="max-w-sm text-paper/65 text-[15px] leading-relaxed">
                Fellows engage directly with constitutional offices and ministries — observing
                process, not performing politics. Exposure, learning, perspective.
              </p>
            </Reveal>
            <RevealStagger className="grid md:grid-cols-3 gap-6">
              {institutions.map((inst) => (
                <RevealItem key={inst.name}>
                  <div className="group relative aspect-3/4 rounded overflow-hidden cursor-pointer">
                    <Image
                      src={inst.image}
                      alt={inst.name}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover grayscale-[60%] transition-[transform,filter] duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/90" />
                      <h3 className="relative text-[22px] font-medium text-white mb-1.5">
                        {inst.name}
                      </h3>
                      <span className="relative text-xs uppercase tracking-wider text-white/70">
                        {inst.tag}
                      </span>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* JOURNEY PREVIEW */}
        <section className="py-36 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <Reveal className="mb-16">
              <div className="text-xs tracking-[0.2em] uppercase font-bold text-saffron-deep mb-3.5">
                The Fellowship Journey
              </div>
              <h2 className="font-serif font-medium text-[clamp(32px,4.2vw,56px)] max-w-xl">
                Nine stages. One transformation.
              </h2>
            </Reveal>
            <Reveal>
              <div className="relative flex justify-between px-1">
                <div className="absolute top-[9px] left-0 right-0 h-px bg-line" />
                {journeyLabels.map((label, i) => (
                  <div key={label} className="relative flex flex-col items-center gap-3.5 flex-1">
                    <div
                      className={`w-[19px] h-[19px] rounded-full border ${
                        i < 3 ? "bg-saffron border-saffron-deep" : "bg-paper border-ink"
                      }`}
                    />
                    <div className="text-[10px] md:text-[11px] text-center uppercase tracking-wide font-bold text-ink-soft max-w-16 md:max-w-22">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <div className="text-center mt-14">
              <Link
                href="/journey"
                className="rounded-full border border-ink px-7 py-4 text-sm font-bold transition-colors hover:bg-ink hover:text-paper"
              >
                Experience the Full Journey →
              </Link>
            </div>
          </div>
        </section>

        {/* FELLOW STORIES */}
        <section className="py-36 bg-paper-dim">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <Reveal className="flex flex-wrap justify-between items-end gap-6 mb-14">
              <div>
                <div className="text-xs tracking-[0.2em] uppercase font-bold text-saffron-deep mb-3.5">
                  Fellow Stories
                </div>
                <h2 className="font-serif font-medium text-[clamp(32px,4.2vw,56px)]">
                  Forty voices. One republic.
                </h2>
              </div>
              <Link
                href="/fellows"
                className="rounded-full border border-ink px-7 py-4 text-sm font-bold transition-colors hover:bg-ink hover:text-paper"
              >
                View Directory
              </Link>
            </Reveal>
          </div>
          <RevealStagger className="flex gap-5 overflow-x-auto pb-3 px-6 md:px-12 snap-x snap-mandatory [scrollbar-width:none]">
            {fellows.slice(0, 5).map((f) => (
              <RevealItem key={f.id} className="snap-start shrink-0 w-67">
                <Link href={`/fellows/${f.id}`} className="group block">
                  <div
                    className="relative w-67 h-85 rounded-[3px] overflow-hidden flex items-end transition-[border-radius] duration-500 group-hover:rounded-br-[40px]"
                    style={{ background: f.tint }}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 flex items-center justify-center font-serif text-[120px] font-medium text-white/15 transition-transform duration-600 group-hover:scale-110 group-hover:-translate-y-1.5"
                    >
                      {f.initial}
                    </div>
                    <div className="relative p-5 text-white">
                      <h4 className="font-serif font-medium text-[19px] mb-1">Fellow — {f.batch}</h4>
                      <span className="text-xs text-white/70">{f.state}</span>
                    </div>
                  </div>
                  <div className="pt-3.5 text-[13px] text-ink-soft opacity-0 -translate-y-1.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {f.focus} · Mentor: [Mentor Name]
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealStagger>
        </section>

        {/* PROJECTS */}
        <section className="py-36 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <Reveal className="mb-20">
              <div className="text-xs tracking-[0.2em] uppercase font-bold text-saffron-deep mb-3.5">
                Field Projects
              </div>
              <h2 className="font-serif font-medium text-[clamp(32px,4.2vw,56px)]">
                Research that meets the ground.
              </h2>
            </Reveal>
            <div className="flex flex-col gap-28">
              {projects.map((p, i) => (
                <Reveal key={p.id}>
                  <div
                    className={`grid md:grid-cols-2 gap-10 md:gap-14 items-center ${
                      i % 2 === 1 ? "md:[direction:rtl]" : ""
                    }`}
                  >
                    <div
                      className="relative aspect-4/3 rounded overflow-hidden [direction:ltr]"
                      style={{ background: p.tint }}
                    >
                      <span className="absolute top-5 left-5 bg-paper/90 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
                        {p.tag}
                      </span>
                    </div>
                    <div className="[direction:ltr]">
                      <h3 className="font-serif font-medium text-[clamp(24px,2.6vw,34px)] mb-3.5">
                        {p.title}
                      </h3>
                      <p className="text-ink-soft leading-relaxed text-[15px] mb-5 max-w-md">
                        {p.body}
                      </p>
                      <div className="flex gap-7 mb-6">
                        {p.figures.map((f) => (
                          <div key={f.label}>
                            <span className="block font-serif text-[26px] font-medium">
                              {f.value}
                            </span>
                            <small className="text-[11px] uppercase tracking-wide text-ink-soft">
                              {f.label}
                            </small>
                          </div>
                        ))}
                      </div>
                      <Link
                        href="/projects"
                        className="rounded-full border border-ink px-6 py-3.5 text-sm font-bold transition-colors hover:bg-ink hover:text-paper"
                      >
                        Read the case study →
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* IMPACT */}
        <section className="py-40 px-6 md:px-12 bg-ink text-paper text-center">
          <h2 className="text-sm tracking-[0.2em] uppercase text-saffron font-bold mb-14">
            The Fellowship, In Numbers
          </h2>
          <RevealStagger className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...stats.slice(0, 3), { value: 18, suffix: "", label: "States Represented" }].map(
              (s) => (
                <RevealItem key={s.label}>
                  <div className="font-serif font-medium text-[clamp(48px,6.6vw,96px)] leading-none">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-3 text-[13px] uppercase tracking-wider text-paper/60">
                    {s.label}
                  </div>
                </RevealItem>
              )
            )}
          </RevealStagger>
        </section>

        {/* CTA */}
        <section className="py-40 px-6 md:px-12 text-center">
          <Reveal className="flex justify-center">
            <span className="text-xs tracking-[0.2em] uppercase font-bold text-saffron-deep mb-6">
              Applications for Batch 05 Open
            </span>
          </Reveal>
          <Reveal>
            <h2 className="font-serif font-medium text-[clamp(34px,5vw,64px)] max-w-3xl mx-auto mb-10">
              Step into the institutions that run the republic.
            </h2>
          </Reveal>
          <Reveal>
            <Link
              href="/apply"
              className="inline-block rounded-full bg-ink text-paper px-8 py-4.5 text-sm font-bold transition-colors hover:bg-saffron-deep"
            >
              Start Your Application
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
