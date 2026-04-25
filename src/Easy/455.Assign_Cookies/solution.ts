function findContentChildren(g: number[], s: number[]): number {
  g.sort();
  s.sort();

  let chirlPtr = 0;
  let counter = 0;

  for (let i = 0; i < g.length; i++) {
    if (s[chirlPtr] >= g[i]) {
      chirlPtr++;
      counter++;
    }
  }

  return counter;
};
