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
    "Computer Science @ Arizona State University (4+1 Accelerated B.S. + M.S.). I lead engineering teams, build AI-powered products, and ship production systems — from multi-agent LLM apps and real-time voice agents to full-stack cloud deployments on AWS.",
  location: "Tempe, Arizona",
  email: "garganiket27@gmail.com",
  phone: "+1 480 875 7204",
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
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export const about = {
  paragraphs: [
    "I'm a senior Computer Science student at Arizona State University, currently enrolled in the 4+1 Accelerated B.S. + M.S. program (B.S. May 2026, M.S. May 2027). I love building at the intersection of AI, full-stack engineering, and cloud infrastructure — taking ideas from a hackathon whiteboard all the way to production deployments.",
    "Most recently I've been Team Lead & Cloud/DevOps Engineer at DigiClips Inc., coordinating the AWS engineering team and shipping CI/CD pipelines end-to-end. Before that I was a Software Engineer Intern at L&T Technology Services in Bangalore, working on Linux migrations for a Fortune 500 client.",
    "Outside the IDE, I'm a hackathon regular (CalHacks, UCLA Build with Gemini, ASU Prompt Engineering), a long-time volunteer with the Isha Foundation, and self-taught on the guitar and harmonium. I'm bilingual in English and Hindi.",
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
    role: "Team Lead & Cloud/DevOps Engineer (AWS)",
    company: "DigiClips Inc.",
    domain: "digiclips.com",
    employmentType: "Internship",
    workMode: "Remote",
    location: "Lafayette, CO",
    period: "Aug 2025 — Present",
    fallbackColor: "linear-gradient(135deg, #0ea5e9, #6366f1)",
    bullets: [
      "Lead the AWS engineering team — assign roles, set delivery timelines, and coordinate across multiple internal teams to ensure milestones are met on schedule.",
      "Migrated production from a manual ZIP workflow to a Git-controlled CI/CD pipeline (Bash), automating code sync, build, service restart, and health checks end-to-end.",
      "Deployed and managed a full-stack Angular + Node.js/Express app on AWS Lightsail; configured Apache reverse proxy and HTTPS routing for secure frontend-backend communication.",
      "Debugged critical SSL misconfiguration, API routing failures, and VPN-based DB connectivity issues; managed backend services with PM2 ensuring production stability.",
    ],
    skills: ["AWS Lightsail", "Bash", "CI/CD", "Apache", "PM2", "Node.js", "Linux", "Team Leadership"],
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
      "Developed and deployed production features including remote server power control and Linux-based chip flashing support, improving platform stability and scalability.",
    ],
    skills: ["Linux", "RPM Packaging", "C/C++", "Bash", "Windows", "System Administration"],
  },
  {
    role: "Food Security Coordinator",
    company: "Changemaker Central @ ASU",
    domain: "asu.edu",
    employmentType: "Part-time",
    workMode: "On-site",
    location: "Tempe, AZ",
    period: "Sep 2022 — May 2023",
    fallbackColor: "linear-gradient(135deg, #8c1d40, #ffc627)",
    bullets: [
      "Developed creative content promoting sustainable habits and tree-plantation initiatives, reaching the broader ASU student community through targeted campaigns.",
      "Organized and facilitated volunteer events raising awareness about sustainability and corporate responsibility among students and organizations.",
      "Secured funding for sustainability-focused events and coordinated full logistics: scheduling, materials, volunteer assignments, and post-event reporting.",
    ],
    skills: ["Event Coordination", "Community Outreach", "Sustainability", "Content Strategy"],
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
      "Mentored 120+ students through 1:1 office hours and group lectures on HTML, CSS, JavaScript, and GitHub; guided teams in collaborative problem-solving and accessible design practices.",
      "Provided individualized feedback on student work, tracking progress and tailoring guidance across a large and diverse cohort.",
      "Facilitated student-centered sessions that built confidence and real-world application skills, fostering inclusive and user-centric engineering practices.",
    ],
    skills: ["HTML", "CSS", "JavaScript", "Git", "GitHub", "Teaching", "Mentorship"],
  },
];

export type Volunteer = {
  role: string;
  org: string;
  domain?: string;
  location: string;
  period: string;
  fallbackColor: string;
  bullets: string[];
};

export const volunteering: Volunteer[] = [
  {
    role: "Zoom Coordinator — Inner Engineering Online",
    org: "Isha Foundation",
    domain: "ishafoundation.org",
    location: "Remote",
    period: "April 2026",
    fallbackColor: "linear-gradient(135deg, #f97316, #facc15)",
    bullets: [
      "Designed and led onboarding sessions to train volunteers on digital facilitation, communicating program flow and online best practices to ensure team readiness.",
      "Managed live session logistics in real time — supporting participant access, troubleshooting tech issues, and ensuring a smooth experience for all attendees.",
    ],
  },
  {
    role: "Program Coordinator — Inner Engineering",
    org: "Isha Foundation",
    domain: "ishafoundation.org",
    location: "Phoenix Metro Area, AZ",
    period: "March 2026",
    fallbackColor: "linear-gradient(135deg, #f97316, #facc15)",
    bullets: [
      "Coordinated all event logistics for 44 participants and ~35 volunteers — overseeing kitchen, security, hall setup, registration, materials, ushering, and welcoming teams across a 16-hour day.",
      "Trained volunteers in their respective roles and resolved real-time operational challenges to maintain seamless program execution throughout the event.",
      "Drove community outreach at booths in Tumbleweed Park (Chandler) and Snap Shivjayanti (Scottsdale), engaging hundreds of people 1:1 and in crowd settings.",
    ],
  },
  {
    role: "University Outreach Volunteer",
    org: "Save Soil / Conscious Planet",
    domain: "consciousplanet.org",
    location: "India",
    period: "Jan 2022 — Aug 2022",
    fallbackColor: "linear-gradient(135deg, #65a30d, #92400e)",
    bullets: [
      "Conducted awareness sessions at universities across India on the global soil crisis — part of a movement reaching 3.91 billion+ people, recognized by the UN, IUCN, and World Economic Forum.",
      "Engaged students and faculty in small and large group settings, facilitating impactful discussions on environmental advocacy and policy solutions.",
    ],
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
    degree: "M.S. Computer Science — 4+1 Accelerated Program",
    period: "Aug 2026 — Expected May 2027",
    location: "Tempe, AZ",
    details: ["Accelerated B.S. + M.S. track"],
    fallbackColor: "linear-gradient(135deg, #8c1d40, #ffc627)",
  },
  {
    school: "Arizona State University",
    domain: "asu.edu",
    degree: "B.S. Computer Science",
    period: "Aug 2022 — Expected May 2026",
    location: "Tempe, AZ",
    details: ["Major GPA: 4.0 / 4.0"],
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
