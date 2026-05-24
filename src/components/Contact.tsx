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
            05 — Get in Touch
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
            className="mt-5 text-foreground/60 text-base sm:text-lg leading-relaxed"
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
            className="mt-8 flex items-center justify-center gap-3"
          >
            <SocialIcon href={profile.socials.github} label="GitHub">
              <Github className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href={profile.socials.linkedin} label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href={`mailto:${profile.email}`} label="Email">
              <Mail className="h-4 w-4" />
            </SocialIcon>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer noopener"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-foreground/10 text-foreground/65 hover:text-accent hover:border-accent/40 transition-colors"
    >
      {children}
    </a>
  );
}
