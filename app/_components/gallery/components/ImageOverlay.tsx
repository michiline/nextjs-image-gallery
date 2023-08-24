import { ArrowDownTrayIcon, ShareIcon } from '@heroicons/react/24/outline'

interface ImageOverlayProps {
	handleShare: (obj: {
		e: React.MouseEvent<SVGSVGElement, MouseEvent>
		id: number
	}) => void
	id: number
	src: string
	handleDownload: (obj: {
		e: React.MouseEvent<SVGSVGElement, MouseEvent>
		src: string
	}) => void
}

const ImageOverlay = ({
	handleShare,
	id,
	src,
	handleDownload,
}: ImageOverlayProps) => {
	return (
		<div className='absolute top-0 w-full h-full flex items-end'>
			<div className='relative px-4 py-4 flex justify-end items-end w-full h-[20%] z-10 bg-[linear-gradient(0deg,rgba(0,0,0,0.8)10%,rgba(0,0,0,0))] opacity-0 group-hover:opacity-100 transition ease-in-out duration-150'>
				<ShareIcon
					width={40}
					height={40}
					color='#FFFFFF'
					className='p-2 cursor-pointer z-30 opacity-60 hover:opacity-100'
					onClick={(e) => handleShare({ e, id })}
				/>
				<ArrowDownTrayIcon
					width={40}
					height={40}
					color='#FFFFFF'
					className='p-2 cursor-pointer z-30 opacity-60 hover:opacity-100'
					onClick={(e) => handleDownload({ e, src })}
				/>
			</div>
		</div>
	)
}

export default ImageOverlay
