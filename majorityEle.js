/**
 * Majority ele apperaing more than N/2 times in array.
 */
const arr = [3, 2, 3];



// let arr = [2, 2, 1, 1, 1, 2, 2];



let ele;
let count = 0;
let n = arr.length;

console.log(arr.length);

for (let i = 0; i < arr.length; i++) {

    const num = arr[i];

    if (count === 0) {
        ele = arr[i];
        count = 1;
    }
    else if (ele === num) count++
    else count--;



};

let cnt1 = 0;
for (let i = 0; i < n; i++) {
    if (arr[i] === ele) {
        cnt1++;
    }
}
console.log(ele);

