// hooks/useImageActions.ts
import { ImageProps } from 'next/image'
import { useState } from 'react'

export type ModalType = 'none' | 'share' | 'download'

export const useActiveImage = () => {
	const [activeImage, setActiveImage] = useState<ImageProps | null>(null)
	const [activeModal, setActiveModal] = useState<ModalType>('none')

	const handleAction = (type: ModalType, image: ImageProps) => {
		setActiveImage(image)
		setActiveModal(type)
	}

	const handleClose = () => {
		setActiveImage(null)
		setActiveModal('none')
	}

	return {
		activeImage,
		activeModal,
		handleAction,
		handleClose,
	}
}
