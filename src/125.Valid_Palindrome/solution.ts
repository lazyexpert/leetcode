function isPalindrome(s: string): boolean {
  let left = 0, right = s.length - 1;

  function isAlphaNumericChar(c: string) {
    const code = c.charCodeAt(0);
    return (
      (code >= 48 && code <= 57) ||  // 0-9
      (code >= 65 && code <= 90) ||  // A-Z
      (code >= 97 && code <= 122)    // a-z
    );
  }

  // mid char - we don't care, since it doesn't ruin palindrome detection
  while (left < right) {
    if (!isAlphaNumericChar(s[left])) {
      left++;
      continue;
    }
    if (!isAlphaNumericChar(s[right])) {
      right--;
      continue;
    }

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }
    left++;
    right--;
  }


  return true;
};
