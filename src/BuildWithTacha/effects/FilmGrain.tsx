import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

export const FilmGrain: React.FC<{ opacity?: number }> = ({
  opacity = 0.06,
}) => {
  const frame = useCurrentFrame();

  const seed = frame % 4;

  const gradients = useMemo(() => {
    return [0, 1, 2, 3].map((s) => {
      const angle = s * 90 + 23;
      return `repeating-conic-gradient(from ${angle}deg, rgba(255,255,255,0.03) 0%, transparent 0.5%, transparent 1%)`;
    });
  }, []);

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 20,
        opacity,
        mixBlendMode: "overlay",
        backgroundImage: gradients[seed],
        backgroundSize: "4px 4px",
      }}
    />
  );
};
