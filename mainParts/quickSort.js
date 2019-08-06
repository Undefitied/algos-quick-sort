const partitionSubroutine = require('./partitionSubroutine')

// this calculation is part of the task (homework)
const quickSortWithComparisons = (array, choosePivotIndexWithConfig) => {
    let totalNumberOfComparisons = 0;

    const newArrayInstance = JSON.parse(JSON.stringify(array))
    const sortedArray = quickSort(newArrayInstance, choosePivotIndexWithConfig, arrayFromCallback => {
        totalNumberOfComparisons += arrayFromCallback.length - 1
    })

    return {
        totalNumberOfComparisons,
        sortedArray,
    }
}

const quickSort = (array, choosePivotIndexWithConfig, callback) => {
    // 1. select random pivot
    // 2. create left half, less than pivot
    // 3. create right half, bigger than pivot
    // 4. recurse each part
    if (array.length <= 1) {
        return array
    }

    callback(array)

    const pivotIndex = choosePivotIndexWithConfig(array)

    const {
        leftHalf,
        rightHalf,
        pivot,
    } = partitionSubroutine(array, pivotIndex)

    const combined = [
        ...quickSort(leftHalf, choosePivotIndexWithConfig, callback),
        pivot,
        ...quickSort(rightHalf, choosePivotIndexWithConfig, callback),
    ]

    return combined
}

module.exports = {
    quickSort,
    quickSortWithComparisons,
}
