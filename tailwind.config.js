/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B1020",
        card: "#111827",
        primary: "#3B82F6",
      },
      boxShadow: {
        glow: "0 0 20px rgba(59,130,246,0.4)",
      },
    },
  },
  plugins: [],
}