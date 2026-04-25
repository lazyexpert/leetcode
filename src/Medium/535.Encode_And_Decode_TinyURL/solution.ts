// design-tinyurl -> 4e9iAk
const data = new Array<string>();

/**
 * Encodes a URL to a shortened URL.
 */
// https://leetcode.com/problems/design-tinyurl
function encode(longUrl: string): string {
  return `http://tinyurl.com/${data.push(longUrl) - 1}`;
};

/**
 * Decodes a shortened URL to its original URL.
 */
function decode(shortUrl: string): string {
  const arr = shortUrl.split('/');
  const idx = Number(arr[arr.length - 1]);
  return data[idx];
};

/**
 * Your functions will be called as such:
 * decode(encode(strs));
 */