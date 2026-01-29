function finalPrices(prices: number[]): number[] {
  const n = prices.length;
  const result = prices.slice();
  const stack: number[] = [];

  for (let i = 0; i < n; i++) {
    while (
      stack.length > 0 &&
      prices[i] <= prices[stack[stack.length - 1]]
    ) {
      const idx = stack.pop()!;
      result[idx] = prices[idx] - prices[i];
    }

    stack.push(i);
  }

  return result;
}