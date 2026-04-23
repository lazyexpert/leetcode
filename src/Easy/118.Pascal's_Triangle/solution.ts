function generate(numRows: number): number[][] {
  const result = new Array<number[]>(numRows);
  // Init memory + insert ones as initial value
  for (let i = 0; i < result.length; i++) {
    result[i] = new Array<number>(i + 1).fill(1);
  }
  for (let i = 2; i < result.length; i++) {
    for (let j = 1; j < i; j++) {
      result[i][j] = result[i-1][j] + result[i-1][j-1];
    }
  }

  return result;
};

generate(5);
