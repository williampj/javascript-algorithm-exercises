Now I Know My ABCs

A collection of spelling blocks has two letters per block, as shown in this list:

B:O   X:K   D:Q   C:P   N:A
G:T   R:E   F:S   J:W   H:U
V:I   L:Y   Z:M

This limits the words you can spell with the blocks to only those words that do not
use both letters from any given block. You can also only use each block once.

Write a function that takes a word string as an argument,
and returns true if the word can be spelled using the set of blocks, or false otherwise.
You can consider the letters to be case-insensitive when you apply the rules.

Examples:

isBlockWord('BATCH');      // true
isBlockWord('BUTCH');      // false
isBlockWord('jest');       // true

----------- My Approach ------------

rules
- 13 letter pairs
- each pair can be used max once
- case insensitive
- if a pair is reused, return false

input:
- string
output:
- boolean

console.log(isBlockWord('BATCH'));      // true
console.log(isBlockWord('BUTCH'));      // false
console.log(isBlockWord('jest'));       // true

ds:
- string (input)
- array of 2-char strings (one for each pair)
- array of used 2-char strings
- set match variable = false
- for loop to determine match
- boolean (output)

algo:
- pairsArray = array strings (letterpairs)
- usedParsArray
- uppercase input
- iterate each input letter with for loop (outer)
  - pass letter to function retrieving pair
    - if (regex/match every pair with input letter)
      - set match = false and return that if no matching pair
 - test if there is a match && match not already in usedPairs array
 - return true if we reach end of string

 ------------- My Solution ------------
// LS Alternative solution is best here 

function retrieveMatchingPair(letter) {
  const PAIRS_ARRAY = [
    'BO',
    'XK',
    'DQ',
    'CP',
    'NA',
    'GT',
    'RE',
    'FS',
    'JW',
    'HU',
    'VI',
    'LY',
    'ZM'
  ];
  return PAIRS_ARRAY.reduce((memo, currentPair) => {
    return currentPair.match(letter) ? currentPair : memo;
  }, false);
}

function isBlockWord(string) {
  const usedPairs = [];
  for (let i = 0; i < string.length; i += 1) {
    const retrievedPair = retrieveMatchingPair(string[i].toUpperCase());
    if (retrievedPair && !usedPairs.includes(retrievedPair)) {
      usedPairs.push(retrievedPair);
    } else {
      return false;
    }
  }
  return true;
}
console.log(isBlockWord('BATCH')); // true
console.log(isBlockWord('BUTCH')); // false
console.log(isBlockWord('jest')); // true
console.log(isBlockWord('floW')); // true
console.log(isBlockWord('APPLE')); // false
console.log(isBlockWord('apple')); // false
console.log(isBlockWord('apPLE')); // false
console.log(isBlockWord('Box')); // false

--------------- LS Approach ---------------

Understanding the Problem
There is a "Watch Others Code" video of this problem that you may refer to. Here is the link.

First, let's process the provided input and the expected output:

Input
The input of the program is a word as a string.
Output
A boolean value of true or false.
Rules
We need to map out the path from the input (a string) to the output (a boolean). We can derive the following requirements from the problem description:
We're given 13 two-letter blocks.
If the input contains any two letters from the same block, return false.
If a block is used more than once, return false.
Otherwise, return true.
Ignore case when applying the block rules.
Mental Model
If you study the requirements, you'll find that #3 supersedes #2. In other words, as long as we make sure that #3 is followed, #2 is also true, but not the other way around (for the cases where we may use the same letter twice in a word). So we're going to align our algorithm and solution more with #3, instead of #2. It might be hard to realize this point from the problem description alone, so let's work through more examples / test cases to better understand the problem.
Examples / Test Cases
The three examples given with the problem are not sufficient to cover all the edge cases. Let's write some more test cases to cover (1) case sensitivity and (2) repeated letters in a word:

isBlockWord('BATCH');      // true
isBlockWord('BUTCH');      // false
isBlockWord('jest');       // true
isBlockWord('floW');       // true
isBlockWord('APPLE');      // false
isBlockWord('apple');      // false
isBlockWord('apPLE');      // false
isBlockWord('Box');        // false

Data Structure and Algorithm:

There are two major decision points when it comes to the data structure: (1) how we represent the blocks 
and (2) how we represent the input string.

How we choose to represent the blocks depends on how we choose to mentally model the algorithm. 
If we model the algorithm as "marking the blocks as either used or unused", 
we can use an object to represent the blocks—using blocks as keys and boolean markers as property values.

