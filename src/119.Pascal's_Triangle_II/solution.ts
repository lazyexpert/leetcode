function getRow(rowIndex: number): number[] {
  if (rowIndex === 0) return [1];
  if (rowIndex === 1) return [1,1];
  let result: number[] = [1,1];

  for (let i = 2; i < rowIndex+1; i++) {
    let arr = new Array<number>(i+1).fill(1);
    for (let j = 1; j < i; j++) {
      arr[j] = result[j-1] + result[j];
    }

    result = arr;
  }

  return result;
};

getRow(3);
