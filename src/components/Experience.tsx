"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, HeartHandshake, MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading";
import CompanyLogo from "./CompanyLogo";
import {
  experiences,
  education,
  volunteering,
  type Experience as Exp,
  type Education as Edu,
  type Volunteer,
} from "@/data/content";

const LOGO_SIZE = 56;
const LINE_LEFT = LOGO_SIZE / 2; // 28px - centers the line on the logo

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="container-section">
        <SectionHeading
          eyebrow="Magical Chronicles"
          title="My journey so far."
          description="Quests undertaken, mentors served, and the academic foundation behind the work — each chapter as told in the great Hogwarts ledger."
        />

        {/* Work */}
        <Subsection
          icon={<Briefcase className="h-4 w-4" />}
          title="Professional Quests"
          count={experiences.length}
        >
          <Timeline>
            {experiences.map((exp, i) => (
              <TimelineItem
                key={`exp-${i}`}
                index={i}
                logo={
                  <CompanyLogo
                    logo={exp.logo}
                    domain={exp.domain}
                    name={exp.company}
                    fallbackColor={exp.fallbackColor}
                    size={LOGO_SIZE}
                    className="ring-4 ring-background"
                  />
                }
              >
                <ExperienceCard exp={exp} />
              </TimelineItem>
            ))}
          </Timeline>
        </Subsection>

        {/* Volunteering */}
        <Subsection
          icon={<HeartHandshake className="h-4 w-4" />}
          title="Order of the Phoenix"
          count={volunteering.length}
        >
          <Timeline>
            {volunteering.map((v, i) => (
              <TimelineItem
                key={`vol-${i}`}
                index={i}
                logo={
                  <CompanyLogo
                    logo={v.logo}
                    domain={v.domain}
                    name={v.org}
                    fallbackColor={v.fallbackColor}
                    size={LOGO_SIZE}
                    className="ring-4 ring-background"
                  />
                }
              >
                <VolunteerCard v={v} />
              </TimelineItem>
            ))}
          </Timeline>
        </Subsection>

        {/* Education */}
        <Subsection
          icon={<GraduationCap className="h-4 w-4" />}
          title="Wizarding Education"
          count={education.length}
        >
          <Timeline>
            {education.map((edu, i) => (
              <TimelineItem
                key={`edu-${i}`}
                index={i}
                logo={
                  <CompanyLogo
                    logo={edu.logo}
                    domain={edu.domain}
                    name={edu.school}
                    fallbackColor={edu.fallbackColor}
                    size={LOGO_SIZE}
                    className="ring-4 ring-background"
                  />
                }
              >
                <EducationCard edu={edu} />
              </TimelineItem>
            ))}
          </Timeline>
        </Subsection>
      </div>
    </section>
  );
}

/* ---------- Layout primitives ---------- */

function Subsection({
  icon,
  title,
  count,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-14 first:mt-14">
      <div className="flex items-center gap-2.5 mb-6">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-accent/10 text-accent">
          {icon}
        </span>
        <h3 className="font-display text-lg font-semibold text-foreground">
          {title}
        </h3>
        <span className="text-xs font-mono text-foreground/55 ml-1">
          ({count})
        </span>
      </div>
      {children}
    </div>
  );
}

function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Continuous vertical line down the logo column */}
      <div
        className="absolute top-[28px] bottom-[28px] w-px bg-gradient-to-b from-accent/30 via-foreground/10 to-accent/10"
        style={{ left: `${LINE_LEFT}px` }}
        aria-hidden
      />
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function TimelineItem({
  index,
  logo,
  children,
}: {
  index: number;
  logo: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="relative"
      style={{ paddingLeft: `${LOGO_SIZE + 20}px` }}
    >
      <div className="absolute left-0 top-0 z-10">{logo}</div>
      <div className="card card-hover p-5 sm:p-6">{children}</div>
    </motion.div>
  );
}

/* ---------- Card bodies ---------- */

function ExperienceCard({ exp }: { exp: Exp }) {
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <div className="min-w-0">
          <h4 className="font-display text-base sm:text-lg font-semibold text-foreground leading-snug">
            {exp.role}
          </h4>
          <div className="mt-0.5 text-[13.5px] text-foreground/90">
            <span className="font-medium">{exp.company}</span>
            <span className="text-foreground/30 mx-1.5">·</span>
            <span className="text-foreground/70">{exp.employmentType}</span>
          </div>
        </div>
        <div className="text-xs font-mono text-foreground/60 whitespace-nowrap">
          {exp.period}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-foreground/65">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {exp.location}
        </span>
        <span className="text-foreground/25">·</span>
        <WorkModeBadge mode={exp.workMode} />
      </div>

      <ul className="mt-4 space-y-2 text-[13.5px] text-foreground/85 leading-relaxed">
        {exp.bullets.map((b, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="text-accent mt-[7px] leading-none text-[8px]">●</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {exp.skills?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-foreground/[0.06]">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/55 mb-2">
            Skills
          </div>
          <div className="flex flex-wrap gap-1.5">
            {exp.skills.map((s) => (
              <span
                key={s}
                className="rounded-md border border-foreground/[0.08] bg-foreground/[0.02] px-2 py-0.5 text-[11px] font-mono text-foreground/80"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function VolunteerCard({ v }: { v: Volunteer }) {
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <div className="min-w-0">
          <h4 className="font-display text-base sm:text-lg font-semibold text-foreground leading-snug">
            {v.role}
          </h4>
          <div className="mt-0.5 text-[13.5px] text-foreground/90 font-medium">
            {v.org}
          </div>
        </div>
        <div className="text-xs font-mono text-foreground/60 whitespace-nowrap">
          {v.period}
        </div>
      </div>
      <div className="mt-2 inline-flex items-center gap-1 text-[12px] text-foreground/65">
        <MapPin className="h-3 w-3" />
        {v.location}
      </div>
      <ul className="mt-4 space-y-2 text-[13.5px] text-foreground/85 leading-relaxed">
        {v.bullets.map((b, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="text-accent mt-[7px] leading-none text-[8px]">●</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function EducationCard({ edu }: { edu: Edu }) {
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <div className="min-w-0">
          <h4 className="font-display text-base sm:text-lg font-semibold text-foreground leading-snug">
            {edu.school}
          </h4>
          <div className="mt-0.5 text-[13.5px] text-foreground/90">
            {edu.degree}
          </div>
        </div>
        <div className="text-xs font-mono text-foreground/60 whitespace-nowrap">
          {edu.period}
        </div>
      </div>
      <div className="mt-2 inline-flex items-center gap-1 text-[12px] text-foreground/65">
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
    </>
  );
}

/* ---------- Helpers ---------- */

function WorkModeBadge({ mode }: { mode: Exp["workMode"] }) {
  const styles =
    mode === "Remote"
      ? "border-emerald-500/25 bg-emerald-500/[0.06] text-emerald-400"
      : mode === "On-site"
        ? "border-blue-500/25 bg-blue-500/[0.06] text-blue-400"
        : "border-violet-500/25 bg-violet-500/[0.06] text-violet-400";
  const dot =
    mode === "Remote"
      ? "bg-emerald-400"
      : mode === "On-site"
        ? "bg-blue-400"
        : "bg-violet-400";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10.5px] font-medium ${styles}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {mode}
    </span>
  );
}
