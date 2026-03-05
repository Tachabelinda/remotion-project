import {
  cormorantItalicFamily,
  poppinsFamily,
} from "./fonts";

export const THEME = {
  colors: {
    background: "#020113",
    gold: "#C8960C",
    blue: "#0C8CFF",
    text: "#FAF8F3",
    textSecondary: "#DCDAD7",
    red: "#E53935",
  },
  fonts: {
    display: cormorantItalicFamily,
    ui: poppinsFamily,
  },
} as const;

export const SCENE_TIMING = {
  scene1: { start: 0, end: 90 },
  scene2: { start: 90, end: 210 },
  scene3: { start: 210, end: 300 },
  scene4: { start: 300, end: 390 },
  scene5: { start: 390, end: 450 },
} as const;
