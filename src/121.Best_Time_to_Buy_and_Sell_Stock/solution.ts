function maxProfit(prices: number[]): number {
  let minSoFar = prices[0];
  let best = 0;

  for (let i = 0; i < prices.length; i++) {
    minSoFar = Math.min(minSoFar, prices[i]);
    best = Math.max(best, prices[i] - minSoFar);
  }

  return best;
}