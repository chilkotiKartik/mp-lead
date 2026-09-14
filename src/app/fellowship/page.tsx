import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { HoverPreview, type HoverPreviewItem } from "@/components/ui/hover-preview";

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

export const metadata: Metadata = { title: "The Fellowship — MP LEAD" };

const pillars = [
  {
    title: "Legislative Exposure",
    body: "Structured engagement with parliamentary process and constitutional institutions — observation, not performance.",
    color: "var(--saffron)",
  },
  {
    title: "Administrative Development",
    body: "Practical grounding in how policy moves through administration, from ministries to district offices.",
    color: "var(--green)",
  },
  {
    title: "Field Research",
    body: "A district-level project, from problem framing through fieldwork to a final policy-relevant deliverable.",
    color: "var(--blue)",
  },
  {
    title: "Mentorship",
    body: "One-on-one guidance from an experienced practitioner throughout the fellowship.",
    color: "var(--maroon)",
  },
];

export default function FellowshipPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto w-full">
        <div className="eyebrow text-saffron-deep mb-3">
          The Fellowship
        </div>
        <h1 className="display text-[clamp(32px,4.6vw,58px)] mb-6">
          A two-month immersion into governance.
        </h1>
        <p className="text-ink-soft text-lg max-w-2xl mb-16 leading-relaxed">
          MP LEAD selects a small, diverse cohort of young Indians for direct exposure to the
          institutions that run the republic — paired with rigorous training, mentorship and a
          real field project.
        </p>
        <div className="grid sm:grid-cols-2 gap-8 mb-24">
          {pillars.map((p, i) => (
            <Reveal key={p.title}>
              <div
                className="border-t-2 pt-5 transition-transform duration-300 hover:-translate-y-1"
                style={{ borderColor: p.color }}
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="display text-sm" style={{ color: p.color }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display text-xl font-medium">{p.title}</h3>
                </div>
                <p className="text-ink-soft text-[15px] leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="border-t border-line pt-16">
          <div className="eyebrow text-saffron-deep mb-6">
            Hover to look inside
          </div>
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
        </div>
      </main>
      <Footer />
    </>
  );
}
