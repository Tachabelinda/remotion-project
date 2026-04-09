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
import { FlashTransition } from "../effects/FlashTransition";
import { KineticWords } from "../effects/KineticWords";

export const Scene7Exit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = 0.82 + Math.sin(frame * 0.24) * 0.18;

  const photoSc = spring({
    frame: frame - 4,
    fps,
    config: { stiffness: 180, damping: 20 },
  });

  const handleOpacity = interpolate(frame, [6, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bodyOpacity = interpolate(frame, [40, 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const btnSc = spring({
    frame: frame - 55,
    fps,
    config: { stiffness: 300, damping: 22 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlashTransition color={COLORS.goldBright} duration={10} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 95% 75% at 50% 50%, rgba(201,168,76,${0.14 * pulse}) 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <Particles count={34} />
      <Streaks count={6} />
      <ChromaticAberration intensity={frame < 12 ? 3 : 0.8} />
      <FilmGrain opacity={0.04} />
      <ScanLines />
      <Vignette intensity={0.65} />

      <OrbitalRings
        rings={[
          { size: 520, speed: 0.25, opacity: 0.22 },
          { size: 410, speed: 0.4, opacity: 0.14 },
          { size: 296, speed: 0.65, opacity: 0.2 },
          { size: 180, speed: 1.1, opacity: 0.34, thickness: 1.2 },
        ]}
      />

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
        {/* Profile photo placeholder */}
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            padding: 6,
            marginBottom: 24,
            background: `linear-gradient(135deg, ${COLORS.goldDark}, ${COLORS.goldBright} 40%, ${COLORS.goldDark} 70%, #fff8e8 100%)`,
            boxShadow: `0 0 60px rgba(184,150,78,0.45), 0 0 120px rgba(184,150,78,0.15)`,
            transform: `scale(${photoSc})`,
            opacity: photoSc,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${COLORS.bg}, #1a1208)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 72,
                color: COLORS.gold,
                fontStyle: "italic",
              }}
            >
              T
            </div>
          </div>
        </div>

        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 20,
            letterSpacing: 8,
            color: COLORS.goldDark,
            textTransform: "uppercase",
            marginBottom: 24,
            opacity: handleOpacity,
          }}
        >
          @buildwithtacha
        </div>

        <KineticWords
          text="Claude builds."
          startDelay={10}
          stepDelay={5}
          fontSize={88}
          goldWords={["builds."]}
          style={{ justifyContent: "center" }}
        />
        <KineticWords
          text="I teach."
          startDelay={20}
          stepDelay={5}
          fontSize={88}
          goldWords={["teach."]}
          style={{ justifyContent: "center", marginTop: 6 }}
        />

        <div
          style={{
            width: 88,
            height: 4,
            background: `linear-gradient(90deg, transparent, ${COLORS.goldBright}, transparent)`,
            margin: "32px auto",
            boxShadow: `0 0 20px ${COLORS.goldGlow}`,
          }}
        />

        <div
          style={{
            fontFamily: FONTS.body,
            fontWeight: 300,
            fontSize: 34,
            color: "rgba(234,225,210,0.7)",
            lineHeight: 1.6,
            opacity: bodyOpacity,
          }}
        >
          Free starter kit in bio.
          <br />
          Daily Claude workflows.
        </div>

        {/* CTA Button */}
        <div
          style={{
            marginTop: 36,
            display: "inline-flex",
            alignItems: "center",
            border: `3px solid rgba(212,174,106,0.6)`,
            borderRadius: 60,
            padding: "20px 56px",
            background: "rgba(184,150,78,0.12)",
            transform: `scale(${btnSc})`,
            opacity: btnSc,
            boxShadow: `0 0 ${44 * btnSc}px rgba(212,174,106,${0.2 * btnSc})`,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 20,
              letterSpacing: 5,
              color: COLORS.goldBright,
              textTransform: "uppercase",
            }}
          >
            Follow @buildwithtacha
          </div>
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
        07 / 07
      </div>
    </AbsoluteFill>
  );
};
