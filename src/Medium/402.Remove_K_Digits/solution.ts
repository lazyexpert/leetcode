function removeKdigits(num: string, k: number): string {
  const stack = new Array<string>();

  for (let i = 0; i < num.length; i++) {
    const ch = num[i];
    while (stack.length > 0 && stack[stack.length-1] > ch && k > 0) {
      stack.pop();
      k--;
    }
    stack.push(ch);
  }

  // If k still remains, remove from the end (largest impact is at the end now)
  while (k > 0 && stack.length > 0) {
    stack.pop();
    k--;
  }

  // Remove leading zeros
  let start = 0;
  while (start < stack.length && stack[start] === "0") start++;

  const res = stack.slice(start).join("");
  return res.length ? res : "0";
};

removeKdigits("100", 1);
