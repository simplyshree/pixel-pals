import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { deleteDoodle, loadGallery, type Doodle } from "@/lib/doodle/storage";
import { downloadDataUrl, makeShareCard } from "@/lib/doodle/render";

export const Route = createFileRoute("/museum")({
  head: () => ({
    meta: [
      { title: "tiny museum — your DoodlePop gallery" },
      { name: "description", content: "Every tiny pixel masterpiece you've made, framed in your own little museum." },
      { property: "og:title", content: "tiny museum" },
      { property: "og:description", content: "Your saved DoodlePop pixel drawings, all in one cozy grid." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Museum,
});

function Thumb({ d }: { d: Doodle }) {
  const cell = 100 / d.size;
  return (
    <div className="doodle-frame relative aspect-square w-full overflow-hidden bg-white">
      <div className="relative h-full w-full">
        {d.pixels.map((c, i) =>
          c ? (
            <span
              key={i}
              className="absolute"
              style={{
                background: c,
                left: `${(i % d.size) * cell}%`,
                top: `${Math.floor(i / d.size) * cell}%`,
                width: `${cell}%`,
                height: `${cell}%`,
              }}
            />
          ) : null,
        )}
      </div>
    </div>
  );
}

function Museum() {
  const [items, setItems] = useState<Doodle[]>([]);
  useEffect(() => setItems(loadGallery()), []);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-6">
      <Link to="/" className="font-display text-sm font-extrabold text-primary">
        ← DoodlePop
      </Link>
      <h1 className="mt-2 text-3xl">tiny museum 🖼️</h1>
      <p className="text-sm text-muted-foreground">everything you made, framed forever (or until you clear cookies).</p>

      {items.length === 0 ? (
        <div className="doodle-card mt-8 p-8 text-center">
          <p className="font-display text-lg">empty walls 🕸️</p>
          <Link to="/play" className="chunky chunky-press mt-4 inline-block bg-primary px-5 py-2 text-primary-foreground">
            go make something
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {items.map((d) => (
            <div key={d.id} className="group">
              <Thumb d={d} />
              <p className="mt-2 line-clamp-2 text-xs font-bold">{d.prompt}</p>
              <p className="text-[11px] text-muted-foreground">
                {new Date(d.date).toLocaleDateString()} · {d.seconds}s
              </p>
              <div className="mt-1 flex gap-2 text-[11px] underline">
                <button onClick={() => downloadDataUrl(makeShareCard(d), `doodlepop-${d.id}.png`)}>download</button>
                <Link to="/play" search={{ p: d.prompt }}>
                  redraw
                </Link>
                <button
                  className="text-destructive"
                  onClick={() => {
                    deleteDoodle(d.id);
                    setItems(loadGallery());
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
