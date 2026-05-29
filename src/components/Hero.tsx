"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/content";

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
      className="relative min-h-[92vh] flex items-center pt-28 pb-20"
    >
      <div className="container-section w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-foreground/[0.08] bg-foreground/[0.02] px-3.5 py-1.5 text-xs text-foreground/85"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[11px] tracking-wide">
            Available for Summer 2026 internships
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-8 text-base text-accent font-mono"
        >
          Hi, my name is
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 font-display font-semibold tracking-tight text-5xl sm:text-6xl lg:text-7xl text-foreground text-balance"
        >
          {profile.name}.
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-3 font-display font-semibold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-foreground/65 text-balance flex flex-wrap items-baseline gap-x-3"
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
                className="inline-block text-foreground"
              >
                {profile.roles[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-8 max-w-2xl text-base sm:text-lg text-foreground/80 leading-relaxed"
        >
          {profile.tagline}
        </motion.p>

        {/* Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.36 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a href="#projects" className="button-primary group">
            View My Work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="button-ghost"
          >
            Resume
          </a>
        </motion.div>

        {/* Prominent brand-colored socials */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.46 }}
          className="mt-7 flex flex-wrap items-center gap-2.5"
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
            brand="#0d9488"
          >
            <Mail className="h-[18px] w-[18px]" />
          </BrandLink>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-7 inline-flex items-center gap-2 text-sm text-foreground/60 font-mono"
        >
          <MapPin className="h-3.5 w-3.5" />
          <span>{profile.location}</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-foreground/30"
      >
        <span>Scroll</span>
        <span className="block h-8 w-px bg-gradient-to-b from-foreground/30 to-transparent" />
      </motion.div>
    </section>
  );
}

/**
 * A bold, brand-colored social button:
 *  - At rest: subtle card with the brand-colored icon
 *  - On hover: fills with the brand color, contents go white, lifts slightly
 */
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
        "text-sm font-medium overflow-hidden transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-lg",
        "border-foreground/10 bg-foreground/[0.02]",
        useForeground
          ? "hover:border-foreground/40"
          : "hover:border-[var(--brand)]",
      ].join(" ")}
    >
      {/* Hover fill */}
      <span
        aria-hidden
        className={[
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
          useForeground ? "bg-foreground" : "bg-[var(--brand)]",
        ].join(" ")}
      />
      {/* Icon */}
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
      {/* Label + handle */}
      <span
        className={[
          "relative hidden sm:inline transition-colors",
          useForeground
            ? "text-foreground/85 group-hover:text-background"
            : "text-foreground/85 group-hover:text-white",
        ].join(" ")}
      >
        {label}
        <span
          className={[
            "ml-1.5 text-[11px] font-mono",
            useForeground
              ? "text-foreground/55 group-hover:text-background/60"
              : "text-foreground/55 group-hover:text-white/70",
          ].join(" ")}
        >
          {handle}
        </span>
      </span>
      <span
        className={[
          "relative sm:hidden text-[12px] font-medium",
          useForeground
            ? "text-foreground/85 group-hover:text-background"
            : "text-foreground/85 group-hover:text-white",
        ].join(" ")}
      >
        {label}
      </span>
    </a>
  );
}
