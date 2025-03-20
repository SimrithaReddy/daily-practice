function duplicateFindFunction(arr) {

    let freqObj = {};
    let result = [];

    arr.map((num) => {
        freqObj[num] =  freqObj[num] + 1 || 1;
    });

    for (let key in freqObj) {
        if (freqObj[key] > 1) {
            result.push(Number(key));
        }
    };

    if (result.length === 0) {
        return -1;
    };

    result.sort((a, b) => a - b);
    return result;
};
const a = [1, 6, 5, 2, 3, 3, 2];;
const duplicatesFound = duplicateFindFunction(a);
console.log(duplicatesFound);
// console.log("Duplicate elements: " + duplicatesFound.join(" "));

