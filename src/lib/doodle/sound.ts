let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

export function blip(enabled: boolean, freq = 520) {
  if (!enabled) return;
  const a = audio();
  if (!a) return;
  if (a.state === "suspended") void a.resume();
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = "square";
  o.frequency.value = freq + Math.random() * 60;
  g.gain.setValueAtTime(0.05, a.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + 0.08);
  o.connect(g).connect(a.destination);
  o.start();
  o.stop(a.currentTime + 0.09);
}

export function chime(enabled: boolean) {
  if (!enabled) return;
  [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => blip(true, f), i * 90));
}
