import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { fellows } from "@/lib/data";

export function generateStaticParams() {
  return fellows.map((f) => ({ id: f.id }));
}

export default async function FellowProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const fellow = fellows.find((f) => f.id === id);
  if (!fellow) notFound();

  return (
    <>
      <Nav />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto w-full">
        <Link href="/fellows" className="text-sm font-semibold text-ink-soft hover:text-ink">
          ← Back to Directory
        </Link>
        <div className="grid md:grid-cols-[320px_1fr] gap-12 mt-8">
          <div
            aria-hidden
            className="aspect-3/4 rounded overflow-hidden flex items-center justify-center display text-9xl font-medium text-white/25"
            style={{ background: fellow.tint }}
          >
            {fellow.initial}
          </div>
          <div>
            <span className="inline-block text-xs uppercase tracking-wider font-bold bg-paper-dim px-3 py-1.5 rounded-full mb-4">
              {fellow.focus}
            </span>
            <h1 className="display text-[clamp(30px,4vw,48px)] mb-2">
              Fellow — {fellow.batch}
            </h1>
            <p className="text-ink-soft mb-8">{fellow.state}</p>

            <dl className="grid sm:grid-cols-2 gap-6 mb-10 max-w-lg">
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-ink-soft mb-1">Batch</dt>
                <dd className="font-medium">{fellow.batch}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-ink-soft mb-1">State</dt>
                <dd className="font-medium">{fellow.state}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-ink-soft mb-1">
                  Project Focus
                </dt>
                <dd className="font-medium">{fellow.focus}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-ink-soft mb-1">Mentor</dt>
                <dd className="font-medium">[Mentor Name]</dd>
              </div>
            </dl>

            <h3 className="text-xs uppercase tracking-wide text-ink-soft mb-2 font-bold">Bio</h3>
            <p className="text-ink-soft leading-relaxed max-w-xl">
              [Fellow bio — a short editorial profile of this fellow&apos;s background, motivation
              for joining MP LEAD, and focus area, to be filled in from verified fellow-submitted
              content.]
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
