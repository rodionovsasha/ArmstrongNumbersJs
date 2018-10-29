const performance = require('perf_hooks').performance;
const startTime = performance.now();
const AMOUNT_OF_SIMPLE_DIGITS = 10;
const MAX_NUMBER = Number.MAX_SAFE_INTEGER;
let counter = 1;

let ARRAY_OF_POWERS = [];

for (let i = 0; i < AMOUNT_OF_SIMPLE_DIGITS; i++) {
  ARRAY_OF_POWERS[i] = [];
  for (let j = 0; j < getDigitsAmount(MAX_NUMBER) + 1; j++) {
    ARRAY_OF_POWERS[i][j] = Math.pow(i, j);
  }
}

console.assert(ARRAY_OF_POWERS[0][0] === 1);
console.assert(ARRAY_OF_POWERS[2][2] === 4);
console.assert(ARRAY_OF_POWERS[5][2] === 25);

let numbers = getNumbers();

for(let number in numbers) {
  console.log(counter++ + ". " + number);
}

const endTime = performance.now();
console.log("Execution time: " + (endTime - startTime).toFixed(1) / 1000 + " seconds.");



function getNumbers() {
  let numbers = {}; // a set of unique values
  for (let i = 1; i < MAX_NUMBER; i = getNextNumber(i)) {
    let sumOfPowers = getSumOfPowers(i);

    if (sumOfPowers <= MAX_NUMBER && isArmstrongNumber(sumOfPowers)) {
      numbers[sumOfPowers] = true
    }
  }

  return numbers;
}

function getNextNumber(number) {
  let copyOfNumber = number;
  if (isGrowingNumber(copyOfNumber)) { // here we have numbers where each digit not less than previous one and not more than next one: 12, 1557, 333 and so on.
    return ++copyOfNumber;
  }

  // here we have numbers which end in zero: 10, 20, ..., 100, 110, 5000, 1000000 and so on.
  let lastNumber = 1; //can be: 1,2,3..., 10,20,30,...,100,200,300,...

  while (copyOfNumber % 10 === 0) {// 5000 -> 500 -> 50: try to get the last non-zero digit
    copyOfNumber /=  10;
    lastNumber *=  10;
  }
  let lastNonZeroDigit = copyOfNumber % 10;

  return number + (lastNonZeroDigit * lastNumber / 10); //e.g. number=100, lastNumber=10, lastNonZeroDigit=1
}

function getSumOfPowers(number) {
  let currentNumber = number;
  let power = getDigitsAmount(currentNumber);
  let currentSum = 0;

  while (currentNumber > 0) {
    currentSum += ARRAY_OF_POWERS[currentNumber % 10][power]; // get powers from array by indexes and then the sum.
    currentNumber = parseInt(currentNumber / 10);
  }
  return currentSum;
}

function isArmstrongNumber(number) {
  return number === getSumOfPowers(number);
}

function isGrowingNumber(number) {
  return (number + 1) % 10 !== 1;
}

function getDigitsAmount(number) {
  return parseInt(Math.log10(number) + 1);
}
