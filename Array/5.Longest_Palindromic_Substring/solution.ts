function getPalindrome(left: number, right: number, s: string): Array<number> {
	while (left >=0 && right < s.length && s[left] === s[right]) {
		left--;
		right++;
	}

	return [left + 1, right];
}

function longestPalindrome(s: string): string {
	let max = [0, 1];

	for (let i = 0; i < s.length; i++) {
		const odd = getPalindrome(i-1, i, s);
		const even = getPalindrome(i-1, i+1, s);
		const currentMax = even[1] - even[0] > odd[1] - odd[0] ? even: odd;
		max = currentMax[1] - currentMax[0] > max[1] - max[0] ? currentMax : max;
	}

  return s.slice(max[0],max[1]);
};

const palindromeStr = longestPalindrome("babad")
console.log(palindromeStr)