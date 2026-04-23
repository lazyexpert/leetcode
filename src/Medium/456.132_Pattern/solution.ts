function find132pattern(nums: number[]): boolean {
  const stack: number[] = [];     // candidates for "3"
  let second = Number.NEGATIVE_INFINITY; // candidate for "2"

  for (let i = nums.length - 1; i >= 0; i--) {
    const x = nums[i];

    // x is "1"
    if (x < second) return true;

    // x is new "3": pop smaller things -> they can become "2"
    while (stack.length > 0 && x > stack[stack.length - 1]) {
      second = stack.pop() as number;
    }

    stack.push(x);
  }

  return false;
}
