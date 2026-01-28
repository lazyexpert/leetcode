class IntegerStream {
  constructor(private n: number, private current:number = 1) {}

  public read(): number | null {
    if (this.current > this.n) return null;
    return this.current++;
  }
} 


function buildArray(target: number[], n: number): string[] {
  const stack: string[] = [];
  const stream = new IntegerStream(n);
  let idx = 0;

  while (idx < target.length) {
    const streamItem = stream.read();
    if (streamItem === null) break;

    stack.push("Push");

    if (streamItem !== target[idx]) {
      stack.push("Pop");
    } else {
      idx++;
    }
  }

  return stack;
}