function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);

  const res: number[][] = [];
  const n = nums.length;

  for (let i = 0; i < n - 2; i++) {
    const a = nums[i];

    // Since sorted, if the smallest is already > 0, sum can't be 0 anymore
    if (a > 0) break;

    // Skip duplicates for the first element
    if (i > 0 && a === nums[i - 1]) continue;

    let l = i + 1;
    let r = n - 1;

    while (l < r) {
      const sum = a + nums[l] + nums[r];

      if (sum < 0) {
        l++;
      } else if (sum > 0) {
        r--;
      } else {
        res.push([a, nums[l], nums[r]]);

        l++;
        r--;

        // Skip duplicates for the second element
        while (l < r && nums[l] === nums[l - 1]) l++;
        // Skip duplicates for the third element
        while (l < r && nums[r] === nums[r + 1]) r--;
      }
    }
  }

  return res;
}