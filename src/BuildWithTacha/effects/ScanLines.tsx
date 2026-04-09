import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

export const ScanLines: React.FC<{ opacity?: number; speed?: number }> = ({
  opacity = 0.04,
  speed = 0.5,
}) => {
  const frame = useCurrentFrame();
  const offset = (frame * speed) % 4;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 19,
        opacity,
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0,0,0,0.4) 2px,
          rgba(0,0,0,0.4) 4px
        )`,
        backgroundPositionY: offset,
      }}
    />
  );
};
