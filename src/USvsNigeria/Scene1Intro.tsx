import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { THEME } from "./theme";
import { CircuitBackground } from "./CircuitBackground";
import { LetterByLetter } from "./LetterByLetter";

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const circuitOpacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.colors.background,
        opacity: bgOpacity,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircuitBackground opacity={circuitOpacity} />

      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontFamily: THEME.fonts.display,
            fontStyle: "italic",
            color: THEME.colors.text,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          <LetterByLetter
            text="Your US offer letter"
            frame={frame}
            startFrame={25}
            framesPerChar={1.5}
          />
        </div>
        <div
          style={{
            fontSize: 72,
            fontFamily: THEME.fonts.display,
            fontStyle: "italic",
            color: THEME.colors.gold,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          <LetterByLetter
            text="doesn't work in Nigeria."
            frame={frame}
            startFrame={55}
            framesPerChar={1.5}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
