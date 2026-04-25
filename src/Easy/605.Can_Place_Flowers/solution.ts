function canPlaceFlowers(flowerbed: number[], n: number): boolean {
  const dummy = [0, ...flowerbed, 0];
  for (let i = 1; i < dummy.length - 1 && n > 0; i ++) {
    if (dummy[i] === 0 && dummy[i-1] === 0 && dummy[i+1] === 0) {
      i++;
      n--;
    }
  }

  return n === 0;
};
