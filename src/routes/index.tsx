import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PROMPTS, dailyPrompt, randomFrom, streakMessage } from "@/lib/doodle/data";
import {
  getArtistName,
  getStreak,
  loadGallery,
  setArtistName,
  type Doodle,
} from "@/lib/doodle/storage";
import { DoodleThumb } from "@/components/doodle/DoodleThumb";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DoodlePop — the internet's cutest 60 second doodle game" },
      {
        name: "description",
        content: "Bored? Get a silly prompt, draw a tiny pixel masterpiece in 60 seconds, and challenge a friend. No login, no rules.",
      },
      { property: "og:title", content: "DoodlePop ✦ draw something silly" },
      { property: "og:description", content: "A tiny pixel canvas, a weird prompt, 60 seconds. Play instantly." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [streak, setStreak] = useState(0);
  const [items, setItems] = useState<Doodle[]>([]);
  const [name, setName] = useState("anonymous artist");
  const daily = dailyPrompt();

  useEffect(() => {
    setStreak(getStreak());
    setItems(loadGallery());
    setName(getArtistName());
  }, []);
  const milestone = streakMessage(streak);

  return (
    <main className="mx-auto w-full max-w-md px-5 pb-16 pt-8 sm:max-w-lg">
      <header className="text-center">
        <h1 className="animate-wiggle inline-block font-display text-4xl">DoodlePop ✦</h1>
        <p className="text-sm text-muted-foreground">draw something silly.</p>
      </header>

      <section className="mt-10 text-center">
        <p className="font-display text-5xl">Bored?</p>
        <button
          onClick={() => navigate({ to: "/play", search: { p: randomFrom(PROMPTS) } })}
          className="chunky chunky-press mt-5 w-full bg-primary px-6 py-4 text-lg text-primary-foreground"
        >
          GIVE ME SOMETHING TO DRAW ✏️
        </button>
      </section>

      <section className="doodle-card animate-pop-in mt-8 p-5 text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">today&apos;s doodle</p>
        <p className="mt-1 font-display text-xl leading-snug">{daily}</p>
        <Link
          to="/play"
          search={{ p: daily, daily: true }}
          className="chunky chunky-press mt-4 inline-block bg-accent px-6 py-2"
        >
          play
        </Link>
        <p className="mt-3 text-xs text-muted-foreground">
          🔥 {streak} day doodle streak{milestone ? ` — ${milestone}` : ""}
        </p>
      </section>

      <section className="mt-8">
        <p className="text-center text-sm text-muted-foreground">or cause chaos</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate({ to: "/play", search: { p: randomFrom(PROMPTS) } })}
            className="chunky chunky-press bg-card px-3 py-4 text-center text-sm"
          >
            🎲 quick doodle
          </button>
          <Link to="/museum" className="chunky chunky-press bg-mint px-3 py-4 text-center text-sm">
            🖼️ tiny museum
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-xl">tiny museum 🖼️</h2>
          {items.length > 0 && (
            <Link to="/museum" className="text-xs text-muted-foreground underline">
              see all ({items.length})
            </Link>
          )}
        </div>

        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <span>signed:</span>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setArtistName(e.target.value);
            }}
            aria-label="your artist name"
            placeholder="your name"
            className="w-36 rounded-full border-2 border-foreground/20 bg-card px-3 py-1 font-bold text-foreground outline-none focus:border-foreground"
          />
        </div>

        {items.length === 0 ? (
          <div className="doodle-card mt-3 p-6 text-center">
            <p className="font-display">empty walls 🕸️</p>
            <p className="mt-1 text-xs text-muted-foreground">
              your doodles show up here once you save them.
            </p>
          </div>
        ) : (
          <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {items.slice(0, 6).map((d) => (
              <div key={d.id}>
                <DoodleThumb d={d} />
                <p className="mt-2 line-clamp-1 text-xs font-bold">{d.prompt}</p>
                <p className="text-[11px] text-muted-foreground">
                  by {d.author ?? "anonymous artist"} · {d.seconds}s
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        no login. no rules. just pixels 🍓
      </p>
    </main>
  );
}
