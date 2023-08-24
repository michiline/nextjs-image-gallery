import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import Cover from '@/_components/cover/Cover'
import Link from 'next/link'
import { CategoryProps, GalleryProps } from '@/_types'

interface HeaderProps {
	gallery: GalleryProps
	handleClick: () => void
	activeCategory: CategoryProps
}

const Header = ({ gallery, handleClick, activeCategory }: HeaderProps) => {
	return (
		<>
			<div className='w-full flex flex-col relative'>
				<Cover
					id={gallery.galleryId}
					img={gallery.cover}
					handleClick={handleClick}
				/>
				<div className='w-full flex px-4 py-2 justify-between items-center'>
					<h2 className='text-2xl'>Logo </h2>
					<div className='flex'>
						<ArrowDownTrayIcon
							width={40}
							height={40}
							color='#000'
							className='p-2 cursor-pointer opacity-60 hover:opacity-100'
						/>
					</div>
				</div>
			</div>
			<div className='flex w-full px-2 py-2'>
				{gallery.categories.map(({ categoryId }) => (
					<Link
						key={categoryId}
						href={`/gallery/${gallery.galleryId}/${categoryId}`}
						scroll={false}
						className='flex items-center'
					>
						<h2
							className={`text-md px-2 uppercase text-center hover:opacity-100 transition ease-in-out duration-150 ${
								categoryId === activeCategory?.categoryId
									? 'font-bold opacity-100'
									: 'opacity-60'
							}`}
						>
							{`${categoryId}`}
						</h2>
					</Link>
				))}
			</div>
		</>
	)
}

export default Header
