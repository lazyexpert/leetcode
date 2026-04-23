function subsets(nums: number[]): number[][] {
  const result = new Array<number[]>();
  let subset = new Array<number>();

  function dfs(i: number) {
    if (i >= nums.length) {
      result.push(subset.slice());
      return;      
    }

    subset.push(nums[i]);
    dfs(i+1);
    
    subset.pop();
    dfs(i+1);
  }

  dfs(0);

  return result;
};

subsets([1,2,3]);
