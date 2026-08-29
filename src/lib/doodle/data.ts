export type Palette = { name: string; colors: string[] };

export const PALETTES: Palette[] = [
  { name: "Strawberry Milk", colors: ["#fff1f3", "#ffc2d1", "#ff8fab", "#e05780", "#7a2c48", "#ffe9a8", "#9fd8cb", "#2b2b2b"] },
  { name: "Matcha Day", colors: ["#f6f7e6", "#dbe6a4", "#a8c66c", "#6b9142", "#3c5726", "#f2c14e", "#e0d8c3", "#2f2f28"] },
  { name: "Internet 2004", colors: ["#ffffff", "#c0c0c0", "#808080", "#0000ff", "#00ffff", "#ff00ff", "#ffff00", "#000000"] },
  { name: "Midnight Snack", colors: ["#1b1a2e", "#3d2c56", "#6b3fa0", "#c06fd6", "#ffb3de", "#ffe066", "#7ad7f0", "#f7f2ff"] },
  { name: "Bubblegum", colors: ["#fff6fb", "#ffd1ec", "#ff9ad5", "#f45bb5", "#a3379a", "#bff2ff", "#fff2a8", "#2a2140"] },
  { name: "Forest Goblin", colors: ["#f0ead6", "#c9b78a", "#8a9a5b", "#4f6b3a", "#2c3d22", "#a55b3a", "#d99a4e", "#1a1a14"] },
  { name: "Blueberry Yogurt", colors: ["#fbf9ff", "#dcd6ff", "#a7a0f2", "#6c63c7", "#37347a", "#ffd6e8", "#a9e5f5", "#22203a"] },
  { name: "Arcade Carpet", colors: ["#101038", "#2b2bff", "#00e5ff", "#ff2e88", "#ffcc00", "#00ff85", "#ff7a00", "#ffffff"] },
  { name: "Sunset Soda", colors: ["#fff3e6", "#ffd0a1", "#ff9a6b", "#f2635c", "#a8324f", "#6b3f7a", "#ffe873", "#2b1a24"] },
  { name: "Lavender Dream", colors: ["#faf7ff", "#e6dcff", "#c3a8f5", "#8f6fd6", "#57408f", "#ffd9ef", "#c8f0e0", "#241f36"] },
];

export const PROMPTS: string[] = [
  "Draw a suspicious frog 🐸",
  "Make the world's tiniest café ☕",
  "Draw what Monday feels like",
  "Design an alien's favorite snack 👽",
  "Draw a cat with a secret",
  "Make a cursed strawberry 🍓",
  "Design a tiny room you would live in",
  "Draw something that should NOT have legs",
  "Draw a sleepy toaster",
  "Draw a frog who just discovered capitalism",
  "Design a tiny house for a strawberry",
  "Draw your last brain cell",
  "Draw an emotionally unavailable cactus",
  "Design a suspicious sandwich",
  "Draw a duck with an important job 🦆",
  "Draw a mushroom that gossips 🍄",
  "Draw a star that's having a rough week ⭐",
  "Design a hat for a very small ghost",
  "Draw a snail in a hurry",
  "Draw the concept of 'almost'",
  "Draw a bee that owns a startup",
  "Draw a worm with excellent posture",
  "Design the ugliest cute thing possible",
  "Draw a ghost who is very polite 👻",
  "Draw a potato living its best life",
  "Draw a frog with a suspicious amount of money",
];

export const REACTIONS: string[] = [
  "museum immediately.",
  "why is it looking at me.",
  "this belongs on a fridge.",
  "questionable. beautiful. perfect.",
  "Picasso is typing…",
  "you cooked.",
  "the pixels have spoken.",
  "10/10 would frame.",
  "technically art.",
  "deeply concerning.",
  "a little guy!! ",
  "unhinged in a good way.",
];

export function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

/** Stable prompt for the current day (same for everyone). */
export function dailyPrompt(date = new Date()): string {
  const key = date.toISOString().slice(0, 10);
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return PROMPTS[h % PROMPTS.length]!;
}

export function slugify(prompt: string) {
  return prompt
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

export function streakMessage(days: number): string | null {
  if (days >= 30) return "touch grass. then draw it.";
  if (days >= 14) return "you live here now.";
  if (days >= 7) return "certified pixel person";
  if (days >= 3) return "okayyy artist 👀";
  return null;
}
