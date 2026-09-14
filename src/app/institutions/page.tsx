import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";
import { CinematicHero, HeroLine } from "@/components/CinematicHero";
import { InstitutionAxis } from "@/components/InstitutionAxis";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { institutions } from "@/lib/data";
import { exposureBeats } from "@/lib/content";
import { photos } from "@/lib/photos";

export const metadata: Metadata = { title: "Institutional Exposure — MP LEAD" };

const INSIDE = [photos.officialsPanel, photos.panelSession, photos.haryanaBhawan, photos.founderPanel];

export default function InstitutionsPage() {
  return (
    <>
      <Nav dark />
      <main>
        <CinematicHero
          image="/images/inst-south-block.jpg"
          alt="South Block, New Delhi"
          eyebrow="Institutional Exposure"
          caption="South Block, New Delhi — photograph courtesy of Wikimedia Commons contributors"
        >
          <h1 className="display text-[clamp(44px,9vw,132px)] text-paper">
            <HeroLine>The offices that</HeroLine>
            <HeroLine className="text-saffron italic">shape the republic.</HeroLine>
          </h1>
        </CinematicHero>

        {/* The vista, drawn */}
        <section className="border-t border-line px-6 py-24 md:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-12 grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-end">
              <div>
                <div className="eyebrow mb-4 text-saffron-deep">The central vista</div>
                <h2 className="display text-[clamp(32px,5vw,68px)]">
                  Four offices, <span className="italic">one axis.</span>
                </h2>
              </div>
              <p className="text-[15px] leading-relaxed text-ink-soft">
                Fellows move between constitutional offices and ministries clustered along the
                same stretch of New Delhi — close enough to walk, far enough apart in function
                to teach very different lessons.
              </p>
            </Reveal>
            <Reveal>
              <InstitutionAxis />
            </Reveal>
          </div>
        </section>

        {/* Four beats */}
        <section className="bg-paper-dim px-6 py-24 md:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-10">
              <div className="eyebrow mb-4 text-saffron-deep">How exposure works</div>
              <h2 className="display max-w-3xl text-[clamp(32px,5vw,68px)]">
                Access. <span className="text-saffron-deep italic">Observation.</span> Learning.
                Perspective.
              </h2>
            </Reveal>
            {exposureBeats.map((b, i) => (
              <Reveal key={b.beat}>
                <div className="grid gap-5 border-b border-line py-11 last:border-0 md:grid-cols-[110px_1fr_1.25fr] md:gap-12">
                  <span className="grotesque text-[clamp(32px,4vw,46px)] leading-none font-extrabold text-saffron-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display text-[clamp(28px,3.8vw,50px)]">{b.beat}</h3>
                  <p className="max-w-lg self-center text-[15px] leading-relaxed text-ink-soft">
                    {b.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Institution plates */}
        <section>
          {institutions.map((inst, i) => (
            <Reveal key={inst.name}>
              <div
                className={`grid items-stretch gap-0 md:grid-cols-2 ${
                  i % 2 === 1 ? "md:[direction:rtl]" : ""
                }`}
              >
                <div className="group relative aspect-4/3 overflow-hidden md:aspect-auto md:min-h-[62vh] [direction:ltr]">
                  <Image
                    src={inst.image}
                    alt={inst.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover grayscale-[45%] transition-[transform,filter] duration-[900ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <div className="flex flex-col justify-center px-6 py-16 md:px-16 [direction:ltr]">
                  <span className="eyebrow mb-4 text-saffron-deep">{inst.tag}</span>
                  <h3 className="display mb-5 text-[clamp(32px,4.6vw,64px)]">{inst.name}</h3>
                  <p className="max-w-md text-[15px] leading-relaxed text-ink-soft">
                    Fellows engage here as students of process — observing how decisions move
                    through the institution, not performing politics within it.
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </section>

        {/* In the room — real programme photography, as a reel */}
        <section className="bg-paper-dim py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <Reveal className="mb-10">
              <div className="eyebrow mb-4 text-saffron-deep">In the room</div>
              <h2 className="display max-w-2xl text-[clamp(30px,4.6vw,62px)]">
                Institutional sessions, <span className="italic">as they happened.</span>
              </h2>
            </Reveal>
            <Reveal>
              <PhotoCarousel items={INSIDE} aspect="aspect-4/3 md:aspect-16/9" />
            </Reveal>
          </div>
        </section>

        {/* What fellows take from it */}
        <section className="mx-auto max-w-6xl px-6 py-24 md:px-12">
          <RevealStagger className="grid gap-10 md:grid-cols-3">
            {[
              {
                h: "A seat, not a tour",
                p: "Engagements are structured as participation — fellows are in the session, not walked past it.",
              },
              {
                h: "Process over personality",
                p: "The subject is how a decision is assembled: the file, the note, the clearance, the sequence.",
              },
              {
                h: "Debrief, every time",
                p: "Each visit is closed with a structured debrief that ties what was observed back to the training.",
              },
            ].map((c) => (
              <RevealItem key={c.h}>
                <div className="border-t-2 border-saffron-deep pt-6">
                  <h3 className="display mb-3 text-[clamp(22px,2.6vw,32px)]">{c.h}</h3>
                  <p className="text-[14.5px] leading-relaxed text-ink-soft">{c.p}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>

          <Reveal>
            <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-paper-dim px-8 py-10">
              <h3 className="display max-w-lg text-[clamp(24px,3vw,40px)]">
                Batch 05 walks these corridors next.
              </h3>
              <Link
                href="/apply"
                className="grotesque group inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-8 py-4 text-[13px] font-bold tracking-wide text-paper uppercase transition-colors hover:bg-saffron-deep"
              >
                Apply to Batch 05
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
