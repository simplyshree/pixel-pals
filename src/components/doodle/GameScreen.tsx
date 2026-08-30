import { Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PixelCanvas } from "./PixelCanvas";
import { Confetti } from "./Confetti";
import { PALETTES, REACTIONS, randomFrom, slugify } from "@/lib/doodle/data";
import { bumpStreak, getSound, saveDoodle, setSound, type Doodle } from "@/lib/doodle/storage";
import { blip, chime } from "@/lib/doodle/sound";
import { downloadDataUrl, makeShareCard } from "@/lib/doodle/render";

const SIZES = [16, 24, 32];

type Props = {
  prompt: string;
  challengedBy?: string;
  onNewPrompt?: () => void;
};

export function GameScreen({ prompt, challengedBy, onNewPrompt }: Props) {
  const navigate = useNavigate();
  const [size, setSize] = useState(16);
  const [palette, setPalette] = useState(PALETTES[0]!);
  const [color, setColor] = useState(PALETTES[0]!.colors[3]!);
  const [erasing, setErasing] = useState(false);
  const [pixels, setPixels] = useState<(string | null)[]>(() => Array(16 * 16).fill(null));
  const [past, setPast] = useState<(string | null)[][]>([]);
  const [future, setFuture] = useState<(string | null)[][]>([]);
  const [timerOn, setTimerOn] = useState(true);
  const [left, setLeft] = useState(60);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState<Doodle | null>(null);
  const [cardUrl, setCardUrl] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [sound, setSoundState] = useState(true);
  const [egg, setEgg] = useState<string | null>(null);
  const clears = useRef(0);
  const started = useRef(Date.now());
  const lastPaint = useRef(Date.now());

  useEffect(() => setSoundState(getSound()), []);

  // reset when prompt or size changes
  useEffect(() => {
    setPixels(Array(size * size).fill(null));
    setPast([]);
    setFuture([]);
  }, [size]);

  useEffect(() => {
    setPixels(Array(size * size).fill(null));
    setPast([]);
    setFuture([]);
    setDone(false);
    setResult(null);
    setCardUrl(null);
    setSaved(false);
    setLeft(60);
    started.current = Date.now();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt]);

  const showEgg = useCallback((msg: string) => {
    setEgg(msg);
    setTimeout(() => setEgg((e) => (e === msg ? null : e)), 2600);
  }, []);

  const finish = useCallback(() => {
    setDone(true);
    const seconds = Math.max(1, Math.min(60, Math.round((Date.now() - started.current) / 1000)));
    const used = pixels.filter(Boolean);
    const reaction = randomFrom(REACTIONS);
    const d: Doodle = {
      id: `${Date.now()}`,
      prompt,
      size,
      pixels,
      seconds,
      date: new Date().toISOString(),
      reaction,
    };
    setResult(d);
    bumpStreak();
    chime(sound);
    if (seconds < 10) showEgg("speedrun???");
    else if (used.length === pixels.length) showEgg("you really said MAXIMALISM.");
    else if (new Set(used).size === 1 && used.length > 0) showEgg("minimalism.");
    try {
      setCardUrl(makeShareCard(d));
    } catch {
      setCardUrl(null);
    }
  }, [pixels, prompt, size, sound, showEgg]);

  // timer
  useEffect(() => {
    if (!timerOn || done) return;
    const t = setInterval(() => {
      setLeft((l) => {
        if (l <= 1) {
          clearInterval(t);
          return 0;
        }
        return l - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [timerOn, done]);

  useEffect(() => {
    if (timerOn && left === 0 && !done) finish();
  }, [left, timerOn, done, finish]);

  // idle nudge
  useEffect(() => {
    if (done) return;
    const t = setInterval(() => {
      if (Date.now() - lastPaint.current > 12000) {
        showEgg("the canvas believes in you.");
        lastPaint.current = Date.now();
      }
    }, 4000);
    return () => clearInterval(t);
  }, [done, showEgg]);

  const pushHistory = useCallback(() => {
    setPast((p) => [...p.slice(-40), pixels]);
    setFuture([]);
  }, [pixels]);

  const paint = (i: number) => {
    lastPaint.current = Date.now();
    setPixels((prev) => {
      const next = [...prev];
      const val = erasing ? null : color;
      if (next[i] === val) return prev;
      next[i] = val;
      return next;
    });
    blip(sound);
  };

  const undo = () => {
    setPast((p) => {
      if (!p.length) return p;
      setFuture((f) => [pixels, ...f]);
      setPixels(p[p.length - 1]!);
      return p.slice(0, -1);
    });
  };

  const redo = () => {
    setFuture((f) => {
      if (!f.length) return f;
      setPast((p) => [...p, pixels]);
      setPixels(f[0]!);
      return f.slice(1);
    });
  };

  const clear = () => {
    pushHistory();
    setPixels(Array(size * size).fill(null));
    clears.current += 1;
    if (clears.current === 5) showEgg("perfectionist detected.");
  };

  const shuffle = () => {
    const p = randomFrom(PALETTES.filter((x) => x.name !== palette.name));
    setPalette(p);
    setColor(p.colors[Math.min(3, p.colors.length - 1)]!);
  };

  const challengeUrl = useMemo(
    () => (typeof window !== "undefined" ? `${window.location.origin}/challenge/${slugify(prompt)}` : ""),
    [prompt],
  );

  if (done && result) {
    return (
      <Completion
        result={result}
        cardUrl={cardUrl}
        challengeUrl={challengeUrl}
        saved={saved}
        onSave={() => {
          saveDoodle(result);
          setSaved(true);
        }}
        onAgain={() => {
          if (onNewPrompt) onNewPrompt();
          else navigate({ to: "/" });
        }}
        egg={egg}
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 pb-10 pt-4 sm:max-w-lg">
      <div className="mb-3 flex items-center justify-between text-sm">
        <Link to="/" className="font-display font-extrabold text-primary">
          ← DoodlePop
        </Link>
        <button
          onClick={() => {
            const n = !sound;
            setSoundState(n);
            setSound(n);
          }}
          className="rounded-full border-2 border-foreground/20 px-3 py-1"
        >
          {sound ? "🔊 sound on" : "🔇 sound off"}
        </button>
      </div>

      <div className="doodle-card animate-pop-in mb-4 px-4 py-3 text-center">
        {challengedBy && <p className="text-xs text-muted-foreground">{challengedBy} challenged you 👀</p>}
        <p className="font-display text-lg font-extrabold leading-snug">{prompt}</p>
        <div className="mt-2 flex items-center justify-center gap-3 text-sm">
          <span className={`font-display text-xl ${timerOn && left <= 10 ? "text-primary" : ""}`}>
            {timerOn ? `⏱ ${left}s` : "⏱ off"}
          </span>
          <button onClick={() => setTimerOn((v) => !v)} className="text-xs text-muted-foreground underline">
            {timerOn ? "no pressure mode" : "turn timer on"}
          </button>
        </div>
      </div>

      <PixelCanvas size={size} pixels={pixels} onPaint={paint} onStrokeStart={pushHistory} />

      {egg && (
        <p className="animate-float-up mt-2 text-center font-display text-sm text-muted-foreground">{egg}</p>
      )}

      <div className="doodle-card mt-5 space-y-3 p-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {palette.colors.map((c) => (
            <button
              key={c}
              aria-label={`color ${c}`}
              onClick={() => {
                setColor(c);
                setErasing(false);
                blip(sound, 700);
              }}
              style={{ background: c }}
              className={`h-9 w-9 rounded-full border-[3px] transition-transform ${
                color === c && !erasing ? "scale-110 border-foreground" : "border-foreground/25"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-2">
          <button onClick={shuffle} className="chunky chunky-press bg-accent px-3 py-1.5 text-xs">
            🎨 {palette.name}
          </button>
          <div className="flex gap-1">
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`rounded-lg border-2 px-2 py-1 text-xs font-bold ${
                  size === s ? "border-foreground bg-secondary" : "border-foreground/20"
                }`}
              >
                {s}²
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <ToolBtn active={erasing} onClick={() => setErasing((v) => !v)} label="🩹 erase" />
          <ToolBtn onClick={undo} label="↩ undo" />
          <ToolBtn onClick={redo} label="↪ redo" />
          <ToolBtn onClick={clear} label="start over :(" />
        </div>

        <button
          onClick={finish}
          className="chunky chunky-press w-full bg-primary px-4 py-3 text-lg text-primary-foreground"
        >
          i&apos;m done ✨
        </button>
      </div>
    </div>
  );
}

function ToolBtn({ label, onClick, active }: { label: string; onClick: () => void; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border-2 border-foreground/25 px-1 py-2 text-xs font-bold transition-transform active:scale-95 ${
        active ? "bg-secondary border-foreground" : "bg-card"
      }`}
    >
      {label}
    </button>
  );
}

function Completion({
  result,
  cardUrl,
  challengeUrl,
  saved,
  onSave,
  onAgain,
  egg,
}: {
  result: Doodle;
  cardUrl: string | null;
  challengeUrl: string;
  saved: boolean;
  onSave: () => void;
  onAgain: () => void;
  egg: string | null;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="mx-auto w-full max-w-md px-4 pb-12 pt-6 text-center sm:max-w-lg">
      <Confetti />
      <h1 className="animate-pop-in font-display text-3xl">✨ ART HAS HAPPENED ✨</h1>
      <p className="mt-1 text-sm text-muted-foreground">{result.prompt}</p>

      <div className="mx-auto mt-4 max-w-xs">
        {cardUrl ? (
          <img src={cardUrl} alt={`Pixel doodle: ${result.prompt}`} className="doodle-frame w-full" />
        ) : null}
      </div>

      <p className="mt-4 font-display text-2xl text-primary">“{result.reaction}”</p>
      <p className="text-sm text-muted-foreground">finished in {result.seconds} second{result.seconds === 1 ? "" : "s"}</p>
      {egg && <p className="animate-float-up mt-1 font-display text-sm">{egg}</p>}

      <div className="mt-6 space-y-2">
        <button
          onClick={() => {
            const text = `i drew "${result.prompt}" in ${result.seconds}s on DoodlePop. can you do better?`;
            if (navigator.share) void navigator.share({ title: "DoodlePop", text, url: challengeUrl });
            else {
              void navigator.clipboard.writeText(`${text} ${challengeUrl}`);
              setCopied(true);
            }
          }}
          className="chunky chunky-press w-full bg-primary px-4 py-3 text-primary-foreground"
        >
          send this masterpiece 👀
        </button>
        <button
          onClick={() => {
            void navigator.clipboard.writeText(challengeUrl);
            setCopied(true);
          }}
          className="chunky chunky-press w-full bg-card px-4 py-2 text-sm"
        >
          {copied ? "copied! ♥" : "copy challenge link"}
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => cardUrl && downloadDataUrl(cardUrl, `doodlepop-${result.id}.png`)}
            className="chunky chunky-press bg-accent px-3 py-2 text-sm"
          >
            download
          </button>
          <button onClick={onAgain} className="chunky chunky-press bg-mint px-3 py-2 text-sm">
            new doodle
          </button>
        </div>
        <button onClick={onSave} disabled={saved} className="w-full pt-2 text-sm text-muted-foreground underline">
          {saved ? "saved to your tiny museum ♥" : "♡ save to tiny museum"}
        </button>
        <Link to="/museum" className="block text-xs text-muted-foreground underline">
          visit tiny museum
        </Link>
      </div>
    </div>
  );
}
