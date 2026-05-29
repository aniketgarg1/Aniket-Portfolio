"use client";

import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/content";
import MaraudersFootprints from "./MaraudersFootprints";

export default function Footer() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <footer className="relative mt-20 border-t border-foreground/[0.06]">
      {/* Marauder's incantation - clickable easter egg */}
      <div className="container-section pt-12">
        <div className="text-center select-none">
          <button
            type="button"
            onClick={() => setUnlocked((v) => !v)}
            className="group inline-flex items-center gap-3 font-display text-[12px] sm:text-sm tracking-[0.3em] uppercase text-accent/85 hover:text-accent transition-colors"
            aria-label="Toggle the Marauder's Map"
          >
            <span className="h-px w-8 bg-accent/40 group-hover:bg-accent/70 transition-colors" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={unlocked ? "managed" : "swear"}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="inline-block"
              >
                {unlocked
                  ? "✦ Mischief Managed ✦"
                  : "I solemnly swear that I am up to no good"}
              </motion.span>
            </AnimatePresence>
            <span className="h-px w-8 bg-accent/40 group-hover:bg-accent/70 transition-colors" />
          </button>
        </div>

        {/* Map + footprints */}
        <AnimatePresence initial={false}>
          {!unlocked && (
            <motion.div
              key="prints"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="mt-5">
                <MaraudersFootprints count={11} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="container-section py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/75 font-mono">
            © {new Date().getFullYear()} {profile.name}. Crafted with{" "}
            <span className="text-accent">wand &amp; code</span> in Tempe, AZ.
          </p>

          <div className="flex items-center gap-1.5">
            <FooterIcon
              href={`mailto:${profile.email}`}
              label="Email"
              brand="#0d9488"
            >
              <Mail className="h-4 w-4" />
            </FooterIcon>
            <FooterIcon
              href={profile.socials.github}
              label="GitHub"
              useForeground
            >
              <Github className="h-4 w-4" />
            </FooterIcon>
            <FooterIcon
              href={profile.socials.linkedin}
              label="LinkedIn"
              brand="#0A66C2"
            >
              <Linkedin className="h-4 w-4" />
            </FooterIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterIcon({
  href,
  label,
  brand,
  useForeground,
  children,
}: {
  href: string;
  label: string;
  brand?: string;
  useForeground?: boolean;
  children: React.ReactNode;
}) {
  const cssVars = brand ? ({ "--brand": brand } as React.CSSProperties) : undefined;
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer noopener"
      style={cssVars}
      className={[
        "inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors",
        useForeground
          ? "text-foreground/80 hover:text-foreground hover:bg-foreground/[0.06]"
          : "text-foreground/80 hover:text-[var(--brand)] hover:bg-[var(--brand)]/10",
      ].join(" ")}
    >
      {children}
    </a>
  );
}
