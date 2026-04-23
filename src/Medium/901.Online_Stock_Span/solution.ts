class StockSpanner {
  // monotonic decreasing stack: [price, span]
  private data: Array<[number, number]> = [];

  next(price: number): number {
    let span = 1;

    while (this.data.length > 0 && price >= this.data[this.data.length - 1][0]) {
      span += this.data.pop()![1];
    }

    this.data.push([price, span]);
    return span;
  }
}

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */

function testStockSpanner() {
  const stockSpanner = new StockSpanner();
  stockSpanner.next(100); // return 1
  stockSpanner.next(80);  // return 1
  stockSpanner.next(60);  // return 1
  stockSpanner.next(70);  // return 2
  stockSpanner.next(60);  // return 1
  stockSpanner.next(75);  // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price.
  stockSpanner.next(85);  // return 6
}

testStockSpanner();