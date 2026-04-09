import React from "react";
import { AbsoluteFill } from "remotion";

export const Vignette: React.FC<{ intensity?: number }> = ({
  intensity = 0.7,
}) => {
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 16,
        background: `radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(0,0,0,${intensity}) 100%)`,
      }}
    />
  );
};
