export const profile = {
  name: "Ujen Basi",
  role: "Full Stack OCD Developer",
  location: "Kathmandu, Nepal",
  timezone: "Asia/Kathmandu",
  email: "ujenbasi1122@gmail.com",
  phone: "+977 9818123191",
  siteUrl: "https://ujenbasi.vercel.app",
  resume: "/resume.pdf",

  available: true,

  /** Mirrors the cal.com event so the card can render without loading Cal. */
  booking: {
    calLink: "ujen51743/chit-chat",
    title: "Chit Chat about idea",
    description:
      "What is in your mind? Let's get the idea out into the real world and build something which holds a story and value. :)",
    durations: [15, 30, 45],
    defaultDuration: 45,
    location: "Google Meet",
  },

  intro:
    "I work across the whole stack — and love taking full ownership of the product from level 0.",

  socials: [
    {
      label: "GitHub",
      href: "https://github.com/ujen5173",
      handle: "ujen5173",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/ujen5173",
      handle: "in/ujen5173",
    },
    { label: "Résumé", href: "/resume.pdf", handle: "PDF" },
  ],
} as const;

/** Headline numbers for the stat band. Kept honest and verifiable. */
export const stats = [
  {
    value: 4,
    suffix: "+",
    label: "Years writing code",
    detail: "Since 2023 from a BCA student into professional.",
  },
  {
    value: 100,
    suffix: "+",
    label: "Stars on Hash",
    detail: "A Hashnode clone that was made very early on my journey.",
  },
  {
    value: 4,
    suffix: "",
    label: "Roles in one RBAC model",
    detail: "CEO, HR, Manager, Employee. with escalation protection.",
  },
  {
    value: Infinity,
    suffix: "",
    label: "Curosity",
    detail: "I actually love tech and how it works.",
  },
] as const;

/** How I work. Plain statements, no manifesto. */
export const principles = [
  {
    title: "Model the data first",
    icon: "schema",
    body: "User Interfaces comes [1], schemas comes [0]. I spend the first day understanding and designing the whole platform in my mind first, spanning from how the product backend and data flow should be to how the platform should look.",
  },
  {
    title: "Design with intention",
    icon: "grid",
    body: "Design is what excites me most. I obsess over the little details because they're what make a product feel complete. Every interaction, spacing, animation, and visual decision should have a purpose. If the experience doesn't feel right, I'm not finished yet. I have OCD btw :)",
  },
  {
    title: "Build what I admire",
    icon: "anchor",
    body: "I build products that I genuinely enjoy using. When the interface feels elegant and the experience is satisfying, it motivates me to keep refining every detail. I often find myself pausing just to appreciate how everything comes together.",
  },
  {
    title: "Architecture before interface",
    icon: "grid",
    body: "A great frontend is built on a great backend. I prefer solving the architecture, APIs, and data flow first. Once the foundation is solid, building the interface becomes faster, cleaner, and far more enjoyable.",
  },
  {
    title: "Refine relentlessly",
    icon: "book",
    body: "Code rarely ends up perfect on the first attempt. I revisit, simplify, and improve my work continuously. Before replacing something, I try to understand why it exists and what problem it originally solved.",
  },
  {
    title: "Shipping isn't the finish line",
    icon: "pulse",
    body: "A feature isn't truly finished when it's merged—it's finished when real people use it successfully. Watching users interact with a product reveals edge cases, assumptions, and opportunities that no amount of planning can predict.",
  },
] as const;

/** The human section — short, specific, no filler. */
export const beyondCode = [
  {
    title: "I build products to learn",
    body: "Hash started as a question about how Hashnode actually works and ended up with 100+ stars. Rebuilding something you admire teaches more than any tutorial.",
  },
  {
    title: "Brainstroming beyond",
    body: "I can't stop thinking of ideas a software could solve - there is not a night i slept without thinking what my next project would be.",
  },
  {
    title: "Hiking, Games and Novels",
    body: "Coders must touch grass, so i hike with my buddies to mountains if i really need a break. Love late night gaming and reading books. Nerd++",
  },
  {
    title: "Spending time with loved ones.",
    body: "My favourite part of the day is to stop about tech and spend quality time with my loved ones and have alone time to escape from reality.",
  },
  {
    title: "Robotics",
    body: "As you know Curosity drives in my blood, Robotics and robots are what made me get into tech. Not Iron man though, but robots from china, their tech. Robotics is a field where i live and thrieve.",
  },
  {
    title: "+05:45",
    body: "Kathmandu sits on a 45-minute offset, which breaks roughly half the scheduling libraries I've used. The mountains make up for it.",
  },
] as const;
