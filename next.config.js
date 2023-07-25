/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		loader: 'custom',
		loaderFile: './imgixLoader.js',
	},
}

module.exports = nextConfig
