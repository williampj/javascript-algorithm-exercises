Caesar Cipher

Write a function that implements the Caesar Cipher.
The Caesar Cipher is one of the earliest and simplest ways to encrypt plaintext so that a message can be transmitted securely.
It is a substitution cipher in which each letter in a plaintext is substituted by the letter located a given number of positions away
in the alphabet. For example, if the letter 'A' is right-shifted by 3 positions, it will be substituted with the letter 'D'.
This shift value is often referred to as the key. The "encrypted plaintext" (ciphertext) can be decoded using this key value.

The Caesar Cipher only encrypts letters (including both lower and upper case).
Any other character is left as is.
The substituted letters are in the same letter case as the original letter.
If the key value for shifting exceeds the length of the alphabet, it wraps around from the beginning.

--------- My Approach ------------

rules:
- iterate each char in string arg
  - if it's a letter, retrieve its ASCII value and increment it with 2nd argument.
    - if we surpass the 26-letter same-case alphabet, start from the beginning
  - if not a letter, leave as is
- return revised string

ds:
- string & integer (inputs)
- array: split string argument
- function taking both arguments
  - outputs new shifted char
- string (output)

Examples:
// simple shift
caesarEncrypt('A', 0);       // "A"
caesarEncrypt('A', 3);       // "D"

// wrap around
caesarEncrypt('y', 5);       // "d"
caesarEncrypt('a', 47);      // "v"

