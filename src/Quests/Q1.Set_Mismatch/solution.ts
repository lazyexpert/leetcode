function findErrorNums(nums: number[]): number[] {
  let twice: number = 0;
  let missing: number = 0;
  const len = nums.length;
  const seen = new Array<boolean>(len).fill(false);
  
  // Fill existing indexes, find twice number - O(N)
  for (let i = 0; i < len; i++) {
    const item = nums[i];
    if (seen[item-1]) {
      twice = item;
    }
    seen[item-1] = true;
  }

  // Find missing one - O(N) + early exit
  for (let i = 0; i < len; i++) {
    if (!seen[i]) missing = i + 1;
  }

  return [twice, missing];
};
