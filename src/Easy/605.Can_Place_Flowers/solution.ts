function canPlaceFlowers(flowerbed: number[], n: number): boolean {
  if (n === 0) return true;

  for (let i = 0; i < flowerbed.length && n > 0; i++) {
    const curr = flowerbed[i];
    const prev = flowerbed[i-1] ?? 0;
    const next = flowerbed[i+1] ?? 0;
    if (curr === 0 && prev === 0 && next === 0) {
      n--;
      i++;
    }
  }

  return n === 0;
};
