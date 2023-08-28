import { ModalType } from '@/_hooks/useActiveImage'
import createQuery from '@/_utils/createQuery'
import { usePathname, useSearchParams } from 'next/navigation'

const ModalContent = ({
	modalType,
	data,
}: {
	modalType: ModalType | null
	data: string | null
}) => {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	if (modalType === 'download' && data) {
		return (
			<div className='max-w-[450px] w-full p-4 m-2 bg-white'>
				<h3 className='text-2xl'>Download</h3>
				<a
					href={data}
					target='_blank'
					rel={'noreferrer'}
					title='Download image'
					download
				>
					<p className='w-full outline-none bg-gray-200 mt-4 p-2'>
						{data}
					</p>
				</a>
				<a
					href={data}
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
		)
	}
	if (modalType === 'share' && data) {
		const query = createQuery({
			searchParams,
			name: 'p',
			value: data,
			operation: 'add',
		})
		const imgUrl = `${process.env.NEXT_PUBLIC_HOSTNAME}${pathname}${query}`
		const copyUrl = () => {
			navigator.clipboard.writeText(imgUrl)
		}
		return (
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
		)
	}

	return null
}

export default ModalContent
