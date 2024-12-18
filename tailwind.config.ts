import type { Config } from "tailwindcss";

const config: Config = {
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
        contentbg: "#FAFAFA",
        action: {
          DEFAULT: "#007AFF",
        },
        primary: {
          DEFAULT: "#5DB53E",
          hover: "#46A325",
        },
      },
      screens: {
        sm: '480px',
        md: '768px', 
        lg: '1290px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
export default config;
