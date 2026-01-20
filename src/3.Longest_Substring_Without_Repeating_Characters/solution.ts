function lengthOfLongestSubstring(s: string): number {
  const map: Map<string, number> = new Map();
  if (!s.length) return 0;

  let left = 0;
  let right = 0;
  let result = 0;

  while (right < s.length) {
    const rightChar = s[right];
    console.log(left, right)
    if (!map.has(rightChar)) {
      map.set(rightChar, right);
    } else {
      const index = map.get(rightChar);
      if (index !== undefined && index >= left) {
        left = index + 1;
      }
      map.set(rightChar, right);
    }

    result = Math.max(result, right - left + 1);
    right++;
  }
  return result;
};

const result = lengthOfLongestSubstring("bbbbw");
console.log(result);
