import type { Doodle } from "@/lib/doodle/storage";

export function DoodleThumb({ d }: { d: Doodle }) {
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
