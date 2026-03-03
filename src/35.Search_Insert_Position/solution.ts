function searchInsert(nums: number[], target: number): number {
  let l = 0;
  let r = nums.length - 1;
  let i = 0;

  while (l <= r) {
    i = l + Math.floor((r - l) / 2);
    if (nums[i] === target) return i;
    if (nums[i] < target) {
      l = i + 1;
    } else {
      r = i - 1;
    }
  }

  return l;
};

searchInsert([1,3,5,6], 2);
