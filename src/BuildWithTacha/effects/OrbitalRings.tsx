import React from "react";
import { useCurrentFrame } from "remotion";

interface RingConfig {
  size: number;
  speed: number;
  opacity: number;
  thickness?: number;
}

const DEFAULT_RINGS: RingConfig[] = [
  { size: 480, speed: 0.25, opacity: 0.18 },
  { size: 370, speed: 0.45, opacity: 0.12 },
  { size: 250, speed: 0.7, opacity: 0.22 },
  { size: 152, speed: 1.1, opacity: 0.38, thickness: 1.2 },
];

export const OrbitalRings: React.FC<{ rings?: RingConfig[] }> = ({
  rings = DEFAULT_RINGS,
}) => {
  const frame = useCurrentFrame();
  const rot = frame * 0.9;

  return (
    <>
      {rings.map((ring, i) => {
        const breathe = 1 + Math.sin(frame * 0.14) * 0.04;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: ring.size * breathe,
              height: ring.size * breathe,
              borderRadius: "50%",
              border: `${ring.thickness ?? 0.6}px solid rgba(184,150,78,${ring.opacity})`,
              transform: `rotate(${rot * (i % 2 === 0 ? 1 : -1) * ring.speed}deg)`,
              boxShadow: `0 0 ${ring.size * 0.08}px rgba(212,174,106,${ring.opacity * 0.3})`,
            }}
          />
        );
      })}
    </>
  );
};
