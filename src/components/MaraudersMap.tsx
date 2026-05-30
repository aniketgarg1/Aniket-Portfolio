"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Map as MapIcon } from "lucide-react";

/* ---- Section definitions, each placed on the parchment map ---- */
type Kind = "hall" | "tower" | "library" | "pitch" | "owlery";
type Location = {
  id: string;
  hash: string;
  name: string;
  flavour: string;
  x: number; // % across the 800x500 canvas
  y: number;
  pinX?: number; // optional visual offset; route vertex still uses x/y
  pinY?: number;
  mobileX?: number; // compact map vertex and pin position
  mobileY?: number;
  kind: Kind;
};

const LOCATIONS: Location[] = [
  { id: "home", hash: "#home", name: "Home", flavour: "The Great Hall", x: 16, y: 32, pinX: 14, mobileX: 17, mobileY: 47, kind: "hall" },
  { id: "about", hash: "#about", name: "About", flavour: "Headmaster's Study", x: 35, y: 17, pinX: 31.5, mobileX: 42, mobileY: 26, kind: "tower" },
  { id: "skills", hash: "#skills", name: "Skills", flavour: "The Library", x: 55, y: 27, mobileX: 62, mobileY: 41, kind: "library" },
  { id: "experience", hash: "#experience", name: "Experience", flavour: "Quidditch Pitch", x: 37, y: 56, pinX: 32.5, mobileX: 36, mobileY: 74, kind: "pitch" },
  { id: "projects", hash: "#projects", name: "Projects", flavour: "Room of Requirement", x: 64, y: 60, pinX: 58.5, mobileX: 71, mobileY: 72, kind: "tower" },
  { id: "contact", hash: "#contact", name: "Contact", flavour: "The Owlery", x: 84, y: 35, mobileX: 84, mobileY: 50, kind: "owlery" },
];

const NAV_IDS = LOCATIONS.map((l) => l.id);
const VB_W = 800;
const VB_H = 500;

