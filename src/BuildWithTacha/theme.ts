import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";
import { loadFont as loadDMMono } from "@remotion/google-fonts/DMMono";

loadPlayfair("normal", { weights: ["700"], subsets: ["latin"] });
const { fontFamily: playfairItalicFamily } = loadPlayfair("italic", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

const { fontFamily: dmSansFamily } = loadDMSans("normal", {
  weights: ["300", "400"],
  subsets: ["latin"],
});

const { fontFamily: dmMonoFamily } = loadDMMono("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

export const FONTS = {
  display: playfairItalicFamily,
  body: dmSansFamily,
  mono: dmMonoFamily,
} as const;

export const COLORS = {
  bg: "#0E0804",
  gold: "#C9A84C",
  goldBright: "#D4AE6A",
  goldDark: "#B8964E",
  text: "rgba(234,225,210,0.88)",
  textDim: "rgba(234,225,210,0.58)",
  textFaint: "rgba(234,225,210,0.35)",
  goldFaint: "rgba(184,150,78,0.5)",
  goldGlow: "rgba(212,174,106,0.4)",
  red: "#FF3B30",
  cyan: "rgba(0,200,255,0.12)",
  magenta: "rgba(255,0,80,0.12)",
} as const;

export const FPS = 30;

export const SCENE_DURATIONS = [
  Math.round(3.5 * FPS),  // Scene 1: Hook
  Math.round(3.8 * FPS),  // Scene 2: One Prompt
  Math.round(4.2 * FPS),  // Scene 3: Counter
  Math.round(3.5 * FPS),  // Scene 4: Skill
  Math.round(3.5 * FPS),  // Scene 5: Prompt
  Math.round(3.8 * FPS),  // Scene 6: Result
  Math.round(3.5 * FPS),  // Scene 7: Exit
] as const;

export const TOTAL_FRAMES = SCENE_DURATIONS.reduce((a, b) => a + b, 0);
