import React from "react";
import { useCurrentFrame } from "remotion";

export const AudioWaveform: React.FC<{
  bars?: number;
  width?: number;
  height?: number;
}> = ({ bars = 28, width = 560, height = 64 }) => {
  const frame = useCurrentFrame();

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {Array.from({ length: bars }, (_, i) => {
        const h =
          8 +
          Math.abs(Math.sin(i * 0.65 + frame * 0.08)) * 36 +
          Math.abs(Math.sin(i * 1.4 + frame * 0.04)) * 16;
        const barWidth = (width / bars) * 0.65;
        const gap = width / bars;
        return (
          <rect
            key={i}
            x={i * gap + 1}
            y={(height - h) / 2}
            width={barWidth}
            height={h}
            rx={barWidth / 2}
            fill={i < bars / 2 ? "#D4AE6A" : "#B8964E"}
            fillOpacity={0.45 + Math.sin(i * 0.55 + frame * 0.1) * 0.35}
          />
        );
      })}
    </svg>
  );
};
