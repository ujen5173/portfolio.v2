# Ujen Basi — Portfolio

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4

## Running it

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build && pnpm start
```

Optional: set `GITHUB_TOKEN` in `.env.local` to raise the GitHub API rate limit
from 60 to 5,000 requests/hour. Everything works without it — the site just
shows a fallback message if GitHub throttles a build.

## Where the content lives

All copy is data, not markup. Edit these and the pages follow:

| File                     | What it holds                                                                       |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `lib/data/profile.ts`    | Name, contact, intro, availability, stat band, principles, "off the clock"          |
| `lib/data/projects.ts`   | Case studies — problem, approach, architecture, challenges, outcomes, retrospective |
| `lib/data/experience.ts` | Work / education / milestone timeline                                               |
| `lib/data/skills.ts`     | The stack, grouped by layer                                                         |
| `lib/data/channels.ts`   | YouTube channels in the credits section                                             |
| `lib/data/setup.ts`      | Daily tools, editor look, VS Code extensions                                        |

`profile.available` toggles the availability dot in the footer.

## Project screenshots

Drop images into `public/projects/`, named after the project slug:

```
public/projects/workforge.png
public/projects/readora.png
public/projects/ridezio.png
public/projects/hash.png
```

`.png`, `.webp`, `.jpg` and `.avif` all work. Recommended 1600×1000 (16:10).

Missing images fall back to a generated placeholder automatically
(`lib/thumbnails.ts` checks the filesystem at render time), so you can add them
one at a time without ever showing a broken image. Screenshots render inside a
browser-window frame and expand to a full-screen viewer on click.

## Channel avatars

The credits section shows each channel's real picture. Fetch them once:

```bash
node scripts/fetch-channel-avatars.mjs
```

That writes `public/channels/<handle>.jpg` for every channel in
`lib/data/channels.ts`. Re-run it if a channel changes its avatar. Anything it
can't fetch falls back to a lettermark, so a failure never breaks the page.

## Case study pages

Each project gets a page at `/work/<slug>`, generated statically from
`lib/data/projects.ts`. The structure is fixed — context, decisions,
architecture, problem solving, result — so adding a project is a data edit,
never a layout one.

## Notes on the build

- **Theme**: dark and light, resolved before first paint by an inline script in
  `app/layout.tsx`. `components/theme-provider.tsx` reads the `<html>` class
  through `useSyncExternalStore` rather than syncing state in an effect.
- **⌘K palette**: `components/command-palette.tsx`. Commands are plain data and
  actions resolve by id. Fuzzy matching is hand-rolled — no dependency.
- **Motion**: CSS transitions driven by IntersectionObserver. No animation
  library. Everything collapses under `prefers-reduced-motion`.
- **GitHub data**: `lib/github.ts`, revalidated hourly. Language shares and
  totals are derived from the repo list, so they cost no extra API calls.
- **`cn()`**: `lib/utils.ts` extends `tailwind-merge` with the custom font-size
  and colour scales — without that, `text-display-xl` and `text-ink` collide
  and the size silently gets dropped.

## Before deploying

- Replace `public/resume.pdf` when the CV changes.
- Check `profile.siteUrl` in `lib/data/profile.ts` matches the real domain — it
  drives metadata, OG images, sitemap and robots.
