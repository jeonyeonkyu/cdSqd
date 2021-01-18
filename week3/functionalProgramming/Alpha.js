const isFactor = (number, potentialFactor) => number % potentialFactor === 0;
const getFactors = (number) => Array.from({ length: Math.sqrt(number) }, (_, i) => i + 1)
  .filter(pod => isFactor(number, pod))
  .reduce((acc, cur) => {
    acc.add(cur);
    acc.add(number / cur);
    return acc;
  }, new Set());
const sum = (factors) => [...factors].reduce((acc, cur) => acc + cur, 0);
const isPerfect = (number) => (sum(getFactors(number)) - number) === number;
const isAbundant = (number) => (sum(getFactors(number)) - number) > number;
const isDeficient = (number) => (sum(getFactors(number)) - number) < number;
const isPrime = (number) => getFactors(number).size === 2;

const getArray = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => i + min);

const result = getArray(2, 100)
  .reduce((acc, cur) => {
    acc += `${cur} : `
    if (isPerfect(cur)) {
      acc += 'perfect, ';
    } else if (isAbundant(cur)) {
      acc += 'abundant, ';
    } else if (isDeficient(cur)) {
      acc += 'deficient, ';
    }
    acc += isPrime(cur) ? 'prime\n' : '\n';
    return acc;
  }, '');

console.log(result);