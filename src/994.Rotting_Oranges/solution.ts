
// `0` representing an empty cell,
// `1` representing a fresh orange, or
// `2` representing a rotten orange.
// Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.
// function orangesRotting(grid: number[][]): number {
//   // entrypoints - all rotten oranges currently placed
function orangesRotting(grid: number[][]): number {
  // entrypoints - all rotten oranges currently placed

  
  // const lookup = new Set<string>(); // `${i}:${j}` key to track visited indexes
  let minutes = 0
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  let queue: Array<number[]>;
  let nextQueue = new Array<number[]>();
  let freshOrangesCount = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 2) nextQueue.push([i,j]);
      if (grid[i][j] === 1) freshOrangesCount++;
    }
  }

  while (freshOrangesCount > 0 && nextQueue.length > 0) {
    // const queue = collectAllEntryPoints(2);
    // if (queue.length === 0) break;
    queue = nextQueue;
    nextQueue = new Array<number[]>();
    while (queue.length > 0) {
      const [ix, jy] = queue.pop() as number[];

      for (const direction of directions) {
        const idx = ix + direction[0];
        const idy = jy + direction[1];
        if (idx < 0 || idy < 0 || idx >= grid.length || idy >= grid[idx].length) continue;

        const val = grid[idx][idy];
        if (val === 1) {  
          grid[idx][idy] = 2;
          freshOrangesCount--;
          nextQueue.push([idx,idy]);
        }
      }
    }
    minutes++;
  }

  if (freshOrangesCount > 0) return -1;

  return minutes;
};
