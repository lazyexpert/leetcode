function construct2DArray(original: number[], m: number, n: number): number[][] {
  if (m * n !== original.length) return [];

  const result = new Array<number[]>(m);
  for (let i = 0; i < m; i++) {
    result[i] = new Array<number>(n);
  }

  let idx = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const el = original[idx++];
      result[i][j] = el;
    }
  }
  

  return result;
};

construct2DArray([1,2,3,4], 2, 2);
