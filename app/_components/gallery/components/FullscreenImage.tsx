'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { CategoryProps, FullscreenImageProps } from '@/_types'
import { useCallback, useEffect, useState } from 'react'
import {
	ArrowLeftIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { useFullScreen } from '@/_contexts/FullscreenContext'
import OptionIcons from './OptionIcons'

const FullscreenImage = ({
	category,
	handleModalOpen,
}: FullscreenImageProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const { isFullscreen, enterFullscreen, exitFullscreen } = useFullScreen()
	const [activeImgId, setActiveImgId] = useState<number>(-1)

	const createQuery = useCallback(
		({
			name,
			value,
			operation,
		}: {
			name: string
			value: string
			operation: string
		}) => {
			const params = new URLSearchParams(searchParams.toString())
			if (operation === 'add') {
				params.set(name, value)
			} else {
				params.delete(name)
			}
			return params.toString() ? `?${params.toString()}` : ''
		},
		[searchParams]
	)

	const handleSlide = useCallback(
		(direction: number) => {
			if (activeImgId !== -1) {
				const len = category.images.length
				let nextImg = activeImgId + direction
				nextImg = (((nextImg % len) + len) % len) + 1 // To handle negative values
				const query = createQuery({
					name: 'p',
					value: nextImg.toString(),
					operation: 'add',
				})

				router.push(pathname + query, {
					scroll: false,
				})
			}
		},
		[activeImgId, category.images.length, createQuery, pathname, router]
	)
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			switch (event.key) {
				case 'ArrowLeft':
					handleSlide(-1)
					break
				case 'ArrowRight':
					handleSlide(1)
					break
				case 'Escape':
					router.push(pathname, { scroll: false })
					break
			}
		},
		[handleSlide, pathname, router]
	)
	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [handleKeyDown])
	const handleSlideForward = useCallback(() => handleSlide(1), [handleSlide])
	const handleSlideBackward = useCallback(
		() => handleSlide(-1),
		[handleSlide]
	)
	useEffect(() => {
		const photoId = searchParams.get('p')
		if (photoId) {
			const activeImgId = Number(photoId) - 1
			setActiveImgId(activeImgId)
		} else {
			setActiveImgId(-1)
		}
	}, [searchParams])

	useEffect(() => {
		if (!isFullscreen && activeImgId !== -1) {
			enterFullscreen()
		} else if (isFullscreen && activeImgId === -1) {
			exitFullscreen()
		}
	}, [activeImgId, enterFullscreen, exitFullscreen, isFullscreen])

	return (
		<>
			<AnimatePresence>
				{activeImgId !== -1 && (
					<motion.div
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
						viewport={{ once: true }}
						className='fixed top-0 w-full min-h-screen h-full flex flex-col items-center justify-center bg-black z-20'
					>
						<AnimatePresence mode='popLayout'>
							<motion.div
								key={category.images[activeImgId].src}
								initial='hidden'
								exit='hidden'
								animate='visible'
								variants={item}
								transition={{
									duration: 0.3,
								}}
							>
								<Image
									src={`/${category.images[activeImgId].src}`}
									alt='alt'
									quality={30}
									blurDataURL={
										category.images[activeImgId].blurData
									}
									height={window.innerHeight - 128}
									width={
										(window.innerHeight - 128) *
										category.images[activeImgId].aspectRatio
									}
									placeholder='blur'
									style={{ objectFit: 'cover' }}
								/>
							</motion.div>
						</AnimatePresence>
						<div
							className='peer/right cursor-pointer fixed h-screen w-[20%] top-0 mt-[64px] right-0 z-3 flex items-center justify-end'
							onClick={handleSlideForward}
						/>
						<ChevronRightIcon
							width={40}
							height={40}
							color='#FFF'
							className='p-2 opacity-60 peer-hover/right:opacity-100 hover:opacity-100 absolute right-2 top-1/2 cursor-pointer'
							onClick={handleSlideForward}
						/>
						<div
							className='peer/left cursor-pointer fixed h-screen w-[20%] top-0 left-0 mt-[64px] z-3 flex items-center justify-start'
							onClick={handleSlideBackward}
						/>
						<ChevronLeftIcon
							width={40}
							height={40}
							color='#FFF'
							className='p-2 opacity-60 peer-hover/left:opacity-100 hover:opacity-100 absolute left-2 top-1/2 cursor-pointer'
							onClick={handleSlideBackward}
						/>
						<div className='w-full flex fixed top-0 items-center justify-between h-16 z-30 px-2 md:px-4'>
							<button
								className='group text-white'
								onClick={() => {
									router.push(pathname, { scroll: false })
								}}
							>
								<ArrowLeftIcon
									width={40}
									height={40}
									color='#FFF'
									className='p-2 opacity-60 group-hover:opacity-100'
								/>
							</button>
							<OptionIcons
								img={category.images[activeImgId]}
								handleModalOpen={handleModalOpen}
							/>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}

const container = {
	hidden: { opacity: 0, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
	},
}

const item = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
	},
}

export default FullscreenImage
