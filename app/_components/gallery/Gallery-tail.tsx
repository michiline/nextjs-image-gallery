'use client'
import Image from 'next/image'

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
		cover: {
			src: string
			blurData: string
		}
	}
}

const Gallery = ({ id, images, cover }: GalleryProps) => {
	return (
		<div className='w-full flex flex-col'>
			<div className='w-full h-screen relative'>
				<Image
					src={`/${cover.web.src}`}
					blurDataURL={cover.web.blurData}
					alt='cover'
					fill
					style={{ objectFit: 'cover', objectPosition: 'center' }}
					priority
					placeholder='blur'
				/>
			</div>
			<ul className='w-full flex flex-wrap h-full list-none [&>*:last-child]:grow-0'>
				{images.map((image) => {
					return (
						<li
							key={image.src}
							className={`relative h-[30vh]${
								image.aspectRatio > 1
									? ' aspect-[3/2]'
									: 'aspect[2/3]'
							} grow mx-1 my-1`}
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

// <Image src={cover.web.src} alt='cover' width='300' height='200' />

export default Gallery
