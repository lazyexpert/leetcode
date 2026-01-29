function exclusiveTime(n: number, logs: string[]): number[] {
  const res = new Array(n).fill(0);
  const stack: number[] = [];
  let prevTime = 0;

  for (const log of logs) {
    const [idStr, op, timeStr] = log.split(":");
    const id = Number(idStr);
    const t = Number(timeStr);

    if (op === "start") {
      if (stack.length > 0) {
        res[stack[stack.length - 1]] += t - prevTime;
      }
      stack.push(id);
      prevTime = t;
    } else {
      // end
      res[stack.pop()!] += t - prevTime + 1;
      prevTime = t + 1;
    }
  }

  return res;
}
