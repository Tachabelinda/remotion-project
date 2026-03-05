import React from "react";
import { Composition } from "remotion";
import { USvsNigeriaReel } from "./USvsNigeria/USvsNigeriaReel";

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
    </>
  );
};
