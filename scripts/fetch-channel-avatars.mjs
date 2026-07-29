/**
 * Downloads each YouTube channel's avatar into public/channels/ so the
 * credits section serves them as static, optimised assets — no runtime API
 * key, no hotlinking, no layout shift.
 *
 *   node scripts/fetch-channel-avatars.mjs
 *
 * Re-run it if a channel changes its picture. Anything it can't fetch is
 * skipped and the site falls back to a lettermark, so a failure here is
 * never a broken page.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "public", "channels");

const HANDLES = [
  "akshaymarch7",
  "PedroTechnologies",
  "NetNinja",
  "javascriptmastery",
  "KevinPowell",
  "freecodecamp",
  "TraversyMedia",
  "Codevolution",
  "WebDevSimplified",
  "WesBos",
  "dcode-software",
  "Hyperplexed",
  "DesignCourse",
  "developedbyed",
  "OnlineTutorialsYT",
  "CodingNepal",
  "CodingLabYT",
  "LamaDev",
  "codinginflow",
  "HiteshCodeLab",
  "TechWithTim",
  "CoderOne",
  "Fireship",
];

const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36";

/** Pulls the og:image off the channel page — the public avatar. */
async function findAvatarUrl(handle) {
  const res = await fetch(`https://www.youtube.com/@${handle}`, {
    headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9" },
  });
  if (!res.ok) throw new Error(`channel page ${res.status}`);

  const html = await res.text();
  const match = html.match(/<meta property="og:image" content="([^"]+)"/);
  if (!match) throw new Error("no og:image");

  // Ask for a smaller square than the default 900px.
  return match[1].replace(/=s\d+-/, "=s240-");
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  let saved = 0;
  for (const handle of HANDLES) {
    const file = path.join(OUT_DIR, `${handle}.jpg`);
    try {
      const url = await findAvatarUrl(handle);
      const image = await fetch(url, { headers: { "User-Agent": UA } });
      if (!image.ok) throw new Error(`image ${image.status}`);

      await writeFile(file, Buffer.from(await image.arrayBuffer()));
      console.log(`  ✓ ${handle}`);
      saved++;
    } catch (error) {
      console.warn(`  ✗ ${handle} — ${error.message} (will use a lettermark)`);
    }

    // Be a polite client.
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  console.log(`\n${saved}/${HANDLES.length} avatars saved to public/channels/`);
}

main();
