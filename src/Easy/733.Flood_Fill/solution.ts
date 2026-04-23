function floodFill(image: number[][], sr: number, sc: number, color: number): number[][] {
  if (image[sr][sc] === color) return image;
  const startingColor = image[sr][sc];
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  function dfs(i: number, j: number) {
    if (i < 0 || j < 0 || i >= image.length || j >= image[0].length) return;
    if (image[i][j] !== startingColor) return;

    image[i][j] = color;
    for (const dir of directions) {
      dfs(i + dir[0], j + dir[1]);
    }
  }

  dfs(sr, sc);

  return image;
};
