function minimumOperations(nums: number[]): number {
  const lookup = new Array<number>(101).fill(0);
  let index = 0;
  let added = 0;
  for (let i = nums.length - 1; i >= 0; i--) {
    if (lookup[nums[i]] > 0) {
      index = i;
      break;
    } else {
      lookup[nums[i]]++;
      added++;
    }
  }


  return nums.length === added ? 0 : Math.ceil((index+1)/3);
};

minimumOperations([1,2,3,4,2,3,3,5,7]);
