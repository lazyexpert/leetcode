function smallerNumbersThanCurrent(nums: number[]): number[] {
  const n = nums.length;
  const MAX_NUMS_LEN = 101;
  const result: number[] = new Array(n);
  const freq: number[] = new Array(MAX_NUMS_LEN).fill(0);
  const less: number[] = new Array(MAX_NUMS_LEN).fill(0);

  // Fill numbers frequency
  for (let i = 0; i < n; i++) {
    const item = nums[i];
    freq[item]++;
  }

  // Fill less count by number as index
  for (let i = 1; i < MAX_NUMS_LEN; i++) {
    less[i] = less[i-1] + freq[i-1];
  }

  // Compose result array
  for (let i = 0; i < n; i++) {
    const item = nums[i];
    result[i] = less[item];
  }

  return result;
};
