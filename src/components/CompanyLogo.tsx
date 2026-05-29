"use client";

import { useState } from "react";

/**
 * LinkedIn-style company logo.
 *
 * Resolution order:
 *   1. `logo` (a local path like "/logos/asu.ico" — most reliable)
 *   2. DuckDuckGo's public icon endpoint via `domain`
 *   3. A clean initial-letter avatar with a configurable gradient
 */
export default function CompanyLogo({
  logo,
  domain,
  name,
  fallbackColor,
  size = 56,
  className = "",
}: {
  logo?: string;
  domain?: string;
  name: string;
  fallbackColor: string;
  size?: number;
  className?: string;
}) {
  const sources: string[] = [];
  if (logo) sources.push(logo);
  if (domain) sources.push(`https://icons.duckduckgo.com/ip3/${domain}.ico`);

  const [sourceIdx, setSourceIdx] = useState(0);
  const currentSrc = sources[sourceIdx];

  const letter = (name?.[0] ?? "?").toUpperCase();

  if (!currentSrc) {
    return (
      <div
        className={`shrink-0 inline-flex items-center justify-center rounded-xl border border-foreground/10 overflow-hidden ${className}`}
        style={{ width: size, height: size, background: fallbackColor }}
        aria-label={name}
      >
        <span
          className="font-display font-semibold text-white"
          style={{ fontSize: size * 0.42 }}
        >
          {letter}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`shrink-0 inline-flex items-center justify-center rounded-xl border border-foreground/10 bg-white overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={currentSrc}
        src={currentSrc}
        alt={`${name} logo`}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setSourceIdx((i) => i + 1)}
        className="h-full w-full object-contain p-1.5"
      />
    </div>
  );
}
