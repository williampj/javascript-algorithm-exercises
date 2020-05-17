// Random Recipe Generator

// One bored and hungry evening we decided to randomly generate recipes.
// We can't wait to see the first suggestions, but JavaScript raises a TypeError,
// telling us that dishName.join is not a function. What is wrong?

// Picks n random elements from an array,
// and returns a new array with those elements.

function random(array, n) {
  if (n === undefined) {
    n = 1;
  }

  const elements = array.slice();
  const randomElements = [];

  while (n > 0 && elements.length > 0) {
    const randomIndex = Math.floor(Math.random() * elements.length);
    const randomElement = elements[randomIndex];

    randomElements.push(randomElement);
    elements.splice(randomIndex, 1);
    n--;
  }
  return randomElements;
}

// Ingredients

const ingredients = [
  'rice',
  'green bell pepper',
  'mushrooms',
  'carrot',
  'kebab',
  'spinach',
  'soy bean sprouts',
  'mashed potatoes',
  'corn',
  'cucumber',
  'peas'
];

const spices = [
  'peri peri',
  'cinnamon',
  'nutmeg',
  'cardamom',
  'ground ginger',
  'poppy seed',
  'cumin'
];

const extras = ['peanuts', 'sesame seeds', 'egg', 'wasabi', 'soy sauce'];

// Name

const adjective = ['Delicious', 'Hot', 'Exotic', 'Creative', 'Festive', 'Dark'];
const firstNoun = ['Power', 'After Work', 'Holiday', 'Disco', 'Late Night'];
const secondNoun = ['Mix', 'Delight', 'Bowl', 'Chunk', 'Surprise', 'Bliss'];

// Generate!

const dishName = random(adjective) + random(firstNoun) + random(secondNoun);
const dish = random(ingredients, 3) + random(spices, 2) + random(extras, 1);

console.log(dishName);
console.log('How about: ' + dishName.join(' '));
console.log('You need: ' + dish.join(', '));

-------------- Solution --------------

Problem:
The problem are the statements
  const dishName = random(adjective) + random(firstNoun) + random(secondNoun);
  const dish = random(ingredients, 3) + random(spices, 2) + random(extras, 1);
which concatenate the string elements of the 3 arrays together into one string. 
This therefore causes the error when calling .join() on that string. 
The binary + operator is either an arithmetic operator adding two numerical values, 
or a string operator concatenating two strings. 
When we apply it to two arrays, JavaScript will convert the arrays into strings, 
and then concatenate these strings

The solution is to concatenate those two statements into an array.
const dishName = random(adjective).concat(random(firstNoun), random(secondNoun));
const dish = random(ingredients, 3).concat(random(spices, 2), random(extras, 1)); 


function random(array, n) {
  if (n === undefined) {
    n = 1;
  }

  const elements = array.slice();
  const randomElements = [];

  while (n > 0 && elements.length > 0) {
    const randomIndex = Math.floor(Math.random() * elements.length);
    const randomElement = elements[randomIndex];

    randomElements.push(randomElement);
    elements.splice(randomIndex, 1);
    n--;
  }
  return randomElements;
}

// Ingredients

const ingredients = [
  'rice',
  'green bell pepper',
  'mushrooms',
  'carrot',
  'kebab',
  'spinach',
  'soy bean sprouts',
  'mashed potatoes',
  'corn',
  'cucumber',
  'peas'
];

const spices = [
  'peri peri',
  'cinnamon',
  'nutmeg',
  'cardamom',
  'ground ginger',
  'poppy seed',
  'cumin'
];

const extras = ['peanuts', 'sesame seeds', 'egg', 'wasabi', 'soy sauce'];

// Name

const adjective = ['Delicious', 'Hot', 'Exotic', 'Creative', 'Festive', 'Dark'];
const firstNoun = ['Power', 'After Work', 'Holiday', 'Disco', 'Late Night'];
const secondNoun = ['Mix', 'Delight', 'Bowl', 'Chunk', 'Surprise', 'Bliss'];

// Generate!

const dishName = random(adjective).concat(
  random(firstNoun),
  random(secondNoun)
);
const dish = random(ingredients, 3).concat(
  random(spices, 2),
  random(extras, 1)
);

console.log(dishName);
console.log('How about: ' + dishName.join(' '));
console.log('You need: ' + dish.join(', '));

