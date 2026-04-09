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

const SKILL_ITEMS = [
  { label: "Skill", value: "Remotion Video Generation" },
  { label: "Stack", value: "Claude + React + ffmpeg" },
  { label: "Input", value: "Plain English prompt" },
  { label: "Output", value: "Rendered MP4 video file" },
];

export const Scene4Skill: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barH = spring({
    frame: frame - 5,
    fps,
    config: { stiffness: 200, damping: 20 },
  });

  const tagOpacity = interpolate(frame, [4, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lineWidth = spring({
    frame: frame - 26,
    fps,
    config: { stiffness: 300, damping: 22 },
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
      <ChromaticAberration intensity={0.7} />
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
            marginBottom: 28,
            opacity: tagOpacity,
          }}
        >
          The Claude skill you need
        </div>

        <KineticWords
          text="Video generation"
          startDelay={8}
          stepDelay={5}
          fontSize={108}
          goldWords={["generation"]}
        />
        <KineticWords
          text="from a prompt."
          startDelay={18}
          stepDelay={5}
          fontSize={108}
          goldWords={["prompt."]}
          style={{ marginTop: 8 }}
        />

        <div
          style={{
            width: lineWidth * 92,
            height: 5,
            background: `linear-gradient(90deg, ${COLORS.goldBright}, ${COLORS.goldDark})`,
            margin: "32px 0 28px",
            boxShadow: `0 0 16px ${COLORS.goldGlow}`,
            borderRadius: 3,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {SKILL_ITEMS.map((item, i) => {
            const op = interpolate(frame, [30 + i * 8, 50 + i * 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const tx = interpolate(frame, [30 + i * 8, 50 + i * 8], [-16, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 24,
                  opacity: op,
                  transform: `translateX(${tx}px)`,
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 20,
                    letterSpacing: 4,
                    color: COLORS.goldDark,
                    textTransform: "uppercase",
                    width: 92,
                    flexShrink: 0,
                    paddingTop: 6,
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    width: 2,
                    background: "rgba(184,150,78,0.3)",
                    alignSelf: "stretch",
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontWeight: 300,
                    fontSize: 34,
                    color: COLORS.text,
                    lineHeight: 1.35,
                  }}
                >
                  {item.value}
                </div>
              </div>
            );
          })}
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
        04 / 07
      </div>
    </AbsoluteFill>
  );
};
