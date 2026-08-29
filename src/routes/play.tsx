import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GameScreen } from "@/components/doodle/GameScreen";
import { PROMPTS, dailyPrompt, randomFrom } from "@/lib/doodle/data";

type Search = { p: string | undefined; daily: boolean };

export const Route = createFileRoute("/play")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    p: typeof search["p"] === "string" ? (search["p"] as string) : undefined,
    daily: search["daily"] === true || search["daily"] === "true",
  }),
  head: () => ({
    meta: [
      { title: "Play DoodlePop — 60 second pixel doodles" },
      { name: "description", content: "Get a silly prompt, draw a tiny pixel masterpiece in 60 seconds, then challenge a friend." },
      { property: "og:title", content: "Play DoodlePop" },
      { property: "og:description", content: "A silly prompt, a tiny pixel canvas, 60 seconds. Go." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Play,
});

function Play() {
  const { p, daily } = Route.useSearch();
  const [prompt, setPrompt] = useState(() => p ?? (daily ? dailyPrompt() : randomFrom(PROMPTS)));

  return (
    <GameScreen
      prompt={prompt}
      onNewPrompt={() => setPrompt(randomFrom(PROMPTS.filter((x) => x !== prompt)))}
    />
  );
}
