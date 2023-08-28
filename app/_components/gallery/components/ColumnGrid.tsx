'use client'

import { ImageProps, GridGalleryProps } from '@/_types'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import OptionIcons from './OptionIcons'
import computeColumns from '@/_utils/computeColumns'

const populateColumns = (
	images: ImageProps[],
	numColumns: number,
	windowWidth: number
): ImageProps[][] => {
	const columnWidth = windowWidth / numColumns
	const totalHeight = (column: ImageProps[]): number => {
		return column.reduce(
			(sum, img) => sum + columnWidth / img.aspectRatio,
			0
		)
	}
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
	images.forEach((img) => {
		const shortestColumnIndex = getShortestColumnIndex(newColumns)
		newColumns[shortestColumnIndex].push(img)
	})

	return newColumns
}

const ColumnGrid = ({
	gallery,
	activeCategory,
	galleryRef,
	handleModalOpen,
}: GridGalleryProps) => {
	const [windowWidth, setWindowWidth] = useState(0)
	const numColumns = computeColumns(windowWidth)
	const columns = populateColumns(
		activeCategory.images,
		numColumns,
		windowWidth
	)
	const columnWidth = windowWidth / numColumns

	useEffect(() => {
		setWindowWidth(window.innerWidth)
		const handleResize = () => {
			setWindowWidth(window.innerWidth)
		}

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<ul className='w-full flex' ref={galleryRef}>
			{columns.map((column, columnIndex) => (
				<li key={`c-${columnIndex}`} className={`w-[${columnWidth}px]`}>
					<ul className='flex flex-col'>
						{column.map((img) => (
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
									href={`/gallery/${gallery.galleryId}/${
										activeCategory.categoryId
									}?p=${img.id + 1}`}
									scroll={false}
								>
									<Image
										src={`https://d3vwli3tdrxeva.cloudfront.net/${img.src}`}
										alt={img.src}
										blurDataURL={img.blurData}
										placeholder='blur'
										width={columnWidth}
										height={columnWidth / img.aspectRatio}
										className={
											columnIndex < numColumns - 1
												? 'h-auto border-r'
												: 'h-auto'
										}
									/>
									<div className='absolute top-0 w-full h-full flex items-end'>
										<div className='relative px-4 py-4 flex justify-end items-end w-full h-16 z-10 bg-[linear-gradient(0deg,rgba(0,0,0,0.8)10%,rgba(0,0,0,0))] opacity-0 group-hover:opacity-100 transition ease-in-out duration-150'>
											<OptionIcons
												handleModalOpen={
													handleModalOpen
												}
												img={img}
											/>
										</div>
									</div>
								</Link>
							</motion.li>
						))}
					</ul>
				</li>
			))}
		</ul>
	)
}

export default ColumnGrid
