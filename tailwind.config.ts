import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {

      container: {
        center: true,
        padding: '5px'
      },

      fontFamily: {
        vazir: 'vazir'
      },

      colors: {
        main: '#040F75',
        mainlight: '#628EFF',

        secondary: '#628EFF',
        secondarydark: '#580475',

        third: '#E948C5',
        thirddark: '#75042D',

        bglight: '#fff',
        bgdark: '#1E1E1E',

        textcolor: 'gray-300',
        textcolordark: '#000'
      },

      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-10px)' },
        },
      },
      animation: {
        'wiggle': 'wiggle 1s ease-in-out infinite',
      }

    },
  },
  plugins: [],
};
export default config;
