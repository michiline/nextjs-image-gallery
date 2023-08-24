'use client'

import { usePathname, useSearchParams } from 'next/navigation'

import Modal from './Modal'
import createQuery from '@/_utils/createQuery'

const SharedModal = ({
	sharedImgId,
	...props
}: {
	show: boolean
	handleClose: () => void
	sharedImgId: number
}) => {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const query = createQuery({
		searchParams,
		name: 'p',
		value: sharedImgId.toString(),
		operation: 'add',
	})
	const imgUrl = `${process.env.NEXT_PUBLIC_HOSTNAME}${pathname}${query}`
	const copyUrl = () => {
		navigator.clipboard.writeText(imgUrl)
	}
	return (
		<Modal {...props}>
			<div className='max-w-[450px] w-full p-4 m-2 bg-white'>
				<h3 className='text-2xl'>Share</h3>
				<p className='w-full outline-none bg-gray-200 mt-4 p-2'>
					{imgUrl}
				</p>
				<button
					className='w-full p-2 mt-4 uppercase text-white bg-gray-700'
					onClick={copyUrl}
				>
					Copy
				</button>
			</div>
		</Modal>
	)
}

export default SharedModal
