// var x = 9;

// console.log(x);

// var x =10;

// console.log(x);

let x = {}, y = { name: "Ronny" }, z = { name: "John" };
x[y] = { name: "Vivek" };

console.log(JSON.stringify(x,null,2));

x[z] = { name: "Akki" };

console.log(JSON.stringify(x, null, 2));

console.log(x[y]);
console.log(x[z]);



// function func1() {
//     setTimeout(() => {
//         console.log(x);
//         console.log(y);
//     }, 3000);
//     var x = 2;
//     let y = 12;
// }
// func1(); 
    
// function func2() {
//     for (var i = 0; i < 3; i++) {
//         setTimeout(() => console.log(i), 2000);
//     }
// }
// func2();
// (function () {
//     setTimeout(() => console.log(1), 2000);
//     console.log(2);
//     setTimeout(() => console.log(3), 0);
//     console.log(4);
// })(); 

