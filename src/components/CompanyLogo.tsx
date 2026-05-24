"use client";

import { useState } from "react";

/**
 * LinkedIn-style company logo.
 *
 * Tries to load the real company logo from the public Clearbit Logo API
 * (https://clearbit.com/logo). If that fails (404, blocked, etc.), it
 * gracefully falls back to a clean initial-letter avatar with a configurable
 * gradient background.
 */
export default function CompanyLogo({
  domain,
  name,
  fallbackColor,
  size = 56,
  className = "",
}: {
  domain?: string;
  name: string;
  fallbackColor: string;
  size?: number;
  className?: string;
}) {
  const [errored, setErrored] = useState(!domain);

  const letter = (name?.[0] ?? "?").toUpperCase();

  if (errored || !domain) {
    return (
      <div
        className={`shrink-0 inline-flex items-center justify-center rounded-xl border border-foreground/10 overflow-hidden ${className}`}
        style={{
          width: size,
          height: size,
          background: fallbackColor,
        }}
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
        src={`https://logo.clearbit.com/${domain}`}
        alt={`${name} logo`}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setErrored(true)}
        className="h-full w-full object-contain p-1.5"
      />
    </div>
  );
}
