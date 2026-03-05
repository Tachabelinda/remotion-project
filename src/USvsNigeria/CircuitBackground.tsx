import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { THEME } from "./theme";

interface CircuitLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}

const CIRCUIT_LINES: CircuitLine[] = [
  { x1: 80, y1: 200, x2: 400, y2: 200, delay: 0 },
  { x1: 400, y1: 200, x2: 400, y2: 600, delay: 5 },
  { x1: 400, y1: 600, x2: 750, y2: 600, delay: 10 },
  { x1: 750, y1: 600, x2: 750, y2: 300, delay: 15 },
  { x1: 750, y1: 300, x2: 1000, y2: 300, delay: 20 },
  { x1: 200, y1: 900, x2: 200, y2: 1300, delay: 3 },
  { x1: 200, y1: 1300, x2: 600, y2: 1300, delay: 8 },
  { x1: 600, y1: 1300, x2: 600, y2: 1000, delay: 13 },
  { x1: 600, y1: 1000, x2: 900, y2: 1000, delay: 18 },
  { x1: 900, y1: 1000, x2: 900, y2: 1500, delay: 23 },
  { x1: 100, y1: 1600, x2: 500, y2: 1600, delay: 6 },
  { x1: 500, y1: 1600, x2: 500, y2: 1800, delay: 11 },
  { x1: 300, y1: 400, x2: 300, y2: 800, delay: 9 },
  { x1: 800, y1: 100, x2: 800, y2: 500, delay: 4 },
  { x1: 800, y1: 500, x2: 1050, y2: 500, delay: 12 },
];

const NODE_POSITIONS = [
  { x: 400, y: 200 },
  { x: 400, y: 600 },
  { x: 750, y: 600 },
  { x: 750, y: 300 },
  { x: 200, y: 1300 },
  { x: 600, y: 1300 },
  { x: 600, y: 1000 },
  { x: 900, y: 1000 },
  { x: 500, y: 1600 },
  { x: 300, y: 800 },
  { x: 800, y: 500 },
];

export const CircuitBackground: React.FC<{ opacity?: number }> = ({
  opacity = 1,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {CIRCUIT_LINES.map((line, i) => {
          const lineLength = Math.sqrt(
            (line.x2 - line.x1) ** 2 + (line.y2 - line.y1) ** 2
          );
          const drawProgress = interpolate(
            frame,
            [line.delay, line.delay + 30],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <line
              key={`line-${i}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x1 + (line.x2 - line.x1) * drawProgress}
              y2={line.y1 + (line.y2 - line.y1) * drawProgress}
              stroke={THEME.colors.blue}
              strokeWidth={1.5}
              strokeOpacity={0.3}
              strokeDasharray={`${lineLength}`}
              strokeDashoffset={lineLength * (1 - drawProgress)}
            />
          );
        })}

        {NODE_POSITIONS.map((node, i) => {
          const pulsePhase = (frame * 0.05 + i * 0.7) % (Math.PI * 2);
          const pulseScale = 0.6 + Math.sin(pulsePhase) * 0.4;
          const nodeOpacity = interpolate(
            frame,
            [10 + i * 3, 20 + i * 3],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <g key={`node-${i}`} opacity={nodeOpacity}>
              <circle
                cx={node.x}
                cy={node.y}
                r={8 * pulseScale}
                fill={THEME.colors.gold}
                fillOpacity={0.15 * pulseScale}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={3}
                fill={THEME.colors.gold}
                fillOpacity={0.6 + 0.4 * pulseScale}
              />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
