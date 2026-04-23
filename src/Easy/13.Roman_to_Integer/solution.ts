function romanToInt(s: string): number {
  let res = 0;

  const romanPrimitives: Record<string, number> = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000,
  };

  for (let i = 0; i < s.length; i++) {
    const curr = romanPrimitives[s[i]];
    const next = romanPrimitives[s[i+1]];

    if (next !== undefined && next > curr) {
      res -= curr;
    } else {
      res += curr;
    }
  }

  return res;
};
