import { ReadonlyURLSearchParams } from 'next/navigation'

const createQuery = ({
	searchParams,
	name,
	value,
	operation,
}: {
	searchParams: ReadonlyURLSearchParams
	name: string
	value: string
	operation: string
}) => {
	const params = new URLSearchParams(searchParams.toString())
	if (operation === 'add') {
		params.set(name, value)
	} else {
		params.delete(name)
	}
	return params.toString() ? `?${params.toString()}` : ''
}

export default createQuery
