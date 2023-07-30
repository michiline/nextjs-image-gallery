import Link from 'next/link'

export default function Home({}) {
	return (
		<div className='flexw-full px-6 py-6'>
			<h1 className='text-lg font-bold'>NextJS Image Gallery</h1>
			<p className='pt-4'>
				Image gallery which consists of justified grid and full screen
				gallery. Built with NextJS and TailwindCSS.
			</p>
			<Link href='/gallery/nina'>
				<button className='border border-black h-[45px] px-8 mt-8 text-md hover:bg-black hover:text-white transition ease-in-out duration-150'>
					View Gallery
				</button>
			</Link>
		</div>
	)
}
