export interface ImageProps {
	src: string
	aspectRatio: number
	blurData: string
	width: number
	height: number
}

export interface CategoryProps {
	categoryId: string
	images: ImageProps[]
}

export interface GalleryProps {
	galleryId: string
	categories: CategoryProps[]
	cover: {
		web: {
			src: string
			blurData: string
		}
		mobile: {
			src: string
			blurData: string
		}
	}
}

export interface ImageDimensionsProps {
	width: number
	height: number
	x: number
	y: number
}
