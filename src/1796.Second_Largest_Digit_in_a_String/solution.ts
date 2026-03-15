function secondHighest(s: string): number {
  const digits = new Array<boolean>(10).fill(false);
  for (const c of s) {
    const code = c.charCodeAt(0);
    if (code >= 48 && code <=57) {
      digits[Number(c)] = true;
    }
  }

  let foundOne = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i]) {
      if (!foundOne) {
        foundOne = true;
      } else {
        return i;
      }
    }
  }

  return -1;
};
