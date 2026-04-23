function firstPalindrome(words: string[]): string {
  function isPalindrome(word: string): boolean {
    let left = 0, right = word.length-1;
    while (left < right) {
      if (word[left] !== word[right]) return false;
      left++;
      right--;
    }

    return true;
  }
  
  for (const word of words) {
    if (isPalindrome(word)) return word;
  }

  return "";
};
