const computeColumns = (width: number): number => {
	if (width < 350) return 1
	if (width >= 350 && width < 768) return 2
	if (width >= 768 && width < 1024) return 3
	if (width >= 1024 && width < 1280) return 4
	if (width >= 1280 && width < 1536) return 5
	return 6
}

export default computeColumns
