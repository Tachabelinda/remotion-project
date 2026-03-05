import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { THEME } from "./theme";

export const Scene4Logo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);
  const logoScale = interpolate(logoSpring, [0, 1], [0.7, 1]);

  const haloRadius = interpolate(frame, [5, 50], [0, 350], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const haloOpacity = interpolate(frame, [5, 30, 50, 70], [0, 0.4, 0.25, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const shimmerX = interpolate(frame, [25, 55], [-200, 500], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textY = interpolate(frame, [20, 35], [20, 0], {
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
      {/* Radial gold halo */}
      <div
        style={{
          position: "absolute",
          width: haloRadius * 2,
          height: haloRadius * 2,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${THEME.colors.gold}40 0%, transparent 70%)`,
          opacity: haloOpacity,
        }}
      />

      {/* Logo container */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Img
          src={staticFile("logo.png")}
          style={{
            width: 280,
            height: "auto",
          }}
        />

        {/* Gold shimmer sweep */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: shimmerX,
            width: 80,
            height: "100%",
            background: `linear-gradient(90deg, transparent, ${THEME.colors.gold}50, transparent)`,
            transform: "skewX(-15deg)",
          }}
        />
      </div>

      {/* Text below logo */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          textAlign: "center",
          marginTop: 60,
        }}
      >
        <div
          style={{
            fontSize: 38,
            fontFamily: THEME.fonts.ui,
            fontWeight: 500,
            color: THEME.colors.textSecondary,
            lineHeight: 1.5,
          }}
        >
          Compliant hiring infrastructure
        </div>
        <div
          style={{
            fontSize: 38,
            fontFamily: THEME.fonts.ui,
            fontWeight: 500,
            color: THEME.colors.textSecondary,
            lineHeight: 1.5,
          }}
        >
          for US & African markets.
        </div>
      </div>
    </AbsoluteFill>
  );
};
