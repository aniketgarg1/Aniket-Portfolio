"use client";

import { useEffect, useState } from "react";

/**
 * A trail of footprints walking across the footer, in the style of the
 * Marauder's Map. Footprints fade in/out sequentially to suggest motion.
 */
export default function MaraudersFootprints({
  count = 10,
}: {
  count?: number;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const steps = Array.from({ length: count }, (_, i) => i);
  const period = count * 0.45; // total cycle in seconds

  return (
    <div
      aria-hidden
      className="pointer-events-none relative h-10 w-full overflow-hidden opacity-70"
    >
      {steps.map((i) => {
        const leftPct = (i / (count - 1)) * 100;
        const isLeft = i % 2 === 0;
        const delay = mounted ? (i / count) * period : 0;
        const yOffset = isLeft ? -6 : 6;
        return (
          <span
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${leftPct}%`,
              top: `calc(50% + ${yOffset}px)`,
              transform: `translate(-50%, -50%) rotate(${isLeft ? -16 : 16}deg)`,
              animation: `footprint-fade ${period}s linear ${-delay}s infinite`,
            }}
          >
            <FootprintSvg flip={!isLeft} />
          </span>
        );
      })}

      <style jsx>{`
        @keyframes footprint-fade {
          0% { opacity: 0; }
          10% { opacity: 0.95; }
          70% { opacity: 0.95; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function FootprintSvg({ flip }: { flip?: boolean }) {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      {/* Heel / pad */}
      <ellipse
        cx="8"
        cy="14"
        rx="4.5"
        ry="5.2"
        fill="rgb(var(--accent) / 0.85)"
      />
      {/* Toes */}
      <circle cx="5.2" cy="6" r="1.1" fill="rgb(var(--accent) / 0.85)" />
      <circle cx="7.4" cy="4.3" r="1.05" fill="rgb(var(--accent) / 0.85)" />
      <circle cx="9.8" cy="4.3" r="1.05" fill="rgb(var(--accent) / 0.85)" />
      <circle cx="12" cy="6" r="1.0" fill="rgb(var(--accent) / 0.85)" />
    </svg>
  );
}
