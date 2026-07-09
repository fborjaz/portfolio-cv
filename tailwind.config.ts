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
            background: "var(--background)",
            foreground: "var(--foreground)",
            primary: {
               DEFAULT: "#6366f1",
               dark: "#4f46e5",
            },
            secondary: {
               DEFAULT: "#8b5cf6",
               dark: "#7c3aed",
            },
            accent: {
               DEFAULT: "#06b6d4",
               dark: "#0891b2",
            },
         },
         animation: {
            "fade-in": "fadeIn 0.5s ease-in-out",
            "slide-up": "slideUp 0.5s ease-out",
            "slide-down": "slideDown 0.5s ease-out",
            "bounce-slow": "bounce 3s infinite",
            "pulse-slow": "pulse 3s infinite",
            "gradient": "gradient 8s ease infinite",
         },
         keyframes: {
            fadeIn: {
               "0%": { opacity: "0" },
               "100%": { opacity: "1" },
            },
            slideUp: {
               "0%": { transform: "translateY(20px)", opacity: "0" },
               "100%": { transform: "translateY(0)", opacity: "1" },
            },
            slideDown: {
               "0%": { transform: "translateY(-20px)", opacity: "0" },
               "100%": { transform: "translateY(0)", opacity: "1" },
            },
            gradient: {
               "0%, 100%": { backgroundPosition: "0% 50%" },
               "50%": { backgroundPosition: "100% 50%" },
            },
         },
         backgroundSize: {
            "300%": "300%",
         },
      },
   },
   plugins: [],
};
export default config;
