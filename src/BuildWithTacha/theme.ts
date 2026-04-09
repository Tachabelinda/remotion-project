import { staticFile } from "remotion";
import { continueRender, delayRender } from "remotion";

const loadLocalFont = (family: string, src: string, weight: string, style: string) => {
  if (typeof FontFace !== "undefined") {
    const handle = delayRender(`Loading font ${family} ${weight} ${style}`);
    const font = new FontFace(family, `url('${src}')`, {
      weight,
      style,
    });
    font
      .load()
      .then(() => {
        document.fonts.add(font);
        continueRender(handle);
      })
      .catch(() => continueRender(handle));
  }
};

loadLocalFont("Playfair Display", staticFile("fonts/PlayfairDisplay-Italic.woff2"), "400", "italic");
loadLocalFont("Playfair Display", staticFile("fonts/PlayfairDisplay-Bold.woff2"), "700", "normal");
loadLocalFont("Playfair Display", staticFile("fonts/PlayfairDisplay-BoldItalic.woff2"), "700", "italic");
loadLocalFont("DM Sans", staticFile("fonts/DMSans-Light.woff2"), "300", "normal");
loadLocalFont("DM Sans", staticFile("fonts/DMSans-Regular.woff2"), "400", "normal");
loadLocalFont("DM Mono", staticFile("fonts/DMMono-Regular.woff2"), "400", "normal");

export const FONTS = {
  display: "'Playfair Display', Georgia, 'Times New Roman', serif",
  body: "'DM Sans', 'Helvetica Neue', Arial, sans-serif",
  mono: "'DM Mono', 'Courier New', monospace",
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
  Math.round(3.5 * FPS),
  Math.round(3.8 * FPS),
  Math.round(4.2 * FPS),
  Math.round(3.5 * FPS),
  Math.round(3.5 * FPS),
  Math.round(3.8 * FPS),
  Math.round(3.5 * FPS),
] as const;

export const TOTAL_FRAMES = SCENE_DURATIONS.reduce((a, b) => a + b, 0);
