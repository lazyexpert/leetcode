function largestRectangleArea(heights: number[]): number {
  const h = [...heights, 0];
  let max = 0;
  const stack: { index: number; height: number }[] = [];

  for (let i = 0; i < h.length; i++) {
    let start = i;
    while (stack.length && stack[stack.length - 1].height > h[i]) {
      const { index, height } = stack.pop()!;
      max = Math.max(max, height * (i - index));
      start = index;
    }
    stack.push({ index: start, height: h[i] });
  }
  return max;
}
