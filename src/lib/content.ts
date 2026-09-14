/**
 * Programme content. Every entry below is drawn from MP LEAD's own published
 * programme structure. Specifics that are not yet verified (dates, venues,
 * speaker names) are left as bracketed placeholders for the CMS to fill —
 * nothing here is invented.
 */

export type ProgrammeEvent = {
  id: string;
  title: string;
  kind: "Orientation" | "Workshop" | "Institutional Visit" | "Field" | "Convening";
  stage: string;
  date: string;
  venue: string;
  summary: string;
  image: string;
};

export const events: ProgrammeEvent[] = [
  {
    id: "e01",
    title: "Cohort Orientation",
    kind: "Orientation",
    stage: "Week 1",
    date: "[Date TBC]",
    venue: "[Venue TBC]",
    summary:
      "The batch meets for the first time. Fellowship structure, expectations and the institutions ahead are introduced.",
    image: "/images/mplead-founder-address.jpg",
  },
  {
    id: "e02",
    title: "Public Policy Foundations",
    kind: "Workshop",
    stage: "Weeks 2–3",
    date: "[Date TBC]",
    venue: "[Venue TBC]",
    summary:
      "Structured sessions on policy fundamentals, governance frameworks and research methods before fieldwork begins.",
    image: "/images/mplead-auditorium.jpg",
  },
  {
    id: "e03",
    title: "Institutional Exposure Week",
    kind: "Institutional Visit",
    stage: "Weeks 4–5",
    date: "[Date TBC]",
    venue: "New Delhi",
    summary:
      "Direct engagement with constitutional offices and ministries — observing protocol, process and the machinery of the state.",
    image: "/images/mplead-officials-panel.jpg",
  },
  {
    id: "e04",
    title: "District Field Engagement",
    kind: "Field",
    stage: "Weeks 5–6",
    date: "[Date TBC]",
    venue: "Project districts",
    summary:
      "Fellows travel to their project districts for ground-level fieldwork — interviews, site visits and data collection.",
    image: "/images/mplead-haryana-bhawan.jpg",
  },
  {
    id: "e05",
    title: "Final Project Presentations",
    kind: "Convening",
    stage: "Week 8",
    date: "[Date TBC]",
    venue: "[Venue TBC]",
    summary:
      "Each fellow presents their final report and recommendations to a review panel at the close of the fellowship.",
    image: "/images/mplead-fellow-speaking.jpg",
  },
  {
    id: "e06",
    title: "Graduation & Alumni Induction",
    kind: "Convening",
    stage: "Week 8",
    date: "[Date TBC]",
    venue: "[Venue TBC]",
    summary:
      "Fellows graduate into the MP LEAD alumni network, carrying the fellowship's perspective into their careers.",
    image: "/images/mplead-group-portrait.jpg",
  },
];

export type Story = {
  id: string;
  title: string;
  category: "Dispatch" | "Reflection" | "Field Notes" | "Programme";
  excerpt: string;
  image: string;
  readingTime: string;
};

export const stories: Story[] = [
  {
    id: "s01",
    title: "What the corridors teach you that the syllabus cannot",
    category: "Reflection",
    excerpt:
      "Observing a ministry at work reframes what policy actually is — less a document, more a negotiation between people, files and time.",
    image: "/images/mplead-officials-panel.jpg",
    readingTime: "6 min",
  },
  {
    id: "s02",
    title: "Sixty interviews, three districts, one question",
    category: "Field Notes",
    excerpt:
      "Field engagement turns a research question into a set of conversations — and most of what matters is in what people do not say.",
    image: "/images/mplead-haryana-bhawan.jpg",
    readingTime: "8 min",
  },
  {
    id: "s03",
    title: "The distance between a policy brief and a block office",
    category: "Dispatch",
    excerpt:
      "A recommendation only becomes real when it survives contact with the people who have to implement it.",
    image: "/images/mplead-fellow-speaking.jpg",
    readingTime: "5 min",
  },
  {
    id: "s04",
    title: "How the cohort is selected",
    category: "Programme",
    excerpt:
      "From over five thousand applications to a cohort of forty — the screening, shortlisting and interview process explained.",
    image: "/images/mplead-interview.jpg",
    readingTime: "4 min",
  },
];

/** The four-beat framing of institutional exposure. */
export const exposureBeats = [
  {
    beat: "Access",
    body: "Fellows are placed inside constitutional offices and ministries — not as visitors on a tour, but as participants with a seat in the room.",
  },
  {
    beat: "Observation",
    body: "Before opinion comes attention. Fellows watch how decisions are actually assembled: the files, the protocol, the sequencing, the people.",
  },
  {
    beat: "Learning",
    body: "Structured debriefs turn observation into understanding — connecting what was seen to the frameworks studied in training.",
  },
  {
    beat: "Perspective",
    body: "Fellows leave able to hold two things at once: how governance is meant to work, and how it works on a Tuesday afternoon.",
  },
] as const;
