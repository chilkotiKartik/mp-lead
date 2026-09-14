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
  image: string;
  alt: string;
  caption: string;
};

export const journeyStages: JourneyStage[] = [
  {
    week: "Week 1",
    title: "Orientation",
    body: "Fellows arrive, meet their batch, and are introduced to the fellowship's structure, expectations and the institutions they'll engage with.",
    image: "/images/mplead-founder-address.jpg",
    alt: "The fellowship founder addressing the MP LEAD induction programme",
    caption: "Founder's address, Induction Programme",
  },
  {
    week: "Weeks 2–3",
    title: "Training",
    body: "Structured sessions on public policy fundamentals, governance frameworks, and research methods for field engagement.",
    image: "/images/mplead-auditorium.jpg",
    alt: "MP LEAD fellows seated in an auditorium during a training session",
    caption: "The cohort in session",
  },
  {
    week: "Weeks 3–4",
    title: "Workshops",
    body: "Hands-on workshops with practitioners across policy, communication and administration sharpen the fellows' working skillset.",
    image: "/images/mplead-fellows-listening.jpg",
    alt: "Fellows seated together, one speaking into a microphone",
    caption: "Fellows in discussion",
  },
  {
    week: "Weeks 4–5",
    title: "Institutional Exposure",
    body: "Direct exposure to constitutional offices and ministries — observing protocol, process and the machinery of the state.",
    image: "/images/mplead-officials-panel.jpg",
    alt: "Officials seated at an MP LEAD session with the State Emblem of India",
    caption: "Institutional session",
  },
  {
    week: "Weeks 5–6",
    title: "Field Engagement",
    body: "Fellows travel to their project districts for ground-level fieldwork — interviews, site visits and data collection.",
    image: "/images/mplead-haryana-bhawan.jpg",
    alt: "An MP LEAD institutional engagement at Haryana Bhawan",
    caption: "Institutional engagement, Haryana Bhawan",
  },
  {
    week: "Ongoing",
    title: "Mentorship",
    body: "Each fellow is paired with a mentor for regular guidance on their research question, fieldwork and final project direction.",
    image: "/images/mplead-interview.jpg",
    alt: "A fellow in conversation with a panel across the table",
    caption: "One-to-one guidance",
  },
  {
    week: "Weeks 6–7",
    title: "Research",
    body: "Fieldwork is synthesised into structured findings, insights and draft policy recommendations under mentor review.",
    image: "/images/mplead-fellow-speaking.jpg",
    alt: "A fellow presenting to the panel across the conference table",
    caption: "Presenting findings",
  },
  {
    week: "Week 8",
    title: "Final Project",
    body: "Fellows deliver a final report and presentation — a concrete, actionable contribution to their focus area.",
    image: "/images/mplead-fellow-question.jpg",
    alt: "A fellow speaking into a microphone during a panel session",
    caption: "Final presentations",
  },
  {
    week: "Week 8",
    title: "Graduation",
    body: "Fellows graduate into the MP LEAD alumni network — carrying the fellowship's perspective into their careers.",
    image: "/images/mplead-group-portrait.jpg",
    alt: "MP LEAD fellows with the fellowship founder at the induction programme",
    caption: "Induction, MP LEAD Fellowship",
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
    image: "/images/mplead-fellows-listening.jpg",
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
    image: "/images/mplead-cohort-room.jpg",
  },
] as const;

export const categories = [
  { href: "/fellowship", label: "Fellowship", caption: "Two months, nine stages, one cohort", image: "/images/inst-south-block.jpg" },
  { href: "/journey", label: "Journey", caption: "Orientation to graduation, scrolled", image: "/images/mplead-founder-address.jpg" },
  { href: "/institutions", label: "Institutions", caption: "The offices that shape the republic", image: "/images/inst-supreme-court.jpg" },
  { href: "/fellows", label: "Fellows", caption: "Forty voices, eighteen states", image: "/images/mplead-auditorium.jpg" },
  { href: "/projects", label: "Projects", caption: "Field research that meets the ground", image: "/images/delhi-connaught.jpg" },
  { href: "/events", label: "Events", caption: "Workshops, visits and convenings", image: "/images/mplead-cohort-room.jpg" },
  { href: "/stories", label: "Stories", caption: "Dispatches from the cohort", image: "/images/mplead-fellows-listening.jpg" },
  { href: "/alumni", label: "Alumni", caption: "Where fellows go next", image: "/images/mplead-group-portrait.jpg" },
] as const;
