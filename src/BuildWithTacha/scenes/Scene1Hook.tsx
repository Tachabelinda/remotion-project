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
import { GlitchText } from "../effects/GlitchText";
import { FilmGrain } from "../effects/FilmGrain";
import { ScanLines } from "../effects/ScanLines";
import { LensFlare } from "../effects/LensFlare";
import { Vignette } from "../effects/Vignette";
import { FlashTransition } from "../effects/FlashTransition";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ringSc = spring({
    frame: frame - 4,
    fps,
    config: { stiffness: 55, damping: 200 },
  });

  const pulse = 0.9 + Math.sin(frame * 0.18) * 0.1;

  const subtitleOpacity = interpolate(frame, [38, 56], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [38, 56], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tagOpacity = interpolate(frame, [10, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const footerOpacity = interpolate(frame, [28, 42], [0, 1], {
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
      <FlashTransition />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,${0.08 * pulse}) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <Particles count={26} />
      <Streaks count={5} />
      <ChromaticAberration intensity={frame < 20 ? 3 : 1} />
      <LensFlare x="50%" y="45%" delay={6} size={500} />
      <FilmGrain opacity={0.05} />
      <ScanLines opacity={0.03} />
      <Vignette intensity={0.75} />

      <OrbitalRings />

      {/* Diamond */}
      <div
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          border: "1px solid rgba(212,174,106,0.28)",
          transform: `rotate(${45 + frame * 0.6}deg) scale(${ringSc})`,
          opacity: ringSc,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 20,
            letterSpacing: 8,
            color: COLORS.goldDark,
            textTransform: "uppercase",
            marginBottom: 28,
            opacity: tagOpacity,
          }}
        >
          Build With Tacha
        </div>

        <GlitchText
          text="Claude"
          active={frame > 12 && frame < 72}
          style={{
            fontFamily: FONTS.display,
            fontSize: 116,
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1,
            letterSpacing: -2,
            display: "block",
            textShadow: "0 0 60px rgba(255,255,255,0.2)",
          }}
        />
        <GlitchText
          text="makes videos."
          active={frame > 18 && frame < 72}
          style={{
            fontFamily: FONTS.display,
            fontSize: 116,
            fontWeight: 700,
            fontStyle: "italic",
            color: COLORS.gold,
            lineHeight: 1.1,
            letterSpacing: -2,
            display: "block",
            textShadow: `0 0 80px rgba(201,168,76,0.4)`,
          }}
        />

        <div
          style={{
            height: 4,
            width: 100,
            background: `linear-gradient(90deg, ${COLORS.goldDark}, ${COLORS.goldBright})`,
            margin: "40px 0 32px",
            boxShadow: `0 0 16px ${COLORS.goldGlow}`,
          }}
        />

        <div
          style={{
            fontFamily: FONTS.body,
            fontWeight: 300,
            fontSize: 40,
            color: "rgba(234,225,210,0.65)",
            textAlign: "center",
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          I built this with one prompt.
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          padding: "0 32px",
          opacity: footerOpacity,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 18,
            letterSpacing: 4,
            color: COLORS.goldFaint,
          }}
        >
          @BUILDWITHTACHA
        </div>
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 18,
            letterSpacing: 4,
            color: "rgba(184,150,78,0.4)",
          }}
        >
          01 / 07
        </div>
      </div>
    </AbsoluteFill>
  );
};
