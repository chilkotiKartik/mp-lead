import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "The Fellowship — MP LEAD" };

const pillars = [
  {
    title: "Legislative Exposure",
    body: "Structured engagement with parliamentary process and constitutional institutions — observation, not performance.",
  },
  {
    title: "Administrative Development",
    body: "Practical grounding in how policy moves through administration, from ministries to district offices.",
  },
  {
    title: "Field Research",
    body: "A district-level project, from problem framing through fieldwork to a final policy-relevant deliverable.",
  },
  {
    title: "Mentorship",
    body: "One-on-one guidance from an experienced practitioner throughout the fellowship.",
  },
];

export default function FellowshipPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto w-full">
        <div className="text-xs tracking-[0.2em] uppercase font-bold text-saffron-deep mb-3">
          The Fellowship
        </div>
        <h1 className="font-serif font-medium text-[clamp(32px,4.6vw,58px)] mb-6">
          A two-month immersion into governance.
        </h1>
        <p className="text-ink-soft text-lg max-w-2xl mb-16 leading-relaxed">
          MP LEAD selects a small, diverse cohort of young Indians for direct exposure to the
          institutions that run the republic — paired with rigorous training, mentorship and a
          real field project.
        </p>
        <div className="grid sm:grid-cols-2 gap-8">
          {pillars.map((p) => (
            <Reveal key={p.title}>
              <div className="border-t border-line pt-5">
                <h3 className="font-serif text-xl font-medium mb-2">{p.title}</h3>
                <p className="text-ink-soft text-[15px] leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
