Seeing Stars

Write a function that displays an 8-pointed star in an nxn grid,
where n is an odd integer that is supplied as an argument to the function.
The smallest such star you need to handle is a 7x7 grid (i.e., when n is 7).

Examples:

star(7);
// logs
*  *  *
 * * *
  ***
*******
  ***
 * * *
*  *  *

star(9);
// logs
*   *   *
 *  *  *
  * * *
   ***
*********
   ***
  * * *
 *  *  *
*   *   *

-------------- Approach -----------

rules:
- 3 stars in all lines except for center
- center has argument stars
- width of string is argument
- spaces in every line = argument - 3

pattern:
zero space + * + spaces + * + spaces + star + zero space
   1 space + * + spaces + * + spaces + star +  1 space

DS:
integer (input)
topHalf (array) = array of string
  - length = Math.floor(argument / 2)
bottownHalf (array) = reversed topHalf
center (string) = '*' * argument
padding (number) = integer for padding spaces
  - index value
spaces (number) = number of middle spaces
  - (argument - 3) / 2 - index
string - multi-line (output)

algo
- create topHalf array
- iterate from zero to floor of argument % 2 (for loop)
  - set padding = ' '.repeat(i)
  - set space = ' '.repeat((argument - 3) / 2 - i)
  - push padding + star + space + star + space + padding to topHalf
- set bottomHalf = topHalf.reverse
- log (topHalf, center, bottomHalf)

------------ Solution -----------

function star(rows) {
  const topHalf = [];
  for (let i = 0; i < Math.floor(rows / 2); i += 1) {
    const padding = ' '.repeat(i);
    const space = ' '.repeat((rows - 3) / 2 - i);
    topHalf.push(`${padding}*${space}*${space}*${padding}`);
  }
  const center = '*'.repeat(rows);
  const bottomHalf = topHalf.slice().reverse();
  console.log(topHalf.concat(center, bottomHalf).join('\n'));
}

star(7);
star(9);

--------------- LS Approach ------------

Understanding the Problem

Input
n: an odd integer that indicates the size of the grid that the "8-pointed star" will occupy. Its smallest value is 7.

Output
"8-pointed star": going by the example, the function creates the "star" by logging n rows of asterisks (*).
Each row is of length n.
Each row has three asterisks.
The rows have varying amounts of spaces between the three asterisks and varying amounts of padding on the left and right sides.
The middle row is an exception—it logs out n number of asterisks and no spaces.

Requirements
The most important part of this problem is determining the pattern for each row of asterisks (except the middle row). 
We can figure out the pattern by walking through each row of the first example, where n is 7. 
To better visualize the star, we'll use underscores (_) to represent the spaces and we'll separate the asterisks (*) and 
underscores (_) with spaces.
Row 1 (* _ _ * _ _ *): there are no spaces of padding on either the left or right side. There are two spaces between each pair of asterisks.
Row 2 (_ * _ * _ * _): there is one space of padding on both the left and right sides. There is one space between each pair of asterisks.
Row 3 (_ _ * * * _ _): there are two spaces of padding on both the left and right sides. There are no spaces between each pair of asterisks.
Row 4 (* * * * * * *): this row is an exception—there are n asterisks and no spaces.
Row 5 (_ _ * * * _ _): there are two spaces of padding on both the left and right sides. There are no spaces between each pair of asterisks.
Row 6 (_ * _ * _ * _): there is one space of padding on both the left and right sides. There is one space between each pair of asterisks.
Row 7 (* _ _ * _ _ *): there are no spaces of padding on either the left or right side. There are two spaces between each pair of asterisks.

After going through each row step-by-step, we can make the following observations:
There is an inverse relationship between the padding and the spaces between the asterisks.
As we approach the middle row, the number of spaces of padding increases and the number of spaces between asterisks decreases.
The value of the number of spaces between each pair of asterisks starts at (n - 3) / 2 for the first row, 
then decrements by 1 for each row—until the row before the middle, where its value is 0. Inversely, the value of the number of spaces of padding starts at 0, and increments by 1 for each row—until the row before the middle, where its value is (n - 3) / 2.
After the middle row, the above pattern is mirrored—i.e., the pattern repeats, but in the opposite order.

Mental Model
One way we can think of building a row is by joining three asterisks together with the correct number of spaces between each pair.
After the joining, we can pad the left and right sides accordingly.
Next, we'll need to keep track of the current row that we're building, so that we can apply the corresponding row-pattern 
based on the observations we made above.
First row up to the row before the middle: join three asterisks together, starting with (n - 3) / 2 spaces between each pair, 
up to 0 spaces. Pad the left and right sides, starting with 0 spaces up to (n - 3) / 2 spaces.
Middle row: build with n asterisks and no spaces.
Row after the middle up to the last row: join three asterisks together, starting with 0 spaces between each pair, up to (n - 3) / 2 spaces. 
Pad the left and right sides, starting with (n - 3) / 2 spaces up to 0 spaces.
We can also simplify the padding of spaces to just the left side, 
since the spaces on the right won't be visible when displayed on the screen/console.

Data Structure and Algorithm
For our data structure—considering our mental model of joining three asterisks together — 
we'll use an array and leverage the Array.prototype.join method.

Now let's build an algorithm that processes our data structure to produce the expected output.

