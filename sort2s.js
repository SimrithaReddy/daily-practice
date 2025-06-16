const arr = [2, 0, 1];


let low = 0;
let mid = 0;
let high = arr.length - 1;


while (mid <= high) {


    if (arr[mid] === 0) {
        let temp = arr[mid];
        arr[mid] = arr[low];
        arr[low] = temp;

        mid++;
        low++;

        console.log(arr);
    } else if (arr[mid] === 1) {
        mid++;
    } else if (arr[mid] === 2) {
        let temp = arr[high];
        arr[high] = arr[mid];
        arr[mid] = temp;

        high -= 1;
    };


};

console.log(arr);




