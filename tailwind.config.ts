import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#173A2E",
          light: "#1F4E3D",
          dark: "#0C2019",
        },
        leaf: {
          DEFAULT: "#4C9A6A",
          light: "#7CBF8E",
          dark: "#357250",
        },
        cream: {
          DEFAULT: "#FBF6EC",
          soft: "#F3ECDC",
        },
        gold: {
          DEFAULT: "#EFC26A",
          light: "#F6DCA0",
        },
        amber: {
          DEFAULT: "#E68A4F",
          light: "#F0AD7C",
        },
        ink: "#1C2620",
      },
      fontFamily: {
        display: ["var(--font-be-vietnam)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "rio-gradient":
          "linear-gradient(135deg, #FBF6EC 0%, #F3ECDC 40%, #F6DCA0 75%, #F0AD7C 100%)",
        "rio-gradient-dark":
          "linear-gradient(135deg, #0C2019 0%, #173A2E 55%, #1F4E3D 100%)",
        "rio-radial":
          "radial-gradient(circle at 30% 20%, rgba(76,154,106,0.25), transparent 55%), radial-gradient(circle at 80% 70%, rgba(239,194,106,0.25), transparent 55%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(23, 58, 46, 0.12)",
        "glass-dark": "0 8px 32px rgba(0, 0, 0, 0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      keyframes: {
        rise: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0" },
          "10%": { opacity: "0.8" },
          "90%": { opacity: "0.4" },
          "100%": { transform: "translateY(-620px) scale(1.4)", opacity: "0" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px) rotate(-1deg)" },
          "50%": { transform: "translateY(-18px) rotate(1deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        rise: "rise linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
