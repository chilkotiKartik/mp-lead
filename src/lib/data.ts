export const stats = [
  { value: 5000, suffix: "+", label: "Applicants" },
  { value: 40, suffix: "", label: "Fellows Selected" },
  { value: 62, suffix: "%", label: "Women Fellows" },
  { value: 2, suffix: " Mo", label: "Duration" },
] as const;

type JourneyStage = {
  week: string;
  title: string;
  body: string;
  tint: string;
  image?: string;
};

export const journeyStages: JourneyStage[] = [
  {
    week: "Week 1",
    title: "Orientation",
    body: "Fellows arrive, meet their batch, and are introduced to the fellowship's structure, expectations and the institutions they'll engage with.",
    tint: "linear-gradient(155deg, oklch(0.42 0.09 260), oklch(0.22 0.06 265))",
  },
  {
    week: "Weeks 2–3",
    title: "Training",
    body: "Structured sessions on public policy fundamentals, governance frameworks, and research methods for field engagement.",
    tint: "linear-gradient(155deg, oklch(0.5 0.13 45), oklch(0.3 0.1 24))",
  },
  {
    week: "Weeks 3–4",
    title: "Workshops",
    body: "Hands-on workshops with practitioners across policy, communication and administration sharpen the fellows' working skillset.",
    tint: "linear-gradient(155deg, oklch(0.4 0.1 150), oklch(0.24 0.06 150))",
  },
  {
    week: "Weeks 4–5",
    title: "Institutional Exposure",
    body: "Direct exposure to constitutional offices and ministries — observing protocol, process and the machinery of the state.",
    tint: "linear-gradient(155deg, oklch(0.45 0.1 200), oklch(0.26 0.07 210))",
    image: "/images/inst-south-block.jpg",
  },
  {
    week: "Weeks 5–6",
    title: "Field Engagement",
    body: "Fellows travel to their project districts for ground-level fieldwork — interviews, site visits and data collection.",
    tint: "linear-gradient(155deg, oklch(0.55 0.14 90), oklch(0.34 0.09 60))",
  },
  {
    week: "Ongoing",
    title: "Mentorship",
    body: "Each fellow is paired with a mentor for regular guidance on their research question, fieldwork and final project direction.",
    tint: "linear-gradient(155deg, oklch(0.38 0.11 22), oklch(0.22 0.07 20))",
  },
  {
    week: "Weeks 6–7",
    title: "Research",
    body: "Fieldwork is synthesised into structured findings, insights and draft policy recommendations under mentor review.",
    tint: "linear-gradient(155deg, oklch(0.42 0.09 260), oklch(0.28 0.08 240))",
  },
  {
    week: "Week 8",
    title: "Final Project",
    body: "Fellows deliver a final report and presentation — a concrete, actionable contribution to their focus area.",
    tint: "linear-gradient(155deg, oklch(0.5 0.13 45), oklch(0.34 0.09 60))",
  },
  {
    week: "Week 8",
    title: "Graduation",
    body: "Fellows graduate into the MP LEAD alumni network — carrying the fellowship's perspective into their careers.",
    tint: "linear-gradient(155deg, oklch(0.4 0.1 150), oklch(0.26 0.07 210))",
    image: "/images/hero-india-gate.jpg",
  },
];

export const institutions = [
  {
    name: "Rashtrapati Bhavan",
    tag: "The Presidential Estate",
    image: "/images/inst-rashtrapati-bhavan.jpg",
  },
  {
    name: "South Block",
    tag: "Ministry of External Affairs & Cabinet Secretariat",
    image: "/images/inst-south-block.jpg",
  },
  {
    name: "Supreme Court of India",
    tag: "Constitutional Institutions",
    image: "/images/inst-supreme-court.jpg",
  },
] as const;

