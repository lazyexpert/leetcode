function minimumAverage(nums: number[]): number {
  nums.sort((a, b) => a - b);

  let left = 0;
  let right = nums.length - 1;
  let min = Infinity;

  while (left < right) {
    const avg = (nums[left] + nums[right]) / 2;
    min = Math.min(min, avg);
    left++;
    right--;
  }

  return min;
}