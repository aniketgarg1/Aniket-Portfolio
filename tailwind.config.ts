import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        magic: "rgb(var(--magic) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-garamond)", "Georgia", "serif"],
        display: ["var(--font-cinzel)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "flicker": {
          "0%, 100%": { opacity: "1", transform: "scaleY(1) translateX(0)" },
          "20%": { opacity: "0.85", transform: "scaleY(1.05) translateX(-0.5px)" },
          "40%": { opacity: "0.92", transform: "scaleY(0.97) translateX(0.5px)" },
          "60%": { opacity: "0.8", transform: "scaleY(1.08) translateX(0)" },
          "80%": { opacity: "0.95", transform: "scaleY(1.02) translateX(-0.5px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "twinkle": {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        "sparkle-out": {
          "0%": { opacity: "1", transform: "translate(0,0) scale(1)" },
          "100%": { opacity: "0", transform: "translate(var(--tx,0),var(--ty,0)) scale(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.8s ease-out forwards",
        "flicker": "flicker 2.2s ease-in-out infinite",
        "float-slow": "float-slow 5s ease-in-out infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
