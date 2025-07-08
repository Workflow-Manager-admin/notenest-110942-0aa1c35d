module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0070f3",
        accent: "#f5a623",
        secondary: "#1a202c",
        lightBG: "#ffffff",
        lightText: "#171717",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
}
