// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // Enable dark mode via class
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        spotlight: {
          moving: 'rgba(255, 255, 255, 0.3)', // White when moving
          idle: 'rgba(70, 130, 180, 0.7)', // SteelBlue for better visibility in dark mode
        },
        dot: {
          normal: 'rgba(0, 150, 255, 1)', // Customized dot color (Blue)
          shadow: 'rgba(0, 150, 255, 0.8)', // Customized shadow (Blue Shadow)
        },
      },
      width: {
        '38': '150px', // Custom width for circle when idle
        '50': '200px', // Custom width for circle when hovering
      },
      height: {
        '38': '150px', // Custom height for circle when idle
        '50': '200px', // Custom height for circle when hovering
      },
    },
  },
  plugins: [],
};

export default config;
