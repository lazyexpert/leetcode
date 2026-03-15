// `321` will be put in the box number `3 + 2 + 1 = 6`
// highLimit inclusive
function countBalls(lowLimit: number, highLimit: number): number {
  let max = 0;
  const boxes = new Map<number, number>();

  while (lowLimit <= highLimit) {
    let sum = 0;
    let temp = lowLimit;
    while (temp > 0) {
      sum += temp % 10;
      temp = Math.floor(temp/10);
    }
    const next = (boxes.get(sum) || 0) + 1;
    boxes.set(sum, next);
    max = Math.max(max, next);
    lowLimit++;
  }

  return max;
};

countBalls(19, 28);
