import { galleries } from '../../images'
import Gallery from '../../_components/gallery/Gallery'

interface ImageProps {
	src: string
	aspectRatio: number
	blurData: string
	width: number
	height: number
}

interface GalleryProps {
	galleryId: string
	categories: [
		{
			categoryId: string
			images: [ImageProps]
		}
	]
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

export default function GalleryPage({
	params,
}: {
	params: { slug: string[] }
}) {
	const galleryId = params.slug[0]
	const gallery: GalleryProps = galleries[galleryId]
	let categoryId: string = ''
	let category
	let activeImg
	let activeImgIndex
	if (params.slug.length === 2) {
		categoryId = params.slug[1]
	}
	if (!categoryId) {
		category = gallery?.categories[0]
	} else {
		category = gallery?.categories?.find(
			(item: { categoryId: string }) => item.categoryId === categoryId
		)
	}
	if (params.slug.length === 3) {
		try {
			activeImgIndex = Number(params.slug[2])
			activeImg = category?.images[activeImgIndex]
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<Gallery
			galleryId={galleryId}
			cover={gallery?.cover}
			categories={gallery?.categories?.map((elem) => elem.categoryId)}
			activeCategory={category}
			activeImg={activeImg}
		/>
	)
}
