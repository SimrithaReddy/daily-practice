// function solve(str) {
//     if (str.length === 0) return [0, ""];

//     let maxLength = 0;
//     let maxSubstring = "";
//     const setx = new Set();
//     let l = 0;

//     for (let r = 0; r < str.length; r++) {
//         while (setx.has(str[r])) {
//             setx.delete(str[l]);
//             l++;
//         }
//         setx.add(str[r]);

//         if (r - l + 1 > maxLength) {
//             maxLength = r - l + 1;
//             maxSubstring = str.substring(l, r + 1);
//         }
//     }

//     return [maxLength, maxSubstring];
// }

// const str = "takeUforward";
// const [length, substring] = solve(str);
// console.log("The length of the longest substring without repeating characters is:", length);
// console.log("The longest substring is:", substring);


function longestUniqueSubstring(str) {
    const map = new Map(); // stores character -> last seen index
    let left = 0, maxLen = 0, maxSubstr = "";

    for (let right = 0; right < str.length; right++) {
        const char = str[right];

        if (map.has(char) && map.get(char) >= left) {
            left = map.get(char) + 1;
        }

        map.set(char, right);

        if (right - left + 1 > maxLen) {
            maxLen = right - left + 1;
            maxSubstr = str.substring(left, right + 1);
        }
    }

    return [maxLen, maxSubstr];
}

// 🔍 Example Usage
const input = "takeUforward";
const [length, substring] = longestUniqueSubstring(input);

console.log("The length of the longest substring without repeating characters is:", length);
console.log("The longest substring is:", substring);
function numSubarraysWithSum(nums, goal) {
    const prefixMap = new Map();
    prefixMap.set(0, 1); // base case: empty subarray with sum 0

    let count = 0;
    let sum = 0;

    for (const num of nums) {
        sum += num;

        if (prefixMap.has(sum - goal)) {
            count += prefixMap.get(sum - goal);
        }

        prefixMap.set(sum, (prefixMap.get(sum) || 0) + 1);
    }

    return count;
}
