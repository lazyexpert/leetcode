function minimumJumps(forbidden: number[], a: number, b: number, x: number): number {
  let idx = 0;
  let count = 0;
  let direction = 1;
  const fSet = new Set(forbidden);
  const visited = new Set<string>();

  const queue = new Array<number[]>();
  queue.push([1, 0, 0]);
  const upper = Math.max(x, Math.max(...forbidden)) + a + b;

  while (queue.length > 0) {
    const [d, i, c] = queue.shift() as number[];
    if (i === x) return c;
    const key = `${d}:${i}`;
    if (i < 0 || i > upper || fSet.has(i) || visited.has(key)) continue;

    visited.add(key);

    // go forward
    queue.push([1, i + a, c + 1]);

    if (d === 1) {
      // go backward
      queue.push([-1, i - b, c + 1]);
    }
  }

  return  -1;
};

minimumJumps([14,4,18,1,15], 3, 15, 9);