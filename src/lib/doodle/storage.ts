export type Doodle = {
  id: string;
  prompt: string;
  size: number;
  pixels: (string | null)[];
  seconds: number;
  date: string;
  reaction: string;
};

const GALLERY_KEY = "doodlepop.gallery";
const STREAK_KEY = "doodlepop.streak";
const SOUND_KEY = "doodlepop.sound";

const isBrowser = () => typeof window !== "undefined";

export function loadGallery(): Doodle[] {
  if (!isBrowser()) return [];
  try {
    return JSON.parse(localStorage.getItem(GALLERY_KEY) ?? "[]") as Doodle[];
  } catch {
    return [];
  }
}

export function saveDoodle(d: Doodle) {
  if (!isBrowser()) return;
  const all = [d, ...loadGallery()].slice(0, 120);
  localStorage.setItem(GALLERY_KEY, JSON.stringify(all));
}

export function deleteDoodle(id: string) {
  if (!isBrowser()) return;
  localStorage.setItem(GALLERY_KEY, JSON.stringify(loadGallery().filter((d) => d.id !== id)));
}

export function getSound(): boolean {
  if (!isBrowser()) return true;
  return localStorage.getItem(SOUND_KEY) !== "off";
}

export function setSound(on: boolean) {
  if (!isBrowser()) return;
  localStorage.setItem(SOUND_KEY, on ? "on" : "off");
}

type StreakState = { count: number; last: string };

export function getStreak(): number {
  if (!isBrowser()) return 0;
  try {
    const s = JSON.parse(localStorage.getItem(STREAK_KEY) ?? "null") as StreakState | null;
    if (!s) return 0;
    const days = daysBetween(s.last, today());
    return days > 1 ? 0 : s.count;
  } catch {
    return 0;
  }
}

export function bumpStreak(): number {
  if (!isBrowser()) return 0;
  let s: StreakState | null = null;
  try {
    s = JSON.parse(localStorage.getItem(STREAK_KEY) ?? "null");
  } catch {
    s = null;
  }
  const t = today();
  let next: StreakState;
  if (!s) next = { count: 1, last: t };
  else if (s.last === t) next = s;
  else next = { count: daysBetween(s.last, t) === 1 ? s.count + 1 : 1, last: t };
  localStorage.setItem(STREAK_KEY, JSON.stringify(next));
  return next.count;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string) {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86400000);
}
