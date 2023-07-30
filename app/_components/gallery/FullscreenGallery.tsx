'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { CategoryProps, ImageProps } from '../../_types'
import { useCallback, useEffect, useState } from 'react'
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'

const FullscreenGallery = ({ category }: { category: CategoryProps }) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const [activeImgId, setActiveImgId] = useState<number>(-1)
	const [direction, setDirection] = useState(0)
	useEffect(() => {
		const photoId = searchParams.get('p')
		if (photoId) {
			const activeImgId = Number(photoId) - 1
			setActiveImgId(activeImgId)
		} else {
			setActiveImgId(-1)
		}
	}, [searchParams])

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
			setDirection(direction)

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

	return (
		<AnimatePresence>
			{activeImgId !== -1 && (
				<motion.div
					initial='hidden'
					animate='visible'
					exit='hidden'
					variants={container}
					viewport={{ once: true }}
					transition={{
						duration: 0.3,
					}}
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
								width={category.images[activeImgId].width}
								height={category.images[activeImgId].height}
								quality={60}
								blurDataURL={
									category.images[activeImgId].blurData
								}
								placeholder='blur'
							/>
						</motion.div>
					</AnimatePresence>
					<div
						className='group cursor-pointer fixed h-screen w-[20%] top-0 pt-[64px] right-0 z-3 flex items-center justify-end'
						onClick={() => handleSlide(1)}
					>
						<ChevronRightIcon
							width={48}
							height={48}
							color='#FFF'
							className='p-2 opacity-60 group-hover:opacity-100 mr-4 mb-[64px]'
						/>
					</div>
					<div
						className='group cursor-pointer fixed h-screen w-[20%] top-0 left-0 pt-[64px] z-3 flex items-center justify-start'
						onClick={() => handleSlide(-1)}
					>
						<ChevronLeftIcon
							width={48}
							height={48}
							color='#FFF'
							className='p-2 opacity-60 group-hover:opacity-100 ml-4 mb-[64px]'
						/>
					</div>
					<button
						className='group fixed top-4 right-4 z-30 text-white'
						onClick={() => {
							router.push(pathname, { scroll: false })
						}}
					>
						<XMarkIcon
							width={48}
							height={48}
							color='#FFF'
							className='p-2 opacity-60 group-hover:opacity-100'
						/>
					</button>
				</motion.div>
			)}
		</AnimatePresence>
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

export default FullscreenGallery
