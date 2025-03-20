let arr = [1, 15, 14, 4, 3, 11, 2, 5, 1, 30];
let sum = 5;

findTwoSumPairs(arr, sum);

function findTwoSumPairs(arr, sum) {
    let map = new Map();

    for (let i = 0; i < arr.length; i++) {
        let complement = sum - arr[i];
        if (map.has(complement)) {
            // if (map.has(complement) && map.get(complement) > 0) {
            console.log(`(${complement}, ${arr[i]})`);
            // map.set(complement, 1);
        }
        // else if (map.has(arr[i])) {
        //     map.set(arr[i], map.get(arr[i]) + 1);
        // }
        // else {
        // }
        map.set(arr[i], 1);
    }

}
