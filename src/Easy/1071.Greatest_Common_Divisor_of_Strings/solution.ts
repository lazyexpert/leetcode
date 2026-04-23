function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function gcdOfStrings(str1: string, str2: string): string {
  if (str1 + str2 !== str2 + str1) return "";

  const divisor = gcd(str1.length, str2.length);

  return str1.slice(0, divisor);
};

gcdOfStrings("ABCABC", "ABC");
