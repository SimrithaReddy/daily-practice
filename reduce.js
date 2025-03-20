const numbers = [1, 2, 3, 4, 5];

//Type 1:
// The initial value of accumulator is set to 0 (the second argument of reduce).

const sum = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
}, 0);

console.log(sum); // Output: 15


// Flattening an array of arrays:
// Initial Value:

// The initial value of accumulator is set to an empty array [] (the second argument of reduce).
// First Iteration:

// accumulator = []
// currentValue = [1, 2]
// accumulator.concat(currentValue) = [].concat([1, 2]) = [1, 2]
// accumulator is now [1, 2]
// Second Iteration:

// accumulator = [1, 2]
// currentValue = [3, 4]
// accumulator.concat(currentValue) = [1, 2].concat([3, 4]) = [1, 2, 3, 4]
// accumulator is now [1, 2, 3, 4]
// Third Iteration:

// accumulator = [1, 2, 3, 4]
// currentValue = [5, 6]
// accumulator.concat(currentValue) = [1, 2, 3, 4].concat([5, 6]) = [1, 2, 3, 4, 5, 6]
// accumulator is now [1, 2, 3, 4, 5, 6]const arrays = [[1, 2], [3, 4], [5, 6]];

const arrays = [[1, 2], [3, 4], [5, 6]];

const flattened = arrays.reduce((accumulator, currentValue) => {
    return accumulator.concat(currentValue);
}, []);

console.log(flattened);

// 3.Counting instances of values in an array:
const names = ['Alice', 'Bob', 'Alice', 'Charlie', 'Bob', 'Alice'];

const nameCount = names.reduce((accumulator, currentValue) => {
    accumulator[currentValue] = (accumulator[currentValue] || 0) + 1;
    return accumulator;
}, {});

console.log(nameCount); // Output: { Alice: 3, Bob: 2, Charlie: 1 }

