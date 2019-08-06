module.exports = (array, initialPivotIndex) => {
	const pivotIndex = 0

	if (initialPivotIndex === pivotIndex) {
		return {
			array,
			pivotIndex
		}
	}

	const temp = array[initialPivotIndex]
	array[initialPivotIndex] = array[pivotIndex]
	array[pivotIndex] = temp

	return {
		array,
		pivotIndex
	}
}