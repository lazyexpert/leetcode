function removeDuplicateLetters(s: string): string {
  const stack = new Array<string>();
  const seen = new Set();
  const lastOccurence = new Map<string, number>();

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    const last = lastOccurence.get(ch);
    if (last === undefined || last < i) {
      lastOccurence.set(ch, i);
    }
  }


  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (!seen.has(ch)) {
      while (stack.length > 0 && stack[stack.length - 1] > ch && lastOccurence.get(stack[stack.length-1]) as number > i) {
        const el = stack.pop();
        seen.delete(el);
      }
      stack.push(ch);
      seen.add(ch);
    }
  }

  return stack.join("");
};

removeDuplicateLetters("cbacdcbc");