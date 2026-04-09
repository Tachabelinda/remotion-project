import React from "react";
import { Composition } from "remotion";
import { USvsNigeriaReel } from "./USvsNigeria/USvsNigeriaReel";
import { BuildWithTachaReel } from "./BuildWithTacha/BuildWithTachaReel";
import { TOTAL_FRAMES, FPS } from "./BuildWithTacha/theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="USvsNigeriaReel"
        component={USvsNigeriaReel}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BuildWithTachaReel"
        component={BuildWithTachaReel}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
