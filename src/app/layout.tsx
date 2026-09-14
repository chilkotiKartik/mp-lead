import type { Metadata } from "next";
import { Instrument_Serif, Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

// Editorial display — high-contrast, dramatic, italic moments.
const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400"],
});

// Expressive grotesque — condensed headline energy, oversized numerals.
const grotesque = Bricolage_Grotesque({
  variable: "--font-grotesque",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MP LEAD — Legislative Exposure & Administrative Development Fellowship",
  description:
    "A two-month immersive fellowship into governance, public policy and institutional leadership.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        display.variable,
        grotesque.variable,
        manrope.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">{children}</body>
    </html>
  );
}
