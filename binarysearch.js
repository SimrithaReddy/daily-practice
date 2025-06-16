const arr = [10, 2, 3, 6, 9, 10, 21, 23, 25, 28, 29];
const target = 10;


// let low = 0;
// let high = arr.length - 1;
let n = arr.length;

let mid;


/**PB 1 */
// let i = -1;

// while (low <= high) {

//     mid = Math.floor((low + high) / 2);
//     // console.log(arr[mid]);
//     if (arr[mid] > target) {
//         high = mid - 1;
//     } else if (arr[mid] < target) {
//         low = mid + 1;
//     } else if (arr[mid] === target) {
//         i = mid;
//         break;
//     };


// };


// console.log(i);





/**Recursive PB 1 */
// function recursiveSearch(arr, low, high) {

//     if (low > high) return -1;

//     mid = Math.floor((low + high) / 2);


//     if (arr[mid] === target) {
//         return mid;
//     }
//     else if (arr[mid] > target) {
//         return recursiveSearch(arr, low, mid - 1);
//     }
//     else if (arr[mid] < target) {
//         return recursiveSearch(arr, mid + 1, high);
//     };

// };

// const val = recursiveSearch(arr, low, high);

// console.log(val, "val>>>>>>>>>>>>");





/**Recursive PB 1 */



/*****************Implement Lower Bound****************************/




let lowBound = -1;
function lowerBound(arr, n, x) {

    // console.log(arr, n, x);

    let low = 0, high = n - 1;
    let ans = n;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        // maybe an answer
        if (arr[mid] >= x) {
            ans = mid;
            // look for smaller index on the left
            high = mid - 1;
        }
        else {
            low = mid + 1; // look on the right
        }
    }
    return ans;
};

let ind = lowerBound(arr, n, target);
console.log("The lower bound is the index:", ind);





