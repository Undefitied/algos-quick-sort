const { quickSort } = require('./quickSort')
const getRandomInt = require('../utils/getRandomInt')

const PIVOT_SELECTION_RULES = {
	BY_FIRST: 'BY_FIRST',
	BY_LAST: 'BY_LAST',
	BY_MEDIAN_OF_THREE: 'BY_MEDIAN_OF_THREE'
}

const choosePivotByFirstIndex = array => choosePivotIndex(array, PIVOT_SELECTION_RULES.BY_FIRST)
const choosePivotByLastIndex = array => choosePivotIndex(array, PIVOT_SELECTION_RULES.BY_LAST)
const choosePivotByLMedianOfThere = array => choosePivotIndex(array, PIVOT_SELECTION_RULES.BY_MEDIAN_OF_THREE)
const choosePivotIndex = (array, rule) => {
	switch (rule) {
		case PIVOT_SELECTION_RULES.BY_FIRST:
			return 0

		case PIVOT_SELECTION_RULES.BY_LAST:
			return array.length - 1

		case PIVOT_SELECTION_RULES.BY_MEDIAN_OF_THREE:
			const middleIndex = Math.floor(array.length / 2) - (array.length % 2 === 0 ? 1 : 0)
			const lastIndex = array.length - 1
			const medianSet = {
				[array[0]]: 0,
				[array[middleIndex]]: middleIndex,
				[array[lastIndex]]: lastIndex,
			}

			// console.log('----')
			// console.log('array', array)
			// console.log('medianSet', medianSet)

			let medianSetOfItemsSorted = quickSort(
				Object
					.keys(medianSet)
					.map(s => parseInt(s, 10)),
				choosePivotByFirstIndex,
				() => {}
			)

			const pivotIndex = medianSet[medianSetOfItemsSorted[1]]

			// console.log('pivotIndex', pivotIndex)
			//   console.log('--//--')

			return pivotIndex

		default:
			return getRandomInt(0, array.length)
	}
}

module.exports = {
	choosePivotByFirstIndex,
	choosePivotByLastIndex,
	choosePivotByLMedianOfThere,
	choosePivotIndex,
}
