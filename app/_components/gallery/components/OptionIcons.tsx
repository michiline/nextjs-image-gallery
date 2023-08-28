import { ImageProps, ModalProps } from '@/_types'
import { ArrowDownTrayIcon, ShareIcon } from '@heroicons/react/24/outline'

interface OptionIcons {
	img: ImageProps
	handleModalOpen: (params: ModalProps) => void
}

const OptionIcons = ({ img, handleModalOpen }: OptionIcons) => {
	const handleShare = ({
		e,
		img,
	}: {
		e: React.MouseEvent<SVGSVGElement, MouseEvent>
		img: ImageProps
	}) => {
		e.preventDefault()
		handleModalOpen({
			type: 'share',
			data: (img.id + 1).toString(),
		})
	}
	const handleDownload = ({
		e,
		img,
	}: {
		e: React.MouseEvent<SVGSVGElement, MouseEvent>
		img: ImageProps
	}) => {
		e.preventDefault()
		handleModalOpen({
			type: 'download',
			data: `${process.env.NEXT_PUBLIC_IMGIX_URL}/${img.src}`,
		})
	}
	return (
		<div className='flex'>
			<ShareIcon
				width={40}
				height={40}
				color='#FFFFFF'
				className='p-2 cursor-pointer z-30 opacity-60 hover:opacity-100'
				onClick={(e) => handleShare({ e, img })}
			/>
			<ArrowDownTrayIcon
				width={40}
				height={40}
				color='#FFFFFF'
				className='p-2 cursor-pointer z-30 opacity-60 hover:opacity-100'
				onClick={(e) => handleDownload({ e, img })}
			/>
		</div>
	)
}

export default OptionIcons
