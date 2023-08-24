'use client'
import { ImageProps, JustifiedGridProps } from '@/_types'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ImageOverlay from './ImageOverlay'

const ColumnGrid = ({
	gallery,
	activeCategory,
	galleryRef,
	handleShare,
	handleDownload,
}: JustifiedGridProps) => {
	const [windowWidth, setWindowWidth] = useState(0)
	const computeColumns = (width: number): number => {
		if (width < 350) return 1
		if (width >= 350 && width < 768) return 2 // 'sm'
		if (width >= 768 && width < 1024) return 3 // 'md'
		if (width >= 1024 && width < 1280) return 4 // 'lg'
		if (width >= 1280 && width < 1536) return 5 // 'xl'
		return 6 // '2xl' and above
	}

	const [numColumns, setNumColumns] = useState(1)
	const [columns, setColumns] = useState<ImageProps[][]>(
		Array.from({ length: numColumns }, () => [])
	)
	useEffect(() => {
		setNumColumns(computeColumns(window.innerWidth))
		setWindowWidth(window.innerWidth)
	}, [])
	useEffect(() => {
		const handleResize = () => {
			const newWidth = window.innerWidth
			setWindowWidth(newWidth)
			const newNumColumns = computeColumns(newWidth)
			if (newNumColumns !== numColumns) {
				setNumColumns(newNumColumns)
			}
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [numColumns])

	const totalHeight = (column: ImageProps[]): number => {
		const columnWidth = windowWidth / numColumns
		return column.reduce(
			(sum, img) => sum + columnWidth / img.aspectRatio,
			0
		)
	}

	const columnWidth = windowWidth / numColumns

	useEffect(() => {
		const getShortestColumnIndex = (columns: ImageProps[][]): number => {
			return columns.reduce(
				(shortestIndex, currentColumn, currentIndex, arr) =>
					totalHeight(currentColumn) < totalHeight(arr[shortestIndex])
						? currentIndex
						: shortestIndex,
				0
			)
		}

		const newColumns: ImageProps[][] = Array.from(
			{ length: numColumns },
			() => []
		)

		activeCategory.images.forEach((img) => {
			const shortestColumnIndex = getShortestColumnIndex(newColumns)
			newColumns[shortestColumnIndex].push(img)
		})

		setColumns(newColumns)
	}, [activeCategory.images, numColumns, windowWidth])

	return (
		<ul className='w-full flex' ref={galleryRef}>
			{columns.map((column, columnIndex) => {
				return (
					<li key={`c-${columnIndex}`}>
						<ul className={`flex flex-col w-[${columnWidth}px]`}>
							{column.map((img) => {
								return (
									<motion.li
										initial={{ opacity: 0, scale: 0.9 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{ once: true }}
										transition={{
											duration: 0.3,
											delay: Math.random() * 0.3,
											ease: 'easeInOut',
										}}
										key={img.src}
										className='relative group'
									>
										<Link
											href={`/gallery/${
												gallery.galleryId
											}/${activeCategory.categoryId}?p=${
												img.id + 1
											}`}
											scroll={false}
										>
											<Image
												src={`/${img.src}`}
												alt={img.src}
												blurDataURL={img.blurData}
												placeholder='blur'
												width={columnWidth}
												height={
													columnWidth /
													img.aspectRatio
												}
												className={`h-auto ${
													columnIndex < numColumns - 1
														? 'border-r'
														: ''
												}`}
											/>
											<ImageOverlay
												handleShare={handleShare}
												id={img.id}
												src={`${process.env.NEXT_PUBLIC_IMGIX_URL}/${img.src}`}
												handleDownload={handleDownload}
											/>
										</Link>
									</motion.li>
								)
							})}
						</ul>
					</li>
				)
			})}
		</ul>
	)
}

export default ColumnGrid
