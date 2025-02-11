/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        quaternary: "var(--color-quaternary)",
        whiteT: "var(--color-white)",
        backgroundT: "var(--color-background)",
        strokeT: "var(--color-stroke)",
      }
    },
  },
  plugins: [],
}