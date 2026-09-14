import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { LiveBadge } from "@/components/LiveBadge";
import { ProgrammeArc } from "@/components/ProgrammeArc";
import { SelectionFunnel } from "@/components/SelectionFunnel";
import { MovingReel } from "@/components/MovingReel";
import { HoverPreview, type HoverPreviewItem } from "@/components/ui/hover-preview";
import { stats, journeyStages } from "@/lib/data";
import { photos, gallery } from "@/lib/photos";

export const metadata: Metadata = { title: "The Fellowship — MP LEAD" };

const rashtrapati: HoverPreviewItem = {
  key: "rashtrapati",
  image: "/images/inst-rashtrapati-bhavan.jpg",
  title: "Rashtrapati Bhavan",
  subtitle: "The Presidential Estate, New Delhi",
};
const southBlock: HoverPreviewItem = {
  key: "south-block",
  image: "/images/inst-south-block.jpg",
  title: "South Block",
  subtitle: "Ministry of External Affairs & Cabinet Secretariat",
};
const supremeCourt: HoverPreviewItem = {
  key: "supreme-court",
  image: "/images/inst-supreme-court.jpg",
  title: "Supreme Court of India",
  subtitle: "Constitutional Institutions",
};
const indiaGate: HoverPreviewItem = {
  key: "india-gate",
  image: "/images/hero-india-gate.jpg",
  title: "India Gate",
  subtitle: "New Delhi",
};

const pillars = [
  {
    title: "Legislative Exposure",
    body: "Structured engagement with parliamentary process and constitutional institutions — observation, not performance.",
    color: "var(--saffron-deep)",
    photo: photos.officialsPanel,
  },
  {
    title: "Administrative Development",
    body: "Practical grounding in how policy moves through administration, from ministries to district offices.",
    color: "var(--green)",
    photo: photos.haryanaBhawan,
  },
  {
    title: "Field Research",
    body: "A district-level project, from problem framing through fieldwork to a final policy-relevant deliverable.",
    color: "var(--blue)",
    photo: photos.fellowSpeaking,
  },
  {
    title: "Mentorship",
    body: "One-on-one guidance from an experienced practitioner throughout the fellowship.",
    color: "var(--maroon)",
    photo: photos.cohortRoom,
  },
];

