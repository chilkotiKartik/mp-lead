import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ApplyForm } from "@/components/ApplyForm";

export const metadata: Metadata = { title: "Apply — MP LEAD" };

export default function ApplyPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-2xl mx-auto w-full">
        <div className="text-xs tracking-[0.2em] uppercase font-bold text-saffron-deep mb-3">
          Batch 05 Application
        </div>
        <h1 className="font-serif font-medium text-[clamp(30px,4vw,46px)] mb-2">
          Apply to MP LEAD.
        </h1>
        <p className="text-ink-soft mb-10">
          Four steps. Save your reference ID at the end to track your status any time.
        </p>
        <ApplyForm />
      </main>
      <Footer />
    </>
  );
}
