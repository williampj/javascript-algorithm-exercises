// Task List

// We were asked to implement a task list and the following functionality:

// adding a new task
// completing a given number of existing tasks
// displaying the task list
// We decided to keep things simple and model the tasks as strings.
// Completing a task for us simply means deleting the string from the array of tasks.

// Experimenting with our code reveals that it doesn't work exactly as we expected.
// Find the problem and fix it.

let todos = [
  'wash car',
  'exercise',
  'buy groceries',
  'balance budget',
  'call plumber',
  'feed fido',
  'get gas',
  'organize closet'
];

function addTask(task) {
  if (todos.includes(task)) {
    console.log('That task is already on the list.');
  } else {
    todos.push(task);
  }
}

function completeTasks(n = 1) {
  let tasksComplete = 0;

  while (todos.length > 0 && tasksComplete < n) {
    console.log(`${todos[0]  } complete!`);
    delete todos[0];
    tasksComplete++;
  }

  if (todos.length === 0) {
    console.log('All tasks complete!');
  } else {
    console.log(
      `${tasksComplete  } tasks completed; ${  todos.length  } remaining.`
    );
  }
}

function displayTaskList() {
  let i;

  console.log('ToDo list (' + todos.length + ' tasks):');
  console.log('---------------------');

  for (i = 0; i < todos.length; i++) {
    console.log('-- ' + todos[i]);
  }
}

// Utilizing our task manager

addTask('oil change');
addTask('dentist');
addTask('homework');

completeTasks(3);
displayTaskList();

----------- Solution ---------
Problem:
Using delete todos[0] deletes the element from the Array, but leaves the space in place as undefined. 
So on the 2nd and 3rd iteration, we're completing the undefined element again without reducing the todos list. 

The solution is to use splice(0, 1) or shift() to remove mutate the array by removing the element and reducing length by 1. 

function completeTasks(n = 1) {
  let tasksComplete = 0;

  while (todos.length > 0 && tasksComplete < n) {
    console.log(`${todos[0]} complete!`);
    todos.splice(0, 1); // solution 
    tasksComplete++;
  }

  if (todos.length === 0) {
    console.log('All tasks complete!');
  } else {
    console.log(`${tasksComplete} tasks completed; ${todos.length} remaining.`);
  }
}

------------ Discussion ------------

Recall that Arrays are Objects. The delete operator is used to remove a property from an object. 
When delete is used to remove an array element, an empty slot remains in its place in the array. 

The length of the array remains the same, 
and using bracket notation with the deleted item's index will return undefined. 
Using delete with an array can therefore lead to unexpected results and should generally be avoided.

The Array.prototype.shift() method provides the behavior appropriate for our code. 
It removes the first element of an array, shifts the values at consecutive indexes down, 
and updates the length of the array.

Another very useful method for deleting array elements is Array.prototype.splice().