export default function FellowshipPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24">
        {/* Masthead — type left, drawn programme diagram right */}
        <section className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="eyebrow text-saffron-deep">The Fellowship</span>
                <LiveBadge label="Batch 05 Applications Open" />
              </div>
              <h1 className="display mb-7 text-[clamp(42px,7vw,104px)]">
                Two months inside
                <br />
                <span className="text-saffron-deep italic">the machinery.</span>
              </h1>
              <p className="mb-9 max-w-lg text-[16.5px] leading-relaxed text-ink-soft">
                MP LEAD selects a small, deliberately diverse cohort of young Indians for
                direct exposure to the institutions that run the republic — paired with
                rigorous training, mentorship and a real field project.
              </p>
              <div className="flex flex-wrap gap-3.5">
                <Link
                  href="/apply"
                  className="grotesque group inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-[13px] font-bold tracking-wide text-paper uppercase transition-colors hover:bg-saffron-deep"
                >
                  Apply to Batch 05
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/journey"
                  className="grotesque inline-flex items-center rounded-full border border-ink px-8 py-4 text-[13px] font-bold tracking-wide uppercase transition-colors hover:bg-ink hover:text-paper"
                >
                  See the nine stages
                </Link>
              </div>
            </div>

            <Reveal>
              <ProgrammeArc />
            </Reveal>
          </div>
        </section>

        {/* Figures */}
        <section className="mx-auto mt-24 max-w-6xl px-6 md:px-12">
          <RevealStagger className="grid grid-cols-2 gap-8 border-y border-line py-10 md:grid-cols-4">
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
        </section>

        {/* Four tracks — photographic plates, each on its own colour */}
        <section className="mx-auto mt-28 max-w-6xl px-6 md:px-12">
          <Reveal className="mb-14">
            <div className="eyebrow mb-4 text-saffron-deep">Four tracks</div>
            <h2 className="display max-w-3xl text-[clamp(34px,5.4vw,74px)]">
              Exposure, administration, research, <span className="italic">mentorship.</span>
            </h2>
          </Reveal>

          <RevealStagger className="grid gap-x-7 gap-y-14 md:grid-cols-2">
            {pillars.map((p, i) => (
              <RevealItem key={p.title} className={i % 2 === 1 ? "md:pt-16" : ""}>
                <article className="group">
                  <div className="relative mb-6 aspect-4/3 overflow-hidden rounded-md">
                    <Image
                      src={p.photo.src}
                      alt={p.photo.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />
                    <span
                      className="absolute inset-x-0 bottom-0 h-1.5"
                      style={{ backgroundColor: p.color }}
                    />
                  </div>
                  <div className="mb-2.5 flex items-baseline gap-3">
                    <span className="grotesque text-[13px] font-extrabold" style={{ color: p.color }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="display text-[clamp(24px,3vw,38px)]">{p.title}</h3>
                  </div>
                  <p className="max-w-md text-[15px] leading-relaxed text-ink-soft">{p.body}</p>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        </section>

        {/* Moving reel of the programme */}
        <section className="mt-28 bg-paper-dim py-20">
          <div className="mx-auto mb-10 max-w-6xl px-6 md:px-12">
            <div className="eyebrow mb-3 text-saffron-deep">Inside the fellowship</div>
            <h2 className="display max-w-xl text-[clamp(28px,4.2vw,54px)]">
              Eight weeks, <span className="italic">as photographed.</span>
            </h2>
          </div>
          <MovingReel items={gallery} speed={50} />
        </section>

        {/* Selection */}
        <section className="mx-auto mt-28 max-w-6xl px-6 md:px-12">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="eyebrow mb-4 text-saffron-deep">Selection</div>
              <h2 className="display mb-6 text-[clamp(32px,5vw,68px)]">
                Five thousand apply.
                <br />
                <span className="text-saffron-deep italic">Forty are selected.</span>
              </h2>
              <p className="max-w-md text-[15px] leading-relaxed text-ink-soft">
                Applications are screened, shortlisted and taken to interview. The cohort is
                kept small on purpose — every fellow has to be able to fit in the room.
              </p>
            </Reveal>
            <Reveal className="self-center">
              <SelectionFunnel />
            </Reveal>
          </div>
        </section>

        {/* Nine stages, at a glance */}
        <section className="mx-auto mt-28 max-w-6xl px-6 md:px-12">
          <Reveal className="mb-12">
            <div className="eyebrow mb-4 text-saffron-deep">The sequence</div>
            <h2 className="display max-w-2xl text-[clamp(30px,4.6vw,62px)]">
              Nine stages, <span className="italic">in order.</span>
            </h2>
          </Reveal>
          <RevealStagger className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {journeyStages.map((s, i) => (
              <RevealItem key={s.title}>
                <Link
                  href="/journey"
                  className="group flex gap-4 border-t border-line pt-5 transition-colors hover:border-saffron-deep"
                >
                  <span className="grotesque shrink-0 text-[13px] font-extrabold text-ink/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="display mb-1 text-[21px] transition-colors group-hover:text-saffron-deep">
                      {s.title}
                    </h3>
                    <span className="eyebrow text-ink-soft">{s.week}</span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealStagger>
        </section>

        {/* Institutions, in prose */}
        <section className="mx-auto mt-28 max-w-4xl border-t border-line px-6 pt-16 md:px-12">
          <div className="eyebrow mb-7 text-saffron-deep">Hover to look inside</div>
          <HoverPreview
            paragraphs={[
              [
                "Fellows walk the grounds of ",
                rashtrapati,
                " and pass through the gates of ",
                southBlock,
                " — not as visitors, but as students of how the republic actually runs.",
              ],
              [
                "Some weeks are spent in the shadow of the ",
                supremeCourt,
                ", others gathered under the ",
                indiaGate,
                " with the rest of the cohort. Every building has a lesson.",
              ],
            ]}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
