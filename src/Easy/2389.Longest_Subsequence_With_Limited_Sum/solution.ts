function answerQueries(nums: number[], queries: number[]): number[] {
  nums.sort((a, b) => a - b);

  for (let i = 1; i < nums.length; i++) {
    nums[i] += nums[i - 1];
  }

  const answer: number[] = [];

  for (const q of queries) {
    let left = 0;
    let right = nums.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] <= q) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    answer.push(left);
  }

  return answer;
}
