import Image from 'next/image'

interface CoverImageProps {
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
}

const CoverImage = ({ img }: CoverImageProps) => {
	const currImg = window && window.innerWidth <= 768 ? img.mobile : img.web
	return (
		<Image
			src={`/${currImg.src}`}
			blurDataURL={currImg.blurData}
			alt='Cover image'
			fill
			placeholder='blur'
			quality={100}
			sizes={'100vw'}
			priority={true}
			style={{
				objectFit: 'cover',
				objectPosition: 'center',
			}}
		/>
	)
}

export default CoverImage
