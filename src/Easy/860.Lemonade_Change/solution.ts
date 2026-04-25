function lemonadeChange(bills: number[]): boolean {
  let balance = {
    5: 0,
    10: 0, 
    20: 0
  };

  for (let i = 0; i < bills.length; i ++) {
    const bill = bills[i];
    
    if (bill === 20) {
      let left = 15;
      if (balance[10] >= 1) {
        balance[10]--;
        left = 5;
      } 

      balance[5] -= left / 5;
      if (balance[5] < 0) return false;
      balance[20]++;
    } else if (bill === 10) {
      balance[5]--;
      if (balance[5] < 0) return false;
      balance[10]++;
    } else {
      balance[5]++;
    }
  }

  return true;
};
