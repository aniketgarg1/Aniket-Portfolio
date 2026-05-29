"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Type "patronus" anywhere on the page (outside an input) and a silver stag
 * gallops across the screen, leaving a misty trail. Also fires the toast.
 *
 * Available globally; non-intrusive and respects reduced-motion.
 */
export default function ExpectoPatronum() {
  const [active, setActive] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Show the hint after the page settles, hide it after a few seconds,
    // and don't show again if the user has cast Patronus before.
    if (typeof window === "undefined") return;
    const cast = window.localStorage.getItem("patronus-cast") === "1";
    if (cast) return;
    const show = window.setTimeout(() => setShowHint(true), 2200);
    const hide = window.setTimeout(() => setShowHint(false), 8500);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SPELL = "patronus";
    let buffer = "";

    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (!/^[a-zA-Z]$/.test(e.key)) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-SPELL.length);
      if (buffer === SPELL) {
        buffer = "";
        if (active) return;
        setActive(true);
        setShowHint(false);
        try {
          window.localStorage.setItem("patronus-cast", "1");
        } catch {
          /* ignore */
        }
        window.setTimeout(() => setActive(false), 5200);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      {/* Hint that fades after 5.5s */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            key="hint"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-5 left-5 z-[58] hidden md:flex items-center gap-2 rounded-full border px-3.5 py-2 backdrop-blur-md"
            style={{
              borderColor: "rgba(190, 220, 255, 0.25)",
              background:
                "linear-gradient(135deg, rgba(40,55,90,0.7), rgba(20,28,55,0.7))",
              color: "#dceaff",
              boxShadow: "0 8px 24px -8px rgba(150,180,240,0.25)",
            }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-sky-200/80">
              Try typing
            </span>
            <kbd className="font-mono text-[11px] text-sky-100 bg-sky-300/10 border border-sky-200/25 rounded px-1.5 py-0.5">
              patronus
            </kbd>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <motion.div
            key="patronus"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none fixed inset-0 z-[80] overflow-hidden"
          >
            {/* Silver flash */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.55, 0.15, 0] }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 50%, rgba(220,240,255,0.6) 0%, transparent 65%)",
                mixBlendMode: "screen",
              }}
            />

            {/* Stag gallop across the screen */}
            <motion.div
              initial={{ x: "-25vw", y: "30vh", opacity: 0, scale: 0.7 }}
              animate={{
                x: ["−25vw", "30vw", "65vw", "115vw"],
                y: ["30vh", "20vh", "35vh", "25vh"],
                opacity: [0, 1, 1, 0],
                scale: [0.7, 1, 1.05, 0.95],
              }}
              transition={{ duration: 4.8, times: [0, 0.25, 0.65, 1], ease: "easeInOut" }}
              className="absolute will-change-transform"
              style={{
                filter:
                  "drop-shadow(0 0 18px rgba(200, 225, 255, 0.85)) drop-shadow(0 0 36px rgba(160, 200, 255, 0.55))",
              }}
            >
              <StagSvg />
            </motion.div>

            {/* "Expecto Patronum" caption */}
            <motion.div
              initial={{ opacity: 0, y: 14, letterSpacing: "0.1em" }}
              animate={{ opacity: [0, 1, 1, 0], y: [14, 0, 0, -8], letterSpacing: ["0.1em", "0.4em", "0.4em", "0.5em"] }}
              transition={{ duration: 4.8, times: [0, 0.18, 0.78, 1], ease: "easeOut" }}
              className="absolute top-[18%] left-1/2 -translate-x-1/2 text-center"
            >
              <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-sky-200/85">
                Incantation Cast
              </div>
              <div
                className="mt-2 font-wizard font-black text-balance"
                style={{
                  fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
                  color: "#e9f3ff",
                  textShadow:
                    "0 0 16px rgba(170,210,255,0.85), 0 0 36px rgba(120,170,240,0.55)",
                }}
              >
                Expecto Patronum
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* The stag, drawn as a single silvery silhouette. */
function StagSvg() {
  return (
    <svg viewBox="0 0 240 160" width={240} height={160} aria-hidden>
      <defs>
        <linearGradient id="stag-silver" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#dbe9ff" />
          <stop offset="100%" stopColor="#9bbbeb" />
        </linearGradient>
      </defs>
      <g fill="url(#stag-silver)" opacity="0.95">
        {/* Body */}
        <path d="M40 90 C 60 70, 100 65, 140 78 C 170 86, 195 88, 200 95 C 196 100, 178 100, 165 100 L 60 100 C 50 100, 42 96, 40 90 Z" />
        {/* Neck */}
        <path d="M150 80 C 158 60, 170 45, 178 40 L 188 44 C 184 60, 176 78, 168 86 Z" />
        {/* Head */}
        <ellipse cx="190" cy="38" rx="14" ry="9" />
        {/* Snout */}
        <ellipse cx="204" cy="42" rx="6" ry="3.5" />
        {/* Antlers */}
        <path
          d="M186 30 L182 16 M186 30 L178 22 M186 30 L172 26 M194 30 L198 14 M194 30 L204 18 M194 30 L210 22"
          stroke="url(#stag-silver)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Front legs */}
        <path d="M150 100 L 146 140 L 142 140 L 144 100 Z" />
        <path d="M160 100 L 158 140 L 154 140 L 156 100 Z" />
        {/* Back legs */}
        <path d="M70 100 L 64 140 L 60 140 L 64 100 Z" />
        <path d="M86 100 L 82 140 L 78 140 L 82 100 Z" />
        {/* Tail */}
        <path d="M40 90 L 28 78 L 30 92 Z" />
      </g>
      {/* Misty wisp */}
      <ellipse cx="100" cy="120" rx="80" ry="14" fill="rgba(200,225,255,0.18)" />
    </svg>
  );
}
