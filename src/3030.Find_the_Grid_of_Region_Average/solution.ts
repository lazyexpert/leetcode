function resultGrid(image: number[][], threshold: number): number[][] {
  const n = image.length;
  const m = image[0].length;
  const result = Array.from({length: n}, () => new Array(m));
  const sumGrid = Array.from({length: n}, () => new Array(m).fill(0));
  const countGrid = Array.from({length: n}, () => new Array(m).fill(0));

  function isRegionValid(rs: number, re:number, cs: number, ce: number, memo: Map<string, boolean>): boolean {
    const key = `${rs}|${re}|${cs}|${ce}`;
    const cached = memo.get(key);
    if (cached !== undefined) return cached;

    const directions = [[0,-1], [0, 1], [1,0], [-1,0]];
    for (let i = rs; i <= re; i++)  {
      for (let j = cs; j <= ce; j++) {
        const current = image[i][j];
        for (const dir of directions) {
          const nr = i + dir[0];
          const nc = j + dir[1];
          if (nr > re || nr < rs || nc > ce || nc < cs) continue;
          const target = image[nr][nc];
          if (Math.abs(current - target) > threshold) {
            memo.set(key, false);
            return false;
          }
        }
      }
    }
    memo.set(key, true);
    return true;
  }

  function setSumAndCountGridsForRegion(rs: number, re:number, cs: number, ce: number) {
    let sum = 0;
    // calculate avg
    for (let i = rs; i <= re; i++)  {
      for (let j = cs; j <= ce; j++) {
        sum += image[i][j];
      }
    }
    const avg = Math.floor(sum/9);
    for (let i = rs; i <= re; i++)  {
      for (let j = cs; j <= ce; j++) {
        sumGrid[i][j] += avg;
        countGrid[i][j] ++;
      }
    }
  }

  function setRegionAverage(rs: number, re:number, cs: number, ce: number) {
    for (let i = rs; i <= re; i++)  {
      for (let j = cs; j <= ce; j++) {
        result[i][j] = Math.floor(sumGrid[i][j] / countGrid[i][j]);
      }
    }
  }

  const memo = new Map<string,boolean>();

  for (let i = 1; i < n - 1; i++) {
    for (let j = 1; j < m - 1; j++) {
      const isValid = isRegionValid(i-1, i+1, j-1, j+1, memo);
      if (isValid) {
        setSumAndCountGridsForRegion(i-1, i+1, j-1, j+1);
      }
    }
  }

  for (let i = 1; i < n - 1; i++) {
    for (let j = 1; j < m - 1; j++) {
      const isValid = isRegionValid(i-1, i+1, j-1, j+1, memo);
      if (isValid) {
        setRegionAverage(i-1, i+1, j-1, j+1);
      }
    }
  }

  // copy empty cells
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (result[i][j] === undefined) {
        result[i][j] = image[i][j];
      }
    }
  }

  return result;
};

resultGrid([
  [5,6,7,10],
  [8,9,10,10],
  [11,12,13,10]
], 3);
