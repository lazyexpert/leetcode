function numWaterBottles(numBottles: number, numExchange: number): number {
  let drunk = numBottles;
  let empty = numBottles;

  while (empty >= numExchange) {
    const newFull = Math.floor(empty / numExchange);
    drunk += newFull;
    empty = newFull + (empty % numExchange);
  }

  return drunk;
}

numWaterBottles(9, 3);
