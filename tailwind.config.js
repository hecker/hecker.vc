/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    cursor: {
      black: "url('/icons/cursor-black.svg'), default",
      white: "url('/icons/cursor-white.svg'), default",
    },
    extend: {
      fontFamily: {
        serif: ["var(--font-baskerville)"],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require("@tailwindcss/typography")],
};
