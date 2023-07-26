'use client'
import Image from 'next/image'
import Cover from '../Cover'
import { useCallback, useRef } from 'react'

interface ImageProps {
	src: string
	aspectRatio: number
	blurData: string
}

interface GalleryProps {
	id: string
	images: [ImageProps]
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

const Gallery = ({ id, images, cover }: GalleryProps) => {
	const galleryRef = useRef<HTMLUListElement>(null)
	const scrollToGallery = useCallback(() => {
		if (galleryRef && galleryRef.current) {
			galleryRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [])
	return (
		<div className='w-full flex flex-col'>
			<Cover id={id} img={cover} handleClick={scrollToGallery} />
			<ul
				className='w-full flex flex-wrap h-full list-none sm:[&>*:last-child]:grow-0'
				ref={galleryRef}
			>
				{images.map((image) => {
					const aspectRatio =
						image.aspectRatio > 1 ? ' aspect-[3/2]' : 'aspect-[2/3]'
					return (
						<li
							key={image.src}
							className={`w-full h-auto smLandscape:w-full smLandscape:h-auto md:h-[20vh] md:w-auto lg:h-[25vh] xl:h-[30vh] 2xl:h-[35vh] relative ${aspectRatio} grow mx-1 my-1 overflow-hidden`}
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
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Gallery
