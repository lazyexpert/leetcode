function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const lookup = new Map<string, number>();
  for (const c of s) {
    lookup.set(c, (lookup.get(c) || 0) + 1);
  }

  for (const c of t) {
    const cnt = lookup.get(c) || 0;
    if (cnt === 0) return false;
    lookup.set(c, cnt-1);
  }

  return true;
};
