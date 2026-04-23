function popCount(x: number): number {
  let count = 0;
  while (x!=0) {
    x &= x-1;
    count++;
  }
  return count;
}

function sortByBits(arr: number[]): number[] {
  return arr.sort((a,b) => {
    const ac = popCount(a);
    const bc = popCount(b);

    return ac === bc ? a - b : ac - bc;
  });
};

sortByBits([1024,512,256,128,64,32,16,8,4,2,1]);
