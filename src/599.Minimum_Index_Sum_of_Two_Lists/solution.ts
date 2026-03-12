function findRestaurant(list1: string[], list2: string[]): string[] {
  // build lookup for lis2 - string:index
  const lookup = new Map<string, number>();
  for (let i = 0; i < list2.length; i++) {
    lookup.set(list2[i], i);
  }
  let minSum = Infinity;
  let result: string[] = [];

  // iterate list, maintaining least sum by using lookup and saving res
  for (let i = 0; i < list1.length; i++) {
    const str = list1[i];
    const j = lookup.get(str);
    if (j === undefined) continue;

    const sum = i + j;
    if (sum < minSum) {
      result = [str];
      minSum = sum;
    } else if (sum === minSum) {
      result.push(str);
    }
  }

  return result;
};
