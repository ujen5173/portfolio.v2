export type Challenge = {
  /** The problem, stated as a constraint or failure mode. */
  problem: string;
  /** What I actually did about it. Left out when it isn't solved yet. */
  solution?: string;
  /** Optional short code/pseudocode illustration. */
  snippet?: { lang: string; code: string };
};

export type ArchitectureLayer = {
  label: string;
  items: string[];
  note?: string;
};

export type ApproachItem = {
  title?: string;
  body?: string;
  /** Decision not made yet — renders as a deliberately unfilled slot. */
  stillInProgress?: boolean;
};

/** Where the idea came from, when that story is worth telling. */
export type Inspiration = {
  eyebrow: string;
  headline: string;
  body: string[];
};

export type Project = {
  slug: string;
  repoName: string;
  title: string;
  year: string;
  timeline: string;
  role: string;
  status: "Live" | "In development" | "Archived";
  category: string;
  tagline: string;
  src: string;
  /** One-paragraph pitch for the index card. */
  summary: string;
  /** Accent hue token used for the card and detail page. */
  accent: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5";
  stack: string[];
  liveUrl?: string;

  /* ---- case study ---- */
  problem: string[];
  inspiration?: Inspiration;
  approach: ApproachItem[];
  challenges: Challenge[];
  architecture: ArchitectureLayer[];
  outcomes: { label: string; value: string }[];
  /** What I'd do differently. Null while the project is too young to say. */
  retrospective: string | null;
  /** Too early for hindsight: the project is still being built. */
  retrospectivePending?: boolean;
  /** An interactive piece of the product, embedded in the case study. */
  demo?: "forgescript";
};

