Binary Search

It is quite common to find yourself in a situation where you need to perform a search on some data
to find something you're looking for.
Imagine that you need to search through the yellow pages to find the phone number of a particular business.
A straightforward way to do this would be to go through the yellow pages one business at a time,
checking if the current business name is the one you're trying to find.

This may be a simple and easy way to search, but it's not very efficient.
In the worst case scenario, it could mean having to search through every single business name
before finding out that the business isn't listed — or, slightly better, having to go through every letter
from 'A' to 'Z' before finding the business. A linear search such as this can take quite a long time.

A binary search algorithm is a much more efficient alternative.
This algorithm allows you to cut the search area in half on each iteration by discarding the half
that you know your search term doesn't exist in.
The binary search algorithm is able to do this by relying on the data being sorted.
Going back to the yellow pages example, let's say that we're searching the following yellowPages data
for the search item 'Pizzeria':

// Yellow pages list of business names data:
var yellowPages = ['Apple Store', 'Bags Galore',
                   'Bike Store',  'Donuts R Us',
                   'Eat a Lot',   'Good Food',
                   'Pasta Place', 'Pizzeria',
                   'Ruby Lounge', 'Zooper'];

With a linear search, we would have to sequentially go through each of the items until we found the search item 'Pizzeria'.
In a binary search, however, the following sequence happens:

Retrieve the middle value from the data (assume truncation to integer) --> 'Eat a Lot'.
If the middle value is equal to 'Pizzeria', stop the search.

If the middle value is less than 'Pizzeria':
Discard the lower half, including the middle value --> ['Apple Store', 'Bags Galore', 'Bike Store', 'Donuts R Us', 'Eat a Lot'].
Repeat the process from the top, using the upper half as the starting data --> ['Good Food', 'Pasta Place', 'Pizzeria', 'Ruby Lounge', 'Zooper'].

If the middle value is greater than 'Pizzeria', do the same as the previous step, but with opposite halves.
Using the process described above, the search successfully ends on the second iteration when the middle value is 'Pizzeria'.

Implement a binarySearch function that takes an array and a searchItem as arguments,
and returns the index of the searchItem if found, or -1 otherwise.
You may assume that the array argument will always be sorted.

Examples:

var yellowPages = ['Apple Store', 'Bags Galore', 'Bike Store', 'Donuts R Us', 'Eat a Lot', 'Good Food', 'Pasta Place', 'Pizzeria', 'Ruby Lounge', 'Zooper'];
binarySearch(yellowPages, 'Pizzeria');                   // 7
binarySearch(yellowPages, 'Apple Store');                // 0

binarySearch([1, 5, 7, 11, 23, 45, 65, 89, 102], 77);    // -1
binarySearch([1, 5, 7, 11, 23, 45, 65, 89, 102], 89);    // 7
binarySearch([1, 5, 7, 11, 23, 45, 65, 89, 102], 5);     // 1

binarySearch(['Alice', 'Bonnie', 'Kim', 'Pete', 'Rachel', 'Sue', 'Tyler'], 'Peter');  // -1
binarySearch(['Alice', 'Bonnie', 'Kim', 'Pete', 'Rachel', 'Sue', 'Tyler'], 'Tyler');  // 6

rules:
- array & term are strings or numbers
- middle value is Math.floor(length/2)
- compare searchitem to middle index value of array
  - if the same, return that middle index value
  - if searchitem is larger, discard first half of array incl middle value
  - if searchitem is smaller, discard second half of array incl middle value
  - recursively call Function again with remaining half
  - if not found, return -1

DS:
- array and search term (inputs)
- middleValue var
- half arrays (slice calls)
- index number (output)

Algo:
- take middle value
  MV = array[Math.floor(array.length / 2)]
- test if middle value is equal to input
  if middleValue === term
    return middleValue
- test if array length is 1, then return -1
  if array.length === 1
    return -1
- test if middleValue is larger or smaller than term, then discard other half
  - if middleValue > term
      Function(slice(0, Math.floor(length / 2)))
  - else if middleValue < term
      Function(slice(Math.floor(length / 2)))

