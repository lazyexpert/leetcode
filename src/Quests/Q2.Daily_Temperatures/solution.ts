function dailyTemperatures(temperatures: number[]): number[] {
  const len = temperatures.length;
  const res = new Array<number>(len).fill(0);
  const stack = new Array<number>(); // indexes

  for (let i = 0; i < len; i++) {
    const item = temperatures[i];
    while (stack[stack.length-1] !== undefined && item > temperatures[stack[stack.length-1]]) {
      const idx = stack.pop() as number;
      res[idx] = i - idx;
    }
    
    stack.push(i);
  }

  return res;
};
