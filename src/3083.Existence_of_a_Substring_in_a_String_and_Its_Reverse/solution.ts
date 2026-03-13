function isSubstringPresent(s: string): boolean {
  const seen = new Set<string>();

  for (let i = 0; i < s.length - 1; i++) {
    seen.add(s[i] + s[i + 1]);
  }

  for (let i = 0; i < s.length - 1; i++) {
    const rev = s[i + 1] + s[i];
    if (seen.has(rev)) return true;
  }

  return false;
}