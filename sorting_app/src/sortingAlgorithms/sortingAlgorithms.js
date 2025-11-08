export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}



export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  quickSortHelper(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
  return animations;
}

function quickSortHelper(array, low, high, animations) {
  if (low < high) {
    const pivotIdx = partition(array, low, high, animations);
    quickSortHelper(array, low, pivotIdx - 1, animations);
    quickSortHelper(array, pivotIdx + 1, high, animations);
  }
}

function partition(array, low, high, animations) {
  const pivot = array[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    animations.push(["compare", j, high]); // Highlight comparison
    animations.push(["revert", j, high]);  // Revert color

    if (array[j] < pivot) {
      i++;
      // Swap array[i] and array[j]
      swap(array, i, j, animations);
    }
  }

  // Swap pivot into correct place
  swap(array, i + 1, high, animations);
  return i + 1;
}

function swap(array, i, j, animations) {
  if (i === j) return;
  animations.push(["compare", i, j]);
  animations.push(["revert", i, j]);

  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;

  // Animate height change
  animations.push(["swap", i, array[i]]);
  animations.push(["swap", j, array[j]]);
}


export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const n = array.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, animations);
  }

  // One by one extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    // Swap root (max) with last element
    animations.push(["compare", 0, i]);
    animations.push(["revert", 0, i]);
    swap(array, 0, i, animations);

    // Heapify reduced heap
    heapify(array, i, 0, animations);
  }

  return animations;
}

function heapify(array, n, i, animations) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // Compare left child
  if (left < n) {
    animations.push(["compare", left, largest]);
    animations.push(["revert", left, largest]);
    if (array[left] > array[largest]) largest = left;
  }

  // Compare right child
  if (right < n) {
    animations.push(["compare", right, largest]);
    animations.push(["revert", right, largest]);
    if (array[right] > array[largest]) largest = right;
  }

  // If largest is not root
  if (largest !== i) {
    heapswap(array, i, largest, animations);
    heapify(array, n, largest, animations);
  }
}

function heapswap(array, i, j, animations) {
  if (i === j) return;
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;

  animations.push(["compare", i, j]);
  animations.push(["revert", i, j]);
  animations.push(["swap", i, array[i]]);
  animations.push(["swap", j, array[j]]);
}



export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array.slice();

  const arr = array.slice();
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Highlight the compared bars
      animations.push(["compare", j, j + 1]);
      animations.push(["revert", j, j + 1]);

      if (arr[j] > arr[j + 1]) {
        // Swap the bars visually
        bubbleSwap(arr, j, j + 1, animations);
      }
    }
  }

  return animations;
}

function bubbleSwap(array, i, j, animations) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;

  animations.push(["compare", i, j]);
  animations.push(["revert", i, j]);
  animations.push(["swap", i, array[i]]);
  animations.push(["swap", j, array[j]]);
}

