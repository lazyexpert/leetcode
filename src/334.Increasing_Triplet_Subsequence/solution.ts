function increasingTriplet(nums: number[]): boolean {
  let first = Number.POSITIVE_INFINITY;
  let second = Number.POSITIVE_INFINITY;

  for (const x of nums) {
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

increasingTriplet([20,100,10,12,5,13]);