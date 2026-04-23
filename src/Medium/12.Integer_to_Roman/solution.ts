class IntToRomanRule {
  constructor(private symbol: string, private value: number) {}

  public modify(x: number, acc: string[]): number {
    while (x >= this.value) {
      acc.push(this.symbol);
      x -= this.value;
    }

    return x;
  }
}

const ruleSet = [
  new IntToRomanRule("M", 1000),
  new IntToRomanRule("CM", 900),
  new IntToRomanRule("D", 500),
  new IntToRomanRule("CD", 400),
  new IntToRomanRule("C", 100),
  new IntToRomanRule("XC", 90),
  new IntToRomanRule("L", 50),
  new IntToRomanRule("XL", 40),
  new IntToRomanRule("X", 10),
  new IntToRomanRule("IX", 9),
  new IntToRomanRule("V", 5),
  new IntToRomanRule("IV", 4),
  new IntToRomanRule("I", 1),
];

class RuleEngine {
  constructor(private ruleSet: IntToRomanRule[]) {}

  execute(x: number): string {
    const result: string[] = [];

    for (let i = 0; i < this.ruleSet.length && x > 0; i++) {
      x = this.ruleSet[i].modify(x, result);
    }

    return result.join("");
  }
}

const ruleEngine = new RuleEngine(ruleSet);

function intToRoman(num: number): string {
  return ruleEngine.execute(num);
}
