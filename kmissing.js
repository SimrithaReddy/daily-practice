


// function missingK(vec, n, k) {
//     for (let i = 0; i < n; i++) {
//         if (vec[i] <= k) k++; // shifting k.
//         else break;
//     }
//     return k;
// }



function missingK(vec, n, k) {
    let low = 0, high = n - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        let missing = vec[mid] - (mid + 1);
        if (missing < k) {
            low = mid + 1;
        }
        else {
            high = mid - 1;
        }
    }
    return k + high + 1;
}



let vec = [2, 3, 4, 7, 11];
let n = 4, k = 4;
let ans = missingK(vec, n, k);
console.log("The missing number is:", ans);



