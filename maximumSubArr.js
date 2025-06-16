const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

// let sum = Number.NEGATIVE_INFINITY;

// let maxArr = [];

// for (let i = 0; i < nums.length; i++) {

//     let arrSum = nums[i];
//     const inArr = [nums[i]];

//     for (let j = i + 1; j < nums.length; j++) {

//         arrSum += nums[j];
//         inArr.push(nums[j]);

//         if (arrSum > sum) {
//             maxArr = [...inArr];
//             sum = arrSum;
//         };


//     };



// };

// console.log(sum, maxArr);


/**
 * Kadanes
 */


let maxSum = nums[0];
let currentSum = nums[0];
let start = 0;
let end = 0;
let tempStart = 0;

for (let i = 1; i < nums.length; i++) {
    if (currentSum + nums[i] < nums[i]) {
        currentSum = nums[i];
        tempStart = i;
    } else {
        currentSum += nums[i];
    }

    if (currentSum > maxSum) {
        maxSum = currentSum;8///88
        start = tempStart;
        end = i;
    }
}

const maxSubarray = nums.slice(start, end + 1);

console.log("Max sum:", maxSum);
console.log("Max subarray:", maxSubarray);


