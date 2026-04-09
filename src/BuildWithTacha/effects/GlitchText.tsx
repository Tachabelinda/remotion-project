import React from "react";
import { useCurrentFrame } from "remotion";

interface GlitchTextProps {
  text: string;
  active?: boolean;
  style?: React.CSSProperties;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  active = false,
  style,
}) => {
  const frame = useCurrentFrame();

  const g1 = active && Math.sin(frame * 8.8) > 0.72;
  const g2 = active && Math.sin(frame * 13.4) > 0.87;
  const g3 = active && Math.sin(frame * 6.2) > 0.9;

  const sx = (Math.sin(frame * 17.3) - 0.5) * 10;
  const sy = (Math.cos(frame * 11.7) - 0.5) * 4;

  return (
    <div style={{ position: "relative", display: "inline-block", ...style }}>
      {g1 && (
        <div
          style={{
            ...style,
            position: "absolute",
            inset: 0,
            color: "#C9A84C",
            transform: `translate(${sx}px, ${sy}px)`,
            opacity: 0.7,
            clipPath: `inset(${Math.abs(Math.sin(frame * 3.1)) * 60}% 0 ${Math.abs(Math.cos(frame * 2.7)) * 20}% 0)`,
          }}
        >
          {text}
        </div>
      )}
      {g2 && (
        <div
          style={{
            ...style,
            position: "absolute",
            inset: 0,
            color: "#fff",
            transform: `translate(${-sx * 0.6}px, ${-sy}px)`,
            opacity: 0.45,
            clipPath: `inset(${Math.abs(Math.cos(frame * 4.1)) * 20}% 0 ${Math.abs(Math.sin(frame * 5.3)) * 60}% 0)`,
          }}
        >
          {text}
        </div>
      )}
      {g3 && (
        <div
          style={{
            ...style,
            position: "absolute",
            inset: 0,
            color: "#0CF",
            transform: `translate(${sx * 0.3}px, ${-sy * 0.5}px)`,
            opacity: 0.25,
            clipPath: `inset(${Math.abs(Math.sin(frame * 7.7)) * 40}% 0 ${Math.abs(Math.cos(frame * 3.9)) * 40}% 0)`,
          }}
        >
          {text}
        </div>
      )}
      <span style={{ position: "relative" }}>{text}</span>
    </div>
  );
};
