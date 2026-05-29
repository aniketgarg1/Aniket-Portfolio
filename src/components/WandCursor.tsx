"use client";

import { useEffect, useRef, useState } from "react";

type Spark = { id: number; x: number; y: number; size: number; gold: boolean };

/**
 * Replaces the native cursor with a magic wand whose tip sits exactly at the
 * pointer. The tip trails golden sparks as you move and bursts when you click
 * an interactive element. A soft "Lumos" glow follows in dark mode.
 *
 * Disabled on touch devices and when the user prefers reduced motion — the
 * native cursor is kept in those cases.
 */
export default function WandCursor() {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [pressed, setPressed] = useState(false);
  const wandRef = useRef<HTMLDivElement | null>(null);
  const lumosRef = useRef<HTMLDivElement | null>(null);
  const idRef = useRef(0);
  const lastSpark = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add("wand-active");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let lumosX = mouseX;
    let lumosY = mouseY;
    let raf = 0;

    const render = () => {
      // Wand tip locks to the pointer (so clicks feel accurate).
      const wand = wandRef.current;
      if (wand) {
        wand.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      // Lumos light lags slightly behind for a soft, floaty glow.
      lumosX += (mouseX - lumosX) * 0.16;
      lumosY += (mouseY - lumosY) * 0.16;
      const lumos = lumosRef.current;
      if (lumos) {
        lumos.style.transform = `translate3d(${lumosX - 210}px, ${lumosY - 210}px, 0)`;
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const spawnSparks = (x: number, y: number, n: number, spread: number) => {
      const created: Spark[] = [];
      const ids: number[] = [];
      for (let i = 0; i < n; i++) {
        const id = ++idRef.current;
        ids.push(id);
        const ang = Math.random() * Math.PI * 2;
        const r = Math.random() * spread;
        created.push({
          id,
          x: x + Math.cos(ang) * r,
          y: y + Math.sin(ang) * r,
          size: 3 + Math.random() * 4,
          gold: Math.random() < 0.75,
        });
      }
      setSparks((s) => [...s, ...created].slice(-46));
      window.setTimeout(() => {
        setSparks((s) => s.filter((p) => !ids.includes(p.id)));
      }, 900);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const now = performance.now();
      if (now - lastSpark.current < 40) return;
      lastSpark.current = now;
      spawnSparks(e.clientX, e.clientY, 1, 8);
    };

    const onDown = (e: MouseEvent) => {
      setPressed(true);
      spawnSparks(e.clientX, e.clientY, 14, 34);
    };
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("wand-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      {/* Lumos glow (dark mode only) */}
      <div
        ref={lumosRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[55] h-[420px] w-[420px] opacity-100 [.light_&]:opacity-0 transition-opacity duration-500 mix-blend-screen will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(255,221,140,0.14) 0%, rgba(255,184,82,0.07) 32%, rgba(255,150,50,0.02) 56%, transparent 72%)",
        }}
      />

      {/* The wand — its tip is anchored to the pointer position */}
      <div
        ref={wandRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[120] will-change-transform"
      >
        <div
          style={{
            transform: `rotate(${pressed ? -6 : 0}deg) scale(${pressed ? 0.96 : 1})`,
            transition: "transform 120ms ease",
            transformOrigin: "0 0",
          }}
        >
          <WandSvg />
        </div>
      </div>

      {/* Spark particles */}
      <div className="pointer-events-none fixed inset-0 z-[119] overflow-hidden">
        {sparks.map((s) => (
          <span
            key={s.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              background: s.gold
                ? "radial-gradient(circle, #fff5c2 0%, #ffd86b 42%, transparent 72%)"
                : "radial-gradient(circle, #ffffff 0%, #f5e6d3 52%, transparent 72%)",
              boxShadow: s.gold
                ? "0 0 9px rgba(255,200,90,0.75), 0 0 16px rgba(255,170,60,0.4)"
                : "0 0 7px rgba(255,240,200,0.55)",
              animation: "wand-spark 0.9s ease-out forwards",
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes wand-spark {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.2) translateY(10px);
          }
        }
      `}</style>
    </>
  );
}

/* The wand graphic. Tip is at SVG (0,0); the shaft extends down-right so the
   wand looks held from the lower right, pointing at the cursor. Kept short. */
function WandSvg() {
  return (
    <svg
      width="76"
      height="76"
      viewBox="0 0 76 76"
      fill="none"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="wand-wood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8d3a8" />
          <stop offset="20%" stopColor="#7a5230" />
          <stop offset="58%" stopColor="#4a3018" />
          <stop offset="100%" stopColor="#2a1a0c" />
        </linearGradient>
        <radialGradient id="wand-tip" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffbe6" />
          <stop offset="40%" stopColor="#ffe28a" />
          <stop offset="100%" stopColor="rgba(255,200,90,0)" />
        </radialGradient>
      </defs>

      {/* Soft tip glow */}
      <circle cx="8" cy="8" r="10" fill="url(#wand-tip)" />

      {/* Wand shaft: tip (thin, light) to handle (thick, dark) */}
      <path
        d="M6 6 L57 60"
        stroke="url(#wand-wood)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Lighter edge highlight along the shaft */}
      <path
        d="M6.5 6.5 L54 58"
        stroke="rgba(255,240,210,0.3)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Handle knob */}
      <circle cx="59" cy="62" r="5" fill="#241407" />
      <circle cx="57.6" cy="60.6" r="1.7" fill="rgba(255,230,180,0.35)" />

      {/* Bright tip core */}
      <circle cx="7" cy="7" r="2.8" fill="#fffbe6" />
      <circle cx="7" cy="7" r="1.5" fill="#ffffff" />
    </svg>
  );
}
