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

export const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ctaSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const ctaOpacity = interpolate(ctaSpring, [0, 1], [0, 1]);
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.85, 1]);

  const buttonSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 90 },
  });

  const buttonOpacity = interpolate(buttonSpring, [0, 1], [0, 1]);
  const buttonScale = interpolate(buttonSpring, [0, 1], [0.9, 1]);

  // Fade everything to black by end of scene (frame 60 = absolute frame 450)
  const fadeOut = interpolate(frame, [40, 58], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.colors.background,
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      {/* Logo (smaller, persistent from scene 4) */}
      <Img
        src={staticFile("logo.png")}
        style={{
          width: 200,
          height: "auto",
          marginBottom: 50,
          opacity: 0.9,
        }}
      />

      {/* CTA text */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
          fontSize: 56,
          fontFamily: THEME.fonts.display,
          fontStyle: "italic",
          color: THEME.colors.gold,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        Join the Beta
      </div>

      {/* Button */}
      <div
        style={{
          opacity: buttonOpacity,
          transform: `scale(${buttonScale})`,
          border: `2px solid ${THEME.colors.gold}`,
          borderRadius: 50,
          padding: "18px 60px",
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontFamily: THEME.fonts.ui,
            fontWeight: 500,
            color: THEME.colors.gold,
            letterSpacing: 1,
          }}
        >
          softhireapp.com
        </div>
      </div>
    </AbsoluteFill>
  );
};
