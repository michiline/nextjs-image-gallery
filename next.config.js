/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	images: {
		loader: 'custom',
		loaderFile: './imgixLoader.js',
	},
}

module.exports = nextConfig
