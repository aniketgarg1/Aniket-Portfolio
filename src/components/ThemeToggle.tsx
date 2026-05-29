"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * "Lumos / Nox" theme toggle.
 * - Dark mode shows the moon and reads "Lumos" (cast light → switch to parchment day).
 * - Light mode shows the sun and reads "Nox" (extinguish → return to Hogwarts at night).
 * On small screens, only the icon is shown; the label appears at md+.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Lumos — switch to parchment mode" : "Nox — switch to Hogwarts night"}
      title={isDark ? "Lumos" : "Nox"}
      className={[
        "group relative inline-flex items-center gap-2 rounded-md border h-9 px-2.5",
        "border-foreground/15 text-foreground/80",
        "hover:text-accent hover:border-accent/40 transition-colors",
        className,
      ].join(" ")}
    >
      <span className="relative inline-flex h-5 w-5 items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="inline-flex"
          >
            {isDark ? (
              <Moon className="h-4 w-4" strokeWidth={1.8} />
            ) : (
              <Sun className="h-4 w-4" strokeWidth={1.8} />
            )}
          </motion.span>
        </AnimatePresence>
        {/* tiny wand-tip glow on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background:
              "radial-gradient(circle, rgba(255,213,108,0.65) 0%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />
      </span>
      <span className="hidden sm:inline font-mono text-[10.5px] uppercase tracking-[0.22em]">
        {mounted ? (isDark ? "Lumos" : "Nox") : ""}
      </span>
    </button>
  );
}
