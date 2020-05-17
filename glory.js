Glory!

We want to implement a role-playing game and started working on the dice roll functionality. 
First, study the game code. Then take a look at the example output and information provided below.

// Standard role-playing dice, ranging from 4 faces to 20,
// specified in terms of minimum and maximum face value.
var d4  = {min: 1, max: 4};
var d6  = {min: 1, max: 6};
var d8  = {min: 1, max: 8};
var d10 = {min: 0, max: 9};
var d12 = {min: 1, max: 12};
var d20 = {min: 1, max: 20};

function roll(die) {
  return Math.floor(Math.random() * (die.max - die.min + 1)) + die.min;
}

// Toss one or more dice and sum up their face values.
function toss() {
  var dice = Array.prototype.slice.call(arguments);

  return dice.map(roll).reduce(function (sum, value) {
    return sum + value;
  });
}

// Standard target roll tossing a 20-sided die,
// with optional bonus and penalty dice.
// Used to determine whether a character wanting to perform an action
// succeeds or fails, based on whether the sum of the dice is higher
// or lower than the relevant character trait.
// (See below for examples.)
function targetRoll(characterValue, bonus, penalty) {
  bonus = bonus || {min: 0, max: 0};
  penalty = penalty || {min: 0, max: 0};

  var result = toss(d20, bonus, penalty);
  // Normalize in case bonus or penalty push result out of the D20 range.
  result = Math.max(1, result);
  result = Math.min(20, result);

  console.log('--> ' + result);

  switch (result) {
    case 1:  automaticFail();
    case 20: automaticSuccess();
    default: result >= characterValue ? success() : fail();
  }
}

function success() {
  console.log('Your character succeeds.');
}

function fail() {
  console.log('Your character fails.');
}

function automaticSuccess() {
  console.log('Your character succeeds without effort. Glory!');
}

function automaticFail() {
  console.log('Meagre attempt. Your character fails miserably.');
}

// Example character.
var myCharacter = {
  name: 'Jenkins',
  strength: 4,
  constitution: 6,
  education: 11,
  luck: 3,
  sanity: 9,
};

// Example rolls:

// Jenkins wants to break in a door with brute force,
// so he has to roll against his strength value.
targetRoll(myCharacter.strength);

// Jenkins is challenged to a drinking contest.
// In order to determine how much he can take, he rolls against his
// constitution. Since he just ate a huge portion of pork roast, he
// gets a D4 bonus die.
targetRoll(myCharacter.constitution, {min: 0, max: 4});

// Jenkins found an ancient scroll and attempts to decipher it.
// He has to roll against his education, in order to determine
// whether he's able to read it.
targetRoll(myCharacter.education);

When playing around with the above program, 
our three test rolls result in three random values that produce the sample output below 
(because each dice roll produces a random value, your output may differ). 
The outcome of rolling 16 looks correct, but the output when we rolled values 1 and 20 doesn't make sense. 
For each roll, only one outcome should be displayed. What is wrong with the code?

--> 1
Meagre attempt. Your character fails miserably.
Your character succeeds without effort. Glory!
Your character fails.
--> 20
Your character succeeds without effort. Glory!
Your character succeeds.
--> 16
Your character succeeds.


----------- Solution -----------
Problem: Each case statement leaks through to the next one. There has to be a breaking condition (break or return) to avoid this. 

switch (result) {
  case 1:  automaticFail();
  case 20: automaticSuccess();
  default: result >= characterValue ? success() : fail();
}

Solution is to include them. 

switch (result) {
  case 1:  automaticFail();
    break; 
  case 20: automaticSuccess();
    break; 
  default: result >= characterValue ? success() : fail();
}

--------- Discussion --------

In switch statements, JavaScript executes the statement associated with the first case expression that matches. 
Then, it will continue executing all subsequent statements, until it comes across a break statement. 
Since we did not include any break statements in our original code, when the value of result is 1, 
all statements will be executed: automaticFail(), automaticSuccess(), as well as the default statement.

If this sounds only vaguely familiar, review the assignment on conditionals or the MDN page on switch.

-------- Further Exploration -------

This behavior of switch statements might seem strange at first, 
but there are scenarios where it's handy to "fall through" to subsequent cases, 
for example when you want the same statement to be executed in several cases. 
Here is one such example, where our educated role-playing character comments on the difficulty of a language:

switch (scroll.language) {
  case 'English':
  case 'French':
  case 'Portuguese':
  case 'Latin':
    console.log('Piece of cake!');
    break;
  case 'Amharic':
  case 'Sumerian':
    console.log('Well...');
    break;
  case 'R\'lyehian':
    console.log('Oha!');
    break;
}