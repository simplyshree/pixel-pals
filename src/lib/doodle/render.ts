import type { Doodle } from "./storage";

const CREAM = "#fdf8ef";
const INK = "#2b2333";

export function drawPixelsToCanvas(
  ctx: CanvasRenderingContext2D,
  pixels: (string | null)[],
  size: number,
  x: number,
  y: number,
  box: number,
) {
  const cell = box / size;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x, y, box, box);
  for (let i = 0; i < pixels.length; i++) {
    const c = pixels[i];
    if (!c) continue;
    const cx = x + (i % size) * cell;
    const cy = y + Math.floor(i / size) * cell;
    ctx.fillStyle = c;
    ctx.fillRect(Math.floor(cx), Math.floor(cy), Math.ceil(cell), Math.ceil(cell));
  }
}

/** Renders a pretty share card and returns a data URL. */
export function makeShareCard(d: Doodle): string {
  const W = 800;
  const H = 1080;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = CREAM;
  ctx.fillRect(0, 0, W, H);

  // border
  ctx.strokeStyle = INK;
  ctx.lineWidth = 8;
  ctx.strokeRect(24, 24, W - 48, H - 48);

  ctx.textAlign = "center";
  ctx.fillStyle = INK;
  ctx.font = "bold 56px 'Baloo 2', system-ui, sans-serif";
  ctx.fillText("DoodlePop ✦", W / 2, 130);

  ctx.font = "italic 32px 'Nunito', system-ui, sans-serif";
  ctx.fillStyle = "#6b5f76";
  wrap(ctx, `"${d.prompt}"`, W / 2, 195, W - 160, 40);

  // art frame
  const box = 520;
  const x = (W - box) / 2;
  const y = 270;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x - 16, y - 16, box + 32, box + 32);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 6;
  ctx.strokeRect(x - 16, y - 16, box + 32, box + 32);
  ctx.imageSmoothingEnabled = false;
  drawPixelsToCanvas(ctx, d.pixels, d.size, x, y, box);

  ctx.fillStyle = INK;
  ctx.font = "bold 34px 'Baloo 2', system-ui, sans-serif";
  ctx.fillText(`“${d.reaction}”`, W / 2, y + box + 90);

  ctx.font = "26px 'Nunito', system-ui, sans-serif";
  ctx.fillStyle = "#6b5f76";
  ctx.fillText(`by ${d.author ?? "anonymous artist"}`, W / 2, y + box + 135);
  ctx.fillText(`made in ${d.seconds} second${d.seconds === 1 ? "" : "s"}`, W / 2, y + box + 172);

  ctx.font = "bold 30px 'Baloo 2', system-ui, sans-serif";
  ctx.fillStyle = "#e05780";
  ctx.fillText("can you do better?", W / 2, H - 100);
  ctx.font = "22px 'Nunito', system-ui, sans-serif";
  ctx.fillStyle = "#6b5f76";
  ctx.fillText("doodlepop", W / 2, H - 60);

  return canvas.toDataURL("image/png");
}

function wrap(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lh: number) {
  const words = text.split(" ");
  let line = "";
  let yy = y;
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, yy);
      line = w;
      yy += lh;
    } else line = test;
  }
  ctx.fillText(line, x, yy);
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}
