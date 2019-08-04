const fs = require('fs')

fs.readFile('./data.txt', 'utf8', (err, data) => {
    if (err) throw err;

    const input = data.split('\r\n').map(s => parseInt(s, 10))

    const debugInput = [10, 3, 8, 9, 1, 11, 0, 2, 6, 44]

    // const {
    //     sortedArray: resultByFirstElement,
    //     totalNumberOfComparisons: totalNumberOfComparisonsByFirstElement,
    // } = quickSortWithComparisons(input, choosePivotByFirstIndex)
    // const resultByFirstElement = quickSortWithComparisons(debugInput, choosePivotByFirstIndex)
    const {
        sortedArray: resultByLastElement,
        totalNumberOfComparisons,
    } = quickSortWithComparisons(input, choosePivotByLastIndex)
    // const resultByLastElement = quickSortWithComparisons(debugInput, choosePivotByLastIndex)
    // const resultByMedianOfThree = quickSortWithComparisons(debugInput, partitionSubroutineByMedianOfThree)
    // const result = quickSortWithComparisons(debugInput)
    // console.log('resultByFirstElement', resultByFirstElement)
    // console.log('resultByLastElement', resultByLastElement)
    // console.log('resultByMedianOfThree', resultByMedianOfThree)
    // console.log('totalNumberOfComparisonsByFirstElement', totalNumberOfComparisonsByFirstElement)
    console.log('totalNumberOfComparisons', totalNumberOfComparisons)
})

const getRandomInt = (min, max) => {
    // including min, not including max
    return Math.floor(Math.random() * (max - min)) + min;
}

const preprocessAnArray = (array, initialPivotIndex) => {
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

const choosePivotByFirstIndex = array => choosePivotIndex(array, PIVOT_SELECTION_RULES.BY_FIRST)
const choosePivotByLastIndex = array => choosePivotIndex(array, PIVOT_SELECTION_RULES.BY_LAST)
const choosePivotIndex = (array, rule) => {
    switch (rule) {
        case PIVOT_SELECTION_RULES.BY_FIRST:
            return 0

        case PIVOT_SELECTION_RULES.BY_LAST:
            return array.length - 1

        case PIVOT_SELECTION_RULES.BY_MEDIAN_OF_THREE:
            // const middleIndex = Math.floor(array.length / 2)
            // const lastIndex = array.length - 1
            // const medianSet = {
            //     [array[0]]: 0,
            //     [array[middleIndex]]: middleIndex,
            //     [array[lastIndex]]: lastIndex,
            // }
            //
            // let medianSetOfItemsSorted = quickSort(Object.keys(medianSet).map(s => parseInt(s, 10)), partitionSubroutineByFirstElement)
            //
            // const byFirstConfig = getPartitionSubroutineConfig({
            //     rule: PIVOT_SELECTION_RULES.BY_FIRST,
            //     array
            // })
            //
            // pivotIndex = medianSet[medianSetOfItemsSorted[1]]
            // start = byFirstConfig.start
            // end = byFirstConfig.end
            // getPivotNewIndex = byFirstConfig.getPivotNewIndex
            //
            // preprocessAnArray = (array, pivotIndex) => {
            //     if (pivotIndex === 0) {
            //         return array
            //     }
            //
            //     const temp = array[pivotIndex]
            //     array[pivotIndex] = array[0]
            //     array[0] = temp
            //
            //     return array
            // }

            // preprocessing of array
            // - put pivot to the beginning
            break;

        default:
            return getRandomInt(0, array.length)
    }
}

// this calculation is part of the task (homework)
const quickSortWithComparisons = (array, choosePivotIndexWithConfig) => {
    let totalNumberOfComparisons = 0;

    const sortedArray = quickSort(array, choosePivotIndexWithConfig, array => {
        totalNumberOfComparisons += array.length
    })

    return {
        totalNumberOfComparisons,
        sortedArray,
    }
}

// finished with issue: totalNumberOfComparisons get different result with multiple invocations (vs single call)

const quickSort = (array, choosePivotIndexWithConfig, callback) => {
    callback(array)

    // 1. select random pivot
    // 2. create left half, less than pivot
    // 3. create right half, bigger than pivot
    // 4. recurse each part
    if (array.length <= 1) {
        return array
    }

    const {
        leftHalf,
        rightHalf,
        pivot,
    } = partitionSubroutine(array, choosePivotIndexWithConfig)

    const combined = [
        ...quickSort(leftHalf, choosePivotIndexWithConfig, callback),
        pivot,
        ...quickSort(rightHalf, choosePivotIndexWithConfig, callback),
    ]

    return combined
}

const partitionSubroutine = (initialArray, choosePivotIndexWithConfig) => {
    // console.log('---partitionSubroutine---')
    const initialPivotIndex = choosePivotIndexWithConfig(initialArray)
    // console.log('initialPivotIndex', initialPivotIndex)
    // console.log('initialArray', initialArray)

    const {
        array,
        pivotIndex
    } = preprocessAnArray(initialArray, initialPivotIndex)
    const pivot = array[pivotIndex]
    // console.log('array', array)
    // console.log('pivotIndex', pivotIndex)
    // console.log('pivot', pivot)

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
    // console.log('leftHalf', leftHalf)
    // console.log('rightHalf', rightHalf)
    //
    // console.log('---//partitionSubroutine---')
    return {
        leftHalf,
        rightHalf,
        pivot,
    }
}

const PIVOT_SELECTION_RULES = {
    BY_FIRST: 'BY_FIRST',
    BY_LAST: 'BY_LAST',
    BY_MEDIAN_OF_THREE: 'BY_MEDIAN_OF_THREE'
}
