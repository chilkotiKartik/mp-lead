/**
 * MP LEAD programme photography — supplied by the fellowship.
 * Captions describe only what is visible in each frame; no dates, names or
 * events are asserted beyond what the photographs and their banners show.
 */

export type Photo = {
  src: string;
  alt: string;
  caption: string;
};

export const photos = {
  founderAddress: {
    src: "/images/mplead-founder-address.jpg",
    alt: "Dr. Ajeet Madhavrao Gopchade addressing the MP LEAD Fellowship induction programme",
    caption: "Founder's address, Induction Programme",
  },
  auditorium: {
    src: "/images/mplead-auditorium.jpg",
    alt: "MP LEAD fellows seated in an auditorium during a session",
    caption: "The cohort in session",
  },
  cohortRoom: {
    src: "/images/mplead-cohort-room.jpg",
    alt: "Fellows seated around a conference table beneath an MP LEAD Fellowship banner",
    caption: "Cohort convening",
  },
  groupPortrait: {
    src: "/images/mplead-group-portrait.jpg",
    alt: "MP LEAD fellows with the fellowship founder at the induction programme",
    caption: "Induction, MP LEAD Fellowship",
  },
  inductionStage: {
    src: "/images/mplead-induction-stage.jpg",
    alt: "The MP LEAD induction programme panel seated on stage",
    caption: "Induction Programme",
  },
  fellowsListening: {
    src: "/images/mplead-fellows-listening.jpg",
    alt: "MP LEAD fellows seated together, one speaking into a microphone",
    caption: "Fellows in discussion",
  },
  fellowSpeaking: {
    src: "/images/mplead-fellow-speaking.jpg",
    alt: "A fellow addressing the panel across the conference table",
    caption: "A fellow puts a question",
  },
  fellowQuestion: {
    src: "/images/mplead-fellow-question.jpg",
    alt: "A fellow speaking into a microphone during a panel session",
    caption: "Open floor",
  },
  panelSession: {
    src: "/images/mplead-panel-session.jpg",
    alt: "MP LEAD Fellowship panel session beneath the programme banner",
    caption: "Programme session",
  },
  founderPanel: {
    src: "/images/mplead-founder-panel.jpg",
    alt: "The fellowship founder and panel members at an MP LEAD session",
    caption: "Panel, MP LEAD Fellowship",
  },
  officialsPanel: {
    src: "/images/mplead-officials-panel.jpg",
    alt: "Officials seated at an MP LEAD Fellowship session with the State Emblem of India",
    caption: "Institutional session",
  },
  haryanaBhawan: {
    src: "/images/mplead-haryana-bhawan.jpg",
    alt: "An MP LEAD institutional engagement at Haryana Bhawan",
    caption: "Institutional engagement, Haryana Bhawan",
  },
  interview: {
    src: "/images/mplead-interview.jpg",
    alt: "A candidate in conversation with the selection panel across the table",
    caption: "Selection conversation",
  },
} as const satisfies Record<string, Photo>;

/** Ordered reel for galleries. */
export const gallery: Photo[] = [
  photos.founderAddress,
  photos.auditorium,
  photos.groupPortrait,
  photos.fellowsListening,
  photos.cohortRoom,
  photos.inductionStage,
  photos.fellowSpeaking,
  photos.officialsPanel,
  photos.haryanaBhawan,
  photos.fellowQuestion,
  photos.panelSession,
  photos.interview,
];
