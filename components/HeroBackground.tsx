import { useEffect, useRef } from "react";

const translate = (x: number, y: number) => `translate(${x}px, ${y}px)`;

export default function HeroBackground() {
  const gridRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const layer = layerRef.current;
    const hero = layer?.parentElement;
    if (!hero || !layer || !grid) return;

    const cell = parseFloat(getComputedStyle(grid).backgroundSize);
    const dots = Array.from(layer.children);
    const media = matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let lastStart = -Infinity;
    let lastNode = "";
    let horizontalFirst = true;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.timeStamp - lastStart < 550) return;
      const dot = dots.find(element => element.getAnimations().length === 0);
      if (!dot) return;

      const { left, top, width, height } = layer.getBoundingClientRect();
      const x = Math.min(Math.round((event.clientX - left) / cell), Math.floor(width / cell)) * cell;
      const y = Math.min(Math.round((event.clientY - top) / cell), Math.floor(height / cell)) * cell;
      const node = `${x},${y}`;
      if (node === lastNode) return;

      // Follow the pointer's direction, turning inward at the outside edges.
      const dx = x < cell || (x + cell < width && event.movementX >= 0) ? cell : -cell;
      const dy = y < cell || (y + cell < height && event.movementY >= 0) ? cell : -cell;
      const stepX = horizontalFirst ? dx : 0;
      const stepY = horizontalFirst ? 0 : dy;
      dot.animate([
        { transform: translate(x, y), opacity: 0.2 },
        { transform: translate(x + stepX * 0.16, y + stepY * 0.16), opacity: 0.95, offset: 0.08 },
        { transform: translate(x + stepX, y + stepY), opacity: 0.95, offset: 0.5 },
        { transform: translate(x + dx, y + dy), opacity: 0 },
      ], { duration: 1500, easing: "linear" });

      horizontalFirst = !horizontalFirst;
      lastStart = event.timeStamp;
      lastNode = node;
    };

    const stop = () => {
      hero.removeEventListener("pointermove", onMove);
      dots.forEach(dot => dot.getAnimations().forEach(animation => animation.cancel()));
      lastNode = "";
      lastStart = -Infinity;
    };
    const sync = () => {
      if (media.matches) hero.addEventListener("pointermove", onMove, { passive: true });
      else stop();
    };
    sync();
    media.addEventListener("change", sync);
    return () => {
      media.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return (
    <>
      <div ref={gridRef} className="absolute inset-0 grid-bg pointer-events-none" />
      <div ref={layerRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <span className="hero-grid-pulse" />
        <span className="hero-grid-pulse" />
      </div>
    </>
  );
}
