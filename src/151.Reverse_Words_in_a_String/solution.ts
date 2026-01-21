function reverseWords(s: string): string {
  const input = s.trim().split(" ");
  const result = new Array(input.length);
  let added = 0;

  for (let i = 0; i < input.length; i++) {
    const word = input[i];
    if (word.length > 0) {
      result[result.length - added - 1] = word;
      added++;
    }
  }

  return result.slice(input.length - added).join(" ");
};

reverseWords("a good   example")