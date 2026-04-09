import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";

export const LensFlare: React.FC<{
  x?: string;
  y?: string;
  delay?: number;
  size?: number;
}> = ({ x = "50%", y = "40%", delay = 0, size = 400 }) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulse = 0.7 + Math.sin(frame * 0.15) * 0.3;
  const flareSize = size * progress * pulse;

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 5 }}>
      {/* Main flare */}
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: flareSize,
          height: flareSize,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.goldBright}25 0%, ${COLORS.gold}10 30%, transparent 70%)`,
          opacity: progress * 0.8,
        }}
      />
      {/* Horizontal streak */}
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: flareSize * 2.5,
          height: 2,
          transform: "translate(-50%, -50%)",
          background: `linear-gradient(90deg, transparent, ${COLORS.goldBright}40, transparent)`,
          opacity: progress * 0.6,
          filter: "blur(1px)",
        }}
      />
      {/* Secondary ring */}
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: flareSize * 0.4,
          height: flareSize * 0.4,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: `1px solid ${COLORS.gold}30`,
          opacity: progress * 0.4,
        }}
      />
    </AbsoluteFill>
  );
};
