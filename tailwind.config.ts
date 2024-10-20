import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    cursor: {
      black: "url('/icons/cursor-black.svg'), default",
      white: "url('/icons/cursor-white.svg'), default",
      notion: "url('/icons/cursor-notion.svg'), default",
    },
    extend: {
      fontFamily: {
        serif: ["var(--font-baskerville)"],
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
