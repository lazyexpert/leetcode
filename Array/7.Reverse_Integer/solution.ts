const INT_MAX = 2147483647;
const INT_MIN = -2147483648;

function reverse(x: number): number {
  let res = 0;
  let curr = Math.abs(x);

  while (curr > 0) {
    const num = curr % 10;
    res = res * 10 + num;
    curr = Math.floor(curr / 10);
  }

  res *= Math.sign(x);
  if (res > INT_MAX || res < INT_MIN) return 0;
  return res;
};

const reverseRes = reverse(-123);
console.log(reverseRes);