"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading";
import CompanyLogo from "./CompanyLogo";
import {
  experiences,
  education,
  type Experience as Exp,
  type Education as Edu,
} from "@/data/content";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="container-section">
        <SectionHeading
          eyebrow="04 — Experience"
          title="Where I've worked & studied."
          description="Roles, internships, and the academic foundation behind the work."
        />

        {/* Experience */}
        <div className="mt-14">
          <SubHeading icon={<Briefcase className="h-4 w-4" />} title="Experience" />
          <div className="mt-5 space-y-3">
            {experiences.map((exp, i) => (
              <ExperienceCard key={`${exp.role}-${i}`} exp={exp} index={i} />
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-12">
          <SubHeading
            icon={<GraduationCap className="h-4 w-4" />}
            title="Education"
          />
          <div className="mt-5 space-y-3">
            {education.map((edu, i) => (
              <EducationCard key={`${edu.school}-${i}`} edu={edu} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SubHeading({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent/10 text-accent">
        {icon}
      </span>
      <h3 className="font-display text-lg font-semibold text-foreground">
        {title}
      </h3>
    </div>
  );
}

function ExperienceCard({ exp, index }: { exp: Exp; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="card card-hover p-5 sm:p-6"
    >
      <div className="flex gap-4 sm:gap-5">
        <CompanyLogo
          domain={exp.domain}
          name={exp.company}
          fallbackColor={exp.fallbackColor}
          size={56}
        />

        <div className="min-w-0 flex-1">
          {/* Title row */}
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <div className="min-w-0">
              <h4 className="font-display text-base sm:text-lg font-semibold text-foreground leading-snug">
                {exp.role}
              </h4>
              <div className="mt-0.5 text-[13.5px] text-foreground/75">
                <span className="font-medium">{exp.company}</span>
                <span className="text-foreground/30 mx-1.5">·</span>
                <span className="text-foreground/55">{exp.employmentType}</span>
              </div>
            </div>
            <div className="text-xs font-mono text-foreground/45 whitespace-nowrap">
              {exp.period}
            </div>
          </div>

          {/* Location + work mode chips */}
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-foreground/50">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {exp.location}
            </span>
            <span className="text-foreground/25">·</span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10.5px] font-medium ${workModeStyle(
                exp.workMode
              )}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${workModeDot(exp.workMode)}`}
              />
              {exp.workMode}
            </span>
          </div>

          {/* Bullets */}
          <ul className="mt-4 space-y-2 text-[13.5px] text-foreground/70 leading-relaxed">
            {exp.bullets.map((b, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="text-accent mt-[7px] leading-none text-[8px]">
                  ●
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* Skills */}
          {exp.skills && exp.skills.length > 0 && (
            <div className="mt-4 pt-4 border-t border-foreground/[0.06]">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/40 mb-2">
                Skills
              </div>
              <div className="flex flex-wrap gap-1.5">
                {exp.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-foreground/[0.08] bg-foreground/[0.02] px-2 py-0.5 text-[11px] font-mono text-foreground/65"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function EducationCard({ edu, index }: { edu: Edu; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="card card-hover p-5 sm:p-6"
    >
      <div className="flex gap-4 sm:gap-5">
        <CompanyLogo
          domain={edu.domain}
          name={edu.school}
          fallbackColor={edu.fallbackColor}
          size={56}
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <div className="min-w-0">
              <h4 className="font-display text-base sm:text-lg font-semibold text-foreground leading-snug">
                {edu.school}
              </h4>
              <div className="mt-0.5 text-[13.5px] text-foreground/75">
                {edu.degree}
              </div>
            </div>
            <div className="text-xs font-mono text-foreground/45 whitespace-nowrap">
              {edu.period}
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[12px] text-foreground/50">
            <MapPin className="h-3 w-3" />
            {edu.location}
          </div>
          {edu.details.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {edu.details.map((d) => (
                <span
                  key={d}
                  className="rounded-md border border-accent/20 bg-accent/[0.06] px-2 py-0.5 text-[11px] font-mono text-accent"
                >
                  {d}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function workModeStyle(mode: Exp["workMode"]) {
  switch (mode) {
    case "Remote":
      return "border-emerald-500/25 bg-emerald-500/[0.06] text-emerald-400";
    case "On-site":
      return "border-blue-500/25 bg-blue-500/[0.06] text-blue-400";
    case "Hybrid":
      return "border-violet-500/25 bg-violet-500/[0.06] text-violet-400";
    default:
      return "border-foreground/15 bg-foreground/[0.04] text-foreground/70";
  }
}

function workModeDot(mode: Exp["workMode"]) {
  switch (mode) {
    case "Remote":
      return "bg-emerald-400";
    case "On-site":
      return "bg-blue-400";
    case "Hybrid":
      return "bg-violet-400";
    default:
      return "bg-foreground/50";
  }
}
