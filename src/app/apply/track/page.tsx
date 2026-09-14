import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getApplication } from "@/lib/applications";

export default async function TrackPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const application = id ? await getApplication(id) : undefined;

  return (
    <>
      <Nav />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-xl mx-auto w-full">
        <h1 className="display text-[clamp(28px,3.6vw,40px)] mb-8">
          Track Your Application
        </h1>

        <form className="flex gap-3 mb-10" action="/apply/track">
          <input
            name="id"
            defaultValue={id}
            placeholder="Enter your reference ID"
            className="flex-1 rounded-lg border border-line bg-card px-4 py-3 text-sm font-mono outline-none focus:border-ink"
          />
          <button className="rounded-lg bg-ink text-paper px-5 py-3 text-sm font-bold cursor-pointer">
            Track
          </button>
        </form>

        {id && !application && (
          <p className="text-red font-semibold">No application found for “{id}”.</p>
        )}

        {application && (
          <div className="rounded-2xl border border-line bg-card p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-[11px] uppercase tracking-wide text-ink-soft mb-1">
                  Reference ID
                </div>
                <div className="font-mono text-lg font-bold">{application.id}</div>
              </div>
              <span className="rounded-full bg-paper-dim px-4 py-1.5 text-xs font-bold uppercase tracking-wide">
                {application.status}
              </span>
            </div>
            <dl className="grid grid-cols-2 gap-5 text-sm">
              <div>
                <dt className="text-ink-soft text-xs mb-1">Applicant</dt>
                <dd className="font-medium">{application.fullName}</dd>
              </div>
              <div>
                <dt className="text-ink-soft text-xs mb-1">State</dt>
                <dd className="font-medium">{application.state}</dd>
              </div>
              <div>
                <dt className="text-ink-soft text-xs mb-1">Focus Area</dt>
                <dd className="font-medium">{application.focusArea || "—"}</dd>
              </div>
              <div>
                <dt className="text-ink-soft text-xs mb-1">Submitted</dt>
                <dd className="font-medium">
                  {new Date(application.submittedAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>
        )}

        <p className="mt-10 text-sm text-ink-soft">
          <Link href="/apply" className="font-semibold text-ink">
            ← Start a new application
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
