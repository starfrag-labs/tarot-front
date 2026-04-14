import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "stars-img": "url('/stars.webp')",
        "result-card-img": "url('/result_card.png')",
        "card-front": "url('/cardx1.png')",
        "card-back": "url('/cardx1.png')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        "flower-island": "var(--font-flower-island)",
        "kopub-batang": "var(--font-kopub-batang)",
      },
      boxShadow: {
        "card-mini": "2px 12px 20px 0px #E3FFF840",
        card: "0px 0px 15px 0px #E3FFF8B2",
        "custom-button": "0 4px 4px 0 #000000, inset 0 0 15px 0 #E3FFF8",
      },
      width: {
        "result-card-width": "300px",
      },
      height: {
        "result-card-height": "477px",
      },
      keyframes: {
        "card-scale": {
          "0%": { transform: "scale(0)" },
          "70%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "offset-distance-move": {
          "0%": { offsetDistance: "0%" },
          "100%": { offsetDistance: "100%" },
        },
      },
      animation: {
        "card-scale": "card-scale 1s ease-in-out",
        "fade-in": "fade-in 1s",
        "fade-out": "fade-out 1s",
      },
    },
  },
  // scroll bar hide plugin
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".card": {
          display: "block",
          margin: "0 auto",
          alignItems: "center",
          justifyContent: "center",
          width: "300px",
          height: "488px",
          position: "relative",
          transformStyle: "preserve-3d",
          perspective: "1000px",
          cursor: "pointer",
        },
        ".card-inner": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",

          //bold red
          color: "red",
          fontSize: "20px",
          fontWeight: "bold",
        },
        ".card-inner-front": {
          backgroundImage: "url('/cardx1.png')",
          backfaceVisibility: "hidden",
        },
        ".card-inner-back": {
          backgroundImage: "url('/result_card.png')",
        },
        ".full-size": {
          width: "100%",
          height: "100%",
        },
        ".flex-center": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        ".scrollbar-hide": {
          /* Firefox */
          "scrollbar-width": "none",
          /* IE */
          "-ms-overflow-style": "none",
          /* WebKit */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
} satisfies Config;
