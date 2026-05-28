"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { about } from "@/data/content";

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container-section">
        <SectionHeading eyebrow="About" title="About me." />

        <div className="mt-12 grid lg:grid-cols-12 gap-10 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-8 space-y-5 text-[15.5px] sm:text-base text-foreground/75 leading-[1.8]"
          >
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-4 space-y-4"
          >
            {/* Currently card with accent border-glow */}
            <div className="relative card p-6 overflow-hidden">
              <div
                aria-hidden
                className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-accent/10 blur-2xl"
              />
              <div className="relative flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                Currently
              </div>
              <div className="relative mt-3 text-sm text-foreground/85 leading-relaxed">
                Senior @{" "}
                <span className="text-foreground font-medium">
                  Arizona State University
                </span>{" "}
                in the 4+1 Accelerated B.S. + M.S. CS program, working remotely
                as Team Lead & Cloud/DevOps Engineer at DigiClips Inc.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {about.stats.map((s) => (
                <div
                  key={s.label}
                  className="card p-4 hover:border-foreground/[0.16] hover:bg-foreground/[0.04] transition-colors"
                >
                  <div className="font-display text-2xl font-semibold text-foreground">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[10.5px] uppercase tracking-[0.18em] text-foreground/45">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
