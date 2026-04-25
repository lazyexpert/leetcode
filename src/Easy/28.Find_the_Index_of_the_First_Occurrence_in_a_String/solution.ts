// "mississippi"
// "issip"
function strStr(haystack: string, needle: string): number {
  for (let i = 0; i < haystack.length; i++)  {
    if (haystack[i] === needle[0]) {
      let substr = haystack.slice(i, i + needle.length);
      if (substr === needle) return i;
    }
  }

  return -1;
};