function jumpTowardsEnd(nums: number[], idx: number): boolean {
  if (idx === nums.length -1) return true;
  if (idx > nums.length - 1) return false;

  let jump = nums[idx];
  if (jump === -1) return false;

  while (jump > 0) {
    const res = jumpTowardsEnd(nums, idx + jump--);
    if (res === true) {
      return true;
    }
  }

  nums[idx] = -1;
  return false;
}

function canJump(nums: number[]): boolean {
  
  // return jumpTowardsEnd(nums, 0);
};