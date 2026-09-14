import type { Metadata } from "next";
import { listApplications } from "@/lib/applications";
import { AnimatedBar } from "@/components/AnimatedBar";
import { LiveBadge } from "@/components/LiveBadge";

export const metadata: Metadata = { title: "Admin Command Centre — MP LEAD" };
export const dynamic = "force-dynamic";

const navGroups = [
  { label: "Overview", items: ["Dashboard", "Reports"] },
  {
    label: "Program",
    items: [
      "Applications",
      "Fellows",
      "Batches",
      "Curriculum",
      "Attendance",
      "Tasks",
      "Projects",
      "Mentors",
      "Events",
    ],
  },
  { label: "Content", items: ["CMS", "Media & PR"] },
  {
    label: "People",
    items: ["Certificates & LOR", "Alumni", "Communications", "Users & Permissions"],
  },
];

export default async function AdminPage() {
  const applications = await listApplications();
  const total = applications.length;

  return (
    <div className="min-h-screen grid md:grid-cols-[236px_1fr] bg-paper text-ink">
      <aside className="hidden md:block bg-ink text-paper p-6 text-sm">
        <div className="font-serif text-lg px-2 pb-5">MP LEAD Admin</div>
        {navGroups.map((g) => (
          <div key={g.label} className="mb-1">
            <div className="text-[10px] uppercase tracking-wide text-paper/35 font-bold px-2.5 pt-3.5 pb-1.5">
              {g.label}
            </div>
            {g.items.map((item, i) => (
              <div
                key={item}
                className={`px-2.5 py-2 rounded-md font-semibold cursor-pointer ${
                  g.label === "Overview" && i === 0
                    ? "bg-saffron text-ink"
                    : "text-paper/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        ))}
        <div className="px-2.5 py-2 mt-3 text-paper/70 hover:bg-white/5 hover:text-white rounded-md cursor-pointer font-semibold">
          Settings
        </div>
      </aside>

      <main className="p-6 md:p-9 pb-16">
        <div className="mb-7 flex flex-wrap items-center gap-3.5">
          <div>
            <h1 className="font-serif font-medium text-2xl md:text-[26px]">Admin Command Centre</h1>
            <p className="text-ink-soft text-[13.5px] mt-0.5">Batch 05 selection cycle</p>
          </div>
          <LiveBadge label="Live Data" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4.5 mb-6">
          <Kpi label="Applications (Live)" value={total.toLocaleString()} delta="From apply.mplead" />
          <Kpi label="Active Fellows" value="40" delta="Batch 04 · on track" />
          <Kpi label="Pending Reviews" value={String(total)} delta="Awaiting reviewer" tone="amber" />
          <Kpi label="Upcoming Events" value="3" delta="Next: Field visit briefing" tone="muted" />
        </div>

        <div className="grid md:grid-cols-[1.4fr_1fr] gap-5 mb-5">
          <div className="bg-card border border-line rounded-xl p-5.5">
            <h3 className="text-xs uppercase tracking-wide text-ink-soft font-bold mb-4.5">
              Selection Funnel — Batch 05
            </h3>
            <FunnelRow label="Applied" percent={100} value={total} color="var(--saffron)" />
            <FunnelRow
              label="Screened"
              percent={total ? 62 : 0}
              value={Math.round(total * 0.62)}
              color="var(--saffron)"
            />
            <FunnelRow
              label="Shortlisted"
              percent={total ? 14 : 0}
              value={Math.round(total * 0.14)}
              color="var(--saffron)"
            />
            <FunnelRow
              label="Interviewed"
              percent={total ? 6 : 0}
              value={Math.round(total * 0.06)}
              color="var(--saffron)"
            />
            <FunnelRow label="Selected" percent={total ? 1 : 0} value={40} color="var(--ink)" last />
          </div>
          <div className="bg-card border border-line rounded-xl p-5.5">
            <h3 className="text-xs uppercase tracking-wide text-ink-soft font-bold mb-4.5">Alerts</h3>
            <Alert>
              <b>{total}</b> application{total === 1 ? "" : "s"} awaiting reviewer assignment.
            </Alert>
            <Alert>
              <b>4 fellows</b> below 85% attendance this month.
            </Alert>
            <Alert tone="good">
              <b>Field visit permissions</b> confirmed for all 3 upcoming districts.
            </Alert>
          </div>
        </div>

        <div className="bg-card border border-line rounded-xl p-5.5">
          <h3 className="text-xs uppercase tracking-wide text-ink-soft font-bold mb-4.5">
            Applications Queue {total > 0 && "(live submissions)"}
          </h3>
          {total === 0 ? (
            <p className="text-ink-soft text-sm py-6 text-center">
              No applications submitted yet — try the{" "}
              <a href="/apply" className="font-semibold text-ink underline">
                Apply flow
              </a>{" "}
              to see one appear here.
            </p>
          ) : (
            <table className="w-full text-[13px] border-collapse">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-ink-soft">
                  <th className="py-2 px-2.5 border-b border-line">Candidate</th>
                  <th className="py-2 px-2.5 border-b border-line">State</th>
                  <th className="py-2 px-2.5 border-b border-line">Focus</th>
                  <th className="py-2 px-2.5 border-b border-line">Status</th>
                  <th className="py-2 px-2.5 border-b border-line">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {applications.slice(0, 12).map((a) => (
                  <tr key={a.id}>
                    <td className="py-2.5 px-2.5 border-b border-line">
                      {a.fullName} <span className="text-ink-soft font-mono text-[11px]">#{a.id}</span>
                    </td>
                    <td className="py-2.5 px-2.5 border-b border-line">{a.state}</td>
                    <td className="py-2.5 px-2.5 border-b border-line">{a.focusArea || "—"}</td>
                    <td className="py-2.5 px-2.5 border-b border-line">
                      <span className="rounded-full bg-amber/10 text-amber text-[10px] font-bold uppercase px-2.5 py-1">
                        {a.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-2.5 border-b border-line">
                      {new Date(a.submittedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

function Kpi({
  label,
  value,
  delta,
  tone = "green",
}: {
  label: string;
  value: string;
  delta: string;
  tone?: "green" | "amber" | "muted";
}) {
  const toneClass =
    tone === "amber" ? "text-amber" : tone === "muted" ? "text-ink-soft" : "text-green";
  return (
    <div className="bg-card border border-line rounded-xl p-4.5">
      <div className="text-[11.5px] text-ink-soft uppercase tracking-wide font-bold">{label}</div>
      <div className="font-serif text-[28px] mt-1.5">{value}</div>
      <div className={`text-[11.5px] mt-1 font-bold ${toneClass}`}>{delta}</div>
    </div>
  );
}

function FunnelRow({
  label,
  percent,
  value,
  color,
  last,
}: {
  label: string;
  percent: number;
  value: number;
  color: string;
  last?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3.5 ${last ? "" : "mb-3"}`}>
      <div className="w-24 text-[12.5px] font-semibold shrink-0">{label}</div>
      <AnimatedBar targetPercent={Math.max(percent, 2)} color={color}>
        <span className="text-[11px] font-bold text-ink">{value.toLocaleString()}</span>
      </AnimatedBar>
    </div>
  );
}

function Alert({
  children,
  tone = "warn",
}: {
  children: React.ReactNode;
  tone?: "warn" | "good";
}) {
  return (
    <div
      className={`flex gap-2.5 p-3 rounded-lg mb-2.5 text-[12.5px] ${
        tone === "good" ? "bg-green/6" : "bg-red/6"
      }`}
    >
      <span>{tone === "good" ? "✓" : "⚠"}</span>
      <span>{children}</span>
    </div>
  );
}
