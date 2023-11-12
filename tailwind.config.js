export const content = [
  "./app/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
  "./content/**/*.mdx",
];
export const theme = {
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
};
export const future = {
  hoverOnlyWhenSupported: true,
};
export const plugins = [require("@tailwindcss/typography")];
