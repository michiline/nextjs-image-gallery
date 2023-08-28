'use client'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import useOutsideClick from '@/_hooks/useOutsideClick'
import { useFullScreen } from '@/_contexts/FullscreenContext'
import { useEffect } from 'react'

interface ModalProps {
	show: boolean
	transparent?: boolean
	handleClose: () => void
	children?: React.ReactElement
}

const Modal = ({
	show = false,
	transparent = true,
	handleClose,
	children,
}: ModalProps) => {
	const childrenRef = useOutsideClick(handleClose)
	const { enterFullscreen, exitFullscreen } = useFullScreen()
	useEffect(() => {
		if (show) {
			enterFullscreen()
		} else {
			exitFullscreen()
		}
	}, [show, enterFullscreen, exitFullscreen])

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					className={`fixed w-full h-screen flex justify-center items-center z-20 ${
						transparent ? 'bg-[#0000009A]' : 'bg-[#000]'
					}`}
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}
					exit={{
						opacity: 0,
					}}
					transition={{ duration: 0.3 }}
				>
					<button
						className='group fixed top-2 right-2 z-20 text-white'
						onClick={handleClose}
					>
						<XMarkIcon
							width={40}
							height={40}
							color='#FFF'
							className='p-2 opacity-60 group-hover:opacity-100'
						/>
					</button>
					<div className='flex' ref={childrenRef}>
						{children}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default Modal
