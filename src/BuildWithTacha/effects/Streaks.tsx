import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

export const Streaks: React.FC<{ count?: number }> = ({ count = 3 }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{ overflow: "hidden", pointerEvents: "none", opacity: 0.12 }}
    >
      {Array.from({ length: count }, (_, i) => {
        const x = ((frame * (0.3 + i * 0.07) * 2.5 + i * 137) % 140) - 20;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: "-20%",
              width: 1,
              height: "160%",
              background: `linear-gradient(180deg, transparent, rgba(212,174,106,0.6), transparent)`,
              transform: `rotate(${-32 + i * 4}deg)`,
              transformOrigin: "top center",
              opacity: 0.5 + Math.sin(frame * 0.08 + i) * 0.4,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
