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
			<ul className='w-full flex flex-wrap h-full list-none sm:[&>*:last-child]:grow-0'>
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

// <Image src={cover.web.src} alt='cover' width='300' height='200' />

export default Gallery
