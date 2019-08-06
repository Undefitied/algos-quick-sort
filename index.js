const fs = require('fs')
const { quickSortWithComparisons } = require('./mainParts/quickSort')
const {
	choosePivotByFirstIndex,
	choosePivotByLastIndex,
	choosePivotByLMedianOfThere,
} = require('./mainParts/choosePivotIndex')

fs.readFile('./data.txt', 'utf8', (err, data) => {
	if (err) throw err;

	const input = data.split('\r\n').map(s => parseInt(s, 10))

	// const debugInput = [10, 3, 8, 9, 1, 11, 0, 2, 6, 44]

	const byFirstIndex = quickSortWithComparisons(input, choosePivotByFirstIndex)
	console.log('byFirstIndex', byFirstIndex.totalNumberOfComparisons)

	const byLastIndex = quickSortWithComparisons(input, choosePivotByLastIndex)
	console.log('byLastIndex', byLastIndex.totalNumberOfComparisons)

	const byMedianOfThree = quickSortWithComparisons(input, choosePivotByLMedianOfThere)
	console.log('byMedianOfThree', byMedianOfThree.totalNumberOfComparisons)
})