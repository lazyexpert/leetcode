function lemonadeChange(bills: number[]): boolean {
  let fives = 0;
  let tens = 0;

  for (const bill of bills) {
    const change = bill - 5;
    if (change === 5) {
      if (fives === 0) return false;
      fives--;
    } else if (change === 15) {
      if (tens > 0 && fives > 0) {
        tens--;
        fives--;
      } else if (fives > 2) {
        fives -= 3;
      } else {
        return false;
      }
    }
    if (bill === 5) {
      fives++;
    } else if (bill === 10) {
      tens++;
    }
  }

  return true;
};

lemonadeChange([5,5,10,10,20]);
