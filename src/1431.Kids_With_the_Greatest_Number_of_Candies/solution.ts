function kidsWithCandies(candies: number[], extraCandies: number): boolean[] {
  const max = Math.max(...candies);
  const result = Array<boolean>(candies.length)
  for (let i = 0; i < candies.length; i ++) {
    result[i] = candies[i] + extraCandies >= max;
  }
  return result;
};
