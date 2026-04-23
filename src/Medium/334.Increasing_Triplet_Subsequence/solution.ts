function increasingTriplet(nums: number[]): boolean {
  let first = Number.MAX_SAFE_INTEGER;
  let second = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < nums.length; i++) {
    const x = nums[i]
    if (x <= first) {
      first = x;
    } else if (x <= second) {
      second = x;
    } else {
      return true; // x > second > first
    }
  }

  return false;
}
