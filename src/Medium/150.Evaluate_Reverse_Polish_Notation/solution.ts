function evalRPN(tokens: string[]): number {
  const stack: number[] = [];
  const ops = new Set(["+", "-", "*", "/"]);

  for (const t of tokens) {
    if (!ops.has(t)) {
      stack.push(Number(t));
      continue;
    }

    const b = stack.pop()!;
    const a = stack.pop()!;

    switch (t) {
      case "+": stack.push(a + b); break;
      case "-": stack.push(a - b); break;
      case "*": stack.push(a * b); break;
      case "/": stack.push(Math.trunc(a / b)); break;
    }
  }

  return stack[0];
}