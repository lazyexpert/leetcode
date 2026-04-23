function maxChunksToSorted(arr: number[]): number {
  let properSum = 0;
  let currentSum = 0;
  let slices = 0;
  for (let i = 0; i < arr.length; i++) {
    const x = arr[i];
    properSum += i;
    currentSum += x;

    if (properSum === currentSum) {
      slices++;
    }
  }

  return slices;
};

maxChunksToSorted([1,0,2,3,4]);
