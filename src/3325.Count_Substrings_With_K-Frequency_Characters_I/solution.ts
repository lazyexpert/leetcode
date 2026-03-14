function numberOfSubstrings(s: string, k: number): number {
  const freq = new Map<string, number>();
  let left = 0;
  let res = 0;

  for (let right = 0; right < s.length; right++) {
    freq.set(s[right], (freq.get(s[right]) || 0) + 1);

    while (freq.get(s[right])! >= k) {
      res += s.length - right;
      freq.set(s[left], freq.get(s[left])! - 1);
      left++;
    }
  }

  return res;
}

numberOfSubstrings("ajsrhoebe", 1);
