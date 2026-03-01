function longestPalindrome(s: string): number {
  // lookup for chars we already met
  const lookup = new Uint8Array(128);
  let oddCount = 0;
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    const charCode = s[i].charCodeAt(0);

    if (lookup[charCode]) {
      result += 2;
      oddCount--;
      lookup[charCode] = 0;
    } else {
      oddCount++;
      lookup[charCode] = 1;
    }
  }

  if (oddCount > 0) result++;

  return result;
};
