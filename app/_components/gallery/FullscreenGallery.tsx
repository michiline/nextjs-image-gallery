'use client'

import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { CategoryProps } from '../../_types'

const FullscreenGallery = ({ category }: { category: CategoryProps }) => {
	const params = useSearchParams()
	const photoId = params.get('p')
	if (!photoId) {
		return null
	}
	const activeImgId = Number(photoId)
	const activeImg = category.images[activeImgId]
	return (
		<div className='fixed top-0 w-full min-h-screen h-full flex flex-col items-center justify-center bg-black z-20'>
			<Image
				src={`/${activeImg.src}`}
				alt='alt'
				width={activeImg.width}
				height={activeImg.height}
				quality={80}
			/>
		</div>
	)
}

export default FullscreenGallery
