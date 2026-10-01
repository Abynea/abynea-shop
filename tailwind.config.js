/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fond
        cream: "#FAFAFA",
        ivory: "#FFFFFF",
        sand: "#F3EFE9",
        // Texte
        ink: {
          DEFAULT: "#111111",
          soft: "#3A3A3A",
          muted: "#6B6B6B",
          faint: "#9A9A9A",
        },
        // Accent doré
        gold: {
          light: "#E7CE7B",
          DEFAULT: "#D4AF37",
          dark: "#B8912A",
          soft: "#F6EED6",
        },
        line: "#E9E6E1",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "Montserrat", "Poppins", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(17,17,17,0.04)",
        card: "0 4px 24px -12px rgba(17,17,17,0.12)",
        drawer: "-8px 0 40px -12px rgba(17,17,17,0.18)",
        gold: "0 8px 30px -12px rgba(212,175,55,0.55)",
      },
      letterSpacing: {
        brand: "0.35em",
        widest2: "0.2em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        marquee: "marquee 28s linear infinite",
        shimmer: "shimmer 1.6s linear infinite",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};

module.exports = config;
