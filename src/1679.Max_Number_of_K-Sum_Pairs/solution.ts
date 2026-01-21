function maxOperations(nums: number[], k: number): number {
  let ops = 0;
  const lookup = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const value = nums[i];
    const target = k - value;
    const oldValue = lookup.get(target) || 0; 
    if (oldValue > 0) {
      ops++;
      lookup.set(target, oldValue - 1);
    } else {
      const old = lookup.get(value) || 0;
      lookup.set(value, old + 1);
    }
  }

  return ops;
};
