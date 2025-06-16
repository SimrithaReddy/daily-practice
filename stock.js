const nums = [7, 6, 4, 3, 2, 1];

let maxVal = 0;
let minVal = Number.POSITIVE_INFINITY;

for (let i = 0; i < nums.length; i++) {
    minVal = Math.min(minVal, nums[i]);
    maxVal = Math.max(maxVal, nums[i] - minVal);
};


console.log(maxVal);

