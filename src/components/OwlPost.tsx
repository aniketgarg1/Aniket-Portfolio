"use client";

import { motion } from "framer-motion";

/**
 * Decorative "Owl Post" flying across the contact section.
 * Triggered by `whileInView` so it only animates once you scroll the section.
 *
 * The owl rises, glides across the section, and lands at the right with the
 * envelope opening into a soft wax-seal glow.
 */
export default function OwlPost() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Flight path */}
      <motion.div
        initial={{ x: "-20%", y: 0, opacity: 0, rotate: -6 }}
        whileInView={{
          x: ["-20%", "20%", "55%", "82%"],
          y: [0, -28, -10, -40],
          opacity: [0, 1, 1, 0.85],
          rotate: [-6, 2, -2, 4],
        }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 7,
          times: [0, 0.35, 0.7, 1],
          ease: "easeInOut",
        }}
        className="absolute top-8 left-0 w-12 will-change-transform"
      >
        <OwlSvg />
        {/* trailing parchment shimmer */}
        <span
          className="absolute -left-8 top-3 h-px w-14"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(244,213,108,0.55), transparent)",
          }}
        />
      </motion.div>

      {/* Subtle wax-seal flash at the landing point */}
      <motion.span
        initial={{ opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: [0, 0, 1, 0], scale: [0.4, 0.6, 1.4, 1.1] }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 7, times: [0, 0.85, 0.95, 1], ease: "easeOut" }}
        className="absolute top-2 right-[12%] h-4 w-4 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,210,150,0.95) 0%, rgba(180,40,30,0.6) 60%, transparent 80%)",
          filter: "blur(0.6px)",
        }}
      />
    </div>
  );
}

function OwlSvg() {
  return (
    <svg viewBox="0 0 64 48" className="block w-full h-auto" aria-hidden>
      <defs>
        <linearGradient id="owl-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d6c2a0" />
          <stop offset="100%" stopColor="#7d5e3d" />
        </linearGradient>
        <linearGradient id="owl-wing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a3835a" />
          <stop offset="100%" stopColor="#4a361f" />
        </linearGradient>
      </defs>

      {/* Body */}
      <ellipse cx="32" cy="28" rx="11" ry="9" fill="url(#owl-body)" />
      {/* Head */}
      <ellipse cx="32" cy="18" rx="8" ry="7" fill="url(#owl-body)" />
      {/* Ear tufts */}
      <path d="M26 11 L24 7 L28 10 Z" fill="#5a4225" />
      <path d="M38 11 L40 7 L36 10 Z" fill="#5a4225" />
      {/* Eyes */}
      <circle cx="29" cy="18" r="2" fill="#fffce6" />
      <circle cx="35" cy="18" r="2" fill="#fffce6" />
      <circle cx="29" cy="18" r="0.8" fill="#1a1208" />
      <circle cx="35" cy="18" r="0.8" fill="#1a1208" />
      {/* Beak */}
      <path d="M32 20 L30 23 L34 23 Z" fill="#f1b441" />

      {/* Wings — flapping via CSS */}
      <g className="owl-wing-l">
        <path
          d="M21 24 C 8 16, -2 22, 2 32 C 8 30, 14 30, 22 28 Z"
          fill="url(#owl-wing)"
        />
      </g>
      <g className="owl-wing-r">
        <path
          d="M43 24 C 56 16, 66 22, 62 32 C 56 30, 50 30, 42 28 Z"
          fill="url(#owl-wing)"
        />
      </g>

      {/* Tiny scroll being carried */}
      <rect
        x="29"
        y="33"
        width="6"
        height="3"
        rx="1.2"
        fill="#f3e6c4"
        stroke="#8a6b32"
        strokeWidth="0.4"
      />
      <circle cx="32" cy="34.5" r="0.6" fill="#b13a2a" />

      <style>{`
        @keyframes owl-flap-l {
          0%, 100% { transform: rotate(-4deg) scaleY(1); }
          50% { transform: rotate(20deg) scaleY(0.85); }
        }
        @keyframes owl-flap-r {
          0%, 100% { transform: rotate(4deg) scaleY(1); }
          50% { transform: rotate(-20deg) scaleY(0.85); }
        }
        .owl-wing-l {
          transform-origin: 22px 24px;
          animation: owl-flap-l 0.28s ease-in-out infinite;
        }
        .owl-wing-r {
          transform-origin: 42px 24px;
          animation: owl-flap-r 0.28s ease-in-out infinite;
        }
      `}</style>
    </svg>
  );
}
