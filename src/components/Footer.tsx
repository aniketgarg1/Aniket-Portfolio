"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/content";

export default function Footer() {
  return (
    <footer className="relative border-t border-foreground/[0.06] mt-10">
      <div className="container-section py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/40 font-mono">
            © {new Date().getFullYear()} {profile.name}. Designed & built from
            scratch.
          </p>

          <div className="flex items-center gap-1.5">
            <FooterIcon
              href={`mailto:${profile.email}`}
              label="Email"
              brand="#0d9488"
            >
              <Mail className="h-4 w-4" />
            </FooterIcon>
            <FooterIcon
              href={profile.socials.github}
              label="GitHub"
              useForeground
            >
              <Github className="h-4 w-4" />
            </FooterIcon>
            <FooterIcon
              href={profile.socials.linkedin}
              label="LinkedIn"
              brand="#0A66C2"
            >
              <Linkedin className="h-4 w-4" />
            </FooterIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterIcon({
  href,
  label,
  brand,
  useForeground,
  children,
}: {
  href: string;
  label: string;
  brand?: string;
  useForeground?: boolean;
  children: React.ReactNode;
}) {
  const cssVars = brand ? ({ "--brand": brand } as React.CSSProperties) : undefined;
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer noopener"
      style={cssVars}
      className={[
        "inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors",
        useForeground
          ? "text-foreground/65 hover:text-foreground hover:bg-foreground/[0.06]"
          : "text-foreground/65 hover:text-[var(--brand)] hover:bg-[var(--brand)]/10",
      ].join(" ")}
    >
      {children}
    </a>
  );
}
