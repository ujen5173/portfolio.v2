/** The things I open every day. */
export const dailyDrivers = [
  {
    name: "VS Code | Zed",
    role: "Editor",
    note: "Where almost everything gets written. Tuned once, then left alone. Love Zed performance and VS Code ecosystem",
  },
  {
    name: "Obsidian",
    role: "Idea Vault",
    note: "Half-formed ideas, tons of unfulfilled projects, and a project list I never finish—or even start. Basically, a project graveyard and an idea black hole that somehow keeps getting bigger.",
  },
  {
    name: "Claude Code",
    role: "Coding Partner",
    note: "Effective Coding partner and brainstromer. Gets boring things done quickly but needs to be reviewed and directed.",
  },
  {
    name: "Chiya (Nepali Tea)",
    role: "Drive",
    note: "Preffers tea over coffee. Can't start my day without it.",
  },
  {
    name: "Git + GitHub",
    role: "Version control",
    note: "Small commits, readable history, and pull requests as the quality gate.",
  },
  {
    name: "pnpm",
    role: "Packages",
    note: "Fast installs and a lockfile that doesn't start arguments.",
  },
  {
    name: "Windows & Fedora",
    role: "Device",
    note: "Soon will get a mac though. Or Buy me one plzzzz :(",
  },
] as const;

/** How the editor actually looks and feels. */
export const editorSetup = [
  { label: "Theme", value: "Omni" },
  { label: "Icons", value: "Material Icon Theme" },
  { label: "Font", value: "Geist Mono" },
  { label: "Ligatures", value: "On" },
] as const;

/** The extensions I install first on any new machine. */
export const extensions = [
  {
    name: "Tailwind CSS IntelliSense",
    purpose: "Class autocomplete, including inside cn()",
  },
  { name: "Prettier", purpose: "Formatting stops being a discussion" },
  { name: "GitLens", purpose: "Blame and history without leaving the file" },
  { name: "ES7 React Snippets", purpose: "Boilerplate I'd rather not retype" },
  { name: "Auto Import", purpose: "Imports resolve themselves" },
  { name: "Tailwind Sorter", purpose: "One canonical class order" },
  { name: "Material Icon Theme", purpose: "Findable files in a long tree" },
  { name: "Omni", purpose: "The theme I keep coming back to" },
] as const;
