import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Agent Player Brand Colors
        'brand-purple': '#9333EA',
        'brand-purple-light': '#A855F7',
        'brand-purple-dark': '#7C3AED',
        'brand-blue': '#4F46E5',
        'brand-indigo': '#6366F1',
        'brand-cyan': '#06B6D4',
        'brand-teal': '#14B8A6',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #4F46E5 0%, #9333EA 50%, #06B6D4 100%)',
        'purple-gradient': 'linear-gradient(to bottom right, #7C3AED, #9333EA)',
      },
    },
  },
  plugins: [],
};

export default config;
