Leading Substrings

Write a function that takes a string argument, and returns a list of all substrings that start from the beginning of the string,
ordered from shortest to longest.

Examples:

algo:
- split('')
- map(el, index, splitArray)
  - ary.slice(0, index + 1).join('')

------------ Solution ---------

function substringsAtStart(string) {
  return string
    .split('')
    .map((char, index, stringArray) => stringArray.slice(0, index + 1).join(''));
}

console.log(substringsAtStart('abc')); // ["a", "ab", "abc"]
console.log(substringsAtStart('a')); // ["a"]
console.log(substringsAtStart('xyzzy')); // ["x", "xy", "xyz", "xyzz", "xyzzy"]

----------- LS Solution ---------

function substringsAtStart(string) {
  return string.split('').map(function (char, idx, stringArray) {
    return stringArray.slice(0, idx + 1).join('');
  });
}

----------- Discussion ----------

The shape of this problem is that of transformation.
The key is to recognize that each element transforms into a substring of the string argument,
always starting from the first character up to, but not including, the current index plus 1.
Recognizing this, the solution uses the Array.prototype.slice method to map the current element of the split string to its respective substring.
