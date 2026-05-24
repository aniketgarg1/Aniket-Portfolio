/**
 * All personal content lives here.
 * Edit this single file to customize your portfolio end-to-end.
 */

export const profile = {
  name: "Aniket Garg",
  shortName: "Aniket",
  role: "AI & Software Engineer",
  roles: [
    "AI Engineer",
    "Full-Stack Developer",
    "Cloud & DevOps Engineer",
    "Builder",
  ],
  tagline:
    "Computer Science @ Arizona State University. I build AI-powered products and ship production systems — from multi-agent LLM apps and real-time voice agents to full-stack cloud deployments on AWS.",
  location: "Tempe, Arizona",
  email: "garganiket27@gmail.com",
  phone: "+91 99997 77250",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/aniketgarg1",
    linkedin: "https://linkedin.com/in/aniketgarg1",
  },
};

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export const about = {
  paragraphs: [
    "I'm a senior Computer Science student at Arizona State University (4.0 major GPA, 10.0/10.0 CGPA) graduating in May 2026. I love building at the intersection of AI, full-stack engineering, and cloud infrastructure — taking ideas from a hackathon whiteboard all the way to production deployments.",
    "Most recently I've been working as a Cloud & DevOps Engineer at DIGICLIPS Inc. (remote), where I migrated production to a Git-controlled CI/CD pipeline on AWS. Before that, I was a Software Engineer Intern at L&T Technology Services in Bangalore, working on Linux migrations for a Fortune 500 client.",
    "I'm fascinated by agentic AI, multimodal models, and building tools that actually ship. When I'm not coding, you'll find me at hackathons (CalHacks, UCLA Build with Gemini, ASU Prompt Engineering) or in the Arizona desert.",
  ],
  stats: [
    { label: "Major GPA", value: "4.0" },
    { label: "Hackathons", value: "5+" },
    { label: "Students Mentored", value: "120+" },
    { label: "Production Deploys", value: "10+" },
  ],
};

export type Experience = {
  role: string;
  company: string;
  domain?: string;
  employmentType: string;
  workMode: "Remote" | "On-site" | "Hybrid";
  location: string;
  period: string;
  fallbackColor: string;
  bullets: string[];
  skills: string[];
};

export const experiences: Experience[] = [
  {
    role: "Cloud & DevOps Engineer (AWS)",
    company: "DIGICLIPS Inc.",
    domain: "digiclips.com",
    employmentType: "Internship",
    workMode: "Remote",
    location: "Lafayette, CO",
    period: "Aug 2025 — Present",
    fallbackColor: "linear-gradient(135deg, #0ea5e9, #6366f1)",
    bullets: [
      "Migrated production from a manual ZIP-based workflow to a Git-controlled CI/CD pipeline (Bash), automating code sync, build, service restart, and health checks end-to-end.",
      "Deployed and managed a full-stack Angular + Node.js/Express app on AWS Lightsail; configured Apache reverse proxy and HTTPS routing for secure frontend-backend communication.",
      "Debugged critical SSL misconfiguration, API routing failures, and VPN-based database connectivity issues; managed backend services with PM2 ensuring production stability.",
    ],
    skills: ["AWS Lightsail", "Bash", "CI/CD", "Apache", "PM2", "Node.js", "Express", "Linux"],
  },
  {
    role: "Software Engineer Intern",
    company: "L&T Technology Services",
    domain: "ltts.com",
    employmentType: "Internship",
    workMode: "On-site",
    location: "Bangalore, India",
    period: "Jun 2025 — Aug 2025",
    fallbackColor: "linear-gradient(135deg, #1e3a8a, #06b6d4)",
    bullets: [
      "Migrated a Fortune 500 client's codebase from Windows to Linux, converting executables into .rpm packages for one-click deployment across Linux servers.",
      "Resolved critical dependency and environment-specific bugs enabling seamless server startup and full remote power state management (on/off) through the parent application.",
      "Developed and deployed production-level features including remote server power control and Linux-based chip flashing support, improving platform stability and scalability.",
    ],
    skills: ["Linux", "RPM Packaging", "C/C++", "Bash", "Windows", "System Administration"],
  },
  {
    role: "Undergraduate Teaching Assistant",
    company: "Arizona State University — Fulton Schools of Engineering",
    domain: "asu.edu",
    employmentType: "Part-time",
    workMode: "On-site",
    location: "Tempe, AZ",
    period: "Aug 2023 — Jan 2024",
    fallbackColor: "linear-gradient(135deg, #8c1d40, #ffc627)",
    bullets: [
      "Guided 120+ students on HTML, CSS, JavaScript, and GitHub to build accessible web solutions for individuals with reduced mobility; led technical lectures and problem-solving sessions.",
      "Mentored project teams on collaborative development using GitHub, fostering user-centric engineering practices and real-world application building.",
      "Evaluated student submissions, provided constructive feedback on code quality, and held office hours to support students in debugging and improving their projects.",
    ],
    skills: ["HTML", "CSS", "JavaScript", "Git", "GitHub", "Teaching", "Mentorship"],
  },
];

