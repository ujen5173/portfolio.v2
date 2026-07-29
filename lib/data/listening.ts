export type Track = {
  title: string;
  artist: string;
  album: string;
  /** Runtime in seconds, used for the counter and the progress bar. */
  duration: number;
};

/** The rotation. Edit freely — the card just cycles whatever is in here. */
export const tracks: Track[] = [
  {
    title: "Night Changes",
    artist: "One Direction",
    album: "Four",
    duration: 226,
  },
  { title: "Faded", artist: "J.Fla", album: "Cover", duration: 197 },
  {
    title: "Story of My Life",
    artist: "One Direction",
    album: "Midnight Memories",
    duration: 245,
  },
  { title: "Shape of You", artist: "J.Fla", album: "Cover", duration: 213 },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 200,
  },
  {
    title: "Drag Me Down",
    artist: "One Direction",
    album: "Made in the A.M.",
    duration: 193,
  },
  { title: "Let Me Love You", artist: "J.Fla", album: "Cover", duration: 190 },
  {
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    duration: 167,
  },
  {
    title: "Perfect",
    artist: "One Direction",
    album: "Made in the A.M.",
    duration: 230,
  },
  {
    title: "Something Just Like This",
    artist: "J.Fla",
    album: "Cover",
    duration: 187,
  },
  {
    title: "Counting Stars",
    artist: "OneRepublic",
    album: "Native",
    duration: 257,
  },
  { title: "18", artist: "One Direction", album: "Four", duration: 200 },
];
