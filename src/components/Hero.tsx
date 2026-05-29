"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  MapPin,
  Github,
  Linkedin,
  Mail,
  Wand2,
  FileText,
} from "lucide-react";
import { profile } from "@/data/content";
import WizardingNameplate from "./WizardingNameplate";

/* SVG icon: a stag (Harry's Patronus) — used for the Patronus badge */
function StagIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Antlers */}
      <path d="M9 4l-2-2M9 4l-2 1M9 4v3" />
      <path d="M15 4l2-2M15 4l2 1M15 4v3" />
      {/* Head */}
      <path d="M9 7c0 1.5 1 3 3 3s3-1.5 3-3" />
      <circle cx="12" cy="9" r="0.5" fill="currentColor" />
      {/* Body */}
      <path d="M12 10v5" />
      <path d="M9 14c-1 1-2 2-2 4M15 14c1 1 2 2 2 4" />
      <path d="M9 18l-1 2M15 18l1 2M11 18v3M13 18v3" />
    </svg>
  );
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIdx((i) => (i + 1) % profile.roles.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[88vh] flex items-center pt-24 pb-14 overflow-hidden"
    >
      <div className="container-section w-full relative z-10">
        {/* Availability / Sorting badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-2"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.06] px-3.5 py-1.5 text-xs font-mono tracking-wider text-accent">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Available for Summer 2026 internships
          </span>
          <HouseBadge />
          <PatronusBadge />
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-7 font-mono text-[12px] sm:text-sm uppercase tracking-[0.4em] text-accent flex items-center gap-3"
        >
          <span className="inline-block h-px w-10 bg-accent/70" />
          Mischief managed — presenting
        </motion.p>

        {/* Harry-Potter-style wordmark with lightning-bolt scar */}
        <WizardingNameplate firstName="Aniket" lastName="Garg" />

        {/* Rotating role */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-3 font-display tracking-tight text-foreground/92 text-balance flex flex-wrap items-baseline gap-x-3"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2.75rem)", lineHeight: 1.15 }}
        >
          <span>I build</span>
          <span className="relative inline-block h-[1.05em] overflow-hidden align-baseline">
            <AnimatePresence mode="wait">
              <motion.span
                key={profile.roles[roleIdx]}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="inline-block text-accent"
              >
                {profile.roles[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-5 max-w-2xl text-base sm:text-lg text-foreground/95 leading-relaxed"
        >
          {profile.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-7 flex flex-wrap items-center gap-3"
        >
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="button-primary group"
          >
            <FileText className="h-4 w-4" />
            Resume
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a href="#projects" className="button-ghost group">
            <Wand2 className="h-4 w-4" />
            Open the Spellbook
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 flex flex-wrap items-center gap-2.5"
        >
          <BrandLink
            href={profile.socials.github}
            label="GitHub"
            handle="@aniketgarg1"
            brand="#ffffff"
            useForeground
          >
            <Github className="h-[18px] w-[18px]" />
          </BrandLink>
          <BrandLink
            href={profile.socials.linkedin}
            label="LinkedIn"
            handle="aniketgarg1"
            brand="#0A66C2"
          >
            <Linkedin className="h-[18px] w-[18px]" />
          </BrandLink>
          <BrandLink
            href={`mailto:${profile.email}`}
            label="Email"
            handle={profile.email}
            brand="#D4AF37"
          >
            <Mail className="h-[18px] w-[18px]" />
          </BrandLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.62 }}
          className="mt-6 inline-flex items-center gap-2 text-sm text-foreground/88 font-mono"
        >
          <MapPin className="h-3.5 w-3.5" />
          <span>{profile.location}</span>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-foreground/92"
      >
        <span>Descend</span>
        <span className="block h-8 w-px bg-gradient-to-b from-accent/60 to-transparent" />
      </motion.div>
    </section>
  );
}

