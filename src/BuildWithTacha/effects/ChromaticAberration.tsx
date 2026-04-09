import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

export const ChromaticAberration: React.FC<{ intensity?: number }> = ({
  intensity = 1,
}) => {
  const frame = useCurrentFrame();
  const shift = intensity * (1.2 + Math.sin(frame * 0.3) * 0.4);

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 18, opacity: 0.09 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, rgba(255,0,80,0.12), transparent 40%)",
          transform: `translateX(${shift}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(285deg, rgba(0,200,255,0.12), transparent 40%)",
          transform: `translateX(${-shift}px)`,
        }}
      />
    </AbsoluteFill>
  );
};
