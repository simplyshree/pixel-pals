const BITS = ["🍓", "⭐", "✨", "🌷", "🍄", "👾", "♥", "🐸"];

export function Confetti({ count = 28 }: { count?: number }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${(i * 97) % 100}%`,
            animation: `confetti-fall ${2 + ((i * 13) % 15) / 10}s linear ${(i % 10) / 10}s forwards`,
          }}
        >
          {BITS[i % BITS.length]}
        </span>
      ))}
    </div>
  );
}
