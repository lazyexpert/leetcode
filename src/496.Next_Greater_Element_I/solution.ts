function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  const next = new Map<number, number>(); // value -> next greater
  const stack: number[] = []; // decreasing stack of values

  for (const x of nums2) {
    while (stack.length > 0 && x > stack[stack.length - 1]) {
      next.set(stack.pop()!, x);
    }
    stack.push(x);
  }

  return nums1.map(x => next.get(x) ?? -1);
}
