import { useCallback, useEffect, useRef } from "react";

type Props = {
  size: number;
  pixels: (string | null)[];
  onPaint: (index: number) => void;
  onStrokeStart: () => void;
  disabled?: boolean;
  showGrid?: boolean;
};

export function PixelCanvas({ size, pixels, onPaint, onStrokeStart, disabled, showGrid = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const painting = useRef(false);
  const lastIndex = useRef(-1);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== Math.round(rect.width * dpr)) {
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.width * dpr);
    }
    const px = canvas.width;
    const cell = px / size;
    ctx.clearRect(0, 0, px, px);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, px, px);
    for (let i = 0; i < size * size; i++) {
      const c = pixels[i];
      if (!c) continue;
      ctx.fillStyle = c;
      ctx.fillRect(Math.floor((i % size) * cell), Math.floor(Math.floor(i / size) * cell), Math.ceil(cell), Math.ceil(cell));
    }
    if (showGrid) {
      ctx.strokeStyle = "rgba(43,35,51,0.08)";
      ctx.lineWidth = 1;
      for (let i = 1; i < size; i++) {
        const p = Math.floor(i * cell) + 0.5;
        ctx.beginPath();
        ctx.moveTo(p, 0);
        ctx.lineTo(p, px);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, p);
        ctx.lineTo(px, p);
        ctx.stroke();
      }
    }
  }, [pixels, size, showGrid]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  const indexAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return -1;
    const r = canvas.getBoundingClientRect();
    const x = Math.floor(((clientX - r.left) / r.width) * size);
    const y = Math.floor(((clientY - r.top) / r.height) * size);
    if (x < 0 || y < 0 || x >= size || y >= size) return -1;
    return y * size + x;
  };

  const paintAt = (clientX: number, clientY: number) => {
    const i = indexAt(clientX, clientY);
    if (i < 0 || i === lastIndex.current) return;
    lastIndex.current = i;
    onPaint(i);
  };

  return (
    <div className="doodle-frame">
      <canvas
        ref={canvasRef}
        className="block w-full aspect-square touch-none rounded-[6px] cursor-crosshair"
        onPointerDown={(e) => {
          if (disabled) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          painting.current = true;
          lastIndex.current = -1;
          onStrokeStart();
          paintAt(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (disabled || !painting.current) return;
          paintAt(e.clientX, e.clientY);
        }}
        onPointerUp={() => {
          painting.current = false;
          lastIndex.current = -1;
        }}
        onPointerCancel={() => {
          painting.current = false;
        }}
      />
    </div>
  );
}
