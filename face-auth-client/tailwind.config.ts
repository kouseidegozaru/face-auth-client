import { error } from "console";
import { title } from "process";
import type { Config } from "tailwindcss";

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(244, 244, 244)",
        foreground: "rgb(255, 255, 255)",
        foreground_hover: "rgb(245, 245, 245)",
        text : "rgb(25, 25, 25)",
        subtext : "rgb(136, 136, 136)",
        line : "rgb(209, 217, 224)",
        primary1 : "rgb(9, 105, 218)",
        primary1_hover : "rgb(6, 80, 190)",
        primary2 : "rgb(227, 148, 0)",
        primary2_hover : "rgb(217, 133, 0)",
        apply : "rgb(31, 136, 61)",
        apply_hover : "rgb(27, 120, 52)",
        cancel : "rgb(209, 36, 47)",
        cancel_hover : "rgb(199, 32, 43)",
        error : "rgb(209, 36, 47)",
        header : "rgb(24, 150, 159)",
      },
      fontFamily: {
        title: ["TiltWarp", ...defaultTheme.fontFamily.sans],
        default: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
