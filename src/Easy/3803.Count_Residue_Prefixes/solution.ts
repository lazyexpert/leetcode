function residuePrefixes(s: string): number {
  const seen = new Set<string>();
  let count = 0;

  for (let i = 0; i < s.length; i++) {
    seen.add(s[i]);

    if (seen.size > 2) break;
    if (seen.size === (i + 1) % 3) {
      count++;
    }
  }

  return count;
}
