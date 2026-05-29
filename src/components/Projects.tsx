"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, FolderGit2, Calendar } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { projects, profile, type Project } from "@/data/content";

export default function Projects() {
  const featured = projects.filter((p) => p.highlight);
  const rest = projects.filter((p) => !p.highlight);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="container-section">
        <SectionHeading
          eyebrow="The Spellbook"
          title="Things I've conjured."
          description="Hackathon wins, side quests, and full-stack systems — each one brewed from idea to deployment, often well past midnight."
        />

        {/* Featured */}
        <div className="mt-14 space-y-20 sm:space-y-24">
          {featured.map((p, i) => (
            <FeaturedProject key={p.title} project={p} index={i} />
          ))}
        </div>

        {/* Grid of others */}
        {rest.length > 0 && (
          <div className="mt-20">
            <h3 className="font-display text-xl font-semibold text-foreground">
              From the lesser-known chapters
            </h3>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {rest.map((p, i) => (
                <CompactCard key={p.title} project={p} index={i} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer noopener"
            className="button-ghost"
          >
            <Github className="h-4 w-4" />
            More spells on GitHub
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function FeaturedProject({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reversed = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className={`grid lg:grid-cols-12 gap-6 lg:gap-10 items-center ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Visual */}
      <div className="lg:col-span-7">
        <div className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-foreground/[0.08] bg-foreground/[0.02]">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(var(--accent)/0.10),transparent_60%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <FolderGit2
              className="h-16 w-16 text-foreground/15"
              strokeWidth={1.2}
            />
          </div>
          <div className="absolute top-4 left-4 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            ✦ Featured Spell
          </div>
          {project.period && (
            <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-md border border-foreground/10 bg-background/40 backdrop-blur px-2 py-0.5 font-mono text-[10.5px] text-foreground/80">
              <Calendar className="h-3 w-3" />
              {project.period}
            </div>
          )}
        </div>
      </div>

      {/* Copy */}
      <div className="lg:col-span-5">
        <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent">
          ✦ Featured Spell
        </div>
        <h3 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-foreground text-balance">
          {project.title}
        </h3>
        {project.subtitle && (
          <div className="mt-1 text-sm text-foreground/70">
            {project.subtitle}
          </div>
        )}
        <div className="mt-5 card p-5 sm:p-6 text-[14.5px] text-foreground/85 leading-relaxed">
          {project.description}
        </div>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-foreground/10 bg-foreground/[0.02] px-2 py-0.5 text-[11px] font-mono text-foreground/80"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-4 text-sm">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-foreground/80 hover:text-accent transition-colors"
            >
              <Github className="h-4 w-4" /> Source
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-foreground/80 hover:text-accent transition-colors"
            >
              Live demo <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function CompactCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="card card-hover group flex flex-col p-6 h-full"
    >
      <div className="flex items-start justify-between">
        <FolderGit2 className="h-7 w-7 text-accent/80" strokeWidth={1.4} />
        <div className="flex items-center gap-3 text-foreground/70">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Source"
              className="hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Live demo"
              className="hover:text-foreground transition-colors"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        {project.subtitle && (
          <div className="mt-0.5 text-xs text-foreground/65">
            {project.subtitle} · {project.period}
          </div>
        )}
        {!project.subtitle && project.period && (
          <div className="mt-0.5 text-xs text-foreground/65">{project.period}</div>
        )}
      </div>
      <p className="mt-2 text-sm text-foreground/75 leading-relaxed flex-1">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-md bg-foreground/[0.03] px-2 py-0.5 text-[11px] font-mono text-foreground/70"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
