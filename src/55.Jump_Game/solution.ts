function canJump(nums: number[]): boolean {
  let farthest = 0;
  const last = nums.length - 1;

  for (let i = 0; i <= farthest && i < nums.length; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (farthest >= last) return true;
  }

  return farthest >= last;
}
