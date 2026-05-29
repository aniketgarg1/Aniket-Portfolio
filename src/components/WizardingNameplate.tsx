"use client";

import { motion } from "framer-motion";

/**
 * Hero nameplate set in the authentic "Harry Potter" display font
 * (loaded via CDN in globals.css, class `.font-hp`).
 *
 * The font itself carries the iconic lightning-bolt flourishes, so the
 * treatment here stays clean: a single gold-gradient wordmark with a soft
 * candlelight bloom behind it and a readable subtitle ribbon below.
 */
export default function WizardingNameplate({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  const full = `${firstName} ${lastName}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.14 }}
      className="relative mt-4 inline-block select-none"
      aria-label={full}
    >
      {/* Candlelight bloom behind the name */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-x-12 -top-10 -bottom-8 -z-10 opacity-90 [.light_&]:opacity-40"
        style={{
          background:
            "radial-gradient(55% 60% at 45% 55%, rgba(244,213,108,0.22) 0%, transparent 70%)",
          filter: "blur(26px)",
        }}
      />

      {/* The wordmark in the Harry Potter font */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        className="font-hp m-0 block"
        style={{
          fontSize: "clamp(2.75rem, 8.5vw, 6.5rem)",
          lineHeight: 1.25,
          paddingTop: "0.16em",
          paddingBottom: "0.26em",
          paddingLeft: "0.14em",
          paddingRight: "0.22em",
          marginLeft: "-0.14em",
          overflow: "visible",
          background:
            "linear-gradient(180deg, #fff4c2 0%, #f4d56c 38%, #d8ab38 66%, #a87d1c 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
          filter:
            "drop-shadow(0 2px 1px rgba(0,0,0,0.5)) drop-shadow(0 0 26px rgba(244,213,108,0.35))",
          letterSpacing: "0.01em",
        }}
      >
        {full}
      </motion.h1>

      {/* Subtitle ribbon — readable serif, not the display face */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className="origin-left mt-4 flex items-center gap-3"
      >
        <span
          className="block h-px flex-1 max-w-[120px] sm:max-w-[220px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(244,213,108,0.7) 40%, #f4d56c 50%, rgba(244,213,108,0.7) 60%, transparent)",
            boxShadow: "0 0 8px rgba(244,213,108,0.4)",
          }}
        />
        <span className="font-display text-[11px] sm:text-[13px] uppercase tracking-[0.34em] text-accent whitespace-nowrap">
          AI &amp; Software Engineer
        </span>
        <span
          className="block h-px flex-1 max-w-[120px] sm:max-w-[220px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(244,213,108,0.7) 40%, #f4d56c 50%, rgba(244,213,108,0.7) 60%, transparent)",
            boxShadow: "0 0 8px rgba(244,213,108,0.4)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
