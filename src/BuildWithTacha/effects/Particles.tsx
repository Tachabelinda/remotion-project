import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";

interface Particle {
  x: number;
  y: number;
  vy: number;
  size: number;
  phase: number;
  opacity: number;
  speed: number;
  type: "glow" | "streak" | "dot";
}

export const Particles: React.FC<{ count?: number }> = ({ count = 24 }) => {
  const frame = useCurrentFrame();

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        vy: -(Math.random() * 0.1 + 0.02),
        size: Math.random() * 2.5 + 0.6,
        phase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.45 + 0.06,
        speed: Math.random() * 0.55 + 0.4,
        type: i % 5 === 0 ? "glow" : i % 5 === 1 ? "streak" : "dot",
      })),
    [count]
  );

  return (
    <AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((p, i) => {
        const t = ((frame * 0.44 * p.speed + p.phase) % (Math.PI * 2));
        const y = ((p.y - frame * p.vy * 0.85) % 110 + 110) % 110 - 10;
        const pulse = 0.4 + Math.sin(t) * 0.35;
        const isGlow = p.type === "glow";
        const isStreak = p.type === "streak";

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x + Math.sin(t * 0.65) * 2}%`,
              top: `${y}%`,
              width: isStreak ? p.size * 0.6 : p.size * (isGlow ? 2.5 : 1),
              height: isStreak ? p.size * 8 : p.size * (isGlow ? 2.5 : 1),
              borderRadius: isStreak ? 1 : "50%",
              background: isGlow
                ? COLORS.goldBright
                : isStreak
                ? `linear-gradient(180deg, transparent, ${COLORS.gold}, transparent)`
                : COLORS.gold,
              opacity: p.opacity * pulse * (isStreak ? 0.5 : 1),
              boxShadow: isGlow
                ? `0 0 ${p.size * 6}px ${COLORS.goldBright}`
                : "none",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
