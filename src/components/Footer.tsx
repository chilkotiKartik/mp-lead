import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line px-6 md:px-12 py-16">
      <div className="flex flex-wrap justify-between gap-10">
        <div className="display text-3xl">MP LEAD</div>
        <div className="flex flex-wrap gap-16">
          <div>
            <h5 className="eyebrow text-ink-soft mb-4">Explore</h5>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/fellowship">Fellowship</Link>
              <Link href="/journey">Journey</Link>
              <Link href="/fellows">Fellows</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/institutions">Institutions</Link>
            </div>
          </div>
          <div>
            <h5 className="eyebrow text-ink-soft mb-4">Program</h5>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/apply">Apply</Link>
              <Link href="/alumni">Alumni</Link>
              <Link href="/portal">Fellow Portal</Link>
              <Link href="/admin">Admin</Link>
            </div>
          </div>
          <div>
            <h5 className="eyebrow text-ink-soft mb-4">Connect</h5>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/contact">Contact</Link>
              <Link href="/media">Media &amp; Press</Link>
              <Link href="/events">Events</Link>
              <Link href="/stories">Stories</Link>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-14 text-[11px] text-ink-soft/70">
        Programme photography © MP LEAD Fellowship. Architectural photography courtesy of Wikimedia Commons contributors.
      </p>
    </footer>
  );
}
