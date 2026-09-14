import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";
import { LiveBadge } from "@/components/LiveBadge";
import { Counter } from "@/components/Counter";
import { TiltCard } from "@/components/TiltCard";
import { photos, gallery } from "@/lib/photos";
import { stats } from "@/lib/data";

export const metadata: Metadata = { title: "The Cohort — MP LEAD" };

export default function FellowsPage() {
  return (
    <>
      <Nav />
      <main className="w-full pt-32 pb-24">
        {/* Masthead */}
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="eyebrow text-saffron-deep">The Cohort</span>
            <LiveBadge label="Batch 05 Applications Open" />
          </div>
          <h1 className="display mb-6 max-w-4xl text-[clamp(42px,7.5vw,116px)]">
            Forty voices. <span className="text-saffron-deep italic">One republic.</span>
          </h1>
          <p className="mb-14 max-w-lg text-[16.5px] leading-relaxed text-ink-soft">
            MP LEAD selects a small, deliberately diverse cohort from across India — and
            puts them in the rooms where governance actually happens.
          </p>
        </div>

        {/* Lead plate — the cohort, full bleed */}
        <Reveal>
          <figure className="relative mb-6 h-[62vh] min-h-[380px] w-full overflow-hidden">
            <Image
              src={photos.auditorium.src}
              alt={photos.auditorium.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <figcaption className="absolute bottom-0 left-0 flex items-center gap-3 bg-paper px-5 py-3">
              <span className="eyebrow text-saffron-deep">Batch 04</span>
              <span className="text-[12.5px] text-ink-soft">{photos.auditorium.caption}</span>
            </figcaption>
          </figure>
        </Reveal>

        {/* Cohort figures */}
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <RevealStagger className="mb-20 grid grid-cols-2 gap-8 border-y border-line py-10 md:grid-cols-4">
            {[...stats.slice(0, 3), { value: 18, suffix: "", label: "States Represented" }].map(
              (s) => (
                <RevealItem key={s.label}>
                  <div className="grotesque text-[clamp(34px,4vw,60px)] leading-none font-extrabold">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="eyebrow mt-2.5 text-ink-soft">{s.label}</div>
                </RevealItem>
              )
            )}
          </RevealStagger>

          {/* The cohort at work — editorial staggered gallery */}
          <Reveal className="mb-12">
            <div className="eyebrow mb-4 text-saffron-deep">In the room</div>
            <h2 className="display max-w-2xl text-[clamp(32px,5vw,68px)]">
              What the fellowship <span className="italic">actually looks like.</span>
            </h2>
          </Reveal>

          <RevealStagger className="mb-24 grid gap-x-6 gap-y-12 md:grid-cols-3">
            {gallery.slice(1, 10).map((p, i) => (
              <RevealItem key={p.src} className={i % 3 === 1 ? "md:pt-14" : ""}>
                <TiltCard maxTilt={5} className="group aspect-4/5 overflow-hidden rounded-t-[100px] rounded-b-md">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </TiltCard>
                <div className="eyebrow mt-3.5 text-ink-soft">{p.caption}</div>
              </RevealItem>
            ))}
          </RevealStagger>

          {/* Directory note — honest about what is not yet published */}
          <Reveal>
            <div className="grid items-center gap-8 border-t border-line pt-12 md:grid-cols-[1fr_auto]">
              <div>
                <h3 className="display mb-3 text-[clamp(24px,3vw,38px)]">
                  Individual fellow profiles
                </h3>
                <p className="max-w-xl text-[15px] leading-relaxed text-ink-soft">
                  Named profiles — batch, state, education, project and mentor — are
                  published once each fellow has confirmed their details and consented to
                  appear. The directory structure is live and fills from the admin console.
                </p>
              </div>
              <Link
                href="/apply"
                className="grotesque shrink-0 rounded-full border border-ink px-7 py-3.5 text-[13px] font-bold tracking-wide uppercase transition-colors hover:bg-ink hover:text-paper"
              >
                Join Batch 05
              </Link>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
