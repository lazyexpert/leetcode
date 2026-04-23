// O (NlogN)
// function arrayPairSum(nums: number[]): number {
//   nums.sort((a,b) => a-b);
//   let sum = 0;
//   for (let i = 0; i < nums.length; i+=2) {
//     sum += Math.min(nums[i], nums[i+1]);
//   }

//   return sum;
// };


// Assuming number values are limited: -10^4 <= nums[i] <= 10^4
// We can do O(N + K) Where K is constant - 20001 with applying counting sort here
function arrayPairSum(nums: number[]): number {
  const offset = 10000;
  const lookup = new Array(20001).fill(0);
  for (let i = 0; i < nums.length; i++) lookup[nums[i]+offset]++;

  let add = true;
  let sum = 0;

  for (let i = 0; i < 20001; i++) {
    while (lookup[i] > 0) {
      // Adding 1, skipping 1
      if (add) {
        sum += i - offset;
      }
      lookup[i]--;
      add = !add;
    }
  }

  return sum;
}