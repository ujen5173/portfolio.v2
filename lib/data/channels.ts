export type Channel = {
  name: string;
  handle: string;
  url: string;
  /** Short topic tag shown next to the name in the index. */
  topic: string;
  /** Only the featured few carry a note. */
  note?: string;
};

/**
 * Avatars live in public/channels/<handle>.jpg, populated by
 * `node scripts/fetch-channel-avatars.mjs`. Derived from the handle so the
 * data and the files can't drift apart.
 */
export const avatarFor = (channel: Channel) =>
  `/channels/${channel.handle.replace(/^@/, "")}.jpg`;

/**
 * The handful that actually shaped how I write code. These get a sentence.
 */
export const featuredChannels: Channel[] = [
  {
    name: "Akshay Saini",
    handle: "@akshaymarch7",
    url: "https://www.youtube.com/@akshaymarch7",
    topic: "JavaScript",
    note: "Where JavaScript stopped being syntax I copied and started being a language I understood. The deep-dive series is gold.",
  },
  {
    name: "PedroTech",
    handle: "@PedroTechnologies",
    url: "https://www.youtube.com/@PedroTechnologies",
    topic: "Full stack",
    note: "The clearest explanations I've found for full-stack work. If one channel taught me how the pieces fit together, it was this one.",
  },
  {
    name: "Net Ninja",
    handle: "@NetNinja",
    url: "https://www.youtube.com/@NetNinja",
    topic: "Full stack",
    note: "A living legend. Structured, patient courses that never skip the boring middle — which is usually the part that matters.",
  },
  {
    name: "JavaScript Mastery",
    handle: "@javascriptmastery",
    url: "https://www.youtube.com/@javascriptmastery",
    topic: "React / Next.js",
    note: "Full application builds, start to deploy. The fastest way I found to see how a real project is actually assembled.",
  },
  {
    name: "Kevin Powell",
    handle: "@KevinPowell",
    url: "https://www.youtube.com/@KevinPowell",
    topic: "CSS",
    note: "The reason I stopped fighting CSS and started designing with it. Everything I know about layout traces back here.",
  },
];

/** Still in rotation — the wider index. */
export const otherChannels: Channel[] = [
  {
    name: "freeCodeCamp",
    handle: "@freecodecamp",
    url: "https://www.youtube.com/@freecodecamp",
    topic: "Everything",
  },
  {
    name: "Traversy Media",
    handle: "@TraversyMedia",
    url: "https://www.youtube.com/@TraversyMedia",
    topic: "Full stack",
  },
  {
    name: "Codevolution",
    handle: "@Codevolution",
    url: "https://www.youtube.com/@Codevolution",
    topic: "React / Next.js",
  },
  {
    name: "Web Dev Simplified",
    handle: "@WebDevSimplified",
    url: "https://www.youtube.com/@WebDevSimplified",
    topic: "JavaScript",
  },
  {
    name: "Wes Bos",
    handle: "@WesBos",
    url: "https://www.youtube.com/@WesBos",
    topic: "JavaScript",
  },
  {
    name: "dcode",
    handle: "@dcode-software",
    url: "https://www.youtube.com/@dcode-software",
    topic: "JavaScript",
  },
  {
    name: "Hyperplexed",
    handle: "@Hyperplexed",
    url: "https://www.youtube.com/@Hyperplexed",
    topic: "Design",
  },
  {
    name: "DesignCourse",
    handle: "@DesignCourse",
    url: "https://www.youtube.com/@DesignCourse",
    topic: "Design",
  },
  {
    name: "Developed by Ed",
    handle: "@developedbyed",
    url: "https://www.youtube.com/@developedbyed",
    topic: "Frontend",
  },
  {
    name: "Online Tutorials",
    handle: "@OnlineTutorialsYT",
    url: "https://www.youtube.com/@OnlineTutorialsYT",
    topic: "CSS",
  },
  {
    name: "CodingNepal",
    handle: "@CodingNepal",
    url: "https://www.youtube.com/@CodingNepal",
    topic: "HTML / CSS",
  },
  {
    name: "CodingLab",
    handle: "@CodingLabYT",
    url: "https://www.youtube.com/@CodingLabYT",
    topic: "CSS",
  },
  {
    name: "Lama Dev",
    handle: "@LamaDev",
    url: "https://www.youtube.com/@LamaDev",
    topic: "Full stack",
  },
  {
    name: "Coding in Flow",
    handle: "@codinginflow",
    url: "https://www.youtube.com/@codinginflow",
    topic: "Full stack",
  },
  {
    name: "Hitesh Choudhary",
    handle: "@HiteshCodeLab",
    url: "https://www.youtube.com/@HiteshCodeLab",
    topic: "Full stack",
  },
  {
    name: "Tech With Tim",
    handle: "@TechWithTim",
    url: "https://www.youtube.com/@TechWithTim",
    topic: "Python",
  },
  {
    name: "CoderOne",
    handle: "@CoderOne",
    url: "https://www.youtube.com/@CoderOne",
    topic: "Advanced",
  },
  {
    name: "Fireship",
    handle: "@Fireship",
    url: "https://www.youtube.com/@Fireship",
    topic: "Tech news",
  },
];
