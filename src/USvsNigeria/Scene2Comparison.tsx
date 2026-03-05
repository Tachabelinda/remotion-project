import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { THEME } from "./theme";
import { CircuitBackground } from "./CircuitBackground";

interface BulletItemProps {
  text: string;
  index: number;
  frame: number;
  fps: number;
  startDelay: number;
}

const BulletItem: React.FC<BulletItemProps> = ({
  text,
  index,
  frame,
  fps,
  startDelay,
}) => {
  const itemDelay = startDelay + index * 12;

  const slideIn = spring({
    frame: frame - itemDelay,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const translateX = interpolate(slideIn, [0, 1], [60, 0]);
  const opacity = interpolate(slideIn, [0, 1], [0, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px)`,
        fontSize: 32,
        fontFamily: THEME.fonts.ui,
        fontWeight: 300,
        color: THEME.colors.text,
        marginBottom: 24,
        lineHeight: 1.4,
        paddingLeft: 20,
        borderLeft: `3px solid ${THEME.colors.textSecondary}40`,
      }}
    >
      {text}
    </div>
  );
};

const US_BULLETS = [
  "At-will employment",
  "Offer letter non-binding",
  "No mandatory probation",
  "2 weeks notice typical",
];

const NIGERIA_BULLETS = [
  "Contract-based by default",
  "Offer letter IS the contract",
  "Probation must be defined",
  "1-3 months notice required",
];

export const Scene2Comparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const headerOpacity = interpolate(headerSpring, [0, 1], [0, 1]);
  const headerScale = interpolate(headerSpring, [0, 1], [0.8, 1]);

  const dividerHeight = interpolate(frame, [5, 25], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.colors.background,
        padding: "120px 60px",
      }}
    >
      <CircuitBackground opacity={0.15} />

      <div
        style={{
          position: "absolute",
          top: 120,
          left: 60,
          right: 60,
          bottom: 120,
          display: "flex",
          flexDirection: "row",
          zIndex: 1,
        }}
      >
        {/* Left: US */}
        <div style={{ flex: 1, paddingRight: 40 }}>
          <div
            style={{
              opacity: headerOpacity,
              transform: `scale(${headerScale})`,
              fontSize: 40,
              fontFamily: THEME.fonts.ui,
              fontWeight: 700,
              color: THEME.colors.gold,
              letterSpacing: 4,
              marginBottom: 60,
              textAlign: "center",
            }}
          >
            UNITED STATES
          </div>
          {US_BULLETS.map((text, i) => (
            <BulletItem
              key={text}
              text={text}
              index={i}
              frame={frame}
              fps={fps}
              startDelay={15}
            />
          ))}
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: 3,
            alignSelf: "center",
            height: `${dividerHeight}%`,
            backgroundColor: THEME.colors.gold,
            borderRadius: 2,
            boxShadow: `0 0 20px ${THEME.colors.gold}60`,
          }}
        />

        {/* Right: Nigeria */}
        <div style={{ flex: 1, paddingLeft: 40 }}>
          <div
            style={{
              opacity: headerOpacity,
              transform: `scale(${headerScale})`,
              fontSize: 40,
              fontFamily: THEME.fonts.ui,
              fontWeight: 700,
              color: THEME.colors.blue,
              letterSpacing: 4,
              marginBottom: 60,
              textAlign: "center",
            }}
          >
            NIGERIA
          </div>
          {NIGERIA_BULLETS.map((text, i) => (
            <BulletItem
              key={text}
              text={text}
              index={i}
              frame={frame}
              fps={fps}
              startDelay={20}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
