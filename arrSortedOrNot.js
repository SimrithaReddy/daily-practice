/**
 * Problem Statement: Given an array of size n, write a program to check if the given array is sorted in (ascending / Increasing / Non-decreasing) order or not. If the array is sorted then return True, Else return False.

Note: Two consecutive equal values are considered to be sorted.

Example 1:
Input: N = 5, array[] = {1,2,3,4,5}
Output: True.
Explanation: The given array is sorted i.e Every element in the array is smaller than or equals to its next values, So the answer is True.
 */



let arr = [1, 2, 3, 4, 5];

let ascendingFlag = 1;

for (let i = 1; i < arr.length; i++) {

    const currVal = arr[i];
    const nxtVal = arr[i - 1];

    if (currVal !== nxtVal && nxtVal < currVal) {
        ascendingFlag = 0;
    };

};

if (ascendingFlag) console.log("True")
else console.log("False");



