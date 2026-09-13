import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "Media & Press — MP LEAD" };

export default function MediaPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-3xl mx-auto w-full">
        <div className="text-xs tracking-[0.2em] uppercase font-bold text-saffron-deep mb-3">
          Media & Press
        </div>
        <h1 className="font-serif font-medium text-[clamp(30px,4.4vw,52px)] mb-6">
          News and coverage.
        </h1>
        <p className="text-ink-soft leading-relaxed">
          [Press releases, verified media coverage and announcements will be published here.]
        </p>
      </main>
      <Footer />
    </>
  );
}
