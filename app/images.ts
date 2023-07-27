// @ts-ignore
const galleriesContext = require.context('../images', true, /\.json$/)

export const galleries = galleriesContext
	.keys()
	.reduce((acc: { [x: string]: any }, path: string) => {
		// The key will be the parent directory name
		const fileName = path
			.split('/')[1]
			.replace('./', '')
			.replace('.json', '')

		acc[fileName] = galleriesContext(path)

		return acc
	}, {})
