# 3083. Existence of a Substring in a String and Its Reverse
Given a string `s`, find any substring of length 2 which is also present in the reverse of s.

Return `true` if such a substring exists, and `false` otherwise.

## Constraints
- 1 <= s.length <= 100
- s consists only of lowercase English letters.

## Example
```
Input: s = "leetcode"

Output: true

Explanation: Substring "ee" is of length 2 which is also present in reverse(s) == "edocteel".
```

```
Input: s = "abcba"

Output: true

Explanation: All of the substrings of length 2 "ab", "bc", "cb", "ba" are also present in reverse(s) == "abcba".
```

```
Input: s = "abcd"

Output: false

Explanation: There is no substring of length 2 in s, which is also present in the reverse of s.
```

