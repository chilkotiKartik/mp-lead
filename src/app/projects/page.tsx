import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/data";

export const metadata: Metadata = { title: "Projects — MP LEAD" };

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto w-full">
        <div className="text-xs tracking-[0.2em] uppercase font-bold text-saffron-deep mb-3">
          Field Projects
        </div>
        <h1 className="font-serif font-medium text-[clamp(32px,4.6vw,58px)] mb-16 max-w-2xl">
          Research that meets the ground.
        </h1>
        <div className="flex flex-col gap-24">
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
                  <p className="text-ink-soft leading-relaxed text-[15px] mb-6 max-w-md">
                    {p.body}
                  </p>
                  <div className="flex gap-7">
                    {p.figures.map((f) => (
                      <div key={f.label}>
                        <span className="block font-serif text-[26px] font-medium">{f.value}</span>
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
      </main>
      <Footer />
    </>
  );
}
