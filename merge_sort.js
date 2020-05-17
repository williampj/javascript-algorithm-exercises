Merge Sort

Merge sort is a recursive sorting algorithm that works by breaking down an array's elements into nested subarrays,
then combining those nested subarrays back together in sorted order.
It is best explained with an example. Given the array [9, 5, 7, 1],
let's walk through the process of sorting it with merge sort.
We'll start off by breaking the array down into nested subarrays:

[9, 5, 7, 1] -->
[[9, 5], [7, 1]] -->
[[[9], [5]], [[7], [1]]]

We then work our way back to a flat array by merging each pair of nested subarrays back together in the proper order:

[[[9], [5]], [[7], [1]]] -->
[[5, 9], [1, 7]] -->
[1, 5, 7, 9]

Write a function that takes an array,
and returns a new array that contains the values from the input array in sorted order.
The function should sort the array using the merge sort algorithm as described above.
You may assume that every element of the array will be of the same data type—either all numbers or all strings.

Feel free to use the merge function you wrote in the previous exercise.

Examples:

mergeSort([9, 5, 7, 1]);           // [1, 5, 7, 9]
mergeSort([5, 3]);                 // [3, 5]
mergeSort([6, 2, 7, 1, 4]);        // [1, 2, 4, 6, 7]

mergeSort(['Sue', 'Pete', 'Alice', 'Tyler', 'Rachel', 'Kim', 'Bonnie']);
// ["Alice", "Bonnie", "Kim", "Pete", "Rachel", "Sue", "Tyler"]

mergeSort([7, 3, 9, 15, 23, 1, 6, 51, 22, 37, 54, 43, 5, 25, 35, 18, 46]);
// [1, 3, 5, 6, 7, 9, 15, 18, 22, 23, 25, 35, 37, 43, 46, 51, 54]

Rules:
- break down array into subarrays, then combine subarrays into sorted arrays
- all input string or number
- recursive

Abstraction:
- break array in two
  - keep splitting subarrays in two until all subarrays have 1 element
- combine each successive two subarrays until only 1 array
  - sort the combined subarrays

2 recursions?
- splitArray Function
  - return input array if length is 1 // stopping condition
  - first half slice(0, lenght / 2 )
  - second half slice (length / 2 )
  - otherwise, recursive call ([first half, second half])

- combineArrays Function
  - return array if array length is 1 // meaning there's just one, sorted subarray
  - else
    - call combineArrays again on both halves from array[0] and array[1] // unpack in two 
      - pass the two halves to merge Function (will be two 1-element arrays in the beginning, then larger)                
      // it was split in two on the way down, so we unpack in two halves in reverse on the way up

algo:
- pass input to splitArray Function
- pass returned array to combineArrays Function
- returns result

------------------- Solution -----------

function merge(array1, array2) {
  const copy1 = array1.slice();
  const copy2 = array2.slice();
  const result = [];

  while (copy1.length > 0 && copy2.length > 0) {
    result.push(copy1[0] <= copy2[0] ? copy1.shift() : copy2.shift());
  }

  return result.concat(...copy1, ...copy2);
}

function nestArray(ary) {
  if (ary.length === 1) {
    return ary;
  }

  const firstHalf = ary.slice(0, ary.length / 2);
  const secondHalf = ary.slice(ary.length / 2);
  return [nestArray(firstHalf), nestArray(secondHalf)];
}

function sortArray(ary) {
  if (ary.length === 1) {
    return ary; // stopping condition - want to sort arrays with one element.
  }
  return merge(sortArray(ary[0]), sortArray(ary[1]));
}

function mergeSort(ary) {
  const nestedArray = nestArray(ary);
  return sortArray(nestedArray);
}

console.log(
  mergeSort(['Sue', 'Pete', 'Alice', 'Tyler', 'Rachel', 'Kim', 'Bonnie'])
);
// // ["Alice", "Bonnie", "Kim", "Pete", "Rachel", "Sue", "Tyler"]

// console.log(
console.log(
  mergeSort([7, 3, 9, 15, 23, 1, 6, 51, 22, 37, 54, 43, 5, 25, 35, 18, 46])
);

------------ LS Solution ---------

function mergeSort(array) {
  var subArray1;
  var subArray2;

  if (array.length === 1) {
    return array;
  }

  subArray1 = array.slice(0, array.length / 2);
  subArray2 = array.slice(array.length / 2);

  subArray1 = mergeSort(subArray1); // creates nested arrays. They both become just one number
  subArray2 = mergeSort(subArray2); //      -- || -- 

  return merge(subArray1, subArray2); // first merges to one-element arrays, then larger and larger 
}

----------- Discussion ----------

Merge sort is one of the more efficient sorting algorithms. 
However, because of its efficiency, it can be difficult to understand — 
not to say that everything that is efficient is hard to understand. 

Let's break it down step by step.

Our mergeSort function takes the array argument and slices it down the middle into two smaller subarrays. 
When the length of the array argument is even, the two subarrays will both have the same length. 
Otherwise, when the length is odd, subArray1 will be one element shorter than subArray2. 
We do this to break down our sorting procedure into smaller, more manageable steps, 
but it doesn't actually make a difference whether we put the extra element in the first or the second array.

After splitting the array into two subarrays, we call the mergeSort function recursively, 
first on one of the subarrays, and then on the next. 
Each of these two recursive calls sorts the current subarray, 
breaking it down into smaller and smaller parts by repeating this process until 
we reach the trivial case of sorting a one-element array — at which point we just return the array as is.

Once we have the subarray results, we merge them back together using our merge function from the previous exercise. 
With each merge, we take two small subarrays and combine them together to return a larger array 
that contains all the elements from both subarrays. 
We repeat this process at each level of recursion until we reach the top level. 

Finally, we return the merged and sorted array to the caller.

