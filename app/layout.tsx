import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { FullscreenProvider } from '@/_contexts/FullscreenContext'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'NextJS Image Gallery',
	description: 'NextJS justified grid & fullscreen image gallery',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={nunito.className}>
				<FullscreenProvider>{children}</FullscreenProvider>
			</body>
		</html>
	)
}
