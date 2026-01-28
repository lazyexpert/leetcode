function getConcatenation(nums: number[]): number[] {
  const len = nums.length;
  const result = new Array(len * 2);
  for (let i = 0; i < len; i++) {
    const item = nums[i];
    result[i] = item;
    result[i+len] = item;
  }
  return result;
};