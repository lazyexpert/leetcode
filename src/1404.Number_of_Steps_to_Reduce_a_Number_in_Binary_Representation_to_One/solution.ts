// 1 - 1
// 10 - 2
// 11 - 3
// 100 - 4
// 101 - 5
// 110 - 6
// 111 - 7
// 1000 - 8
// 1001 - 9
// 1010 - 10
// 1011 - 11
// 1100 - 12
// 1101 - 13
// 1110 - 14
// 1111 - 15
// 10000 - 16
// 10001 - 17
// 10010 - 18
// 10011 - 19
// 10100 - 20
// 10101 - 21
// 10110 - 22
// 10111 - 23
function numSteps(s: string): number {
  let steps = 0;
  let carry = 0;

  for (let i = s.length -1; i > 0; i--) {
    let sum = carry + Number(s[i]);
    if (sum === 0) {
      // even, carry 1
      steps++;
    } else if (sum === 1) {
      // uneven or carry 1
      steps += 2;
      carry = 1;
    } else {
      // uneven and carry 1
      steps ++;
      carry = 1;
    }
  }

  return steps + carry;
}



numSteps("1101");
