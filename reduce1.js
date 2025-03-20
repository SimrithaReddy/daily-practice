const names = ["alice", "john", "monkey", "abright", "monkey"];


const obj = names.reduce((acc, currentValue) => {
    acc[currentValue] = acc[currentValue] + 1 || 0;
    return acc;
}, {});


console.log(obj);


const arrays = [[1, 2], [3, 4], [5, 6]];


const arr2 = arrays.reduce((acc, cV) => {

    return acc.concat(cV);
}, []);

console.log(arr2);
