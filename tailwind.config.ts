import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "background-primary": "var(--background-primary)",
        "background-white": "var(--background-white)",
        "background-black": "var(--background-black)",
        "color-green-forest": "var(--color-green-forest)",
        "color-yellow-sunshine": "var(--color-yellow-sunshine)",
        "color-orange-fire": "var(--color-orange-fire)",
        "color-brown-earth": "var(--color-brown-earth)",
        "color-white": "var(--color-white)",
        "color-black": "var(--color-black)",
        "color-black-blue": "var(--color-black-blue)",
      },
    },
  },
  plugins: [],
} satisfies Config;
