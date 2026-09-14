import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "Contact — MP LEAD" };

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-xl mx-auto w-full">
        <div className="eyebrow text-saffron-deep mb-3">
          Contact
        </div>
        <h1 className="display text-[clamp(30px,4vw,46px)] mb-8">Get in touch.</h1>
        <div className="grid gap-5 text-sm">
          <div>
            <div className="text-ink-soft text-xs uppercase mb-1">Email</div>
            <div className="font-medium">[contact@mplead.example]</div>
          </div>
          <div>
            <div className="text-ink-soft text-xs uppercase mb-1">Address</div>
            <div className="font-medium">[MP LEAD Program Office, address to be confirmed]</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
