import Link from 'next/link'
import { motion } from 'framer-motion'
import { GridGalleryProps } from '@/_types'
import Image from 'next/image'
import OptionIcons from './OptionIcons'

const JustifedGrid = ({
	gallery,
	activeCategory,
	galleryRef,
	handleModalOpen,
}: GridGalleryProps) => {
	return (
		<ul
			className='w-full flex flex-wrap h-full list-none sm:[&>*:last-child]:grow-0'
			ref={galleryRef}
		>
			{activeCategory?.images.map((img, index) => {
				const aspectRatio =
					img.aspectRatio > 1 ? ' aspect-[3/2]' : 'aspect-[2/3]'
				return (
					<li
						key={img.src}
						className={`cursor-pointer group w-full h-auto smLandscape:w-full smLandscape:h-auto md:h-[20vh] md:w-auto lg:h-[25vh] xl:h-[30vh] 2xl:h-[35vh] ${aspectRatio} grow mx-[0.5px] my-[0.5px] lg:mx-1 lg:my-1 overflow-hidden`}
					>
						<Link
							key={img.src}
							href={`/gallery/${gallery.galleryId}/${
								activeCategory.categoryId
							}?p=${index + 1}`}
							scroll={false}
							className={`relative w-full h-full inline-block`}
						>
							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.3,
								}}
							>
								<Image
									src={`/${img.src}`}
									alt={img.src}
									blurDataURL={img.blurData}
									placeholder='blur'
									style={{
										objectFit: 'cover',
										objectPosition: 'top',
									}}
									width={img.width}
									height={img.height}
									quality={30}
								/>
								<div className='absolute top-0 w-full h-full flex items-end'>
									<div className='relative px-4 py-4 flex justify-end items-end w-full h-[20%] z-10 bg-[linear-gradient(0deg,rgba(0,0,0,0.8)10%,rgba(0,0,0,0))] opacity-0 group-hover:opacity-100 transition ease-in-out duration-150'>
										<OptionIcons
											handleModalOpen={handleModalOpen}
											img={img}
										/>
									</div>
								</div>
							</motion.div>
						</Link>
					</li>
				)
			})}
		</ul>
	)
}

export default JustifedGrid
