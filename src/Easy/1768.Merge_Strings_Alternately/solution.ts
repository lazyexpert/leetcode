function mergeAlternately(word1: string, word2: string): string {
  const result = new Array(word1.length + word2.length);
  const maxLen = Math.max(word1.length, word2.length);
  let pointer = 0;

  for (let i = 0; i < maxLen; i++) {
    let char1 = word1[i];
    let char2 = word2[i];
    if (i < word1.length) result[pointer++] = char1;
    if (i < word2.length) result[pointer++] = char2;
  }


  return result.join("");
};