"use client";

import { motion } from "framer-motion";

/**
 * An ornamental section divider built around the Deathly Hallows symbol
 * (triangle = cloak, circle = stone, line = wand). Subtle gold gradient
 * trails draw outward as it enters the viewport.
 */
export default function HallowsDivider({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`relative flex items-center justify-center gap-5 py-5 ${className}`}
    >
      {/* Left trail */}
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        className="block h-px w-24 sm:w-40 origin-right"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,55,0.55))",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 6, rotate: -8 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="flex items-center gap-3 text-accent"
        style={{ filter: "drop-shadow(0 0 10px rgba(244,213,108,0.28))" }}
      >
        <HallowsGlyph />
        {label && (
          <span
            className="font-display text-[11px] sm:text-[12px] font-semibold tracking-[0.42em] uppercase text-accent"
            style={{ textShadow: "0 0 12px rgba(244,213,108,0.4)" }}
          >
            {label}
          </span>
        )}
        <HallowsGlyph mirrored />
      </motion.div>

      {/* Right trail */}
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        className="block h-px w-24 sm:w-40 origin-left"
        style={{
          background:
            "linear-gradient(90deg, rgba(212,175,55,0.55), transparent)",
        }}
      />
    </div>
  );
}

function HallowsGlyph({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: mirrored ? "scaleX(-1)" : undefined }}
    >
      {/* Triangle (Cloak) */}
      <path
        d="M12 2 L22 21 L2 21 Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      {/* Wand */}
      <path
        d="M12 2 L12 21"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* Stone (circle) */}
      <circle
        cx="12"
        cy="13"
        r="4.2"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}
