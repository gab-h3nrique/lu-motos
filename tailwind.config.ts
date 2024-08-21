import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {

        "primary": "var(--primary)",
        "primary-opacity": "var(--primary-opacity)",
        "background-1": "var(--background-1)",
        "background-2": "var(--background-2)",
        "color-1": "var(--color-1)",
        "color-2": "var(--color-2)",
        "color-3": "var(--color-3)",
        "border": "var(--border)"

      },
    },
  },
  plugins: [],
};
export default config;
