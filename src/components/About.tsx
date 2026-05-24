"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { about } from "@/data/content";

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container-section">
        <SectionHeading eyebrow="01 — About" title="About me." />

        <div className="mt-12 grid lg:grid-cols-12 gap-10 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-8 space-y-5 text-[15.5px] sm:text-base text-foreground/70 leading-[1.8]"
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
            <div className="card p-6">
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-foreground/40">
                Currently
              </div>
              <div className="mt-3 text-sm text-foreground/85 leading-relaxed">
                Senior @{" "}
                <span className="text-accent">Arizona State University</span>,
                working remotely as a Cloud & DevOps Engineer at DIGICLIPS Inc.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {about.stats.map((s) => (
                <div key={s.label} className="card p-4">
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
