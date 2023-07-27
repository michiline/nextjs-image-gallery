import Gallery from './_components/gallery/Gallery'
import { galleries } from './images'

export default function Home({}) {
	const gallery = galleries.nina
	return <Gallery {...gallery} />
}
