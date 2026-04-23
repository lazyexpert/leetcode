// It can jump exactly `a` positions forward (to the right).
// It can jump exactly `b` positions backward (to the left).
// It cannot jump backward twice in a row.
// It cannot jump to any forbidden positions.
// The bug may jump forward beyond its home, but it cannot jump to positions numbered with negative integers.
function minimumJumps(forbidden: number[], a: number, b: number, x: number): number {
  const restriced = new Set(forbidden);
  const visited = new Set<string>();
  const upperBound = Math.max(x, ...forbidden) + a + b;

  // [pos, jumps, isPrevBackward]
  const queue = new Array<number[]>();
  queue.push([0, 0, 0]);
  let min = Infinity;

  while (queue.length > 0) {
    const [pos, jumps, isPrevBackward] = queue.shift() as number[];
    const key = `${pos}-${isPrevBackward}`;
    if (visited.has(key)) continue;
    visited.add(key);

    if (pos < 0 || pos > upperBound || restriced.has(pos)) continue;
    if (pos === x) {
      min = Math.min(min, jumps);
      continue;
    }

    // jump forward
    queue.push([pos + a, jumps + 1, 0]);

    // jump backward
    if (isPrevBackward === 0) {
      queue.push([pos - b, jumps + 1, 1]);
    }
    
  }

  return min === Infinity ? -1 : min;
};

minimumJumps([8,3,16,6,12,20], 15, 13, 11);
