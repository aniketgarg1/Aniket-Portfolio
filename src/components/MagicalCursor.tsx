"use client";

import { useEffect, useRef, useState } from "react";

type Sparkle = { id: number; x: number; y: number; size: number; gold: boolean };

/**
 * Tiny golden particles that trail the cursor — like wand sparks.
 * Disabled on touch devices and when user prefers reduced motion.
 */
export default function MagicalCursor() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const lastTime = useRef(0);
  const idRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      // Throttle to ~30 fps and add small offset jitter for natural feel
      if (now - lastTime.current < 35) return;
      lastTime.current = now;

      const id = ++idRef.current;
      const jitter = () => (Math.random() - 0.5) * 14;
      const newSparkle: Sparkle = {
        id,
        x: e.clientX + jitter(),
        y: e.clientY + jitter(),
        size: 4 + Math.random() * 4,
        gold: Math.random() < 0.7,
      };
      setSparkles((s) => {
        const next = [...s, newSparkle];
        return next.length > 18 ? next.slice(-18) : next;
      });
      window.setTimeout(() => {
        setSparkles((s) => s.filter((p) => p.id !== id));
      }, 900);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            background: s.gold
              ? "radial-gradient(circle, #fff5c2 0%, #ffd86b 40%, transparent 70%)"
              : "radial-gradient(circle, #ffffff 0%, #f5e6d3 50%, transparent 70%)",
            boxShadow: s.gold
              ? "0 0 10px rgba(255,200,90,0.7), 0 0 18px rgba(255,170,60,0.4)"
              : "0 0 8px rgba(255,240,200,0.5)",
            animation: "sparkle-fade 0.9s ease-out forwards",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes sparkle-fade {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.2) translateY(8px);
          }
        }
      `}</style>
    </div>
  );
}
