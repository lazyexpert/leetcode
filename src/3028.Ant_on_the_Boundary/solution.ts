function returnToBoundaryCount(nums: number[]): number {
  let cnt = 0;
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (sum === 0) cnt++;
  }

  return cnt;
};
