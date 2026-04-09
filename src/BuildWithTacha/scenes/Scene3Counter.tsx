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

const ITEMS = [
  "30 days of content",
  "5 hooks per piece",
  "3 platform variants",
  "1 Sunday afternoon",
];

export const Scene3Counter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const count = Math.floor(
    interpolate(frame, [8, 62], [0, 30], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const numSc = spring({
    frame: frame - 6,
    fps,
    config: { stiffness: 130, damping: 16 },
  });

  const pulse = 0.88 + Math.sin(frame * 0.2) * 0.09;

  const labelOpacity = interpolate(frame, [28, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subOpacity = interpolate(frame, [38, 54], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dividerOpacity = interpolate(frame, [52, 66], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const listOpacity = interpolate(frame, [56, 74], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const listY = interpolate(frame, [56, 74], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 85% 65% at 50% 42%, rgba(201,168,76,${0.1 * pulse}) 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <Particles count={30} />
      <Streaks count={5} />
      <ChromaticAberration intensity={0.6} />
      <LensFlare x="50%" y="38%" delay={4} size={600} />
      <FilmGrain />
      <ScanLines />
      <Vignette />

      <OrbitalRings
        rings={[
          { size: 500, speed: 0.2, opacity: 0.14 },
          { size: 392, speed: 0.35, opacity: 0.1 },
          { size: 276, speed: 0.6, opacity: 0.18 },
          { size: 168, speed: 1, opacity: 0.3, thickness: 1.2 },
        ]}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Big counter */}
        <div
          style={{
            fontFamily: FONTS.display,
            fontWeight: 700,
            fontSize: 216,
            color: "#fff",
            lineHeight: 0.9,
            letterSpacing: -12,
            transform: `scale(${0.5 + numSc * 0.5})`,
            opacity: Math.min(1, numSc * 1.2),
            textShadow: `0 0 80px rgba(212,174,106,${0.35 * numSc})`,
          }}
        >
          {count}
        </div>

        <div
          style={{
            fontFamily: FONTS.display,
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: 56,
            color: COLORS.gold,
            marginTop: 16,
            opacity: labelOpacity,
            textShadow: `0 0 40px rgba(201,168,76,0.3)`,
          }}
        >
          days of content
        </div>

        <div
          style={{
            fontFamily: FONTS.body,
            fontWeight: 300,
            fontSize: 34,
            color: COLORS.textDim,
            marginTop: 12,
            opacity: subOpacity,
          }}
        >
          created in one session.
        </div>

        <div
          style={{
            width: 88,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${COLORS.goldDark}, transparent)`,
            margin: "36px 0 28px",
            opacity: dividerOpacity,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            opacity: listOpacity,
            transform: `translateY(${listY}px)`,
          }}
        >
          {ITEMS.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: COLORS.goldBright,
                  flexShrink: 0,
                  boxShadow: `0 0 12px ${COLORS.goldBright}`,
                }}
              />
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontWeight: 300,
                  fontSize: 34,
                  color: COLORS.text,
                }}
              >
                {item}
              </div>
            </div>
          ))}
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
        03 / 07
      </div>
    </AbsoluteFill>
  );
};
