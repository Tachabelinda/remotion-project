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
import { OrbitalRings } from "../effects/OrbitalRings";
import { FilmGrain } from "../effects/FilmGrain";
import { ScanLines } from "../effects/ScanLines";
import { Vignette } from "../effects/Vignette";
import { LensFlare } from "../effects/LensFlare";
import { KineticWords } from "../effects/KineticWords";
import { FlashTransition } from "../effects/FlashTransition";

const RESULTS = [
  { stat: "7", label: "Scenes" },
  { stat: "30fps", label: "Physics" },
  { stat: "9s", label: "Runtime" },
  { stat: "1", label: "Prompt" },
];

export const Scene6Result: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = 0.85 + Math.sin(frame * 0.2) * 0.1;

  const tagOpacity = interpolate(frame, [4, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lineWidth = spring({
    frame: frame - 28,
    fps,
    config: { stiffness: 300, damping: 22 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
        padding: "0 40px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,${0.08 * pulse}) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <FlashTransition duration={10} intensity={0.5} />
      <Particles count={42} />
      <Streaks count={7} />
      <ChromaticAberration intensity={frame < 14 ? 5 : 1.5} />
      <LensFlare x="50%" y="42%" delay={4} size={650} />
      <LensFlare x="30%" y="25%" delay={14} size={320} />
      <LensFlare x="75%" y="65%" delay={24} size={250} />
      <FilmGrain opacity={0.07} />
      <ScanLines opacity={0.05} speed={0.9} />
      <Vignette intensity={0.8} />

      <OrbitalRings
        rings={[
          { size: 440, speed: 0.2, opacity: 0.14 },
          { size: 330, speed: 0.38, opacity: 0.1 },
          { size: 220, speed: 0.62, opacity: 0.18 },
          { size: 128, speed: 1.0, opacity: 0.3, thickness: 1.2 },
        ]}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
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
          What Claude built
        </div>

        <KineticWords
          text="This video."
          startDelay={8}
          stepDelay={6}
          fontSize={116}
          goldWords={["video."]}
          style={{ justifyContent: "center" }}
        />

        <div
          style={{
            width: lineWidth * 96,
            height: 4,
            background: `linear-gradient(90deg, transparent, ${COLORS.goldBright}, transparent)`,
            margin: "36px auto",
            boxShadow: `0 0 20px ${COLORS.goldGlow}`,
          }}
        />

        {/* Stats grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            width: "100%",
            justifyContent: "center",
          }}
        >
          {RESULTS.map((r, i) => {
            const cardOp = interpolate(frame, [34 + i * 6, 54 + i * 6], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={i}
                style={{
                  border: "2px solid rgba(184,150,78,0.24)",
                  borderRadius: 24,
                  padding: "28px 24px",
                  background: "rgba(184,150,78,0.06)",
                  opacity: cardOp,
                  transform: `scale(${0.85 + cardOp * 0.15})`,
                  width: "45%",
                  boxShadow: `0 0 30px rgba(184,150,78,${0.08 * cardOp})`,
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.display,
                    fontWeight: 700,
                    fontSize: 64,
                    color: COLORS.goldBright,
                    lineHeight: 1,
                    textShadow: `0 0 30px rgba(212,174,106,0.3)`,
                  }}
                >
                  {r.stat}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 18,
                    letterSpacing: 3,
                    color: "rgba(234,225,210,0.45)",
                    textTransform: "uppercase",
                    marginTop: 12,
                  }}
                >
                  {r.label}
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
        06 / 07
      </div>
    </AbsoluteFill>
  );
};
