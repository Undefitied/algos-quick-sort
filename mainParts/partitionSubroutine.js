const preprocessAnArray = require('./preprocessAnArray')

// designed in a way to work always with pivotIndex === 0
// (if choosePivotIndex() returns other index than zero, we use preprocessAnArray() to swap)
module.exports = (initialArray, initialPivotIndex) => {
	const {
		array,
		pivotIndex
	} = preprocessAnArray(initialArray, initialPivotIndex)

	const pivot = array[pivotIndex]

	const start = pivotIndex + 1
	const end = array.length
	let i = start

	for (let j = start; j < end; j++) {
		if (array[j] < pivot) {
			const temp = array[j]
			array[j] = array[i]
			array[i] = temp
			i++
		}
	}

	// swap A[i] and pivot
	const pivotNewIndex = i - 1

	const temp = array[pivotIndex]
	array[pivotIndex] = array[pivotNewIndex]
	array[pivotNewIndex] = temp

	const leftHalf = array.slice(0, pivotNewIndex)
	const rightHalf = array.slice(pivotNewIndex + 1)

	return {
		leftHalf,
		rightHalf,
		pivot,
	}
}
