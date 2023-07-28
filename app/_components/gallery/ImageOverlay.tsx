import { ArrowDownTrayIcon, ShareIcon } from '@heroicons/react/24/outline'

const ImageOverlay = () => {
	return (
		<div className='w-full h-full flex items-end'>
			<div className='relative px-4 py-4 flex justify-end items-end w-full h-[20%] z-10 bg-[linear-gradient(0deg,rgba(0,0,0,0.8)10%,rgba(0,0,0,0))] opacity-0 group-hover:opacity-100 transition ease-in-out duration-150'>
				<ShareIcon
					width={48}
					height={48}
					color='#FFFFFF'
					className='p-2 cursor-pointer'
				/>
				<ArrowDownTrayIcon
					width={48}
					height={48}
					color='#FFFFFF'
					className='p-2 cursor-pointer'
				/>
			</div>
		</div>
	)
}

export default ImageOverlay
