# Aniket Garg — Portfolio

A stunning, modern portfolio site for an AI / Software Engineer. Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

Designed to look outstanding the moment someone lands on it: animated particle/blob background, glassmorphism, gradient typography, and buttery-smooth scroll animations.

---

## Quick start

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build
npm run start
```

---

## Customizing your content

Almost everything you'll want to edit lives in **one file**:

```
src/data/content.ts
```

That file controls your:

- Name, role, tagline, location, email
- Resume URL
- Social links (GitHub, LinkedIn, Twitter)
- About paragraphs and stats
- Skill categories & tech chips
- Projects (title, description, tags, GitHub, demo, gradient color)
- Experience timeline (role, company, dates, bullets, tech)

### Add your resume

Drop your resume PDF at `public/resume.pdf`. The "Resume" button in the hero links there automatically (via `profile.resumeUrl`).

### Change accent colors

The accent palette is defined in `tailwind.config.ts` under `theme.extend.colors.accent`. The hero gradient, glow shadows, and most highlights pull from these.

### Update fonts

Fonts are loaded in `src/app/layout.tsx` via `next/font/google` and exposed as CSS variables consumed in `tailwind.config.ts`. Swap the imports to taste.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout, fonts, metadata
│   ├── page.tsx          # Single-page composition
│   └── globals.css       # Tailwind layers + custom design tokens
├── components/
│   ├── AnimatedBackground.tsx
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── SectionHeading.tsx
├── data/
│   └── content.ts        # ← edit this file
└── lib/
    └── utils.ts          # cn() helper
```

---

## Deploy

The fastest way to deploy is **Vercel** (made by the creators of Next.js).

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Click **Deploy**. That's it.

You can also deploy on **Netlify**, **Cloudflare Pages**, or any host that supports Next.js.

---

## Tech

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** with custom design tokens
- **Framer Motion** for scroll-triggered & layout animations
- **Lucide React** for crisp icons
- Custom **HTML5 Canvas** particle field background

---

## License

MIT — feel free to use this as a starting point for your own portfolio.