/* ---------- geometry helpers ---------- */
function px(loc: Location) {
  return { x: (loc.x / 100) * VB_W, y: (loc.y / 100) * VB_H };
}
function controlFor(a: { x: number; y: number }, b: { x: number; y: number }, i: number) {
  const mx = (a.x + b.x) / 2 + Math.sin(i * 1.3) * 38;
  const my = (a.y + b.y) / 2 + Math.cos(i * 1.7) * 30;
  return { x: mx, y: my };
}
function quad(t: number, p0: number, c: number, p1: number) {
  const mt = 1 - t;
  return mt * mt * p0 + 2 * mt * t * c + t * t * p1;
}
function quadD(t: number, p0: number, c: number, p1: number) {
  return 2 * (1 - t) * (c - p0) + 2 * t * (p1 - c);
}
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export default function MaraudersMap() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const targets = NAV_IDS.map((id) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[];
    if (!targets.length) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key.toLowerCase() === "m" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.documentElement.classList.add("map-open");
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
        document.documentElement.classList.remove("map-open");
      };
    }
  }, [open]);

  const closeMap = (afterClose?: () => void) => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
      afterClose?.();
    }, 1150);
  };

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => {
          setClosing(false);
          setOpen(true);
        }}
        aria-label="Open the Marauder's Map"
        title="Open the Marauder's Map (M)"
        className="group fixed bottom-5 right-5 z-[58] inline-flex items-center gap-2 rounded-full px-4 py-2.5 backdrop-blur-md transition-all hover:-translate-y-0.5"
        style={{
          background:
            "linear-gradient(135deg, rgba(74,49,20,0.92), rgba(40,27,9,0.92))",
          border: "1px solid rgba(222, 184, 73, 0.5)",
          color: "#f6e7bb",
          boxShadow:
            "0 12px 34px -12px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(222,184,73,0.12)",
        }}
      >
        <MapIcon className="h-4 w-4 transition-transform group-hover:rotate-6" />
        <span className="font-display text-xs tracking-[0.18em] uppercase">
          Marauder&apos;s Map
        </span>
        <span
          className="hidden sm:inline-flex font-mono text-[9.5px] uppercase tracking-[0.2em] text-amber-300/85 border border-amber-300/35 rounded px-1.5 py-0.5"
          aria-hidden
        >
          M
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-5"
          >
            {/* dim + smoke scrim */}
            <button
              type="button"
              aria-label="Close map"
              onClick={() => closeMap()}
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(10,8,4,0.72), rgba(0,0,0,0.9))",
                backdropFilter: "blur(4px)",
              }}
            />

            <motion.div
              initial={{ scale: 0.86, opacity: 0, rotateX: -22, y: 30 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateX: 14, y: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[calc(100vh-1rem)]"
              style={{ perspective: 1400, transformStyle: "preserve-3d" }}
            >
              <Parchment
                active={active}
                closing={closing}
                onClose={() => closeMap()}
                onPick={(loc) => {
                  closeMap(() => {
                    document
                      .querySelector(loc.hash)
                      ?.scrollIntoView({ behavior: "smooth" });
                  });
                }}
              />

              <button
                type="button"
                onClick={() => closeMap()}
                aria-label="Close map"
                className="absolute right-2 top-2 h-9 w-9 rounded-full bg-stone-950 border border-amber-400/50 text-amber-200 hover:bg-stone-800 hover:scale-105 transition-all flex items-center justify-center shadow-xl sm:-right-3 sm:-top-3 sm:h-10 sm:w-10"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================= */

function Parchment({
  active,
  closing,
  onClose,
  onPick,
}: {
  active: string;
  closing: boolean;
  onClose: () => void;
  onPick: (loc: Location) => void;
}) {
  const activeLoc = LOCATIONS.find((l) => l.id === active) ?? LOCATIONS[0];
  const compactMap = useMediaQuery("(max-width: 639px)");
  const mapLocations = useMemo(
    () =>
      compactMap
        ? LOCATIONS.map((loc) => ({
            ...loc,
            x: loc.mobileX ?? loc.x,
            y: loc.mobileY ?? loc.y,
            pinX: loc.mobileX ?? loc.x,
            pinY: loc.mobileY ?? loc.y,
          }))
        : LOCATIONS,
    [compactMap]
  );

  // Precompute corridor segments + footstep placements along the full tour.
  const { segments, footsteps } = useMemo(() => {
    const segs: { d: string }[] = [];
    const steps: { x: number; y: number; angle: number; order: number }[] = [];
    let order = 0;
    for (let i = 0; i < mapLocations.length - 1; i++) {
      const a = px(mapLocations[i]);
      const b = px(mapLocations[i + 1]);
      const c = controlFor(a, b, i);
      segs.push({ d: `M ${a.x} ${a.y} Q ${c.x} ${c.y} ${b.x} ${b.y}` });
      const N = 6;
      for (let s = 1; s <= N; s++) {
        const t = s / (N + 1);
        const x = quad(t, a.x, c.x, b.x);
        const y = quad(t, a.y, c.y, b.y);
        const dx = quadD(t, a.x, c.x, b.x);
        const dy = quadD(t, a.y, c.y, b.y);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        steps.push({ x, y, angle, order: order++ });
      }
    }
    return { segments: segs, footsteps: steps };
  }, [mapLocations]);

  const totalSteps = footsteps.length;
  const walkDuration = Math.min(7, totalSteps * 0.22);

  return (
    <div
      className="relative overflow-hidden rounded-[18px]"
      style={{
        background:
          "linear-gradient(135deg, #f3e0b0 0%, #ecd6a0 35%, #e3c987 70%, #cdaf72 100%)",
        boxShadow:
          "0 40px 90px -25px rgba(0,0,0,0.8), inset 0 0 120px rgba(120,80,30,0.4)",
      }}
    >
      {/* Parchment grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.16] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 28%, #6b4a1f 1px, transparent 2px)," +
            "radial-gradient(circle at 72% 62%, #4a2e10 1px, transparent 2px)," +
            "radial-gradient(circle at 42% 82%, #6b4a1f 1px, transparent 2px)",
          backgroundSize: "44px 44px, 66px 66px, 88px 88px",
        }}
      />
      {/* Fold creases */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "linear-gradient(90deg, transparent 33%, rgba(90,60,25,0.16) 33.2%, transparent 33.6%)," +
            "linear-gradient(90deg, transparent 66%, rgba(90,60,25,0.16) 66.2%, transparent 66.6%)," +
            "linear-gradient(0deg, transparent 50%, rgba(90,60,25,0.13) 50.2%, transparent 50.6%)",
        }}
      />
      {/* Burnt vignette edges */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 92% 92% at 50% 50%, transparent 62%, rgba(70,42,12,0.55) 100%)",
        }}
      />
      {/* Tea stains */}
      <div
        aria-hidden
        className="absolute -left-6 top-10 h-28 w-28 rounded-full pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle, rgba(110,70,25,0.4), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="absolute right-8 bottom-6 h-24 w-24 rounded-full pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle, rgba(110,70,25,0.35), transparent 70%)" }}
      />

      {/* Floating dust motes */}
      <Motes />

      <motion.div
        animate={closing ? { opacity: 0, filter: "blur(3px)" } : { opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.05, ease: "easeInOut" }}
      >
      {/* Header */}
      <div className="relative px-5 pt-5 text-center sm:px-10 sm:pt-7">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mx-auto max-w-[18rem] font-mono text-[8px] uppercase leading-relaxed tracking-[0.24em] sm:max-w-none sm:text-[11px] sm:tracking-[0.34em]"
          style={{ color: "#5a3410" }}
        >
          Messrs. Moony, Wormtail, Padfoot &amp; Prongs
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.55 }}
          className="mt-4 font-hp leading-[1.08] sm:mt-6"
          style={{
            fontSize: compactMap
              ? "clamp(1.7rem, 7.8vw, 2.1rem)"
              : "clamp(1.9rem, 5vw, 3.4rem)",
            color: "#3a2410",
            textShadow: "0 1px 0 rgba(255,240,180,0.45)",
          }}
        >
          The Marauder&apos;s Map
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mx-auto mt-3 max-w-[19rem] font-display italic text-[11px] leading-snug sm:mt-4 sm:max-w-none sm:text-sm"
          style={{ color: "#4a2c10" }}
        >
          are proud to present a guide to the portfolio of Aniket Garg
        </motion.div>
      </div>

      {/* Map canvas */}
      <div className="relative px-3 pb-4 pt-3 sm:px-8 sm:pb-7 sm:pt-2">
        <div
          className="relative w-full"
          style={{ aspectRatio: compactMap ? "1 / 0.78" : "8 / 5" }}
        >
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio={compactMap ? "none" : "xMidYMid meet"}
          >
            {/* double frame — draws itself in like ink */}
            <motion.rect
              x="10" y="10" width={VB_W - 20} height={VB_H - 20} rx="14"
              fill="none" stroke="#4a2e10" strokeWidth="1.8" opacity="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.25, duration: 1.1, ease: "easeInOut" }}
            />
            <motion.rect
              x="22" y="22" width={VB_W - 44} height={VB_H - 44} rx="10"
              fill="none" stroke="#5a3a14" strokeWidth="0.9" opacity="0.45"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.45, duration: 1.1, ease: "easeInOut" }}
            />
            {/* corner flourishes draw in */}
            {[
              [26, 26, 1, 1],
              [VB_W - 26, 26, -1, 1],
              [26, VB_H - 26, 1, -1],
              [VB_W - 26, VB_H - 26, -1, -1],
            ].map(([cx, cy, sx, sy], i) => (
              <motion.path
                key={i}
                d={`M ${cx} ${cy} q ${20 * sx} 0 ${26 * sx} ${14 * sy} M ${cx} ${cy} q 0 ${20 * sy} ${14 * sx} ${26 * sy}`}
                stroke="#4a2e10"
                strokeWidth="1.2"
                fill="none"
                opacity="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.9 + i * 0.08, duration: 0.6 }}
              />
            ))}

            {/* corridors draw themselves in */}
            {segments.map((s, i) => (
              <motion.path
                key={i}
                d={s.d}
                fill="none"
                stroke="#5a3a14"
                strokeWidth="1.6"
                strokeDasharray="7 5"
                opacity="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.6 + i * 0.18, duration: 0.7, ease: "easeInOut" }}
              />
            ))}

            {/* compass rose */}
            <g transform="translate(720, 64)" opacity="0.6">
              <circle r="24" fill="none" stroke="#5a3a14" strokeWidth="1" />
              <circle r="16" fill="none" stroke="#5a3a14" strokeWidth="0.5" />
              <path d="M0 -22 L5 -5 L22 0 L5 5 L0 22 L-5 5 L-22 0 L-5 -5 Z" fill="#5a3a14" opacity="0.85" />
              <text x="0" y="-28" textAnchor="middle" fontSize="10" fill="#5a3a14" fontFamily="serif">N</text>
            </g>

            {/* whomping willow sketch (decorative) */}
            <g transform="translate(120, 410)" opacity="0.45" stroke="#5a3a14" strokeWidth="1.2" fill="none" strokeLinecap="round">
              <path d="M0 30 L0 6 M0 14 l-12 -10 M0 14 l12 -10 M0 8 l-8 -12 M0 8 l8 -12 M0 2 l0 -12" />
            </g>

            {/* continuously walking footsteps */}
            {footsteps.map((f) => (
              <g key={f.order} transform={`translate(${f.x} ${f.y}) rotate(${f.angle})`}>
                <Footprint
                  left={f.order % 2 === 0}
                  delay={(f.order / totalSteps) * walkDuration}
                  duration={walkDuration}
                />
              </g>
            ))}
          </svg>

          {/* Location pins */}
          {mapLocations.map((loc, i) => (
            <Pin
              key={loc.id}
              loc={loc}
              isActive={loc.id === active}
              index={i}
              onClick={() => onPick(loc)}
            />
          ))}

          <button
            type="button"
            onClick={onClose}
            disabled={closing}
            className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 items-center justify-center whitespace-nowrap rounded-full border px-6 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.24em] transition-all hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-80 sm:bottom-10 sm:inline-flex sm:px-8 sm:py-3 sm:text-xs"
            style={{
              borderColor: "rgba(120,18,10,0.55)",
              color: "#f8e6b0",
              background:
                "linear-gradient(135deg, rgba(108,21,10,0.96), rgba(54,19,8,0.96))",
              boxShadow:
                "0 12px 26px -14px rgba(40,10,4,0.9), inset 0 0 0 1px rgba(255,224,148,0.22)",
            }}
          >
            Mischief Managed
          </button>
        </div>

        <div className="mt-3 flex justify-center sm:hidden">
          <button
            type="button"
            onClick={onClose}
            disabled={closing}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full border px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-all disabled:pointer-events-none disabled:opacity-80"
            style={{
              borderColor: "rgba(120,18,10,0.55)",
              color: "#f8e6b0",
              background:
                "linear-gradient(135deg, rgba(108,21,10,0.96), rgba(54,19,8,0.96))",
              boxShadow:
                "0 10px 20px -14px rgba(40,10,4,0.9), inset 0 0 0 1px rgba(255,224,148,0.22)",
            }}
          >
            Mischief Managed
          </button>
        </div>

        {/* Legend */}
        <div
          className="mt-3 grid gap-2 px-1 text-center sm:mt-1 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:gap-y-2 sm:px-2 sm:text-left"
          style={{ color: "#3a2208" }}
        >
          <div className="flex items-center justify-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] sm:justify-start sm:text-[11px] sm:tracking-[0.2em]">
            <span className="relative inline-flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-700/50" />
              <span className="relative h-3 w-3 rounded-full bg-red-800 shadow-[0_0_8px_rgba(150,30,10,0.8)]" />
            </span>
            You are here — {activeLoc.flavour}
          </div>
          <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] sm:text-[10px] sm:tracking-[0.2em]">
            Tap a landmark to apparate<span className="hidden sm:inline"> • <kbd>Esc</kbd> to close</span>
          </div>
        </div>
      </div>

      {/* Incantation footer */}
      <div className="relative pb-4 text-center sm:pb-4">
        <div
          className="font-display italic text-[11px] sm:text-sm"
          style={{ color: "#4a2c10" }}
        >
          &ldquo;I solemnly swear that I am up to no good.&rdquo;
        </div>
      </div>
      </motion.div>

      <AnimatePresence>
        {closing && (
          <motion.div
            aria-hidden
            className="absolute inset-0 z-[50] pointer-events-none flex items-center justify-center"
            style={{
              background:
                "radial-gradient(ellipse 78% 78% at 50% 45%, rgba(28,16,5,0.08) 0%, rgba(28,16,5,0.64) 62%, rgba(16,9,3,0.94) 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.05, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: "42%",
                aspectRatio: "1",
                x: "-50%",
                y: "-50%",
                background:
                  "radial-gradient(circle, rgba(31,18,6,0.96) 0%, rgba(31,18,6,0.82) 48%, rgba(31,18,6,0) 70%)",
              }}
              initial={{ scale: 0.08, opacity: 0.62 }}
              animate={{ scale: 4.8, opacity: 1 }}
              transition={{ duration: 1.08, ease: "easeInOut" }}
            />
            <motion.div
              className="relative font-display italic text-lg sm:text-2xl"
              style={{ color: "#f3dfab", textShadow: "0 2px 10px rgba(0,0,0,0.65)" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: [0, 1, 1, 0], y: 0 }}
              transition={{ duration: 1.05, times: [0, 0.28, 0.75, 1] }}
            >
              Mischief Managed
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- Cinematic "the map reveals itself" opening sequence ---- */}
      {/* Ink develops across the parchment, then clears */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-[40] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 45%, rgba(28,16,5,0.0) 0%, rgba(28,16,5,0.55) 45%, rgba(16,9,3,0.92) 100%)",
        }}
        initial={{ opacity: 1, scale: 1.04 }}
        animate={{ opacity: 0, scale: 1 }}
        transition={{ duration: 1.25, ease: "easeOut" }}
      />
      {/* Ink bloom spreading from the centre */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 z-[41] pointer-events-none rounded-full"
        style={{
          width: "40%",
          aspectRatio: "1",
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, rgba(40,24,8,0.0) 38%, rgba(40,24,8,0.5) 60%, rgba(40,24,8,0) 72%)",
        }}
        initial={{ scale: 0.1, opacity: 0.9 }}
        animate={{ scale: 4.5, opacity: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
      {/* Golden light sweep, like a wand-tip passing over the parchment */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-[42] pointer-events-none"
        style={{
          background:
            "linear-gradient(115deg, transparent 35%, rgba(255,228,150,0.45) 50%, transparent 65%)",
        }}
        initial={{ x: "-120%" }}
        animate={{ x: "120%" }}
        transition={{ delay: 0.35, duration: 0.9, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ---------- Pin ---------- */
function Pin({
  loc,
  isActive,
  index,
  onClick,
}: {
  loc: Location;
  isActive: boolean;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      title={`Apparate to ${loc.name}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7 + index * 0.12, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.12 }}
      aria-label={`Apparate to ${loc.name}`}
      className="marauder-pin group absolute -translate-x-1/2 -translate-y-1/2 outline-none"
      style={{ left: `${loc.pinX ?? loc.x}%`, top: `${loc.pinY ?? loc.y}%` }}
    >
      <span className="marauder-pin-stack relative flex flex-col items-center">
        <span
          className="marauder-pin-glyph relative transition-colors"
          style={{ color: isActive ? "#7a1a08" : "#3a2410" }}
        >
          <Tower kind={loc.kind} />
          {/* hover ink ripple */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background:
                "radial-gradient(circle, rgba(122,26,8,0.28) 0%, transparent 70%)",
            }}
          />
          {isActive && (
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,150,70,0.5) 0%, transparent 70%)",
                animation: "pin-pulse 1.6s ease-in-out infinite",
              }}
            />
          )}
        </span>
        <span
          className="marauder-pin-name mt-0.5 whitespace-nowrap font-hp leading-none"
          style={{
            fontSize: "clamp(1.05rem, 2.6vw, 1.55rem)",
            color: isActive ? "#8a1407" : "#241006",
            textShadow:
              "0 1px 0 rgba(255,244,200,0.7), 0 0 1px rgba(255,244,200,0.7)",
          }}
        >
          {loc.name}
        </span>
        <span
          className="marauder-pin-flavour -mt-0.5 whitespace-nowrap font-display italic text-[9px] sm:text-[11px] font-medium"
          style={{
            color: "#4a2c10",
            textShadow: "0 1px 0 rgba(255,244,200,0.5)",
          }}
        >
          {loc.flavour}
        </span>
      </span>
      <style jsx global>{`
        @keyframes pin-pulse {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.18); }
        }
        @media (max-width: 639px) {
          .marauder-pin {
            min-width: 3.25rem;
            touch-action: manipulation;
          }
          .marauder-pin-stack {
            filter: drop-shadow(0 1px 0 rgba(255, 242, 194, 0.6));
          }
          .marauder-pin-glyph {
            display: flex;
            align-items: flex-end;
            justify-content: center;
            width: 1.45rem;
            height: 1.65rem;
            margin-bottom: 0.1rem;
            transform: none;
          }
          .marauder-pin-glyph > svg {
            width: 100%;
            height: 100%;
            overflow: visible;
          }
          .marauder-pin-name {
            font-family: var(--font-cinzel), Georgia, serif;
            font-size: clamp(0.58rem, 2.65vw, 0.74rem) !important;
            font-weight: 800;
            letter-spacing: 0.03em;
            line-height: 1.05;
            text-transform: uppercase;
          }
          .marauder-pin-flavour {
            display: none;
          }
          .marauder-pin .h-12,
          .marauder-pin .h-14 {
            height: 2rem;
            width: 2rem;
          }
        }
      `}</style>
    </motion.button>
  );
}

/* ---------- Landmark glyphs (hand-inked castle buildings) ---------- */
function Tower({ kind }: { kind: Kind }) {
  const stroke = "currentColor";
  const sw = 1.6;
  const thin = 0.9;
  const fill = "rgba(120,80,30,0.14)";
  const flag = "rgba(138,20,7,0.55)";
  switch (kind) {
    /* The Great Hall — grand twin-gabled building with banner */
    case "hall":
      return (
        <svg width="46" height="46" viewBox="0 0 44 44" fill="none" strokeLinejoin="round" strokeLinecap="round">
          <path d="M4 38 L4 22 L14 12 L24 22 L34 12 L40 16 L40 38 Z" stroke={stroke} strokeWidth={sw} fill={fill} />
          <path d="M14 12 L14 6 M24 22 L24 8 M34 12 L34 7" stroke={stroke} strokeWidth={thin} />
          <path d="M14 6 l7 2 l-7 2 Z" fill={flag} stroke={stroke} strokeWidth={thin} />
          <path d="M9 38 L9 30 L15 30 L15 38" stroke={stroke} strokeWidth={thin} />
          <rect x="27" y="28" width="6" height="10" stroke={stroke} strokeWidth={thin} />
          <circle cx="24" cy="16" r="1.6" stroke={stroke} strokeWidth={thin} fill="none" />
          <path d="M2 38 L42 38" stroke={stroke} strokeWidth={sw} />
        </svg>
      );
    /* Headmaster's Tower — tall turret with conical roof + pennant */
    case "tower":
      return (
        <svg width="38" height="48" viewBox="0 0 34 46" fill="none" strokeLinejoin="round" strokeLinecap="round">
          <path d="M10 42 L10 16 L17 4 L24 16 L24 42 Z" stroke={stroke} strokeWidth={sw} fill={fill} />
          <path d="M8 16 L26 16" stroke={stroke} strokeWidth={thin} />
          <path d="M8 16 l0 -3 l3 0 M26 16 l0 -3 l-3 0" stroke={stroke} strokeWidth={thin} />
          <path d="M17 4 L17 -1" stroke={stroke} strokeWidth={thin} />
          <path d="M17 -1 l7 2.5 l-7 2.5 Z" fill={flag} stroke={stroke} strokeWidth={thin} />
          <circle cx="17" cy="24" r="2.4" stroke={stroke} strokeWidth={thin} fill="none" />
          <rect x="14" y="32" width="6" height="10" stroke={stroke} strokeWidth={thin} />
          <path d="M7 42 L27 42" stroke={stroke} strokeWidth={sw} />
        </svg>
      );
    /* The Library — open book */
    case "library":
      return (
        <svg width="46" height="40" viewBox="0 0 44 36" fill="none" strokeLinejoin="round" strokeLinecap="round">
          <path d="M22 8 C16 4 8 4 4 6 L4 28 C8 26 16 26 22 30 C28 26 36 26 40 28 L40 6 C36 4 28 4 22 8 Z" stroke={stroke} strokeWidth={sw} fill={fill} />
          <path d="M22 8 L22 30" stroke={stroke} strokeWidth={thin} />
          <path d="M8 11 L18 10 M8 15 L18 14 M8 19 L18 18 M8 23 L16 22" stroke={stroke} strokeWidth={thin} />
          <path d="M26 10 L36 11 M26 14 L36 15 M26 18 L36 19 M28 22 L36 23" stroke={stroke} strokeWidth={thin} />
        </svg>
      );
    /* Quidditch Pitch — three goal hoops on the field */
    case "pitch":
      return (
        <svg width="48" height="40" viewBox="0 0 46 38" fill="none" strokeLinejoin="round" strokeLinecap="round">
          <ellipse cx="23" cy="30" rx="20" ry="6" stroke={stroke} strokeWidth={thin} fill={fill} />
          <g stroke={stroke} strokeWidth={sw} fill="none">
            <path d="M10 30 L10 14" /><circle cx="10" cy="10" r="4" />
            <path d="M23 30 L23 8" /><circle cx="23" cy="4" r="4" />
            <path d="M36 30 L36 14" /><circle cx="36" cy="10" r="4" />
          </g>
        </svg>
      );
    /* The Owlery — round tower with a perched owl */
    case "owlery":
      return (
        <svg width="38" height="48" viewBox="0 0 34 46" fill="none" strokeLinejoin="round" strokeLinecap="round">
          <path d="M9 42 L9 18 C9 12 25 12 25 18 L25 42 Z" stroke={stroke} strokeWidth={sw} fill={fill} />
          <path d="M9 18 C9 12 25 12 25 18" stroke={stroke} strokeWidth={thin} />
          <path d="M17 5 L7 16 L27 16 Z" stroke={stroke} strokeWidth={sw} fill={fill} />
          <path d="M17 5 L17 0" stroke={stroke} strokeWidth={thin} />
          {/* owl */}
          <g stroke={stroke} strokeWidth={thin} fill="none">
            <path d="M17 22 c-3 0 -4 3 -4 6 c0 3 2 5 4 5 c2 0 4 -2 4 -5 c0 -3 -1 -6 -4 -6 Z" fill="rgba(120,80,30,0.2)" />
            <path d="M14 24 l-1 -3 l3 2 M20 24 l1 -3 l-3 2" />
            <circle cx="15.5" cy="26" r="0.9" fill={stroke} />
            <circle cx="18.5" cy="26" r="0.9" fill={stroke} />
            <path d="M17 28 l-1 1.5 l2 0 Z" fill={stroke} />
          </g>
          <rect x="14" y="36" width="6" height="6" stroke={stroke} strokeWidth={thin} />
        </svg>
      );
  }
}

/* ---------- A single ink footprint that fades in/out on a loop ---------- */
function Footprint({
  left,
  delay,
  duration,
}: {
  left: boolean;
  delay: number;
  duration: number;
}) {
  const sx = left ? -1 : 1;
  return (
    <g transform={`scale(${sx}, 1)`}>
      <ellipse cx="2.5" cy="0" rx="2.4" ry="3.1" fill="#6b1a0a" opacity="0">
        <animate attributeName="opacity" values="0;0.85;0.85;0" dur={`${duration}s`} begin={`${-delay}s`} repeatCount="indefinite" />
      </ellipse>
      <circle cx="0.6" cy="-3.6" r="0.6" fill="#6b1a0a">
        <animate attributeName="opacity" values="0;0.85;0.85;0" dur={`${duration}s`} begin={`${-delay}s`} repeatCount="indefinite" />
      </circle>
      <circle cx="2.2" cy="-4.2" r="0.6" fill="#6b1a0a">
        <animate attributeName="opacity" values="0;0.85;0.85;0" dur={`${duration}s`} begin={`${-delay}s`} repeatCount="indefinite" />
      </circle>
      <circle cx="3.9" cy="-3.6" r="0.6" fill="#6b1a0a">
        <animate attributeName="opacity" values="0;0.85;0.85;0" dur={`${duration}s`} begin={`${-delay}s`} repeatCount="indefinite" />
      </circle>
    </g>
  );
}

/* ---------- Floating dust motes over the parchment ---------- */
function Motes() {
  const motes = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: (i * 67) % 100,
        top: (i * 41) % 100,
        size: 2 + (i % 3),
        delay: (i % 7) * 0.6,
        dur: 5 + (i % 5),
      })),
    []
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {motes.map((m, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: m.size,
            height: m.size,
            background: "rgba(90,58,20,0.5)",
            animation: `mote-float ${m.dur}s ease-in-out ${m.delay}s infinite`,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes mote-float {
          0%, 100% { transform: translateY(0); opacity: 0.2; }
          50% { transform: translateY(-14px); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
