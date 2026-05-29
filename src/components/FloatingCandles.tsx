"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Candle = {
  x: number; // %
  y: number; // %
  scale: number;
  delay: number; // s
  flickerDelay: number; // s
  depth: number; // 0..1 — parallax strength (closer candles move more)
};

/**
 * Great-Hall-style floating candles.
 * Pure CSS — no canvas, no heavy JS.
 * Renders inside its parent (which must be position: relative).
 *
 * Adds subtle mouse parallax so the candles feel like they hang in a real space.
 */
export default function FloatingCandles({ count = 5 }: { count?: number }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Stable positions per mount — looks intentional, not jittery.
  const candles = useMemo<Candle[]>(() => {
    const presets: Candle[] = [
      { x: 8, y: 12, scale: 0.8, delay: 0, flickerDelay: 0, depth: 0.6 },
      { x: 78, y: 8, scale: 1, delay: 1.3, flickerDelay: 0.4, depth: 1 },
      { x: 88, y: 36, scale: 0.7, delay: 2.1, flickerDelay: 0.9, depth: 0.4 },
      { x: 14, y: 62, scale: 0.9, delay: 0.6, flickerDelay: 1.2, depth: 0.85 },
      { x: 70, y: 70, scale: 0.75, delay: 3.0, flickerDelay: 0.6, depth: 0.5 },
      { x: 50, y: 18, scale: 0.65, delay: 1.8, flickerDelay: 1.6, depth: 0.3 },
    ];
    return presets.slice(0, count);
  }, [count]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // -1 .. 1
      target = {
        x: (e.clientX - cx) / rect.width,
        y: (e.clientY - cy) / rect.height,
      };
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.07;
      current.y += (target.y - current.y) * 0.07;
      setParallax({ x: current.x, y: current.y });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {candles.map((c, i) => (
        <div
          key={i}
          className="absolute will-change-transform"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            transform: `translate(${parallax.x * c.depth * -22}px, ${parallax.y * c.depth * -14}px)`,
            transition: "transform 0.05s linear",
          }}
        >
          <div
            className="animate-float-slow"
            style={{
              transform: `scale(${c.scale})`,
              animationDelay: `${c.delay}s`,
            }}
          >
            {/* Flame */}
            <div
              className="relative h-4 w-2 rounded-full origin-bottom animate-flicker"
              style={{
                animationDelay: `${c.flickerDelay}s`,
                background:
                  "radial-gradient(ellipse at 50% 70%, #fff7c4 0%, #ffd86b 35%, #f59f3a 70%, transparent 100%)",
                boxShadow:
                  "0 0 12px rgba(255,200,90,0.7), 0 0 36px rgba(255,170,60,0.4), 0 0 60px rgba(255,140,40,0.18)",
                filter: "blur(0.4px)",
              }}
            />
            {/* Wick */}
            <div className="mx-auto h-1 w-px bg-[#3a2a18]" />
            {/* Wax pillar */}
            <div
              className="mx-auto h-10 w-1.5 rounded-sm"
              style={{
                background:
                  "linear-gradient(180deg, #f3e6c4 0%, #e3cf95 60%, #c9b277 100%)",
                boxShadow:
                  "inset -1px 0 0 rgba(0,0,0,0.15), 0 6px 16px rgba(0,0,0,0.25)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
