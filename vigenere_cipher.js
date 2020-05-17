// Vigenere Cipher

// The Vigenere Cipher encrypts alphabetic text using polyalphabetic substitution.
// It uses a series of Caesar Ciphers based on the letters of a keyword.
// Each letter of the keyword is treated as a shift value.
// For instance, the letter 'B' corresponds to a shift value of 1, and the letter 'd' corresponds to a shift value of 3.
// In other words, the shift value used for a letter is equal to its index value in the alphabet.
// This means that the letters 'a'-'z' are equivalent to the numbers 0-25. The uppercase letters 'A'-'Z' are also equivalent to 0-25.

// Applying the Vigenere Cipher is done sequentially for each character by applying the current shift value to a Caesar Cipher
// for that particular character. To make this more concrete, let's look at the following example:

// plaintext: Pineapples don't go on pizzas!
// keyword: meat

// Applying the Vigenere Cipher for each alphabetic character:
// plaintext : Pine appl esdo ntgo onpi zzas
// shift     : meat meat meat meat meat meat
// ciphertext: Bmnx mtpe qwdh zxgh arpb ldal

// result: Bmnxmtpeqw dhz'x gh ar pbldal!
// Notice that in the example, the key isn't moved forward if the character isn't in the alphabet.
// Like the Caesar Cipher, the Vigenere Cipher only encrypts alphabetic characters.

// Write a function that implements the Vigenere Cipher. The case of the keyword doesn't matter—in other words,
// the resulting encryption won't change depending on the case of the keyword's letters (e.g., 'MEat' === 'mEaT').

// For a quick lookup of a ciphertext per character, you may consult this tabula recta.
// Each row of the table corresponds to a Caesar Cipher encryption using the columns' character letter as a shift value.

// rules:
// - a keyword consists of shifting keys
//   - a = 0, etc. up to 26
// - iterate a string
//   - if a letter, pass it to the caesaer cipher with the key generated from the keyword
//   - else, keep as is

// DS:
// string - word (input)
// string - keyword (input)
// array of numbers - to store converted keyword keys (from letters to numbers)
// number - pointer for key array (0-3)
// function - ceasar cipher from last exercise
// string - output

// algo:
// - create keys array =
//   keyword.replace(/[a-z]/g, letter => letter.charCodeAt(0) - 97);
// - set pointer = 0
// - replace call on word
//   - /[a-z]/gi, letter => casarCipher(letter.toLowerCase())
//     inside caesar cipher function: use keys[pointer] to set letter
//     reassign pointer to (pointer + 1) % 4

const caesarEncrypt = (char, shifts) => {
  const base = /[a-z]/.test(char) ? 97 : 65;
  const shiftedAscii = ((char.charCodeAt(0) - base + shifts) % 26) + base;
  return String.fromCharCode(shiftedAscii);
};

const viginereEncrypt = (string, keyword) => {
  const keysArray = keyword
    .toLowerCase()
    .split('')
    .map(char => char.charCodeAt(0) - 97);

  const getNextKey = () => {
    const nextKey = keysArray.shift();
    keysArray.push(nextKey);
    return nextKey;
  };

  return string.replace(/[a-z]/gi, char => caesarEncrypt(char, getNextKey()));
};

// Applying the Vigenere Cipher for each alphabetic character:
// plaintext : Pine appl esdo ntgo onpi zzas
// shift     : meat meat meat meat meat meat
// ciphertext: Bmnx mtpe qwdh zxgh arpb ldal

// result: Bmnxmtpeqw dhz'x gh ar pbldal!

console.log(viginereEncrypt("Pineapples don't go on pizzas!", 'meat'));
console.log(viginereEncrypt("Pineapples don't go on pizzas!", 'mEaT'));
console.log(viginereEncrypt('Dog', 'rabbit'));

------------------ LS Approach -----------------

Understanding the Problem

Input
plaintext: any sequence of characters.
keyword: any sequence of characters. Case does not matter.

Output
ciphertext: a sequence of characters. It has the same number of characters as the plaintext. It is the "encrypted" version of the plaintext.

Requirements: let's go through the problem and analyze the requirements for processing the input to get the output.
An important piece of information from the problem description is that the Vigenere Cipher is a series of Caesar Ciphers. 
This means we can use our previous knowledge of the Caesar Cipher as a baseline, and then identify and process any differences to make adjustments as needed.
Each character of the keyword is a "shift" value
Referencing the Caesar Cipher problem, we can think of the shift value as the key the cipher uses to encrypt a plaintext letter.
In contrast to having only one key value, the Vigenere Cipher uses multiple key values.
Given the problem description and the example, it's not apparent what happens when non-alphabetic characters are included in the keyword. 
For now, we'll assume that it will contain only letters. The statement that "case does not matter" supports this assumption, because the word, "case", is associated with letters.
Sequentially apply the shift values to each alphabetic character, using a Caesar Cipher.
Looking at the example above, we can see that each shift value is used one at a time, repetitively, 
for all the alphabetic characters in the ciphertext.
Similar to how the alphabetic characters wrap around when there is a need to exceed the letter 'z'/'Z', the shift value also wraps around for as long as there are plaintext characters to encrypt.

