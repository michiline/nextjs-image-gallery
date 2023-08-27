'use client'

import { Suspense, useCallback, useRef, useState } from 'react'
import { CategoryProps, GalleryProps } from '@/_types'

import Header from './components/Header'
import JustifedGrid from './components/JustifiedGrid'
import FullscreenImage from './components/FullscreenImage'

import SharedModal from '@/_components/modal/SharedModal'
import DownloadModal from '@/_components/modal/DownloadModal'
import Loading from '@/_components/Loading'
import ColumnGrid from './components/ColumnGrid'
import { useActiveImage } from '@/_hooks/useActiveImage'

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
		galleryRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [galleryRef])

	return (
		<div className='w-full flex flex-col'>
			<Header
				gallery={gallery}
				activeCategory={activeCategory}
				handleClick={scrollToGallery}
			/>
			<ColumnGrid
				galleryRef={galleryRef}
				gallery={gallery}
				activeCategory={activeCategory}
				handleDownload={handleDownload}
				handleShare={handleShare}
			/>
			<Suspense fallback={<Loading />}>
				<FullscreenImage category={activeCategory} />
				<SharedModal
					show={sharedImgId !== -1}
					handleClose={() => setSharedImgId(-1)}
					sharedImgId={sharedImgId + 1}
				/>
				<DownloadModal
					show={!!downloadImgSrc}
					handleClose={() => setDownloadImgSrc('')}
					downloadImgSrc={downloadImgSrc}
				/>
			</Suspense>
		</div>
	)
}

export default Gallery
