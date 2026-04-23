// [-3,2,-3,4,2] - input
// [-3,1,-2,2,4] - sums
// -3 - min
function minStartValue(nums: number[]): number {
  // 1. find minimum sum assuming startValue is 0
  let n = nums.length;
  let min = Infinity;
  for (let i = 0, sum = 0; i < n; i++) {
    sum += nums[i];
    min = Math.min(sum, min);
  }

  // 2. calculate and return min start value or 1.
  // min - 0 -> startValue 1
  // min -5 -> startValue 6
  return min >= 0 ? 1 : Math.abs(min) + 1;
};
