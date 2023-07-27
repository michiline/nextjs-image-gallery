'use client'
import Image from 'next/image'
import Overlay from './Overlay'
import dynamic from 'next/dynamic'

const DynamicCoverImage = dynamic(() => import('./CoverImage'), { ssr: false })

interface CoverProps {
	id: string
	img: {
		mobile: {
			src: string
			blurData: string
		}
		web: {
			src: string
			blurData: string
		}
	}
	handleClick: () => void
}

const Cover = ({ id, img, handleClick }: CoverProps) => {
	return (
		<div className='w-full h-screen relative flex justify-center items-center'>
			<DynamicCoverImage img={img} />
			<Overlay />
			<div className='flex flex-col justify-center items-center z-10 text-white'>
				<h1 className='h-min text-6xl text-center'>{id}</h1>
				<button
					onClick={handleClick}
					className='border border-white h-[45px] px-8 mt-8 text-md hover:bg-white hover:text-black transition ease-in-out duration-150'
				>
					View Gallery
				</button>
			</div>
		</div>
	)
}

export default Cover
