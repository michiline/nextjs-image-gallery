import { GalleryProps } from './_types'

// @ts-ignore
const galleriesContext = require.context('../images', true, /\.json$/)

interface GalleriesProps {
	[key: string]: GalleryProps
}

export const galleries: GalleriesProps = galleriesContext
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
