function compress(chars: string[]): number {
  // if (chars.length === 1) return 1;

  let prevChar = chars[0];
  let prevCharCount = 1;
  let index = 0;
  // i <= to cover edge case with trailing last duplications
  for (let i = 1; i <= chars.length; i++) {
    const curr = chars[i];
    if (curr === prevChar) {
      prevCharCount++;
    } else {
      chars[index++] = prevChar;
      if (prevCharCount > 1) {
        const prevCharCountStr = prevCharCount.toString();
        for (let j = 0; j < prevCharCountStr.length; j++) {
          chars[index++] = prevCharCountStr[j];
        }
      }

      prevCharCount = 1;
      prevChar = curr;
    }
  }
  chars.splice(index, chars.length - index);

  return chars.length;
};

compress(["a","b","b","b","b","b","b","b","b","b","b","b","b"]);