export type Education = {
  school: string;
  domain?: string;
  degree: string;
  period: string;
  location: string;
  details: string[];
  fallbackColor: string;
};

export const education: Education[] = [
  {
    school: "Arizona State University",
    domain: "asu.edu",
    degree: "B.S. Computer Science",
    period: "Aug 2022 — Expected May 2026",
    location: "Tempe, AZ",
    details: ["Major GPA: 4.0 / 4.0", "CGPA: 10.0 / 10.0"],
    fallbackColor: "linear-gradient(135deg, #8c1d40, #ffc627)",
  },
];

export type Project = {
  title: string;
  subtitle?: string;
  period: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  highlight?: boolean;
};

export const projects: Project[] = [
  {
    title: "LaunchLoop",
    subtitle: "UCLA Build with Gemini Hackathon",
    period: "Apr 2026",
    description:
      "AI-powered event marketing generator that turns a single event brief into a launch-ready promo kit — campaign messaging, storyboards, posters, promo videos, AI voiceovers, and music stitched via FFmpeg. Built a multimodal orchestration workflow on Gemini, Veo, and Lyria, delivering a polished end-to-end demo under hackathon timelines.",
    tags: ["Next.js", "React", "TypeScript", "Gemini", "Veo", "Lyria", "FFmpeg"],
    github: "https://github.com/aniketgarg1",
    highlight: true,
  },
  {
    title: "Productivity Copilot",
    period: "Mar 2026",
    description:
      "Agentic AI assistant (FastAPI + Next.js + Docker) that converts natural-language goals into milestone-based plans and auto-schedules tasks into Google Calendar using free/busy analysis. Implemented Google OAuth token refresh, deterministic task-ID hashing for idempotent deduplication, persistent tracking via SQLAlchemy + Postgres, and Twilio voice check-ins via APScheduler.",
    tags: ["FastAPI", "Next.js", "Docker", "Google OAuth", "Twilio", "PostgreSQL", "SQLAlchemy", "APScheduler"],
    github: "https://github.com/aniketgarg1",
    highlight: true,
  },
  {
    title: "EmotionTalk",
    subtitle: "CalHacks 12.0 — Berkeley, CA",
    period: "Oct 2025",
    description:
      "Real-time voice agent for sales calls using Vapi, Deepgram, and Claude/OpenAI that detects customer emotion and delivers live coaching. Implemented speaker diarization, debounced LLM analysis, and one-click call summaries to keep latency low while keeping reps informed.",
    tags: ["Vapi", "Deepgram", "Claude", "OpenAI", "Python", "Real-time"],
    github: "https://github.com/aniketgarg1",
    highlight: true,
  },
  {
    title: "SparkyAI",
    subtitle: "AI-Powered University Copilot",
    period: "Spring 2025",
    description:
      "Modular multi-agent Discord bot for ASU students. Used LangChain RAG with Qdrant for retrieval and a Selenium-based scraping pipeline that continuously updates the knowledge base with real-time campus data — achieving 75% higher response accuracy and 10s lower latency through document reranking.",
    tags: ["LangChain", "Qdrant", "Selenium", "Discord", "RAG", "Python"],
    github: "https://github.com/aniketgarg1",
  },
  {
    title: "AI Social Media Promoter",
    subtitle: "ASU Prompt Engineering Hackathon",
    period: "May 2024",
    description:
      "GPT-powered tool enabling 189,000+ women entrepreneurs to create marketing content effortlessly. Recognized by ASU and OpenAI with ChatGPT Enterprise access for the project's social impact.",
    tags: ["GPT", "Python", "Prompt Engineering", "OpenAI"],
  },
];
