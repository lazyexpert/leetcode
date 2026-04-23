// [1,2,3]
// [1] | [2,3]
// [1,2] | [3]
// [1,3] | [2]
// [2] | [1,3]
// [2,1] | [3]
// [2,3] | [1]
function permute(nums: number[]): number[][] {
  const result: number[][] = [];
  const curr: number[] = [];
  const used: boolean[] = new Array(nums.length).fill(false);

  function dfs() {
    if (curr.length === nums.length) {
      result.push([...curr]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      used[i] = true;
      curr.push(nums[i]);

      dfs();

      curr.pop();
      used[i] = false;
    }
  }

  dfs();
  return result;
}

permute([1,2,3]);

