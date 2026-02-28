function calculate(n: number, memo: Map<number, number>): number {
  if (n === 0) return 0;
  if (n === 1) return 1;
  const cache = memo.get(n);
  if (cache) return cache;
  const res = calculate(n-2, memo) + calculate(n-1, memo);
  memo.set(n, res);
  return res;
}

function fib(n: number): number {
  const memo = new Map<number, number>();
  return calculate(n, memo);
};
