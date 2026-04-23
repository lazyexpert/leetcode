function myAtoi(s: string): number {
    const INT_MAX = 2147483647;
    const INT_MIN = -2147483648;

    s = s.trim();
    let pointer = 0;
    let sign = 1;
    const firstChar = s[0];
    if (firstChar === '-') {
        sign = -1;
        pointer++;
    } else if (firstChar === '+') {
        pointer++;
    }

    let acc = 0;
    for (let i = pointer; i < s.length; i++) {
        const char = s[i];
        if (char < '0' || char > '9') break;
        acc = acc * 10 + Number(char);

        if (acc * sign > INT_MAX) return INT_MAX;
        if (acc * sign < INT_MIN) return INT_MIN;
    }

    return acc * sign;
};

myAtoi("4193 with words");