/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        p5: {
          red: "#D92323",
          black: "#0D0D0D",
          white: "#EBE6E6",
        },
      },
      boxShadow: {
        p5: "-8px 8px 0 #0D0D0D",
      },
      fontFamily: {
        display: ["var(--font-bangers)", "cursive"],
        hand: ["var(--font-permanent-marker)", "cursive"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      clipPath: {
        jagged: "polygon(2% 0%, 100% 0%, 97% 18%, 100% 42%, 98% 100%, 0% 100%, 0% 8%)",
      },
      skew: {
        10: "10deg",
        12: "12deg",
      },
      keyframes: {
        burstIn: {
          "0%": { opacity: "0", transform: "scale(0.6) translateY(16px) rotate(-8deg)" },
          "70%": { opacity: "1", transform: "scale(1.08) translateY(-2px) rotate(2deg)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0) rotate(0deg)" },
        },
      },
      animation: {
        burstIn: "burstIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".clip-jagged": {
          clipPath: "polygon(2% 0%, 100% 0%, 97% 18%, 100% 42%, 98% 100%, 0% 100%, 0% 8%)",
        },
      });
    },
  ],
};
