// const arr = [1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4];

// let red = 0;
// let black = 1;

// for (let i = red; i < arr.length; i++) {

//     const currVal = arr[i];
//     const nxtVal = arr[black];





// };

function removeDuplicates(arr) {
    let i = 0;
    for (let j = 1; j < arr.length; j++) {
        if (arr[i] !== arr[j]) {
            i++;
            arr[i] = arr[j];
        }
    }
    return i + 1;
}

const arr = [1, 1, 2, 2, 2, 3, 3];
// const k = removeDuplicates(arr);

const noDuplicateArr = [arr[0]];

for (let i = 0; i < arr?.length - 1; i++) {

    if (arr[i] !== arr[i + 1]) {
        noDuplicateArr.push(arr[i + 1]);
    };
};

console.log("The array after removing duplicate elements is noDuplicateArr:", noDuplicateArr);

// console.log("The array after removing duplicate elements is:", k, arr);
// for (let i = 0; i < k; i++) {
//     console.log(arr[i]);
// }




