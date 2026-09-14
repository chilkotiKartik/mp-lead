import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { TiltCard } from "@/components/TiltCard";
import { projects } from "@/lib/data";

export const metadata: Metadata = { title: "Projects — MP LEAD" };

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24 w-full">
        <div className="px-6 md:px-12 max-w-6xl mx-auto mb-16">
          <div className="eyebrow text-saffron-deep mb-3">
            Field Projects
          </div>
          <h1 className="display text-[clamp(32px,4.6vw,58px)] max-w-2xl">
            Research that meets the ground.
          </h1>
        </div>

        <Marquee items={projects.map((p) => p.tag)} speed={22} className="mb-24" />

        <div className="px-6 md:px-12 max-w-6xl mx-auto">
          <div className="flex flex-col gap-24">
            {projects.map((p, i) => (
              <Reveal key={p.id}>
                <div
                  className={`grid md:grid-cols-2 gap-10 md:gap-14 items-center ${
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
                    <h3 className="display text-[clamp(24px,2.6vw,34px)] mb-3.5">
                      {p.title}
                    </h3>
                    <p className="text-ink-soft leading-relaxed text-[15px] mb-6 max-w-md">
                      {p.body}
                    </p>
                    <div className="flex gap-7">
                      {p.figures.map((f) => (
                        <div key={f.label}>
                          <span className="block display text-[26px] font-medium">
                            {f.value}
                          </span>
                          <small className="text-[11px] uppercase tracking-wide text-ink-soft">
                            {f.label}
                          </small>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
