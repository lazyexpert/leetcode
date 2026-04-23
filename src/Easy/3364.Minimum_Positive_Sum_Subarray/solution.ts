// [1,2,-3,-4,5,6], l-1, r-2
function minimumSumSubarray(nums: number[], l: number, r: number): number {
  // for each possible size
  let minSum = Infinity;
  for (let windowSize = l; windowSize <= r; windowSize++) {
    let left = 0;
    let right = windowSize;
    let sum = 0;
    
    // collect initial sum for the given size i
    for (let j = left; j < right; j++) {
      sum += nums[j];
    }

    if (sum > 0) minSum = Math.min(minSum, sum);

    // run a while loop calculating min sum and moving left and right boundaries until reach end
    while (right < nums.length) {
      sum -= nums[left];
      sum += nums[right];
      left++;
      right++;
      if (sum > 0) minSum = Math.min(minSum, sum);
    }
  }

  // return sum if greater than 0 or -1
  return minSum === Infinity ? -1 : minSum;
};

minimumSumSubarray([3,-2,1,4], 2, 3);
