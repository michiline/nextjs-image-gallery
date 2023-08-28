import { useFullScreen } from '@/_contexts/FullscreenContext'
import { useEffect } from 'react'

export default function FullscreenHandler({
	isModalOpen,
}: {
	isModalOpen: boolean
}) {
	const { isFullscreen } = useFullScreen()

	useEffect(() => {
		if (isFullscreen || isModalOpen) {
			const scrollbarWidth =
				window.innerWidth - document.documentElement.clientWidth
			document.body.style.overflow = 'hidden'
			document.body.style.paddingRight = `${scrollbarWidth}px`
		} else {
			document.body.style.overflow = 'auto'
			document.body.style.paddingRight = ''
		}
	}, [isFullscreen, isModalOpen])

	return null
}
