import { ENOTCONN } from "constants"

Transpose 3x3

A 3x3 matrix can be represented by an array of arrays:
an outer array containing three subarrays that each contain three elements.
For example, the 3x3 matrix shown below:

1  5  8
4  7  2
3  9  6
is represented by the following array of arrays:

var matrix = [
  [1, 5, 8],
  [4, 7, 2],
  [3, 9, 6],
];

An array of arrays is sometimes called a "nested array" because each inner subarray is nested inside an outer array.
It also may be called a "two-dimensional array"

To access an element in the matrix, you can use bracket notation twice (such as array[][]),
and include both the row index and column index within the brackets.
Given the above matrix, matrix[0][2] is 8, and matrix[2][1] is 9.
An entire row in the matrix can be referenced using a single index:
matrix[1] is the row (subarray) [4, 7, 2].

Furthermore, given a row, we can determine the total number of columns by counting the number of elements in the row.
Unfortunately, a convenient notation for accessing an entire column does not exist.

The transpose of a 3x3 matrix is the matrix that results from exchanging the rows and columns of the original matrix.
For example, the transposition of the matrix shown above is:

1  4  3
5  7  9
8  2  6

Write a function that takes an array of arrays representing a 3x3 matrix,
and returns the transpose of the matrix.
You should implement the function on your own, without using any external libraries.

Take care not to modify the original matrix — your function must produce a new matrix and
leave the input matrix array unchanged.

Examples:

var matrix = [
  [1, 5, 8],
  [4, 7, 2],
  [3, 9, 6]
];

var newMatrix = transpose(matrix);

console.log(newMatrix);      // [[1, 4, 3], [5, 7, 9], [8, 2, 6]]
console.log(matrix);         // [[1, 5, 8], [4, 7, 2], [3, 9, 6]]

rules:
- First element of each subary becomes part of first row in new matrix
- Second element of each subary becomes part of second row in new matrix.

DS:
nested array - 3 x 3 (input)
new array (3 x 3) to return
  [...Array(matrix.length).keys()].map(key => [])
nested array - 3 x 3 (output)

algo:
- create new array with 3 arrays
  new Array(3)
- iterate outer array with index forEach
  - iterate inner array with index forEach
      push to outputArray[innerIndex, outerIndex
- return outputArray

--------- Solution --------

function transpose(matrix) {
  const transposed = [...Array(matrix.length).keys()].map(key => []);
  matrix.forEach((row, outerIndx) =>
    row.forEach((column, innerIndx) => {
      transposed[innerIndx][outerIndx] = column;
    })
  );
  return transposed;
}

const matrix = [[1, 5, 8], [4, 7, 2], [3, 9, 6]];

const newMatrix = transpose(matrix);

console.log(newMatrix); // [[1, 4, 3], [5, 7, 9], [8, 2, 6]]
console.log(matrix); // [[1, 5, 8], [4, 7, 2], [3, 9, 6]]

------------ LS Solution --------

function transpose(matrix) {
  const transposed = [];
  const newRowsCount = matrix[0].length;
  let rowIdx;
  let colIdx;

  for (rowIdx = 0; rowIdx < newRowsCount; rowIdx += 1) {
    transposed.push([]);
  }

  for (rowIdx = 0; rowIdx < matrix.length; rowIdx += 1) {
    for (colIdx = 0; colIdx < matrix[rowIdx].length; colIdx += 1) {
      transposed[colIdx].push(matrix[rowIdx][colIdx]);
    }
  }

  return transposed;
}

const matrix = [[1, 5, 8], [4, 7, 2], [3, 9, 6]];

const newMatrix = transpose(matrix);

console.log(newMatrix); // [[1, 4, 3], [5, 7, 9], [8, 2, 6]]
console.log(matrix); // [[1, 5, 8], [4, 7, 2], [3, 9, 6]]


------------- Discussion -----------

This solution can be a little hard to wrap your head around. It's not complicated—just difficult to visualize.

The solution transposes the matrix in two steps. 
The first step is to initialize the transposed matrix, 
using a loop to populate the initially empty transposed array with empty subarrays. 
The solution determines the number of subarrays based on the new number of rows, newRowsCount. 
The new number of rows comes from the length of any row of the input matrix, 
assuming that every row has the same length. Note that this length is equivalent to the number of columns 
of the input matrix.

Given the example matrix for this problem, the first loop creates three empty rows and 
pushes them to the transposed array, giving it a value of [[], [], []].

The second step is to populate the empty rows with the correct elements. 
The solution does this using a pair of for loops: an outer loop and a nested inner loop. 
The trick to the nested loops is reversing the index positions to populate the nested arrays. 
Typically, nested arrays are populated row-by-row, but the solution does it column-by-column.

To help visualize how these loops work, we'll walk through what happens during the first iteration of the outer loop:

- outer loop: `for (rowIdx = 0; rowIdx < matrix.length; rowIdx += 1)`
    matrix.length --> 3

  - inner loop: `for (colIdx = 0; colIdx < matrix[rowIdx].length; colIdx += 1)`
      matrix[rowIdx].length --> 3

      transposed --> [[], [], []]
      rowIdx --> 0
      colIdx --> 0
      transposed[0].push(matrix[0][0]);

      transposed --> [[1], [], []]
      rowIdx --> 0
      colIdx --> 1
      transposed[1].push(matrix[0][1]);

      transposed --> [[1], [5], []]
      rowIdx --> 0
      colIdx --> 2
      transposed[2].push(matrix[0][2]);

    transposed --> [[1], [5], [8]]

---------- Student Solution ---------

// 1: clever: 

function transpose(matrix) {
  return matrix[0].map((_, index) => {
    return matrix.map(subArray => subArray[index]);
  })
}

// 2: easy to read w/ abstraction 

function transpose(matrix) {
  var newMatrix = [];
  var i;

  for (i = 0; i < matrix.length; i += 1) {
    newMatrix.push(columnFromMatrix(matrix, i))
  }

  return newMatrix;
}

function columnFromMatrix(matrix, index) {
  var row = []
  matrix.forEach((array) => row.push(array[index]));
  return row;
}

// 3: one-liner 

const transpose = array => array.map((_, idx, arr) => [arr[0][idx], arr[1][idx], arr[2][idx]]);


