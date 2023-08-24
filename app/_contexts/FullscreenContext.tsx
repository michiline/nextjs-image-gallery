'use client'
import React, {
	createContext,
	useState,
	useCallback,
	FC,
	ReactNode,
	useContext,
} from 'react'

// Define the shape of your context
interface FullscreenContextProps {
	isFullscreen: boolean
	enterFullscreen: () => void
	exitFullscreen: () => void
}

// Create your context with a default value of undefined
// In this case, we need to specify the type of the context to be
// either FullscreenContextProps or undefined
const FullscreenContext = createContext<FullscreenContextProps>({
	isFullscreen: false,
	enterFullscreen: () => {},
	exitFullscreen: () => {},
})

// Define the shape of the Provider props
interface FullscreenProviderProps {
	children: ReactNode
}

export const FullscreenProvider: FC<FullscreenProviderProps> = ({
	children,
}) => {
	const [isFullscreen, setIsFullscreen] = useState(false)

	const enterFullscreen = useCallback(() => setIsFullscreen(true), [])
	const exitFullscreen = useCallback(() => setIsFullscreen(false), [])

	return (
		<FullscreenContext.Provider
			value={{ isFullscreen, enterFullscreen, exitFullscreen }}
		>
			{children}
		</FullscreenContext.Provider>
	)
}

export function useFullScreen() {
	const { isFullscreen, enterFullscreen, exitFullscreen } =
		useContext(FullscreenContext)

	return { isFullscreen, enterFullscreen, exitFullscreen }
}

export default FullscreenContext
