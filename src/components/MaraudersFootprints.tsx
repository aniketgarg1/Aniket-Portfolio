"use client";

import { useEffect, useState } from "react";

/**
 * A trail of footprints walking across the footer, in the style of the
 * Marauder's Map. Footprints fade in/out in sequence to suggest a figure
 * walking past — inset from the edges so none are clipped, with a steady
 * baseline so the trail reads cleanly and never crowds the text around it.
 */
export default function MaraudersFootprints({ count = 9 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  const [steps, setSteps] = useState(count);

  useEffect(() => {
    setMounted(true);
    // Fewer prints on narrow screens so they stay evenly spaced, never cramped.
    const fit = () =>
      setSteps(window.innerWidth < 640 ? Math.min(6, count) : count);
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [count]);

  const items = Array.from({ length: steps }, (_, i) => i);
  const period = steps * 0.5; // total walk cycle in seconds
  const INSET = 8; // % margin so first/last prints aren't clipped

  return (
    <div
      aria-hidden
      className="pointer-events-none relative mx-auto h-9 w-full max-w-md overflow-hidden"
    >
      {items.map((i) => {
        const leftPct = INSET + (i / (steps - 1)) * (100 - INSET * 2);
        const isLeft = i % 2 === 0;
        const delay = mounted ? (i / steps) * period : 0;
        const yOffset = isLeft ? -4 : 4; // gentle, even gait
        return (
          <span
            key={i}
            className="absolute"
            style={{
              left: `${leftPct}%`,
              top: `calc(50% + ${yOffset}px)`,
              transform: `translate(-50%, -50%) rotate(${isLeft ? -14 : 14}deg)`,
              animation: `footprint-step ${period}s ease-in-out ${-delay}s infinite`,
            }}
          >
            <FootprintSvg flip={!isLeft} />
          </span>
        );
      })}

      <style jsx>{`
        @keyframes footprint-step {
          0% {
            opacity: 0;
          }
          8% {
            opacity: 0.85;
          }
          26% {
            opacity: 0.85;
          }
          42% {
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

function FootprintSvg({ flip }: { flip?: boolean }) {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 16 20"
      fill="none"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      {/* Heel / pad */}
      <ellipse cx="8" cy="14" rx="4.5" ry="5.2" fill="rgb(var(--accent) / 0.8)" />
      {/* Toes */}
      <circle cx="5.2" cy="6" r="1.1" fill="rgb(var(--accent) / 0.8)" />
      <circle cx="7.4" cy="4.3" r="1.05" fill="rgb(var(--accent) / 0.8)" />
      <circle cx="9.8" cy="4.3" r="1.05" fill="rgb(var(--accent) / 0.8)" />
      <circle cx="12" cy="6" r="1.0" fill="rgb(var(--accent) / 0.8)" />
    </svg>
  );
}
