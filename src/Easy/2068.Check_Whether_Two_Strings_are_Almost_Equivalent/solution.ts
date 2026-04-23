function checkAlmostEquivalent(word1: string, word2: string): boolean {
  const freq1 = new Map<string,number>();
  const freq2 = new Map<string,number>();
  const chars = new Set<string>();

  // collect frequencies
  for (let i = 0; i < word1.length; i++) {
    freq1.set(word1[i], (freq1.get(word1[i]) || 0) + 1);
    freq2.set(word2[i], (freq2.get(word2[i]) || 0) + 1);
    chars.add(word1[i]);
    chars.add(word2[i]);
  }

  for (const ch of chars) {
    if (Math.abs((freq1.get(ch) || 0) - (freq2.get(ch) || 0)) > 3) {
      return false;
    }
  }

  return true;
};

checkAlmostEquivalent("aaaa", "bccb");
