// function leftRotate(arr, k) {
//     const n = arr.length;
//     k = k % n; // In case k > n

//     console.log("k:", k);
//     for (let i = 0; i < k; i++) {
//         // Take the first element
//         const first = arr[0];

//         // Shift all elements to the left by one
//         for (let j = 0; j < n - 1; j++) {
//             arr[j] = arr[j + 1];
//         }

//         // Put the first element at the end
//         arr[n - 1] = first;
//     }

//     return arr;
// }

function reverse(arr, start, end) {
    while (start < end) {
        let temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
}

function leftRotate(arr, k) {
    const n = arr.length;
    k = k % n;

    reverse(arr, 0, k - 1);     // Reverse first k elements
    reverse(arr, k, n - 1);     // Reverse the rest
    reverse(arr, 0, n - 1);     // Reverse the whole array
}


function rightRotate(arr, k) {
    const n = arr.length;
    k = k % n;

    reverse(arr, 0, n - 1);       // Step 1: Reverse the whole array
    reverse(arr, 0, k - 1);       // Step 2: Reverse first k elements
    reverse(arr, k, n - 1);       // Step 3: Reverse the rest
}
  

// Example:
const arr = [1, 2, 3, 4, 5];
let n = 8;
// leftRotate(arr, n);
rightRotate(arr, n);
console.log("Left rotated by", n,":", arr);
  