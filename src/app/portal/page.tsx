import type { Metadata } from "next";
import { AnimatedBar } from "@/components/AnimatedBar";

export const metadata: Metadata = { title: "Fellow Portal — MP LEAD" };

const navItems = [
  "Dashboard",
  "My Profile",
  "My Fellowship",
  "Tasks",
  "Projects",
  "Attendance",
  "Events",
  "Mentorship",
  "Resources",
  "Announcements",
  "Fellow Directory",
  "Certificate & LOR",
];

const journeySteps = [
  { label: "Orient.", done: true },
  { label: "Training", done: true },
  { label: "Workshops", done: true },
  { label: "Institutions", done: true },
  { label: "Field", done: false, now: true },
  { label: "Mentorship", done: false },
  { label: "Research", done: false },
  { label: "Project", done: false },
  { label: "Grad.", done: false },
];

const tasks = [
  { name: "Submit field interview log (Week 5)", due: "Due today, 11:59 PM", status: "Pending", tone: "amber" },
  { name: "Mentor check-in — [Mentor Name]", due: "Today, 4:00 PM", status: "Confirmed", tone: "green" },
  { name: "Peer review: Batch project brief", due: "Due tomorrow", status: "Pending", tone: "amber" },
  { name: "Workshop reflection (Week 3)", due: "2 days overdue", status: "Overdue", tone: "red" },
];

export default function PortalPage() {
  return (
    <div className="min-h-screen grid md:grid-cols-[248px_1fr] bg-paper text-ink">
      <aside className="hidden md:flex flex-col gap-1 bg-ink text-paper p-5">
        <div className="font-serif text-lg px-2.5 pb-6">MP LEAD</div>
        {navItems.map((item, i) => (
          <div
            key={item}
            className={`px-3 py-2.5 rounded-lg text-[13.5px] font-semibold cursor-pointer ${
              i === 0 ? "bg-saffron text-ink" : "text-paper/70 hover:bg-white/5 hover:text-white"
            }`}
          >
            {item}
          </div>
        ))}
      </aside>

      <main className="p-6 md:p-10 pb-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif font-medium text-[28px]">Welcome back, [Fellow Name]</h1>
            <p className="text-ink-soft text-sm mt-1">Batch 04 · Maharashtra · Day 34 of 60</p>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-serif font-semibold text-white bg-[linear-gradient(150deg,oklch(0.5_0.13_45),oklch(0.3_0.1_24))]">
            F
          </div>
        </div>

        <div className="grid md:grid-cols-[2fr_1fr] gap-6 mb-6">
          <div className="bg-card border border-line rounded-xl p-6">
            <h3 className="text-xs uppercase tracking-wide text-ink-soft font-bold mb-4.5">
              Fellowship Progress
            </h3>
            <AnimatedBar targetPercent={58} color="var(--saffron)" />
            <p className="text-[13px] text-ink-soft mt-2.5">
              58% complete — currently in Field Engagement
            </p>
            <div className="flex justify-between mt-5">
              {journeySteps.map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-1.5 flex-1">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      s.done ? "bg-saffron" : s.now ? "bg-ink ring-4 ring-ink/10" : "bg-line"
                    }`}
                  />
                  <div className="text-[9px] text-ink-soft text-center">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card border border-line rounded-xl p-6">
            <h3 className="text-xs uppercase tracking-wide text-ink-soft font-bold mb-4.5">
              Attendance
            </h3>
            <div className="flex gap-5 text-center">
              <div className="flex-1">
                <div className="font-serif text-[32px]">96%</div>
                <div className="text-[11px] text-ink-soft uppercase">Overall</div>
              </div>
              <div className="flex-1">
                <div className="font-serif text-[32px]">33</div>
                <div className="text-[11px] text-ink-soft uppercase">Present</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[2fr_1fr] gap-6 mb-6">
          <div className="bg-card border border-line rounded-xl p-6">
            <h3 className="text-xs uppercase tracking-wide text-ink-soft font-bold mb-4.5">
              Today&apos;s Priorities
            </h3>
            {tasks.map((t) => (
              <div
                key={t.name}
                className="flex justify-between items-center py-3.5 border-b border-line last:border-0"
              >
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-ink-soft">{t.due}</div>
                </div>
                <span
                  className="rounded-full text-[10.5px] font-bold uppercase px-2.5 py-1"
                  style={{
                    color: `var(--${t.tone})`,
                    background: `color-mix(in oklch, var(--${t.tone}) 12%, transparent)`,
                  }}
                >
                  {t.status}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-card border border-line rounded-xl p-6">
            <h3 className="text-xs uppercase tracking-wide text-ink-soft font-bold mb-4.5">
              Your Mentor
            </h3>
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-full shrink-0 bg-[linear-gradient(150deg,oklch(0.42_0.09_260),oklch(0.24_0.06_265))]" />
              <div>
                <div className="font-bold text-sm">[Mentor Name]</div>
                <div className="text-xs text-ink-soft">Water Governance · Rajasthan</div>
              </div>
            </div>
            <button className="w-full mt-4 rounded-lg border border-line py-2.5 text-sm font-bold cursor-pointer hover:border-ink">
              Schedule a Meeting
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-[2fr_1fr] gap-6">
          <div className="bg-card border border-line rounded-xl p-6">
            <h3 className="text-xs uppercase tracking-wide text-ink-soft font-bold mb-3">
              Project Workspace — Water Governance in Rajasthan
            </h3>
            <span className="inline-block rounded-full bg-green/10 text-green text-[10.5px] font-bold uppercase px-2.5 py-1 mb-4">
              On Track
            </span>
            <AnimatedBar targetPercent={70} color="var(--ink)" />
            <p className="text-[13px] text-ink-soft mt-2.5">
              70% — Fieldwork complete, drafting insights
            </p>
          </div>
          <div className="bg-card border border-line rounded-xl p-6">
            <h3 className="text-xs uppercase tracking-wide text-ink-soft font-bold mb-4.5">
              Announcements
            </h3>
            <div className="pb-3.5 mb-3.5 border-b border-line">
              <div className="font-semibold text-[13px]">
                Batch 04 field-visit reimbursements open
              </div>
              <div className="text-[11.5px] text-ink-soft">Fellowship Admin · 2 days ago</div>
            </div>
            <div>
              <div className="font-semibold text-[13px]">
                Mid-fellowship review scheduled for Week 6
              </div>
              <div className="text-[11.5px] text-ink-soft">Fellowship Admin · 4 days ago</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
