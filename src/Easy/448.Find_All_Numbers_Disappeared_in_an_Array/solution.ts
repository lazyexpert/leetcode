function findDisappearedNumbers(nums: number[]): number[] {
  const n = nums.length;
  const result: number[] = [];

  // In place marking
  for (let i = 0; i < n; i++) {
    const item = Math.abs(nums[i]);
    const temp = Math.abs(nums[item-1]);
    nums[item-1] = -1 * temp;
  }

  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) {
      result.push(i + 1);
    }
  }

  return result;
};
