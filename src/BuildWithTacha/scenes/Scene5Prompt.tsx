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
import { ChromaticAberration } from "../effects/ChromaticAberration";
import { FilmGrain } from "../effects/FilmGrain";
import { ScanLines } from "../effects/ScanLines";
import { Vignette } from "../effects/Vignette";
import { KineticWords } from "../effects/KineticWords";
import { AudioWaveform } from "../effects/AudioWaveform";

export const Scene5Prompt: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barSc = spring({
    frame: frame - 5,
    fps,
    config: { stiffness: 380, damping: 22 },
  });

  const waveOpacity = interpolate(frame, [20, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bodyOpacity = interpolate(frame, [36, 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bodyY = interpolate(frame, [36, 58], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tagOpacity = interpolate(frame, [68, 82], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tagLineOpacity = interpolate(frame, [4, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        padding: "0 40px 0 48px",
      }}
    >
      <Particles count={14} />
      <ChromaticAberration intensity={0.5} />
      <FilmGrain />
      <ScanLines />
      <Vignette />

      <div style={{ position: "relative", zIndex: 10 }}>
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 20,
            letterSpacing: 6,
            color: COLORS.goldDark,
            textTransform: "uppercase",
            marginBottom: 32,
            opacity: tagLineOpacity,
          }}
        >
          The exact prompt I used
        </div>

        {/* Quote block */}
        <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
          <div
            style={{
              width: Math.min(6, barSc * 6),
              minWidth: barSc * 6,
              background: `linear-gradient(180deg, ${COLORS.goldBright}, ${COLORS.goldDark}, ${COLORS.gold})`,
              alignSelf: "stretch",
              flexShrink: 0,
              borderRadius: 4,
              boxShadow: `0 0 20px ${COLORS.goldGlow}`,
            }}
          />
          <div>
            <KineticWords
              text={"\u201CBuild me a 15-second branded intro video."}
              startDelay={14}
              stepDelay={3}
              fontSize={42}
              goldWords={["branded", "intro", "video."]}
              style={{ lineHeight: 1.65, fontStyle: "italic" }}
            />
            <KineticWords
              text={"Dark background. Gold text. Spring physics.\u201D"}
              startDelay={28}
              stepDelay={3}
              fontSize={42}
              goldWords={["Gold", "Spring"]}
              style={{ lineHeight: 1.65, fontStyle: "italic", marginTop: 6 }}
            />
          </div>
        </div>

        {/* Waveform */}
        <div style={{ margin: "32px 0", opacity: waveOpacity }}>
          <AudioWaveform bars={28} width={560} height={64} />
        </div>

        <div
          style={{
            fontFamily: FONTS.body,
            fontWeight: 300,
            fontSize: 36,
            color: "rgba(234,225,210,0.68)",
            lineHeight: 1.6,
            opacity: bodyOpacity,
            transform: `translateY(${bodyY}px)`,
          }}
        >
          That was the full prompt.
          <br />
          Claude returned a complete
          <br />
          React video component.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginTop: 36,
            opacity: tagOpacity,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              border: `3px solid ${COLORS.goldBright}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 16px ${COLORS.goldGlow}`,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: COLORS.goldBright,
              }}
            />
          </div>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 20,
              letterSpacing: 4,
              color: "rgba(184,150,78,0.72)",
            }}
          >
            Rendered in 90 seconds flat
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
        05 / 07
      </div>
    </AbsoluteFill>
  );
};
