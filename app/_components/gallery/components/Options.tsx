import { ArrowDownTrayIcon, ShareIcon } from '@heroicons/react/24/outline'

const Options = ({}) => {
	return (
		<div className='flex'>
			<ShareIcon
				width={40}
				height={40}
				color='#FFFFFF'
				className='p-2 cursor-pointer z-30 opacity-60 hover:opacity-100'
			/>
			<ArrowDownTrayIcon
				width={40}
				height={40}
				color='#FFFFFF'
				className='p-2 cursor-pointer z-30 opacity-60 hover:opacity-100'
			/>
		</div>
	)
}

export default Options
