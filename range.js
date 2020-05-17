Range

We are assigned the task to implement a range function that returns an array of integers 
beginning and ending with specified start and end numbers. 
When only a single argument is provided, that argument should be used as the ending number 
and the starting number should be 0.

Check our code below. Why do the the example invocations fail with an error saying 
Maximum call stack size exceeded? 
Can you fix the code, so it runs without error and satisfies the requirements?

function range(start, end) {
  var range = [];
  var element;
  for (element = start; element <= end; element++) {
    range.push(element);
  }

  return range;
}

function range(end) {
  return range(0, end);
}

// Examples

console.log(range(10, 20));
console.log(range(5));

------------- Solution ------------
Problem:
The second range function reassigns the range variable from the first function to the second function.
Within the second function, a never-ending recursive loop is happening because there is no stopping condition.

A solution is to remove the function name collision by renaming the second function and calling the first 
function from within the second function as intended. From inside the second function, we can conversely 
call the first if there is only one argument provided. 

function range(start, end) {
  if (!end) {
    return addZeroStart(start); // NB: Important to have a return here because this ultimately is the program return value. 
  }
  const range = [];
  let element;
  for (element = start; element <= end; element++) {
    range.push(element);
  }

  return range;
}

function addZeroStart(end) {
  return range(0, end);
}

// Examples

console.log(range(10, 20));
console.log(range(5));

------------ LS Solution (simpler) -------------

function range(start, end) {
  if (arguments.length === 1) {   // solving the problem with this if statement 
    end = start;
    start = 0;
  }

  var range = [];
  var element;
  for (element = start; element <= end; element++) {
    range.push(element);
  }

  return range;
}

// Examples

console.log(range(10, 20));
console.log(range(5));


--------------  Discussion ----------

In our original code, we have defined two range functions. 
One function signature expects two arguments, and one expects only a single argument. 
But JavaScript does not support function overloading 
(the ability to utilize multiple functions of the same name with different signatures). 
So with the second definition of range, the first one is overridden. 
That is, it is always range(end) on lines 11-13 that is executed, no matter how many arguments you provide. 
So when we call range(10, 20) on line 18, the parameter end is assigned to 10, and the second argument, 20, is ignored. 
The function then executes its body, line 12, calling itself again, this time with two arguments, 0 and 10. 
Since our program only recognizes the range function on lines 11-13, 
the function will continue to call itself repeatedly until the stack size is exceeded.


------------  Further exploration ---------

There are two reasons why the following is not a working solution. Can you spot them?

function range(start, end) {
  if (!end) {
    start = 0;
    end = start;
  }

  // ...
}

=
We're assigning 0 to start, and then using that zero to assign to end. so both become 0. 
The other issue is that 0 is falsy, so this solution does not account for a situation like range(-4, 0).

