function checkAndMarkNode(i: number, j: number, grid: string[][], queue: number[][]) {
  if (grid[i] && grid[i][j] === '1') {
    grid[i][j] = '0';
    queue.push([i, j]);
  }
}

function checkNodeNeighbours(i: number, j: number, grid: string[][], queue: number[][]) {
  checkAndMarkNode(i-1, j, grid, queue);
  checkAndMarkNode(i+1, j, grid, queue);
  checkAndMarkNode(i, j-1, grid, queue);
  checkAndMarkNode(i, j+1, grid, queue);
}

function numIslands(grid: string[][]): number {
  // mark current island with 0, traverse all directions until we reach zeroes
  // once we're at all 0 - increment counter and search for next island (1) and repeat the algorithm
  const queue = Array<number[]>();
  let counter = 0;
  

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '1') {
        checkAndMarkNode(i, j, grid, queue);
        counter++;
      }
      while (queue.length > 0) {
        // visit each item in the queue 
        // mark 1 with -1
        const [ix, jx] = queue.pop() as number[];
        checkNodeNeighbours(ix, jx, grid, queue);
      }
    }
  }

  return counter;
};