// Sum of Digits

// Write a function that takes one argument, a positive integer, and returns the sum of its digits.
// Do this using list processing techniques.

// Examples:

// algo:
// 1:- to string, split, map to Number, reduce(sum)
// 2: - to string, split, reduce(sum)

// ------------ Solution ---------

// function sum(num) {
//   return String(num)
//     .split('')
//     .reduce((total, stringDigit) => total + Number(stringDigit), 0);
// }

// console.log(sum(23)); // 5
// console.log(sum(496)); // 19
// console.log(sum(123456789)); // 45

// // ---------- LS Solution -------

// function sum(number) {
//   return String(number).split('').map(function (numString) {
//     return parseInt(numString, 10);
//   }).reduce(function (total, num) {
//     return total + num;
//   });
// }

// ---------- Discussion ----------

// The solution uses a series of list processing techniques — Array.prototype.map and
// Array.prototype.reduce — to get the sum of the digits.
// To use the list processing techniques, the solution converts the numerical argument number to a string,
// then splits it using an empty string as a separator to get each character.
// The resulting array of numerical strings is then mapped back to integers and
// then consequently added up together using the Array.prototype.reduce method.

const foo = {
  bar: 10,
  multiplyByBar(...args) {
    args.forEach(arg => console.log(arg * this.bar)); // arrow function does not change the context
  },
};

const qux = foo.multiplyByBar.bind(foo);

qux(5); // logs 50
qux(5, 10, 15); // logs 50, then 100, then 150

// Hihger order equivalent
// Author time

function filter(arr, filtrationTest) {
  const filteredArray = [];
  let current;

  for (let i = 0; i < arr.length; i += 1) {
    current = arr[i];
    if (filtrationTest(current)) {
      filteredArray.push(current);
    }
  }
  return filteredArray;
}

// Invocation time
const filtered = filter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], num => num % 2 === 0);
console.log(filtered);
