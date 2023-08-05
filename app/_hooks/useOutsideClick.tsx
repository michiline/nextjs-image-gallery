import { useEffect, useRef, RefObject } from 'react'

const useOutsideClick = (handler: () => void): RefObject<HTMLDivElement> => {
	const nodeRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				nodeRef.current &&
				!nodeRef.current.contains(event.target as Node)
			) {
				handler()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [handler])

	return nodeRef
}

export default useOutsideClick
