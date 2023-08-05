'use client'

import Modal from './Modal'

const DownloadModal = ({
	downloadImgSrc,
	...props
}: {
	show: boolean
	handleClose: () => void
	downloadImgSrc: string
}) => {
	return (
		<Modal {...props}>
			<div className='max-w-[450px] w-full p-4 m-2 bg-white'>
				<h3 className='text-2xl'>Download</h3>
				<a
					href={downloadImgSrc}
					target='_blank'
					rel={'noreferrer'}
					title='Download image'
					download
				>
					<p className='w-full outline-none bg-gray-200 mt-4 p-2'>
						{downloadImgSrc}
					</p>
				</a>
				<a
					href={downloadImgSrc}
					target='_blank'
					rel={'noreferrer'}
					title='Download image'
					download
				>
					<button className='w-full p-2 mt-4 uppercase text-white bg-gray-700'>
						Download
					</button>
				</a>
			</div>
		</Modal>
	)
}

export default DownloadModal
