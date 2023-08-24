import { galleries } from '@/images'
import Gallery from '@/_components/gallery/Gallery'
import { GalleryProps } from '@/_types'

export async function generateStaticParams() {
	return Object.entries(galleries).flatMap(([galleryId, gallery]) => [
		{ slug: [galleryId] },
		...gallery.categories.map(({ categoryId }) => ({
			slug: [galleryId, categoryId],
		})),
	])
}

export default function GalleryPage({
	params,
}: {
	params: { slug: string[] }
}) {
	const galleryId = params.slug[0]
	const gallery: GalleryProps = galleries[galleryId]
	let activeCategoryId = gallery.categories[0].categoryId
	let activeCategory = gallery.categories[0]
	if (params.slug.length === 2) {
		activeCategoryId = params.slug[1]
		const activeCategoryParams = gallery?.categories?.find(
			(item: { categoryId: string }) =>
				item.categoryId === activeCategoryId
		)
		if (activeCategoryParams) {
			activeCategory = activeCategoryParams
		}
	}
	return <Gallery gallery={gallery} activeCategory={activeCategory} />
}