export const fellows = [
  { id: "f01", initial: "A", batch: "Batch 04", state: "Maharashtra", focus: "Public Health Policy", tint: "linear-gradient(150deg, oklch(0.5 0.13 45), oklch(0.32 0.1 24))" },
  { id: "f02", initial: "B", batch: "Batch 04", state: "Tamil Nadu", focus: "Urban Mobility", tint: "linear-gradient(150deg, oklch(0.4 0.1 150), oklch(0.24 0.06 150))" },
  { id: "f03", initial: "C", batch: "Batch 04", state: "Bihar", focus: "Rural Education", tint: "linear-gradient(150deg, oklch(0.42 0.09 260), oklch(0.22 0.06 265))" },
  { id: "f04", initial: "D", batch: "Batch 04", state: "Assam", focus: "Climate Resilience", tint: "linear-gradient(150deg, oklch(0.55 0.14 90), oklch(0.34 0.09 60))" },
  { id: "f05", initial: "E", batch: "Batch 04", state: "Rajasthan", focus: "Water Governance", tint: "linear-gradient(150deg, oklch(0.45 0.1 200), oklch(0.26 0.07 210))" },
  { id: "f06", initial: "F", batch: "Batch 04", state: "Punjab", focus: "Local Governance", tint: "linear-gradient(150deg, oklch(0.38 0.11 22), oklch(0.22 0.07 20))" },
  { id: "f07", initial: "G", batch: "Batch 04", state: "Kerala", focus: "Digital Inclusion", tint: "linear-gradient(150deg, oklch(0.5 0.1 300), oklch(0.28 0.08 300))" },
  { id: "f08", initial: "H", batch: "Batch 04", state: "Punjab", focus: "Agriculture", tint: "linear-gradient(150deg, oklch(0.48 0.12 130), oklch(0.28 0.08 130))" },
] as const;

export const projects = [
  {
    id: "p01",
    tag: "Public Health",
    title: "Last-Mile Immunisation in Tribal Blocks",
    body: "A district-level study on cold-chain gaps and community trust, producing field-tested recommendations adopted by two block offices.",
    figures: [
      { value: "3", label: "Districts" },
      { value: "60+", label: "Interviews" },
      { value: "1", label: "Policy Brief" },
    ],
    tint: "linear-gradient(155deg, oklch(0.5 0.13 45), oklch(0.3 0.1 24))",
  },
  {
    id: "p02",
    tag: "Urban Governance",
    title: "Municipal Grievance Redressal Redesign",
    body: "Mapping citizen complaint flows across a mid-sized municipal corporation to cut average resolution time.",
    figures: [
      { value: "1", label: "City" },
      { value: "8", label: "Wards" },
      { value: "40%", label: "Faster Target" },
    ],
    tint: "linear-gradient(155deg, oklch(0.45 0.1 200), oklch(0.26 0.07 210))",
  },
] as const;

export const categories = [
  { href: "/fellowship", label: "Fellowship", caption: "Two months, nine stages, one cohort", image: "/images/inst-south-block.jpg" },
  { href: "/journey", label: "Journey", caption: "Orientation to graduation, scrolled", image: "/images/inst-rashtrapati-bhavan.jpg" },
  { href: "/institutions", label: "Institutions", caption: "The offices that shape the republic", image: "/images/inst-supreme-court.jpg" },
  { href: "/fellows", label: "Fellows", caption: "Forty voices, eighteen states", image: "/images/jaipur-hawa-mahal.jpg" },
  { href: "/projects", label: "Projects", caption: "Field research that meets the ground", image: "/images/delhi-connaught.jpg" },
  { href: "/events", label: "Events", caption: "Workshops, visits and convenings", image: "/images/hero-india-gate.jpg" },
  { href: "/stories", label: "Stories", caption: "Dispatches from the cohort", image: "/images/hampi.jpg" },
  { href: "/alumni", label: "Alumni", caption: "Where fellows go next", image: "/images/india-gate-night.jpg" },
] as const;
