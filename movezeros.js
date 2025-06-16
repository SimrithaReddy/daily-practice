function moveZeros(arr) {
    const n = arr.length;
    let j = -1;
    for (let i = 0; i < n; i++) {
        if (arr[i] === 0) {
            j = i;
            break;
        }
    }

    if (j === -1) return arr;

    console.log(j);

    for (let i = j + 1; i < n; i++) {
        if (arr[i] !== 0) {

            console.log(arr[i]);
            [arr[i], arr[j]] = [arr[j], arr[i]];

            console.log(arr, i);
            j++;
        }
    }
    return arr;
};


const arr = [1, 0, 2, 3, 4, 0, 0, 1];

moveZeros(arr);

console.log(arr);


