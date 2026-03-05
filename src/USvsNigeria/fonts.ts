import { loadFont as loadCormorant } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";

// Load both normal and italic variants for Cormorant Garamond
loadCormorant("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

const { fontFamily: cormorantFamily } = loadCormorant("italic", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

// Cormorant Garamond family name (italic is set via CSS fontStyle)
export const cormorantItalicFamily = cormorantFamily;

export const { fontFamily: poppinsFamily } = loadPoppins("normal", {
  weights: ["300", "500", "700"],
  subsets: ["latin"],
});
