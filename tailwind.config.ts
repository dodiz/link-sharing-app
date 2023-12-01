import type { Config } from "tailwindcss";
const baseFontSize = 10;
const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
  plugins: [],
};
export default config;
