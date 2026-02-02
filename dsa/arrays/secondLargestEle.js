
const arr1 = [3, 5, 6, 8, 7];




function secondLargestElementInArray(arr1) {

    let largest = -Infinity;
    let second = -Infinity;

    for (let num of nums) {

        if (num > largest) {
            second = largest;
            largest = num;
        }
        else if (num < largest && num > second) {
            second = num;
        }
    }

    return second === -Infinity ? -1 : second;
};


console.log(secondLargestElementInArray(arr1));





