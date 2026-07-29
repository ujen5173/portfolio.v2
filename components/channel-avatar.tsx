import { cn } from "@/lib/utils";
import Image from "next/image";

type ChannelAvatarProps = {
  /** Resolved public path, or null to render the lettermark fallback. */
  src: string | null;
  name: string;
  size?: number;
  className?: string;
};

/**
 * Channel picture, or the initial on a plain plate when the file hasn't been
 * fetched yet. Same graceful-degradation rule as the project thumbnails —
 * a missing asset is never a broken image.
 */
const ChannelAvatar = ({
  src,
  name,
  size = 40,
  className,
}: ChannelAvatarProps) => (
  <span
    className={cn(
      "grid shrink-0 place-items-center overflow-hidden rounded-full border border-hairline bg-surface",
      className,
    )}
    style={{ width: size, height: size }}
  >
    {src ? (
      <Image
        src={src}
        alt=""
        width={size * 2}
        height={size * 2}
        className="size-full object-cover"
      />
    ) : (
      <span
        aria-hidden
        className="font-display text-sm font-medium text-ink-4"
        style={{ fontSize: size * 0.38 }}
      >
        {name.slice(0, 1)}
      </span>
    )}
  </span>
);

export default ChannelAvatar;
