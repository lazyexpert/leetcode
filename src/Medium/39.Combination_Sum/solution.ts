function combinationSum(candidates: number[], target: number): number[][] {
  const result = new Array<number[]>();
  const combination = new Array<number>();

  function dfs(i: number, sum: number) {
    if (sum === target) {
      result.push(combination.slice());
      return;
    }

    if (sum > target || i >= candidates.length) return;

    combination.push(candidates[i]);
    dfs(i, sum + candidates[i]);

    combination.pop();
    dfs(i+1, sum);
  }

  dfs(0, 0);

  return result;
};

combinationSum([2,3,6,7], 7);
