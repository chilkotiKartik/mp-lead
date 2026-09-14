/**
 * What the fellowship says about itself.
 *
 * No fellow testimonial is published until that fellow has submitted it and
 * consented to appear, so nothing here is attributed to a named person or
 * presented as a personal quote. Each entry is a statement of what the
 * programme offers, drawn from MP LEAD's own published programme description,
 * paired only with figures that are verified. Submitted reflections replace
 * this set from the admin console.
 */

export type Voice = {
  statement: string;
  source: string;
  figure?: { value: string; label: string };
  image: string;
};

export const voices: Voice[] = [
  {
    statement:
      "Fellows are placed inside constitutional offices and ministries — not as visitors on a tour, but as participants with a seat in the room.",
    source: "Programme note — Institutional Exposure",
    figure: { value: "18", label: "States represented" },
    image: "/images/mplead-officials-panel.jpg",
  },
  {
    statement:
      "The cohort is deliberately small. Forty fellows are selected from more than five thousand applications so that every one of them is actually in the room.",
    source: "Programme note — Selection",
    figure: { value: "5,000+", label: "Applications received" },
    image: "/images/mplead-interview.jpg",
  },
  {
    statement:
      "Before opinion comes attention. Fellows watch how decisions are assembled: the files, the protocol, the sequencing, the people.",
    source: "Programme note — Observation",
    image: "/images/mplead-panel-session.jpg",
  },
  {
    statement:
      "Every fellow carries a district-level project from problem framing through fieldwork to a policy-relevant deliverable — research that has to survive contact with the ground.",
    source: "Programme note — Field Research",
    figure: { value: "2", label: "Months, end to end" },
    image: "/images/mplead-haryana-bhawan.jpg",
  },
  {
    statement:
      "Fellows leave able to hold two things at once: how governance is meant to work, and how it works on a Tuesday afternoon.",
    source: "Programme note — Perspective",
    figure: { value: "62%", label: "Women fellows" },
    image: "/images/mplead-group-portrait.jpg",
  },
];
