import Gallery from './_components/gallery/Gallery-col'
import { images } from './images'

export default function Home({}) {
	const gallery = images.nina
	return <Gallery {...gallery} />
}
