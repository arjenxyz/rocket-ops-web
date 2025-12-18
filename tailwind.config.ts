import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'aurora-1': 'aurora 10s infinite alternate',
        'aurora-2': 'aurora 12s infinite alternate-reverse',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        aurora: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.5' },
          '50%': { transform: 'translate(20px, -20px) scale(1.1)', opacity: '0.8' },
          '100%': { transform: 'translate(-20px, 20px) scale(1)', opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};
export default config;