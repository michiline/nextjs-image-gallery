'use client'
import Image from 'next/image'
import Cover from '../Cover'
import { useCallback, useRef } from 'react'
import ImageOverlay from './ImageOverlay'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'

interface ImageProps {
	src: string
	aspectRatio: number
	blurData: string
	width: number
	height: number
}

interface GalleryProps {
	galleryId: string
	categories: string[]
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
	activeCategory?: {
		categoryId: string
		images: [ImageProps]
	}
	activeImg?: ImageProps
}

const Gallery = ({
	galleryId,
	categories,
	cover,
	activeCategory,
	activeImg,
}: GalleryProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const paths = pathname.split('/')

	if (activeCategory && paths.length === 3) {
		router.replace(`${pathname}/${activeCategory.categoryId}`)
	}
	const galleryRef = useRef<HTMLUListElement>(null)
	const scrollToGallery = useCallback(() => {
		if (galleryRef && galleryRef.current) {
			galleryRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [])
	return (
		<div className='w-full flex flex-col relative'>
			<Cover id={galleryId} img={cover} handleClick={scrollToGallery} />
			<div className='w-full flex px-4 py-4 justify-between items-center'>
				<h2 className='text-2xl mr-8'>Logo </h2>
				<div className='flex'>
					{categories &&
						categories.map((categoryId) => (
							<Link
								key={categoryId}
								href={`/gallery/${galleryId}/${categoryId}`}
								scroll={false}
								className='flex items-center'
							>
								<h2
									className={`text-md px-2 uppercase text-center hover:opacity-100 transition ease-in-out duration-150 ${
										categoryId ===
										activeCategory?.categoryId
											? 'font-bold opacity-100'
											: 'opacity-60'
									}`}
								>
									{`${categoryId}`}
								</h2>
							</Link>
						))}
				</div>
				<div className='flex'>
					<ArrowDownTrayIcon
						width={48}
						height={48}
						color='#000'
						className='p-2 cursor-pointer opacity-60 hover:opacity-100 text-c'
					/>
				</div>
			</div>
			<ul
				className='w-full flex flex-wrap h-full list-none sm:[&>*:last-child]:grow-0'
				ref={galleryRef}
			>
				{activeCategory?.images.map((image) => {
					const aspectRatio =
						image.aspectRatio > 1 ? ' aspect-[3/2]' : 'aspect-[2/3]'
					return (
						<li
							key={image.src}
							className={`cursor-pointer group w-full h-auto smLandscape:w-full smLandscape:h-auto md:h-[20vh] md:w-auto lg:h-[25vh] xl:h-[30vh] 2xl:h-[35vh] relative ${aspectRatio} grow mx-[0.5px] my-[0.5px] lg:mx-1 lg:my-1 overflow-hidden`}
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
			{activeImg && (
				<div className='fixed top-0 w-full min-h-screen h-full flex flex-col items-center justify-center bg-black z-20'>
					<Image
						src={`/${activeImg.src}`}
						alt='alt'
						width={activeImg.width}
						height={activeImg.height}
						quality={80}
					/>
				</div>
			)}
		</div>
	)
}

export default Gallery
