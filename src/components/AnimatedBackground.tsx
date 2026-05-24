/**
 * Subtle, static, theme-aware background:
 *  - faint grid pattern that fades out toward the bottom
 *  - a single soft radial accent glow at the top
 */
export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60 mask-fade-b" />
      <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_at_top,rgb(var(--accent)/0.08),transparent_60%)]" />
    </div>
  );
}
