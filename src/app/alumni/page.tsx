import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "Alumni — MP LEAD" };

export default function AlumniPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-3xl mx-auto w-full text-center">
        <div className="eyebrow text-saffron-deep mb-3">
          Alumni Network
        </div>
        <h1 className="display text-[clamp(30px,4.4vw,52px)] mb-6">
          Every fellow graduates into the network.
        </h1>
        <p className="text-ink-soft leading-relaxed">
          [Alumni directory and career outcomes to be published here as Batch 04 graduates and
          verified updates are collected.]
        </p>
      </main>
      <Footer />
    </>
  );
}
