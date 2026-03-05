import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { THEME } from "./theme";

export const Scene3Warning: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const opacity = interpolate(fadeIn, [0, 1], [0, 1]);
  const scale = interpolate(fadeIn, [0, 1], [0.9, 1]);

  const pulsePhase = Math.sin(frame * 0.12) * 0.15;
  const pulseOpacity = 1 + pulsePhase;

  const subtitleOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontSize: 58,
            fontFamily: THEME.fonts.display,
            fontStyle: "italic",
            fontWeight: 700,
            color: THEME.colors.red,
            opacity: pulseOpacity,
            lineHeight: 1.3,
            marginBottom: 50,
          }}
        >
          Same offer letter = compliance risk
        </div>

        <div
          style={{
            opacity: subtitleOpacity,
            fontSize: 34,
            fontFamily: THEME.fonts.ui,
            fontWeight: 300,
            color: THEME.colors.text,
            lineHeight: 1.5,
          }}
        >
          One wrong clause. One expensive dispute.
        </div>
      </div>
    </AbsoluteFill>
  );
};
