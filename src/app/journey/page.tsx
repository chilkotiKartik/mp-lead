import type { Metadata } from "next";
import { JourneyScroll } from "@/components/JourneyScroll";

export const metadata: Metadata = { title: "The Fellowship Journey — MP LEAD" };

export default function JourneyPage() {
  return <JourneyScroll />;
}
