Write a function that displays a four-pointed diamond in an nxn grid, 
where n is an odd integer supplied as an argument to the function. 
You may assume that the argument will always be an odd integer.

Examples:

diamond(1);
// logs
*
diamond(3);
// logs
 *
***
 *
diamond(9);
// logs
    *
   ***
  *****
 *******
*********
 *******
  *****
   ***
    *

------------- My Approach ---------------

rules:
- odd number of lines equal to input number 
- width of each line is equal to input number 
- middle line is filled with stars 
- first line (1 star) = (input - numStars)/2 spaces + numStars + (input - numStars)/2 spaces
- second line (3 stars) = (input - numStars)/2 spaces + numStars + (input - numStars)/2 spaces
- middle line: all stars 
- then reverse 

input: - integer (number of lines)
output: - string (diamond)

abstr: 
- set outputArray 
- iterate from 1 to (input -2), increment by 2 
  - set spaces = input - i  
  - spaces/2 + i*stars + spaces/2 
- set bottomHalf = outputArray.slice().reverse()
- add line of stars*input 
- add bottomw half 
- join subarrays('\n')

------------- My Solution --------------

function diamond(lines) {
  const upperHalf = [];
  for (let i = 1; i < lines; i += 2) {
    const padding = ' '.repeat((lines - i) / 2);
    upperHalf.push(`${padding}${'*'.repeat(i)}${padding}`);
  }
  const middleLine = '*'.repeat(lines);
  const bottomHalf = upperHalf.slice().reverse();
  console.log(upperHalf.concat(middleLine, bottomHalf).join('\n'));
}

diamond(1);
// logs
//* 
diamond(3);
// logs
//  *
// ***
//  *
diamond(9);
// logs
//     *
//    ***
//   *****
//  *******
// *********
//  *******
//   *****
//    ***
//     *

------------ Further Exploration ------------

The current solution builds a solid diamond—refactor it to build a hollow diamond.

// Using a regex with lookahead and lookbehind 

function hollowDiamond(lines) {
  const upperHalf = [];
  for (let i = 1; i < lines; i += 2) {
    const padding = ' '.repeat((lines - i) / 2);
    upperHalf.push(`${padding}${'*'.repeat(i)}${padding}`);
  }
  const middleLine = '*'.repeat(lines);
  const bottomHalf = upperHalf.slice().reverse();
  const fullDiamond = upperHalf.concat(middleLine, bottomHalf);
  const hollowDiamond = fullDiamond.map(line => {
    return line.replace(/(?<=\*.*)\*(?=.*\*)/g, ' '); // remove star if star behind or ahead 
  });
  console.log(hollowDiamond.join('\n'));
}

hollowDiamond(1);
// logs
//* 
hollowDiamond(3);
// logs
//  *
// * *
//  *
hollowDiamond(9);
// logs
//     *
//    * *
//   *   *
//  *     *
// *       *
//  *     *
//   *   *
//    * *
//     *

----------- Student math solution -----------

function diamond(n) {
  for (let i = 0; i < n; i++) {
    var half = Math.floor(n/2);
    var spaces = Math.abs(half - i);
    var stars = Math.abs(spaces - half) * 2 +1;
    var line = ' '.repeat(spaces) + '*'.repeat(stars);
    console.log(line);
  }
}

--------------- LS Approach ------------------

Understanding the Problem

Input
An odd integer n that represents the size of the diamond
n represents the total number of rows, as well as the width of the widest row
Output
The return value of the function is not significant
The program should print out a diamond made up of * characters
Requirements

A big part of this exercise is to translate the implicit requirements of "diamond shapes" 
to precise and explicit requirements that can be used to solve the problem. 
This can be done in a few different ways, such as the one shown below:
Using n = 5 as an example:

Each row is a string of asterisks, prepended by spaces
The 5 rows will have 1, 3, 5, 3, and 1 asterisks
The 5 rows will have 2, 1, 0, 1, and 2 spaces prepended
Mental Model

Given the above, we can come up with a general model for a diamond of size n:
Each row is a string of asterisks, prepended by spaces
The n rows will have 1, 3, ... n, ... 3, 1 asterisks
Each row will have (n - countOfAsterisks) / 2 spaces
There are other ways to model diamonds, such as breaking the diamond into two parts 
(a top triangle and a reverse/bottom triangle). The way you mentally model the diamond shape will dictate your algorithm 
and your code solution.
Algorithm
Looking at the way we have broken down the problem, the core algorithm is to generate a sequence of numbers:

1, 3, 5, ... n, n-2, ... 1

for a given odd number n. Once we have this sequence of numbers, we can use it to represent the number of asterisks for each row, 
and then the rest of the problem is not too difficult:

for each number in this sequence
  log out the concatenation of `(n - number) / 2` spaces and `number` asterisks
We're going to use the following algorithm to generate the sequence of numbers:

Initialize increment to 2
Start with the first number, 1, incrementing the number by increment with each step
When the number is equal to n, flip the increment to -2
Stop when we get to a negative number

--------------------- LS Solution -----------------
NB: Very convoluted  

function diamond(n) {
  numberSequence(n).forEach(function (number) {
    console.log(repeat(' ', (n - number) / 2) + repeat('*', number));
  });
}

function numberSequence(n) {
  var result = [];
  var increment = 2;
  var number;

  for (number = 1; number > 0; number += increment) {
    result.push(number);
    if (number === n) {
      increment = -2;
    }
  }

  return result;
}

function repeat(char, times) {
  var repeated = '';
  var i;

  for (i = 0; i < times; i += 1) {
    repeated += char;
  }

  return repeated;
}

------------- Discussion ------------

The key to solving this problem is to break it down into smaller problems.

The smaller problem of generating the number sequence is much easier to solve than the larger problem of 
thinking through the rows of the diamond and what string to output for each row. 
This is something that you should always be mindful of—if you're feeling that you're working with too much complexity, 
take a step back and spend some time to think about how you can break the problem down into smaller problems, 
instead of just powering through.

Also, a note on the repeat function: in our solution, we built a small implementation of the function ourselves. 
If you use ES6, check out the String.prototype.repeat method, which is much more powerful.

