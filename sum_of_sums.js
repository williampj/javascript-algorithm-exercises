Sum of Sums

Write a function that takes an array of numbers, and returns the sum of the sums of each leading subsequence for that array.
You may assume that the array always contains at least one number.

Examples:

algo:
- var currentSum = 0
- array of numbers  = []
iterate array arg
- add element to array of numbers
- reduce the array of numbers => add rv to currentSum
return currentSum

// Solution 1 

function sumOfSums(ary) {
  let currentSum = 0;
  const runningNumbers = [];
  ary.forEach(num => {
    runningNumbers.push(num);
    currentSum += runningNumbers.reduce((sum, currentNum) => sum + currentNum);
  });
  return currentSum;
}

// Solution 2: 

function sumOfSums(ary) {
  const runningNumbers = [];
  return ary.reduce((sum, currentNum) => {
    runningNumbers.push(currentNum);
    return sum + runningNumbers.reduce((acc, currentValue) => acc + currentValue);
  }, 0);
}

console.log(sumOfSums([3, 5, 2])); // (3) + (3 + 5) + (3 + 5 + 2) --> 21
console.log(sumOfSums([1, 5, 7, 3])); // (1) + (1 + 5) + (1 + 5 + 7) + (1 + 5 + 7 + 3) --> 36
console.log(sumOfSums([4])); // 4
console.log(sumOfSums([1, 2, 3, 4, 5])); // 35

--------- LS Solution -------------

function sumOfSums(numbers) {
  return numbers.map(function (number, idx) {
    return numbers.slice(0, idx + 1).reduce(function (sum, value) {
      return sum + value;
    });
  }).reduce(function (sum, value) {
    return sum + value;
  });
}

// LS Solution using ES6 syntax 

const sumOfSums = function reduceSumsOfSubarrays(array) {
  const sum = (total, value) => total += value;
  return array.map((val, index) => array.slice(0, index + 1).reduce(sum)).reduce(sum);
};

----------- Discussion ------------

This solution can be bit tricky to look at. Let's break it down using a list processing approach so that it's easier to make sense of. 
Let's take a look at what happens when the array, [3, 5, 2], is passed as an argument:

The solution first transforms the input array of numbers into its expanded form. 
Each element is mapped to a subarray containing a leading subsequence of elements from the input array. 
The length of each subarray is equal to the value of that subarray's index plus 1.
[[3], [3, 5], [3, 5, 2]]    // result from `slice`

Next, the solution reduces the values of each subarray, adding them together to get their sum.
[3, 8, 10]                  // result from `map` and first `reduce`

Finally, the solution reduces one more time. This time it adds all the sums together to get the sum of sums, and returns it.
21                          // result from second `reduce`