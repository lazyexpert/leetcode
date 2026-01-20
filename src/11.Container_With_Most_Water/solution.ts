function maxArea(height: number[]): number {
  const length = height.length;
  let left = 0;
  let right = length - 1;
  let max = 0;

  while (left < right) {
    const leftValue = height[left];
    const rightValue = height[right];
    const currentHeight = Math.min(leftValue, rightValue);
    const currentWidth = right - left;
    max = Math.max(max, currentHeight * currentWidth);
    if (rightValue > leftValue) {
      left++;
    } else {
      right--;
    }
  }

  return max;
};