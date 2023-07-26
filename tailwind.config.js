/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			screens: {
				smLandscape: {
					raw: '(min-aspect-ratio: 1/1) and (max-width: 1024px)',
				},
			},
		},
	},
	plugins: [],
}
