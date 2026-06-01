"use client";

import { useEffect, useRef } from "react";

/**
 * Hogwarts night sky background:
 *  - subtle starfield canvas with slow twinkling stars
 *  - soft golden glow at the top
 *  - violet magical bloom at the bottom-right
 *
 * On the light (Parchment) theme the stars fade out; we keep only
 * the warm paper-grain feel via the body radial gradients.
 */
export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const printTrail = [
    { left: 5, top: 18, flip: false, large: true, delay: 0 },
    { left: 9, top: 33, flip: true, delay: 0.55 },
    { left: 4, top: 50, flip: false, delay: 1.1 },
    { left: 12, top: 69, flip: true, large: true, delay: 1.65 },
    { left: 94, top: 16, flip: true, large: true, delay: 2.2 },
    { left: 89, top: 31, flip: false, delay: 2.75 },
    { left: 96, top: 48, flip: true, delay: 3.3 },
    { left: 88, top: 67, flip: false, large: true, delay: 3.85 },
    { left: 24, top: 91, flip: false, delay: 4.4 },
    { left: 39, top: 94, flip: true, delay: 4.95 },
    { left: 62, top: 92, flip: false, delay: 5.5 },
    { left: 77, top: 95, flip: true, delay: 6.05 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const count = Math.min(140, Math.floor((width * height) / 12000));
    type Star = {
      x: number;
      y: number;
      r: number;
      base: number;
      phase: number;
      speed: number;
      gold: boolean;
    };
    const stars: Star[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.85,
      r: Math.random() * 1.1 + 0.3,
      base: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      speed: 0.0006 + Math.random() * 0.0014,
      gold: Math.random() < 0.18,
    }));

    let raf = 0;
    let running = true;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        const alpha = reduceMotion
          ? s.base
          : s.base + Math.sin(t * s.speed + s.phase) * 0.4;
        const a = Math.max(0, Math.min(1, alpha));
        ctx.beginPath();
        ctx.fillStyle = s.gold
          ? `rgba(212, 175, 55, ${a})`
          : `rgba(255, 250, 230, ${a})`;
        ctx.shadowColor = s.gold
          ? "rgba(212,175,55,0.6)"
          : "rgba(255,250,230,0.5)";
        ctx.shadowBlur = s.gold ? 8 : 4;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      if (running) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onVisibility = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(draw);
      else cancelAnimationFrame(raf);
    };

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Stars (hidden in light/parchment theme) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-100 [.light_&]:opacity-0 transition-opacity duration-500"
      />

      {/* Parchment grain (only visible in light theme) */}
      <div className="absolute inset-0 bg-grid opacity-0 transition-opacity duration-500 [.light_&]:opacity-100" />

      {/* Animated Marauder footprints (light theme only) */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 [.light_&]:opacity-100">
        {printTrail.map((step, i) => {
          return (
            <span
              key={i}
              className="absolute opacity-0"
              style={{
                left: `${step.left}%`,
                top: `${step.top}%`,
                transform: `rotate(${step.flip ? 14 : -14}deg)`,
                animation: `light-footprint-fade 9s ease-in-out ${step.delay}s infinite`,
              }}
            >
              <BackgroundFootprint flip={step.flip} large={step.large} />
            </span>
          );
        })}
      </div>

      {/* Top golden glow */}
      <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_at_top,rgb(var(--accent)/0.10),transparent_60%)]" />

      {/* Bottom magical violet bloom */}
      <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgb(var(--magic)/0.07),transparent_70%)] blur-2xl" />

      <style jsx>{`
        @keyframes light-footprint-fade {
          0%, 100% {
            opacity: 0;
            transform: translateY(6px) scale(0.96);
          }
          16%, 58% {
            opacity: 0.28;
            transform: translateY(0) scale(1);
          }
          78% {
            opacity: 0;
            transform: translateY(-8px) scale(1.02);
          }
        }
      `}</style>
    </div>
  );
}

function BackgroundFootprint({
  flip,
  large,
}: {
  flip?: boolean;
  large?: boolean;
}) {
  const width = large ? 58 : 22;
  const height = large ? 74 : 28;
  const fill = large
    ? "rgb(99 58 24 / 0.18)"
    : "rgb(112 12 5 / 0.48)";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 20"
      fill="none"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <ellipse cx="8" cy="14" rx="4.5" ry="5.2" fill={fill} />
      <circle cx="5.2" cy="6" r="1.1" fill={fill} />
      <circle cx="7.4" cy="4.3" r="1.05" fill={fill} />
      <circle cx="9.8" cy="4.3" r="1.05" fill={fill} />
      <circle cx="12" cy="6" r="1.0" fill={fill} />
    </svg>
  );
}