export const projects: Project[] = [
  {
    slug: "workforge.team",
    repoName: "workforge.team",
    title: "WorkForge",
    year: "2026",
    timeline: "2025 — Present",
    role: "Solo - architecture, backend, frontend, design",
    status: "In development",
    category: "Multi-tenant SaaS",
    src: "/work/workforge.team.png",
    tagline: "One app for the six a small company opens every morning",
    summary:
      "Work software for small companies. Every company gets its own address and its own data, and four roles — CEO, HR, manager, employee — decide who can see and change what. Most of the real work has gone into keeping one company's data completely away from another's.",
    accent: "chart-1",
    stack: [
      "Next.js 15",
      "TypeScript",
      "tRPC",
      "Drizzle ORM",
      "PostgreSQL",
      "Better Auth",
      "shadcn/ui",
    ],
    demo: "forgescript",

    problem: [
      "Small companies run the day on five or six separate tools. Time tracking in one, leave requests in another, tasks somewhere else, chat and meetings somewhere else again. None of them know about each other, so people spend a real part of the day just moving between tabs and copying things across.",
      "WorkForge puts those pieces in one place — time, leave, tasks, chat, meetings — behind one login and one set of permissions.",
    ],

    approach: [
      {
        title: "Every company gets its own address",
        body: "A company signs in at its own subdomain, like acme.workforge.team. The middleware reads the company from the address once, before any other code runs, and passes it down. Nothing further along has to read the URL again or trust an ID sent from the browser.",
      },
      {
        title: "Type tasks instead of filling in forms",
        body: "Planning a week of work through a form means opening the same dialog fifteen times, so tasks can be written as plain text instead: one line per task, @ for who it goes to, # for the type, ~ for the due date, and indented dashes for subtasks. Paste a block, get the tasks. Only that small set of symbols is understood, which also keeps raw HTML out of anything a user types.",
      },
      {
        stillInProgress: true,
      },
      {
        stillInProgress: true,
      },
    ],

    challenges: [
      {
        problem:
          "The time tracker is the fiddliest thing in the app. It has to keep running when the tab is closed, know when the working day ends, reset itself at the right time, handle someone who forgets to clock out, and still count overtime correctly. Fixing one of those rules tends to break another.",
      },
      {
        problem:
          "Anyone who can create an account can create one above their own if you are not careful. An HR user could hand out a CEO account. A manager could quietly promote themselves. Every other permission in the app depends on roles being right, so this is the one thing that has to be.",
        solution:
          "Every role change goes through one function that compares positions in the hierarchy. You can only give someone a role below your own, and you cannot change anyone at your level. The hierarchy is an ordered list, so the rule is a single comparison in a single file instead of role checks scattered through the code.",
        snippet: {
          lang: "ts",
          code: `const RANK = { ceo: 0, hr: 1, manager: 2, employee: 3 } as const;

function assertCanAssign(actor: Role, target: Role) {
  // Strictly below the actor: no peers, no promoting yourself.
  if (RANK[target] <= RANK[actor])
    throw new TRPCError({ code: "FORBIDDEN" });
}`,
        },
      },
      {
        problem:
          "I kept losing track of my own app. Payroll settings in one corner, leave rules in another, and I had written both of them. If I could not remember where something lived, nobody opening it for the first time was going to find it either.",
        solution:
          "One search box that covers everything: people, tasks, projects, pages and settings. It opens with a keyboard shortcut from anywhere in the app, groups results by what they are, and jumps straight to the page instead of showing a list of links. Small feature, and the one I use most.",
      },
      {
        problem:
          "Typing @sita in a task means the parser has to find the real person behind that name, which makes a text parser part of the security boundary. Search for 'the user called sita' the obvious way and you can hand someone's work to a stranger at another company. One paste also creates twenty tasks at once, so failing the whole batch because of one typo is no good either.",
        solution:
          "Names are looked up through the same company-scoped query as everything else, so a typo and a real person at another company give the same answer: not found. Parsing and saving are also separate steps. The text first becomes a preview with a warning on each line that has a problem — unknown name skipped, bad date dropped, unknown type treated as a plain task — and nothing is saved until you accept it. One bad line no longer takes the other nineteen with it.",
        snippet: {
          lang: "ts",
          code: `// Names are looked up through the company-scoped handle, so a real
// person at another company looks exactly like a typo: not found.
const members = await ctx.scoped.members.byHandle(tokens.assignees);

const warnings = tokens.assignees
  .filter((handle) => !members.has(handle))
  .map((handle) => ({ line, kind: "unknown-assignee", handle }));

// Parsing and saving are separate calls. This one only builds a preview.
return { tasks: tokens.map(withResolved(members)), warnings };`,
        },
      },
    ],

    architecture: [
      {
        label: "Edge",
        items: ["Middleware", "Subdomain → company", "Session guard"],
        note: "The company is worked out once, before any page or API code runs.",
      },
      {
        label: "API",
        items: ["tRPC router", "Company-scoped procedures", "Role checks"],
        note: "Types are shared end to end, and permission checks sit in middleware instead of in every handler.",
      },
      {
        label: "Data",
        items: ["Drizzle ORM", "PostgreSQL", "Redis"],
        note: "Queries arrive already narrowed to one company. Asking for everything is not something a handler can do.",
      },
      {
        label: "Interface",
        items: ["Next.js 15 App Router", "shadcn/ui", "Custom task parser"],
        note: "Rendered on the server by default; client-side code only where something has to hold state.",
      },
    ],

    outcomes: [
      { label: "Roles", value: "Four levels, one rule" },
      { label: "Tasks", value: "Bulk create from plain text" },
      { label: "Meetings", value: "Video calls with AI notes" },
      { label: "Hiring", value: "Applicant tracking" },
    ],

    retrospective:
      "The project is still early, so this is a short list rather than a proper look back. Two things I would already do differently. First, put the company boundary in the database itself with row-level security, instead of trusting the query layer to remember it every time — the app code works, but the database refusing outright is one less thing to get right. Second, write the permission tests before the permissions. I found the account-creation hole by hand, and that is exactly the kind of thing a test should find instead. The rest of this gets written once there is something shipped to look back on.",
    retrospectivePending: true,
  },

  {
    slug: "readora",
    repoName: "-theReadora-",
    title: "Readora",
    year: "2025",
    timeline: "2025",
    role: "Solo — full stack, data modelling, payments",
    status: "Live",
    category: "Consumer platform",
    tagline: "A place to write and read serialised stories, like Wattpad",
    summary:
      "Writers publish stories a chapter at a time, schedule what comes next, and charge for chapters if they want to. Readers keep a library, follow writers and buy coins once instead of paying per chapter. The interesting part was storage: the chapter text and everything around it want completely different databases.",
    accent: "chart-3",
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "MongoDB",
      "tRPC",
      "Stripe",
    ],
    src: "/work/readora.png",
    problem: [
      "A story site looks like a blog until you look at the numbers. One serialised story can run to hundreds of chapters and millions of characters, and readers open them one at a time, out of order, usually on a phone with a slow connection.",
      "Everything around the text is the opposite: writers, stories, chapter records, release dates, purchases, follows. Lots of small records that want joins and rules holding them together.",
      "Keeping both in one database means either a relational one stuffed with enormous text columns, or a document one where I write the payment rules by hand. Neither is a trade I wanted to make.",
    ],

    approach: [
      {
        title: "Two databases, split by what they hold",
        body: "Postgres holds everything small and connected: users, stories, chapter records, coin balances, purchases. MongoDB holds the chapter text itself, filed under the Postgres chapter ID. Each one does the job it is good at.",
      },
      {
        title: "Chapters stored in pieces",
        body: "A long chapter is saved as several ordered pieces rather than one huge document. The reader pulls only the pieces it is about to show, so opening chapter 1 of a 400-chapter story does not drag the rest along with it.",
      },
      {
        title: "Coins instead of a card charge per chapter",
        body: "Readers buy coins once and spend them chapter by chapter. One card payment instead of thirty: cheaper in fees, less to click through, and far easier to check the books afterwards.",
      },
      {
        title: "Drafts and scheduled chapters",
        body: "A chapter is a draft, scheduled or published depending on a status and a release time on its own record. The same query serves all three by changing one condition, so there is no second code path to keep in step.",
      },
    ],

    challenges: [
      {
        problem:
          "Two databases, one truth. Publishing a chapter writes the record to Postgres and the text to MongoDB. If the second write fails, the site shows a chapter with nothing in it, which is the worst thing a reading app can do.",
        solution:
          "Postgres decides what is visible, so the text is written first and the record is only flipped to published once that has worked. Text with no record is invisible and can be cleaned up later. A record with no text — the failure a reader would actually see — cannot happen.",
        snippet: {
          lang: "ts",
          code: `// Text first, visibility second.
// A crash in between leaves stray text, never an empty chapter.
await mongo.chapterChunks.insertMany(chunksFor(chapterId, body));

await prisma.$transaction([
  prisma.chapter.update({
    where: { id: chapterId },
    data: { status: "PUBLISHED", releasedAt: new Date() },
  }),
  prisma.series.update({
    where: { id: seriesId },
    data: { chapterCount: { increment: 1 } },
  }),
]);`,
        },
      },
      {
        problem:
          "Spending the same coins twice. Two quick taps on the same paid chapter could both read a balance of 10, both take 10 away, and both succeed. The reader pays once and unlocks twice, or the balance goes below zero.",
        solution:
          "Spending happens in one statement that only takes the coins if the balance is still high enough, and the purchase row has a unique constraint on the reader and chapter together. The second request either finds too few coins or hits the constraint and is treated as 'already bought'. No locks, no queue in front of it.",
        snippet: {
          lang: "ts",
          code: `// The WHERE clause does the locking: no balance, no deduction.
const spent = await prisma.wallet.updateMany({
  where: { userId, balance: { gte: price } },
  data:  { balance: { decrement: price } },
});
if (spent.count === 0) throw new InsufficientCoins();

// Unique (userId, chapterId), so a repeated request changes nothing.
await prisma.purchase.create({ data: { userId, chapterId, price } });`,
        },
      },
    ],

    architecture: [
      {
        label: "Interface",
        items: ["Next.js App Router", "Reader view", "Writer dashboard"],
        note: "The reader only fetches the part of the chapter on screen.",
      },
      {
        label: "API",
        items: ["tRPC", "Stripe webhooks", "Idempotency keys"],
        note: "Anything involving money can be repeated without doing damage.",
      },
      {
        label: "Relational",
        items: ["PostgreSQL", "Prisma", "Wallets & purchases"],
        note: "Decides what exists, what is visible and who paid for it.",
      },
      {
        label: "Document",
        items: ["MongoDB", "Chapter text in pieces"],
        note: "Long text, fetched a slice at a time.",
      },
    ],

    outcomes: [
      { label: "Storage", value: "Postgres + MongoDB" },
      { label: "Chapters", value: "Saved in pieces" },
      { label: "Publishing", value: "Drafts + scheduling" },
      { label: "Traffic", value: "1k+ visits a month" },
    ],

    retrospective:
      "Splitting the databases was right for reading speed, but it makes every write that touches both harder than it needs to be. With a smaller library I would stay on Postgres alone and split only once the text columns actually started to hurt. I would also write the job that checks the coin ledger before building the payment flow rather than after — knowing the numbers add up is worth more than shipping a week earlier.",
  },

  {
    slug: "ridezio",
    repoName: "Ridezio",
    title: "Ridezio",
    year: "2025",
    timeline: "2025",
    role: "Solo — full stack, API design, data modelling",
    status: "Live",
    category: "Marketplace",
    tagline: "Rent a bike or a car from a local shop, without ringing round",
    summary:
      "Shops list their vehicles, people book them for a set of dates, and both sides work from the same booking. I built it to launch as a real product after a trip where finding a bike meant calling shop after shop. It works end to end. It never found its users, so it sits here as the one that did not take off.",
    accent: "chart-2",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "PostgreSQL",
      "tRPC",
    ],
    src: "/work/ridezio.png",

    inspiration: {
      eyebrow: "Where this one came from",
      headline: "Two founders, an air mattress, and a lot of unglamorous work.",
      body: [
        "The idea started on a trip with friends. Finding a bike to rent meant calling shops one after another, and half of them never picked up. That afternoon stayed in my head for months.",
        "Around the same time I was reading about Airbnb's early years — renting out air mattresses in their own apartment, selling cereal to keep the lights on, taking the listing photos themselves because nobody else was going to. None of that looks like a tech company. It looks like people doing slow, manual work until a part of it is worth writing code for.",
        "So I built Ridezio the same way round: ask the shops how they track bookings first, put their notebook into a database, and only automate the parts that actually hurt. It never got the Airbnb ending. Going and looking before building is the habit I kept.",
      ],
    },

    problem: [
      "Renting looks like a search problem and behaves like a calendar problem. Someone filters by type, price and place, but each result only means anything for a particular set of dates — and those dates are shared with everyone else looking at the same vehicle.",
      "Shops need close to the opposite: one honest view of their vehicles, what is booked, and the gaps in between. The same records have to serve both sides without either one being shown something untrue.",
    ],

    approach: [
      {
        title: "A booking is a date range",
        body: "Bookings are stored as ranges instead of two separate columns compared in my own code. Whether a vehicle is free on given dates becomes a question the database answers directly, rather than a loop over existing bookings.",
      },
      {
        title: "Filters that stack into one query",
        body: "Type, price, place and dates all become conditions in a single query. Adding a new filter means adding a condition, not another pass over results that have already been fetched.",
      },
      {
        title: "A map beside the list",
        body: "Listings carry coordinates, so 'near me' is an area on a map rather than a match on the spelling of a town — which matters where the same place is written three different ways.",
      },
      {
        title: "One booking flow, two sides",
        body: "Requested, confirmed, active, returned, cancelled. Shops and renters look at the same booking from different sides, instead of two separate flows that slowly drift apart.",
      },
    ],

    challenges: [
      {
        problem:
          "Two people booking the same vehicle for overlapping dates in the same second would both pass a check written as 'fetch the bookings, then decide'. The checking and the saving were not one step, so both could win.",
        solution:
          "I moved the guarantee into the database with an exclusion constraint: it will not store two overlapping bookings for the same vehicle. The app still checks first so the message is friendly, but being right no longer depends on that check winning the race.",
        snippet: {
          lang: "sql",
          code: `-- The database decides what overlaps, not the request handler.
ALTER TABLE reservations
  ADD CONSTRAINT no_overlapping_bookings
  EXCLUDE USING gist (
    vehicle_id WITH =,
    daterange(start_date, end_date, '[)') WITH &&
  )
  WHERE (status IN ('confirmed', 'active'));`,
        },
      },
      {
        problem:
          "The map and the list disagreed. Moving the map fetched listings, changing a filter fetched them again, and the two answers arrived at different times — so the page flickered between them.",
        solution:
          "I folded both into one piece of state by treating the visible map area as just another filter. One fetch feeds the map and the list, so panning and filtering are the same operation underneath and there is nothing left to fall out of step.",
      },
    ],

    architecture: [
      {
        label: "Discovery",
        items: ["Filters", "Map area as a filter", "Availability check"],
        note: "One piece of state feeds both the map and the list.",
      },
      {
        label: "Booking",
        items: ["Booking states", "Range overlap", "Exclusion constraint"],
        note: "The database refuses a double booking, so the code does not have to be perfect.",
      },
      {
        label: "API",
        items: ["tRPC", "Separate public and shop views"],
        note: "Shop numbers never travel out on the public endpoint.",
      },
      {
        label: "Data",
        items: ["PostgreSQL", "daterange + GiST", "Fleet tables"],
        note: "Date ranges are built in, so checking overlap is an index lookup.",
      },
    ],

    outcomes: [
      { label: "Double bookings", value: "Blocked by the database" },
      { label: "Search", value: "Knows the dates" },
      { label: "Discovery", value: "Map and list, one query" },
      { label: "Sides", value: "Shop and renter" },
    ],

    retrospective:
      "I did not think cancellations through. Freeing up the dates is easy; deciding what happens to a rental that is half over, and who carries the cost, is a product question I answered in code before I answered it on paper. Next time I draw the whole booking flow, with the money written on each step, before the first migration.",
  },

  {
    slug: "hashnode",
    repoName: "hash",
    title: "Hash",
    year: "2023",
    timeline: "2023",
    role: "Solo — full stack",
    status: "Archived",
    category: "Open source",
    tagline: "A Hashnode-style blogging platform, and 100+ stars for it",
    summary:
      "The project where I actually learned full stack. I picked Hashnode because I liked the product and the design, and because rebuilding something good makes you face the same decisions its team faced. Every part of it is mine — schema, architecture, decisions — not a clone tutorial followed to the end. It is archived now and still the repo people find first.",
    accent: "chart-4",
    stack: [
      "Next.js",
      "T3 Stack",
      "TypeScript",
      "Drizzle ORM",
      "Stripe",
      "Tailwind CSS",
    ],
    src: "/work/hashnode.png",

    problem: [
      "Curiosity, mostly. I wanted to build a full product and I did not know how yet.",
      "I learned more from this one project than from everything before it: how a feed gets ranked, how publications can own their own space, how payments hang together. I chose Hashnode because the product was interesting and, at the time, the design was as good as anything on the web.",
    ],

    approach: [
      {
        title: "One set of types, everywhere",
        body: "Built on the T3 stack, so the database schema, the API and the components all share the same types. Renaming a column breaks the build instead of the site.",
      },
      {
        title: "Recommendations, kept simple",
        body: "The feed needed to feel personal, but I had neither the data nor the time for anything clever. So posts are scored with weights — tags you read, people you follow, how recent it is, how well it is doing — and sorted by the result.",
      },
      {
        title: "Publications, my first go at ownership",
        body: "Anyone can own a publication with its own look and its own writers. It was the first time I had to think about who owns what and who is allowed to do what, which is the idea WorkForge is now built on.",
      },
      {
        title: "The README as part of the product",
        body: "I wrote up the architecture, the schema and how to run it locally. That, more than any single feature, is why people starred it.",
      },
    ],

    challenges: [
      {
        problem:
          "I was learning React and Next.js while building the thing I was learning them for. Every feature arrived with a concept I had not met yet.",
        solution:
          "Tutorials, blog posts and a lot of trial and error. Slower than being taught, and the parts I got wrong the first time are the ones I still remember.",
      },
    ],

    architecture: [
      {
        label: "Interface",
        items: ["Next.js", "Rich editor", "Drafts saved locally"],
        note: "Edits survive a closed tab; syncing catches up afterwards.",
      },
      {
        label: "API",
        items: ["tRPC", "T3 Stack", "Stripe"],
        note: "One set of types from the schema to the component.",
      },
      {
        label: "Data",
        items: ["Drizzle ORM", "Follow graph", "Cursor pagination"],
        note: "The feed is ranked in the query, one page at a time.",
      },
      {
        label: "Community",
        items: ["Architecture README", "Documented env", "100+ stars"],
        note: "The write-up was treated as part of the project.",
      },
    ],

    outcomes: [
      { label: "GitHub stars", value: "100+" },
      { label: "Feed", value: "Weighted recommendations" },
      { label: "Editor", value: "Drafts saved locally" },
      { label: "Learning", value: "More than anything since" },
    ],

    retrospective:
      "I would rebuild the foundations. Better pagination, a real recommendation and personalisation system, Redis in front of the slow queries, and publications on their own subdomains instead of paths. I would tighten the security, generate the table of contents automatically, and spend longer on the interface. It was the right project to learn on, and almost none of the decisions in it would survive me making them a second time.",
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const projectSlugs = projects.map((project) => project.slug);
