import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { institutions } from "@/lib/data";
import { exposureBeats } from "@/lib/content";

export const metadata: Metadata = { title: "Institutional Exposure — MP LEAD" };

export default function InstitutionsPage() {
  return (
    <>
      <Nav dark />
      <main>
        {/* Full-bleed opening plate */}
        <section className="relative flex min-h-[78vh] items-end overflow-hidden px-6 pt-40 pb-16 md:px-12">
          <Image
            src="/images/inst-south-block.jpg"
            alt="South Block, New Delhi"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/65 to-ink/25" />
          <div className="relative max-w-4xl">
            <div className="eyebrow mb-5 flex items-center gap-3 text-saffron">
              <span className="h-px w-10 bg-saffron" />
              Institutional Exposure
            </div>
            <h1 className="display text-[clamp(44px,9vw,132px)]">
              The offices that
              <br />
              <span className="italic text-saffron">shape the republic.</span>
            </h1>
          </div>
        </section>

        {/* Four beats — numbered, oversized, editorial */}
        <section className="border-t border-line px-6 py-28 md:px-12">
          <div className="mx-auto max-w-6xl">
            {exposureBeats.map((b, i) => (
              <Reveal key={b.beat}>
                <div className="grid gap-6 border-b border-line py-12 md:grid-cols-[120px_1fr_1.2fr] md:gap-12">
                  <span className="grotesque text-[44px] leading-none font-extrabold text-saffron-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="display text-[clamp(30px,4vw,52px)]">{b.beat}</h2>
                  <p className="max-w-lg self-center text-[15px] leading-relaxed text-ink-soft">
                    {b.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Institution plates — alternating full-bleed editorial crops */}
        <section className="pb-32">
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
                <div className="flex flex-col justify-center bg-paper-dim px-6 py-16 md:px-16 [direction:ltr]">
                  <span className="eyebrow mb-4 text-saffron-deep">{inst.tag}</span>
                  <h3 className="display mb-5 text-[clamp(32px,4.6vw,64px)]">{inst.name}</h3>
                  <p className="max-w-md text-[15px] leading-relaxed text-ink-soft">
                    Fellows engage here as students of process — observing how decisions
                    move through the institution, not performing politics within it.
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
