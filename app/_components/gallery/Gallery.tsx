'use client'
import Image from 'next/image'
import Cover from '../cover/Cover'
import { Suspense, useCallback, useRef, useState } from 'react'
import ImageOverlay from './ImageOverlay'
import Link from 'next/link'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { CategoryProps, GalleryProps } from '../../_types'
import dynamic from 'next/dynamic'
import FullscreenGallery from './FullscreenGallery'
import { motion } from 'framer-motion'
import SharedModal from '../modal/SharedModal'
import DownloadModal from '../modal/DownloadModal'

interface GalleryComponentProps {
	gallery: GalleryProps
	activeCategory: CategoryProps
}

const Gallery = ({ gallery, activeCategory }: GalleryComponentProps) => {
	const [sharedImgId, setSharedImgId] = useState<number>(-1)
	const [downloadImgSrc, setDownloadImgSrc] = useState<string>('')
	const handleShare = ({
		e,
		id,
	}: {
		e: React.MouseEvent<SVGSVGElement, MouseEvent>
		id: number
	}) => {
		e.preventDefault()
		setSharedImgId(id)
	}
	const handleDownload = ({
		e,
		src,
	}: {
		e: React.MouseEvent<SVGSVGElement, MouseEvent>
		src: string
	}) => {
		e.preventDefault()
		setDownloadImgSrc(src)
	}
	const galleryRef = useRef<HTMLUListElement>(null)
	const scrollToGallery = useCallback(() => {
		if (galleryRef && galleryRef.current) {
			galleryRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [])
	const [dim, setDim] = useState({
		width: 0,
		height: 0,
		x: 0,
		y: 0,
	})

	const handleEvent = useCallback(
		(e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
			e.preventDefault()

			const rect = (e.target as HTMLElement).getBoundingClientRect()

			setDim({
				width: rect.width,
				height: rect.height,
				x: rect.left,
				y: rect.top,
			})
		},
		[]
	)

	return (
		<div className='w-full flex flex-col relative'>
			<Cover
				id={gallery.galleryId}
				img={gallery.cover}
				handleClick={scrollToGallery}
			/>
			<div className='w-full flex px-4 py-2 justify-between items-center'>
				<h2 className='text-2xl'>Logo </h2>
				<div className='flex'>
					<ArrowDownTrayIcon
						width={48}
						height={48}
						color='#000'
						className='p-2 cursor-pointer opacity-60 hover:opacity-100'
					/>
				</div>
			</div>
			<div className='flex w-full px-2 py-2'>
				{gallery.categories.map(({ categoryId }) => (
					<Link
						key={categoryId}
						href={`/gallery/${gallery.galleryId}/${categoryId}`}
						scroll={false}
						className='flex items-center'
					>
						<h2
							className={`text-md px-2 uppercase text-center hover:opacity-100 transition ease-in-out duration-150 ${
								categoryId === activeCategory?.categoryId
									? 'font-bold opacity-100'
									: 'opacity-60'
							}`}
						>
							{`${categoryId}`}
						</h2>
					</Link>
				))}
			</div>
			<ul
				className='w-full flex flex-wrap h-full list-none sm:[&>*:last-child]:grow-0'
				ref={galleryRef}
			>
				{activeCategory?.images.map((image, index) => {
					const aspectRatio =
						image.aspectRatio > 1 ? ' aspect-[3/2]' : 'aspect-[2/3]'
					return (
						<li
							key={image.src}
							className={`cursor-pointer group w-full h-auto smLandscape:w-full smLandscape:h-auto md:h-[20vh] md:w-auto lg:h-[25vh] xl:h-[30vh] 2xl:h-[35vh] ${aspectRatio} grow mx-[0.5px] my-[0.5px] lg:mx-1 lg:my-1 overflow-hidden`}
							onClick={handleEvent}
							onTouchEnd={handleEvent}
						>
							<Link
								key={image.src}
								href={`/gallery/${gallery.galleryId}/${
									activeCategory.categoryId
								}?p=${index + 1}`}
								scroll={false}
								className={`relative w-full h-full inline-block`}
							>
								<motion.div
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									transition={{
										duration: 0.3,
									}}
								>
									<Image
										src={`/${image.src}`}
										alt={image.src}
										blurDataURL={image.blurData}
										placeholder='blur'
										style={{
											objectFit: 'cover',
											objectPosition: 'top',
										}}
										width={image.width}
										height={image.height}
										quality={30}
									/>
									<ImageOverlay
										handleShare={handleShare}
										id={index}
										src={`${process.env.NEXT_PUBLIC_IMGIX_URL}/${image.src}`}
										handleDownload={handleDownload}
									/>
								</motion.div>
							</Link>
						</li>
					)
				})}
			</ul>
			<Suspense fallback={<Loading />}>
				<FullscreenGallery category={activeCategory} dim={dim} />
			</Suspense>
			<Suspense fallback={<Loading />}>
				<SharedModal
					show={sharedImgId !== -1}
					handleClose={() => setSharedImgId(-1)}
					sharedImgId={sharedImgId + 1}
				/>
			</Suspense>
			<DownloadModal
				show={!!downloadImgSrc}
				handleClose={() => setDownloadImgSrc('')}
				downloadImgSrc={downloadImgSrc}
			/>
		</div>
	)
}

const Loading = () => {
	return (
		<div className='fixed top-0 w-full min-h-screen h-full flex flex-col items-center justify-center bg-white z-20'>
			<p className='text-2x'>Loading...</p>
		</div>
	)
}

export default Gallery
