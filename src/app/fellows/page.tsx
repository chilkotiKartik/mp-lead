import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FellowsGrid } from "@/components/FellowsGrid";
import { LiveBadge } from "@/components/LiveBadge";

export const metadata: Metadata = { title: "Fellow Directory — MP LEAD" };

export default function FellowsPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto w-full">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="eyebrow text-saffron-deep">
            Fellow Directory
          </span>
          <LiveBadge label="Batch 05 Applications Open" />
        </div>
        <h1 className="display text-[clamp(32px,4.6vw,58px)] mb-2">
          Forty voices, one republic.
        </h1>
        <p className="text-ink-soft max-w-lg mb-9">
          Meet the Batch 04 fellows — their states, their projects, their perspectives.
        </p>
        <FellowsGrid />
      </main>
      <Footer />
    </>
  );
}
