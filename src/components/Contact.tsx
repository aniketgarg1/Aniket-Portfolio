"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/content";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container-section">
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-eyebrow justify-center"
          >
            <span className="section-eyebrow-line" />
            Get in Touch
            <span className="section-eyebrow-line" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-balance text-foreground"
          >
            Let&apos;s build something great.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-5 text-foreground/65 text-base sm:text-lg leading-relaxed"
          >
            Whether you have an opportunity, an idea you want to explore, or
            just want to chat about AI and software — my inbox is open and I
            usually reply within a day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-10 flex items-center justify-center"
          >
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-3 rounded-md bg-foreground text-background px-6 py-3.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Say Hello
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-foreground/[0.08] bg-foreground/[0.02] px-4 py-2"
          >
            <SocialPill
              href={profile.socials.github}
              label="GitHub"
              brand="#ffffff"
              useForeground
            >
              <Github className="h-4 w-4" />
            </SocialPill>
            <span className="h-3 w-px bg-foreground/10" />
            <SocialPill
              href={profile.socials.linkedin}
              label="LinkedIn"
              brand="#0A66C2"
            >
              <Linkedin className="h-4 w-4" />
            </SocialPill>
            <span className="h-3 w-px bg-foreground/10" />
            <SocialPill
              href={`mailto:${profile.email}`}
              label="Email"
              brand="#0d9488"
            >
              <Mail className="h-4 w-4" />
            </SocialPill>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SocialPill({
  href,
  label,
  brand,
  useForeground,
  children,
}: {
  href: string;
  label: string;
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
      aria-label={label}
      style={cssVars}
      className={[
        "inline-flex h-9 w-9 items-center justify-center rounded-full transition-all hover:-translate-y-0.5",
        useForeground
          ? "text-foreground hover:bg-foreground hover:text-background"
          : "text-[var(--brand)] hover:bg-[var(--brand)] hover:text-white",
      ].join(" ")}
    >
      {children}
    </a>
  );
}
