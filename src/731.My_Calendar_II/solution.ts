class MyCalendarTwo {
  booked: number[][] = [];
  overlaps: number[][] = [];

  book(start: number, end: number): boolean {
    // 1. if intersects overlaps -> false
    for (let i = 0; i < this.overlaps.length; i++) {
      const [s, e] = this.overlaps[i];
      if (s < end && start < e) return false;
    }

    // 2. for each booked:
    //    if intersects -> push intersection to overlaps
    for (let i = 0; i < this.booked.length; i++) {
      const [s, e] = this.booked[i];
      if (s < end && start < e) {
        // [10,20] [15, 25]
        this.overlaps.push([Math.max(s, start), Math.min(e, end)]);
      }
    }

    // 3. booked.push([start, end])
    this.booked.push([start, end]);
    return true;
  }
}