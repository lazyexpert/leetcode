// Bucket sort sample solution
function topKFrequent2(nums: number[], k: number): number[] {
  const freq: Record<number, number> = {};

  for (const n of nums) {
    freq[n] = (freq[n] || 0) + 1;
  }

  const buckets: number[][] = Array(nums.length + 1)
    .fill(null)
    .map(() => []);

  for (const num in freq) {
    const f = freq[num];
    buckets[f].push(Number(num));
  }

  const result: number[] = [];

  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    for (const n of buckets[i]) {
      result.push(n);
      if (result.length === k) break;
    }
  }

  return result;
}
