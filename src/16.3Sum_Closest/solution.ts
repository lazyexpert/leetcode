function threeSumClosest(nums: number[], target: number): number {
  let minDelta = Infinity;
  let minSum = Infinity;

  nums.sort((a, b) => a - b);
  const n = nums.length;
  const minPossible = nums[0] + nums[1] + nums[2]
	const maxPossible = nums[n-1] + nums[n-2] + nums[n-3]

  if (minPossible > target) return minPossible;
  if (maxPossible < target) return maxPossible;

  for (let i = 0; i < nums.length - 2; i++) {
    let num = nums[i];
    let l = i + 1;
    let r = nums.length - 1;
    
    while (l < r) {
      const sum = num + nums[l] + nums[r];

      const curDelta = Math.abs(target - sum);
      if (minDelta > curDelta) {
        minDelta = curDelta
        minSum = sum;
      }

      if (sum === target) {
        return target;
      } else if (sum > target) {
        r--;
      } else {
        l++;
      }
    }
  }

  return minSum;
};
