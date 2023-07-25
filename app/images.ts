// @ts-ignore
const imagesContext = require.context('../images', true, /\.json$/)

export const images = imagesContext
	.keys()
	.reduce((acc: { [x: string]: any }, path: string) => {
		// The key will be the parent directory name
		const fileName = path
			.split('/')[1]
			.replace('./', '')
			.replace('.json', '')

		acc[fileName] = imagesContext(path)

		return acc
	}, {})
