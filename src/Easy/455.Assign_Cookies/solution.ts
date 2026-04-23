function findContentChildren(g: number[], s: number[]): number {
    g.sort((a,b) => a-b);
    s.sort((a,b) => a-b);

    let count = 0;
    
    for (let j = 0, i = 0; j < s.length; j++) {
      if (g[i] <= s[j]) {
        i++;
        count++;
      }
    }

    return count;
};

findContentChildren([10,9,8,7], [5,6,7,8]);
