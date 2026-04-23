
function countOptions(curr: number, target: number, memo: Map<number, number>):number {
  if (curr === target) return 1;
  if (curr > target) return 0;
  const cached = memo.get(curr);
  if (cached !== undefined) return cached;

  const res = countOptions(curr + 1, target, memo) + countOptions(curr + 2, target, memo);
  memo.set(curr, res);
  return res;
}

function climbStairs(n: number): number {
  const memo = new Map<number, number>();
  return countOptions(0, n, memo);
};

climbStairs(3)
