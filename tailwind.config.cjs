// tailwind.config.ts
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#0b3a8a", // deep logo blue
          700: "#1d4ed8", // blue-600-ish
          500: "#3b82f6", // light gradient end
          gold: "#fbbf24", // star
        }
      },
      boxShadow: {
        soft: "0 6px 24px rgba(2, 6, 23, 0.06)"
      }
    }
  },
  plugins: []
}
