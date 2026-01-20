const INT_MAX = 2147483647;
const INT_MIN = -2147483648;

function reverse(x: number): number {
  if (x === 0) return x;

  let res = 0;
  const sign = Math.sign(x);
  let currentValue = Math.abs(x);

  while (currentValue > 0) {
    const num = currentValue % 10;
    res = res * 10 + num;
    currentValue = Math.floor(currentValue / 10);
  }

  const returnValue = res * sign;
  if (returnValue > INT_MAX || returnValue < INT_MIN) return 0;
  return returnValue;
};

const reverseRes = reverse(-123);
console.log(reverseRes);