function findMaxConsecutiveOnes(nums: number[]): number {
  let max = 0;
  let streak = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      streak++;
      max = Math.max(max, streak);
    } else {
      streak = 0;
    }
  }

  return max;
};