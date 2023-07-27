'use client'
import { galleries } from '../../images'
import Gallery from '../../_components/gallery/Gallery'

export default function GalleryPage({
	params,
}: {
	params: { slug: string[] }
}) {
	const galleryId = params.slug[0]
	const categoryId = params.slug.length === 2 ? params.slug[1] : null
	const gallery = galleries[galleryId]
	// let category
	// if (categoryId) {
	// 	category = gallery.gallery.find(
	// 		(item: { categoryId: string | null }) =>
	// 			item.categoryId === categoryId
	// 	)
	// }
	return <Gallery {...gallery} categoryId={categoryId} />
}
