// FullscreenHandler.tsx
import { useEffect } from 'react'
import { useFullScreen } from '@/_contexts/FullscreenContext'

export default function FullscreenHandler() {
	const { isFullscreen } = useFullScreen()

	useEffect(() => {
		if (isFullscreen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [isFullscreen])

	return null
}
