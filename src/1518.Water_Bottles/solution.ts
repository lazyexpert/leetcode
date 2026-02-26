function numWaterBottles(numBottles: number, numExchange: number): number {
  let empty = numBottles;
  let used = 0;

  while (empty >= numExchange) {
    const timesToExchange = (empty / numExchange) | 0;
    const toConsume = timesToExchange * numExchange;
    used += toConsume;
    empty += timesToExchange - toConsume;
  }

  return used + empty;
};

numWaterBottles(9, 3);
