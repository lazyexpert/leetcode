function productExceptSelf(nums: number[]): number[] {
    const left = new Array(nums.length);
    const result = new Array(nums.length);

    // fill left
    for (let i = 0; i < nums.length; i++) {
      if (i == 0) {
        left[i] = 1;
      } else {
        left[i] = left[i-1] * nums[i-1];
      }
    }

    // fill result
    let rightProd = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
      if (i < nums.length - 1) {
        
        rightProd *= nums[i+ 1];
      }
      result[i] = rightProd * left[i];
    }
    return result;
};