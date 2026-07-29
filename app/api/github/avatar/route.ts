import { getGitHubUser } from "@/lib/github";

/**
 * Proxies the latest GitHub avatar so the profile image is always current
 * while being cached at the edge (1 day) to keep API calls low.
 */
export const revalidate = 86400;

export async function GET() {
  const user = await getGitHubUser();

  if (!user) {
    return new Response("GitHub user unavailable", { status: 502 });
  }

  const imageRes = await fetch(`${user.avatar_url}&s=480`, {
    next: { revalidate: 86400 },
  });

  if (!imageRes.ok) {
    return new Response("Avatar unavailable", { status: 502 });
  }

  const image = await imageRes.arrayBuffer();

  return new Response(image, {
    headers: {
      "Content-Type": imageRes.headers.get("Content-Type") ?? "image/png",
      "Cache-Control":
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
