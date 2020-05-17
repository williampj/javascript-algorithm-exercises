Molecules

We decided to dip our toes into computational chemistry. 
Our first task is to write a function that computes the total number of valence electrons in a molecule. 
Fortunately, this is relatively straightforward. For each element in the molecule, we need to know two things:

The element's atomic number. We can get this from the periodic table and decided to simply hard-code 
it in a valence function for now.
The number of atoms of that element in the molecule. 
We can read this directly from the string representation of the molecule.
For example, Geosmin has the string representation C12H22O, so it has 12 C atoms, 22 H atoms, and 1 O atom, 
summing up to 12*4 + 22*1 + 1*6 = 76 valence electrons.

We decided to write our function valenceOfMolecule such that it expects string representations of each element 
in the molecule as input, e.g. valenceOfMolecule('C12', 'H22', 'O'). 
It then returns the total number of all valence electrons in that molecule. 
Well, almost. Can you explain why it throws an exception and how to fix it?

function valence(element) {
  switch (element) {
    case 'H': return 1;
    case 'C': return 4;
    case 'N': return 5;
    case 'O': return 6;
    // omitting the rest
  }
}

function valenceOfMolecule() {
  var sum = 0;

  arguments.forEach(function (atom) {
    var match   = /([a-zA-Z]+)([0-9]*)/.exec(atom);
    var element = match[1];
    var number  = parseInt(match[2]) || 1;

    sum += number * valence(element);
  });

  return sum;
}

// Example

console.log('Number of valence electrons');
console.log('---------------------------');
console.log('Water:     ' + String(valenceOfMolecule('H2', 'O')));
console.log('Propane:   ' + String(valenceOfMolecule('C3', 'H8')));
console.log('Vitamin C: ' + String(valenceOfMolecule('C6', 'H8', 'O6')));
console.log('Caffeine:  ' + String(valenceOfMolecule('C8', 'H10', 'N4', 'O2')));

// Expected output:
// Number of valence electrons
// ---------------------------
// Water:     8
// Propane:   20
// Vitamin C: 68
// Caffeine:  74

------------ Solution ----------

arguments keywoard is an array-like object available to all functions.
We can call length on it and we can access each argument with bracket indexes. 
But we cannot call array prototype methods on it. 

Solution is to coerce arguments to an array with rest assignment: [...arguments]
Another option is to use Array.prototype.slice.call(arguments). 

function valenceOfMolecule() {
  let sum = 0;

  [...arguments].forEach(function(atom) {  // solution
    const match = /([a-zA-Z]+)([0-9]*)/.exec(atom);
    const element = match[1];
    const number = parseInt(match[2]) || 1;

    sum += number * valence(element);
  });

  return sum;
}

------------ LS Solution -------------
Using Array.prototype.slice.call(arguments)

function valenceOfMolecule() {
  var sum = 0;
  var args = Array.prototype.slice.call(arguments);  // solution 

  args.forEach(function (atom) {                     // using new variable args
    var match   = /([a-zA-Z]+)([0-9]*)/.exec(atom);
    var element = match[1];
    var number  = parseInt(match[2]) || 1;

    sum += number * valence(element);
  });

  return sum;
}

-------  Discussion -------

Recall that the arguments object is not an array. 
It is array-like in the sense that it implements length and 
allows you to access its elements by position (arguments[0], arguments[1], etc.), 
but it lacks all other array methods, including forEach.

Since forEach is not defined for arguments, line 14 raises an exception:

TypeError: arguments.forEach is not a function

In order to be able to use forEach, we first must create an actual array. 
We do so using the code on line 3 of the above solution.

For a refresher on this topic, review the assignment on 
Working with the Function Arguments Object from lesson 5 of course JS210.