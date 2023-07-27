'use client'
import Image from 'next/image'
import Cover from '../Cover'
import { useCallback, useRef, useState } from 'react'
import Overlay from '../Overlay'
import ImageOverlay from './ImageOverlay'
import Link from 'next/link'

interface ImageProps {
	src: string
	aspectRatio: number
	blurData: string
}

interface GalleryProps {
	galleryId: string
	categoryId: string
	gallery: [
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

const Gallery = ({ galleryId, categoryId, gallery, cover }: GalleryProps) => {
	const galleryRef = useRef<HTMLUListElement>(null)
	const scrollToGallery = useCallback(() => {
		if (galleryRef && galleryRef.current) {
			galleryRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [])
	const [activeCategoryId, setActiveCategoryId] = useState(categoryId)
	console.log(categoryId)
	return (
		<div className='w-full flex flex-col'>
			<Cover id={galleryId} img={cover} handleClick={scrollToGallery} />
			<div className='w-full flex px-4 py-4'>
				<h2 className='text-2xl mr-4'>Little eagle photo </h2>
				{gallery.map(({ categoryId }) => (
					<Link
						key={categoryId}
						href={`/gallery/${galleryId}/${categoryId}`}
						scroll={false}
					>
						<h2
							className={`text-2xl px-2 ${
								categoryId === activeCategoryId && 'font-bold'
							}`}
						>
							{categoryId}
						</h2>
					</Link>
				))}
			</div>
			<ul
				className='w-full flex flex-wrap h-full list-none sm:[&>*:last-child]:grow-0'
				ref={galleryRef}
			>
				{gallery &&
					gallery
						.find(
							(item: { categoryId: string | null }) =>
								item.categoryId === activeCategoryId
						)
						.images.map((image) => {
							const aspectRatio =
								image.aspectRatio > 1
									? ' aspect-[3/2]'
									: 'aspect-[2/3]'
							return (
								<li
									key={image.src}
									className={`cursor-pointer group w-full h-auto smLandscape:w-full smLandscape:h-auto md:h-[20vh] md:w-auto lg:h-[25vh] xl:h-[30vh] 2xl:h-[35vh] relative ${aspectRatio} grow mx-1 my-1 overflow-hidden`}
								>
									<Image
										src={`/${image.src}`}
										alt={image.src}
										fill
										blurDataURL={image.blurData}
										placeholder='blur'
										style={{
											objectFit: 'cover',
											objectPosition: 'center',
										}}
									/>
									<ImageOverlay />
								</li>
							)
						})}
			</ul>
		</div>
	)
}

// {images.map((image) => {
// 	const aspectRatio =
// 		image.aspectRatio > 1 ? ' aspect-[3/2]' : 'aspect-[2/3]'
// 	return (
// 		<li
// 			key={image.src}
// 			className={`cursor-pointer group w-full h-auto smLandscape:w-full smLandscape:h-auto md:h-[20vh] md:w-auto lg:h-[25vh] xl:h-[30vh] 2xl:h-[35vh] relative ${aspectRatio} grow mx-1 my-1 overflow-hidden`}
// 		>
// 			<Image
// 				src={`/${image.src}`}
// 				alt={image.src}
// 				fill
// 				blurDataURL={image.blurData}
// 				placeholder='blur'
// 				style={{
// 					objectFit: 'cover',
// 					objectPosition: 'center',
// 				}}
// 			/>
// 			<ImageOverlay />
// 		</li>
// 	)
// })}

export default Gallery
