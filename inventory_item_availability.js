Inventory Item Availability

Building on the previous exercise, write a function that returns true or false based on whether or not an inventory item is available.
As before, the function takes two arguments: an inventory item and a list of transactions.

The function should return true only if the sum of the quantity values of the item's transactions is greater than zero.
Notice that there is a movement property in each transaction object. A movement value of 'out' will decrease the item's quantity.

You may (and should) use the transactionsFor function from the previous exercise.

Examples:

var transactions = [ { id: 101, movement: 'in',  quantity:  5 },
                     { id: 105, movement: 'in',  quantity: 10 },
                     { id: 102, movement: 'out', quantity: 17 },
                     { id: 101, movement: 'in',  quantity: 12 },
                     { id: 103, movement: 'out', quantity: 15 },
                     { id: 102, movement: 'out', quantity: 15 },
                     { id: 105, movement: 'in',  quantity: 25 },
                     { id: 101, movement: 'out', quantity: 18 },
                     { id: 102, movement: 'in',  quantity: 22 },
                     { id: 103, movement: 'out', quantity: 15 }, ];

isItemAvailable(101, transactions);     // false
isItemAvailable(105, transactions);     // true

algo:
- return item from transactionsFor function
- reduce the array - 0 as starting value
  - total += item.movement is 'in' ? item.quantity : -(item.quantity)

----------- Solution -------------

function transactionsFor(identifier, transactions) {
  return transactions.filter(transaction => transaction.id === identifier);
}

const transactions = [
  { id: 101, movement: 'in', quantity: 5 },
  { id: 105, movement: 'in', quantity: 10 },
  { id: 102, movement: 'out', quantity: 17 },
  { id: 101, movement: 'in', quantity: 12 },
  { id: 103, movement: 'out', quantity: 15 },
  { id: 102, movement: 'out', quantity: 15 },
  { id: 105, movement: 'in', quantity: 25 },
  { id: 101, movement: 'out', quantity: 18 },
  { id: 102, movement: 'in', quantity: 22 },
  { id: 103, movement: 'out', quantity: 15 },
];

function isItemAvailable(item, transactions) {
  return (
    transactionsFor(item, transactions).reduce(
      (total, transaction) => (total += transaction.movement === 'in' ? transaction.quantity : -transaction.quantity),
      0,
    ) > 0
  );
}

console.log(isItemAvailable(101, transactions)); // false
console.log(isItemAvailable(105, transactions)); // true

-------------- LS Solution ---------------
// same approach, just if-else instead of ternary, and comparison operation as separate step

function isItemAvailable(item, transactions) {
  var quantity = transactionsFor(item, transactions).reduce(function (sum, transaction) {
    if (transaction.movement === 'in') {
      return sum + transaction.quantity;
    } else {
      return sum - transaction.quantity;
    }
  }, 0);

  return quantity > 0;
}

--------------- Discussion ---------------

The solution first uses the transactionsFor function to create a filtered list containing only the transactions related to the specified inventory item. 
The solution then computes the sum by using a reducing strategy.

The callback function passed to the Array.prototype.reduce method takes two arguments: a sum integer and a transaction object. 
The solution initializes sum to 0 because the value of quantity does not specify whether it is positive or negative. 
If the initial value of sum was not explicitly set and the first transaction had a movement property value of 'out', 
then the resulting value of sum would be greater than it should be. 

For each transaction object, if the value of movement is 'in', the solution increments sum by the value of transaction.quantity; otherwise, sum is decremented by that value.

The solution stores the result of this reduction in the quantity variable. 
If quantity is greater than 0, the isItemAvailable function will return true; otherwise it will return false.


------------- Student solution ----------
// using shorthand in determineQty operation to assign the movement and quantity properties to m and n

function transactionsFor(inventoryItem, transactions) {
  return transactions.filter(transaction => transaction.id === inventoryItem);
}

function determineQty(transactions) {
  return transactions.reduce((sum, { movement: m, quantity: n }) => (
    m === 'in' ? sum + n : sum - n
  ), 0);
}

function isItemAvailable(item, transactions) {
  return determineQty(transactionsFor(item, transactions)) > 0;
}