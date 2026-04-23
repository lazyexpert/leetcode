function maxOperations(nums: number[], k: number): number {
  let ops = 0;
  nums.sort((a,b) => a - b);

  let i = 0;
  let j = nums.length - 1;

  while (i < j) {
    const a = nums[i];
    const b = nums[j];
    const sum = a + b;
    if (sum === k) {
      ops++;
      j--;
      i++;
    } else if (sum > k) {
      j--;
    } else {
      i++
    }
  }

  return ops;
};
