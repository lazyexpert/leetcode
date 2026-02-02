function nextGreaterElements(nums: number[]): number[] {
  // monotonic decreasing stack
  const stack = new Array<number>(); // indexes that we didn't find the higher value yet
  const result = new Array<number>(nums.length).fill(-1);

  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];

    while (stack.length > 0 && x > nums[stack[stack.length-1]]) {
      const idx = stack.pop() as number;
      result[idx] = x;
    }

    stack.push(i);
  }

  for (let i = 0; i < nums.length && stack.length > 0; i++) {
    const x = nums[i];

    while (stack.length > 0 && x > nums[stack[stack.length-1]]) {
      const idx = stack.pop() as number;
      result[idx] = x;
    }
  }

  return result;
};
