// `answer[0]` is a list of all distinct integers in `nums1` which are not present in `nums2`.
// `answer[1]` is a list of all distinct integers in `nums2` which are not present in `nums1`.
function findDifference(nums1: number[], nums2: number[]): number[][] {
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);

  const res1: number[] = [];
  const res2: number[] = [];

  for (const n of set1) {
    if (!set2.has(n)) res1.push(n);
  }

  for (const n of set2) {
    if (!set1.has(n)) res2.push(n);
  }

  return [res1, res2];
}
