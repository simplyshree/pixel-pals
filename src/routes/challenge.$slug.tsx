import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GameScreen } from "@/components/doodle/GameScreen";
import { PROMPTS, randomFrom, slugify } from "@/lib/doodle/data";

export const Route = createFileRoute("/challenge/$slug")({
  head: () => ({
    meta: [
      { title: "You've been challenged — DoodlePop" },
      { name: "description", content: "A friend dared you to draw this in 60 seconds. Open, doodle, compare." },
      { property: "og:title", content: "You've been challenged on DoodlePop" },
      { property: "og:description", content: "Same prompt, 60 seconds, no account. Who did it better?" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Challenge,
});

function promptFromSlug(slug: string) {
  const match = PROMPTS.find((p) => slugify(p) === slug);
  if (match) return match;
  const words = slug.replace(/-/g, " ").trim();
  return words ? `Draw ${words}` : randomFrom(PROMPTS);
}

function Challenge() {
  const { slug } = Route.useParams();
  const [prompt] = useState(() => promptFromSlug(slug));
  return <GameScreen prompt={prompt} challengedBy="a friend" />;
}
