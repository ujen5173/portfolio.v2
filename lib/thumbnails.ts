import { existsSync } from "node:fs";
import path from "node:path";

const EXTENSIONS = ["png", "webp", "jpg", "jpeg", "avif"] as const;

/**
 * Resolves `/projects/<slug>.<ext>` against the public directory at build
 * time. Returns null when nothing is there, so callers can fall back to a
 * generated placeholder instead of rendering a broken image.
 *
 * Server-only: reads the filesystem while the page is being rendered.
 */
export function findProjectThumbnail(slug: string): string | null {
  return resolvePublic(`/projects/${slug}`);
}

/**
 * Same check for channel avatars under public/channels/, populated by
 * `node scripts/fetch-channel-avatars.mjs`.
 */
export function findChannelAvatar(handle: string): string | null {
  return resolvePublic(`/channels/${handle.replace(/^@/, "")}`);
}

function resolvePublic(basePath: string): string | null {
  for (const ext of EXTENSIONS) {
    const relative = `${basePath}.${ext}`;
    if (existsSync(path.join(process.cwd(), "public", relative))) {
      return relative;
    }
  }
  return null;
}
