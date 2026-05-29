"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A flying Golden Snitch easter egg.
 *
 * - Lazily glides across the viewport on a slow, curving path
 * - Wings flutter via CSS transform
 * - Clickable; catching it shows a "150 points to Ravenclaw!" toast
 * - Persists "caught" state in localStorage so it doesn't re-spawn each visit
 * - Respects prefers-reduced-motion (renders nothing)
 */
export default function GoldenSnitch() {
  const [caught, setCaught] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [pos, setPos] = useState({ x: -120, y: 200 });
  const [angle, setAngle] = useState(0);
  const rafRef = useRef<number | null>(null);

  // Init: load caught state + decide whether to spawn
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHidden(true);
      return;
    }
    const wasCaught = window.localStorage.getItem("snitch-caught") === "1";
    if (wasCaught) {
      // Still spawn occasionally for the joy of it — 25% chance
      if (Math.random() > 0.25) setHidden(true);
    }
  }, []);

  // Flight path: smooth meandering using a few overlapping sinusoids
  useEffect(() => {
    if (hidden || caught) return;
    const start = performance.now() + 4000; // brief delay so user sees the page first
    const speed = 0.00018; // smaller = slower

    const tick = (now: number) => {
      const t = Math.max(0, now - start);
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Drift horizontally across the screen with a long period (~25s).
      // X cycles -10% .. 110% so the snitch enters/exits naturally.
      const xNorm = 0.5 + 0.65 * Math.sin(t * speed);
      const yNorm =
        0.35 +
        0.18 * Math.sin(t * speed * 2.7 + 1.3) +
        0.05 * Math.sin(t * speed * 5.1);

      const x = xNorm * w;
      const y = yNorm * h;

      // Compute heading for wing/body rotation (degrees)
      const dxdt =
        Math.cos(t * speed) * speed * w * 0.65 +
        // tiny secondary
        Math.cos(t * speed * 5.1) * speed * 5.1 * w * 0.02;
      const dydt =
        Math.cos(t * speed * 2.7 + 1.3) * speed * 2.7 * h * 0.18 +
        Math.cos(t * speed * 5.1) * speed * 5.1 * h * 0.05;
      const heading = (Math.atan2(dydt, dxdt) * 180) / Math.PI;

      setPos({ x, y });
      setAngle(heading);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hidden, caught]);

  const onCatch = () => {
    if (caught) return;
    setCaught(true);
    setShowToast(true);
    try {
      window.localStorage.setItem("snitch-caught", "1");
    } catch {
      /* ignore */
    }
    window.setTimeout(() => setShowToast(false), 4200);
  };

  if (hidden) return null;

  return (
    <>
      {!caught && (
        <button
          type="button"
          aria-label="Catch the Golden Snitch"
          onClick={onCatch}
          className="fixed z-[55] -translate-x-1/2 -translate-y-1/2 cursor-pointer outline-none"
          style={{
            left: pos.x,
            top: pos.y,
            transform: `translate(-50%, -50%) rotate(${angle * 0.15}deg)`,
            transition: "transform 80ms linear",
            filter: "drop-shadow(0 0 14px rgba(255, 200, 80, 0.55))",
          }}
        >
          <SnitchSvg />
        </button>
      )}

      {/* Caught toast */}
      <div
        aria-live="polite"
        className={[
          "fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 transition-all duration-500",
          showToast
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none",
        ].join(" ")}
      >
        <div
          className="flex items-center gap-3 rounded-full border px-4 py-2.5 backdrop-blur-md shadow-xl"
          style={{
            borderColor: "rgba(212, 175, 55, 0.45)",
            background:
              "linear-gradient(135deg, rgba(20, 16, 36, 0.92), rgba(38, 26, 8, 0.92))",
            color: "#f5e6b8",
            boxShadow:
              "0 10px 40px -10px rgba(212,175,55,0.45), 0 0 0 1px rgba(212,175,55,0.15)",
          }}
        >
          <span className="relative inline-flex h-5 w-5 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-amber-300/40" />
            <span className="relative h-2 w-2 rounded-full bg-amber-300" />
          </span>
          <span className="font-display text-sm tracking-wide">
            Snitch caught — <span className="text-amber-300">150 points to Ravenclaw!</span>
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes snitch-wing-l {
          0%, 100% { transform: rotate(-15deg) scaleX(1); }
          50% { transform: rotate(-55deg) scaleX(0.4); }
        }
        @keyframes snitch-wing-r {
          0%, 100% { transform: rotate(15deg) scaleX(1); }
          50% { transform: rotate(55deg) scaleX(0.4); }
        }
        :global(.snitch-wing-l) {
          transform-origin: 100% 50%;
          animation: snitch-wing-l 0.18s ease-in-out infinite;
        }
        :global(.snitch-wing-r) {
          transform-origin: 0% 50%;
          animation: snitch-wing-r 0.18s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}

function SnitchSvg() {
  return (
    <svg
      width="44"
      height="28"
      viewBox="0 0 44 28"
      fill="none"
      aria-hidden
    >
      <defs>
        <radialGradient id="snitch-body" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fff3b0" />
          <stop offset="55%" stopColor="#f5c249" />
          <stop offset="100%" stopColor="#a07410" />
        </radialGradient>
        <linearGradient id="snitch-wing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="100%" stopColor="rgba(255,240,200,0.15)" />
        </linearGradient>
      </defs>

      {/* Left wing */}
      <g className="snitch-wing-l">
        <path
          d="M22 14 C 12 6, 4 6, 0 10 C 4 12, 10 14, 22 14 Z"
          fill="url(#snitch-wing)"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.5"
        />
      </g>
      {/* Right wing */}
      <g className="snitch-wing-r">
        <path
          d="M22 14 C 32 6, 40 6, 44 10 C 40 12, 34 14, 22 14 Z"
          fill="url(#snitch-wing)"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.5"
        />
      </g>

      {/* Body */}
      <circle cx="22" cy="14" r="6" fill="url(#snitch-body)" />
      {/* Highlight */}
      <circle cx="20" cy="12" r="1.6" fill="rgba(255,255,255,0.85)" />
      {/* Equator line */}
      <ellipse
        cx="22"
        cy="14"
        rx="6"
        ry="1.2"
        fill="none"
        stroke="rgba(80,50,5,0.6)"
        strokeWidth="0.4"
      />
    </svg>
  );
}
