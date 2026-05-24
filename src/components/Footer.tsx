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

          <div className="flex items-center gap-1">
            <FooterIcon href={`mailto:${profile.email}`} label="Email">
              <Mail className="h-4 w-4" />
            </FooterIcon>
            <FooterIcon href={profile.socials.github} label="GitHub">
              <Github className="h-4 w-4" />
            </FooterIcon>
            <FooterIcon href={profile.socials.linkedin} label="LinkedIn">
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
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer noopener"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/50 hover:text-accent hover:bg-foreground/[0.04] transition-colors"
    >
      {children}
    </a>
  );
}