// all letters
caesarEncrypt('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 25);// "ZABCDEFGHIJKLMNOPQRSTUVWXY"
caesarEncrypt('The quick brown fox jumps over the lazy dog!', 5); // "Ymj vznhp gwtbs ktc ozrux tajw ymj qfed itl!"

// many non-letters
caesarEncrypt('There are, as you can see, many punctuations. Right?; Wrong?', 2); // "Vjgtg ctg, cu aqw ecp ugg, ocpa rwpevwcvkqpu. Tkijv?; Ytqpi?"

algo:
- split the string to array of chars
- map the array of chars
  - pass each to function shifting chars
    - lowerChar base integer
    - lowerChar upper limit
    - upperChar base integer
    - upperChar upper limit
    - if not a letter, return char
    - if char is lowercase
        - set its shiftedAscii value to ascii value + shift arg
        - take remainder from upper limit (ascii % limit) and add to base number
        - convert remainder to char
- join and return array

--------- My Solution ------------

function shiftChar(char, shifts) {
  // if (/[^a-z]/i.test(char)) {
  //   return char;
  // }
  const base = /[a-z]/.test(char) ? 97 : 65;
  const alphabetSize = 26;
  const shiftedAscii =
    ((char.charCodeAt(0) - base + shifts) % alphabetSize) + base;
  return String.fromCharCode(shiftedAscii);
}

function caesarEncrypt(string, shifts) {
  const charsArray = string.split('');
  return charsArray.map(char => /[^a-z]/i.test(char) ? char : shiftChar(char, shifts)).join('');
}

// simple shift
console.log(caesarEncrypt('A', 0)); // "A"
console.log(caesarEncrypt('A', 3)); // "D"

// wrap around
console.log(caesarEncrypt('y', 5)); // "d"
console.log(caesarEncrypt('a', 47)); // "v"

// all letters
console.log(caesarEncrypt('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 25));
// "ZABCDEFGHIJKLMNOPQRSTUVWXY"
console.log(caesarEncrypt('The quick brown fox jumps over the lazy dog!', 5));
// "Ymj vznhp gwtbs ktc ozrux tajw ymj qfed itl!"

// many non-letters
console.log(
  caesarEncrypt(
    'There are, as you can see, many punctuations. Right?; Wrong?',
    2
  )
);
// "Vjgtg ctg, cu aqw ecp ugg, ocpa rwpevwcvkqpu. Tkijv?; Ytqpi?"

-------------- LS Approach --------------

Understanding the Problem:
Let's break down the problem using the description and the given test cases, then analyze the requirements.

Input
plaintext: any sequence of characters.
key: an integer greater than or equal to 0. Its value can be greater than the number of letters in the alphabet.

Output
ciphertext: a sequence of characters. It has the same number of characters as the plaintext. 
It is the "encrypted" version of the plaintext.

Requirement/Rules: let's go through the problem and analyze the requirements for processing the input to get the output.

"Encrypt plaintext"
- We encrypt the plaintext by shifting the position of each letter by the value of the key.
- To shift the position of a letter, first we step key number of times to the right from the letter's position 
in the alphabet to find the new letter, and then we substitute the current letter with the new letter.
- If the character isn't a letter, we leave it as is.
For example, given a key of 3, we'll shift the characters 't', 'T', and '#' as shown below:

Wrap around when the key value exceeds the length of the alphabet
We can visualize wrapping around by thinking of the alphabet as a chain of alphabets linked together. 
Each link is joined by the last and first letters, such as '...xyzabc...'. 
So when the value of the key makes us step past the alphabet's length (beyond letter 'z'), 
we just need to continue along the chain to the next alphabet link.
Mathematically, we can think of "wrapping around" as restarting the count from the beginning of the alphabet. 
We can do this by adding the value of the key to the position of the character to be encrypted. 
Then we'll subtract 26 from the sum until we get a value less than or equal to 26 ('z'/'Z').
For example, given a key of 8, we'll shift the letter 't' as shown below:

Notice that "wrapping around" is dependent on two things: 
(1) the position of the current letter in the alphabet and (2) the value of the key. 
If the position is at the last letter in the alphabet ('z'), 
we would have to "wrap around" even with a key value as low as 1. 
Likewise, if the key value is greater than or equal to 27, 
we would have to wrap around even if the position is at the first letter in the alphabet ('a').

Mental Model

Going over our requirements from above, we can approach "encrypting" the plaintext in at least 2 ways: 
(1) we can map each character to its "encrypted" counterpart, or 
(2) we can use the plaintext to incrementally build the ciphertext one character at a time, starting from an empty string. 
Both options are easy to work with, but for demonstration purposes, we'll go with the second one: 
incrementally building the ciphertext.
We'll also need to decide how to "wrap around". 
We'll take a literal approach and use "alphabet strings" as "chain links" to construct a "chain" of alphabets. 
We'll keep track of the current letter's position in the alphabet, 
and add a chain link every time the value of the key will make us step past the end of the chain link we're currently in.

Data Structure and Algorithm
For our data structure, we'll use strings to represent the alphabet chain and alphabet links, 
and we'll use an array of characters for working with the plaintext.

Now that we've broken down the problem and chosen a data structure, let's work on our algorithm:

Initialize a ciphertext variable to an empty string.
Iterate over each character of the plaintext input.
If the character is a letter in the alphabet, check if it's upper or lower case, "encrypt" it accordingly, 
and then append it to ciphertext.
Locate the current letter in the alphabet to get its position.
Step key times from this position to the right.
If a step goes beyond the last letter in the alphabet, add another "alphabet link".
After the last step, append the new letter to ciphertext.
If the character is not in the alphabet, append it as-is to ciphertext.
After the Caesar encryption is complete, return the ciphertext.

----------------- LS Solution --------------

function caesarEncrypt(plaintext, key) {
  var upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
  var ciphertext = '';

  plaintext.split('').forEach(function (char) {
    if (char >= 'A' && char <= 'Z') {
      ciphertext += encrypt(char, key, upperAlphabet);
    } else if (char >= 'a' && char <= 'z') {
      ciphertext += encrypt(char, key, lowerAlphabet);
    } else {
      ciphertext += char;
    }
  });

  return ciphertext;
}

function encrypt(letter, key, alphabet) {
  var letterPos = alphabet.indexOf(letter);
  var step;

  for (step = 1; step <= key; step += 1) {
    if (!alphabet[letterPos + step]) {
      alphabet += alphabet;
    }

    letter = alphabet[letterPos + step];
  }

  return letter;
}

------------ Alternative Mental Model and Algorithm ----------

If you're mathematically inclined, an alternative mental model is to use the ASCII value of the character 
and the length of the alphabet to encrypt the plaintext via mathematical computation.

In this version of the encryption, we'll use the fixed number of characters in the alphabet to normalize upper 
and lower case letters by subtracting a base value. Once the letters are normalized, 
we'll use the remainder operator (%) to "wrap around" the alphabet value with the key. 
The value returned is the string representation of the ASCII value of alphabet value + base value.

Notice that the % operator has the same effect as subtracting 26 every time the sum of the letter's position in alphabet 
and the value of the key exceeds the position of the letters 'z' or 'Z'. 
Using the % operator is beneficial because it handles the situation where the value of the key makes us exceed 'z'/'Z' multiple times.

The only difference in this version of the algorithm is step #2. The other steps remain the same.


------------- Alternative Solution -----------------

function caesarEncrypt(plaintext, key) {
  var ciphertext = '';

  plaintext.split('').forEach(function (char) {
    if (char >= 'A' && char <= 'Z') {
      ciphertext += encrypt(char, key, 'upper');
    } else if (char >= 'a' && char <= 'z') {
      ciphertext += encrypt(char, key, 'lower');
    } else {
      ciphertext += char;
    }
  });

  return ciphertext;
}

function encrypt(letter, key, letterCase) {
  var base = letterCase === 'upper' ? 65 : 97;
  var charCode = letter.charCodeAt(0) - base;
  var shifted = (charCode + key) % 26;

  return String.fromCharCode(shifted + base);
}

----------- Student solution 1 ---------

Erring on the side of readability ...

function caesarEncrypt(plaintext, key) {
  var alphabet = 'abcdefghijklmnopqrstuvwxyz';

  function letterAt(index) {
    return alphabet[index];
  }

  function index(char) {
    return alphabet.indexOf(char);
  }

  function isLetter(char) {
    return index(char.toLowerCase()) !== -1;
  }

  function isLowercaseLetter(char) {
    return index(char) !== -1;
  }

  function shift(lowerCaseLetter) {
    return letterAt((index(lowerCaseLetter) + key) % alphabet.length);
  }

  function encrypt(char) {
    if (isLowercaseLetter(char)) {
      return shift(char);
    } else if (isLetter(char)) {
      return shift(char.toLowerCase()).toUpperCase();
    } else {
      return char;
    }
  }

  return plaintext.split('').map(encrypt).join('');
}

------------ Student solution 2 -------------
Intelligent solution:
- Using a replace which automatically ignores non-letters (smart),
- Keeping second function within main function so it has access to shift argument 

function caesarEncrypt(string, shift) {
  function encryptedLetter(letter) {
    const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
    let isLowerCase = /[a-z]/.test(letter);
    shift = ALPHABET.indexOf(letter.toLowerCase()) + shift; // shift is available through lexical scope. i'm not crazy about not being able to explicitly pass shift into the function.

    return isLowerCase ? ALPHABET[shift % 26] : ALPHABET[shift % 26].toUpperCase();
  }

  return string.replace(/[a-z]/gi, encryptedLetter);
}

------------ My revised solution ----------

function caesarEncrypt(string, shifts) {
  const shiftChar = char => {
    const base = /[a-z]/.test(char) ? 97 : 65;
    const shiftedAscii = ((char.charCodeAt(0) - base + shifts) % 26) + base;
    return String.fromCharCode(shiftedAscii);
  };

  return string.replace(/[a-z]/gi, shiftChar);
}