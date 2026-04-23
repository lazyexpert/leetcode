function shuffle(nums: number[], n: number): number[] {
  const result: number[] = new Array(nums.length);
  let left = 0;
  let right = n;
  let current = 0;
  while (left < n) {
    const leftItem = nums[left++];
    const rightItem = nums[right++];
    result[current++] = leftItem;
    result[current++] = rightItem;
  }

  return result;
};
