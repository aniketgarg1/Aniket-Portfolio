"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiHtml5,
  SiCss,
  SiFastapi,
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiLangchain,
  SiSqlalchemy,
  SiPydantic,
  SiExpress,
  SiTailwindcss,
  SiDocker,
  SiApache,
  SiPm2,
  SiGnubash,
  SiLinux,
  SiGooglegemini,
  SiOpenai,
  SiGooglecalendar,
  SiGoogle,
  SiTwilio,
  SiDeepgram,
  SiPostgresql,
  SiSqlite,
  SiGit,
  SiGithub,
  SiSelenium,
  SiFfmpeg,
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa6";
import {
  ChevronDown,
  Database,
  Sparkles,
  MessageSquareCode,
  Users,
  GraduationCap,
  Mic,
  CalendarCheck,
  HeartHandshake,
  Languages,
  Image as ImageIcon,
  Clapperboard,
  PenTool,
  Megaphone,
  Video,
  PenLine,
  FileText,
  Cloud,
  Briefcase,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

type Tech = { name: string; Icon: IconType; color: string };

const SKILL_GROUPS: { title: string; eyebrow: string; items: Tech[] }[] = [
  {
    eyebrow: "Languages",
    title: "Languages",
    items: [
      { name: "Python", Icon: SiPython, color: "#3776AB" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "Java", Icon: FaJava, color: "#E76F00" },
      { name: "SQL", Icon: Database, color: "#3B82F6" },
      { name: "C / C++", Icon: SiCplusplus, color: "#00599C" },
      { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", Icon: SiCss, color: "#1572B6" },
    ],
  },
  {
    eyebrow: "Frameworks & Libraries",
    title: "Frameworks & Libraries",
    items: [
      { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
      { name: "Next.js", Icon: SiNextdotjs, color: "currentColor" },
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express", Icon: SiExpress, color: "currentColor" },
      { name: "LangChain", Icon: SiLangchain, color: "#1C3C3C" },
      { name: "SQLAlchemy", Icon: SiSqlalchemy, color: "#D71F00" },
      { name: "Pydantic", Icon: SiPydantic, color: "#E92063" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
    ],
  },
  {
    eyebrow: "Cloud & DevOps",
    title: "Cloud, DevOps & Infra",
    items: [
      { name: "AWS Lightsail", Icon: FaAws, color: "#FF9900" },
      { name: "Docker", Icon: SiDocker, color: "#2496ED" },
      { name: "CI/CD", Icon: SiGithub, color: "currentColor" },
      { name: "Apache", Icon: SiApache, color: "#D22128" },
      { name: "PM2", Icon: SiPm2, color: "#2B037A" },
      { name: "Bash", Icon: SiGnubash, color: "#4EAA25" },
      { name: "Linux", Icon: SiLinux, color: "#FCC624" },
      { name: "Git", Icon: SiGit, color: "#F05032" },
    ],
  },
  {
    eyebrow: "AI / APIs",
    title: "AI Models & APIs",
    items: [
      { name: "OpenAI", Icon: SiOpenai, color: "currentColor" },
      { name: "Gemini", Icon: SiGooglegemini, color: "#4285F4" },
      { name: "Anthropic Claude", Icon: Sparkles, color: "#D97757" },
      { name: "Veo", Icon: SiGoogle, color: "#4285F4" },
      { name: "Lyria", Icon: SiGoogle, color: "#EA4335" },
      { name: "Google Calendar API", Icon: SiGooglecalendar, color: "#4285F4" },
      { name: "Google OAuth", Icon: SiGoogle, color: "#34A853" },
      { name: "Twilio", Icon: SiTwilio, color: "#F22F46" },
      { name: "Vapi", Icon: MessageSquareCode, color: "#5EEAD4" },
      { name: "Deepgram", Icon: SiDeepgram, color: "#13EF95" },
    ],
  },
  {
    eyebrow: "Data & Tools",
    title: "Databases & Tools",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
      { name: "Qdrant (Vector DB)", Icon: Database, color: "#DC382D" },
      { name: "SQLite", Icon: SiSqlite, color: "#003B57" },
      { name: "GitHub", Icon: SiGithub, color: "currentColor" },
      { name: "Selenium", Icon: SiSelenium, color: "#43B02A" },
      { name: "FFmpeg", Icon: SiFfmpeg, color: "#007808" },
    ],
  },
  {
    eyebrow: "Leadership & Communication",
    title: "Leadership & Communication",
    items: [
      { name: "Team Leadership", Icon: Users, color: "#E0B65B" },
      { name: "Mentoring", Icon: GraduationCap, color: "#8C1D40" },
      { name: "Public Speaking", Icon: Mic, color: "#3B82F6" },
      { name: "Event Coordination", Icon: CalendarCheck, color: "#16A34A" },
      { name: "Volunteer Training", Icon: HeartHandshake, color: "#F97316" },
      { name: "Bilingual — English / Hindi", Icon: Languages, color: "#9C66FF" },
    ],
  },
  {
    eyebrow: "Creative & Media",
    title: "Creative & Media",
    items: [
      { name: "Adobe Premiere Pro", Icon: Clapperboard, color: "#9999FF" },
      { name: "Adobe Photoshop", Icon: ImageIcon, color: "#31A8FF" },
      { name: "Canva", Icon: PenTool, color: "#00C4CC" },
      { name: "Social Media Strategy", Icon: Megaphone, color: "#EC4899" },
      { name: "Video Editing", Icon: Video, color: "#F43F5E" },
      { name: "SEO Writing", Icon: PenLine, color: "#22C55E" },
    ],
  },
  {
    eyebrow: "Productivity & Tools",
    title: "Productivity & Tools",
    items: [
      { name: "Microsoft Office", Icon: FileText, color: "#D83B01" },
      { name: "Google Workspace", Icon: SiGoogle, color: "#4285F4" },
      { name: "Salesforce", Icon: Cloud, color: "#00A1E0" },
      { name: "Workday", Icon: Briefcase, color: "#F38B00" },
      { name: "Zoom", Icon: Video, color: "#2D8CFF" },
    ],
  },
];

// Number of categories to show before "See more"
const VISIBLE_COUNT = 2;

export default function Skills() {
  const [expanded, setExpanded] = useState(false);

  const visibleGroups = SKILL_GROUPS.slice(0, VISIBLE_COUNT);
  const hiddenGroups = SKILL_GROUPS.slice(VISIBLE_COUNT);
  const hiddenSkillCount = hiddenGroups.reduce(
    (sum, g) => sum + g.items.length,
    0
  );

  return (
    <section id="skills" className="relative py-14 sm:py-20">
      <div className="container-section">
        <SectionHeading
          eyebrow="Spells & Enchantments"
          title="My magical arsenal."
          description="The languages, frameworks, and incantations I reach for to build, train, and deploy AI-powered software. (Yes, they also have boring corporate names.)"
        />

        <div className="mt-14 space-y-10">
          {visibleGroups.map((group, gi) => (
            <SkillGroup key={group.title} group={group} index={gi} />
          ))}

          <AnimatePresence initial={false}>
            {expanded &&
              hiddenGroups.map((group, gi) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <SkillGroup
                    group={group}
                    index={gi + VISIBLE_COUNT}
                    /* slight delay for the inner items so they cascade */
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* See more / less */}
        {hiddenGroups.length > 0 && (
          <div className="mt-10 flex flex-col items-center gap-2">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.02] px-5 py-2.5 text-sm font-medium text-foreground/92 hover:text-foreground hover:border-foreground/30 hover:bg-foreground/[0.04] transition-all"
              aria-expanded={expanded}
            >
              {expanded ? "Conceal grimoire" : `Reveal ${hiddenSkillCount}+ more spells`}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-foreground/84">
              {expanded
                ? "The full grimoire is open"
                : `${hiddenGroups.length} more chapters hidden`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function SkillGroup({
  group,
  index,
}: {
  group: { title: string; eyebrow: string; items: Tech[] };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div className="flex items-baseline justify-between gap-4 mb-5">
        <h3 className="font-display text-base font-semibold text-foreground">
          {group.title}
        </h3>
        <div className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-foreground/72">
          {group.eyebrow}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {group.items.map((tech, ti) => (
          <TechCard key={tech.name} tech={tech} index={ti} />
        ))}
      </div>
    </motion.div>
  );
}

function TechCard({ tech, index }: { tech: Tech; index: number }) {
  const { Icon, name, color } = tech;
  const isCurrent = color === "currentColor";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.025 }}
      className="group relative flex items-center gap-3 rounded-xl border border-foreground/[0.09] bg-foreground/[0.02] px-3.5 py-3 hover:border-foreground/25 hover:bg-foreground/[0.04] transition-all duration-300"
    >
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-foreground/[0.08] bg-foreground/[0.02] transition-colors duration-300"
        style={!isCurrent ? { borderColor: `${color}33` } : undefined}
      >
        <Icon
          className={`h-[18px] w-[18px] ${isCurrent ? "text-foreground" : ""}`}
          style={!isCurrent ? { color } : undefined}
          aria-hidden
        />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-medium text-foreground truncate">
          {name}
        </div>
      </div>
      {!isCurrent && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(120px 60px at 0% 0%, ${color}1f, transparent 70%)`,
          }}
        />
      )}
    </motion.div>
  );
}
