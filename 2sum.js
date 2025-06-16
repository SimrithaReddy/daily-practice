const arr = [6, 7, 6, 15];

const sum = 12;
// const keysObj = {};


// for (let i = 0; i < arr.length; i++) {
//     keysObj[arr[i]] = keysObj[arr[i]] + 1 || 1;
// };


// const set = new Set(arr);
// console.log(keysObj);

// for (let i = 0; i < arr.length; i++) {

//     const num = arr[i];

//     const diffNum = sum - arr[i];


//     if (keysObj[diffNum] > 0) {
//         console.log(num, diffNum);
//         keysObj[diffNum] = keysObj[diffNum] - 1;
//         keysObj[num] = keysObj[num] - 1;
//     };



// };

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    const obj = {};

    let st = -1, ei = -1;
    for (let i = 0; i < nums.length; i++) {
        let diff = target - nums[i];
        if (obj[diff]) {
            st = obj[diff] - 1;
            ei = i;
        };
        obj[nums[i]] = i + 1;
    };


    if (st !== -1) return [st, ei];
    return -1;


};


console.log(twoSum(arr, sum));