/* ----- Gryffindor house badge ----- */
function HouseBadge() {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-mono tracking-wider"
      style={{
        borderColor: "rgba(211, 166, 37, 0.55)",
        background:
          "linear-gradient(135deg, rgba(127, 9, 9, 0.55), rgba(110, 30, 0, 0.4))",
        color: "#f0c75e",
      }}
      title="Their daring, nerve, and chivalry set Gryffindors apart."
    >
      {/* Lion crest */}
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="currentColor"
        aria-hidden
      >
        <path d="M12 2c-1 1.4-2.6 2-4.2 2 .2 1.3-.2 2.4-1 3.3 1.2.2 2.2.9 2.8 1.9-1.6.3-2.9 1.3-3.6 2.7 1.3-.2 2.5.1 3.5.8-1.2.8-2 2.1-2.2 3.6 1.1-.7 2.4-.9 3.6-.6-.6 1.2-.6 2.6 0 3.9.6-1.3 1.7-2.2 3.1-2.5-.2 1.5.2 3 1.1 4.2.5-1.4.6-2.9.3-4.3 1.4.3 2.5 1.2 3.1 2.5.3-1.5-.1-3-1-4.2 1.2.3 2.3.9 3.1 1.8-.2-1.5-1-2.8-2.2-3.6 1-.7 2.2-1 3.5-.8-.7-1.4-2-2.4-3.6-2.7.6-1 1.6-1.7 2.8-1.9-.8-.9-1.2-2-1-3.3C14.6 4 13 3.4 12 2zm0 7.5a2 2 0 110 4 2 2 0 010-4z" />
      </svg>
      <span>Sorted into Gryffindor</span>
    </span>
  );
}

/* ----- Patronus badge — silver glow + stag ----- */
function PatronusBadge() {
  return (
    <span
      className="group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-mono tracking-wider transition-all"
      style={{
        borderColor: "rgba(190, 210, 230, 0.35)",
        background:
          "linear-gradient(135deg, rgba(80, 110, 160, 0.18), rgba(20, 30, 60, 0.35))",
        color: "#c8d8ee",
        boxShadow: "0 0 18px rgba(170, 200, 240, 0.10)",
      }}
      title="Expecto Patronum"
    >
      <StagIcon className="h-3.5 w-3.5 transition-transform duration-500 group-hover:scale-110" />
      <span>
        Patronus <span className="text-foreground/92">·</span>{" "}
        <span className="text-white/90">Stag</span>
      </span>
      <span
        aria-hidden
        className="ml-0.5 h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.85)]"
      />
    </span>
  );
}

/* ----- Brand-colored social pill ----- */
function BrandLink({
  href,
  label,
  handle,
  brand,
  useForeground,
  children,
}: {
  href: string;
  label: string;
  handle: string;
  brand: string;
  useForeground?: boolean;
  children: React.ReactNode;
}) {
  const cssVars = { "--brand": brand } as React.CSSProperties;

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer noopener"
      aria-label={`${label} — ${handle}`}
      style={cssVars}
      className={[
        "group relative inline-flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5",
        "text-sm font-medium font-sans overflow-hidden transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-lg",
        "border-foreground/15 bg-foreground/[0.03]",
        useForeground
          ? "hover:border-foreground/40"
          : "hover:border-[var(--brand)]",
      ].join(" ")}
    >
      <span
        aria-hidden
        className={[
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
          useForeground ? "bg-foreground" : "bg-[var(--brand)]",
        ].join(" ")}
      />
      <span
        className={[
          "relative inline-flex transition-colors",
          useForeground
            ? "text-foreground group-hover:text-background"
            : "text-[var(--brand)] group-hover:text-white",
        ].join(" ")}
      >
        {children}
      </span>
      <span
        className={[
          "relative hidden sm:inline transition-colors",
          useForeground
            ? "text-foreground/92 group-hover:text-background"
            : "text-foreground/92 group-hover:text-white",
        ].join(" ")}
      >
        {label}
        <span
          className={[
            "ml-1.5 text-[11px] font-mono",
            useForeground
              ? "text-foreground/92 group-hover:text-background/60"
              : "text-foreground/92 group-hover:text-white/70",
          ].join(" ")}
        >
          {handle}
        </span>
      </span>
      <span
        className={[
          "relative sm:hidden text-[12px] font-medium",
          useForeground
            ? "text-foreground/92 group-hover:text-background"
            : "text-foreground/92 group-hover:text-white",
        ].join(" ")}
      >
        {label}
      </span>
    </a>
  );
}
