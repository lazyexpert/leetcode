// return index of target
function search(nums: number[], target: number): number {
  // find 0 index. this indicates 2 parts of array we should separately search in.
  const firstEl = nums[0];
  let l = 0;
  let r = nums.length - 1;
  let i = 0;

  // search index where array is possibly reversed
  while (l < r) {
    i = l + Math.floor((r - l) / 2);
    if (nums[i] < firstEl) {
      r = i;
    } else {
      l = i + 1;
    }
  }

  const offset = r;
  l = 0;
  r = offset;
  i = 0;
  if (nums[offset] === target) return offset;

  // search target in first sub array
  while (l <= r) {
    i = l + Math.floor((r - l) / 2);
    if (nums[i] === target) return i;
    if (nums[i] < target) {
      l = i + 1;
    } else {
      r = i - 1;
    }
  }

  l = offset;
  r = nums.length - 1;
  i = 0;
  // search target in second sub array
  while (l <= r) {
    i = l + Math.floor((r - l) / 2);
    if (nums[i] === target) return i;
    if (nums[i] < target) {
      l = i + 1;
    } else {
      r = i - 1;
    }
  }


  return -1;
};