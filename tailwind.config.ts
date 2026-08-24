import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#060A12",
        surface: {
          DEFAULT: "#0C1321",
          subtle:   "#0F1A2D",
          elevated: "#111E33",
          card:     "rgba(12, 19, 33, 0.8)",
          glass:    "rgba(15, 26, 45, 0.65)",
        },
        border: {
          subtle:  "rgba(255, 255, 255, 0.06)",
          DEFAULT: "rgba(255, 255, 255, 0.10)",
          bright:  "rgba(255, 255, 255, 0.18)",
        },
        brand: {
          50:     "#ecfeff",
          100:    "#cffafe",
          200:    "#a5f3fc",
          300:    "#67e8f9",
          400:    "#22d3ee",
          500:    "#06b6d4",
          600:    "#0891b2",
          700:    "#0e7490",
          800:    "#155e75",
          900:    "#164e63",
          accent: "#38bdf8",
        },
      },
      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        glass:         "0 8px 32px 0 rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255,255,255,0.05) inset",
        glow:          "0 0 25px -5px rgba(6, 182, 212, 0.35)",
        "glow-sm":     "0 0 15px -5px rgba(6, 182, 212, 0.3)",
        "glow-lg":     "0 0 45px -8px rgba(6, 182, 212, 0.4)",
        "glow-purple": "0 0 30px -8px rgba(139, 92, 246, 0.35)",
        "glow-rose":   "0 0 30px -8px rgba(244, 63, 94, 0.4)",
        "glow-emerald":"0 0 30px -8px rgba(16, 185, 129, 0.35)",
      },
      animation: {
        "pulse-slow":   "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow":    "spin 8s linear infinite",
        "float":        "float 3.5s ease-in-out infinite",
        "shimmer":      "shimmer 1.8s linear infinite",
        "fade-in":      "fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) both",
        "scale-in":     "scale-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "fade-in-up":   "fade-in-up 0.5s cubic-bezier(0.4, 0, 0.2, 1) both",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.92)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      scale: {
        "102": "1.02",
        "108": "1.08",
      },
      transitionDuration: {
        "600": "600ms",
      },
    },
  },
  plugins: [],
};

export default config;
