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
				'surface': "#333",
				'primary': "#43c4d7",
				'almost-white':"#e9e9e9"
			}
		},
	},
  plugins: [],
};
export default config;
