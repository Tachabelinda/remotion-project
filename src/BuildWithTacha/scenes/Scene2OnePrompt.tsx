import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONTS, COLORS } from "../theme";
import { Particles } from "../effects/Particles";
import { Streaks } from "../effects/Streaks";
import { ChromaticAberration } from "../effects/ChromaticAberration";
import { FilmGrain } from "../effects/FilmGrain";
import { ScanLines } from "../effects/ScanLines";
import { Vignette } from "../effects/Vignette";
import { KineticWords } from "../effects/KineticWords";

export const Scene2OnePrompt: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barH = spring({
    frame: frame - 6,
    fps,
    config: { stiffness: 220, damping: 20 },
  });

  const lineProgress = interpolate(frame, [12, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tagOpacity = interpolate(frame, [4, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bodyOpacity = interpolate(frame, [36, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bodyY = interpolate(frame, [36, 52], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const quoteOpacity = interpolate(frame, [52, 68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        padding: "0 40px 0 60px",
      }}
    >
      <Particles count={16} />
      <Streaks count={3} />
      <ChromaticAberration intensity={0.8} />
      <FilmGrain />
      <ScanLines />
      <Vignette />

      {/* Accent bar */}
      <div
        style={{
          position: "absolute",
          left: 24,
          top: 120,
          bottom: 120,
          width: 5,
          background: `linear-gradient(180deg, transparent, ${COLORS.goldBright} ${(barH * 40).toFixed(0)}%, ${COLORS.goldDark} ${Math.max(65, 100 - barH * 35).toFixed(0)}%, transparent)`,
          opacity: 0.85,
          boxShadow: `0 0 20px ${COLORS.goldGlow}`,
          borderRadius: 3,
        }}
      />

      <div style={{ position: "relative", zIndex: 10 }}>
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 20,
            letterSpacing: 6,
            color: COLORS.goldDark,
            textTransform: "uppercase",
            marginBottom: 32,
            opacity: tagOpacity,
          }}
        >
          No editing software.
        </div>

        <KineticWords
          text="One prompt."
          startDelay={8}
          stepDelay={5}
          fontSize={104}
          goldWords={["prompt."]}
        />
        <KineticWords
          text="Full video."
          startDelay={18}
          stepDelay={5}
          fontSize={104}
          goldWords={["video."]}
          style={{ marginTop: 8 }}
        />
        <KineticWords
          text="Zero tools."
          startDelay={28}
          stepDelay={5}
          fontSize={104}
          goldWords={["Zero"]}
          style={{ marginTop: 8 }}
        />

        <div
          style={{
            width: lineProgress * 92,
            height: 5,
            background: `linear-gradient(90deg, ${COLORS.goldBright}, ${COLORS.goldDark})`,
            margin: "36px 0 28px",
            boxShadow: `0 0 16px ${COLORS.goldGlow}`,
            borderRadius: 3,
          }}
        />

        <div
          style={{
            fontFamily: FONTS.body,
            fontWeight: 300,
            fontSize: 36,
            color: COLORS.text,
            lineHeight: 1.6,
            opacity: bodyOpacity,
            transform: `translateY(${bodyY}px)`,
          }}
        >
          Claude + Remotion = React
          <br />
          that renders real MP4 files.
        </div>

        <div
          style={{
            fontFamily: FONTS.display,
            fontStyle: "italic",
            fontSize: 36,
            color: COLORS.goldBright,
            marginTop: 24,
            opacity: quoteOpacity,
            textShadow: `0 0 30px rgba(212,174,106,0.3)`,
          }}
        >
          I described it. Claude built it.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: 32,
          fontFamily: FONTS.mono,
          fontSize: 18,
          letterSpacing: 4,
          color: "rgba(184,150,78,0.4)",
        }}
      >
        02 / 07
      </div>
    </AbsoluteFill>
  );
};
