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
			keyframes: {
				blur: {
					'0%': { opacity: 0, filter: 'blur(15px)' },
					'100%': { opacity: 1, filter: 'blur(0px)' },
				},
			},
			animation: {
				blur: 'blur 0.75s cubic-bezier(0.26, 0.53, 0.74, 1.48) 0.5s 1 normal backwards',
			},
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [],
}
