function findMin(nums: number[]): number {
  const firstEl = nums[0];
  let r = nums.length - 1;
  let l = 0;
  let i = 0;

  while (l < r) {
    i = l + Math.floor((r-l)/2);
    if (nums[i] < firstEl) {
      r = i;
    } else {
      l = i + 1;
    }
  }

  return nums[r] < firstEl ? nums[r] : firstEl;
};

findMin([2,1]);
