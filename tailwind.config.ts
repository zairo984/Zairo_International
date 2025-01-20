import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "#FF5733", // Added an example custom color for accents
      },
      animation: {
        fadeInUp: "fadeInUp 0.5s ease-in-out",
        bgSlide: "bgSlide 20s linear infinite",
        flipInHorBottom: "flipInHorBottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both", // Flip animation
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        bgSlide: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
        flipInHorBottom: {
          "0%": {
            transform: "rotateX(80deg)",
            opacity: "0",
          },
          "100%": {
            transform: "rotateX(0)",
            opacity: "1",
          },
        },
      },
      spacing: {
        "128": "32rem", // Example of custom spacing
        "144": "36rem",
      },
      borderRadius: {
        "4xl": "2rem", // Example of additional border radius
      },
    },
  },
  plugins: [],
} satisfies Config;
