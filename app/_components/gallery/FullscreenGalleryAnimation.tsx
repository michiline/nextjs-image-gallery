'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { CategoryProps, ImageDimensionsProps } from '../../_types'
import { useCallback, useEffect, useState } from 'react'
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'
import createQuery from '../../_utils/createQuery'

const FullscreenGallery = ({
	category,
	dim,
}: {
	category: CategoryProps
	dim: ImageDimensionsProps
}) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const [activeImgId, setActiveImgId] = useState<number>(-1)
	useEffect(() => {
		const photoId = searchParams.get('p')
		if (photoId) {
			const activeImgId = Number(photoId) - 1
			setActiveImgId(activeImgId)
		} else {
			setActiveImgId(-1)
		}
	}, [searchParams])

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
					searchParams,
				})

				router.push(pathname + query, {
					scroll: false,
				})
			}
		},
		[activeImgId, category.images.length, pathname, router, searchParams]
	)
	console.log(dim)
	return (
		<>
			<AnimatePresence mode='popLayout'>
				{activeImgId !== -1 && dim && (
					<>
						<motion.div
							key={category.images[activeImgId].src}
							initial={{
								left: dim.x,
								top: dim.y,
								width: dim.width,
								height: dim.height,
								position: 'fixed',
							}}
							animate={{
								left: '50%',
								top: '50%',
								width: '100vw',
								height: '100vh',
								x: '-50%',
								y: '-50%',
								transition: {
									type: 'spring',
									stiffness: 300,
									damping: 30,
								},
								zIndex: 10,
							}}
							exit={{
								left: dim.x,
								top: dim.y,
								width: dim.width,
								height: dim.height,
								x: 0,
								y: 0,
							}}
							style={{
								maxWidth: category.images[activeImgId].width,
								maxHeight: category.images[activeImgId].height,
								display: 'flex', // Add this
								alignItems: 'center', // Add this
								justifyContent: 'center', // Add this
							}}
						>
							<Image
								src={`/${category.images[activeImgId].src}`}
								alt='alt'
								width={category.images[activeImgId].width}
								height={category.images[activeImgId].height}
								quality={30}
								blurDataURL={
									category.images[activeImgId].blurData
								}
								placeholder='blur'
							/>
						</motion.div>

						<div
							className='group cursor-pointer fixed h-screen w-[20%] top-0 pt-[64px] right-0 z-30 flex items-center justify-end'
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
							className='group cursor-pointer fixed h-screen w-[20%] top-0 left-0 pt-[64px] z-30 flex items-center justify-start'
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
					</>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{activeImgId !== -1 && (
					<motion.div
						className='fixed top-0 w-full min-h-screen h-full bg-black'
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: 1,
							transition: {
								duration: 0.5,
							},
						}}
						exit={{
							opacity: 0,
						}}
					/>
				)}
			</AnimatePresence>
		</>
	)
}

export default FullscreenGallery
