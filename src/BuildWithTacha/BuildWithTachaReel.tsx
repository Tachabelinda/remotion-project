import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
} from "remotion";
import { COLORS, SCENE_DURATIONS } from "./theme";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2OnePrompt } from "./scenes/Scene2OnePrompt";
import { Scene3Counter } from "./scenes/Scene3Counter";
import { Scene4Skill } from "./scenes/Scene4Skill";
import { Scene5Prompt } from "./scenes/Scene5Prompt";
import { Scene6Result } from "./scenes/Scene6Result";
import { Scene7Exit } from "./scenes/Scene7Exit";

const SCENES = [
  Scene1Hook,
  Scene2OnePrompt,
  Scene3Counter,
  Scene4Skill,
  Scene5Prompt,
  Scene6Result,
  Scene7Exit,
];

export const BuildWithTachaReel: React.FC = () => {
  const frame = useCurrentFrame();

  let offset = 0;
  const crossfadeDuration = 12;

  // Global pulse for gold accent lines
  const goldPulse = 0.7 + Math.sin(frame * 0.08) * 0.3;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Top gold accent line with pulse */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 25,
        }}
      >
        <div style={{ height: 10, background: "#1A1008" }} />
        <div
          style={{
            height: 5,
            background: `linear-gradient(90deg, ${COLORS.goldDark}, ${COLORS.goldBright}, ${COLORS.goldDark})`,
            boxShadow: `0 2px 20px rgba(201,168,76,${0.3 * goldPulse})`,
          }}
        />
      </div>

      {/* Bottom gold accent line with pulse */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 25,
        }}
      >
        <div
          style={{
            height: 5,
            background: `linear-gradient(90deg, ${COLORS.goldDark}, ${COLORS.goldBright}, ${COLORS.goldDark})`,
            boxShadow: `0 -2px 20px rgba(201,168,76,${0.3 * goldPulse})`,
          }}
        />
        <div style={{ height: 10, background: "#1A1008" }} />
      </div>

      {SCENES.map((SceneComp, i) => {
        const sceneStart = offset;
        const sceneDuration = SCENE_DURATIONS[i];

        const fadeIn = interpolate(
          frame,
          [sceneStart, sceneStart + crossfadeDuration],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const fadeOut = interpolate(
          frame,
          [
            sceneStart + sceneDuration - crossfadeDuration,
            sceneStart + sceneDuration,
          ],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const sceneOpacity = Math.min(fadeIn, fadeOut);

        // Subtle zoom-in effect during each scene
        const sceneScale = interpolate(
          frame,
          [sceneStart, sceneStart + sceneDuration],
          [1.0, 1.03],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        offset += sceneDuration;

        return (
          <Sequence
            key={i}
            from={sceneStart}
            durationInFrames={sceneDuration}
          >
            <AbsoluteFill
              style={{
                opacity: sceneOpacity,
                paddingTop: 48,
                paddingBottom: 32,
                overflow: "hidden",
                transform: `scale(${sceneScale})`,
              }}
            >
              <SceneComp />
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
