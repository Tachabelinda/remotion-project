import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const FlashTransition: React.FC<{
  color?: string;
  duration?: number;
}> = ({ color = "#fff", duration = 8 }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, duration], [0.4, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: color,
        opacity,
        zIndex: 30,
        pointerEvents: "none",
      }}
    />
  );
};
