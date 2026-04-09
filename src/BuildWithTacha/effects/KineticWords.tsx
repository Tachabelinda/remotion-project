import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS, COLORS } from "../theme";

interface KineticWordsProps {
  text: string;
  startDelay?: number;
  stepDelay?: number;
  fontSize?: number;
  goldWords?: string[];
  style?: React.CSSProperties;
}

export const KineticWords: React.FC<KineticWordsProps> = ({
  text,
  startDelay = 0,
  stepDelay = 4,
  fontSize = 84,
  goldWords = [],
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: `0 ${fontSize * 0.22}px`,
        lineHeight: 1.0,
        ...style,
      }}
    >
      {words.map((word, i) => {
        const sc = spring({
          frame: frame - startDelay - i * stepDelay,
          fps,
          config: { stiffness: 340, damping: 24 },
        });

        const isGold = goldWords.some(
          (g) =>
            word.replace(/[.,!?"]/g, "").toLowerCase() ===
            g.replace(/[.,!?"]/g, "").toLowerCase()
        );

        const blur = sc < 0.5 ? `blur(${(1 - sc * 2) * 4}px)` : "none";

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: `translateY(${(1 - sc) * 50}px) scale(${0.7 + sc * 0.3})`,
              opacity: Math.min(1, sc * 2.2),
              fontFamily: FONTS.display,
              fontSize,
              fontWeight: 700,
              fontStyle: isGold ? "italic" : "normal",
              color: isGold ? COLORS.gold : "#fff",
              filter: blur,
              textShadow: isGold
                ? `0 0 40px rgba(201,168,76,${sc * 0.5})`
                : `0 0 20px rgba(255,255,255,${sc * 0.15})`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
