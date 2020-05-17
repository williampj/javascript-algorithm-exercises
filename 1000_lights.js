1000 Lights
You have a bank of switches before you, numbered from 1 to n. Every switch is connected to exactly one light that is initially off. You walk down the row of switches and toggle every one of them. You walk back to the beginning of the row and start another pass. On this second pass, you toggle switches 2, 4, 6, and so on. On the third pass, you go back to the beginning again, this time toggling switches 3, 6, 9, and so on. You continue to repeat this process until you have gone through n repetitions.

Write a program that takes one argument—the total number of switches—and returns an array of the lights that are on after n repetitions.

Examples:

function lightsOn(switches) {
  // ...
}

lightsOn(5);        // [1, 4]
// Detailed result of each round for `5` lights
// Round 1: all lights are on
// Round 2: lights 2 and 4 are now off;     1, 3, and 5 are on
// Round 3: lights 2, 3, and 4 are now off; 1 and 5 are on
// Round 4: lights 2 and 3 are now off;     1, 4, and 5 are on
// Round 5: lights 2, 3, and 5 are now off; 1 and 4 are on

lightsOn(100);      // [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]


----------- My Approach --------------

rules: 
- lights from 1 to n are off 
- iterate all multiples from 1 to n 
  - toggling alll lights along the way 
- return on lights 

input: number 
output: array of numbers 

Examples:
- lightsOn(5);        // [1, 4]
- lightsOn(100);      // [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

DS: 
- number (input)
- object with number names and boolean values [1 => true, ]
- multiple variable: starts at 1, then increments 
- outer loop (from 1 to input number)
  - inner loop (from multiple to greater than input number)
- array (output) - Object.keys(object).filter truthy properties 

Algo: 
- create object 
- loop from 1 to input 
  - set object[i] to 'false'

- for loop (i = 1; i <= input; i += 1)
  - set mutliple to 1 
  - for loop (j = multiple; j <= input; j += multiple)
      object[j] = !object[j]
- Generate array of object keys 
  Object.keys(obj)
- array with names of on buttons 
  - filter for truthy properties 
    .filter(key => object[key])
- return that array 

--------------- My Solution --------------

function lightsOn(switches) {
  const lights = {};
  for (let i = 1; i <= switches; i += 1) {  // set up the lights
    lights[i] = false;
  }
  for (let i = 1; i <= switches; i += 1) {  // toggle rounds 
    const multiple = i;
    for (let j = multiple; j <= switches; j += multiple) {
      lights[j] = !lights[j];
    }
  }
  return Object.keys(lights)  // filtering out off lights 
    .filter(el => lights[el])
    .map(Number);
}

console.log(lightsOn(5)); // [1, 4]
// Detailed result of each round for `5` lights
// Round 1: all lights are on
// Round 2: lights 2 and 4 are now off;     1, 3, and 5 are on
// Round 3: lights 2, 3, and 4 are now off; 1 and 5 are on
// Round 4: lights 2 and 3 are now off;     1, 4, and 5 are on
// Round 5: lights 2, 3, and 5 are now off; 1 and 4 are on

console.log(lightsOn(100)); // [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

------------ LS Approach ----------------

- Understanding the Problem
To better understand the problem, let's break it down into the following components:

- Input
The last sentence from the problem description makes it clear that there is only one input: the number of switches. 
The end of this sentence is not as straightforward however, because the phrase—"n repetitions"—begs the question, "what is n?" 
If we read through the problem description again, the first sentence tells us that every switch has a number from 1 to n. 
We can therefore infer that the number of repetitions is equal to the number of switches.

- Output
An array of the lights that are turned on after toggling the appropriate switches n number of times.

- Rules
All the lights are initially turned off.
For the nth round, every switch that is a multiple of n gets toggled. For example, in the first round,
all the switches get toggled because all integers are multiples of 1. In the second round, only the switches that are 
multiples of 2 get toggled.
The number of switches dictates the number of rounds. For instance, if there are 10 switches then 
there will be 10 rounds of toggling.
Return an array containing the switch numbers of the lights that are on after all the rounds have been completed.

- Data Structure and Algorithm
We're going to solve this problem using a simulation. We'll have our program go through the n rounds of toggling, 
while keeping track of the states of the lights. At the end, we'll return the lights that are on.

For our data structure, we'll use an array to track the states of the lights. Since each light has two possible states, 
it's natural to use the boolean values of true and false to represent whether a light is on or off. This has the added
benefit of allowing us to use the ! unary operator to easily toggle a light's state.

Since the lights are numbered starting from 1, one approach we can consider is to have our array indices also start from 1. 
In other words, leave the 0 index as undefined and avoid using it, and treat the element at index 1 as the first element of the array.

We don't use this approach in our solution because it's not very compatible with our algorithm. 
For example, it makes it harder to use the list processing methods of Array. 
However, this does not mean that this approach won't work well with your solution. 
Depending on the direction you decide take, it's definitely worth thinking about.

- Algorithm:

Loop through the rounds from 1 to n, and for each round:
If the current round is i, toggle the lights whose indices are multiples of i.
Use map to return a new array to represent the new states.
Filter/map the lights array to return a new array containing the indices of the lights that are on.

------- LS Solution ---------

function lightsOn(n) {
  var result = [];
  var lights = initializeLights(n);
  var i;

  for (i = 1; i <= n; i += 1) {          // rounds: 1..n
    lights = toggleLights(lights, i);
  }

  for (i = 0; i < n; i += 1) {           // indices: 0..n-1
    if (lights[i]) {
      result.push(i + 1);
    }
  }

  return result;
}

function initializeLights(n) {
  var lights = [];
  var i;

  for (i = 0; i < n; i += 1) {
    lights.push(false);
  }

  return lights;
}

function toggleLights(lights, round) {
  return lights.map(function (light, index) {
    return ((index + 1) % round === 0 ? !light : light);
  });
}

------------ Student solutions 
// math solution 
This solution requires a mathematical understanding of the problem and is specific to this very problem. 
In order to have the lights turned on at the end of the sequence, 
we need to toggle the light odd number of times. 
Light is toggled once for each of its factors. 
Only perfect squares have odd number of factors (see here). 
Therefore we just need to generate a sequence of perfect squares up to n 
([1^2, 2^2, 3^2, 4^2, ...] = [1,4,9,16,...]).

function lightsOn(n) {
  const result = [];
  for (let i = 1; i <= Math.sqrt(n); i++) result.push(i * i);
  return result;
}