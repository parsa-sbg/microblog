import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container:{
        center: true,
        padding: '5px'
      },
      fontFamily: {
        vazir: 'vazir'
      },
      colors: {
        main: '#0044ca',
      },
    },
  },
  plugins: [],
};
export default config;
