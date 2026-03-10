// `intervals[i]` = `[starti, endi]`
function merge(intervals: number[][]): number[][] {
  if (intervals.length <= 1) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);
  const result = new Array<number[]>();

  for (let i = 0; i < intervals.length; i++) {
    if (result.length === 0) { 
      result.push(intervals[i]);
    } else {
      const prev = result[result.length - 1];
      if (prev[1] >= intervals[i][0]) {
        prev[1] = Math.max(intervals[i][1], prev[1]);
      } else {
        result.push(intervals[i]);
      }
    }
  }

  return result;
};

merge([[2,3],[5,5],[2,2],[3,4],[3,4]]);
