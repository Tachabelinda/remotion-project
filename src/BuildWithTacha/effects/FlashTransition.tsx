import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const FlashTransition: React.FC<{
  color?: string;
  duration?: number;
  intensity?: number;
}> = ({ color = "#fff", duration = 12, intensity = 0.6 }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, duration], [intensity, 0], {
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [0, duration], [1.1, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${color}, transparent 70%)`,
        opacity,
        zIndex: 30,
        pointerEvents: "none",
        transform: `scale(${scale})`,
      }}
    />
  );
};
