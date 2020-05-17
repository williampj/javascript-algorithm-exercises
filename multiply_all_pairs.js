Multiply All Pairs

Write a function that takes two array arguments, each containing a list of numbers,
and returns a new array containing the products of all combinations of number pairs that exist between the two arrays.
The returned array should be sorted in ascending numerical order.

You may assume that neither argument will be an empty array.

Example:

algo:
- outputArray
- iterate first arg (outerNumber)
  - iterate second arg (innerNumber)
    - push to outputArray (outer * inner)

------------- Solution ------------

function multiplyAllPairs(aryOne, aryTwo) {
  const outputArray = [];
  aryOne.forEach((outerNumber) => {
    aryTwo.forEach((innerNumber) => {
      outputArray.push(outerNumber * innerNumber);
    });
  });
  return outputArray.sort((numOne, numTwo) => numOne - numTwo);
}

console.log(multiplyAllPairs([2, 4], [4, 3, 1, 2])); 
// => [2, 4, 4, 6, 8, 8, 12, 16]

--------- Discussion ------------

The solution uses the iteration list processing strategy because it is an efficient way of performing an action on each element in each array, 
and then updating the value of the result array with the result of each action. 
Together, the nested Array.prototype.forEach loops get all combinations of number pairs from the two arrays. 
The inner forEach loop multiplies the outer number1 by the inner number2, 
then pushes the product of the pair to the result array.

After the iteration finishes, the solution uses the Array.prototype.sort method to sort the values of the result array 
from lowest to highest, then returns the result.