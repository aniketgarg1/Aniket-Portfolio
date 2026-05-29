"use client";

import { useEffect, useRef, useState } from "react";

type Sparkle = { id: number; x: number; y: number; size: number; gold: boolean };

/**
 * Magical pointer FX:
 *  - "Lumos" — a soft warm light orb gently follows the cursor in dark mode
 *  - Wand sparks — tiny golden particles trail behind quick movements
 * Disabled on touch devices and when the user prefers reduced motion.
 */
export default function MagicalCursor() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const lastTime = useRef(0);
  const idRef = useRef(0);
  const lumosRef = useRef<HTMLDivElement | null>(null);

  // Track mouse for the Lumos orb (lerped for smooth lag).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let lumosX = mouseX;
    let lumosY = mouseY;
    let raf = 0;

    const animateLumos = () => {
      lumosX += (mouseX - lumosX) * 0.18;
      lumosY += (mouseY - lumosY) * 0.18;
      const el = lumosRef.current;
      if (el) {
        el.style.transform = `translate3d(${lumosX - 220}px, ${lumosY - 220}px, 0)`;
      }
      raf = requestAnimationFrame(animateLumos);
    };
    raf = requestAnimationFrame(animateLumos);

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Sparks — throttle to ~30 fps for cheap performance
      const now = performance.now();
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

    // Spell burst — fires a brief shower of sparks anywhere you click on
    // an interactive "spellbound" element (primary buttons, links, etc).
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const spellbound = target.closest(
        '.button-primary, .button-ghost, a[href^="#"], a[href^="mailto"], a[href^="http"]'
      );
      if (!spellbound) return;

      const cx = e.clientX;
      const cy = e.clientY;
      const burst: Sparkle[] = [];
      const ids: number[] = [];
      const N = 14;
      for (let i = 0; i < N; i++) {
        const ang = (i / N) * Math.PI * 2 + Math.random() * 0.6;
        const radius = 28 + Math.random() * 38;
        const id = ++idRef.current;
        ids.push(id);
        burst.push({
          id,
          x: cx + Math.cos(ang) * radius,
          y: cy + Math.sin(ang) * radius,
          size: 4 + Math.random() * 5,
          gold: Math.random() < 0.78,
        });
      }
      setSparkles((s) => [...s, ...burst].slice(-40));
      window.setTimeout(() => {
        setSparkles((s) => s.filter((p) => !ids.includes(p.id)));
      }, 950);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      {/* Lumos orb — only visible in dark mode, multiplies with the background */}
      <div
        ref={lumosRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[40] h-[440px] w-[440px] opacity-100 [.light_&]:opacity-0 transition-opacity duration-500 mix-blend-screen will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 220, 140, 0.16) 0%, rgba(255, 180, 80, 0.08) 30%, rgba(255, 150, 50, 0.025) 55%, transparent 72%)",
        }}
      />

      {/* Sparks layer */}
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
    </>
  );
}
