import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { JourneyScroll } from "@/components/JourneyScroll";

export const metadata: Metadata = { title: "The Fellowship Journey — MP LEAD" };

export default function JourneyPage() {
  return (
    <>
      <Nav />
      <main>
        <JourneyScroll />
      </main>
      <Footer />
    </>
  );
}
