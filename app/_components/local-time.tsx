"use client";

import { useSyncExternalStore } from "react";

const format = (date: Date) =>
  date.toLocaleString("en-US", {
    timeZone: "Asia/Kathmandu",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });

/** Ticks often enough to catch the minute boundary without busy-waiting. */
function subscribe(onChange: () => void) {
  const interval = setInterval(onChange, 15_000);
  return () => clearInterval(interval);
}

// Cached so getSnapshot stays referentially stable between ticks — returning a
// fresh string every call would make React loop.
let cached = "";

function getSnapshot() {
  const next = format(new Date());
  if (next !== cached) cached = next;
  return cached;
}

/** Server render has no clock; the placeholder is replaced on hydration. */
const getServerSnapshot = () => "--:--";

/** Live clock in Kathmandu (+05:45 — the offset everyone gets wrong). */
const LocalTime = () => {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <span className="tabular" suppressHydrationWarning>
      {time}
    </span>
  );
};

export default LocalTime;
