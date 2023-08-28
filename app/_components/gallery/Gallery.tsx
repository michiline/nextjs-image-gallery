'use client'

import { Suspense, useCallback, useRef } from 'react'
import { CategoryProps, GalleryProps } from '@/_types'

import Header from './components/Header'
import FullscreenImage from './components/FullscreenImage'

import Loading from '@/_components/Loading'
import ColumnGrid from './components/ColumnGrid'
import Modal from '../modal/Modal'
import ModalContent from '../modal/ModalContent'
import useModal from '@/_hooks/useModal'
import FullscreenHandler from '@/_utils/FullscreenHandler'

interface GalleryComponentProps {
	gallery: GalleryProps
	activeCategory: CategoryProps
}

const Gallery = ({ gallery, activeCategory }: GalleryComponentProps) => {
	const { modalData, activeModal, handleModalOpen, handleModalClose } =
		useModal()

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
				handleModalOpen={handleModalOpen}
			/>
			<FullscreenHandler isModalOpen={!!modalData} />
			<Suspense fallback={<Loading />}>
				<FullscreenImage
					category={activeCategory}
					handleModalOpen={handleModalOpen}
				/>
				<Modal show={!!modalData} handleClose={handleModalClose}>
					<ModalContent modalType={activeModal} data={modalData} />
				</Modal>
			</Suspense>
		</div>
	)
}

export default Gallery