-------- My Solution ---------

function binarySearch(array, term, originalArray = array.slice()) {
  const middleIndex = Math.floor(array.length / 2);
  const middleValue = array[middleIndex];
  if (middleValue === term) {
    return originalArray.indexOf(middleValue);
  }
  if (array.length <= 1) {
    return -1;
  }

  const remainingIndexes =
    middleValue > term ? [0, middleIndex] : [middleIndex];
  const remainingHalf = array.slice(...remainingIndexes);
  return binarySearch(remainingHalf, term, originalArray);
}

const yellowPages = [
  'Apple Store',
  'Bags Galore',
  'Bike Store',
  'Donuts R Us',
  'Eat a Lot',
  'Good Food',
  'Pasta Place',
  'Pizzeria',
  'Ruby Lounge',
  'Zooper'
];

console.log(binarySearch(yellowPages, 'Pizzeria')); // 7
console.log(binarySearch(yellowPages, 'Apple Store')); // 0

console.log(binarySearch([1, 5, 7, 11, 23, 45, 65, 89, 102], 77)); // -1
console.log(binarySearch([1, 5, 7, 11, 23, 45, 65, 89, 102], 89)); // 7
console.log(binarySearch([1, 5, 7, 11, 23, 45, 65, 89, 102], 5)); // 1

console.log(
  binarySearch(
    ['Alice', 'Bonnie', 'Kim', 'Pete', 'Rachel', 'Sue', 'Tyler'],
    'Peter'
  )
); // -1
console.log(
  binarySearch(
    ['Alice', 'Bonnie', 'Kim', 'Pete', 'Rachel', 'Sue', 'Tyler'],
    'Tyler'
  )
); // 6

-------------- LS Solution -------------

function binarySearch(array, searchItem) {
  var high = array.length - 1;
  var low = 0;
  var mid;

  while (low <= high) {
    mid = low + Math.floor((high - low) / 2);
    if (array[mid] === searchItem) {
      return mid;
    } else if (array[mid] < searchItem) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}

----------- Discussion -----------

The solution starts off by initializing the high and low variables. 
The difference between the two represents the current search area. 
The midpoint between the two (mid) is the index the solution uses to get the middle value from the array 
to compare with the searchItem argument.

The solution uses a loop to iteratively search through the array. 
On each iteration, the solution computes the mid index value by adding the value of low to the integer result 
of dividing the current search area (high - low) in half. 
The solution then retrieves the value at the mid index position of the array and compares it to the searchItem. 
If they are equal, the solution returns the mid index. 
If the middle value is less than searchItem, the solution reassigns low to mid + 1 to remove the indices 
from low up to mid from the search area. 
If the middle value is greater than searchItem, the solution reassigns high to mid - 1 
to remove the indices from mid up to high from the search area.

If the value of low becomes greater than high, the search ends and the function returns -1 
— indicating that the searchItem could not be found.

-------- Student solutions -------

A recursive solution. Note: if not found the function returns NaN and not -1.

const binarySearch = (arr, val, mid = ~~(arr.length / 2)) => {
    const baseCaseP = () => arr.length === 0 || (arr.length === 1 && arr[0] !== val);
    const searchLeft = () => binarySearch(arr.slice(0, mid), val);
    const searchRight = () => binarySearch(arr.slice(mid + 1), val);
    return baseCaseP() ? NaN : 0 + (arr[mid] === val ? mid : arr[mid] > val ? searchLeft() : (mid + 1 + searchRight()));
};

///// 

- LS Solution solution refactored for recursion 

function binarySearch(array, searchItem, low = 0, high = array.length - 1) {
  var mid = low + Math.floor((high - low) / 2);
  if (low > high) {
    return -1;
  }

  if (array[mid] === searchItem) {
    return mid;
  } else if (array[mid] < searchItem) {
    low = mid + 1;
  } else {
    high = mid - 1;
  }
  return binarySearch(array, searchItem, low, high);
}
