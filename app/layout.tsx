import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { FullscreenProvider } from '@/_contexts/FullscreenContext'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
	metadataBase: new URL('https://gallery.mivandic.com'),
	title: 'NextJS Image Gallery',
	description: `NextJS justified grid and fullscreen gallery.`,
	openGraph: {
		type: 'website',
		siteName: 'NextJS Image Gallery',
		description: `NextJS justified grid and fullscreen gallery.`,
		title: 'NextJS Image Gallery',
		url: `https://gallery.mivandic.com`,
	},
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
