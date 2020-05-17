All Substrings

Write a function that returns a list of all substrings of a string.
Order the returned list by where in the string the substring begins.
This means that all substrings that start at position 0 should come first, then all substrings that start at position 1, and so on.
Since multiple substrings will occur at each position, return the substrings at a given position from shortest to longest.

You may (and should) use the substringsAtStart function you wrote in the previous exercise:

Example:

algo:
- for loop
  - pass string.slice(i) to substringsAtStart function
    - pass return value to outputArray
- return outputArray.flatten

----------- Solution ----------

function substringsAtStart(string) {
  return string
    .split('')
    .map((char, index, stringArray) => stringArray.slice(0, index + 1).join(''));
}

function substrings(string) {
  const returnArray = [];
  for (let i = 0; i < string.length; i += 1) {
    returnArray.push(substringsAtStart(string.slice(i)));
  }
  return returnArray.flat();
}

console.log(substrings('abcde'));

// returns
// [ "a", "ab", "abc", "abcd", "abcde",
//   "b", "bc", "bcd", "bcde",
//   "c", "cd", "cde",
//   "d", "de",
//   "e" ]

------------ LS Solution (better) ------------

function substrings(string) {
  return string
    .split('')
    .map((char, indx) => substringsAtStart(string.substring(indx)))
    .reduce((result, subary) => result.concat(subary));
}

console.log(substrings('abcde'));

// returns
// [ "a", "ab", "abc", "abcd", "abcde",
//   "b", "bc", "bcd", "bcde",
//   "c", "cd", "cde",
//   "d", "de",
//   "e" ]

---------- Discussion ------------

With the help of the substringsAtStart function written earlier, the shape of the problem becomes a combination of transformation and reduction. 
The solution transforms each substring of the string argument, starting from the first index (0), to an array using the substringsAtStart function. 

The solution reduces the transformation's result into one array by concatenating all of the arrays together.

If it weren't for the use of the substringsAtStart function, this problem could've easily become much more complicated to wrap our heads around.