Compute the value of the index of the middle row—the integer division of n / 2—and store the result in a variable, middleIdx.
Iterate starting from the index of the first row (0) up to but not including the middleIdx. For each row:
Initialize an array of three asterisks.
Join the asterisks in the array together with ((n - 3) / 2) - current iteration number of spaces.
Pad the left side with current iteration number of spaces.
Log the row.
Log a row of n number of asterisks and no spaces.
Iterate starting from the middleIdx + 1 up to the index of the last row (n - 1). For each row:
Initialize an array of three asterisks.
Join the asterisks in the array together with current iteration number of spaces.
Pad the left side with ((n - 3) / 2) - current iteration number of spaces.
Log the row.

-------------------- LS Solution -------------

function repeat(char, times) {
  var repeated = '';
  var i;

  for (i = 0; i < times; i += 1) {
    repeated += char;
  }

  return repeated;
}

function buildStarRow(spacesBetween, spacesPadding) {
  var asterisks = ['*', '*', '*'];
  var starRow = asterisks.join(repeat(' ', spacesBetween));
  var paddedStarRow = repeat(' ', spacesPadding) + starRow;

  return paddedStarRow;
}

function star(n) {
  var middleIdx = Math.floor(n / 2);
  var spacesBetween;
  var spacesPadding;
  var i;

  for (i = 0; i < middleIdx; i += 1) {
    spacesBetween = ((n - 3) / 2) - i;
    spacesPadding = i;
    console.log(buildStarRow(spacesBetween, spacesPadding));
  }

  console.log(repeat('*', n));

  for (i = 0; i < middleIdx; i += 1) {
    spacesBetween = i;
    spacesPadding = ((n - 3) / 2) - i;
    console.log(buildStarRow(spacesBetween, spacesPadding));
  }
}

------- Discussion ---------

You may have noticed that in the second loop of the star function, we deviate a little from our algorithm — 
we don't start the iteration from middleIdx + 1 and don't end with the index of the last row (n - 1). 
Even though we don't follow our algorithm literally, we're still following it using a mathematical approach. 
To understand how this works, let's look at steps #4.2 and #4.3 of our algorithm (from the second iteration):

4.2: Join the asterisks in the array together with current iteration number of spaces.

4.3: Pad the left side with ((n - 3) / 2) - current iteration number of spaces.

The important part of these two steps is the value of the current iteration number. 
In the second for loop of our solution, this value is the same as the value of i, 
but not the same as the value of the index of the current row. If our solution was a literal translation of our algorithm, 
i wouldn't have the same value as the current iteration number—it would have the value of the index of the current row being iterated over. 
In the case of n = 7, these index values (and i values) would be 4, 5, and 6, 
with each value corresponding to the iteration numbers 0, 1, and 2 respectively.

For example, to implement our algorithm more literally, we would offset the values of i in the second for loop 
so that they would be the same as the index values of the rows, such as shown below:

for (i = middleIdx + 1; i < n; i += 1) {
  spacesBetween = i - (middleIdx + 1);
  spacesPadding = ((n - 3) / 2) - i + (middleIdx + 1);
  console.log(buildStarRow(spacesBetween, spacesPadding));
}

Instead, we took a more mathematical approach to implement our solution. We factored out the computation of the offset (middleIdx + 1), resulting in the two for loops iterating over the same i values—but not the same row index values.

----------- Further Exploration ---------
The current solution implementation is faithful to our algorithm. Notice, however, that there is similar-looking code in our for loops. 
Try to refactor the current implementation to make the code less repetitive.

You can also explore alternate mental models for building the star. 
Write out and share your mental model and corresponding solution implementation below.

---------- Student solution: creating 2-dimensional array with stars --------

Create a 2 dimensional array of spaces (' ').
Overwrite the elements the diagonals, vertical, horizontal lines with '*'.
Concatenate and log
No need to calculate spaces between stars.

function stars(n) {
  const grid = [...Array(n)].map(() => ' '.repeat(n).split(''));
  for (let i = 0; i < n; i++) {
    grid[i][i] = '*'; // main diagonal
    grid[i][n - i - 1] = '*'; // 2nd diagonal
    grid[(n - 1) / 2][i] = '*'; // horizontal
    grid[i][(n - 1) / 2] = '*'; // vertical
  }
  console.log(grid.map(x => x.join('')).join('\n'));

---------- Student solution 2: using [...Array] --------

  function star(n) {
    let half = Math.floor(n / 2);
    let upperHalf = [...Array(half)].map((_line, idx) => {
      let outerPaddingSpaces = idx;
      let innerPaddingSpaces = half - idx - 1;
      return ' '.repeat(outerPaddingSpaces) + '*' + ' '.repeat(innerPaddingSpaces) + '*' + ' '.repeat(innerPaddingSpaces) + '*' + '\n';
    });
    let lines = upperHalf.concat(upperHalf.slice().reverse());
    lines.splice(half, 0, '*'.repeat(n) + '\n');
    return lines.join('');
  }
  
  -------- Student solution 3: Adding each line in both ends to mirror each other ------

Create a lines array of length n
Create the middle line and place it in the lines middle index
Create each line and place it in both the next index from the start and next index from the end, 
essentially mirroring it

function star(n) {
  var lines = new Array(n);
  var midIndex = Math.floor(n/2);
  lines[midIndex] = '*'.repeat(n);  // Create the middle line at the lines array middle index

  for (let i = 0; i <= midIndex; i++) {
    lines[i] = ' '.repeat(i) + '*' + (' '.repeat(midIndex - i) + '*').repeat(2); 
    lines[lines.length - 1 - i] = lines[i];    // Mirror the line to the end of array 
  }

  lines.forEach(function(line) {
    console.log(line);
  })
}