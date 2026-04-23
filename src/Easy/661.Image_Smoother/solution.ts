function imageSmoother(img: number[][]): number[][] {
  const dirs = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],  [0, 0],  [0, 1],
    [1, -1],  [1, 0],  [1, 1],
  ];

  const rows = img.length;
  const cols = img[0].length;
  const result: number[][] = Array.from({ length: rows }, () => new Array(cols).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let sum = 0;
      let count = 0;

      for (let k = 0; k < dirs.length; k++) {
        const [dx, dy] = dirs[k];
        const x = i + dx;
        const y = j + dy;

        if (x < 0 || x >= rows || y < 0 || y >= cols) continue;

        sum += img[x][y];
        count++;
      }

      result[i][j] = Math.floor(sum / count);
    }
  }

  return result;
}
