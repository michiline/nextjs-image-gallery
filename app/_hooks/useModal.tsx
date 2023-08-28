import { ModalProps, ModalState } from '@/_types'
import { useState } from 'react'

const useModal = () => {
	const [modalData, setModalData] = useState<string | null>(null)
	const [activeModal, setActiveModal] = useState<ModalState | null>(null)

	const handleModalOpen = ({ type, data }: ModalProps) => {
		setActiveModal(type)
		setModalData(data)
	}

	const handleModalClose = () => {
		setActiveModal(null)
		setModalData(null)
	}

	return { modalData, activeModal, handleModalOpen, handleModalClose }
}

export default useModal
