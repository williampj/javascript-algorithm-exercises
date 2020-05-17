Transpose MxN

In the previous exercise, you wrote a function that transposed a 3x3 matrix
represented by an array of arrays.

Matrix transposes are not limited to 3x3 matrices, or even square matrices.
Any matrix can be transposed simply by switching columns with rows.

Modify your transpose function from the previous exercise so that it works with any MxN matrix
with at least one row and one column.

Examples:

transpose([[1, 2, 3, 4]]);            // [[1], [2], [3], [4]]
transpose([[1], [2], [3], [4]]);      // [[1, 2, 3, 4]]
transpose([[1]]);                     // [[1]]

transpose([[1, 2, 3, 4, 5], [4, 3, 2, 1, 0], [3, 7, 8, 6, 2]]);
// [[1, 4, 3], [2, 3, 7], [3, 2, 8], [4, 1, 6], [5, 0, 2]]

rules:
- create empty array with elements equal to length of first subarry of input array
- iterate each subarray
  - pushing the element to the outputarray subarray equal to its index

algo:
- create empty array
  - [...Array(inputarray[0].length).keys()].map(el => [])
- forEach iterate the input array
  - forEach iterate the subarry
    - outputArray[index].push number

---------- Solution --------
    
function transpose(ary) {
  const newAry = [...Array(ary[0].length).keys()].map(() => []);
  ary.forEach(row => {
    row.forEach((num, colIndx) => newAry[colIndx].push(num));
  });
  return newAry;
}

console.log(transpose([[1, 2, 3, 4]])); // [[1], [2], [3], [4]]
console.log(transpose([[1], [2], [3], [4]])); // [[1, 2, 3, 4]]
console.log(transpose([[1]])); // [[1]]

console.log(transpose([[1, 2, 3, 4, 5], [4, 3, 2, 1, 0], [3, 7, 8, 6, 2]]));
// [[1, 4, 3], [2, 3, 7], [3, 2, 8], [4, 1, 6], [5, 0, 2]]

----------- LS Solution ---------

function transpose(matrix) {
  var transposed = [];
  var newRowsCount = matrix[0].length;
  var rowIdx;
  var colIdx;

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

----------- Discussion ----------

The solution from the previous transpose 3x3 exercise already works for transposing a MxN matrix.

Let's do one sample run to visualize how it works:

var matrix = [[1, 2, 3, 4, 5], [4, 3, 2, 1, 0], [3, 7, 8, 6, 2]];

- outer loop: `for (rowIdx = 0; rowIdx < matrix.length; rowIdx += 1)`
    matrix.length --> 3

  - inner loop: `for (colIdx = 0; colIdx < matrix[rowIdx].length; colIdx += 1)`
      matrix[rowIdx].length --> 5

      transposed --> [[], [], [], [], []]
      rowIdx --> 0
      colIdx --> 0
      transposed[0].push(matrix[0][0]);

      transposed --> [[1], [], [], [], []]
      rowIdx --> 0
      colIdx --> 1
      transposed[1].push(matrix[0][1]);

      transposed --> [[1], [2], [], [], []]
      rowIdx --> 0
      colIdx --> 2
      transposed[2].push(matrix[0][2]);

      transposed --> [[1], [2], [3], [], []]
      rowIdx --> 0
      colIdx --> 3
      transposed[3].push(matrix[0][3]);

      transposed --> [[1], [2], [3], [4], []]
      rowIdx --> 0
      colIdx --> 4
      transposed[4].push(matrix[0][4]);

    transposed --> [[1], [2], [3], [4], [5]]

------- Student solutions -------

// clever, slightly complex to read

const transpose = matrix =>
matrix[0].map((_, idx) =>
  matrix.reduce((result, subArr) => {   // note, it's reducing the outer matrix here 
    return result.concat(subArr[idx]);
  }, [])
);

// 

function transpose(matrix) {
  var column = function column(index) {
    return matrix.map(function (row) {
      return row[index];
    });
  };

  var indices = Object.keys(matrix[0]);
  return indices.map(column);
}