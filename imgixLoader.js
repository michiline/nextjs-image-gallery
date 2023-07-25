export default function imgixLoader({ src, width, quality }) {
	const url = new URL(`https://image-gallery-mivandic.imgix.net${src}`)
	const params = url.searchParams
	params.set('auto', params.getAll('auto').join(',') || 'format')
	params.set('fit', params.get('fit') || 'max')
	params.set('w', params.get('w') || width.toString())
	params.set('q', (quality || 75).toString())
	return url.href
}
