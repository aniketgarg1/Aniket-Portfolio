"use client";

import { useEffect, useState } from "react";

/**
 * A thin gold "wand trace" that draws across the top of the page as you scroll.
 * Pure CSS transform — paints once per scroll event via passive listener.
 */
export default function WandScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0;
      setPct(p);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px]"
    >
      <div
        className="relative h-full origin-left"
        style={{
          transform: `scaleX(${pct})`,
          transition: "transform 80ms linear",
          background:
            "linear-gradient(90deg, rgba(212,175,55,0) 0%, rgba(212,175,55,0.65) 10%, #f4d56c 50%, rgba(212,175,55,0.65) 90%, rgba(212,175,55,0) 100%)",
          boxShadow: "0 0 12px rgba(244,213,108,0.55)",
        }}
      >
        {/* leading wand tip glow */}
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, #fff5c2 0%, #ffd86b 40%, transparent 70%)",
            boxShadow:
              "0 0 12px rgba(255,213,108,0.9), 0 0 22px rgba(255,170,60,0.55)",
            opacity: pct > 0.005 && pct < 0.995 ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
}
