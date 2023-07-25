'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

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
	const [col, setCol] = useState(5)
	const columns = Array.from(Array(col).keys())
	const [width, setWidth] = useState(0)
	const handleResize = (e) => {
		const width = e.target.window.innerWidth
		if (width < 786) {
			setCol(1)
		} else if (width < 1024) {
			setCol(2)
		} else if (width < 1280) {
			setCol(3)
		} else if (width < 1536) {
			setCol(4)
		} else {
			setCol(5)
		}
	}
	useEffect(() => {
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

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
					sizes='100vw'
				/>
			</div>
			<div className='w-full flex'>
				{columns.map((column, index) => {
					return (
						<ul className='w-full flex flex-col mx-1' key={index}>
							{images.map((image, index) => {
								if (index % col === column) {
									return (
										<li
											key={image.src}
											className={`relative w-full aspect-[${
												image.aspectRatio > 1
													? '3/2'
													: '2/3'
											}] my-1`}
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
												sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 25vw, 20vw'
											/>
										</li>
									)
								}
							})}
						</ul>
					)
				})}
			</div>
		</div>
	)
}

// <Image src={cover.web.src} alt='cover' width='300' height='200' />

export default Gallery
