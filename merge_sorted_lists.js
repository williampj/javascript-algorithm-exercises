Merge Sorted Lists

Write a function that takes two sorted arrays as arguments,
and returns a new array that contains all the elements from both input arrays in sorted order.

You may not provide any solution that requires you to sort the result array.
You must build the result array one element at a time in the proper order.

Your solution should not mutate the input arrays.

Examples:

merge([1, 5, 9], [2, 6, 8]);      // [1, 2, 5, 6, 8, 9]
merge([1, 1, 3], [2, 2]);         // [1, 1, 2, 2, 3]
merge([], [1, 4, 5]);             // [1, 4, 5]
merge([1, 4, 5], []);             // [1, 4, 5]

Rules:
- not mutate input array
- build outputArray one at a time

DS:
2 sorted arrays (inputs)
pointer var (for 2nd array)
1 sorted array (output)

Mental model 1:
- iterate through first array
- for each Number, see if it is small than numbers from second array starting at counter
  - if yes, add to outputarray and iterate i 
  - else, add number from second array at counter and iterate counter
if remaining second array numbers, push them using a while loop 

------------ Solution -------

function merge(ary1, ary2) {
  const newArray = [];
  let indx2 = 0;
  for (let indx1 = 0; indx1 < ary1.length; ) {
    if (ary1[indx1] <= ary2[indx2] || !ary2[indx2]) {
      newArray.push(ary1[indx1]);
      indx1 += 1;
    } else {
      newArray.push(ary2[indx2]);
      indx2 += 1;
    }
  }
  while (indx2 < ary2.length) {
    newArray.push(ary2[indx2]);
    indx2 += 1;
  }
  return newArray;
}

console.log(merge([1, 5, 9], [2, 6, 8])); // [1, 2, 5, 6, 8, 9]
console.log(merge([1, 1, 3], [2, 2])); // [1, 1, 2, 2, 3]
console.log(merge([], [1, 4, 5])); // [1, 4, 5]
console.log(merge([1, 4, 5], [])); // [1, 4, 5]

----------- LS Solution ------------

function merge(array1, array2) {
  var copy1 = array1.slice();
  var copy2 = array2.slice();
  var result = [];

  while (copy1.length > 0 && copy2.length > 0) {
    result.push(copy1[0] <= copy2[0] ? copy1.shift() : copy2.shift());
  }

  return result.concat(copy1.length === 0 ? copy2 : copy1);
}

---------- Discussion ----------

The problem's requirements — especially the rule that mutation is not allowed — 
make the solution more complicated to a degree that depends on how they are handled.

The provided solution handles the non-mutation rule by first creating a copy of each input array. 
Next, the solution uses a while loop to incrementally build the result array. 
During each iteration, the solution compares the first element from the first array copy 
with the first element from the second array copy, and removes the element with the lower value from its array copy. 
Since the two array copies are already sorted, 
comparing the first elements like this guarantees that the lowest value between both array copies is selected, 
removed, and pushed to the result array—ensuring that it is built in the properly sorted order. 
The loop repeats this process until one of the array copies is empty.

After the loop finishes, the solution concatenates the remaining elements from the non-empty array copy 
to the result array, and returns the result of this concatenation: 
a new array containing all the elements from both input arrays in sorted order.

--------- Student solution --------

const merge = ([arr1, arr2]) => {
  const copyArr1 = [...arr1];
  const copyArr2 = [...arr2];
  return [...arr1, ...arr2].reduce((result, _) => {
      let [x, y] = [copyArr1[0], copyArr2[0]];
      x && y && result.push(x > y ? copyArr2.shift() : copyArr1.shift());
      return result;
  }, []).concat([...copyArr1, ...copyArr2]); // concatenating the remainder 
};