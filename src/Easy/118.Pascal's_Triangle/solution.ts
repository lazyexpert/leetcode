function generate(numRows: number): number[][] {
  let result = new Array<number[]>(numRows);
  let length = 1;
  while (numRows--) {
    let arr = new Array(length).fill(1);
    result[length-1] = arr;
    for (let i = 1; i < arr.length - 1; i++) {
      arr[i] = result[length-2][i-1] + result[length-2][i];
    }
    length++;
  }

  return result;
};