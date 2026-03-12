// a ^ a = 0
// a ^ 0 = a
// Exmaple:
// nums = [4,1,2,1,2]
// 0 ^ 4 = 4
// 4 ^ 1 = 5
// 5 ^ 2 = 7
// 7 ^ 1 = 6
// 6 ^ 2 = 4
function singleNumber(nums: number[]): number {
  let res = 0;

  for (let i = 0; i < nums.length; i++) {
    res ^= nums[i];
  }

  return res;
}