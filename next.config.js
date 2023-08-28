/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['d3vwli3tdrxeva.cloudfront.net'],
		minimumCacheTTL: 31536000,
	},
}

// const nextConfig = {
// 	output: 'export',
// 	images: {
// 		loader: 'custom',
// 		loaderFile: './imgixLoader.js',
// 	},
// }
module.exports = nextConfig
