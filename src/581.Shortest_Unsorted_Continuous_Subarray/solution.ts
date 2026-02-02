function findUnsortedSubarray(nums: number[]): number {
  const n = nums.length;
  let left = n;
  let right = 0;

  // increasing stack -> find left boundary
  const st1: number[] = [];
  for (let i = 0; i < n; i++) {
    while (st1.length > 0 && nums[i] < nums[st1[st1.length - 1]]) {
      left = Math.min(left, st1.pop()!);
    }
    st1.push(i);
  }

  // decreasing stack -> find right boundary
  const st2: number[] = [];
  for (let i = n - 1; i >= 0; i--) {
    while (st2.length > 0 && nums[i] > nums[st2[st2.length - 1]]) {
      right = Math.max(right, st2.pop()!);
    }
    st2.push(i);
  }

  return right > left ? right - left + 1 : 0;
}

findUnsortedSubarray([2,6,4,8,10,9,15]);
