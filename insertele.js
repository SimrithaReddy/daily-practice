const nums = [1, 2, 4, 7, 10, 14, 18];
const target = 16;



let n = nums.length;
let low = 0;
let mid = 0;
let high = n - 1;

let i = n;



while (low <= high) {
    mid = Math.floor((low + high) / 2);

    if (nums[mid] >= target) {
        i = mid;
        high = mid - 1;
    }
    else if (nums[mid] < target) {
        low = mid + 1;
    }
};



console.log(i);
