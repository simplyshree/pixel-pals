import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PROMPTS, dailyPrompt, randomFrom, streakMessage } from "@/lib/doodle/data";
import { getStreak } from "@/lib/doodle/storage";

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
  const daily = dailyPrompt();

  useEffect(() => setStreak(getStreak()), []);
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
          <Link
            to="/play"
            search={{ p: randomFrom(PROMPTS) }}
            className="chunky chunky-press bg-card px-3 py-4 text-center text-sm"
          >
            🎲 quick doodle
          </Link>
          <Link to="/museum" className="chunky chunky-press bg-mint px-3 py-4 text-center text-sm">
            🖼️ tiny museum
          </Link>
        </div>
      </section>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        no login. no rules. just pixels 🍓
      </p>
    </main>
  );
}
