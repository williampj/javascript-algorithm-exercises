Grocery List

Write a function that takes a grocery list (a two-dimensional array) with each element containing a fruit and a quantity,
and returns a one-dimensional array of fruits, in which each fruit appears a number of times equal to its quantity.

Example:

buyFruit([['apple', 3], ['orange', 1], ['banana', 2]]);
returns ["apple", "apple", "apple", "orange", "banana", "banana"]

algo:
- map each item to subarray of repeated strings   -
  - for loop (i, i < cv[1])
  - push word to temporary array 
  - flatten the result 

------------ Solution -------------
// flatMap is the same as calling map() and then flat() on an object

function buyFruit(fruitList) {
  return fruitList.flatMap((item) => {
    const ary = [];
    for (let i = 0; i < item[1]; i += 1) {
      ary.push(item[0]);
    }
    return ary;
  });
}

console.log(buyFruit([['apple', 3], ['orange', 1], ['banana', 2]]));
// returns ["apple", "apple", "apple", "orange", "banana", "banana"]

------------- LS Solution --------------
// basically same approach, only doing a reduce function to concatenate the results instead of a flat() operation 

function buyFruit(fruitsList) {
  return fruitsList.map(function (fruit) {
    return repeat(fruit);
  }).reduce(function (groceryList, fruit) {
    return groceryList.concat(fruit);
  });
}

function repeat(fruit) {
  var result = [];
  var i;

  for (i = 0; i < fruit[1]; i += 1) {
    result.push(fruit[0]);
  }

  return result;
}

---------------- Discussion -----------------

To get the expected result, the solution makes use of two list processing strategies.

The first is to transform the array elements into the expanded grocery list 
with each item repeated based on the quantity value (second element of each subarray). 

The second strategy is to flatten the array of arrays using a folding strategy, 
which flattens the array by consecutively concatenating each subarray together. 

The solution also makes use of a repeat helper function to facilitate the transformation of the original array's elements.


----------- Optimized student solution ---------------

// Array.fill 
  // Array(3) => [undefined, undefined, undefined] 
  // [undefined, undefined, undefined].fill('hi)] => [hi, hi, hi]

function buyFruit(fruitList) {
  return fruitList.flatMap(item => Array(item[1]).fill(item[0]));
}

console.log(buyFruit([['apple', 3], ['orange', 1], ['banana', 2]]));
// returns ["apple", "apple", "apple", "orange", "banana", "banana"]