Examples / Test Cases
To make the requirements more concrete, let's go over some more test cases. 
You can use the tabula recta to assist you in working through these test cases by hand.

plaintext: Pineapples don't go on pizzas!
keyword: A

Applying the Vigenere Cipher for each alphabetic character:
plaintext: P i n e a p p l e s d o n t g o o n p i z z a s
shift:     A A A A A A A A A A A A A A A A A A A A A A A A
ciphertext: P i n e a p p l e s d o n t g o o n p i z z a s

result: Pineapples don't go on pizzas!
plaintext: Pineapples don't go on pizzas!
keyword: Aa

Applying the Vigenere Cipher for each alphabetic character:
plaintext: Pi ne ap pl es do nt go on pi zz as
shift:     Aa Aa Aa Aa Aa Aa Aa Aa Aa Aa Aa Aa
ciphertext: Pi ne ap pl es do nt go on pi zz as

result: Pineapples don't go on pizzas!
plaintext: Pineapples don't go on pizzas!
keyword: cab

Applying the Vigenere Cipher for each alphabetic character:
plaintext: Pin eap ple sdo ntg oon piz zas
shift:     cab cab cab cab cab cab cab cab
ciphertext: Rio gaq rlf udp pth qoo ria bat

result: Riogaqrlfu dpp't hq oo riabat!
plaintext: Dog
keyword: Rabbit

Applying the Vigenere Cipher for each alphabetic character:
plaintext: Dog
shift:     Rab
ciphertext: Uoh

result: Uoh

Data Structure and Algorithm
Our data structure and algorithm are very similar to what we used for the Caesar Cipher problem. 
The main difference in this algorithm is the addition of steps #2, #3, and the first and last bullets of step #4.1.

Initialize a ciphertext variable to an empty string.
Initialize a keyPos variable to 0.
Capitalize all the letters of the keyword input.
Iterate over each character of the plaintext input.
If the character is a letter in the alphabet, check if it's upper or lower case, "encrypt" it accordingly, and then append it to ciphertext.
Locate the current keyword letter in the alphabet and store its position value in key.
Locate the current plaintext letter in the alphabet to get its position.
Step key times from this position to the right.
If a step goes beyond the last letter in the alphabet, add another "alphabet link".
After the last step, append the new letter to ciphertext.
Add 1 to keyPos and divide the result by the length of the keyword to get the remainder. Set the value of keyPos to this remainder.
If the character is not in the alphabet, append it as-is to ciphertext.
After the Vigenere encryption is complete, return the ciphertext.

------------------- Solution -----------------

function vigenereEncrypt(plaintext, keyword) {
  var upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
  var ciphertext = '';
  var keyPos = 0;
  keyword = keyword.toUpperCase();
  var key;

  plaintext.split('').forEach(function (char) {
    if (char >= 'A' && char <= 'Z') {
      key = upperAlphabet.indexOf(keyword[keyPos]);
      ciphertext += encrypt(char, key, upperAlphabet);
      keyPos = (keyPos + 1) % keyword.length;
    } else if (char >= 'a' && char <= 'z') {
      key = upperAlphabet.indexOf(keyword[keyPos]);
      ciphertext += encrypt(char, key, lowerAlphabet);
      keyPos = (keyPos + 1) % keyword.length;
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

-------------- Discussion ---------------

For this exercise, the most critical step of the PEDAC process is "Understanding the Problem". 
We took advantage of our previous analysis of the Caesar Cipher problem by applying what we learned to this problem. 
This made it much easier to break the problem down and process the requirements. 
With more practice—even if it weren't explicitly mentioned that the Vigenere Cipher is a series of Caesar Ciphers — 
you'll be able to detect how problems overlap, giving you the ability to reuse and build on similar mental models and 
algorithms you have created in the past.

---------- Student solution ---------
/ with recursion 

With a recursion :

function vigenereEncoderRecursive(text, keyword) {
  if (text === '' || keyword === '') return '';

  var encodedText = [];
  var len = keyword.length;
  keyword = keyword.toLowerCase()
                   .split('')
                   .map( char => char.charCodeAt(0) - 97 ); // use unicode

  (function encoding(string, n) {
    if (string === '') return;

    function cipher(base) {
      var indexChar;
      var charCode;

      indexChar = string[0].charCodeAt(0);
      charCode = base + ( ((indexChar - base) + keyword[n % len]) % 26 )
      encodedText.push(String.fromCharCode(charCode));
    }

    function noCipher() {
      n = n - 1;
      encodedText.push(string[0]);
    }

    if (/[A-Z]/.test(string[0])) {
      cipher(65);
    } else if (/[a-z]/.test(string[0])) {
      cipher(97);
    } else {
      noCipher();
    }

    encoding(string.slice(1), (n + 1));  // recursive call with slice()
  })(text, 0);

  return encodedText.join('');
}
