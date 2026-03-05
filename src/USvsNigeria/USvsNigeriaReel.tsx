import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { THEME, SCENE_TIMING } from "./theme";
import { Scene1Intro } from "./Scene1Intro";
import { Scene2Comparison } from "./Scene2Comparison";
import { Scene3Warning } from "./Scene3Warning";
import { Scene4Logo } from "./Scene4Logo";
import { Scene5CTA } from "./Scene5CTA";

export const USvsNigeriaReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: THEME.colors.background }}>
      <Sequence
        from={SCENE_TIMING.scene1.start}
        durationInFrames={SCENE_TIMING.scene1.end - SCENE_TIMING.scene1.start}
      >
        <Scene1Intro />
      </Sequence>

      <Sequence
        from={SCENE_TIMING.scene2.start}
        durationInFrames={SCENE_TIMING.scene2.end - SCENE_TIMING.scene2.start}
      >
        <Scene2Comparison />
      </Sequence>

      <Sequence
        from={SCENE_TIMING.scene3.start}
        durationInFrames={SCENE_TIMING.scene3.end - SCENE_TIMING.scene3.start}
      >
        <Scene3Warning />
      </Sequence>

      <Sequence
        from={SCENE_TIMING.scene4.start}
        durationInFrames={SCENE_TIMING.scene4.end - SCENE_TIMING.scene4.start}
      >
        <Scene4Logo />
      </Sequence>

      <Sequence
        from={SCENE_TIMING.scene5.start}
        durationInFrames={SCENE_TIMING.scene5.end - SCENE_TIMING.scene5.start}
      >
        <Scene5CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
