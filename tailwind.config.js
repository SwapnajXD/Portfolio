/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          main: "var(--brand-main)",
          bg: "var(--brand-bg)",
          accent: "var(--brand-accent)",
        },
        p5: {
          red: "var(--brand-main)",
          black: "var(--brand-bg)",
          white: "var(--brand-accent)",
        },
      },
      boxShadow: {
        p5: "-8px 8px 0 var(--brand-bg)",
        brandGlow: "0 0 24px color-mix(in srgb, var(--brand-main) 40%, transparent)",
      },
      fontFamily: {
        display: ["var(--font-bangers)", "cursive"],
        hand: ["var(--font-permanent-marker)", "cursive"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      clipPath: {
        jagged: "polygon(2% 0%, 100% 0%, 97% 18%, 100% 42%, 98% 100%, 0% 100%, 0% 8%)",
        circular: "circle(50% at 50% 50%)",
        oval: "ellipse(50% 42% at 50% 50%)",
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
        p5Snap: {
          "0%": { transform: "translateX(-1.25rem) scale(0.9) rotate(-6deg)", opacity: "0" },
          "65%": { transform: "translateX(0.4rem) scale(1.06) rotate(1deg)", opacity: "1" },
          "100%": { transform: "translateX(0) scale(1) rotate(0deg)", opacity: "1" },
        },
        p5Jitter: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-2px)" },
          "50%": { transform: "translateX(2px)" },
          "75%": { transform: "translateX(-1px)" },
        },
        p5ShardSweep: {
          "0%": { transform: "translateX(-140%) translateY(-10%) rotate(-14deg) scaleX(0.7)", opacity: "0" },
          "15%": { opacity: "1" },
          "100%": { transform: "translateX(140%) translateY(10%) rotate(12deg) scaleX(1.08)", opacity: "0" },
        },
        p5Grain: {
          "0%, 100%": { opacity: "0.16" },
          "50%": { opacity: "0.3" },
        },
        p3Ripple: {
          "0%": { transform: "scale(0.96)", opacity: "0.15" },
          "50%": { transform: "scale(1.02)", opacity: "0.38" },
          "100%": { transform: "scale(1)", opacity: "0.2" },
        },
        p3Shine: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        burstIn: "burstIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) both",
        "p5-snap": "p5Snap 0.55s cubic-bezier(0.16, 1, 0.3, 1) both",
        "p5-jitter": "p5Jitter 0.28s steps(2, end) both",
        "p5-shard-sweep": "p5ShardSweep 0.45s cubic-bezier(0.16, 1, 0.3, 1) both",
        "p5-grain": "p5Grain 0.8s steps(2, end) infinite",
        "p3-ripple": "p3Ripple 0.9s ease-in-out infinite",
        "p3-shine": "p3Shine 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".clip-jagged": {
          clipPath: "polygon(2% 0%, 100% 0%, 97% 18%, 100% 42%, 98% 100%, 0% 100%, 0% 8%)",
        },
        ".clip-oval": {
          clipPath: "ellipse(50% 42% at 50% 50%)",
        },
        ".clip-circle": {
          clipPath: "circle(50% at 50% 50%)",
        },
      });
    },
  ],
};
