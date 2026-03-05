import React from "react";
import { interpolate } from "remotion";

interface LetterByLetterProps {
  text: string;
  frame: number;
  startFrame: number;
  framesPerChar?: number;
  style?: React.CSSProperties;
}

export const LetterByLetter: React.FC<LetterByLetterProps> = ({
  text,
  frame,
  startFrame,
  framesPerChar = 2,
  style,
}) => {
  return (
    <span style={{ ...style, display: "inline" }}>
      {text.split("").map((char, i) => {
        const charStart = startFrame + i * framesPerChar;
        const charOpacity = interpolate(
          frame,
          [charStart, charStart + framesPerChar],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <span
            key={`${i}-${char}`}
            style={{ opacity: charOpacity, display: "inline" }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};
