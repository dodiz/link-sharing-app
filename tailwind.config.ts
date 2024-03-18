import type { Config } from "tailwindcss";

const baseFontSize = 10;

const config = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./ui/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        primary: {
          100: "#EFEBFF",
          200: "#B3ADFF",
          300: "#633CFF",
        },
        secondary: {
          100: "#ffffff",
          200: "#F5F5F5",
          300: "#D9D9D9",
          400: "#737373",
          500: "#333333",
        },
        error: "#FF3939",
      },
      screens: {
        md: "768px",
        lg: "1024px",
        xl: "1366px",
      },
      fontSize: {
        xl: "3.2rem",
        base: "1.6rem",
        xs: "1.2rem",
      },
      spacing: () => ({
        ...Array.from({ length: 96 }, (_, index) => index * 0.5)
          .filter((i) => i)
          .reduce(
            (acc, i) => ({ ...acc, [i]: `${i / (baseFontSize / 4)}rem` }),
            {}
          ),
      }),
      borderWidth: {
        1: ".1rem",
      },
      borderRadius: {
        sm: "0.8rem",
        md: "1.2rem",
      },
      boxShadow: {
        base: "0 0 32px 0 rgba(0, 0, 0, 0.10)",
        accent: "0 0 32px 0 rgba(99, 60, 255, 0.25)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
