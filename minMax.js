const arr = [9, 4, 5, 9, 10, 1, 0, -1, 2, 2, 4];

let firstMin = Infinity, secondMin = Infinity;
let firstMax = -Infinity, secondMax = -Infinity;

for (let num of arr) {
    // For min
    if (num < firstMin) {
        secondMin = firstMin;
        firstMin = num;
    } else if (num < secondMin && num !== firstMin) {
        secondMin = num;
    }

    // For max
    if (num > firstMax) {
        secondMax = firstMax;
        firstMax = num;
    } else if (num > secondMax && num !== firstMax) {
        secondMax = num;
    }
}

console.log("1st Min:", firstMin);
console.log("2nd Min:", secondMin);
console.log("1st Max:", firstMax);
console.log("2nd Max:", secondMax);