However, if we mentally model the algorithm as "removing a block from a bucket of available blocks when that block is used", 
then we can use an array to represent the blocks. 
Either model works, but the array solution is simpler, and with built-in Array methods it will be easier to do what we need to do —
such as finding a block based on a letter and removing a block from the array. 
For this purpose, objects are heavier and don't give us many advantages.

The next decision is how to represent the blocks themselves. We'll use an array:

['BO', 'XK', 'DQ', 'CP', 'NA', 'GT', 'RE', 'FS', 'JW', 'HU', 'VI', 'LY', 'ZM']

The blocks are expressed in uppercase letters, so we'll need to change each letter to uppercase before searching for it in the blocks.

We could also use the following array to capture the implicit knowledge of letter cases:

['BObo', 'XKxk', 'DQdq', 'CPcp', 'NAna', 'GTgt', 'REre', 'FSfs', 'JWjw', 'HUhu', 'VIvi', 'LYly', 'ZMzm']

This would make our algorithm simpler because letter cases are handled by the data structure itself.

Now let's work on our algorithm. Since we've spent time planning and working through the problem on a higher level, 
the algorithm is straightforward:

Define an array that contains the 13 two-letter blocks
Turn the input string into an array of letters and iterate through it. For each letter:
If we can't find a block that contains the letter, return false
Otherwise, remove the block that contains the letter from the blocks array
Return true after we've processed all the letters in the input string

----------------- LS Solution --------------

function isBlockWord(word) {
  var blocks = ['BO', 'XK', 'DQ', 'CP', 'NA', 'GT', 'RE', 'FS', 'JW', 'HU', 'VI', 'LY', 'ZM'];
  var letters = word.split('');
  var matchingBlock;
  var i;

  for (i = 0; i < letters.length; i += 1) {
    matchingBlock = blocks.filter(function (block) {
      return block.indexOf(letters[i].toUpperCase()) > -1;
    })[0];

    if (matchingBlock === undefined) {
      return false;
    } else {
      blocks.splice(blocks.indexOf(matchingBlock), 1);
    }
  }

  return true;
}

----------  Alternative Algorithm -------------

One alternative algorithm involves using regex (regular expressions). 
We'll turn the blocks into an array of regex patterns, such as /B|O/gi. 
Then we'll match the word against all the block regex. 
Finally, we'll assert that there can't be more than one match for any regex — 
if there's more, it means that the word contains two letters in the same block.

----------- Alternative Solution ------------
// best solution 

function isBlockWord(word) {
  var blocks = ['B:O', 'X:K', 'D:Q', 'C:P', 'N:A', 'G:T', 'R:E', 'F:S', 'J:W', 'H:U', 'V:I', 'L:Y', 'Z:M'];
  var regExps = blocks.map(function (block) {
    return new RegExp(block.replace(':', '|'), 'gi');
  });

  return regExps.every(function (regExp) {
    return (word.match(regExp) || []).length < 2;
  });
}

Note that the String.prototype.match method returns null if no matches are found. 
This can be a problem if we try to access the length property on the return value of match when the match is unsuccessful.

For example, the expression 'BUTCH'.match(/B|O/gi) evaluates to ['B'], 
while the expression 'BUTCH'.match(/X|K/gi) evaluates to null. 
We use the expression (word.match(regExp) || []) to account for both of these possible outcomes. 
If the match is successful, the || operator short-circuits and the expression evaluates to the array of matches. 
Otherwise—since null is a falsy value—the expression will evaluate to an empty array. 
Because this expression is guaranteed to return an array, 
there's no chance that an error will be raised when we access the length property.

--------------- Student Solution -----------------
Label to break out of a nested loop 

function isBlockWord(string) {
  var blocks = [['B','O'], ['X','K'], ['D','Q'], ['C','P'], ['N','A'], ['G','T'], ['R','E'], ['F','S'], ['J','W'], ['H','U'], ['V','I'], ['L','Y'], ['Z','M']];
  var chars = string.split('').map(char => char.toUpperCase());

  outer: for (let i = 0; i < chars.length; i++) {
    for (let j = 0; j < blocks.length; j++) {
      if (chars[i] === blocks[j][0] || chars[i] === blocks[j][1]) {
        blocks.splice(j,1);
        continue outer;
      }
    }
    return false;
  }
  return true;
}